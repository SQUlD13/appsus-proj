import deleteBtn from '../../../cmps/delete-btn.cmp.js'
export default {
    props: ['value', 'isList'],
    template: `
    <div class="note-controls">
            <!-- <button class="btn center color-select-btn" >
                <div class="note-color-input-wrapper" :style="background">
                    <input type="color" id="note-color" v-model="value" />
                </div>
                <p class="fa palette-icon" :style="'color:'+this.color+';'">&#xf53f;</p>
            </button> -->
    
            <button class="btn list-toggle-btn" @click="$emit('toggle-list')">
                <p class="fa list-icon" v-html="this.listContent" style="font-family:fas;">{{listContent}}</p>
            </button>
    
            <delete-btn @delete="$emit('delete-note')" />
        </div>
    `,
    computed: {
        listContent() {
            return (this.isList) ? '\&#xf0ca;' : '\&#xf550'
        },
    },
    components: { deleteBtn }
}