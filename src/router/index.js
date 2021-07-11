import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/Home.vue'
import Browse from '@/components/Browse.vue'
import Liked_songs from '@/components/Liked_songs.vue'
import Playlist from '@/components/Playlist.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/Home',
        name: 'Home',
        component: Home,
        props: true,
    },
    {
        path: '/Browse',
        name: 'Browse',
        component: Browse,
        props: true,
    },
    {
        path: '/Liked_songs',
        name: 'Liked_songs',
        component: Liked_songs,
        props: true,
    },
    {
        path: '/Home/playlist/:name',
        name: 'Playlist',
        component: Playlist,
        props: true,
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router