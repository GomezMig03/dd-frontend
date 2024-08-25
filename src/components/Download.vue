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
        <article>
            <h4>
                Download (AppImage x64)
            </h4>
        </article>
    </a>

</template>

<style >
article{
    background-color: rgb(95, 68, 27);
    border-radius: 5px;
    padding-top: 5px;
    padding-bottom: 5px;
    cursor: pointer;
}
article:hover{
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
