import navBtn from '../cmps/nav-btn.cmp.js'

export default {
    template: `
    <section class="home-page">
        <div class="img-container-splash">
            <div class="splash-darken"></div>
            <img class="fit-cover splash" src="image/splash-screen.jpg"/>
        </div>
        <div class="home-content main-container">
            <h1>Welcome to appsus</h1>
            <p>Please select an application to get started</p>
            <nav-btn />        
        </div>
    </section>
    `,
    components: { navBtn }
}