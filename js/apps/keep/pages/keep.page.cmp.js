import { keepService } from '../services/keep.service.js'
import note from '../cmps/note.cmp.js'

export default {
    template: `
    <section class="keep-app main-container">
        <h1>keepApp</h1>

        <button class="btn add-btn">
            <svg class="icon" height="10" width="10">
                <path id="Vertical" d="M5 10 L5 0" :stroke="this.plusColor" stroke-width="3" stroke-linecap="round"/>
                <path id="Horizontal" d="M0 5 L10 5" :stroke="this.plusColor" stroke-width="3" stroke-linecap="round"/>
            </svg>
        </button>  

        <ul v-if="notes" class="clean-list note-list">
            <li v-for="note in notes" @>
                <note :note="note" @delete-note="deleteNote"> </note>
            </li>
            <pre>{{notes}}</pre>
        </ul>
        <router-link to="/"> Home </router-link>
    </section>
    `,
    data() {
        return {
            notes: null,
            plusColor: '#222',
        }
    },
    created() {
        keepService.query()
            .then(notes => {
                if (!notes || notes.length < 1) {
                    this.notes = keepService.createNotes()
                } else this.notes = notes
            })
    },
    methods: {
        deleteNote(id) {
            keepService.deleteNote(id)
                .then(() => { this.updateNotes() })

        },
        updateNotes() {
            keepService.query()
                .then(notes => {
                    this.notes = notes
                })
        }
    },
    components: {
        note
    }
}