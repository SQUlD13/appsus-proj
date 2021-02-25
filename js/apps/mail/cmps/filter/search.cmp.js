export default {
  template: `
        <div class="search-box flex">
            <img class="icon" src="" alt="">
            <input type="text" class="search-input" placeholder="search in mails" v-model="searchFilter.str">
        </div>
    `,
  data() {
    return {
      searchFilter: {
        str: '',
      },
      filterTimeout: null,
    }
  },
  methods: {
    emitChange(newVal) {
      const deepNewVal = JSON.parse(JSON.stringify(newVal))
      this.$emit('onSearchChange', deepNewVal)
    },
  },
  watch: {
    searchFilter: {
      handler(newVal) {
        console.log('search filter just changed')
        clearTimeout(this.filterTimeout)
        this.filterTimeout = setTimeout(this.emitChange, 2000, newVal)
      },
      deep: true,
    },
  },
  created() {
    // this.searchFilter = 'nisim'
  },
}
