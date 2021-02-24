import router from './routes.js'
const options = {
    el: '#app',
    router: router,
    template: `
        <router-view/>
    `,
}

new Vue(options)
