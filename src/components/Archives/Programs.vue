<template>
    <form dir="ltr" class="search mb-4 d-flex align-items-center justify-content-between flex-md-row flex-column gap-3">
        <input type="search" class="p-2 px-3 rounded-1 border w-25" placeholder="Search With Name, Code, Email"
            v-model="searchInput">
        <div class=" d-flex align-items-center gap-2 w-50 flex-wrap">
            <label class="w-50">
                <span class="d-block mb-2">التاريخ من</span>
                <input type="date" class="p-2 px-3 rounded-1 border w-100" v-model="searchDate.fromDate">
            </label>
            <label class="flex-fill">
                <span class="d-block mb-2">التاريخ الي</span>
                <input type="date" class="p-2 px-3 rounded-1 border w-100" v-model="searchDate.toDate">
            </label>
            <button class="btn btn-primary w-50" @click.prevent="searchWithDate">Apply Filter</button>
            <button class="btn btn-secondary flex-fill" @click.prevent="filterList = []">Cancel Filter</button>
        </div>
    </form>
    <div dir="ltr" class="my-4 d-flex align-items-center justify-content-between gap-2 flex-md-row flex-column">
        <div class="d-flex align-items-center gap-2">
            <span>Export As: </span>
            <button class="btn p-1 btn-danger rounded-pill px-4 text-uppercase d-flex gap-2 align-items-center"
                @click="generatePDF">
                <i class="fa-solid fa-file-pdf"></i>
                PDF
            </button>
            <JsonExcel :data="filterList.length > 0 ? filterList : filteration" :fields="json_fields"
                :footer="`الاجمالي: ${fullTotal.toFixed(2)}`" worksheet="My Worksheet" name="Programs Archive">
                <button class="btn p-1 btn-success rounded-pill px-4 text-uppercase d-flex gap-2 align-items-center"
                    @click="getTotal">
                    <i class="fa-solid fa-file-excel"></i>
                    Excel
                </button>
            </JsonExcel>
        </div>
        <div class="d-flex align-items-center gap-2">
            
            <button class="btn p-1 btn-danger rounded-pill px-4 text-uppercase d-flex gap-2 align-items-center"
                @click="confirmDelete('program')">
                
                حذف الجميع
            </button>
         
        </div>
        <!-- <span class="result text-muted fw-semibold" v-if="filterList.length > 0">
            Results: {{ filterList.length }}
        </span>
        <span class="result text-muted fw-semibold" v-else-if="searchInput !== ''">
            Results: {{ filteration.length }}
        </span>
        <span class="result text-muted fw-semibold" v-else>
            Results: {{ programsArchive.length }}
        </span> -->

        <div>
            <span class="result text-muted fw-semibold" v-if="filterList.length > 0">
                Results: {{ filterList.length }}
            </span>
            <span class="result text-muted fw-semibold" v-else-if="searchInput !== ''">
                Results: {{ filteration.length }}
            </span>
            <span class="result text-muted fw-semibold" v-else>
                Results: {{ programsArchive.length }}
            </span>

            <span class="check-icon-count" style="display: block">Total Check Icons: {{ status1Count }}</span>
            <span class="x-mark-icon-count" style="display: block">Total X-Mark Icons: {{ status0Count }}</span>
        </div>
    </div>
    <div class="responsive-table overflow-auto w-100" dir="ltr">
        <Vue3Html2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="true"
            :paginate-elements-by-height="1400" filename="Programs Archive" :pdf-quality="2" :manual-pagination="false"
            pdf-format="a5" pdf-orientation="landscape" pdf-content-width="100%" ref="html2Pdf"
            :html-to-pdf-options="htmlToPdfOptions">
            <template v-slot:pdf-content>
                <table class="w-100">
                    <thead>
                        <tr>
                            <td>تاريخ الانشاء</td>
                            <td>كود الحجز</td>
                            <td>الاسم الاول</td>
                            <td>الاسم الثاني</td>
                            <td>البريد الالكتروني</td>
                            <td>رقم الهاتف</td>
                            <td>الجنسيه</td>
                            <td>رقم الباسبور</td>
                            <td>صوره تذكره الطيران</td>
                            <td>الدولة</td>
                            <td>المدينة</td>
                            <td>تشمل الطيران</td>
                            <td>عدد الاشخاص</td>
                            <td>شخص 2</td>
                            <td>شخص 3</td>
                            <td>شخص 4</td>
                            <td>شخص 5</td>
                            <td>شخص 6</td>
                            <td>شخص 7</td>
                            <td>شخص 8</td>
                            <td>الحاله</td>
                            <td>الاجمالي</td>
                            <td>الضريبه</td>
                            <td>الصافي</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="programsArchive.length > 0 && filterList.length === 0"
                            v-for="(item, index) in filteration" :key="index">
                            <td>{{ item.registration_date }}</td>
                            <td>{{ item.booking_id }}</td>
                            <td>{{ item.first_name }}</td>
                            <td>{{ item.last_name }}</td>
                            <td v-if="item.user">{{ item.user.email }}</td>
                            <td>{{ item.phone_number }}</td>
                            <td>{{ item.nationality }}</td>
                            <td>{{ item.passport_number }}</td>
                            <td><img  @contextmenu.prevent
      @touchstart.prevent :src="item.image_name" style="width: 40px; height: auto"></td>
                            <td>{{ item.country?.name }}</td>
                            <td>{{ item.city?.name }}</td>
                            <td>{{ item.Include_flight == '1' ? 'Include Flight' : 'Not Include Flight' }}</td>
                            <td>{{ +item.number_of_adults + +item.number_of_children + +item.number_of_infants }}</td>
                            <td>{{ item.person2?.split(',')[0] || '-----' }}</td>
                            <td>{{ item.person3?.split(',')[0] || '-----' }}</td>
                            <td>{{ item.person4?.split(',')[0] || '-----' }}</td>
                            <td>{{ item.person5?.split(',')[0] || '-----' }}</td>
                            <td>{{ item.person6?.split(',')[0] || '-----' }}</td>
                            <td>{{ item.person7?.split(',')[0] || '-----' }}</td>
                            <td>{{ item.person8?.split(',')[0] || '-----' }}</td>
                            <td v-if="item.status">
                   
                                <i :class="item.status == '1' ? statuscheckIconClass : statusXMarkIconClass" class="ms-2"></i>
                            </td>
                            <td class="text-center">
                                {{ USDollar.format(item.total) }}
                            </td>
                            <td class="text-center">
                                %{{ item.tax }}
                            </td>
                            <td class="text-center">
                                {{ USDollar.format(item.net) }}
                            </td>
                        </tr>
                        <tr v-if="programsArchive.length > 0 && filterList.length > 0" v-for="(item, index) in filterList"
                            :key="index">
                            <td>{{ item.registration_date }}</td>
                            <td>{{ item.booking_id }}</td>
                            <td>{{ item.first_name }}</td>
                            <td>{{ item.last_name }}</td>
                            <td v-if="item.user">{{ item.user.email }}</td>
                            <td>{{ item.phone_number }}</td>
                            <td>{{ item.nationality }}</td>
                            <td>{{ item.passport_number }}</td>
                            <td><img  @contextmenu.prevent
      @touchstart.prevent :src="item.image_name" style="width: 40px; height: auto"></td>
                            <td>{{ item.country?.name }}</td>
                            <td>{{ item.city?.name }}</td>
                            <td>{{ item.Include_flight == '1' ? 'Include Flight' : 'Not Include Flight' }}</td>
                            <td>{{ +item.number_of_adults + +item.number_of_children + +item.number_of_infants }}</td>
                            <td>{{ item.person2?.split(',')[0] || '-----' }}</td>
                            <td>{{ item.person3?.split(',')[0] || '-----' }}</td>
                            <td>{{ item.person4?.split(',')[0] || '-----' }}</td>
                            <td>{{ item.person5?.split(',')[0] || '-----' }}</td>
                            <td>{{ item.person6?.split(',')[0] || '-----' }}</td>
                            <td>{{ item.person7?.split(',')[0] || '-----' }}</td>
                            <td>{{ item.person8?.split(',')[0] || '-----' }}</td>
                            <td v-if="item.status">
                   
                                <i :class="item.status == '1' ? statuscheckIconClass : statusXMarkIconClass" class="ms-2"></i>
                            </td>
                            <td class="text-center">
                                {{ USDollar.format(item.total) }}
                            </td>
                            <td class="text-center">
                                %{{ item.tax }}
                            </td>
                            <td class="text-center">
                                {{ USDollar.format(item.net) }}
                            </td>
                        </tr>
                        <tr>
                            <td colspan="23"></td>
                    <td>{{ fullTotal.toFixed(2) }}</td>
                    <td colspan="1">الاجمالي</td>
                        </tr>
                    </tbody>
                </table>
            </template>
        </Vue3Html2pdf>


        <table class="w-100">
            <thead>
                <tr>
                    <td>تاريخ الانشاء</td>
                    <td>كود الحجز</td>
                    <td>الاسم الاول</td>
                    <td>الاسم الثاني</td>
                    <td>البريد الالكتروني</td>
                    <td>رقم الهاتف</td>
                    <td>الجنسيه</td>
                    <td>رقم الباسبور</td>
                    <td>صوره تذكره الطيران</td>
                    <td>الدولة</td>
                    <td>المدينة</td>
                    <td>تشمل الطيران</td>
                    <td>عدد الاشخاص</td>
                    <td>شخص 2</td>
                    <td>شخص 3</td>
                    <td>شخص 4</td>
                    <td>شخص 5</td>
                    <td>شخص 6</td>
                    <td>شخص 7</td>
                    <td>شخص 8</td>
                    <td>الحاله</td>
                    <td>الاجمالي</td>
                    <td>الضريبه</td>
                    <td>الصافي</td>
                    <td>الادوات</td>
                </tr>
            </thead>
            <tbody>
                <tr v-if="programsArchive.length > 0 && filterList.length === 0" v-for="(item, index) in filteration"
                    :key="index">
                    <td>{{ item.registration_date }}</td>
                    <td>{{ item.booking_id }}</td>
                    <td>{{ item.first_name }}</td>
                    <td>{{ item.last_name }}</td>
                    <td v-if="item.user">{{ item.user.email }}</td>
                    <td>{{ item.phone_number }}</td>
                    <td>{{ item.nationality }}</td>
                    <td>{{ item.passport_number }}</td>
                    <td><img  @contextmenu.prevent
                    @touchstart.prevent :src="item.image_name" style="width: 40px; height: auto"></td>
                    <td>{{ item.country?.name }}</td>
                    <td>{{ item.city?.name }}</td>
                    <td>{{ item.Include_flight == '1' ? 'Include Flight' : 'Not Include Flight' }}</td>
                    <td>{{ +item.number_of_adults + +item.number_of_children + +item.number_of_infants }}</td>
                    <td>{{ item.person2 || '-----' }}</td>
                    <td>{{ formatString(item.person3) || '-----' }}</td>
                    <td>{{ formatString(item.person4) || '-----' }}</td>
                    <td>{{ formatString(item.person5) || '-----' }}</td>
                    <td>{{ formatString(item.person6) || '-----' }}</td>
                    <td>{{ formatString(item.person7) || '-----' }}</td>
                    <td>{{ formatString(item.person8) || '-----' }}</td>
                    <td v-if="item.status">
                        <button class="btn btn-danger rounded-pill" @click="changeData(item.id, item.status, index)">
                            Change Status
                        </button>
                        <i :class="item.status == '1' ? statuscheckIconClass : statusXMarkIconClass" class="ms-2"></i>
                    </td>
                    <td class="text-center">
                        {{ USDollar.format(item.total) }}
                    </td>
                    <td class="text-center">
                        %{{ item.tax }}
                    </td>
                    <td class="text-center">
                        {{ USDollar.format(item.net) }}
                    </td>
                    <td>
                        <div class="d-flex justify-content-between">
                            <button class="btn btn-danger rounded-pill" @click="getInvoice(item)">
                            <i class="fa-solid fa-file-pdf mx-1"></i>
                                Invoice PDF
                            </button> 
                            <button class="btn btn-danger rounded-pill m-1" @click="deleteItem(item)">
                           
                                حذف
                            </button> 
                        </div>
                    </td>
                </tr>
                <tr v-if="programsArchive.length > 0 && filterList.length > 0" v-for="(item, index) in filterList"
                    :key="index">
                    <td>{{ item.registration_date }}</td>
                    <td>{{ item.booking_id }}</td>
                    <td>{{ item.first_name }}</td>
                    <td>{{ item.last_name }}</td>
                    <td v-if="item.user">{{ item.user.email }}</td>
                    <td>{{ item.phone_number }}</td>
                    <td>{{ item.nationality }}</td>
                    <td>{{ item.passport_number }}</td>
                    <td><img  @contextmenu.prevent
                         @touchstart.prevent :src="item.image_name" style="width: 40px; height: auto"></td>
                    <td>{{ item.country?.name }}</td>
                    <td>{{ item.city?.name }}</td>
                    <td>{{ item.Include_flight == '1' ? 'Include Flight' : 'Not Include Flight' }}</td>
                    <td>{{ +item.number_of_adults + +item.number_of_children + +item.number_of_infants }}</td>
                    <td>{{ formatString(item.person2) || '-----' }}</td>
                    <td>{{ formatString(item.person3) || '-----' }}</td>
                    <td>{{ formatString(item.person4) || '-----' }}</td>
                    <td>{{ formatString(item.person5) || '-----' }}</td>
                    <td>{{ formatString(item.person6) || '-----' }}</td>
                    <td>{{ formatString(item.person7) || '-----' }}</td>
                    <td>{{ formatString(item.person8) || '-----' }}</td>
                    <td v-if="item.status">
                   
                        <i :class="item.status == '1' ? statuscheckIconClass : statusXMarkIconClass" class="ms-2"></i>
                    </td>
                    <td class="text-center">
                        {{ USDollar.format(item.total) }}
                    </td>
                    <td class="text-center">
                        %{{ item.tax }}
                    </td>
                    <td class="text-center">
                        {{ USDollar.format(item.net) }}
                    </td>
                    <td>
                        <div class="d-flex justify-content-between">
                            <button class="btn btn-danger rounded-pill" @click="getInvoice(item)">
                            <i class="fa-solid fa-file-pdf mx-1"></i>
                                Invoice PDF
                            </button> 
                            <button class="btn btn-danger rounded-pill m-1" @click="deleteItem(item)">
                           
                                حذف
                            </button> 
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="23"></td>
                    <td>{{ fullTotal.toFixed(2) }}</td>
                    <td colspan="1">الاجمالي</td>
                        </tr>
            </tbody>
        </table>
        <h3 v-if="programsArchive.length === 0" class="text-muted text-center w-100 py-5">Nothing To Show</h3>
        <div class="alert alert-error alert-danger d-flex align-items-center gap-2 position-fixed" role="alert">
            <i class="fa-solid fa-circle-xmark"></i>
            <div>
                لا توجد نتائج بحث بهذه التواريخ
            </div>
        </div>
        <Loader v-if="loading" :position="'fixed'"></Loader>
        <DeleteArchivePopup v-if="deletePopupActive" :deletedProgram="tempData" @close="() => deletePopupActive = false">
        </DeleteArchivePopup>
    </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref, computed } from 'vue';
import Loader from '../Loader.vue';
import JsonExcel from "vue-json-excel3";
import Vue3Html2pdf from 'vue3-html2pdf'
import { jsPDF } from "jspdf";
import DeleteArchivePopup from '../DeleteArchivePopup.vue';
const deletePopupActive = ref(false)
const tempData = ref({})
const confirmDelete = (type) => {
    deletePopupActive.value = true
    tempData.value = type
}

const html2Pdf = ref()
const loading = ref(false)
const programsArchive = ref([])
const searchInput = ref('')
const filterList = ref([])
const fullTotal = ref(0)
const searchDate = ref({
    fromDate: new Date().toLocaleDateString("en-CA"),
    toDate: new Date().toLocaleDateString("en-CA"),
})
const USDollar = Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
})
const formatString = (str) => {
    if (str !== ''&& str!= null) {
      
        return str.split('-').join('/')
    }
}
const json_fields = ref({
    "تاريخ الانشاء": "registration_date",
    "كود الحجز": "booking_id",
    "الاسم الاول": "first_name",
    "الاسم الثاني": "last_name",
    "البريد الالكتروني": "user.email",
    "رقم الهاتف": "phone_number",
    "الجنسية": "nationality",
    "رقم الباسبور": "passport_number",
    "تشمل الطيران": {
        field: "Include_flight",
        callback: (value) => {
            if (value == '1') {
                return "تشمل الطيران"
            } else return "لا تشمل الطيران"
        }
    },
    "شخص 2": "person2",
    "شخص 3": "person3",
    "شخص 4": "person4",
    "شخص 5": "person5",
    "شخص 6": "person6",
    "شخص 7": "person7",
    "شخص 8": "person8",
    // "الذهاب من": "flight.from.english_name",
    // "الذهاب الي": "flight.to.english_name",
    // "تاريخ الذهاب": "flight.departureDate",
    // "تاريخ الوصول": "flight.arrivDate22",
    // "العوده من": "flight.to.english_name",
    // "العوده الي": "flight.from.english_name",
    // "تاريخ بداية العوده": "flight.returnStartDate",
    // "تاريخ نهاية العوده": "flight.returnEndDate",
    "الاجمالي": "total",
    "الضريبة": "tax",
    "الصافي": "net",
})

const filteration = computed(() => {
    if (searchInput.value !== '') {
        filterList.value = []
        return programsArchive.value.filter(el => {
            if (el.booking_id.toLowerCase().includes(searchInput.value.toLocaleLowerCase())) {
                return el
            } else if (el.first_name.toLowerCase().includes(searchInput.value.toLocaleLowerCase())) {
                return el
            } else if (el.user && (el.user.message === '' || el.user.email !== undefined) && el.user.email.toLowerCase().includes(searchInput.value.toLocaleLowerCase())) {
                return el
            }
        })
    } else return programsArchive.value
})

const searchWithDate = async () => {
    searchInput.value = ''
    console.log(searchDate.value.fromDate);
    filterList.value = programsArchive.value.filter(el => el.registration_date.split(" ")[0] >= searchDate.value.fromDate && el.registration_date.split(" ")[0] <= searchDate.value.toDate)
    if (filterList.value.length === 0) {
        document.querySelector(".alert").classList.add("active")
        setTimeout(() => {
            document.querySelector(".alert").classList.remove("active")
        }, 1500)
    }
}
const htmlToPdfOptions = {
    margin: 20,
    image: {
        type: 'jpeg',
        quality: 0.98
    },
    filename: "Programs Archive",

    jsPDF: {
        unit: 'mm',
        format: 'a2',
        orientation: 'l',
    }
}
const generatePDF = () => {
    fullTotal.value = 0
    if (searchInput.value !== '') {
        filteration.value.forEach(el =>     el.net!='NaN' ? fullTotal.value +=  +el.net :'')
    } else if (filterList.value.length > 0) {
        filterList.value.forEach(el =>     el.net!='NaN' ? fullTotal.value +=  +el.net :'')
    } else programsArchive.value.forEach(el =>     el.net!='NaN' ? fullTotal.value +=  +el.net :'')
    html2Pdf.value.generatePdf()
}


const getTotal = () => {
    fullTotal.value = 0
    if (searchInput.value !== '') {
        filteration.value.forEach(el =>     el.net!='NaN' ? fullTotal.value +=  +el.net :'')
    } else if (filterList.value.length > 0) {
        filterList.value.forEach(el =>     el.net!='NaN' ? fullTotal.value +=  +el.net :'')
    } else programsArchive.value.forEach(el =>     el.net!='NaN' ? fullTotal.value +=  +el.net :'')
}

const getInvoice = (item) => {

    console.log("lll" ,item);
    if (item.user.type == 1) {
        window.open(`https://admirable-starship-be3a91.netlify.app/#/en/agent-programs-checkout/${item.booking_id}/3`, "_blank")
    } else {
        window.open(`https://admirable-starship-be3a91.netlify.app/#/en/programs-checkout/${item.booking_id}/3`, "_blank")
    }
}

const deleteItem = (item) => {
    console.log("lll" ,item);
    const formData = new FormData();
    formData.append('id', item.id);
    axios.post("https://seasonreal.seasonsge.com/appv1real/ar-program" ,formData)
        .then(data => {
          
          if(data.data.success){
            window.location.reload();
          }
    })
  
}


const getPrograms = async () => {
    loading.value = true
    await axios.get("https://seasonreal.seasonsge.com/appv1real/bo-program")
        .then(data => {
            // debugger
            if (data.data.message !== undefined) {
                loading.value = false
                // console.log(data.data)
            } else {
                programsArchive.value = data.data
                programsArchive.value.forEach(el => {
                    console.log(el);
                    el.net!='NaN' ? fullTotal.value +=  +el.net :''
                })
                programsArchive.value.forEach(el => {
                    axios.get(`https://seasonreal.seasonsge.com/appv1real/user-data?user_id=${el.email}`)
                        .then(data => {
                            el.user = data.data
                            // await axios.get('https://seasonreal.seasonsge.com/appv1real/usersview')
                            //     .then(data => {
                            //         console.log('hello')
                            //         console.log(data.data)
                            //     })
                        })
                    axios.get("https://seasonreal.seasonsge.com/appv1real/cities-view")
                        .then(data => {
                            el.city = data.data.filter((ele) => ele.id == el.City)[0];
                        })
                    const country = new FormData()
                    country.append("country_id", el.country)
                    axios.post(`https://seasonreal.seasonsge.com/appv1real/country-by-id`, country)
                        .then(data => {
                            el.country = data.data.country
                        })
                })
                loading.value = false
                status0Count.value = data.data.filter((item) => item.status == '0').length;
                status1Count.value = data.data.filter((item) => item.status == '1').length;
            }
            console.log(data.data)
        })
}

onMounted(async () => {
    getPrograms()
})

let statuscheckIconClass = ref('fa-solid fa-check');
let statusXMarkIconClass = ref('fa-solid fa-xmark');

let status0Count = ref(0);
let status1Count = ref(0);

const changeData = async (id, status, index) => {
    try {
        const apiUrl = 'https://seasonreal.seasonsge.com/appv1real/br_id';
        // console.log(apiUrl)

        const formData = new FormData();
        formData.append('id', id);
        formData.append('status', status);
        const response = await axios.post(apiUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (response && response.status == 200) {
            getPrograms()
        }
    } catch (error) {
        console.error('Error changing status:', error);
    }
};
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
.responsive-table {
    td {
        border: 1px solid gray;
        text-wrap: nowrap;
    }

    thead {
        td {
            padding: 10px 15px;
            background-color: gray;
            color: white;
        }
    }

    tbody {
        td {
            padding: 10px;
            text-align: center;
        }
    }
}

@media (max-width: 767px) {

    input,
    form>div,
    label {
        width: 100% !important;
    }

    span {
        white-space: nowrap;
    }

    .result {
        align-self: flex-end;
    }
}
</style>