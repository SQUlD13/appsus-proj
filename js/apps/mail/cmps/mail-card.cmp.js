import { eventBus } from '../../../services/event-bus.service.js'

export default {
  props: ['mail'],
  template: `
        <article class="mail-card">
            <div class="buttons-box">
              <button class="check-button" @click.prevent>C</button>
              <button class="readed-button" :class="readedClass" @click.prevent="emitReadedToggle">R</button>
              <button class="mark-button" :class="markedClass" @click.prevent="emitMarkedToggle">M</button>
            </div>
            <p class="mail-reciever card-mail-title">{{mail.addresses.to}}</p>
            <p class="mail-subject-and-body"><span class="card-mail-title">{{mailTitle}}</span> - <span>{{mailMiniBody}}</span></p>
            <p class="mail-time">{{mail.general.timestamp}}</p>
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
    readedClass() {
      return {
        checked: this.mail.general.isReaded === true,
      }
    },
    markedClass() {
      return {
        checked: this.mail.general.isMarked === true,
      }
    },
  },
}
