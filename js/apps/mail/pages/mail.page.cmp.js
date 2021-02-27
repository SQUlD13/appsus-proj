import { mailService } from '../../../services/mail.service.js'
import sort from '../cmps/filter/sort.cmp.js'
import mailControlBar from '../cmps/mail-control-bar.cmp.js'
import mailNav from '../cmps/mail-nav.cmp.js'
import mailList from '../cmps/mail-list.cmp.js'
import mailBox from '../cmps/mail-box.cmp.js'
import { eventBus } from '../../../services/event-bus.service.js'

export default {
  template: `
    <section class="mail-app">
        <main class="flex">
          <mail-nav/>
          <div class="content-container flex-1">
            <mail-control-bar/>
            <router-view v-if="mails.length" :mails="mailsToShow" @onFilter="filterBy"/>
          </div>
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
      strSearchFilter: '',
      innerFilters: [],
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
    isMatchSearch(mail, searcrhStr = this.filtersMap.search.str) {
      const lowerStr = searcrhStr.toLowerCase()
      const recieverMatch = mail.addresses.to.toLowerCase().includes(lowerStr)
      const subjectMatch = mail.content.subject.toLowerCase().includes(lowerStr)
      const bodyMatch = mail.content.body.toLowerCase().includes(lowerStr)
      return subjectMatch || bodyMatch || recieverMatch
    },
    filterBy(filterEntity) {
      this.filtersMap.general = { isReaded: false, isMarked: false }
      if (filterEntity === 'not-readed') this.filtersMap.general.isReaded = true
      if (filterEntity === 'marked') this.filtersMap.general.isMarked = true
    },
    updateTmpSearchStr(newSearchStr) {
      this.tmpSearchStr = newSearchStr
    },
    isMatchNotReadedFilter(mail) {
      return !mail.general.isReaded
    },
    isMatchMarkedFilter(mail) {
      return mail.general.isMarked
    },
    updateFiltersByQuery(query = this.$route.query) {
      this.strSearchFilter = ''
      this.innerFilters = []

      if (query.str) {
        const { str } = query
        this.strSearchFilter = str
      }

      if (query.innerFilters) {
        const { innerFilters } = query
        this.innerFilters = innerFilters.split(',')
      }

      this.updateSearchFilters()
    },
    updateSearchFilters() {
      if (this.innerFilters.length) {
        this.innerFilters.forEach((filter) => {
          eventBus.$emit('onAddSearchInnerFilter', filter)
        })
      } else {
        eventBus.$emit('onClearSearchInnerFilters')
      }
      console.log('emitting...')
    },
  },
  computed: {
    mailsToShow() {
      let currMailsToShow = this.mails

      if (this.strSearchFilter) {
        currMailsToShow = this.mails.filter((mail) => {
          return this.isMatchSearch(mail, this.strSearchFilter)
        })
      }

      if (this.innerFilters.includes('marked')) {
        currMailsToShow = currMailsToShow.filter((mail) => {
          return this.isMatchMarkedFilter(mail)
        })
      }

      if (this.innerFilters.includes('notReaded')) {
        currMailsToShow = currMailsToShow.filter((mail) => {
          return this.isMatchNotReadedFilter(mail)
        })
      }

      return currMailsToShow
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
  watch: {
    '$route.query'(newVal) {
      console.log('query change detected')
      this.updateFiltersByQuery(newVal)
    },
    // '$route.query.str'(newVal) {
    //   console.log(newVal)
    //   this.str = newVal
    // },
    // '$route.query.innerFilters'(newVal) {
    //   console.log(newVal)
    //   if (newVal) this.innerFilters = newVal.split(',')
    // },
  },
  components: {
    mailControlBar,
    mailList,
    mailNav,
    mailBox,
    sort,
  },
  created() {
    const mails = mailService.getMails()
    mails.then(this.refreshMails)

    //     if (this.$route.query.str) {
    //       const { str } = this.$route.query
    //       this.strSearchFilter = str
    //     }
    //
    //     if (this.$route.query.innerFilters) {
    //       const { innerFilters } = this.$route.query
    //       this.innerFilters = innerFilters.split(',')
    //     }

    this.updateFiltersByQuery()

    eventBus.$on('changes', this.onChanges)
    eventBus.$on('onOpenMailBox', () => (this.mailBoxOpen = true))
    eventBus.$on('onReadedClick', this.toggleReaded)
    eventBus.$on('onMarkedClick', this.toggleMarked)
    //
    // setTimeout(() => {
    //   this.$router.push({
    //     path: '/mail',
    //     query: {
    //       innerFilters: 'shlomo,moyshe',
    //       str: '',
    //     },
    //   })
    // }, 1000)
  },
}
