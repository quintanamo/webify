import { defineStore } from 'pinia';

export const useImageStore = defineStore('imageStore', {
  state: () => ({
    images: [],
  }),
  actions: {
    addImages(payload) {
      this.images = this.images.concat(payload);
    },
    removeImages() {
      this.images = [];
    },
  },
});
