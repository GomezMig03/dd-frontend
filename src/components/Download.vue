<script setup>
import { ref } from 'vue';
import { getLatestVersion } from '../utilities/scripts';
const last = ref(null)
getLatestVersion()
    .then(res => {
        last.value = res
        console.log(last.value)
    })
    .catch(error => {
        console.error(error)
    })
</script>

<template>
    <a target="_blank" :href="last">
        <article id="download-block">
            <h4 id="download-text">
                Download (AppImage x64)
            </h4>
        </article>
    </a>

</template>

<style >
#download-block{
    background-color: rgb(95, 68, 27);
    border-radius: 5px;
    cursor: pointer;
    width: fit-content;
    padding: 5px 10px;
}
#download-block:hover{
    background-color: rgb(110, 79, 31);
}
a{
    color: rgb(233, 233, 233);
    -webkit-user-select: none;        
    -moz-user-select: none; 
    -ms-user-select: none; 
    user-select: none;

}
a:hover{
    color: rgb(233, 233, 233);
}
</style>
