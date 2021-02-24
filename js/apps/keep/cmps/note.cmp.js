import { keepService } from '../services/keep.service.js'
import { eventBus } from '../../../services/event-bus.service.js'
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage-service.js'

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
                <button class="btn delete-btn" @click="deleteContentListItem(text.id)">
                    <svg class="icon" height="10" width="10">
                        <path id="mainDiagonal" d="M10 0 L0 10" stroke="firebrick" stroke-width="3" stroke-linecap="round"/>
                        <path id="secondaryDiagonal" d="M0 0 L10 10" stroke="firebrick" stroke-width="3" stroke-linecap="round"/>
                    </svg>
                </button>
            </li>
            <button class="btn add-list-btn" @click="addContentListItem(note.id)">
                <svg class="icon" height="10" width="10">
                        <path id="horizontal" d="M5 0 L5 10" stroke="#8A8F89" stroke-width="3" stroke-linecap="round"/>
                        <path id="vertical" d="M0 5 L10 5" stroke="#8A8F89" stroke-width="3" stroke-linecap="round"/>
                    </svg>
            </button>
        </ul>


        <div class="note-controls">
            <button class="btn center color-select-btn" >
                <div class="note-color-input-wrapper" :style="background">
                    <input type="color" id="note-color" v-model="color" />
                </div>
                <p class="fa palette-icon" :style="'color:'+this.color+';'">&#xf53f;</p>
            </button>
    
            <button class="btn list-toggle-btn" @click="toggleList">
                <p class="fa list-icon" v-html="this.listContent" :style="listStyle"></p>
            </button>
    
            <button class="btn delete-btn" @click="$emit('delete-note',note.id)">
                <svg class="icon" height="10" width="10">
                    <path id="mainDiagonal" d="M10 0 L0 10" stroke="firebrick" stroke-width="3" stroke-linecap="round"/>
                    <path id="secondaryDiagonal" d="M0 0 L10 10" stroke="firebrick" stroke-width="3" stroke-linecap="round"/>
                </svg>
            </button>
        </div>
</div>
    `,
    data() {
        return {
            note: null,
            color: null
        }
    },
    created() {
        if (!this.notedata) {
            console.log('no notedata param')
            keepService.getNote(this.id)
                .then(note => {
                    this.note = note
                    this.color = note.color
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
        listContent() {
            return (this.note.isList) ? '\&#xf0ca;' : '\&#xf550'
        },
        listStyle() {
            return `font-family:fas;`
        }
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
}