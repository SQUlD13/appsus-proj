import router from './routes.js'
import notification from './cmps/notification.cmp.js'
const options = {
  el: '#app',
  router: router,
  template: `
      <section class="page">
          <notification/>
          <router-view/>
        </section>  
    `,
  components: {
    notification,
  },
}

new Vue(options)
