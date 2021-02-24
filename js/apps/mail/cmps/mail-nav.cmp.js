export default {
  template: `
          <nav class="mail-nav flex column">
            <button class="create-mail-button" @click="createMail">+</button>
          </nav>
      `,
  methods: {
    createMail() {
      console.log('creating mail...')
    },
  },
  computed: {},
}
