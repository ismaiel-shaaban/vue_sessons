<template>
    <div class="services-images min-vh-100">
        <HeaderComp></HeaderComp>
        <div class="container py-5">
            <div class="tabs d-flex">
                <span :class="`tab bg-secondary text-light fw-bold p-3 px-4 ${activeTab === '1' ? 'active' : ''}`"
                    @click="activeTab = '1'">
                    حجز السيارات
                </span>
                <span :class="`tab bg-secondary text-light fw-bold p-3 px-4 ${activeTab === '2' ? 'active' : ''}`"
                    @click="activeTab = '2'">
                    حجز الفنادق
                </span>
                <span :class="`tab bg-secondary text-light fw-bold p-3 px-4 ${activeTab === '3' ? 'active' : ''}`"
                    @click="activeTab = '3'">
                    حجز رحلات الطيران
                </span>
                <span :class="`tab bg-secondary text-light fw-bold p-3 px-4 ${activeTab === '4' ? 'active' : ''}`"
                    @click="activeTab = '4'">
                    حجز الرحلات السياحيه
                </span>
                <span :class="`tab bg-secondary text-light fw-bold p-3 px-4 ${activeTab === '5' ? 'active' : ''}`"
                    @click="activeTab = '5'">
                    حجز القطار
                </span>
            </div>
            <div v-if="activeTab === '1'" class="box box-1 p-4 bg-white text-center">
                <h4 class="mb-4 text-end">السيارات</h4>
                <label for="image" class="d-flex flex-column align-items-center">
                    <input class="d-none" id="image" type="file" @change="getCarImage($event)">
                    <img  @contextmenu.prevent @touchstart.prevent v-if="carsImage.photo !== ''" class="img-fluid" width="450" :src="carsImage.photo" alt="">
                    <img  @contextmenu.prevent @touchstart.prevent v-if="images[0] " class="img-fluid" width="450" :src="`https://seasonreal.seasonsge.com/appv1real/${images[3].image}`" alt="">
                    <span v-else class="place-holder text-uppercase fw-bold">
                        <div>
                            <i class="image fa-solid fa-image text-black-50 fs-2 mb-2"></i>
                            <span class="d-block text-black-50 fs-4">
                                اضف صوره
                            </span>
                        </div>
                    </span>
                    <button class="p-3 px-5 mt-5 bg-primary text-light fw-bold rounded-1"
                        @click="saveImage('cars', carsImage.file)">
                        حفظ الصوره
                    </button>
                </label>
            </div>
            <div v-if="activeTab === '2'" class="box box-1 p-4 bg-white text-center">
                <h4 class="mb-4 text-end">الفنادق</h4>
                <label for="image" class="d-flex flex-column align-items-center">
                    <input class="d-none" id="image" type="file" @change="getHotelImage($event)">
                    <img  @contextmenu.prevent
      @touchstart.prevent v-if="hotelsImage.photo !== ''" class="img-fluid" width="450" :src="hotelsImage.photo" alt="">
      <img  @contextmenu.prevent @touchstart.prevent v-if="images[0]" class="img-fluid" width="450" :src="`https://seasonreal.seasonsge.com/appv1real/${images[2].image}`" alt="">
                    <span v-else class="place-holder text-uppercase fw-bold">
                        <div>
                            <i class="image fa-solid fa-image text-black-50 fs-2 mb-2"></i>
                            <span class="d-block text-black-50 fs-4">
                                اضف صوره
                            </span>
                        </div>
                    </span>
                    <button class="p-3 px-5 mt-5 bg-primary text-light fw-bold rounded-1"
                        @click="saveImage('hotels', hotelsImage.file)">
                        حفظ الصوره
                    </button>
                </label>
            </div>
            <div v-if="activeTab === '3'" class="box box-1 p-4 bg-white text-center">
                <h4 class="mb-4 text-end">رحلات الطيران</h4>
                <label for="image" class="d-flex flex-column align-items-center">
                    <input class="d-none" id="image" type="file" @change="getFlightImage($event)">
                    <img  @contextmenu.prevent
      @touchstart.prevent v-if="flightsImage.photo !== ''" class="img-fluid" width="450" :src="flightsImage.photo" alt="">
      <img  @contextmenu.prevent @touchstart.prevent v-if="images[0]" class="img-fluid" width="450" :src="`https://seasonreal.seasonsge.com/appv1real/${images[0].image}`" alt="">
                    <span v-else class="place-holder text-uppercase fw-bold">
                        <div>
                            <i class="image fa-solid fa-image text-black-50 fs-2 mb-2"></i>
                            <span class="d-block text-black-50 fs-4">
                                اضف صوره
                            </span>
                        </div>
                    </span>
                    <button class="p-3 px-5 mt-5 bg-primary text-light fw-bold rounded-1"
                        @click="saveImage('flights', flightsImage.file)">
                        حفظ الصوره
                    </button>
                </label>
            </div>
            <div v-if="activeTab === '4'" class="box box-1 p-4 bg-white text-center">
                <h4 class="mb-4 text-end">الرحلات السياحيه</h4>
                <label for="image" class="d-flex flex-column align-items-center">
                    <input class="d-none" id="image" type="file" @change="getProgramImage($event)">
                    <img  @contextmenu.prevent
      @touchstart.prevent v-if="programsImage.photo !== ''" class="img-fluid" width="450" :src="programsImage.photo" alt="">
      <img  @contextmenu.prevent @touchstart.prevent v-if="images[0]" class="img-fluid" width="450" :src="`https://seasonreal.seasonsge.com/appv1real/${images[1].image}`" alt="">
                    <span v-else class="place-holder text-uppercase fw-bold">
                        <div>
                            <i class="image fa-solid fa-image text-black-50 fs-2 mb-2"></i>
                            <span class="d-block text-black-50 fs-4">
                                اضف صوره
                            </span>
                        </div>
                    </span>
                    <button class="p-3 px-5 mt-5 bg-primary text-light fw-bold rounded-1"
                        @click="saveImage('programs', programsImage.file)">
                        حفظ الصوره
                    </button>
                </label>
            </div>
            <div v-if="activeTab === '5'" class="box box-1 p-4 bg-white text-center">
                <h4 class="mb-4 text-end">حجز القطار</h4>
                <label for="image" class="d-flex flex-column align-items-center">
                    <input class="d-none" id="image" type="file" @change="getTrainImage($event)">
                    <img  @contextmenu.prevent
      @touchstart.prevent v-if="trainImage.photo !== ''" class="img-fluid" width="450" :src="trainImage.photo" alt="">
      <img  @contextmenu.prevent @touchstart.prevent v-if="images[0]" class="img-fluid" width="450" :src="`https://seasonreal.seasonsge.com/appv1real/${images[4].image}`" alt="">
                    <span v-else class="place-holder text-uppercase fw-bold">
                        <div>
                            <i class="image fa-solid fa-image text-black-50 fs-2 mb-2"></i>
                            <span class="d-block text-black-50 fs-4">
                                اضف صوره
                            </span>
                        </div>
                    </span>
                    <button class="p-3 px-5 mt-5 bg-primary text-light fw-bold rounded-1"
                        @click="saveImage('train', trainImage.file)">
                        حفظ الصوره
                    </button>
                </label>
            </div>
        </div>
        <div class="alert alert-complete alert-success d-flex align-items-center gap-2 position-fixed" role="alert">
            <i class="fa-solid fa-circle-check"></i>
            <div>
                تمت العمليه بنجاح
            </div>
        </div>
        <Loader v-if="loading" :position="'fixed'"></Loader>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import HeaderComp from '../components/HeaderComp.vue';
import storage from '../firebase/index'
import { ref as storageRef, uploadBytes } from "firebase/storage";
import Loader from '../components/Loader.vue';
import axios from 'axios';

const loading = ref(false)
const images = ref([])
const activeTab = ref('1')

const carsImage = ref({
    photo: '',
    file: ''
})
const hotelsImage = ref({
    photo: '',
    file: ''
})
const flightsImage = ref({
    photo: '',
    file: ''
})
const programsImage = ref({
    photo: '',
    file: ''
})
const trainImage = ref({
    photo: '',
    file: ''
})


const getCarImage = (e) => {
    carsImage.value.photo = URL.createObjectURL(e.target.files[0])
    carsImage.value.file = e.target.files[0]
}
const getHotelImage = (e) => {
    hotelsImage.value.photo = URL.createObjectURL(e.target.files[0])
    hotelsImage.value.file = e.target.files[0]
}
const getFlightImage = (e) => {
    flightsImage.value.photo = URL.createObjectURL(e.target.files[0])
    flightsImage.value.file = e.target.files[0]
}
const getProgramImage = (e) => {
    programsImage.value.photo = URL.createObjectURL(e.target.files[0])
    programsImage.value.file = e.target.files[0]
}
const getTrainImage = (e) => {
    trainImage.value.photo = URL.createObjectURL(e.target.files[0])
    trainImage.value.file = e.target.files[0]
}


const saveImage = async (name, val) => {
    const formData = new FormData()
    formData.append("newImage", val)
    if(name== 'cars') formData.append("carId", 4)
    if(name== 'hotels') formData.append("carId", 3)
    if(name== 'flights') formData.append("carId", 1)
    if(name== 'programs') formData.append("carId", 2)
    if(name== 'train') formData.append("carId", 5)
   if(val){

       loading.value = true
       await axios.post(`https://seasonreal.seasonsge.com/appv1real/editimage` ,formData).then((res) => {
         console.log('kkkkkkkk' ,res); 
         if(res.status==200){
   
             document.querySelector(".alert").classList.add("active")
             setTimeout(() => {
                 document.querySelector(".alert").classList.remove("active")
                 window.location.reload()
             }, 2000)
             loading.value = false
           }
           else{
           
             loading.value = false
   
         }
   
   
   
       });
   }
}

onMounted(async () => {
    await axios.get(`https://seasonreal.seasonsge.com/appv1real/images` ).then((res) => {
         console.log('kkkkkkkk' ,res.data); 
         images.value=res.data
        
         
   
   
   
       });
   
    
})
</script>

<style lang="scss" scoped>
.services-images {
    background-color: var(--bg-color);

    .tabs {
        .tab {
            flex: 1;
            text-align: center;
            transition: 0.2s;
            cursor: pointer;

            &:hover {
                opacity: 0.7;
            }

            &.active {
                background-color: #dc3545 !important;
            }
        }
    }

    .box {
        .place-holder {
            cursor: pointer;
            display: grid;
            width: 450px;
            height: 250px;
            place-items: center;
            border: 2px dashed gray;
        }
    }

    .alert {
        top: -50%;
        left: 50%;
        transition: 0.2s;
        transform: translateX(-50%);

        &.active {
            top: 5%;
        }
    }

    @media (max-width: 767px) {
        .tabs {
            flex-direction: column;
        }

        .place-holder {
            width: 100% !important;
        }
    }
}
</style>