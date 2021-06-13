<template>
  <router-view v-slot="{ Component }">
    <transition name="appear" mode="in-out">
      <ErrorAlert v-if="res" :res="res" :color="color" @click="$store.commit('noti/clearNoti')"></ErrorAlert>
    </transition>
    <transition name="page" mode="out-in">
      <component :is="Component"/>
    </transition>
  </router-view>

</template>
<script>
import {useStore} from 'vuex';
import {computed} from 'vue'
// import { useRouter } from 'vue-router';
import ErrorAlert from "./components/ErrorAlert";


export default {
  components: {
    ErrorAlert
  },
  setup() {
    const store = useStore();

    return {
      // access a state in computed function
      res: computed(() => store.getters['noti/notification']),

      // access a getter in computed function
      color: computed(() => store.getters['noti/color'])
    }
  }
}
</script>
<style lang="css">
.page-enter-active, .page-leave-active {
  transition: opacity 0.3s ease-in;
}

.page-enter-from, .page-leave-to {
  opacity: 0;
}

.appear-enter-active,
.appear-leave-active {
  transition: all 0.3s ease;
}

.appear-enter-from,
.appear-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
