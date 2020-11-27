<template>
    <v-main class="Home">
        <div>
            <b-navbar toggleable="lg" type="dark" class="napbar">
                <b-navbar-brand href="#">Couponic</b-navbar-brand>
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto mr-7 font-weight-medium">
                    <b-nav-item href="/pesantopup">Pesan Top up</b-nav-item>
                    <b-nav-item href="/berlanggananakun">Pesan Berlangganan Akun </b-nav-item>
                    <b-nav-item href="/tentangkami">Tentang Kami</b-nav-item>

                    <!-- Nanti dibikin profile pake logo sama ada username penggunanya kalo bisa wkwkw-->
                    <b-nav-item href="/profiluser">
                        <v-icon color="#E2EA8D">mdi-account-circle</v-icon> 
                        <!-- <b-nav-text> {{ user.nama }} -->
        
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
import BerlanggananAkunVue from './BerlanggananAkun.vue';
import EditUserVue from './EditUser.vue';
import PesanTopUpVue from './PesanTopUp.vue';
import TentangKamiVue from './TentangKami.vue';

export default {
    name: "Dashboard",
    data() {
        return {
            drawer:true,
            routes : [
                { path: '/pesantopup', component: PesanTopUpVue },
                { path: '/berlanggananakun', component: BerlanggananAkunVue },
                { path: '/profiluser', component: EditUserVue },
                { path: '/tentangkami', component: TentangKamiVue }

            
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
    //     readData(){
    //     var url = this.$api + '/profile/'+localStorage.getItem('id')
    //     this.$http.get(url,{
    //         headers:{
    //             'Authorization' : 'Bearer ' + localStorage.getItem('token')
    //         }
    //     }).then(response=>{
    //         this.form = response.data.data
    //     })
    //},
    }

        
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
         background-color:black;

    }

</style>