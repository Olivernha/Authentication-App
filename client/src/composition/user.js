import {computed, ref} from "vue";
import axios from "axios";

export default function userInfo() {
    const name=ref(null);
    const bio=ref(null);
    const phone=ref(null);
    const email=ref(null);
    const password=ref(null);
    const photo=ref(null);
    const id=ref(null);
    const fetchData = async () => {
        const res = await axios('/me');
        const json = await res.data;
        console.log(json)
        name.value= json.name;
        email.value= json.email;
        bio.value= json.bio;
        phone.value= json.phone;
        photo.value=json.photo;
        id.value=json.id;
    };
    fetchData();
    const imageUrl=computed(()=>{
        return `http://127.0.0.1:8000/${photo.value}`
    })


    return { name,bio,phone,email,password,photo,id ,imageUrl}
}
