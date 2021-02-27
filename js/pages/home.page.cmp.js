import navBtn from '../cmps/nav-btn.cmp.js'

export default {
    template: `
    <section class="home-page main-container">
        <h1>Welcome to appsus</h1>
        <p>Please select an application to get started</p>
        <nav-btn />        
    </section>
    `,
    components: { navBtn }
}