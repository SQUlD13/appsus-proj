import router from './routes.js'
// import pageHeader from './cmps/header/header.cmp.js'
import pageHeader from './cmps/header/header-test.cmp.js'
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
  computed: {
    isHeaderShow() {
      const currPath = this.$route.path
      return currPath !== '/'
      //return currPath.includes('/mail') || currPath.includes('/keep')
    },
  },
  components: {
    notification,
    pageHeader,
  },
}


new Vue(options)
