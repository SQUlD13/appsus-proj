import { utilService } from '../../../services/util.service.js'
import { keepService } from '../services/keep.service.js'
import { eventBus } from '../../../services/event-bus.service.js'
import addBtn from '../../../cmps/add-btn.cmp.js'
import note from './note.cmp.js'

export default {
    props: ['note'],
    template: `
    <section class="note-add">
        <!-- <pre>{{this.note}}</pre> -->
        <add-btn @add="this.toggleActive" ></add-btn>
        <transition name="slide-down">
        <div v-if="isActive" class="new-note">
            <note :note="this.note" @delete-note="toggleActive()" @change-txt="updateContent" @add-img="(url)=>$emit('add-img',note.id,url)"/>
            
            <button class="btn add-btn" @click="addNote" @>Add Note</button>
        </div>
        </transition>
    </section>
    `,
    data() {
        return {
            isActive: false,
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