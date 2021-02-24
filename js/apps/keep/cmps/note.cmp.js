import { keepService } from '../services/keep.service.js'
import { eventBus } from '../../../services/event-bus.service.js'

export default {
    props: ['note'],
    template: `
    <div class="note" :style="background">
        <h1>Note</h1>
        <div class="note-content">
            <textarea class="note-text" type="text" v-model="txt" v-on:input="onValueChange" />
        </div>

        <button class="btn delete-btn" @click="$emit('delete-note',note.id)">
            <svg class="icon" height="10" width="10">
                <path id="mainDiagonal" d="M10 0 L0 10" stroke="firebrick" stroke-width="3" stroke-linecap="round"/>
                <path id="secondaryDiagonal" d="M0 0 L10 10" stroke="firebrick" stroke-width="3" stroke-linecap="round"/>
            </svg>
        </button>
        <pre>{{note}}</pre>
    </div>
    `,
    data() {
        return {
            txt: this.note.txt,
            type: this.note.type,
            color: this.note.color,
        }
    },
    computed: {
        compNote() {
            return keepService.createNote({ txt: this.txt, type: this.type, color: this.color })
        },
        background() {
            return `background :` + this.color + ';'
        }
    },
    methods: {
        onValueChange(event) {
            console.log('value changed to', event.target.value)
            this.$emit('change-txt', event.target.value)
        }
    }
}