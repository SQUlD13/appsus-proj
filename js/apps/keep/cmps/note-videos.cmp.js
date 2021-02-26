import deleteBtn from '../../../cmps/delete-btn.cmp.js'


export default {
    props: ['videos'],
    template: `
        <div v-if="videos" class="note-videos">
                    <template v-for="(video,idx) in videos">
                        <iframe :ref="idx" :src="video.url" :width="width" height="250px"></iframe>
                        <delete-btn  @delete="$emit('delete-vid',video.id)" />
                    </template>
            </div>
    `,
    data() {
        return {
            width: null,
        }
    },
    mounted() {
        var refs = this.$refs
        if (refs[0]) {
            var vidEl = Object.values(refs)[0]
            var parentW = vidEl[0].parentElement.offsetWidth
            this.width = parentW + 'px'
            vidEl.width = this.width
        }
    },
    watch: {
        width(newVal, oldVal) {
            this.width = newVal
        }
    },
    components: { deleteBtn }

}