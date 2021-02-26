import deleteBtn from '../../../cmps/delete-btn.cmp.js'

export default {
    props: ['note'],
    template: `
    <div class="note-images">
        <div class="note-img-wrapper" v-for="img in note.img">
            <template v-if="img.url">
                <img  :src="img.url" alt="" class="note-img">
                <delete-btn class="top-right" @delete="$emit('delete-img',img.id)" />
            </template>
        </div>
    </div>
    `,
    components: { deleteBtn }
}