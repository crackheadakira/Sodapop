import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlay, faShuffle, faForward, faBackward, faRepeat, faVolumeOff, faVolumeLow } from '@fortawesome/free-solid-svg-icons'
library.add(faPlay, faShuffle, faForward, faBackward, faRepeat, faVolumeOff, faVolumeLow)

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
