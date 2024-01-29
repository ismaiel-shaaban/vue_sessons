<template>
    <div class="overlay position-fixed">
        <div class="del-popup rounded-2 p-3 d-flex flex-column position-relative">
            <h3 class="fw-bold fs-4">هل انت منأكد من انك تريد حذف   الارشيف ؟</h3>
           
            <div class="d-flex gap-2 text-end mt-5">
                <button class="rounded-2 p-2 px-4 text-light bg-danger opacity-hover" @click="deleteIAllArchives">حذف</button>
                <button class="rounded-2 p-2 px-4 text-light bg-secondary bg-opacity-50 opacity-hover"
                    @click="$emit('close')">الغاء</button>
            </div>
            <Loader v-if="loading" :position="'absolute'"></Loader>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import Loader from '../components/Loader.vue'
import axios from 'axios';

const props = defineProps(['deletedProgram'])
const loading = ref(false)
const deleteIAllArchives = ()=>{
    console.log(props.deletedProgram);
    if(props.deletedProgram == 'all') window.open("https://seasonreal.seasonsge.com/appv1real/delete-all", "_blank");
    if(props.deletedProgram == 'car') window.open("https://seasonreal.seasonsge.com/appv1real/delete-car", "_blank");
    if(props.deletedProgram == 'flight')  window.open("https://seasonreal.seasonsge.com/appv1real/delete-flight", "_blank")
    if(props.deletedProgram == 'hotel')  window.open("https://seasonreal.seasonsge.com/appv1real/delete-hotel", "_blank");
    if(props.deletedProgram == 'program') window.open("https://seasonreal.seasonsge.com/appv1real/delete-program", "_blank");
}
const deleteProgram = async () => {
    const formData = new FormData()
    formData.append("id", props.deletedProgram.id)
    loading.value = true
    await axios.post(`https://seasonreal.seasonsge.com/appv1real/slider_delete` ,formData).then(response => {
        // console.log(response);
        loading.value = false
            // console.log(cityDel);
            // console.log(props.deletedProgram.id);
        location.reload()
    })
}

onMounted(async () => {
    setTimeout(() => {
        document.querySelector(".del-popup").classList.add("scal-active")
    }, 10)
})
</script>
<style lang="scss" scoped>
.overlay {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.404);
    display: grid;
    place-items: center;

    .del-popup {
        width: 550px;
        height: auto;
        background-color: var(--white-color);
        transition: 0.2s;
        transform: scale(0.01);

        &.scal-active {
            transform: scale(1);
        }
    }

    @media (max-width: 767px) {
        .del-popup {
            width: calc(100% - 15px);

            h3,
            p {
                text-align: center;
            }
        }
    }
}</style>