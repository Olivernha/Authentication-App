<template>
    <div class="max-h-screen h-screen flex justify-center items-center">
        <div class=" loading px-8 py-8 text-gray-700 font-semibold text-lg">
            <p>Authenticating....</p>

            <div class="shadow w-full bg-gray-200 mt-8 rounded-md">
                <div class="progress bg-blue-500 text-xs leading-none h-2 text-center text-white"></div>
            </div>
        </div>
    </div>

</template>

<script>
import {mapActions} from "vuex";

export default {
    name: "LoginGithub",
    beforeMount() {
        this.loginUser();
    },
    methods: {
        ...mapActions({
            login: 'auth/loginGithubActionCallback',
            addNotification: 'noti/showNoti',
        }),
        loginUser() {
            this.login({
                code: this.$route.query.code
            }).then((res) => {

                if (res.data.access_token) {
                   // this.addNotification({res: 'Successfully LogggedIn!', color: 'green'});
                    this.$router.push({
                         name: 'home',
                    })
                }
                console.log(res);
            })
        }
    }
}
</script>

<style scoped>
.loading {
    width: 400.36px;
    height: 143.57px;
    background: #FFFFFF;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
}

.progress {
    width: 30%;
    margin-left: 0;
    animation: progressBar 1s linear forwards running infinite;
}

@keyframes progressBar {
    0% {
        width: 0;
    }
    50% {
        width: 30%;
        margin-left: 40%;
    }
    100% {
        width: 0;
        margin-left: 100%;

    }
}
</style>
