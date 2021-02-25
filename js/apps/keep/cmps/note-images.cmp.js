import deleteBtn from '../../../cmps/delete-btn.cmp.js'

export default {
    props: ['note'],
    template: `
    <div class="note-images">
        <div class="note-img-wrapper" v-for="content in note.content">
            <template v-if="content.url">
                <img  :src="content.url" alt="" class="note-img">
                <delete-btn class="top-right" @delete="$emit('delete-img',content.id)" />
            </template>
        </div>
    </div>
    `,
    components: { deleteBtn }
}