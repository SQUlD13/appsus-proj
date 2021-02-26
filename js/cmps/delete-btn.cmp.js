
export default {
    props: ['info'],
    template: `
    <button class="btn delete-btn" @click="$emit('delete')">
        <svg class="icon" :height="this.size" :width="this.size">
            <path id="mainDiagonal" :d="this.mainDiagonalD()" :stroke="this.color" :stroke-width="this.strokeWidth" stroke-linecap="round"/>
            <path id="secondaryDiagonal" :d="this.secondaryDiagonalD()" :stroke="this.color" :stroke-width="this.strokeWidth" stroke-linecap="round"/>
        </svg>
    </button>
    `,
    data() {
        return {
        }
    },
    computed: {
        half() {
            return this.size / 2
        },
        color() {
            return (this.info && this.info.color) ? this.info.color : 'firebrick'
        },
        size() {
            return (this.info && this.info.size) ? this.info.size : 10
        },
        strokeWidth() {
            return (this.info && this.info.strokeWidth) ? this.info.strokeWidth : 3
        }
    },
    methods: {
        mainDiagonalD() {
            return `M${this.size} 0 L0 ${this.size}`

        },
        secondaryDiagonalD() {
            return `M${this.size} ${this.size} L0 0`
        }
    }
}