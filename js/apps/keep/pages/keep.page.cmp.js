import { utilService } from '../../../services/util.service.js'
import { keepService } from '../services/keep.service.js'
import longText from '../../../cmps/long-text.cmp.js'
import note from '../cmps/note.cmp.js'
import noteAdd from '../cmps/note-add.cmp.js'

export default {
    template: `
    <section class="keep-app main-container">
        <h1>keepApp</h1>       
        <!-- <pre>{{notes}}</pre>  -->
        <noteAdd @add-note="addNote" :note="newNote" @add-img="addImage"/>
        <ul v-if="notes" class="clean-list note-list">
            <!-- <transition-group name="list-column"> -->
                <li v-for="note in notes" :key="note.id">
                <!-- <pre>{{note}}</pre> -->
                    <note  v-if="note.id !== 'note-add'" :note="note" @delete-note="deleteNote" @add-note="addNote" @update-notes="updateNotes" 
                    @toggle-item="toggleItem" @text-change="updateText" @background-change="updateBackground"
                    @add-vid="addVideo" @add-img="addImage"/>
                    <!-- @add-empty-line="addEmptyContentItem" @delete-note-item="deleteContentItem"-->
                </li>
            <!-- </transition-group> -->
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
                        .then(() => {
                            keepService.query()
                                .then((notes) => {
                                    notes.push(newNote)
                                    this.notes = notes
                                })
                        })
                } else this.notes = notes
            })
        var newNote = keepService.createNote({ txt: [' '], id: 'note-add', editing: [0] })
        this.newNote = newNote
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
                    console.log('updating notes')
                })
        },
        addNote(note) {
            console.log('adding note', note)
            keepService.addNote(note)
                .then(() => {
                    this.updateNotes()
                })
        },
        // deleteContentItem(noteId, itemId, type) {
        //     keepService.deleteContentItem(noteId, itemId, type)
        //         .then(() => { this.updateNotes() })
        //         .catch(console.log())
        // },
        // addEmptyContentItem(noteId) {
        //     keepService.addEmptyText(noteId)
        //         .then(() => { this.updateNotes(); this.$forceUpdate() })
        // },
        // toggleList(noteId) {
        //     keepService.getNote(noteId)
        //         .then(note => {
        //             keepService.toggleNoteList(note)
        //                 .then(note => {
        //                     //note.isList = !note.isList
        //                     console.log("🚀 ~ file: keep.page.cmp.js ~ line 87 ~ toggleList ~ note", note)
        //                     //keepService.updateNote(note)
        //                     //    .then(() => { this.updateNotes() })
        //                 })
        //         })
        //},
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
            console.log("🚀 ~ file: keep.page.cmp.js ~ line 92 ~ updateText ~ val", val)
            keepService.getNote(noteId)
                .then(note => {
                    var idx = note.txt.findIndex(text => text.id === itemId)
                    var text = note.txt[idx]
                    var obj = { txt: val, id: text.id, active: text.active, editing: text.editing }
                    note.txt.splice(idx, 1, obj)
                    keepService.updateNote(note)
                        .then(() => { this.updateNotes() })
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
        },
        addVideo(noteId, url) {
            console.log('adding video to note', noteId, '.\n video url is ', url)
            keepService.getNote(noteId)
                .then(note => {
                    var queryStr = '/watch?v='
                    var idx = url.indexOf('/watch?v=')
                    if (idx < 0) Promise.reject('Not a valid youtube url')
                    var id = url.slice(idx + queryStr.length)
                    var queryUrl = `https://www.youtube.com/embed/${id}`
                    note.vid.push({ url: queryUrl, id: utilService.makeId() })
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