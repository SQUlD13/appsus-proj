import { mailService } from '../../../services/mail.service.js'
import mailNav from '../cmps/mail-nav.cmp.js'
import mailList from '../cmps/mail-list.cmp.js'
import mailBox from '../cmps/mail-box.cmp.js'
import { eventBus } from '../../../services/event-bus.service.js'

export default {
  template: `
    <section class="mail-app">
        <h1>mailApp</h1>
        <router-link to="/"> Home </router-link>
        <main class="main-container flex">
          <mail-nav/>
          <router-view v-if="mails.length" :mails="mails"/>
        </main>
        <mail-box v-if="mailBoxOpen" @onCloseMailBox="mailBoxOpen = false"/>
    </section>
    `,
  data() {
    return {
      mails: [],
      mailBoxOpen: false,
      myName: 'nisim',
    }
  },
  provide() {
    return {
      mails: this.mails,
    }
  },
  methods: {
    refreshMails(mails) {
      console.log('refreshing mails', mails)
      this.mails = mails
    },
    onChanges(notification) {
      mailService.getMails().then((mails) => {
        this.mails = mails
      })
    },
  },
  provide: {
    myName: 'string nisim',
  },
  components: {
    mailList,
    mailNav,
    mailBox,
  },
  created() {
    const mails = mailService.getMails()
    mails.then(this.refreshMails)

    eventBus.$on('changes', this.onChanges)
    eventBus.$on('onOpenMailBox', () => (this.mailBoxOpen = true))
  },
}
