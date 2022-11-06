import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlay, faPause, faShuffle, faForward, faBackward, faRepeat, faVolumeOff, faVolumeLow } from '@fortawesome/free-solid-svg-icons'
library.add(faPlay, faPause, faShuffle, faForward, faBackward, faRepeat, faVolumeOff, faVolumeLow)

const pinia = createPinia();

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(pinia)
    .mount('#app')
