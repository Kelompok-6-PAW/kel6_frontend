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
        path: "/login",        
        component: importComponent('DashboardLayout'),
        children: [
            //Dashboard
            {
                path: "/dashboard",
                name: "Dahboard",
                meta: {title: 'Dashboard'},
                component: importComponent('Dashboard'),
            },
            //Products
            {
                path: "/products",
                name: "Products",
                meta: {title: 'Products'},
                component: importComponent('DataMaster/Products'),
            },
        ]
    },
    //PESANTOPUP
    {
        path: "/",
        name: "pesantopup",
        meta: {title: 'Pesan Top Up'},
        component: importComponent('PesanTopUp'),
    },
    //TAMBAHNOMINAL
    {
        path: "/tambahnominal",
        name: "tambahnominal",
        meta: {title: 'Tambah Nominal Top Up'},
        component: importComponent('TambahNominal'),
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