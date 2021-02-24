import { mailService } from '../../../services/mail.service.js'

export default {
  props: ['mailId'],
  template: `
        <section class="mail-read-page">
            <h1>{{mailId}}</h1>
            <h2 v-if="mail">{{mail.content.subject}}</h2>
        </section>
    `,
  data() {
    return {
      mail: null,
    }
  },
  created() {
    mailService.getMailById(this.mailId).then((mail) => (this.mail = mail))
  },
}
