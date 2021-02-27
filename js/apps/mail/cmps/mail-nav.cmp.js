import { eventBus } from '../../../services/event-bus.service.js'

export default {
  template: `
          <nav class="mail-nav flex column align-center">
            <button class="create-mail-button" @click="createMail">+</button>
            <div class="filters-box flex column">
              <router-link class="center" to="/mail">I</router-link>
              <router-link class="center" to="/mail?innerFilters=marked">F</router-link>
              <router-link class="center" to="/mail?innerFilters=notReaded">N</router-link>
            </div>

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
