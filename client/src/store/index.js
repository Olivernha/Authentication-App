import { createStore } from 'vuex'
import auth from './auth';
import noti from "./noti";
import user from './user';
export default createStore({
  modules: {
    auth,
    noti,
    user
  }
})
