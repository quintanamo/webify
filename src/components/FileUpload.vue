<style lang="scss">
button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.icon {
  width: 16rem;
  height: 16rem;
}

ul {
  list-style: none;
  display: flex;
  width: 100%;
  gap: 1.8rem;
}

li {
  height: 4.8rem;

  & img {
    height: 100%;
  }
}
</style>

<template>
  <button @click="openFileDialog()">
    <v-icon class="icon" name="fa-file-upload" />
    <span>Browse Files to Add</span>
  </button>
  <ul v-if="files.length > 0">
    <li v-bind:key="{ index }" v-for="(file, index) in files">
      <img :src="'webify://' + encodeURI(file)" :alt="file.split('/').at(-1)" />
    </li>
  </ul>
</template>

<script setup>
import { ref } from 'vue';

const files = ref([]);

async function openFileDialog() {
  try {
    const selectedFiles = await window.electronAPI.openFiles();
    files.value = selectedFiles;
    console.log(files.value);
  } catch (error) {
    console.error('Failed to open file dialog:', error);
  }
}
</script>
