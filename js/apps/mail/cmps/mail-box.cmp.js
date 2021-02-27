import { utilService } from '../../../services/util.service.js'
import { mailService } from '../../../services/mail.service.js'
import { eventBus } from '../../../services/event-bus.service.js'

export default {
  template: `
            <section class="mail-box flex column jcc">
                <div class="card-edge flex space-between">
                    <p class="card-title">new message</p>
                    <div class="card-main-buttons">
                        <a class="close" @click="$emit('onCloseMailBox')">X</a>
                    </div>
                </div>
                <div class="mail-box-content-box"> 
                  <div class="input-box to-input-box flex align-center">
                  <label for="" class="to-input-label">to:</label>
                      <input class="flex-1" type="text" v-model="mail.addresses.to">
                  </div>
                  <div class="input-box subject-input-box flex align-center">
                  <label for="" class="subject-input-label">subject:</label>
                      <input type="text" v-model="mail.content.subject">
                  </div>
                  <div class="body-input-box flex">
                      <textarea type="textarea" rows="13" cols="50" v-model="mail.content.body"></textarea>
                  </div>
                  <div class="sending-actions-box flex">
                      <a class="send-mail-button avoid-default-a" @click="checkBeforeSend">send</a>
                  </div>
                </div>

            </section>
        `,
  data() {
    return {
      mail: {
        addresses: {
          from: '',
          to: '',
        },
        content: {
          subject: '',
          body: '',
        },
        general: {
          timestamp: null,
        },
        id: null,
      },
      allowedMail: null,
    }
  },
  methods: {
    checkBeforeSend() {
      const { mail } = this
      if (mail.addresses.to) {
        if (mail.content.subject) {
          if (mail.content.body) {
            this.sendMail()
            this.$emit('onCloseMailBox')
          } else {
            this.sendErrorNotif('please fill the following field: body')
          }
        } else {
          this.sendErrorNotif('please fill the following field: subject')
        }
      } else {
        this.sendErrorNotif('please fill the following field: to')
      }
    },
    sendMail() {
      let deepMail = JSON.parse(JSON.stringify(this.mail))
      this.updateMailGeneralDetails(deepMail)

      mailService
        .pushMail(deepMail)
        .then(() =>
          eventBus.$emit('changes', { msg: 'mail sent', status: 'success' })
        )
    },
    sendErrorNotif(errorMsg) {
      console.log(errorMsg)
    },
    updateMailGeneralDetails(deepMail) {
      deepMail.id = utilService.makeId()
      deepMail.general.timestamp = Date.now()
      return deepMail
    },
  },
  computed: {},
}
