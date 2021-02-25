import mailCard from './mail-card.cmp.js'

export default {
  props: ['mails', 'filterBy'],
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
  watch: {
    filterBy(newVal) {
      if (!newVal) {
        this.$emit('onFilter', false)
      } else {
        this.$emit('onFilter', newVal)
      }
    },
  },
  created() {
    if (!this.filterBy) {
      this.$emit('onFilter', '')
    } else {
      this.$emit('onFilter', this.filterBy)
    }
  },
}
