<template>
    <div class="programs min-vh-100">
        <HeaderComp></HeaderComp>
        <div class="cont p-3 py-5">
            <div class="box p-3 rounded-2">
                <div class="responsive-table overflow-auto w-100" dir="ltr">
                    <table class="w-100">
                        <thead>
                            <tr>
                                <td class="text-center">#</td>
                                <td>الصوره</td>
                                <td>رقم الرحله</td>
                                <td>وحهة البرنامج</td>
                                <td>اسم الفندق</td>
                                <td>التاريخ من</td>
                                <td>التاريخ الي</td>
                                <td>عدد الايام</td>
                                <td>عدد الليالي</td>
                                <td>تشمل الطيران</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="allPrograms.length > 0" v-for="(item, index) in allPrograms" :key="index">
                                <td>
                                    {{ item.id }}
                                </td>
                                <td>
                                    <img  @contextmenu.prevent
      @touchstart.prevent class="img-fluid rounded-circle border border-2 border-danger " width="50"
                                        :src="`https://seasonreal.seasonsge.com/upload/${item.main_image}`" alt=""
                                        style="height: 50px;">
                                </td>
                                <td>
                                    {{ item.includes_flight == '1' ? item.flight_number : '----' }}
                                </td>
                                <td v-if="item.destination">
                                    {{ item.destination.name }}
                                </td>
                                <td>
                                    {{ item.program_title_arabic ||
                                        "غير معروف" }} : {{ item.program_title_english || "غير معروف" }}
                                </td>
                                <td>
                                    {{ item.from_date }}
                                </td>
                                <td>
                                    {{ item.to_date }}
                                </td>
                                <td>
                                    {{ item.num_of_days }}
                                </td>
                                <td>
                                    {{ item.num_of_nights }}
                                </td>
                                <td>
                                    <i
                                        :class="`fa-solid fs-4 fa-${item.includes_flight == '0' ? 'xmark text-danger' : 'check text-success'}`"></i>
                                </td>
                                <td class="">
                                    <div class="d-flex gap-2 justify-content-center">
                                        <i class="fa-solid fa-pen-to-square p-2 bg-secondary bg-opacity-75 rounded-2 opacity-hover text-light"
                                            type="button" title="Edit" @click="confirmEdit(item)"></i>
                                        <i class="fa-solid fa-trash p-2 bg-danger rounded-2 opacity-hover text-light"
                                            type="button" title="Delete" @click="confirmDelete(item)"></i>
                                      
                                            <div class="form-check form-switch">
                                                <input class="form-check-input" @change="handleToggleChange(item)" type="checkbox" role="switch" id="flexSwitchCheckDefault" :checked="item.status == 1">
                                                <label class="form-check-label" for="flexSwitchCheckDefault"></label>
                                            </div>
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
        <DeletePopup v-if="deletePopupActive" :deletedProgram="tempData" @close="() => deletePopupActive = false">
        </DeletePopup>
        <EditPopup v-if="editPopupActive" :editProgram="tempData" @close="() => editPopupActive = false"></EditPopup>
        <Loader v-if="loading" :position="'fixed'"></Loader>
    </div>
</template>

<script setup>
import axios from 'axios';
import HeaderComp from '../components/HeaderComp.vue';
import { ref, onMounted } from 'vue'
import Loader from '../components/Loader.vue'
import DeletePopup from '../components/DeletePopup.vue';
import EditPopup from '../components/EditPopup.vue';

const allPrograms = ref([])
const loading = ref(false)
const editPopupActive = ref(false)
const deletePopupActive = ref(false)
const tempData = ref({})


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
    await axios.get("https://seasonreal.seasonsge.com/appv1real/all-program").then(data => {
        allPrograms.value = data.data
        loading.value = false
        console.log("allPrograms.value" ,allPrograms.value)
    })
    await axios.get("https://seasonreal.seasonsge.com/appv1real/cities-view").then(data => {
        allPrograms.value.forEach(el => {
            el.destination = data.data.filter(ele => ele.id == el.return_airline)[0]
        })
    })
})
</script>

<style lang="scss" scoped>
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