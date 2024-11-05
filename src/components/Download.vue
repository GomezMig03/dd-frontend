<script setup>
import { ref, unref, computed } from 'vue';
import { getLatestVersion } from '../utilities/scripts';
const last = ref(null)
const openVersionList = ref(false)

const updateVersion = async () => {
    getLatestVersion(currentVersion.value.url)
        .then(res => {
            last.value = res
            console.log(last.value)
        })
        .catch(error => {
            console.error(error)
        })
}

const versions = ref([
    { "version": "AppImage x64", "current": true, "url": "x64.AppImage" },
    { "version": "Deb x64", "current": false, "url": "x64.deb" },
    { "version": "Rpm x64", "current": false, "url": "x64.rpm" },
])

const switchVersion = (next) => {
    versions.value = versions.value.map(version => ({
        ...version,
        current: version.version === next
    }))

    updateVersion()
    openVersionList.value = !openVersionList.value
}

const currentVersion = computed(() => versions.value.find(version => version.current));

const restVersions = computed(() => versions.value.filter(version => !version.current));

updateVersion()

const handleListClick = () => {
    openVersionList.value = !openVersionList.value
}
</script>

<template>
    <div>
        <section class="download-section">
            <a target="_blank" :href="last">
                <article id="download-block">
                    <h4 id="download-text">
                        Download ( {{ currentVersion.version }} )
                    </h4>
                </article>
            </a>
            <button id="change-version-button" @click="handleListClick">
                <p v-if="!openVersionList">
                    ▼
                </p>
                <p v-else>
                    ▲
                </p>
            </button>
        </section>
        <section class="version-list" v-if="openVersionList" v-for="version in restVersions">
            <article id="download-block" @click="() => switchVersion(version.version)">
                <h4 id="download-text">
                    Download ( {{ version.version }} )
                </h4>
            </article>
        </section>
    </div>
</template>

<style>
#download-block {
    background-color: rgb(95, 68, 27);
    border-radius: 5px;
    cursor: pointer;
    width: fit-content;
    padding: 5px 10px;
    max-width: 252px;
    width: 21.6vw;
}

.version-list {
    position: relative;
    margin: 2px 0;
}

.download-section {
    display: flex;
    flex-flow: row nowrap;
    position: relative;
    margin-top: 1.2vw;
}

#download-block:hover {
    background-color: rgb(110, 79, 31);
}

#change-version-button {
    background-color: rgb(95, 68, 27);
}

a {
    color: rgb(233, 233, 233);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

}

a:hover {
    color: rgb(233, 233, 233);
}
</style>
