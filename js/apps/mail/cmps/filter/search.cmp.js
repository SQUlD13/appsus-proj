import searchOption from '../serach-option.cmp.js'

export default {
  props: ['searchOptions'],
  template: `
        <div class="search-box flex-1 flex column">
          <form action="" @submit.prevent="emitChange" class="flex">
            <a href="" class="options">
              <img class="icon center" src="" alt="O">
            </a>

            <input type="text" class="search-input flex-1" placeholder="search in curr-app" v-model="searchFilter.str" @focus="turnOnSearchFocus"
             @blur="turnOffSearchFocus">

            <a class="search-button" href="">
              <a class="text-a">S</a>
            </a>
          </form>
          <div class="search-options">
          <search-option v-if="isShowOptions" v-for="mail in searchOptions" :mail="mail"/>
          </div>
        </div>
    `,
  data() {
    return {
      searchFilter: {
        str: '',
      },
      filterTimeout: null,
      searchFocus: false,
      blurTimeout: null,
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
    onOptionClick() {
      console.log('on option click')
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
  },
  watch: {
    searchFilter: {
      handler(newVal) {
        this.$emit('onSearchType', newVal.str)
      },
      deep: true,
    },
    searchOptions(newVal) {
      console.log(newVal)
    },
  },
  created() {
    // this.searchFilter = 'nisim'
  },
  components: {
    searchOption,
  },
}
