// import searchOption from '../../apps/mail/cmps/serach-option.cmp.js'
import { eventBus } from '../../services/event-bus.service.js'

export default {
  // props: ['searchOptions'],
  template: `
        <div class="search-box flex-1 flex column">
          <form  @submit.prevent="routSearch" class="flex">
            <a href="" class="options">
              <img class="icon center" src="" alt="O">
            </a>

            <div class="input-box flex-1 flex">
              <input type="text" class="search-input flex-1" placeholder="search in Appsus" v-model="strSearchFilter" @focus="turnOnSearchFocus"
              @blur="turnOffSearchFocus">
            </div>

             <div class="search-filters-box flex">
               <button class="search-page-filter search-filter-a center">
                 <p>{{currAppName}}</p>
               </button>
               <button v-for="innerFilter in innerFilters" class="search-inner-filter search-filter-a center" @click="removeinnerFilter(innerFilter)">
                 <p>{{innerFilter}}</p>
                 <img src="" alt="X">
               </button>
            </div>

            <button type="submit" class="search-button">
              <a class="text-a">
                <img src="image/header/search.svg" alt="">
              </a>
            </button>
          </form>
          <div class="search-options">
          <!-- <search-option v-if="isShowOptions" v-for="mail in searchOptions" :mail="mail"/> -->
          </div>
        </div>
    `,
  data() {
    return {
      mailDefault: {
        name: 'mail',
        showName: 'Mail',
        pageFilter: false,
        innerFilters: [],
      },
      keepsDefault: {},
      searchFilter: {
        str: '',
      },
      filterTimeout: null,
      searchFocus: false,
      blurTimeout: null,
      strSearchFilter: '',
      innerFilters: [],
    }
  },
  methods: {
    emitChange() {
      const deepNewVal = JSON.parse(JSON.stringify(this.searchFilter))
      this.$emit('onSearchChange', deepNewVal)
    },
    routToDetails(mailId) {
      this.$router.push('/mail' + mailId)
    },
    turnOnSearchFocus() {
      console.log('input focused')
      this.searchFocus = true
    },
    turnOffSearchFocus() {
      console.log('input blured')
      clearTimeout(this.blurTimeout)
      this.blurTimeout = setTimeout(() => (this.searchFocus = false), 500)
    },
    addInnerFilter(filter) {
      this.innerFilters = [filter]
      // this.innerFilters.push(filter)
    },
    removeinnerFilter(filter) {
      let idx = this.innerFilters.indexOf(filter)
      this.innerFilters.splice(idx, 1)
    },
    clearInnerFilters() {
      this.innerFilters = []
    },
    routSearch() {
      this.$router.push(this.searchRoutDetails)
    },
  },
  computed: {
    isShowOptions() {
      return (
        this.searchOptions.length &&
        this.searchFilter.str.length >= 1 &&
        this.searchFocus
      )
    },
    searchRoutDetails() {
      const currApp = this.$route.path.slice(1)
      let res = {
        path: '/' + currApp,
        query: {},
      }
      if (this.strSearchFilter) {
        res.query.str = this.strSearchFilter
      }
      if (this.innerFilters.length) {
        res.query.innerFilters = this.innerFilters.join(',')
      }
      return res
    },
    currAppName() {
      return this.$route.path.slice(1) + 'App'
    },
  },
  watch: {
    // searchFilter: {
    //   handler(newVal) {
    //     this.$emit('onSearchType', newVal.str)
    //   },
    //   deep: true,
    // },
    // searchOptions(newVal) {
    //   console.log(newVal)
    // },
  },
  created() {
    eventBus.$on('onAddSearchInnerFilter', this.addInnerFilter)
    eventBus.$on('onRemoveSearchInnerFilter', this.removeInnerFilter)
    eventBus.$on('onClearSearchInnerFilters', this.clearInnerFilters)
  },
  components: {
    // searchOption,
  },
}
