import {createApp} from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from "axios";
import './index.css';
// import upperFirst from 'lodash/upperFirst'
// import camelCase from 'lodash/camelCase'

  
axios.defaults.baseURL = 'https://nha-authentication-app.herokuapp.com/api';

const token = JSON.parse(localStorage.getItem('token'))?.access_token;
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 401) {
        router.push('/login')
        store.dispatch('auth/autoLogout')
    }
    return Promise.reject(error);
});


// const requireComponent = require.context(
//     './components',
//     false,
//     /Base[A-Z]\w+\.(vue|js)$/
// )


const app = createApp(App);

// requireComponent.keys().forEach(fileName => {
//     const componentConfig = requireComponent(fileName)
//
//     const componentName = upperFirst(
//         camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
//     )
//
//     app.component(componentName, componentConfig.default || componentConfig)
// })
app.use(store).use(router).mount('#app')
