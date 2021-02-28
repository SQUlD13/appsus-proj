import search from './search.cmp.js'
import navBtn from '../../cmps/nav-btn.cmp.js'
export default {
    template: `
    <header class="main-header flex space-evenly align-center">
        <nav-btn/>
        <search v-if="isntBooks"/>
        <router-link class="fas nav-link" to="/">&#xf015;</router-link>
        
    </header>
    `,
    computed: {
        isntBooks() {
            return (!this.$route.path.includes('/book'))
        }
    },
    components: {
        search, navBtn
    },
}
