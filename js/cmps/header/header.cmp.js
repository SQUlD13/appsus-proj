import search from './search.cmp.js'

export default {
  template: `
        <section class="header flex space-between align-center">
            <div class="buttons-container buttons-container-1 flex align-center">
                <a href="" class="header-hamburger">
                    <img class="header-hamburder-img" src="" alt="H">
                </a>
                <a href="" class="header-logo">
                    <img class="header-logo" src="" alt="L">
                </a>
                <a href="" class="header-logo-name">
                    <h2 class="header-logo-name-text text-a">currApp</h2>
                </a>
            </div>

            <search/>

            <div class="buttons-container buttons-container-2 flex">
                <a href="" class="header-info">
                    <img src="" alt="i" class="header-info-img">
                </a>
                <a href="" class="header-settings">
                    <img src="" alt="S" class="header-settings-img">
                </a>
                <a href="" class="header-apps-nav">
                    <img src="" alt="N" class="header-apps-nav-img">
                </a>
                <a href="" class="header-profile">
                    <img src="" alt="P" class="header-profile-img">
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
