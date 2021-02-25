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
            <button class="btn invert-btn img-add-btn" :style="background" @click="toggleSearch('img')">
                <p class="fas invert-btn" :style="color">'&#xf302;</p>
            </button>
            <delete-btn @delete="$emit('delete-note')" :info="{color: this.invertedColor}" :key="note.id" />
        </div>
        <pre >
         search type {{this.search}}
        </pre>
        <form v-if="search" @submit="$emit('add-'+search, searchVal)">
            <input v-model="searchVal" type="text" >
            <button type="submit"> submit </button>
        </form>
    </div>
    `,
    data() {
        return {
            search: null,
            searchVal: ''
        }
    },
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
    methods: {
        toggleSearch(val) {
            if (this.search === val) this.search = null
            else this.search = val
        }
    },
    components: { deleteBtn }
}