import { utilService } from '../../../services/util.service.js'
import { keepService } from '../services/keep.service.js'
import note from '../cmps/note.cmp.js'
import noteAdd from '../cmps/note-add.cmp.js'

export default {
    template: `
    <section class="keep-app main-container">
        <h1>keepApp</h1>        
        <noteAdd @add-note="addNote" :note="newNote"/>
        <ul v-if="notes" class="clean-list note-list">
            <!-- <transition-group name="list-column"> -->
                <li v-for="note in notes" :key="note.id">
                    <note :note="note" @delete-note="deleteNote" @add-note="addNote" @update-notes="updateNotes" 
                    @delete-note-item="deleteContentItem" @toggle-list="toggleList" @add-empty-line="addEmptyContentItem" @toggle-item="toggleItem" 
                    @text-change="updateText" @background-change="updateBackground"/>
                </li>
            <!-- </transition-group> -->
        </ul>
    <pre>{{this.notes}}</pre>
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
        this.newNote = keepService.createNote({ content: [{ txt: '' }], id: 'note-add' })
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
        },
        deleteContentItem(noteId, itemId) {
            keepService.deleteContentItem(noteId, itemId)
                .then(() => { this.updateNotes() })
                .catch(console.log())
        },
        addEmptyContentItem(noteId) {
            keepService.addContentItem(noteId)
                .then(() => { this.updateNotes() })
        },
        toggleList(noteId) {
            keepService.getNote(noteId)
                .then(note => {
                    note.isList = !note.isList
                    keepService.updateNote(note)
                        .then(() => { this.updateNotes() })
                })
        },
        toggleItem(noteId, itemId) {
            keepService.getNote(noteId)
                .then(note => {
                    var idx = note.content.findIndex(text => {
                        return text.id === itemId
                    })
                    var content = note.content[idx]
                    content.active = !content.active
                    note.content.splice(idx, 1, content)
                    keepService.updateNote(note)
                        .then(() => { this.updateNotes() })
                })
        },
        updateText(noteId, itemId, val) {
            keepService.getNote(noteId)
                .then(note => {
                    var idx = note.content.findIndex(text => text.id === itemId)
                    var text = note.content[idx]
                    var obj = { txt: val, id: text.id, active: text.active }
                    note.content.splice(idx, 1, obj)
                    keepService.updateNote(note)
                    //.then(() => { this.updateNotes() })
                })
        },
        updateBackground(noteId, color) {
            keepService.getNote(noteId)
                .then(note => {
                    note.color = color
                    keepService.updateNote(note)
                })
        }


    },
    components: {
        note,
        noteAdd
    }
}