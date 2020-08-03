import Vue from 'vue'
import Router from 'vue-router'


//import Home from '@/vieuws/Home'
// import Signify from '@/vieuws/Signify'
// import Broadcast from '@/vieuws/Broadcast'
// import Livestream from '@/vieuws/Livestream'
// import Robeco from '@/vieuws/Robeco'
// import Carcontrol from '@/vieuws/Carcontrol'
// import Peterplantenbak from '@/vieuws/Peterplantenbak'
// import Caroverview from '@/vieuws/Caroverview'
 //import Lottietest from '@/vieuws/Lottietest'



Vue.use(Router)

export default new Router({
    routes:[
        {
            path:'/',
            name: '/Home',
            component:() => import(/* webpackChunkName: "home" */ '@/vieuws/Home'),
        },
        {
            path:'/signify',
            name: '/Sifnify',
            component:() => import(/* webpackChunkName: "signify" */ '@/vieuws/Signify'),
        },
        {
            path:'/broadcast/:id',
            name: '/Broadcast',
            component:() => import(/* webpackChunkName: "broadcast" */ '@/vieuws/Broadcast'),
            props: true,
        },
        {
           path:'/robeco',
           name: '/Robeco',
           component:() => import(/* webpackChunkName: "robeco" */ '@/vieuws/Robeco'),
        },
        {
            path:'/livestream',
            name: '/Livestream',
            component:() => import(/* webpackChunkName: "livestream" */ '@/vieuws/Broadcast'),
        },
        {
            path:'/carcontrol',
            name: '/Carcontrol',
            component:() => import(/* webpackChunkName: "carcontrol" */ '@/vieuws/Carcontrol'),
        },
        {
            path:'/peterplantenbak',
            name: '/Peterplantenbak',
            component:() => import(/* webpackChunkName: "peterplantenbak'" */ '@/vieuws/Peterplantenbak'),
        },
        {
            path:'/caroverview',
            name: '/Caroverview',
            component:() => import(/* webpackChunkName: "caroverview" */ '@/vieuws/Caroverview'),
        },
        {
            path:'/raum',
            name: '/raum',
            component:() => import(/* webpackChunkName: "Raum" */ '@/vieuws/Raum'),
        },
        {
            path:'/lottietest',
            name: '/lottietest',
            component:() => import(/* webpackChunkName: "lottieTest" */ '@/vieuws/Lottietest'),
        },
        {
            path:'/mouseRaum',
            name: '/mouseRaum',
            component:() => import(/* webpackChunkName: "lottieTest" */ '@/components/mouseRaum'),
        },
       
    
        
        

    ]
})