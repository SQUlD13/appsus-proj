import deleteBtn from '../../../cmps/delete-btn.cmp.js'

export default {
    props: ['note'],
    template: `
    <div class="note-images">
        <div class="note-img-wrapper pos-relative" v-for="(img,idx) in note.img">
            <template v-if="img.url">
                <!-- <pre>{{getStyle()}}</pre> -->
                <img  :src="img.url" alt="" class="note-img" :style="getStyle(idx)" @load="$emit('update-masonry')">
                <delete-btn  class="top-right" @delete="$emit('delete-img',img.id)" />
            </template>
        </div>
    </div>
    `,
    methods: {
        getStyle(idx) {
            if (this.note.img.length % 2) {
                if (idx === this.note.img.length - 1) return 'grid-column: 1/ span 2;'
                else if (idx % 2) return 'grid-column: 2/ span 1;grid-row:' + (idx + 1) + '/ span 1;'
                else return 'grid-column:1/span 1; '
            } else {
                return 'grid-column: 1/span2;'
            }
        }
    },
    components: { deleteBtn }
}