import axios from "axios";
export default {
    namespaced:true,
    state:{
        userDetails:''
    },
    getters:{
       profile(state){
           return state.userDetails;
       }
    },
    mutations:{
        setUserDetails(state) {
            state.userDetails = state;
        },
    },
    actions:{
        me(ctx) {
            return new Promise((response, reject) => {
                axios.get('/me')

                    .then((res) => {
                        ctx.commit('setUserDetails', res.data);
                        response(res);
                    }).catch(e => {
                    reject(e);
                })
            })
        },

    }
}