export default {
    props: ['text'],
    template: ` 
        <p class="long-text" @click="toggleFull"> {{description}} </p>
    `,
    data() {
        return {
            isFull: false,
        }
    },
    computed: {
        description() {
            return (this.isFull) ? `${this.text}` : (this.text.length > 100) ?
                this.text.substr(0, 99) + '...' : this.text.substr(0, 99)
        }
    },
    methods: {
        toggleFull() {
            this.isFull = !this.isFull
        }
    },
}