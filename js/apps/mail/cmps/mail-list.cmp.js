import mailCard from './mail-card.cmp.js'

export default {
  props: ['mails'],
  template: `
        <section class="mail-list flex column flex-1">
            <router-link v-if="mails.length" v-for="mail in mails" :key="mail.id" :to="'/mail/' + mail.id">
              <mail-card :mail="mail" />
            </router-link>         
        </section>
    `,
  components: {
    mailCard,
  },
  created() {
    console.log(this.mails)
  },
}
