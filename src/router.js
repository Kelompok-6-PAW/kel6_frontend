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
        name: "homepage",
        meta: {title: 'Couponic'},        
        component: importComponent('HomepageUser'),
        children: [
            //PESANTOPUP
            // {
            //     path: "/pesantopup",
            //     name: "pesantopup",
            //     meta: {title: 'Pesan Top Up'},
            //     component: importComponent('PesanTopUp'),
            // },
            //BERLANGGANAN
            // {
            //     path: "/berlanggananakun",
            //     name: "berlanggananakun",
            //     meta: {title: 'Berlangganan Akun'},
            //     component: importComponent('BerlanggananAkun'),
            // },
        ]
    },
    //ADMIN
    {
        path: "/admin",
        name: "homepage",
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

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
});
export default router;