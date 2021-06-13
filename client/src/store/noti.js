export default {
    namespaced: true,
    state: {
        color: '',
        notification: ''
    },
    getters: {
        color(state) {
            return state.color;
        },
        notification(state) {
            return state.notification;
        }
    },
    mutations: {
        showNoti(state, payload) {
            state.notification = payload.res;
            state.color = payload.color;
        },
        clearNoti(state) {
            state.notification = '';
            state.color = '';
        }
    },
}