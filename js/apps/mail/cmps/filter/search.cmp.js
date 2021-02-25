import searchOption from '../serach-option.cmp.js'

export default {
  props: ['searchOptions'],
  template: `
        <div class="search-box main-container flex column">
          <form action="" @submit.prevent="emitChange" class="flex">
            <img class="icon" src="" alt="">
            <input type="text" class="search-input" list="lis" placeholder="search in mails" v-model="searchFilter.str" @focus="turnOnSearchFocus"
          @blur="turnOffSearchFocus" >
          <datalist id="lis">
            <option v-for="mail in searchOptions" value="nisim" @click="onOptionClick">
              <search-option :mail="mail" @click="onOptionClick"/>
            </option>
          </datalist>
            <button>search</button>
          </form>
          <!-- <div class="search-options">
          <search-option v-if="isShowOptions" v-for="mail in searchOptions" :mail="mail"/>
          </div> -->
        </div>
    `,
  data() {
    return {
      searchFilter: {
        str: '',
      },
      filterTimeout: null,
      searchFocus: false,
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
      this.searchFocus = false
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
