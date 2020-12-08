<template>
    <v-main class="List">
        <div>
            <b-navbar toggleable="lg" type="dark" class="napbar">
                <b-navbar-brand @click="hreftambahnominal"><img src="@/assets/couponic.png" width="100" alt=""></b-navbar-brand>
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto mr-7 font-weight-medium">
                    <b-nav-item @click="hreftambahnominal" >Daftar Nominal Top up</b-nav-item>
                    <b-nav-item @click="hrefdaftartransaksitopup" >Daftar Transaksi Topup</b-nav-item>
                    <b-nav-item @click="hrefdaftartransaksiberlangganan">Daftar Transaksi Berlangganan</b-nav-item>
                    
                    <b-nav-item @click="hrefprofiladmin">
                        <v-icon color="#E2EA8D">mdi-account-circle</v-icon>
                    </b-nav-item>
                    <b-nav-item @click="logout"><v-icon color="#E2EA8D" >mdi-logout</v-icon></b-nav-item>
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
import EditAdminVue from './EditAdmin.vue';
import TambahNominalVue from './TambahNominal.vue';
export default {
    name: "Dashboard",
    data() {
        return {
            drawer:true,
            userNow: [], 
            routes : [
                { path: '/tambahnominal', component: TambahNominalVue },
                { path: '/daftartransaksitopup', component: DaftarTransaksiTopupVue },
                { path: '/daftartransaksiberlangganan', component: DaftarTransaksiBerlanggananVue },
                { path: '/profiladmin', component: EditAdminVue },
                

            
            ],
        }; 
    },
    methods:{
        logout(){
            localStorage.setItem("token",'');
            localStorage.setItem("id",'');
            console.log(localStorage.getItem('token'))
            this.$router.push({
                name: 'homepage'
            })
        },
        readData() {
                var url = this.$api + '/detailuser'
                this.$http.get(url, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    console.log(response)
                    this.userNow = response.data.user                    
                })
        },   
        hreftambahnominal(){
            this.$router.push({
            name: 'tambahnominal'
            })             
        },

        hrefdaftartransaksitopup(){
            this.$router.push({
            name: 'daftartransaksitopup'
            })             
        },

        hrefdaftartransaksiberlangganan(){
            this.$router.push({
            name: 'daftartransaksiberlangganan'
            })             
        },

        hrefprofiladmin(){
            this.$router.push({
            name: 'profiladmin'
            })             
        }, 
    },
    mounted() {
            this.readData();
    },              
};
</script> 
<style>  

    .router{
        text-decoration: none;
        color:black;
    }
    .napbar{
         background-color: black;
    }

</style>