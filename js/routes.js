import homePage from './pages/home.page.cmp.js'
import mailApp from './apps/mail/pages/mail.page.cmp.js'
import keepApp from './apps/keep/pages/keep.page.cmp.js'
const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/mail',
        component: mailApp
    },
    {
        path: '/notes',
        component: keepApp
    }
]

export default new VueRouter({ routes })