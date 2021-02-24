export default {
  props: ['mail'],
  template: `
        <article class="mail-card center">
            <p class="mail-sender"><span class="bold">from:</span> {{mail.addresses.from}}</p>
            <p class="mail-time"><span class="bold">timeStamp:</span> {{mail.general.timestamp}}</p>
            <p class="mail-subject"><span class="bold">subject:</span> {{mail.content.subject}}</p>
        </article>
    `,
  computed: {},
}
