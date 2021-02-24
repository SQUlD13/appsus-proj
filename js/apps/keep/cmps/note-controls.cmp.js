import deleteBtn from '../../../cmps/delete-btn.cmp.js'
import { utilService } from '../../../services/util.service.js'
import { keepService } from '../services/keep.service.js'
export default {
    props: ['note'],
    template: `
    <div class="note-controls">
        <div class="main-note-controls">
            <button class="btn center invert-btn" >
                <div class="note-color-input-wrapper" :style="background">
                    <input type="color" id="note-color" v-model="note.color" @input="$emit('background-change',note)" @change="$emit('background-save',note)"/>
                </div>
                <p class="fas palette-icon" :style="color">&#xf53f;</p>
            </button>
            <button class="btn invert-btn list-toggle-btn" @click="$emit('toggle-list')" :style="background">
                <p class="fas invert-btn list-icon" v-html="this.listContent" :style="color">{{listContent}}</p>
            </button>
            <delete-btn @delete="$emit('delete-note')" :info="this.info" :key="info.color"/>
        </div>
    </div>
    `,
    computed: {
        listContent() {
            return (this.note.isList) ? '\&#xf0ca;' : '\&#xf550'
        },
        background() {
            return `background:${this.note.color};`
        },
        color() {
            return `color:${this.note.color};`
        },
        invertedColor() {
            return utilService.invertColor(this.note.color)
        },
        info() {
            return {
                size: 16,
                color: this.invertedColor
            }
        }
    },
    components: { deleteBtn }
}