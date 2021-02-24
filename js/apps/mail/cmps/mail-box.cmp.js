export default {
  template: `
            <section class="mail-box flex column jcc">
                <div class="card-edge">
                    <p class="card-title">new message</p>
                </div>
                <div class="to-input-box flex">
                <label for="" class="to-input-label">to:</label>
                    <input type="text" v-model="msg.addresses.to">
                </div>
                <div class="subject-input-box flex">
                <label for="" class="subject-input-label">subject:</label>
                    <input type="text" v-model="msg.content.subject">
                </div>
                <div class="body-input-box flex">
                    <textarea type="textarea" v-model="msg.content.body"></textarea>
                </div>
                <div class="sending-actions-box flex">
                    <button class="send-mail-button" @click="checkClick">send</button>
                </div>

            </section>
        `,
  data() {
    return {
      msg: {
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
    }
  },
  methods: {
    checkClick() {},
  },
  computed: {},
}
