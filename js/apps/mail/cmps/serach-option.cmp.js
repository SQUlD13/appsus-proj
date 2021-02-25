export default {
  props: ['mail'],
  template: `
        <router-link :to="'/mail/' + mail.id" class="serach-option flex">
        
            <img class="msg-icon" src="" alt="">
            <div class="content-box">
                <p class="subject">{{mail.content.subject}}</p>
                <p class="from-to">{{fromTo}}</p>
            </div>
            <p class="timestamp">{{mail.general.timestamp}}</p>
        </router-link>
    `,
  computed: {
    fromTo() {
      return `${this.mail.addresses.from}, ${this.mail.addresses.to}`
    },
  },
}
