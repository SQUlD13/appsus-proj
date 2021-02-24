import mailCard from './mail-card.cmp.js'

export default {
  props: ['mails'],
  template: `
        <section class="mail-list flex column flex-1">
            <mail-card v-if="mails.length" v-for="mail in mails" :key="mail.id" :mail="mail"/>
        </section>
    `,
  components: {
    mailCard,
  },
}
