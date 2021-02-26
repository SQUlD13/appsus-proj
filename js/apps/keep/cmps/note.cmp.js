import { keepService } from '../services/keep.service.js'
import { eventBus } from '../../../services/event-bus.service.js'
import addBtn from '../../../cmps/add-btn.cmp.js'
import deleteBtn from '../../../cmps/delete-btn.cmp.js'
import longText from '../../../cmps/long-text.cmp.js'
import noteImages from './note-images.cmp.js'
import noteVideos from './note-videos.cmp.js'
import noteControls from './note-controls.cmp.js'
import { utilService } from '../../../services/util.service.js'

export default {
    props: ['note',],
    template: `
    <div class="note" :style="background">
        <!-- <pre>{{note}}</pre> -->
        <ul :class="contentClass">
            <note-images :note="note" 
            @delete-img="(lineId)=>{deleteLine(lineId,'img')}" />
             <!-- @delete-img="(lineId)=>$emit('delete-note-item',note.id,lineId,'img')" -->

            <note-videos :videos="note.vid" @delete-vid="(vidId)=>{deleteLine(vidId,'vid')}">
                
            </note-videos>

            <li v-for="txt in note.txt" :key="txt.id">
                <!-- <pre>text:{{txt}}</pre> -->
                <long-text v-if="txt.txt || txt.txt === ''" :value="txt.txt" class="note-text" :line="txt" :isList="note.isList" :style="getStyle(txt.active)" 
                 @update-text="(val)=>{$emit('text-change',note.id,txt.id,val)}" @click="toggleItem(txt.id)" /> 
                <delete-btn v-if="(txt.txt || txt.txt === '') && note.isList" @delete="deleteLine(txt.id,'txt')" />
                <!-- @delete="$emit('delete-note-item',note.id,txt.id,'txt')" -->
                <button  class="btn" @click="txt.editing = !txt.editing">edit text</button>                
            </li>

            <add-btn v-if="this.note.isList"  @add="addEmptyLine" />
            <!-- @add="$emit('add-empty-line',note.id)" -->
        </ul>

        <note-controls :note="note" @toggle-list="toggleList" @background-change="$emit('background-change',note.id,note.color)" 
        @delete-note="$emit('delete-note',note.id)" @background-save="saveNote" @add-img="(url)=>$emit('add-img',note.id,url)"
        @add-vid="(url)=>$emit('add-vid',note.id,url)"    @pin-note="pinNote"></note-controls>
</div>
    `,
    data() {
        return {
            color: this.note.color || utilService.createRandomColor(),
            // note: null
        }
    },
    computed: {
        txt() {
            return ((this.note.content.txt && this.note.content.txt[0])) ? this.note.content[0].txt : ''
        },
        compNote() {
            return keepService.createNote({ txt: this.txt, isList: this.isList, color: this.color })
        },
        background() {
            return `background :` + this.note.color + ';'
        },
        textStyle() {
            return `color:` + utilService.invertColor(this.color) + ';'
        },
        contentClass() {
            var str = 'clean-list '
            str += (this.note.isList) ? 'note-content-list' : ''
            return str
        }
    },
    methods: {
        updateBackground({ color }) {
            //this.color = color
        },
        getStyle(activeBool) {
            return (activeBool) ? this.textStyle : 'text-decoration: line-through;' + this.textStyle
        },
        saveNote() {
            keepService.getNote(this.note.id)
                .then(() => {
                    keepService.updateNote(this.note)
                })
        },
        toggleItem(contentId) {
            if (this.note.isList) this.$emit('toggle-item', this.note.id, contentId)
        },
        toggleList() {
            keepService.getNote(this.note.id)
                .then((note) => {
                    keepService.toggleNoteList(note)
                        .then((note => {
                            //note.isList = !note.isList
                            this.note.isList = note.isList
                            this.note.txt = note.txt;
                            console.log("🚀 ~ file: note.cmp.js ~ line 86 ~ .then ~ note.txt;", note)
                            keepService.updateNote(note)
                                //.then(() => { this.$emit('toggle-list', this.note.id) })
                                .then(() => {
                                    //this.$emit('update-notes')
                                    this.$forceUpdate()
                                })
                        }))
                    // this.updateNotes()

                })
        },
        addEmptyLine() {
            keepService.addEmptyText(this.note.id)
                .then((note) => {
                    this.note.txt = note.txt
                })
        },
        deleteLine(lineId, type) {
            keepService.deleteContentItem(this.note.id, lineId, type)
                .then((note) => {
                    this.note.txt = note.txt
                    this.note.img = note.img
                    this.note.vid = note.vid
                })
        },
        pinNote() {
            console.log('calling pin note')
            // keepService.getNote(this.note.id)
            //     .then((note) => {
            //         console.log("🚀 ~ file: note.cmp.js ~ line 116 ~ .then ~ note", note)
            //         note.pinned = !note.pinned
            //         this.note.pinned = note.pinned
            //         //keepService.updateNote(note)
            //     })
            keepService.toggleNotePin(this.note.id)
                .then((note) => {
                    console.log("🚀 ~ file: note.cmp.js ~ line 123 ~ .then ~ note", note)
                    this.note.pinned = note.pinned
                    this.$emit('update-notes')
                })
        }
    },
    watch: {
        note(val, newVal) {
            //console.log('watching note. val', val.txt, 'newVal', newVal.txt)
            this.note.txt = newVal.txt
            this.$forceUpdate()
        }
    }
    ,
    components: { addBtn, deleteBtn, longText, noteControls, noteImages, noteVideos }
}