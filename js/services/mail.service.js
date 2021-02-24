import { utilService } from './util.service.js'
import { storageService } from './async-storage-service.js'

export const mailService = {
  createMail,
  pushMail,
  addMail,
  getMail,
  getMails,
}

const MAIL_KEY = 'mails'
const DEFAULT_ADDRESSES = {
  from: 'you',
  to: 'you',
}
const DEFAULT_CONTENT = {
  subject: 'no subject',
  body: 'no content',
}
const DEFAULT_MAIL = createMail()
const DEFAULT_MAILS = createDefaultMails()

function createMail(addresses = DEFAULT_ADDRESSES, content = DEFAULT_CONTENT) {
  const formattedMail = {
    addresses,
    content,
    general: {
      timestamp: Date.now(),
    },
    id: utilService.makeId(),
  }
  return formattedMail
}

function createDefaultMails() {
  let mails = []
  for (let i = 0; i < 5; i++) {
    mails.push(createMail())
  }
  return mails
}

function pushMail(formattedMail) {
  return storageService.postFirst(MAIL_KEY, formattedMail)
}

function pushMails(formattedMails) {
  return storageService.postMany(MAIL_KEY, formattedMails)
}

function addMail(mail) {
  const formattedMail = createMail(mail.addresses, mail.content)
  return pushMail(formattedMail)
}

function getMail(mailId) {}

function getMails() {
  const mails = storageService.query(MAIL_KEY)

  return mails.then((resMails) => {
    if (!resMails.length) {
      return pushMails(DEFAULT_MAILS)
    }
    return resMails
  })
}
