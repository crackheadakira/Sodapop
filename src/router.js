import AlbumPage from './views/AlbumPage.vue'
import HomeMenu from './views/HomeMenu.vue'

export const routes = [
    {
        path: '/album/:albumName',
        name: 'AlbumPage',
        component: AlbumPage
    },
    {
        path: '/',
        name: 'HomeMenu',
        component: HomeMenu
    }
]