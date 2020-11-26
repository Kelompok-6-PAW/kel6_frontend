<template>
    <v-main class="list">

        <div class="mb-8">
            <b-navbar toggleable="lg" type="dark" class="napbar">
                <b-navbar-brand href="#">Couponic</b-navbar-brand>
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto mr-7 font-weight-medium">
                    <b-nav-item >Top-Up Game</b-nav-item>
                    <b-nav-item >Berlangganan Akun</b-nav-item>
                    <b-nav-item >Tentang Kami</b-nav-item>
                    <b-nav-item ><v-icon color="grey" class="ikon">mdi-account</v-icon></b-nav-item>
                    <b-nav-item ><v-icon color="grey" class="ikon">mdi-logout</v-icon></b-nav-item>
                </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </div>

        <h3 class="text-h3 font-weight-bold mb-5 judul">Profil</h3>

        <div class="fullheight pa-3 px-16">        
            <v-card>                
                <v-card-text>
                    <v-container>                        
                        <v-text-field
                            v-model="form.email"
                            label="Email"
                            outlined
                            required>
                        </v-text-field>
                    
                        <v-text-field
                            v-model="form.email"
                            label="Kata Sandi"
                            outlined
                            required>
                        </v-text-field>

                        <v-text-field
                            v-model="form.harga"
                            label="Username"
                            outlined
                            required>
                        </v-text-field>

                        <v-text-field
                            v-model="form.harga"
                            label="Tanggal Lahir"
                            outlined
                            required>
                        </v-text-field>

                    </v-container>
                </v-card-text>

                <v-card-actions class="justify-center">                   
                    <v-btn color="primary" @click="setForm">
                        Simpan 
                    </v-btn>
                </v-card-actions>
            </v-card>
        </div>
        
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>
            {{error_message}}
        </v-snackbar>
    </v-main>
</template>


<script>
    export default {
        name: "List",
        data() {
            return {
                load: false,
                snackbar: false,
                error_message: '',
                color: '',
                berlangganan: new FormData,
                berlangganans: [],
                langgananOptions: [],                                
                form: {                    
                    email: null,
                    pass: null,
                    username: null,
                    tglLahir: null,
                    jk: null,                    
                },                
            };
        },

        methods: {
            readData() {
                var url = this.$api + '/berlangganan'
                this.$http.get(url, {
                    
                }).then(response => {
                    this.berlangganans = response.data.data
                })
            },                        
            update() {
                let newData = {
                    aplikasi: this.form.aplikasi,
                    email: this.form.email,
                    jenisLangganan: this.form.jenisLangganan,
                    harga: this.form.harga,
                    pembayaran: this.form.pembayaran,                    
                }
                var url = this.$api + '/berlangganan/' + this.editId;
                this.load = true
                this.$http.put(url, newData, {
                    // headers: {
                    //     'Authorization': 'Bearer ' + localStorage.getItem('token')
                    // }
                }).then(response => {
                    this.error_message = response.data.message;
                    this.color="green"
                    this.snackbar=true;
                    this.load=false;
                    this.close();
                    this.readData();
                    this.resetForm();
                    this.inputType = 'Tambah';
                }).catch(error => {
                    this.error_message=error.response.data.message;
                    this.color="red"
                    this.snackbar=true;
                    this.load=false;
                })
            },                                           
        },        
        mounted() {
            this.readData();
        },
    };
</script>

<style >
    .napbar {
        background-color: black;
    }
    .ikon :hover{
        color: yellow;
    }
</style>