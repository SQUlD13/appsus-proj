import { eventBus } from '../services/event-bus.service.js'

export default {
  template: `
      <transition name="fade">
        <article v-if="notification" class="notification flex" :class="notifBgcClass">
            <p class="content">{{notification.msg}}</p>
        </article>
      </transition>  
    `,
  data() {
    return {
      notification: null,
      notifTimeout: null,
    }
  },
  methods: {
    notif(notification) {
      console.log('notifating..', notification)
      this.notification = notification
      clearTimeout(this.notifTimeout)
      this.notifTimeout = setTimeout(() => (this.notification = null), 3000)
    },
  },
  computed: {
    notifBgcClass() {
      return {
        success: this.notification.status === 'success',
        error: this.notification.status === 'error',
      }
    },
  },
  created() {
    eventBus.$on('changes', this.notif)
  },
}
