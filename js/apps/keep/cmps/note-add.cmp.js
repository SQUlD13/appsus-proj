import { utilService } from '../../../services/util.service.js'
import { keepService } from '../services/keep.service.js'
import { eventBus } from '../../../services/event-bus.service.js'
import addBtn from '../../../cmps/add-btn.cmp.js'
import note from './note.cmp.js'

export default {
    props: ['note'],
    template: `
    <section class="note-add">
        <pre>{{this.note}}</pre>
        <add-btn @add="this.toggleActive" ></add-btn>
        <transition name="slide-down">
        <div v-if="isActive" class="new-note">
            <note :note="this.note" @delete-note="toggleActive()" @change-txt="updateContent"/>
            <button class="btn add-btn" @click="addNote">Add Note</button>
        </div>
        </transition>
    </section>
    `,
    data() {
        return {
            isActive: false,
            // plusColor: '#fff',
            // content: '',
            // type: '',
            // color: utilService.createRandomColor(),
            // id: utilService.makeId()
            //note: null
        }
    },
    // created() {
    //     keepService.getNote('note-add')
    //         .then(note => this.note = note)
    // },
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
    computed: {
        // note() {
        //     var note = {
        //         txt: [this.content],
        //         type: this.type,
        //         color: this.color,
        //         id: this.id
        //     }
        //     return keepService.createNote(note)
        // }
    },
    components: { note, addBtn }
}