import { mailService } from '../../../../services/mail.service.js'
import mailButtonsBox from '../mail-buttons-box.cmp.js'

export default {
  props: ['mailId'],
  template: `
        <section v-if="mail" class="mail-details flex space-between">
          <div class="text-box">
            <p class="">{{mail.content.subject}}</p>
            <div class="details-box flex">
              <img class="" src="image/header/user.png" alt="">
              <div class=" flex column">
                <p class="from">{{mail.addresses.from}}nisim</p>
                <p class="to">{{mail.addresses.to}}</p>
                <p class="body">{{mail.content.body}}</p>
              </div>
            </div>
          </div>
          <div class="details-buttons-bar">
            <mail-buttons-box :mail="this.mail"/>
          </div>
        </section>
    `,
  data() {
    return {
      mail: null,
    }
  },
  components: {
    mailButtonsBox,
  },
  created() {
    mailService.getMailById(this.mailId).then((mail) => (this.mail = mail))
  },
}
