import { utilService } from '../../../services/util.service.js'
import { keepService } from '../services/keep.service.js'
import { eventBus } from '../../../services/event-bus.service.js'
import addBtn from '../../../cmps/add-btn.cmp.js'
import note from './note.cmp.js'

export default {
    template: `
    <section class="note-add">
        <!-- <pre>{{this.note}}</pre> -->
        <add-btn  @add="$emit('add-empty-note')" :info="{color:'var(--white)'}"/>
         <!-- @add="$emit('add-empty-note')" -->
        <transition name="slide-down">
        <div v-if="isActive" class="new-note">

            <note :note="this.note" @delete-note="toggleActive()" @change-txt="updateContent" @add-img="(url)=>$emit('add-img',note.id,url)"
                />
            
            <button class="btn add-btn" @click="addNote">Add Note</button>
        </div>
        </transition>
    </section>
    `,
    data() {
        return {
            isActive: false,
            isList: false,
            color: utilService.createRandomColor(),
            img: [],
            vid: [],
            txt: [' ']
        }
    },
    computed: {
        note() {
            return keepService.createNote({ isActive: this.isActive, isList: this.isList, color: this.color, img: this.img, vid: this.vid, txt: this.txt })
        }
    },
    methods: {
        addNote() {
            this.$emit('add-note', this.note)
        },
        updateContent(txt) {
            this.content = txt
        },
        toggleActive() {
            console.log('closing new note')
            this.content = ''
            this.isActive = !this.isActive;
        }
    },
    components: { note, addBtn }
}