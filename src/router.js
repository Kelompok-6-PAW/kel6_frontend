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
        component: importComponent('HomepageUser'),
        children: [
            {
                path: "/pesantopup",
                name: "pesantopup",
                meta: {title: 'Pesan Top Up'},
                component: importComponent('PesanTopUp'),
            },
            {
                path: "/berlanggananakun",
                name: "berlanggananakun",
                meta: {title: 'Berlangganan Akun'},
                component: importComponent('BerlanggananAkun'),
            },
            {
                path: "/profiluser",
                name: "profiluser",
                meta: {title: 'Profil'},
                component: importComponent('EditUser'),
            },
            {
                path: "/tentangkami",
                name: "tentangkami",
                meta: {title: 'Tentang Kami'},
                component: importComponent('TentangKami'),
            },
        ]
    },
    //ADMIN
    {
        path: "/admin",
        name: "homepageAdmin",
        meta: {title: 'Couponic'},        
        component: importComponent('HomepageAdmin'),
        children: [
            //TAMBAHNOMINAL
            {
                path: "/tambahnominal",
                name: "tambahnominal",
                meta: {title: 'Tambah Nominal Top Up'},
                component: importComponent('TambahNominal'),
            },        
            {
                path: "/daftartransaksitopup",
                name: "daftarTransaksiTopup",
                meta: {title: 'Tambah Nominal Top Up'},
                component: importComponent('DaftarTransaksiTopup'),
            },
            {
                path: "/daftartransaksiberlangganan",
                name: "daftartransaksi",
                meta: {title: 'Tambah Nominal Top Up'},
                component: importComponent('DaftarTransaksiBerlangganan'),
            },   
        ]
    },
    
    // HOMEPAGELOGINREGISTER
    {
        path: "/",
        name: "homepage",
        meta: {title: 'Couponic'},
        component: importComponent('Homepage'),
        children: [
            //LOGIN
            {
                path: "/login",
                name: "login",
                meta: {title: 'Login'},
                component: importComponent('Login'),
            },
        ]
    },

    {
        path: '*',
        redirect: '/'
    },
    ],
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
});
export default router;