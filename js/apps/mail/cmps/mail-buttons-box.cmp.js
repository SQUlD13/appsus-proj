import { eventBus } from '../../../services/event-bus.service.js'

export default {
  props: ['mail'],
  template: `
        <div class="mail-buttons-box buttons-box flex align-center">
              <a class="check-button" @click.prevent>
                <img src="image/filters/checkbox.png" alt="" style="height: 24px;">
              </a>
              <a class="readed-button" :class="markedClass" @click.prevent="emitMarkedToggle">
                <img :src="markedImg" alt="" style="height: 24px;">
              </a>
              <a class="mark-button" :class="readedClass" @click.prevent="emitReadedToggle">
                <img :src="notReadedImg" alt="" style="height: 24px;">
              </a>
        </div>
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
    markedImg() {
      if (this.mail.general.isMarked) return 'image/filters/marked.png'
      return 'image/filters/marked-not-checked.png'
    },
    notReadedImg() {
      if (!this.mail.general.isReaded) return 'image/filters/not-readed.png'
      return 'image/filters/not-readed-not-checked.png'
    },
  },
}
