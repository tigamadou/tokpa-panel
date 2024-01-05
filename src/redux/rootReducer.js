// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'
import auth from './authentication'
import post from "../views/post/store"
import scrapper from "../views/scrapper/store"
import page from "../views/page/store"
import users from '../views/user/store'
import categories from '../views/categories/store'
import menus from '../views/menus/store'
import error from '../views/errors/store'
import report from '../views/reports/store'
import comments from '../views/comments/store'
import libraries from '../views/libraries/store'


const rootReducer = {
  auth,
  navbar,
  layout,
  post,
  error,
  users,
  categories,
  menus,
  page,
  comments,
  libraries,
  scrapper,
  report
}

export default rootReducer
