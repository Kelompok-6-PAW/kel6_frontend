import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

function importComponent(path) {
    return () =>
        import (`./components/${path}.vue`)
}
Vue.use(VueRouter);
const router = new VueRouter({
    mode: "history",
    routes: [{
        path: "/user",
        name: "homepageUser",
        meta: {title: 'Couponic'},        
        component: importComponent('User/HomepageUser'),
        children: [
            {
                path: "/pesantopup",
                name: "pesantopup",
                meta: {title: 'Pesan Top Up'},
                component: importComponent('User/PesanTopUp'),
            },
            {
                path: "/berlanggananakun",
                name: "berlanggananakun",
                meta: {title: 'Berlangganan Akun'},
                component: importComponent('User/BerlanggananAkun'),
            },
            {
                path: "/profiluser",
                name: "profiluser",
                meta: {title: 'Profil'},
                component: importComponent('User/EditUser'),
            },
            {
                path: "/tentangkami",
                name: "tentangkami",
                meta: {title: 'Tentang Kami'},
                component: importComponent('User/TentangKami'),
            },
        ]
    },
    //ADMIN
    {
        path: "/admin",
        name: "homepageAdmin",
        meta: {title: 'Couponic'},        
        component: importComponent('Admin/HomepageAdmin'),
        children: [
            //TAMBAHNOMINAL
            {
                path: "/tambahnominal",
                name: "tambahnominal",
                meta: {title: 'Tambah Nominal Top Up'},
                component: importComponent('Admin/TambahNominal'),
            },        
            {
                path: "/daftartransaksitopup",
                name: "daftarTransaksiTopup",
                meta: {title: 'Tambah Nominal Top Up'},
                component: importComponent('Admin/DaftarTransaksiTopup'),
            },
            {
                path: "/daftartransaksiberlangganan",
                name: "daftartransaksi",
                meta: {title: 'Tambah Nominal Top Up'},
                component: importComponent('Admin/DaftarTransaksiBerlangganan'),
            },   
        ]
    },
    
    // HOMEPAGELOGINREGISTER
    {
        path: "/",
        name: "homepage",
        meta: {title: 'Couponic'},
        component: importComponent('Homepage'),
    },

    {
        path: '*',
        redirect: '/'
    },
    ],
});

router.beforeEach((to,from,next)=>{
    if (to.name != 'homepage' && localStorage.getItem('token')=='') {
        next({ path:'/homepage' })
        document.title = to.meta.title
    }
        
    else {
        next()
        document.title = to.meta.title
    }
        
});
export default router;