<script setup>
import { ref } from 'vue';
import { getLatestVersion } from '../utilities/scripts';
const last = ref(null)
const openVersionList = ref(false)
const arch = ref("x64")
const unusedArch = ref("arm64")

const updateVersion = async () => {
    getLatestVersion(arch.value)
    .then(res => {
        last.value = res
        console.log(last.value)
    })
    .catch(error => {
        console.error(error)
    })
}
updateVersion()

const handleListClick = () => {
    openVersionList.value = !openVersionList.value
    console.log(openVersionList.value)
}

// TODO: Make a more efficient way of doing this, also prepare for posible flatpak, rpm and deb as this is only usable with two versions
const changeArchs = () => {
    const temp = arch.value
    arch.value = unusedArch.value
    unusedArch.value = temp
    openVersionList.value = false
    console.log(arch.value)
    updateVersion()
}
</script>

<template>
    <div>
    <section class="download-section">
        <a target="_blank" :href="last">
            <article id="download-block">
                <h4 id="download-text">
                    Download (AppImage {{ arch }})
                </h4>
            </article>
        </a>
            <button id="change-version-button" @click="handleListClick" >
                <p v-if="!openVersionList">
                    ▼
                </p>
                <p v-else>
                    ▲
                </p>
            </button>
    </section>
    <section class="version-list" v-if="openVersionList">
        <article id="download-block" @click="changeArchs" >
                <h4 id="download-text">
                    Download (AppImage {{ unusedArch }})
                </h4>
            </article>
    </section>
</div>
</template>

<style >
#download-block{
    background-color: rgb(95, 68, 27);
    border-radius: 5px;
    cursor: pointer;
    width: fit-content;
    padding: 5px 10px;
    max-width: 252px;
    width: 21.6vw;
}
.version-list{
    position: relative;
    padding: 1px;
}
.download-section{
    display: flex;
    flex-flow: row nowrap;
    position: relative;
    margin-top: 1.2vw;
}
#download-block:hover{
    background-color: rgb(110, 79, 31);
}
#change-version-button{
    background-color: rgb(95, 68, 27);
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
