
export default {
    template: `
    <nav class="nav-btn-wrapper">
        <button  class="btn fas nav-btn" @click="active = !active">&#xf00a;</button>
        <transition name="fade">
        <div class="nav-link-wrapper" v-if="this.active" @blur="this.active = false">
            <router-link ref="mail" :class="getClass('mail')" to="/mail">&#xf0e0;</router-link>
            <router-link ref="keeps" :class="getClass('keep')" to="/keep"> &#xf249;</router-link>
            <router-link ref="mail" :class="getClass('book')" to="/book"> &#xf02d;</router-link>
        </div>
        </transition>
    </nav>
    `,
    data() {
        return {
            active: false
        }
    },
    computed: {
        path() {
            return this.$route.path
        }
    },
    methods: {
        getClass(val) {
            var str = this.$route.path.slice(1)
            var base = 'fas nav-link'
            var classStr = (str.includes(val)) ? ' active' : ' '
            console.log("🚀 ~ file: nav-btn.cmp.js ~ line 31 ~ getClass ~ classStr", classStr)
            return base + classStr
        }
    },
    watch: {
        $route() {
            console.log('path change')
            this.active = false;
        }
    }

}