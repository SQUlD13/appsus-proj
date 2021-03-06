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
            @delete-img="(lineId)=>{$emit('delete-line',note.id,lineId,'img')}" @update-masonry="$emit('update-masonry')"/>

            <note-videos :videos="note.vid" 
            @delete-vid="(vidId)=>{$emit('delete-line',note.id,vidId,'vid')}" @update-masonry="$emit('update-masonry')"/>
                
            <li class="note-item" v-for="txt in note.txt" :key="txt.id">
                <!-- <pre>text:{{txt}}</pre> -->
                <long-text v-if="txt.txt || txt.txt === ''" :value="txt.txt" class="note-text" :line="txt" :isList="note.isList" :style="getStyle(txt.active)" 
                 @update-text="(val)=>{$emit('text-change',note.id,txt.id,val); txt.txt = val}" @click="toggleItem(txt.id)" /> 
                 <div class="line-controls flex jcc aic">
                    <delete-btn v-if="(txt.txt || txt.txt === '') && note.isList" @delete="$emit('delete-line',note.id,txt.id,'txt')" />
                    <button class="btn invert-btn fas note-cntrl-btn" @click="txt.editing = !txt.editing" :style="'color:'+note.color+';'">&#xf044;</button>                
                 </div>
            </li>

            <add-btn class="note-cntrl-btn invert-btn"v-if="this.note.isList"  @add="$emit('add-empty-line',note.id)" :info="{color:note.color}"/>
        </ul>

        <note-controls class="flex jcc auc" :note="note" @toggle-list="$emit('toggle-list',note.id)" @background-change="$emit('background-change',note.id,note.color)" 
        @delete-note="$emit('delete-note',note.id)" @background-save="saveNote" @add-img="(url)=>$emit('add-img',note.id,url)"
        @add-vid="(url)=>$emit('add-vid',note.id,url)" @pin-note="$emit('pin-note',note.id)" @update-masonry="$emit('update-masonry')"></note-controls>
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
        getStyle(activeBool) {
            var color = utilService.invertColor(this.note.color)
            var base = `color:${color};`
            var activeStr = (activeBool) ? '' : 'text-decoration: line-through;'
            return base + activeStr
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

    },

    components: { addBtn, deleteBtn, longText, noteControls, noteImages, noteVideos }
}