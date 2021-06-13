<template>
  <div class="bg-gray-100 h-full">
    <div class="container mx-auto px-0 md:px-10 py-5 ">
            <Header :name="name" :image="imageUrl"  ></Header>
      <div class="flex flex-col justify-start lg:justify-center items-center my-8">
        <p class="font-semibold text-3xl ">Personal Info</p>
        <span class="font-normal text-gray-900 my-2">Basic info, like your name and photo</span>
        <div class="w-full lg:w-1/2  rounded-md my-6">
          <div class="flex justify-between items-center border border-b border-gray-200 px-6 lg:px-10 py-4">
            <div class="flex flex-col">
              <p class="font-semibold text-black text-xl">Profile</p>
              <span class="text-gray-500 text-sm">Some info may be visible to other people</span>
            </div>
            <div>
              <router-link :to="{name:'editProfile'}"
                           class="border border-gray-400 px-5 py-1  rounded-md text-gray-500">Edit
              </router-link>
            </div>
          </div>
          <div class="flex  items-center border border-b border-gray-200 px-6 lg:px-10 py-4 h-20">
            <div class="w-2/5">
              <p class="font-normal text-gray-400">Photo</p>
            </div>
            <div class="w-3/5">
              <img :src="imageUrl" alt=""
                   class="w-16 border border-transparent rounded-md ">
            </div>
          </div>
          <div class="flex  items-center border border-b border-gray-200 px-6 lg:px-10 py-4 h-20">
            <div class="w-2/5">
              <p class="font-normal text-gray-400">NAME</p>
            </div>
            <div class="w-3/5">
              <p class="font-semibold text-gray-800 ">{{ name }}</p>
            </div>
          </div>
          <div class="flex  items-center border border-b border-gray-200 px-6 lg:px-10 py-4 h-20">
            <div class="w-2/5">
              <p class="font-normal text-gray-400">BIO</p>
            </div>
            <div class="w-3/5">
              <p class="font-semibold text-gray-800 "> {{ bio }}</p>

            </div>
          </div>
          <div class="flex  items-center border border-b border-gray-200 px-6 lg:px-10 py-4 h-20">
            <div class="w-2/5">
              <p class="font-normal text-gray-400">PHONE</p>
            </div>
            <div class="w-3/5">
              <p class="font-semibold text-gray-800 ">{{ phone }}</p>
            </div>
          </div>
          <div class="flex  items-center border border-b border-gray-200 px-6 lg:px-10 py-4 h-20">
            <div class="w-2/5">
              <p class="font-normal text-gray-400">EMAIL</p>
            </div>
            <div class="w-3/5">
              <p class="font-semibold text-gray-800 ">{{ email }}</p>
            </div>
          </div>

          <div
              class="flex flex-col md:flex-row justify-center items-center md:justify-between text-gray-500 space-y-5 md:space-y-0 my-4">
            <p>Created by <span class="underline font-semibold">{{ name }}</span></p>
            <p>devChallenges.io</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src


import userInfo from "../composition/user";
import Header from "../components/Header";
export default {
  name: 'App',
  components:{
    Header
  },
  setup() {
    const { name,bio,phone,email ,imageUrl} = userInfo();
    return { name,bio,phone,email ,imageUrl };
  }
};
</script>
