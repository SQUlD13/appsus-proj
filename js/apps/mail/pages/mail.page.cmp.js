import { mailService } from '../../../services/mail.service.js'
import search from '../cmps/filter/search.cmp.js'
import generalFilter from '../cmps/filter/general.cmp.js'
import sort from '../cmps/filter/sort.cmp.js'
import mailNav from '../cmps/mail-nav.cmp.js'
import mailList from '../cmps/mail-list.cmp.js'
import mailBox from '../cmps/mail-box.cmp.js'
import { eventBus } from '../../../services/event-bus.service.js'

export default {
  template: `
    <section class="mail-app">
        <main class="main-container flex">
          <search @onSearchChange="changeSpecificFilter('search', $event)"/>
          <mail-nav/>
          <router-view v-if="mails.length" :mails="mailsToShow"/>
        </main>
        <mail-box v-if="mailBoxOpen" @onCloseMailBox="mailBoxOpen = false"/>
    </section>
    `,
  data() {
    return {
      mails: [],
      filtersMap: {
        search: {
          str: '',
        },
        general: {
          isReaded: true,
          isMarked: true,
        },
        sort: {
          by: 'timestamp',
        },
      },
      mailBoxOpen: false,
      myName: 'nisim',
    }
  },
  methods: {
    refreshMails(mails) {
      console.log('refreshing mails', mails)
      this.mails = mails
    },
    onChanges() {
      mailService.getMails().then((mails) => {
        this.mails = mails
      })
    },
    toggleReaded(mailId) {
      mailService.toggleGeneralPropVal(mailId, 'isReaded').then((res) => {
        console.log('response:', res)
        this.refreshMails(res)
      })
    },
    toggleMarked(mailId) {
      mailService.toggleGeneralPropVal(mailId, 'isMarked').then((res) => {
        console.log('response:', res)
        this.refreshMails(res)
      })
    },
    filter(filteredMails) {
      console.log('filtering', filteredMails)
    },
    changeSpecificFilter(filterType, updatedFilter) {
      this.filtersMap[filterType] = updatedFilter
      console.log(this.filtersMap[filterType])
    },
  },
  computed: {
    mailsToShow() {
      let mailsAfterSearchFilter = this.mails.filter((mail) => {
        console.log('this.filtersMap', this.filtersMap)
        return true
      })
      return mailsAfterSearchFilter
    },
  },
  components: {
    mailList,
    mailNav,
    mailBox,
    search,
    generalFilter,
    sort,
  },
  created() {
    const mails = mailService.getMails()
    mails.then(this.refreshMails)

    eventBus.$on('changes', this.onChanges)
    eventBus.$on('onOpenMailBox', () => (this.mailBoxOpen = true))
    eventBus.$on('onReadedClick', this.toggleReaded)
    eventBus.$on('onMarkedClick', this.toggleMarked)
  },
}
