import axios from "axios";

export default {
    namespaced: true,
    state: {
        token: JSON.parse(localStorage.getItem('token'))?.access_token || '',
        userLoggedIn: false,

    },
    getters: {
        isAuthenticated(state) {
            return !!state.token;
        }
    },
    mutations: {
        setToken(state, payload) {
            state.token = payload;
        },
        clearToken(state) {
            state.token = '';
            state.userLoggedIn = false;
        }

    },
    actions: {
        registerUser(context, payload) {
            return new Promise((resolve, reject) => {
                axios.post('/register', payload).then((res) => {
                    const token = res.data.access_token;
                    context.commit('setToken', token);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    localStorage.setItem('token', JSON.stringify(res.data));
                    resolve(res);
                }).catch((error) => {
                    reject(error);
                })
            })
        },
        loginUser(context, payload) {
            return new Promise((resolve, reject) => {
                axios.post('/login', payload).then(res => {
                    const token = res.data.access_token;
                    context.commit('setToken', token);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    localStorage.setItem('token', JSON.stringify(res.data));
                    resolve(res);
                }).catch(e => {
                    reject(e);
                })
            })
        },
        logout(ctx) {
            return new Promise((resolve,reject) => {
                axios.post('/logout').then(()=>{
                    localStorage.removeItem('token');
                    ctx.commit('clearToken');
                    delete axios.defaults.headers.common['Authorization']
                    resolve(true);
                }).catch((e)=>{
                    reject(e);
                })

            });
        },
        autoLogout(context) {
            localStorage.removeItem('token');
            context.commit('clearToken');
            // location.reload(); //to clear X-Requested-**
        },
        loginGithubAction() {
            return new Promise((resolve, reject) => {
                axios.get('authorize/github/redirect')
                    .then(res => {
                        console.log(res);
                        resolve(res);

                    })
                    .catch((err) => {
                        reject(err);
                    })
            })
        },
        loginGithubActionCallback(ctx, payload) {
            return new Promise((resolve, reject) => {
                axios.get('authorize/github/callback', {
                    params: payload
                })
                    .then(res => {
                        if (res.data.access_token) {
                            const token = res.data.access_token
                            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                            localStorage.setItem('token', token);
                            ctx.commit('setToken', token);
                             ctx.dispatch('user/me',null,{ root: true }).then(() => resolve(res));

                        }
                        console.log(res);
                        resolve(res);

                    })
                    .catch((err) => {
                        reject(err);
                    })
            })
        },
    },

}