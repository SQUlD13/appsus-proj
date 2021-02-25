import { eventBus } from '../../../services/event-bus.service.js'

export default {
  template: `
          <nav class="mail-nav flex column">
            <button class="create-mail-button" @click="createMail">+</button>
            <router-link to="/mail">inbox</router-link>
            <router-link to="/mail/filter-by/marked">marked</router-link>
            <router-link to="/mail/filter-by/not-readed">not readed</router-link>

          </nav>
      `,
  methods: {
    createMail() {
      console.log('creating mail...')
      eventBus.$emit('onOpenMailBox')
    },
  },
  components: {},
  computed: {},
}
