
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
            size: null,
            strokeWidth: null,
            color: null,
        }
    },
    created() {
        this.size = (this.info && this.info.size) ? this.info.size : 10
        this.strokeWidth = (this.info && this.info.strokeWidth) ? this.info.strokeWidth : 3
        this.color = (this.info && this.info.color) ? this.info.color : 'firebrick'
    },
    computed: {
        half() {
            return this.size / 2
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