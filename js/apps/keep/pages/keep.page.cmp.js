
import note from '../cmps/note.cmp.js'

export default {
    template: `
    <section class="keep-app main-container">
        <h1>keepApp</h1>
        <note :txt="'hello'"> </note>
        <router-link to="/"> Home </router-link>
    </section>
    `,
    data() {
        return {

        }
    },
    components: {
        note
    }
}