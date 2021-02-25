import { utilService } from '../../../services/util.service.js'
import { keepService } from '../services/keep.service.js'
import longText from '../../../cmps/long-text.cmp.js'
import note from '../cmps/note.cmp.js'
import noteAdd from '../cmps/note-add.cmp.js'

export default {
    template: `
    <section class="keep-app main-container">
        <h1>keepApp</h1>        
        <noteAdd @add-note="addNote" :note="newNote" @add-img="addImage"/>
        <ul v-if="notes" class="clean-list note-list">
            <!-- <transition-group name="list-column"> -->
                <li v-for="note in notes" :key="note.id">
                    <note v-if="note.id !== 'note-add'":note="note" @delete-note="deleteNote" @add-note="addNote" @update-notes="updateNotes" 
                    @delete-note-item="deleteContentItem" @toggle-list="toggleList" @add-empty-line="addEmptyContentItem" @toggle-item="toggleItem" 
                    @text-change="updateText" @background-change="updateBackground" @add-img="addImage"/>
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
                this.newNote = notes.find(notes => notes.id === 'note-add')
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
        },
        addNote(note) {
            console.log('adding note', note)
            keepService.addNote(note)
                .then(() => {
                    this.updateNotes()
                })
        },
        deleteContentItem(noteId, itemId, type) {
            keepService.deleteContentItem(noteId, itemId, type)
                .then(() => { this.updateNotes() })
                .catch(console.log())
        },
        addEmptyContentItem(noteId) {
            keepService.addEmptyText(noteId)
                .then(() => { this.updateNotes() })
        },
        toggleList(noteId) {
            keepService.getNote(noteId)
                .then(note => {
                    keepService.toggleNoteList(note)

                    note.isList = !note.isList
                    keepService.updateNote(note)
                        .then(() => { this.updateNotes() })
                })
        },
        toggleItem(noteId, itemId) {
            keepService.getNote(noteId)
                .then(note => {
                    var idx = note.txt.findIndex(text => {
                        return text.id === itemId
                    })
                    var txt = note.txt[idx]
                    txt.active = !txt.active
                    note.txt.splice(idx, 1, txt)
                    keepService.updateNote(note)
                        .then(() => { this.updateNotes() })
                })
        },
        updateText(noteId, itemId, val) {
            keepService.getNote(noteId)
                .then(note => {
                    var idx = note.txt.findIndex(text => text.id === itemId)
                    var text = note.txt[idx]
                    var obj = { txt: val, id: text.id, active: text.active }
                    note.txt.splice(idx, 1, obj)
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
        },
        addImage(noteId, url) {
            console.log('adding image to note', noteId, '.\n image url is ', url)
            keepService.getNote(noteId)
                .then(note => {
                    console.log("🚀 ~ file: keep.page.cmp.js ~ line 113 ~ addImage ~ note", note)
                    note.img.push({ url, id: utilService.makeId() })
                    keepService.updateNote(note)
                        .then(() => { this.updateNotes() })
                })
        }

    },
    components: {
        note,
        noteAdd
    }
}