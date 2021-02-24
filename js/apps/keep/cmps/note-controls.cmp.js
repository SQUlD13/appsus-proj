import deleteBtn from '../../../cmps/delete-btn.cmp.js'
import { keepService } from '../services/keep.service.js'
export default {
    props: ['note'],
    template: `
    <div class="note-controls">
            <button class="btn center color-select-btn" >
                <div class="note-color-input-wrapper" :style="background">
                    <input type="color" id="note-color" v-model="note.color" @input="$emit('background-change',note)" @submit="$emit('background-save',bgc)"/>
                </div>
                <p class="fas palette-icon" :style="'color:'+this.bgc+';'">&#xf53f;</p>
            </button>
            <button class="btn list-toggle-btn" @click="$emit('toggle-list')">
                <p class="fas list-icon" v-html="this.listContent" style="font-family:fas;">{{listContent}}</p>
            </button>
            <delete-btn @delete="$emit('delete-note')" />
        </div>
    `,
    computed: {
        listContent() {
            return (this.isList) ? '\&#xf0ca;' : '\&#xf550'
        },
        background() {
            return `background:${this.note.color};`
        }
    },
    components: { deleteBtn }
}