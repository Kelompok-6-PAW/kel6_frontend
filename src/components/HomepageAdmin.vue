<template>
    <v-main class="Home">
        <div>
            <b-navbar  variant="dark" toggleable="lg" type="dark" class="napbar">
                <b-navbar-brand href="#">Couponic</b-navbar-brand>
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto mr-7 font-weight-medium">
                    <b-nav-item href="/tambahnominal">Daftar Nominal Top up</b-nav-item>
                    <b-nav-item href="/daftartransaksitopup">Daftar Transaksi Topup</b-nav-item>
                    <b-nav-item href="/daftartransaksiberlangganan">Daftar Transaksi Berlangganan</b-nav-item>
                    <b-nav-item href="/profiluser">
                        <v-icon>mdi-account-box</v-icon> 
                        <!-- <b-nav-text> {{ user.nama }} -->
        
                    </b-nav-item>
                    <b-nav-item @click="logout"><v-icon  >mdi-logout</v-icon></b-nav-item>
                </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </div>
        <div class=" lighten-4 fullheight pa-5">
            <router-view></router-view>
        </div>
    </v-main>
</template>        
 <script>
import DaftarTransaksiBerlanggananVue from './DaftarTransaksiBerlangganan.vue';
import DaftarTransaksiTopupVue from './DaftarTransaksiTopup.vue';
import TambahNominalVue from './TambahNominal.vue';
export default {
    name: "Dashboard",
    data() {
        return {
            drawer:true,
            routes : [
                { path: '/tambahnominal', component: TambahNominalVue },
                { path: '/daftartransaksitopup', component: DaftarTransaksiTopupVue },
                { path: '/daftartransaksiberlangganan', component: DaftarTransaksiBerlanggananVue }
            
            ],
        }; 
    },
    // methods:{
    //     logout(){
    //         localStorage.setItem("token",'');
    //         localStorage.setItem("id",'');
    //         console.log(localStorage.getItem('token'))
    //         this.$router.push({
    //             name: 'Login'
    //         })
    //     },
    //     profile(){
    //         this.$router.push({
    //             name: 'Profile'
    //         })
    //     }
    // }

        
        };
</script> 
<style scoped>
    .fullheight {
    min-height: 100vh !important; }

    .router{
        text-decoration: none;
        color:black;
    }
    .napbar{
         color:black;

    }

</style>