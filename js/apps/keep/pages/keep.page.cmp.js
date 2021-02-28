import { utilService } from '../../../services/util.service.js'
import { keepService } from '../services/keep.service.js'
// import longText from '../../../cmps/long-text.cmp.js'
import note from '../cmps/note.cmp.js'
import noteAdd from '../cmps/note-add.cmp.js'
import { eventBus } from '../../../services/event-bus.service.js'

// import Masonry from '../../../lib/masonry.pkgd.js';


export default {
    template: `
    <section class="keep-app main-container">
        <header class="flex jcc aic column">
            <h1>Keeps!</h1>  
            <p>The place for all your note taking needs</p>     
        </header>
        <!-- <pre>{{notes}}</pre>  -->
        <noteAdd @add-empty-note="addEmptyNote" @add-note="addNote" :note="newNote" @add-img="addImage"/>
        <section ref="grid" class="clean-list note-list">
                    <div class="gutter-sizer"></div>
                <!-- <pre>{{note}}</pre> -->
                    <note  class="note-list-item" v-for="note in notes" :key="note.id" @update-masonry="setMasonry"
                    v-if="note.id !== 'note-add'" :note="note" @delete-note="deleteNote" @add-note="addNote" @update-notes="updateNotes" 
                    @toggle-item="toggleItem" @text-change="updateText" @background-change="updateBackground"
                    @add-vid="addVideo" @add-img="addImage" @add-empty-line="addEmptyLine" @delete-line="deleteLine" 
                    @toggle-list="toggleList" @pin-note="pinNote"/>
                
        </section>
    </section>
    `,
    data() {
        return {
            notes: null,
            newNote: null,
            masonry: null,
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
                } else {
                    this.notes = notes
                    this.setMasonry()
                }
            })
        var newNote = keepService.createNote({ txt: [' '], id: 'note-add', editing: [0] })
        this.newNote = newNote
    },
    mounted() {


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
                    this.setMasonry()
                })
        },
        addNote(note) {
            console.log('adding note', note)
            keepService.addNote(note)
                .then(this.updateNotes)
        },
        addEmptyNote() {
            console.log('adding Empty Note')
            var note = keepService.createNote({
                txt: [' ']
            })
            keepService.addNote(note)
                .then(this.updateNotes)
        },
        addEmptyLine(noteId) {
            keepService.addEmptyText(noteId)
                .then((note) => {
                    this.updateNotes()
                })
        },
        deleteLine(noteId, lineId, type) {
            keepService.deleteContentItem(noteId, lineId, type)
                .then((ans) => {
                    console.log("🚀 ~ file: keep.page.cmp.js ~ line 88 ~ .then ~ ans", ans)
                    this.updateNotes()
                })
                .catch((err) => {
                    eventBus.$emit('notify', { str: err, status: 'error' })
                })
        },
        toggleList(noteId) {
            keepService.getNote(noteId)
                .then(note => {
                    keepService.toggleNoteList(note)
                        .then(note => {
                            console.log("🚀 ~ file: keep.page.cmp.js ~ line 87 ~ toggleList ~ note", note)
                            this.updateNotes()
                        })
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
        },
        pinNote(noteId) {
            console.log('calling pin note')
            keepService.toggleNotePin(noteId)
                .then(this.updateNotes)
        },
        setMasonry() {
            this.$nextTick(() => {
                this.masonry = new Masonry(this.$refs.grid, {
                    itemSelector: '.note',
                    gutter: '.gutter-sizer'
                })
            })
        }
    },
    watch: {
        '$route.query'(to) {
            keepService.setFilter(to.str)
                .then(this.updateNotes())
        },
        'notes'(to) {
            this.masonry = new Masonry(this.$refs.grid)
        }
    },
    components: {
        note,
        noteAdd
    }
}