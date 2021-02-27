import deleteBtn from '../../../cmps/delete-btn.cmp.js'


export default {
    props: ['videos'],
    template: `
        <div ref="parent" v-if="videos" class="note-videos">
            <div class="pos-relative" v-for="(video,idx) in videos">
                <iframe class="pos-relative" :src="video.url" :width="width" height="250px"></iframe>
                <delete-btn class="btm-right"  @delete="$emit('delete-vid',video.id)" />
            </div>
        </div>
    `,
    data() {
        return {
            width: null,
            parent: null,
        }
    },
    mounted() {
        if (this.videos.length) {
            this.parent = this.$refs.parent
            window.addEventListener('resize', () => {
                this.width = this.parent.offsetWidth + 'px'
            })
            this.width = this.parent.offsetWidth + 'px'
        }
    },
    components: { deleteBtn }
}