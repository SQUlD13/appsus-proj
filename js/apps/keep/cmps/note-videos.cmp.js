import deleteBtn from '../../../cmps/delete-btn.cmp.js'


export default {
    props: ['videos'],
    template: `
        <div class="note-videos">
                <template v-if="videos">
                    <template v-for="(video,idx) in videos">
                        <pre>{{video}}</pre>
                        <iframe :src="video.url" width="500px" height="250px"></iframe>
                        <delete-btn  @delete="$emit('delete-vid',video.id)" />
                    </template>
                </template>
            </div>
    `,
    components: { deleteBtn }

}