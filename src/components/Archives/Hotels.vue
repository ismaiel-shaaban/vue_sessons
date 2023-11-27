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
                :footer="`الاجمالي: ${fullTotal.toFixed(2)}`" worksheet="My Worksheet" name="Hotels Archive">
                <button class="btn p-1 btn-success rounded-pill px-4 text-uppercase d-flex gap-2 align-items-center"
                    @click="getTotal">
                    <i class="fa-solid fa-file-excel"></i>
                    Excel
                </button>
            </JsonExcel>
        </div>

        <div>
            <span class="result text-muted fw-semibold" v-if="filterList.length > 0">
                Results: {{ filterList.length }}
            </span>
            <span class="result text-muted fw-semibold" v-else-if="searchInput !== ''">
                Results: {{ filteration.length }}
            </span>
            <span class="result text-muted fw-semibold" v-else>
                Results: {{ hotelsArchive.length }}
            </span>

            <span class="check-icon-count" style="display: block">Total Check Icons: {{ status1Count }}</span>
            <span class="x-mark-icon-count" style="display: block">Total X-Mark Icons: {{ status0Count }}</span>
        </div>

    </div>
    <div class="responsive-table overflow-auto w-100" dir="ltr">
        <Vue3Html2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="true"
            :paginate-elements-by-height="1400" filename="Hotels Archive" :pdf-quality="2" :manual-pagination="false"
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
                            <td>اسم الفندق</td>
                            <td>عدد الاشخاص</td>
                            <td>تاريخ البدايه</td>
                            <td>تاريخ النهايه</td>
                            <td>عدد الايام</td>
                            <td>الاجمالي</td>
                            <td>الضريبه</td>
                            <td>الصافي</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="hotelsArchive.length > 0 && filterList.length === 0" v-for="(item, index) in filteration"
                            :key="index">
                            <td>{{ item.date_order }}</td>
                            <td>{{ item.code }}</td>
                            <td>{{ item.first_name }}</td>
                            <td>{{ item.last_name }}</td>
                            <td v-if="item.user">{{ item.user.email }}</td>
                            <td>{{ item.phone }}</td>
                            <td>{{ item.hotel_name }}</td>
                            <td>{{ item.room_type }}</td>
                            <td>{{ item.start_date }}</td>
                            <td>{{ item.end_date }}</td>
                            <td>{{ item.number_of_days }}</td>
                            <td>{{ USDollar.format(item.total) }}</td>
                            <td>%{{ item.tax }}</td>
                            <td>{{ USDollar.format(item.net_total) }}</td>
                        </tr>
                        <tr v-if="hotelsArchive.length > 0 && filterList.length > 0" v-for="(item, index) in filterList"
                            :key="index">
                            <td>{{ item.date_order }}</td>
                            <td>{{ item.code }}</td>
                            <td>{{ item.first_name }}</td>
                            <td>{{ item.last_name }}</td>
                            <td v-if="item.user">{{ item.user.email }}</td>
                            <td>{{ item.phone }}</td>
                            <td>{{ item.hotel_name }}</td>
                            <td>{{ item.room_type }}</td>
                            <td>{{ item.start_date }}</td>
                            <td>{{ item.end_date }}</td>
                            <td>{{ item.number_of_days }}</td>
                            <td>{{ USDollar.format(item.total) }}</td>
                            <td>%{{ item.tax }}</td>
                            <td>{{ USDollar.format(item.net_total) }}</td>
                        </tr>
                        <tr>
                            <td colspan="13">الاجمالي</td>
                            <td>{{ fullTotal.toFixed(2) }}</td>
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
                    <td>اسم الفندق</td>
                    <td>عدد الاشخاص</td>
                    <td>الحاله</td>
                    <td>تاريخ البدايه</td>
                    <td>تاريخ النهايه</td>
                    <td>عدد الايام</td>
                    <td>الاجمالي</td>
                    <td>الضريبه</td>
                    <td>الصافي</td>
                    <td>الادوات</td>
                </tr>
            </thead>
            <tbody>
                <tr v-if="hotelsArchive.length > 0 && filterList.length === 0" v-for="(item, index) in filteration"
                    :key="index">
                    <td>{{ item.date_order }}</td>
                    <td>{{ item.code }}</td>
                    <td>{{ item.first_name }}</td>
                    <td>{{ item.last_name }}</td>
                    <td v-if="item.user">{{ item.user.email }}</td>
                    <td>{{ item.phone }}</td>
                    <td>{{ item.hotel_name }}</td>
                    <td>{{ item.room_type }}</td>
                    <td v-if="item.status">
                        <button class="btn btn-danger rounded-pill" @click="changeData(item.id, item.status, index)">
                            Change Status
                        </button>
                        <i :class="item.status == '1' ? statuscheckIconClass : statusXMarkIconClass" class="ms-2"></i>
                    </td>
                    <!-- <td v-if="item.status"><i class="fa-solid fa-xmark"></i></td> -->
                    <td>{{ item.start_date }}</td>
                    <td>{{ item.end_date }}</td>
                    <td>{{ item.number_of_days }}</td>
                    <td>{{ USDollar.format(item.total) }}</td>
                    <td>%{{ item.tax }}</td>
                    <td>{{ USDollar.format(item.net_total) }}</td>
                    <td>
                        <button class="btn btn-danger rounded-pill" @click="getInvoice(item)">
                            <i class="fa-solid fa-file-pdf mx-1"></i>
                            Invoice PDF
                        </button>
                    </td>
                </tr>
                <tr v-if="hotelsArchive.length > 0 && filterList.length > 0" v-for="(item, index) in filterList"
                    :key="index">
                    <td>{{ item.date_order }}</td>
                    <td>{{ item.code }}</td>
                    <td>{{ item.first_name }}</td>
                    <td>{{ item.last_name }}</td>
                    <td v-if="item.user">{{ item.user.email }}</td>
                    <td>{{ item.phone }}</td>
                    <td>{{ item.hotel_name }}</td>
                    <td>{{ item.room_type }}</td>
                    <td v-if="item.status === 1"><i class="fa-solid fa-check"></i></td>
                    <td>{{ item.start_date }}</td>
                    <td>{{ item.end_date }}</td>
                    <td>{{ item.number_of_days }}</td>
                    <td>{{ USDollar.format(item.total) }}</td>
                    <td>%{{ item.tax }}</td>
                    <td>{{ USDollar.format(item.net_total) }}</td>
                    <td>
                        <button class="btn btn-danger rounded-pill" @click="getInvoice(item)">
                            <i class="fa-solid fa-file-pdf mx-1"></i>
                            Invoice PDF
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <h3 v-if="hotelsArchive.length === 0" class="text-muted text-center w-100 py-5">Nothing To Show</h3>
        <div class="alert alert-error alert-danger d-flex align-items-center gap-2 position-fixed" role="alert">
            <i class="fa-solid fa-circle-xmark"></i>
            <div>
                لا توجد نتائج بحث بهذه التواريخ
            </div>
        </div>
        <Loader v-if="loading" :position="'fixed'"></Loader>
    </div>
</template>
<script setup>
import axios from 'axios';
import { onMounted, ref, computed } from 'vue';
import Loader from '../Loader.vue';
import JsonExcel from "vue-json-excel3";
import Vue3Html2pdf from 'vue3-html2pdf'
import { jsPDF } from "jspdf";


const html2Pdf = ref()
const loading = ref(false)
const hotelsArchive = ref([])
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


const json_fields = ref({
    "تاريخ الانشاء": "date_order",
    "كود الحجز": "code",
    "الاسم الاول": "first_name",
    "الاسم الثاني": "last_name",
    "البريد الالكتروني": "user.email",
    "رقم الهاتف": "phone",
    "اسم الفندق": "hotel_name",
    "عدد الاشخاص": "room_type",
    "تاريخ البداية": "start_date",
    "تاريخ النهاية": "end_date",
    "عدد الايام": "number_of_days",
    "الاجمالي": "total",
    "الضريبة": "tax",
    "الصافي": "net_total",

})

const filteration = computed(() => {
    if (searchInput.value !== '') {
        filterList.value = []
        return hotelsArchive.value.filter(el => {
            if (el.code.toLowerCase().includes(searchInput.value.toLocaleLowerCase())) {
                return el
            } else if (el.first_name.toLowerCase().includes(searchInput.value.toLocaleLowerCase())) {
                return el
            } else if (el.user && (el.user.message === '' || el.user.email !== undefined) && el.user.email.toLowerCase().includes(searchInput.value.toLocaleLowerCase())) {
                return el
            }
        })
    } else return hotelsArchive.value
})

const searchWithDate = async () => {
    searchInput.value = ''
    filterList.value = hotelsArchive.value.filter(el => el.start_date >= searchDate.value.fromDate && el.end_date <= searchDate.value.toDate)
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
    filename: "Hotels Archive",

    jsPDF: {
        unit: 'mm',
        format: 'a2',
        orientation: 'l',
    }
}
const generatePDF = () => {
    fullTotal.value = 0
    if (searchInput.value !== '') {
        filteration.value.forEach(el => fullTotal.value += +el.net_total)
    } else if (filterList.value.length > 0) {
        filterList.value.forEach(el => fullTotal.value += +el.net_total)
    } else hotelsArchive.value.forEach(el => fullTotal.value += +el.net_total)
    html2Pdf.value.generatePdf()
}

const getTotal = () => {
    fullTotal.value = 0
    if (searchInput.value !== '') {
        filteration.value.forEach(el => fullTotal.value += +el.net_total)
    } else if (filterList.value.length > 0) {
        filterList.value.forEach(el => fullTotal.value += +el.net_total)
    } else hotelsArchive.value.forEach(el => fullTotal.value += +el.net_total)
}

const getInvoice = (item) => {
    console.log("lll" ,item);
    if (item.user.type == 1) {
        window.open(`https://admirable-starship-be3a91.netlify.app/#/ar/agent-hotels-checkout/${item.code}/3`, "_blank")
    } else {
        window.open(`https://admirable-starship-be3a91.netlify.app/#/ar/hotels-checkout/${item.code}`, "_blank")
    }
}

// change status
let statuscheckIconClass = ref('fa-solid fa-check');
let statusXMarkIconClass = ref('fa-solid fa-xmark');

let status0Count = ref(0);
let status1Count = ref(0);

const changeData = async (id, status, index) => {
    try {
        const apiUrl = 'https://seasonreal.seasonsge.com/appv1real/hotel_id';

        const formData = new FormData();
        formData.append('id', id);
        formData.append('status', status);
        const response = await axios.post(apiUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (response && response.status == 200) {
            getBoHotels()
        }
    } catch (error) {
        console.error('Error changing status:', error);
    }
};

onMounted(async () => {
    getBoHotels()
})

const getBoHotels = async () => {
    loading.value = true
    await axios.get("https://seasonreal.seasonsge.com/appv1real/bo-hotel")
        .then(data => {
            if (data.data.message !== undefined) {
                loading.value = false
            } else {
                hotelsArchive.value = data.data
                console.log("hotelsArchive",hotelsArchive);
                hotelsArchive.value.forEach(el => {
                    axios.get(`https://seasonreal.seasonsge.com/appv1real/user-data?user_id=${el.account_name}`)
                        .then(data => {
                            el.user = data.data
                        })
                })
                loading.value = false
                status0Count.value = data.data.filter((item) => item.status == '0').length;
                status1Count.value = data.data.filter((item) => item.status == '1').length;
            }
            // console.log(data)
        })
}
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