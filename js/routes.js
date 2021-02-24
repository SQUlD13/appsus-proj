import homePage from './pages/home.page.cmp.js'
import mailApp from './apps/mail/pages/mail.page.cmp.js'
import keepApp from './apps/keep/pages/keep.page.cmp.js'
import mailList from './apps/mail/cmps/mail-list.cmp.js'
import mailDetails from './apps/mail/cmps/mail-details.cmp.js'
const routes = [
  {
    path: '/',
    component: homePage,
  },
  {
    path: '/mail',
    component: mailApp,
    children: [
      {
        path: ':mailId',
        component: mailDetails,
        props: true,
      },
      { path: '/', component: mailList },
    ],
  },
  {
    path: '/keep',
    component: keepApp,
  },
]

export default new VueRouter({ routes })
