<template>
  <div class="bg-gray-100 h-full">
    <div class="container mx-auto px-10 py-5 ">
      <Header :name="name" :image="imageUrl"  ></Header>
      <div class="lg:mx-64 lg:my-20 my-5">
        <router-link to="/" class="flex items-center text-blue-400" href="#">
          <span class="w-6 material-icons">arrow_back_ios</span>
          Back
        </router-link>
        <div class="w-full border-2 border-gray-300 py-8 px-6 lg:px-20 rounded-lg my-4">
          <p class="text-black font-semibold text-2xl">Change Info</p>
          <span class="text-gray-500">Changes will be reflected to every services</span>
          <form @submit.prevent="updateProfile" enctype="multipart/form-data">
            <div class="flex items-center py-4">
              <div v-if="userData.newPhoto || userData.photo" class="relative">

                <div class="w-16 border border-black rounded-md h-17">
                  <img  :src="userData.newPhoto ? userData.newPhoto : imageUrl" alt="img"
                       class="w-16 border border-transparent rounded-md h-16">
                </div>
                <p class="text-white material-icons absolute  top-5 left-5 z-10">photo_camera</p>
              </div>
              <div v-else >
                <div class="w-16 border border-black rounded-md h-16 relative">
                  <p class="text-white material-icons absolute  top-5 left-5 z-10">photo_camera</p>
                </div>

              </div>
              <input type="file" ref="file" @change="changeImage" hidden>

              <button type="button" @click="$refs.file.click();"
                      class="hover:opacity-75 ml-4 uppercase text-gray-500 tracking-tight">CHANGE PHOTO
              </button>
            </div>
            <div class="w-full lg:w-1/2 flex flex-col text-gray-700 font-semibold "
            >
              <div class="flex flex-col">
                <label for="name" class="ml-1">Name</label>
                <input v-model="userData.name" type="text" placeholder="Enter your name..."
                       class="h-12 px-4  py-2 bg-transparent border-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-400 "
                       id="name">
              </div>
              <div class="flex flex-col my-2">
                <label for="bio" class="ml-1">Bio</label>

                <textarea cols="30" rows="10" placeholder="Enter your bio..." v-model="userData.bio"

                          class="h-14 px-4  py-2 bg-transparent border-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-400 "
                          id="bio"></textarea>
              </div>
              <div class="flex flex-col my-2">
                <label for="phone" class="ml-1">Phone</label>
                <input type="text" placeholder="Enter your phone..." v-model="userData.phone"

                       class="h-14 px-4  py-2 bg-transparent border-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-400 "
                       id="phone">
              </div>
              <div class="flex flex-col my-2">
                <label for="email" class="ml-1">Email</label>
                <input type="text" placeholder="Enter your email..." v-model="userData.email"

                       class="h-14 px-4  py-2 bg-transparent border-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-400 "
                       id="email">
              </div>
              <div class="flex flex-col my-2">
                <label for="password" class="ml-1">Password</label>
                <input type="text" placeholder="Enter your password" v-model="userData.password"

                       class="h-14 px-4  bg-transparent border-2 border-gray-400 rounded-lg focus:outline-none hover:border-blue-400 "
                       id="password">
              </div>
              <button class="bg-blue-500 text-white rounded-lg my-2 px-3 py-2 w-24 focus:opacity-75">Save
                me
              </button>

            </div>
          </form>

        </div>
        <div class="flex justify-between text-gray-500">
          <p>Created by <span class="underline font-semibold">{{ userData.name }}</span></p>
          <p>devChallenges.io</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import {reactive} from 'vue';

import axios from "axios";
import {useRouter} from "vue-router";
import userInfo from "../composition/user";

export default {
  name: "EditProfile",
  components:{
    Header
  },
  setup() {

    const router = useRouter()
    const { name,bio,phone,email,password,photo,id,imageUrl } = userInfo();
    const userData = reactive({
      id:id,
      name: name,
      bio: bio,
      phone: phone,
      email: email,
      password: password,
      photo:photo,
      newPhoto: null
    });
    const changeImage = (e) => {
      var file = e.target.files[0];
      var allowedExtensions =
          /(\/jpg|\/jpeg|\/png)$/i;
      if (!allowedExtensions.exec(file.type)) {
        alert('Invalid file type');
        return false;
      }
      let reader = new FileReader();
      reader.onload = (event) => {
        userData.newPhoto = event.target.result;
     //   userData.photo=event.target.result
      };
      reader.readAsDataURL(file);
    }

    const updateProfile = async () => {
      const id =userData.id;
      var form = new FormData();
      form.append('name', userData.name || '');
      form.append('phone', userData.phone || '');
      form.append('photo', userData.photo || '') ;
      form.append('bio', userData.bio || '');
      form.append('password', userData.password || '');
      form.append('email', userData.email || '');
      form.append('newPhoto', userData.newPhoto || '' );

      axios.post(`/profile/${id}/update`, form).then(() => {
        router.push('/');
      })
    }
    return {userData, changeImage, updateProfile, imageUrl ,name}
  }
}
</script>

<style scoped>

</style>