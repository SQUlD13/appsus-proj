import deleteBtn from '../../../cmps/delete-btn.cmp.js'

export default {
    props: ['note'],
    template: `
    <div class="note-images">
        <template class="note-img-wrapper" v-for="(img,idx) in note.img">
            <template v-if="img.url">
                <!-- <pre>{{getStyle()}}</pre> -->
                <img  :src="img.url" alt="" class="note-img" :style="getStyle(idx)">
                <delete-btn  @delete="$emit('delete-img',img.id)" />
            </template>
        </template>
    </div>
    `,
    methods: {
        getStyle(idx) {
            console.log('getting style for', idx)
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