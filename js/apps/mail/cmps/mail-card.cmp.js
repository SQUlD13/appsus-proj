export default {
  props: ['mail'],
  template: `
        <article class="mail-card center">
            <p class="mail-sender">from: {{mail.addresses.from}}</p>
            <p class="mail-time">timestamp: {{mail.general.timestamp}}</p>
            <p class="mail-subject">subject: {{mail.content.subject}}</p>
        </article>
    `,
  computed: {},
}
