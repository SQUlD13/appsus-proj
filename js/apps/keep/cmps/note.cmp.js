import { keepService } from '../services/keep.service.js'
import { eventBus } from '../../../services/event-bus.service.js'
import addBtn from '../../../cmps/add-btn.cmp.js'
import deleteBtn from '../../../cmps/delete-btn.cmp.js'
import noteControls from './note-controls.cmp.js'
import { utilService } from '../../../services/util.service.js'

export default {
    props: ['id', 'notedata'],
    template: `
    <div v-if="note" class="note" :style="background">
        <div v-if="!note.isList" class="note-content">
            <textarea v-if="note.content" class="note-text" :style="this.textStyle" v-model="note.content[0].txt" v-on:input="onValueChange($event.target.value,note.content[0].id)" />
        </div>
        <ul v-else class="note-content-list">
            <li v-for="text in note.content" class="note-content" :key="text.id">
                <textarea v-if="text" class="note-text" v-model="text.txt" :style="this.textStyle" />
                <delete-btn @delete="deleteContentListItem(text.id)" />                
            </li>
            <add-btn @add="addContentListItem(note.id)"/>
        </ul>

        <note-controls :note="note" @toggle-list="toggleList" @background-change="updateBackground" @delete-note="$emit('delete-note',this.id)"></note-controls>
</div>
    `,
    data() {
        return {
            note: null,
            color: null,
            isList: false,
            textColor: null
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
                    this.textColor = note.textColor
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
        textStyle() {
            return `color:` + this.textColor + ';'
        }
    },
    methods: {
        onValueChange(val, id) {
            console.log("🚀 ~ file: note.cmp.js ~ line 65 ~ onValueChange ~ val", val)
            // console.log('value changed to', event.target.value, id)
            // this.$emit('change-txt', event.target.value, id)
            keepService.getNote(this.id)
                .then(note => {
                    var idx = note.content.findIndex(text => text.id === id)
                    var obj = { txt: val, id: utilService.makeId() }
                    note.content.splice(idx, 1, obj)
                    keepService.updateNote(note)
                })

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
        },
        updateBackground({ color }) {
            this.color = color
        }
    },
    components: { addBtn, deleteBtn, noteControls }
}