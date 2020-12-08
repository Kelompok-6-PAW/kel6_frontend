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
            {
                path: "/awaluser",
                name: "awaluser",
                meta: {title: 'Home User'},
                component: importComponent('User/AwalUser'),
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
                name: "daftartransaksitopup",
                meta: {title: 'Daftar Transaksi Topup'},
                component: importComponent('Admin/DaftarTransaksiTopup'),
            },
            {
                path: "/daftartransaksiberlangganan",
                name: "daftartransaksiberlangganan",
                meta: {title: 'Daftar Transaksi Berlangganan'},
                component: importComponent('Admin/DaftarTransaksiBerlangganan'),
            },   
            {
                path: "/profiladmin",
                name: "profiladmin",
                meta: {title: 'Profil Admin'},
                component: importComponent('Admin/EditAdmin'),
            },
        ]
    },
    
    // HOMEPAGELOGINREGISTER
    {
        path: "",
        redirect: '/homepage',
        name: "homepagelayout",
        meta: {title: 'Couponic'},
        component: importComponent('HomepageLayout'),
        children:[
            {
                path: "/tentangkamiawal",
                name: "tentangkamiawal",
                meta: {title: 'Tentang Kami'},
                component: importComponent('User/TentangKami'),
            },
            {
                path: "/homepage",
                name: "homepage",
                meta: {title: 'Homepage'},
                component: importComponent('Homepage'),
            },
        ]
    },

    
    ],
});

router.beforeEach((to,from,next)=>{
    if(to.name == 'tentangkamiawal'){
        next()
    }else if (to.name != 'homepage' && localStorage.getItem('token')=='') {
        next({ path:'/homepage' })
        document.title = to.meta.title
    }
        
    else {
        next()
        document.title = to.meta.title
    }
        
});
export default router;