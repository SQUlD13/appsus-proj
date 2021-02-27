
export default {
    template: `
    <div class="nav-btn-wrapper">
        <button  class="btn fas nav-btn" @click="active = !active">&#xf00a;</button>
        <transition name="fade">
        <div class="nav-link-wrapper" v-if="this.active" @blur="this.active = false">
            <router-link class="fas nav-link" to="/mail">&#xf0e0;</router-link>
            <router-link class="fas nav-link" to="/keep"> &#xf249;</router-link>
            <a class="fas nav-link-inactive" to="/book"> &#xf02d;</a>
        </div>
        </transition>
    </div>
    `,
    data() {
        return {
            active: false
        }
    },

}