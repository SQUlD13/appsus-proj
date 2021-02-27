export default {
  template: `
        <section class="mail-control-bar flex align-center">
            <router-link v-if="isInMailHome" class="back-button circle-a center" to="/mail">
              <img src="image/arrow.png" alt="">
            </router-link>
        </section>
    `,
  computed: {
    isInMailHome() {
      let emptyQuery = true
      const route = this.$route
      const { query } = route
      for (const quer in query) {
        emptyQuery = false
        break
      }
      return route.path === '/mail' && !emptyQuery
    },
  },
}
