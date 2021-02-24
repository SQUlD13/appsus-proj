import homePage from './pages/homepage.cmp.js'

const routes = [
    {
        path: '/',
        component: homePage
    }
]

export default new VueRouter({ routes })