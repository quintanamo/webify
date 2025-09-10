import { createApp } from 'vue';
import App from './App.vue';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { FaFileUpload } from 'oh-vue-icons/icons';

const app = createApp(App);
addIcons(FaFileUpload);
app.component('v-icon', OhVueIcon);
app.mount('#app');
