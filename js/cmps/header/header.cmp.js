import search from './search.cmp.js'

export default {
  template: `
        <section class="header flex space-between align-center">
            <div class="buttons-container buttons-container-1 flex align-center">
                <a href="" class="header-hamburger circle-a">
                    <img class="header-hamburder-img" src="image/header/hamburger.svg" alt="H">
                </a>
                <a href="" class="header-logo circle-a">
                    <img class="header-logo" src="image/header/logo.svg" alt="L">
                </a>
                <a href="" class="header-logo-name">
                    <h2 class="header-logo-name-text text-a">currApp</h2>
                </a>
            </div>

            <search/>

            <div class="buttons-container buttons-container-2 flex">
                <a href="" class="header-info circle-a">
                    <img src="image/header/info.svg" alt="i" class="header-info-img">
                </a>
                <a href="" class="header-settings circle-a">
                    <img src="image/header/settings.svg" alt="S" class="header-settings-img">
                </a>
                <a href="" class="header-apps-nav circle-a">
                    <img src="image/header/app-nav.png" alt="N" class="header-apps-nav-img">
                </a>
                <a href="" class="header-profile circle-a">
                    <!-- <img src="" alt="P" class="header-profile-img"> -->
                    <img class="header-profile-img" src="image/header/user.png" alt="P">
                </a>
            </div>

            <!-- <nav class="main-nav">
                <h1 class="logo">Appsus</h1>
                <ul class="nav-links-container">
                    <router-link to="/">home</router-link>
                    <router-link to="/mail">mail</router-link>
                    <router-link to="/keep">keep</router-link>
                </ul>
            </nav> -->
        </section>
    `,
  components: {
    search,
  },
}
