import AlbumPage from './views/AlbumPage.vue'
import HomeMenu from './views/HomeMenu.vue'
import SettingsMenu from './views/SettingsMenu.vue'
import allItems from './views/AllItems.vue'

export const routes = [
    {
        path: '/album/:albumName',
        name: 'AlbumPage',
        component: AlbumPage,
    },
    {
        path: '/',
        name: 'HomeMenu',
        component: HomeMenu,
    },
    {
        path: '/settings',
        name: 'SettingsMenu',
        component: SettingsMenu,
    },
    {
        path: '/all/:type',
        name: 'allItems',
        component: allItems,
    },
    {
        path: '/artist/:artistName',
        name: 'ArtistPage',
        component: HomeMenu,
    }
]