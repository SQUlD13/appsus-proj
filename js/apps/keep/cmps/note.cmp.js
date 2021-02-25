import { keepService } from '../services/keep.service.js'
import { eventBus } from '../../../services/event-bus.service.js'
import addBtn from '../../../cmps/add-btn.cmp.js'
import deleteBtn from '../../../cmps/delete-btn.cmp.js'
import noteImages from './note-images.cmp.js'
import noteControls from './note-controls.cmp.js'
import { utilService } from '../../../services/util.service.js'

export default {
    props: ['note',],
    template: `
    <div class="note" :style="background">
        <pre>{{note}}</pre>

        <ul :class="contentClass">
            <note-images  @delete-note-item="$emit('delete-content-line',this.id,noteId) " :note="note" 
            @click.native="(lineId)=>$emit('delete-note-item',id,lineId)" />

            <li v-if="note.content" v-for="content in note.content" class="note-content" :key="content.id">
                <textarea  v-if="content.txt || content.txt === ''" class="note-text" v-model="content.txt" :style="getStyle(content.active)" 
                v-on:input="$emit('text-change',note.id,content.id,$event.target.value)" @click="toggleItem(content.id)"/>
                <delete-btn v-if="(content.txt || content.txt === '') && note.isList" @delete="$emit('delete-note-item',note.id,content.id)" />                
            </li>

            <add-btn v-if="this.note.isList" @add="$emit('add-empty-line',note.id)"  />
        </ul>

        <note-controls :note="note" @toggle-list="$emit('toggle-list',note.id)" @background-change="$emit('background-change',note.id,note.color)" @delete-note="$emit('delete-note',id)" 
        @background-save="saveNote"></note-controls>
</div>
    `,
    data() {
        return {
            color: this.note.color || utilService.createRandomColor(),
        }
    },
    // created() {
    //     if (!this.notedata) {
    //         console.log('no notedata param')
    //         keepService.getNote(this.id)
    //             .then(note => {
    //                 this.note = note
    //                 this.color = note.color
    //                 this.isList = note.isList
    //                 this.textColor = note.textColor
    //             })
    //     }
    //     else {
    //         this.note = keepService.createNote(this.notedata)
    //         this.color = this.note.color
    //     }
    // },
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
        }
    },
    components: { addBtn, deleteBtn, noteControls, noteImages }
}