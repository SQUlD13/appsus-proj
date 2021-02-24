import { eventBus } from '../../../services/event-bus.service.js'

export default {
  template: `
          <nav class="mail-nav flex column">
            <button class="create-mail-button" @click="createMail">+</button>
          </nav>
      `,
  methods: {
    createMail() {
      console.log('creating mail...')
      eventBus.$emit('onOpenMailBox')
    },
  },
  computed: {},
}
