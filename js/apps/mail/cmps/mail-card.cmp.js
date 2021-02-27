import { eventBus } from '../../../services/event-bus.service.js'
import mailButtonsBox from './mail-buttons-box.cmp.js'

export default {
  props: ['mail'],
  template: `
        <article class="mail-card" :class="cardNotReadedClass">
            <!-- <div class="buttons-box flex align-center">
              <a class="check-button" @click.prevent>
                <img src="image/filters/checkbox.png" alt="">
              </a>
              <a class="readed-button" :class="markedClass" @click.prevent="emitMarkedToggle">
                <img src="image/filters/marked.png" alt="">
              </a>
              <a class="mark-button" :class="readedClass" @click.prevent="emitReadedToggle">
                <img src="image/filters/not-readed.png" alt="">
              </a>
            </div> -->
            <mail-buttons-box :mail="mail"/>
            <p class="mail-reciever card-mail-title">{{mail.addresses.to}}</p>
            <p class="mail-subject-and-body"><span class="card-mail-title">{{mailTitle}}</span> - <span>{{mailMiniBody}}</span></p>
            <p class="mail-time">{{mailDate}}</p>
        </article>
    `,
  methods: {
    emitReadedToggle() {
      eventBus.$emit('onReadedClick', this.mail.id)
    },
    emitMarkedToggle() {
      eventBus.$emit('onMarkedClick', this.mail.id)
    },
  },
  computed: {
    mailMiniBody() {
      const miniBody = this.mail.content.body.substring(0, 40)
      return `${miniBody}${this.restString}`
    },
    mailTitle() {
      return this.mail.content.subject
    },
    restString() {
      if (this.mail.content.body.charAt(21)) return '...'
      return ''
    },
    mailDate() {
      const nowDate = new Date()
      const date = new Date(this.mail.general.timestamp)
      const year = parseInt(date.getYear())
      const month = date.getMonth()

      if (parseInt(nowDate.getYear()) > year) {
        return `${year} ${month}`
      }

      const day = parseInt(date.getDay())
      if (parseInt(nowDate.getMonth()) > month) {
        return `${month} ${day}`
      }

      const hour = parseInt(date.getHours())
      if (parseInt(nowDate.getDay()) > day) {
        return `${day} ${hour}`
      }

      const minute = parseInt(date.getMinutes())
      return `${hour}:${minute}`
      return month + year
    },
    // readedClass() {
    //   return {
    //     checked: this.mail.general.isReaded === true,
    //   }
    // },
    // markedClass() {
    //   return {
    //     checked: this.mail.general.isMarked === true,
    //   }
    // },
    cardNotReadedClass() {
      return { 'not-readed': !this.mail.general.isReaded }
    },
  },
  components: {
    mailButtonsBox,
  },
}
