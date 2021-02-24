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
  from: '',
  to: '',
}
const DEFAULT_CONTENT = {
  subject: '',
  body: '',
}

function createMail(addresses = DEFAULT_ADDRESSES, content = DEFAULT_CONTENT) {
  const formattedMail = {
    addresses,
    content,
    general: {
      timestamp: Date.now(),
    },
  }
  return formattedMail
}

function pushMail(formattedMail) {
  return storageService.post(MAIL_KEY, formattedMail)
}

function addMail(mail) {
  const formattedMail = createMail(mail.addresses, mail.content)
  return pushMail(formattedMail)
}

function addDedaultMails(quantity = 5) {
  for (let index = 0; index < array.length; index++) {
    const element = array[index]
  }
}

function getMail(mailId) {}

function getMails() {
  const mails = storageService.query(MAIL_KEY)
  mails.then((mails) => {
    if (!mails.length) {
      // return create mails
    }
    return mails
  })
}
