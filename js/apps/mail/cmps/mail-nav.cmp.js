import { eventBus } from '../../../services/event-bus.service.js'

export default {
  template: `
          <nav class="mail-nav mail-nav-part flex column align-center" @mouseover="increaseNav"
           @mouseleave="decreaseNav">
           <div class="background-wrapper flex column align-center">
            <button class="create-mail-button create-mail-button-part" @click="createMail">+</button>
            <div class="filters-box filters-box-part flex column">
              <router-link class="center" @mouseover="hoverInbox"
           @mouseleave="outHoverInbox" to="/mail" :class="inboxClass">
                <img src="image/filters/inbox.png" alt="">
              </router-link>
              <router-link class="center" @mouseover="hoverMarked"
           @mouseleave="outHoverInbox" to="/mail?innerFilters=marked" :class="markedClass">
                <img src="image/filters/marked.png" alt="">
              </router-link>
              <router-link class="center" @mouseover="hoverNotReaded"
           @mouseleave="outHoverNotReaded" to="/mail?innerFilters=notReaded" :class="notReadedClass">
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
                
                <router-link class="flex align-center" @mouseover="hoverInbox"
           @mouseleave="outHoverInbox" to="/mail" :class="inboxClass">
                  <p>Inbox</p>
                </router-link>
                <router-link class="flex align-center" @mouseover="hoverMarked"
           @mouseleave="outHoverInbox" to="/mail?innerFilters=marked" :class="markedClass">
                  <p>Favorites</p>
                </router-link>
                <router-link class="flex align-center" @mouseover="hoverNotReaded"
           @mouseleave="outHoverNotReaded" to="/mail?innerFilters=notReaded" :class="notReadedClass">
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
      inboxHovered: false,
      markedHovered: false,
      notReadedHovered: false,
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
    hoverInbox() {
      console.log('hover inbox')
      this.inboxHovered = true
    },
    outHoverInbox() {
      console.log('outhover inbox')
      this.inboxHovered = false
    },
    hoverMarked() {
      this.markedHovered = true
    },
    outHoverMarked() {
      this.markedHovered = false
    },
    hoverNotReaded() {
      this.notReadedHovered = true
    },
    outHoverNotReaded() {
      this.notReadedHovered = false
    },
  },
  computed: {
    inboxClass() {
      return {
        'inbox-hovered': this.inboxHovered,
      }
    },
    markedClass() {
      return {
        hovered: this.markedHovered,
      }
    },
    notReadedClass() {
      return {
        hovered: this.notReadedHovered,
      }
    },
  },
}
