<style lang="scss">
header {
  background: #072530;
  background: linear-gradient(130deg, rgba(7, 37, 48, 1) 0%, rgba(71, 143, 99, 1) 100%);
  color: #ffffff;
  padding: 1rem 2rem;

  h1 {
    font-size: 3.2rem;
    font-style: italic;
  }

  p {
    font-size: 1.6rem;
  }
}

main {
  flex: 1;
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

footer {
  padding: 1rem 2rem;
  background: #072530;
  background: linear-gradient(130deg, rgba(7, 37, 48, 1) 0%, rgba(71, 143, 99, 1) 100%);
  color: #ffffff;
  font-size: 1.2rem;
}
</style>

<script setup>
import FileUpload from './components/FileUpload.vue';
</script>

<template>
  <header>
    <h1>Webify</h1>
    <p>Compress and Watermark Images</p>
  </header>
  <main><FileUpload /></main>
  <footer>Webify by Quintin Herb</footer>
</template>
