import { keepService } from '../services/keep.service.js'
import { eventBus } from '../../../services/event-bus.service.js'
import note from './note.cmp.js'
import { utilService } from '../../../services/util.service.js'

export default {
    template: `
    <section class="note-add">
        <button class="btn add-btn" @click="isActive = !isActive">
            <svg class="icon" height="10" width="10">
                <path id="Vertical" d="M5 10 L5 0" :stroke="plusColor" stroke-width="3" stroke-linecap="round"/>
                <path id="Horizontal" d="M0 5 L10 5" :stroke="plusColor" stroke-width="3" stroke-linecap="round"/>
            </svg>
        </button>  
        <div v-if="isActive" class="new-note">
            <note :note="this.note" @delete-note="isActive = !isActive" @change-txt="updateContent"/>
            <button class="btn add-btn" @click="addNote">Add Note</button>
        </div>
        <pre>{{note}} Active:{{isActive}}</pre>
    </section>
    `,
    data() {
        return {
            isActive: false,
            plusColor: '#fff',
            content: '',
            type: '',
            color: utilService.createRandomColor()
        }
    },
    methods: {
        addNote() {
            this.$emit('add-note', this.note)
        },
        updateContent(txt) {
            this.content = txt
        }
    },
    computed: {
        note() {
            var note = {
                txt: this.content,
                type: this.type,
                color: this.color,
            }
            return keepService.createNote(note)
        }
    },
    components: { note }
}