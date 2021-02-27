import { eventBus } from '../../../services/event-bus.service.js'

export default {
  template: `
          <nav class="mail-nav mail-nav-part flex column align-center" @mouseover="increaseNav"
           @mouseleave="decreaseNav">
           <div class="background-wrapper">
            <button class="create-mail-button create-mail-button-part" @click="createMail">+</button>
            <div class="filters-box filters-box-part flex column">
              <router-link class="center" to="/mail">
                <img src="image/filters/inbox.png" alt="">
              </router-link>
              <router-link class="center" to="/mail?innerFilters=marked">
                <img src="image/filters/marked.png" alt="">
              </router-link>
              <router-link class="center" to="/mail?innerFilters=notReaded">
                <img src="image/filters/not-readed.png" alt="">
              </router-link>
            </div>
            </div>

          <transition name="gush">
            <nav v-if="navHover" class="full-nav mail-nav-part flex column">
              <button class="create-mail-tag create-mail-button-part flex align-center" @click="createMail">
                <p>Send mail</p>
              </button>
              
              <div class="filters-box-tag filters-box-part flex column">
                
                <router-link class="flex align-center" to="/mail">
                  <p>Inbox</p>
                </router-link>
                <router-link class="flex align-center" to="/mail?innerFilters=marked">
                  <p>Favorites</p>
                </router-link>
                <router-link class="flex align-center" to="/mail?innerFilters=notReaded">
                  <p>Not readed</p>
                </router-link>
              </div>
            </nav>
          </transition>

          </nav>
      `,
  data() {
    return {
      navHover: false,
    }
  },
  methods: {
    createMail() {
      console.log('creating mail...')
      eventBus.$emit('onOpenMailBox')
    },
    increaseNav() {
      console.log('increasing...')
      this.navHover = true
    },
    decreaseNav() {
      console.log('decreasing...')
      this.navHover = false
    },
  },
  computed: {},
}
