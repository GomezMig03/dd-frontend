<script setup>
import Header from './components/Header.vue'
import Download from './components/Download.vue';
import Warning from './components/Warning.vue';
</script>

<template>
  <Warning />
  <main id="main">
    <Header />
    <Download />
  </main>
</template>

<style>
#main{
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}
</style>
