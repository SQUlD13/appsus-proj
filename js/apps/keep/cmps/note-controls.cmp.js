import deleteBtn from '../../../cmps/delete-btn.cmp.js'
import { utilService } from '../../../services/util.service.js'
import { keepService } from '../services/keep.service.js'
export default {
    props: ['note'],
    template: `
    <div class="note-controls flex column jcc aic">
    <!-- <pre>{{note}}</pre> -->
        <div class="main-note-controls">
            <button class="btn center invert-btn note-cntrl-btn" >
                <div class="note-color-input-wrapper">
                    <input type="color" id="note-color" v-model="note.color" @input="$emit('background-change',note)" @change="$emit('background-save',note)"/>
                </div>
                <p class="fas palette-icon" :style="color">&#xf53f;</p>
            </button>
            <button class="btn invert-btn note-cntrl-btn list-toggle-btn" @click="$emit('toggle-list')">
                <p class="fas invert-btn list-icon" v-html="this.listContent" :style="color">{{listContent}}</p>
            </button>
            <button class="btn invert-btn note-cntrl-btn img-add-btn" @click="toggleSearch('img')">
                <p class="fas invert-btn" :style="color">&#xf302;</p>
            </button>
            <button class="btn invert-btn note-cntrl-btn vid-add-btn" @click="toggleSearch('vid')">
                <p class="fab invert-btn" :style="color">&#xf167;</p>
            </button>
            <delete-btn class="note-cntrl-btn" @delete="$emit('delete-note')" :info="{color: this.invertedColor}" :key="note.id" />
            <button class="btn pin-note-btn note-cntrl-btn invert-btn"  >
                <p class="invert-btn fas" :style="this.pinStyle" @click="$emit('pin-note')">&#xf08d;</p>
            </button>
        </div>


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
            return `color:${this.invertedColor};`
        },
        invertedColor() {
            return utilService.invertColor(this.note.color)
        },
        info() {
            return {
                size: 16,
                color: this.invertedColor
            }
        },
        pinStyle() {
            return (this.note.pinned) ? 'color:red;' : this.color
        }
    },
    methods: {
        toggleSearch(val) {
            if (this.search === val) this.search = null
            else this.search = val
            this.$emit('update-masonry')
        }
    },
    components: { deleteBtn }
}