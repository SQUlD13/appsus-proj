import router from './routes.js'
import pageHeader from './cmps/header/header.cmp.js'
import notification from './cmps/notification.cmp.js'
const options = {
  el: '#app',
  router: router,
  template: `
      <section class="page">
          <page-header v-if="isHeaderShow"/>
          <notification/>
          <router-view/>
        </section>  
    `,
  components: {
    notification,
    pageHeader,
  },
  computed: {
    isHeaderShow() {
      const currPath = this.$route.path
      return currPath.includes('/mail') || currPath.includes('/keep')
    },
  },
}

new Vue(options)
