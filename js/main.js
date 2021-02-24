import router from './routes.js'
import pageHeader from './cmps/header.cmp.js'
import notification from './cmps/notification.cmp.js'
const options = {
  el: '#app',
  router: router,
  template: `
      <section class="page">
          <page-header/>
          <notification/>
          <router-view/>
        </section>  
    `,
  components: {
    notification,
    pageHeader,
  },
}

new Vue(options)
