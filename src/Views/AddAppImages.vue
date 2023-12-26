<template>
    <div class="programs min-vh-100">
        <HeaderComp></HeaderComp>
        <div>
            <div class="btn btn-primary m-5" @click="addImageActive">اضافة صورة</div>
            <div v-if="activeTab" class="box box-1 p-4 bg-white text-center">
                <h4 class="mb-4 text-end">اضافة صورة جديدة</h4>
                <label for="image" class="d-flex flex-column align-items-center">
                    <div class="form-group mb-5 w-50">
                        <input class="form-control" placeholder="اكتب الرابط" type="text" @change="getImageTitle($event)">
                    </div>
                    <input class="d-none" id="image" type="file" @change="getImageUrl($event)">
                    <img  @contextmenu.prevent @touchstart.prevent v-if="newImage.photo !== ''" class="img-fluid" width="450" :src="newImage.photo" alt="">

                    <span v-else class="place-holder text-uppercase fw-bold">
                        <div>
                            <i class="image fa-solid fa-image text-black-50 fs-2 mb-2"></i>
                            <span class="d-block text-black-50 fs-4">
                                اضف صوره
                            </span>
                        </div>
                       
                    </span>
                    <button class="p-3 px-5 mt-5 bg-primary text-light fw-bold rounded-1"
                        @click="saveImage( newImage.file,newImage.title)">
                        حفظ الصوره
                    </button>
                </label>
            </div>
        </div>
        <div class="cont p-3 py-5">
            <div class="box p-3 rounded-2">
                <div class="responsive-table overflow-auto w-100" dir="ltr">
                    <table class="w-100">
                        <thead>
                            <tr>
                                <td class="text-center">#</td>
                                <td class="text-center">الصوره</td>
                                <td class="text-center"> رابط الصورة</td>
                          
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="allPrograms.length > 0" v-for="(item, index) in allPrograms" :key="index">
                                <td>
                                    {{ item.id }}
                                </td>
                                <td>
                                    <img  @contextmenu.prevent @touchstart.prevent class="img-fluid rounded border border-2 border-danger " width="350"
                                        :src="`https://seasonreal.seasonsge.com/appv1real/${item.image_path}`" alt=""
                                    style="max-height: 350px;">
                                </td>
                                <td>
                                    {{ item.title}}
                                </td>
                                <td class="">
                                    <div class="d-flex gap-2 justify-content-center">
                                      
                                        <i class="fa-solid fa-trash p-2 bg-danger rounded-2 opacity-hover text-light"
                                            type="button" title="Delete" @click="confirmDelete(item)"></i>
                                      
                                           
                                    </div>
                                </td>
                           
                            </tr>
                        </tbody>
                    </table>
                    <h4 v-if="allPrograms.length === 0" class="text-nowrap w-100 p-5 text-center text-muted">لا توجد اي
                        بيانات</h4>
                </div>
            </div>
        </div>
        <DeleteImagePopup v-if="deletePopupActive" :deletedProgram="tempData" @close="() => deletePopupActive = false">
        </DeleteImagePopup>
        <EditPopup v-if="editPopupActive" :editProgram="tempData" @close="() => editPopupActive = false"></EditPopup>
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
import axios from 'axios';
import HeaderComp from '../components/HeaderComp.vue';
import { ref, onMounted } from 'vue'
import Loader from '../components/Loader.vue'
import DeleteImagePopup from '../components/DeleteImagePopup.vue';
import EditPopup from '../components/EditPopup.vue';

const allPrograms = ref([])
const loading = ref(false)
const editPopupActive = ref(false)
const deletePopupActive = ref(false)
let activeTab = ref(false)
const tempData = ref({})
const newImage = ref({
    photo: '',
    file: '',
    title:''
})
const getImageUrl = (e) => {
    newImage.value.photo = URL.createObjectURL(e.target.files[0])
    newImage.value.file = e.target.files[0]
}
const getImageTitle = (e) => {
    newImage.value.title = e.target.value
}
const addImageActive = () => {
    activeTab.value = true
}

const saveImage = async ( val ,title) => {
    const formData = new FormData()
    formData.append("image", val)
   
    formData.append("title", title)
   if(val){

       loading.value = true
       await axios.post(`https://seasonreal.seasonsge.com/appv1real/app-slider` ,formData).then((res) => {
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
const confirmEdit = (item) => {
    editPopupActive.value = true
    tempData.value = item
}
const confirmDelete = (item) => {
    deletePopupActive.value = true
    tempData.value = item
}
const handleToggleChange = (item) => {
console.log(item.id ,'llllllll');
let newStatus =0
item.status==1 ? newStatus=0 :newStatus=1

const formData = new FormData()
formData.append("program_id", item.id)
formData.append("status", newStatus)
axios.post("https://seasonreal.seasonsge.com/appv1real/program-status", formData).then(response => {
    console.log(response);
})


}


onMounted(async () => {
    loading.value = true
    await axios.post("https://seasonreal.seasonsge.com/appv1real/all_slider").then(data => {
        console.log(';;;' ,data);
        if(data.data.success){

            allPrograms.value = data.data.data
        }
        loading.value = false
        console.log("allPrograms.value" ,allPrograms.value)
    })
   
})
</script>

<style lang="scss" scoped>
.alert {
    top: -50%;
    left: 50%;
    transition: 0.2s;
    transform: translateX(-50%);

    &.active {
        top: 5%;
    }
}
.programs {
    background-color: var(--bg-color);

    .box {
        background-color: var(--white-color);

        .responsive-table {
            td {
                width: 200px;
            }

            thead {
                td {
                    padding: 10px 15px;
                    background-color: gray;
                    color: white;
                    border: 1px solid gray;
                    text-wrap: nowrap;
                }
            }

            tbody {
                td {
                    border: 1px solid gray;
                    padding: 10px;
                    text-align: center;
                    text-wrap: nowrap;
                }
            }
        }
    }
}
</style>