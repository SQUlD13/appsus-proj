
export default {
    template: `
    <nav class="nav-btn-wrapper">
        <button  class="btn fas nav-btn" @click="active = !active">&#xf00a;</button>
        <transition name="fade">
        <div class="nav-link-wrapper" v-if="this.active" @blur="this.active = false">
            <router-link class="fas nav-link" to="/mail">&#xf0e0;</router-link>
            <router-link class="fas nav-link" to="/keep"> &#xf249;</router-link>
            <router-link class="fas nav-link" to="/book"> &#xf02d;</router-link>
        </div>
        </transition>
    </nav>
    `,
    data() {
        return {
            active: false
        }
    },
    watch: {
        'this.$route.path'() {
            this.active = false;
        }
    }

}