
export default {
    props: ['info'],
    template: `
        <button class="btn add-btn" @click="$emit('add')">
            <svg class="icon" :height="this.size" :width="this.size">
                    <path id="horizontal" :d="this.horizontalD()" :stroke="this.color" :stroke-width="this.strokeWidth" stroke-linecap="round"/>
                    <path id="vertical" :d="this.verticalD()" :stroke="this.color" :stroke-width="this.strokeWidth" stroke-linecap="round"/>
            </svg>
        </button>
    `,
    data() {
        return {
            size: null,
            strokeWidth: null,
            color: null
        }
    },
    created() {
        this.size = (this.info && this.info.size) ? this.info.size : 10
        this.strokeWidth = (this.info && this.info.strokeWidth) ? this.info.strokeWidth : 3
        this.color = (this.info && this.info.color) ? this.info.color : '#fff'
    },
    computed: {
        half() {
            return this.size / 2
        }
    },
    methods: {
        horizontalD() {
            return `M${this.half} 0 L${this.half} ${this.size}`

        },
        verticalD() {
            return `M0 ${this.half} L${this.size} ${this.half}`
        }
    }

}