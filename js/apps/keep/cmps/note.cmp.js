import { keepService } from '../services/keep.service.js'
import { eventBus } from '../../../services/event-bus.service.js'
import addBtn from '../../../cmps/add-btn.cmp.js'
import deleteBtn from '../../../cmps/delete-btn.cmp.js'
import noteControls from './note-controls.cmp.js'

export default {
    props: ['id', 'notedata'],
    template: `
    <div v-if="note" class="note" :style="background">
        <div v-if="!note.isList" class="note-content">
            <textarea v-if="note.content" class="note-text"  v-model="note.content[0].txt" v-on:input="onValueChange($event,note.id)" />
        </div>
        <ul v-else class="note-content-list">
            <li v-for="text in note.content" class="note-content" :key="text.id">
                <textarea v-if="text" class="note-text" v-model="text.txt" />
                <delete-btn @delete="deleteContentListItem(text.id)" />                
            </li>
            <add-btn @add="addContentListItem(note.id)"/>
        </ul>

        <note-controls @toggle-list="toggleList" v-model="color" :isList="this.isList" @delete-note="$emit('delete-note')"></note-controls>
</div>
    `,
    data() {
        return {
            note: null,
            color: null,
            isList: false,
        }
    },
    created() {
        if (!this.notedata) {
            console.log('no notedata param')
            keepService.getNote(this.id)
                .then(note => {
                    this.note = note
                    this.color = note.color
                    this.isList = note.isList
                })
        }
        else {
            this.note = keepService.createNote(this.notedata)
            this.color = this.note.color
        }
    },
    computed: {
        txt() {
            return ((this.note.content && this.note.content[0])) ? this.note.content[0].txt : ''
        },
        compNote() {
            return keepService.createNote({ txt: this.txt, isList: this.isList, color: this.color })
        },
        background() {
            return `background :` + this.color + ';'
        },
    },
    methods: {
        onValueChange(event, id) {
            console.log('value changed to', event.target.value, id)
            this.$emit('change-txt', event.target.value, id)
        },
        toggleList() {
            this.note.isList = !this.note.isList
            keepService.updateNote(this.note, this.id)
        },
        addContentListItem(noteId) {
            keepService.addContentListItem(noteId)
                .then((note) => {
                    console.log("🚀 ~ file: note.cmp.js ~ line 71 ~ .then ~ note", note)
                    this.note = note
                    console.log('add success EventBus Message - note.cmp line 98')
                })
        },
        deleteContentListItem(listItemId) {
            keepService.getNote(this.id)
                .then(note => {
                    var listItemIdx = note.content.findIndex(content => content.id === listItemId)
                    note.content.splice(listItemIdx, 1)
                    this.note = note
                    keepService.updateNote(note)
                        .then(console.log('delete success EventBus Message - note.cmp line 98'))
                })
        }
    },
    components: { addBtn, deleteBtn, noteControls }
}