<template>
    <div class="archive min-vh-100">
        <HeaderComp></HeaderComp>
     
        <div class="cont p-3 py-3 ">
            <div class="d-flex align-items-center m-2 ">
            
                <button class="btn p-1 btn-danger rounded-pill px-4 text-uppercase d-flex gap-2 align-items-center"
                    @click="confirmDelete('all')">
                    
                    حذف جميع الأرشيف
                </button>
         
            </div>
            <div class="tabs d-flex w-100 flex-md-row flex-column">
                <span :class="`tab bg-secondary text-light fw-bold p-3 px-4 ${activeTab === '1' ? 'active' : ''}`"
                    @click="activeTab = '1'">
                    السيارات
                </span>
                <span :class="`tab bg-secondary text-light fw-bold p-3 px-4 ${activeTab === '2' ? 'active' : ''}`"
                    @click="activeTab = '2'">
                    الفنادق
                </span>
                <span :class="`tab bg-secondary text-light fw-bold p-3 px-4 ${activeTab === '3' ? 'active' : ''}`"
                    @click="activeTab = '3'">
                    رحلات الطيران
                </span>
                <span :class="`tab bg-secondary text-light fw-bold p-3 px-4 ${activeTab === '4' ? 'active' : ''}`"
                    @click="activeTab = '4'">
                    الرحلات السياحيه
                </span>
            </div>
            <div class="box p-3 rounded-2">
                <Cars v-if="activeTab == '1'"></Cars>
                <Hotels v-if="activeTab == '2'"></Hotels>
                <Flights v-if="activeTab == '3'"></Flights>
                <Programs v-if="activeTab == '4'"></Programs>
            </div>
            <DeleteArchivePopup v-if="deletePopupActive" :deletedProgram="tempData" @close="() => deletePopupActive = false">
            </DeleteArchivePopup>
        </div>
    </div>
</template>

<script setup>
import HeaderComp from '../components/HeaderComp.vue';
import { ref } from 'vue'
import Cars from '../components/Archives/Cars.vue';
import Hotels from '../components/Archives/Hotels.vue';
import Flights from '../components/Archives/Flights.vue';
import Programs from '../components/Archives/Programs.vue';
import DeleteArchivePopup from '../components/DeleteArchivePopup.vue';
const deletePopupActive = ref(false)
const tempData = ref({})
const confirmDelete = (type) => {
    deletePopupActive.value = true
    tempData.value = type
}
const activeTab = ref('1')

</script>

<style lang="scss" scoped>
.archive {
    background-color: var(--bg-color);

    .tabs {
        .tab {
            flex: 1;
            text-align: center;
            transition: 0.2s;
            cursor: pointer;

            span {
                width: 100%;
            }

            &:hover {
                opacity: 0.7;
            }

            &.active {
                background-color: #dc3545 !important;
            }
        }
    }

    .box {
        background-color: var(--white-color);

    }
}</style>