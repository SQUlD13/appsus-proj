import { mailService } from '../../../services/mail.service.js'
import mailNav from '../cmps/mail-nav.cmp.js'
import mailList from '../cmps/mail-list.cmp.js'
import mailBox from '../cmps/mail-box.cmp.js'

export default {
  template: `
    <section class="mail-app">
        <h1>mailApp</h1>
        <router-link to="/"> Home </router-link>
        <main class="main-container flex">
          <mail-nav/>
          <mail-list v-if="mails.length" :mails="mails"/>
        </main>
        <mail-box/>
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
    mailNav,
    mailBox,
  },
  created() {
    const mails = mailService.getMails()
    mails.then(this.refreshMails)
  },
}
