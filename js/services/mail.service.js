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
const DEFAULT_MAIL = createMail()

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

function addMail(mail = DEFAULT_MAIL) {
  const formattedMail = createMail(mail.addresses, mail.content)
  return pushMail(formattedMail)
}

function addDedaultMails(quantity = 5) {
  let proccessStatus = new Promise((resResolve) => {
    for (let i = 0; i < quantity; i++) {
      addMail()
      console.log('adding default mail...')
      if (i === quantity - 1) {
        resResolve('finished')
      }
    }
  })

  return proccessStatus.then(getMails)
}

function getMail(mailId) {}

function getMails() {
  const mails = storageService.query(MAIL_KEY)

  return mails.then((resMails) => {
    if (!resMails.length) {
      return addDedaultMails()
    }
    return resMails
  })
}
