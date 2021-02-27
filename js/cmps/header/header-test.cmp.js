import search from './search.cmp.js'
import navBtn from '../../cmps/nav-btn.cmp.js'
export default {
    template: `
    <header class="header flex space-between align-center">
        <!-- <div class="buttons-container buttons-container-1 flex align-center">
            <a href="" class="header-hamburger">
                <img class="header-hamburder-img" src="image/header/hamburger.svg" alt="H">
            </a>
            <a href="" class="header-logo">
                <img class="header-logo" src="image/header/logo.svg" alt="L">
            </a>
            <a href="" class="header-logo-name">
                <h2 class="header-logo-name-text text-a">currApp</h2>
            </a>
        </div> -->
        <nav-btn></nav-btn>
        <search/>
        <!-- <div class="buttons-container buttons-container-2 flex">
            <a href="" class="header-info">
                <img src="image/header/info.svg" alt="i" class="header-info-img">
            </a>
            <a href="" class="header-settings">
                <img src="image/header/settings.svg" alt="S" class="header-settings-img">
            </a>
            <a href="" class="header-apps-nav">
                <img src="image/header/app-nav.png" alt="N" class="header-apps-nav-img">
            </a>
            <a href="" class="header-profile">
                <img src="" alt="P" class="header-profile-img">
                <img class="header-profile-img" src="image/header/user.png" alt="P">
            </a>-->
        <router-link class="fas" to="/">&#xf015;</router-link>
        
    </header>
    `,
    components: {
        search, navBtn
    },
}
