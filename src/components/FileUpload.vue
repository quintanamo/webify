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

  &--small {
    width: 4rem;
    height: 4rem;
  }
}

ul {
  list-style: none;
  display: flex;
  width: 100%;
  gap: 1.8rem;
}

li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  height: 4.8rem;
  width: 4.8rem;

  & img {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
    box-shadow: 0.2rem 0.2rem 0.6rem rgba(0, 0, 0, 0.35);
  }
}
</style>

<template>
  <button v-if="!hasImages" @click="openFileDialog()">
    <v-icon class="icon" name="fa-file-upload" />
    <span>Browse Files to Add</span>
  </button>
  <ul v-if="hasImages">
    <li v-bind:key="{ index }" v-for="(file, index) in imageStore.images">
      <img :src="'webify://' + encodeURI(file)" :alt="file.split('/').at(-1)" />
    </li>
    <li>
      <button @click="openFileDialog()">
        <v-icon class="icon--small" name="fa-file-upload" />
      </button>
    </li>
  </ul>
</template>

<script setup>
import { computed } from 'vue';
import { useImageStore } from '../store/images';

const imageStore = useImageStore();
const hasImages = computed(() => imageStore.images.length > 0);

async function openFileDialog() {
  try {
    const selectedFiles = await window.electronAPI.openFiles();
    imageStore.addImages(selectedFiles);
  } catch (error) {
    console.error('Failed to open file dialog:', error);
  }
}
</script>
