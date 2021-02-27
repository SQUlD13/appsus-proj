import homePage from './pages/home.page.cmp.js'
import mailApp from './apps/mail/pages/mail.page.cmp.js'
import keepApp from './apps/keep/pages/keep.page.cmp.js'
import mailList from './apps/mail/cmps/mail-list.cmp.js'
import mailDetails from './apps/mail/cmps/mail-details.cmp.js'
import bookApp from './apps/book/pages/book-app.cmp.js'
import bookDetails from './apps/book/cmps/book-details.cmp.js'
const routes = [
  {
    path: '/',
    component: homePage,
  },
  {
    path: '/mail',
    component: mailApp,
    children: [
      { path: 'filter-by/:filterBy', component: mailList, props: true },
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
  {
    path: '/book',
    component: bookApp,
  },
  {
    path: '/book/:id',
    component: bookDetails
  }
]

export default new VueRouter({ routes })
