import { mailService } from '../../../services/mail.service.js'
import search from '../cmps/filter/search.cmp.js'
import sort from '../cmps/filter/sort.cmp.js'
import mailNav from '../cmps/mail-nav.cmp.js'
import mailList from '../cmps/mail-list.cmp.js'
import mailBox from '../cmps/mail-box.cmp.js'
import { eventBus } from '../../../services/event-bus.service.js'

export default {
  template: `
    <section class="mail-app">
        <search @onSearchChange="changeSpecificFilter('search', $event)" @onSearchType="updateTmpSearchStr" :searchOptions="tmpSearchOptions"/>
        <main class="main-container flex">
          <mail-nav/>
          <router-view v-if="mails.length" :mails="mailsToShow" @onFilter="filterBy"/>
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
          isReaded: false,
          isMarked: false,
        },
        sort: {
          by: 'timestamp',
        },
      },
      mailBoxOpen: false,
      searchOptions: [],
      tmpSearchStr: '',
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
    changeSpecificFilter(filterType, updatedFilter) {
      this.filtersMap[filterType] = updatedFilter
    },
    isMatchSearch(mail, searcrhStr = this.filtersMap.search.str) {
      const lowerStr = searcrhStr.toLowerCase()
      const recieverMatch = mail.addresses.to.toLowerCase().includes(lowerStr)
      const subjectMatch = mail.content.subject.toLowerCase().includes(lowerStr)
      const bodyMatch = mail.content.body.toLowerCase().includes(lowerStr)
      return subjectMatch || bodyMatch || recieverMatch
    },
    isMatchGeneralFilters(mail) {
      //returns true or false:
      const { general } = this.filtersMap
      let isMatchReadedFilter = true
      let isMatchMarkedFilter = true
      if (general.isReaded) {
        isMatchReadedFilter = !mail.general.isReaded
      }
      if (general.isMarked) {
        isMatchMarkedFilter = mail.general.isMarked
      }
      return isMatchReadedFilter && isMatchMarkedFilter
    },
    filterBy(filterEntity) {
      this.filtersMap.general = { isReaded: false, isMarked: false }
      if (filterEntity === 'not-readed') this.filtersMap.general.isReaded = true
      if (filterEntity === 'marked') this.filtersMap.general.isMarked = true
    },
    updateTmpSearchStr(newSearchStr) {
      this.tmpSearchStr = newSearchStr
    },
  },
  computed: {
    mailsToShow() {
      let mailsAfterSearchFilter = this.mails.filter((mail) => {
        return this.isMatchSearch(mail)
      })

      let mailsAfterSearchAndGeneralFilter = mailsAfterSearchFilter.filter(
        (mail) => {
          return this.isMatchGeneralFilters(mail)
        }
      )
      return mailsAfterSearchAndGeneralFilter
    },
    tmpSearchOptions() {
      let mailsAfterSearchFilter = this.mails.filter((mail) => {
        return this.isMatchSearch(mail, this.tmpSearchStr)
      })

      let mailsAfterSearchAndGeneralFilter = mailsAfterSearchFilter.filter(
        (mail) => {
          return this.isMatchGeneralFilters(mail)
        }
      )
      return mailsAfterSearchAndGeneralFilter.slice(0, 4)
    },
  },
  components: {
    mailList,
    mailNav,
    mailBox,
    search,
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
