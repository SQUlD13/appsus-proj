import { keepService } from '../services/keep.service.js'
import note from '../cmps/note.cmp.js'
import noteAdd from '../cmps/note-add.cmp.js'

export default {
    template: `
    <section class="keep-app main-container">
        <h1>keepApp</h1>
        <router-link to="/"> Home </router-link>

        
        <noteAdd @add-note="addNote"/>

        <ul v-if="notes" class="clean-list note-list">
            <li v-for="note in notes">
                <note :id="note.id" :value="note.txt" @delete-note="deleteNote" @add-note="addNote"/>
            </li>
            <pre>{{notes}}</pre>
        </ul>
    </section>
    `,
    data() {
        return {
            notes: null,
            newNote: null
        }
    },
    created() {
        keepService.query()
            .then(notes => {
                if (!notes || notes.length < 1) {
                    keepService.createNotes()
                        .then(notes => this.notes = notes)
                } else this.notes = notes
            })
        this.newNote = keepService.createNote({})
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
        },
        addNote(note) {
            console.log('adding note', note)
            keepService.addNote(note)
                .then(() => {
                    this.updateNotes()
                })
        }
    },
    components: {
        note,
        noteAdd
    }
}