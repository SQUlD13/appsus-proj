import { mailService } from '../../../services/mail.service.js'
import mailList from '../cmps/mail-list.cmp.js'

export default {
  template: `
    <section class="mail-app">
        <h1>mailApp</h1>
        <router-link to="/"> Home </router-link>
        <mail-list/>
    </section>
    `,
  data() {
    return {
      mails: [],
    }
  },
  methods: {
    refreshMails(mails) {
      console.log('refreshing mails', mails)
      this.mails = mails
    },
  },
  components: {
    mailList,
  },
  created() {
    const mails = mailService.getMails()
    mails.then(this.refreshMails)
  },
}
