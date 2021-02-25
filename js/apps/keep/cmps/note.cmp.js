import { keepService } from '../services/keep.service.js'
import { eventBus } from '../../../services/event-bus.service.js'
import addBtn from '../../../cmps/add-btn.cmp.js'
import deleteBtn from '../../../cmps/delete-btn.cmp.js'
import longText from '../../../cmps/long-text.cmp.js'
import noteImages from './note-images.cmp.js'
import noteControls from './note-controls.cmp.js'
import { utilService } from '../../../services/util.service.js'

export default {
    props: ['note',],
    template: `
    <div class="note" :style="background">

        <ul :class="contentClass">
            <note-images :note="note" 
            @delete-img="(lineId)=>$emit('delete-note-item',note.id,lineId,'img')" />

            <li v-for="txt in note.txt" :key="txt.id">
                <long-text v-if="txt.txt || txt.txt === ''" :value="txt.txt" class="note-text" :style="getStyle(txt.active)" 
                 @update-text="(val)=>{$emit('text-change',note.id,txt.id,val)}" @click="toggleItem(txt.id)" /> 

                <delete-btn v-if="(txt.txt || txt.txt === '') && note.isList" @delete="$emit('delete-note-item',note.id,txt.id,'txt')" />                
            </li>

            <add-btn v-if="this.note.isList" @add="$emit('add-empty-line',note.id)"  />
        </ul>

        <note-controls :note="note" @toggle-list="$emit('toggle-list',note.id)" @background-change="$emit('background-change',note.id,note.color)" 
        @delete-note="$emit('delete-note',note.id)" @background-save="saveNote" @add-img="(url)=>$emit('add-img',note.id,url)"></note-controls>
</div>
    `,
    data() {
        return {
            color: this.note.color || utilService.createRandomColor(),
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
        }
    },
    components: { addBtn, deleteBtn, longText, noteControls, noteImages }
}