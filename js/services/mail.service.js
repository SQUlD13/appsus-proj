import { storageService } from './async-storage-service.js'

export const mailService = {
  createMail,
  pushMail,
  addMail,
  getMail,
  getMails,
}

const MAIL_KEY = 'mails'
const DEFAULT_ADDRESSES
const DEFAULT_CONTENT = {
  subject: '',
  body: '',
}

function createMail(addresses = DEFAULT_ADDRESSES, content = DEFAULT_CONTENT) {
  const formattedMail = {
    addresses,
    content,
    general,
  }
  return formattedMail
}

function pushMail(formattedMail) {
  const mails
  storageService.post(MAIL_KEY, formattedMail)
}

function addMail(mail) {}

function getMail(mailId) {}

function getMails() {}
