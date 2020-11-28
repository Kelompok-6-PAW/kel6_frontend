<template>
    <v-main class="list">
        <h3 class="text-h3 font-weight-bold mb-5 judul">Profil</h3>

        <div class="fullheight pa-3 px-16">        
            <v-card>                
                <v-card-text>
                    <v-container>                        
                        <v-text-field
                            v-model="form.email"
                            label="Email"
                            outlined
                            readonly
                            required>
                        </v-text-field>
                    
                        <v-text-field
                            v-model="form.pass"
                            label="Kata Sandi"
                            outlined
                            required>
                        </v-text-field>

                        <v-text-field
                            v-model="form.username"
                            label="Username"
                            outlined
                            required>
                        </v-text-field>

                        <v-text-field
                            v-model="form.tglLahir"
                            label="Tanggal Lahir"
                            outlined
                            required>
                        </v-text-field>

                        <v-text-field
                            v-model="form.jk"
                            label="Jenis Kelamin"
                            outlined
                            required>
                        </v-text-field>

                    </v-container>
                </v-card-text>

                <v-card-actions class="justify-center">                   
                    <v-btn color="primary" @click="update">
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
                userNow: [],                              
                form: {                    
                    email: null,
                    pass: null,
                    username: null,
                    tglLahir: null,
                    jk: null,
                    img_user: null,                    
                },                
            };
        },

        methods: {
            readData() {
                var url = this.$api + '/detailuser'
                this.$http.get(url, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    console.log(response)
                    this.userNow = response.data.user
                    this.form.username = this.userNow.username;  
                    this.form.email = this.userNow.email;
                    this.form.tglLahir = this.userNow.tglLahir;  
                    this.form.jk = this.userNow.jenisKelamin;
                    this.form.img_user = this.userNow.img_user;
                })
            },                        
            update() {
                let newData = {
                    username: this.form.username,                    
                    jenisKelamin: this.form.jk,
                    tglLahir: this.form.tglLahir,
                    password: this.form.pass,                    
                    img_user: this.form.img_user,                    
                }
                var url = this.$api + '/updateuser/'
                this.load = true
                this.$http.put(url, newData, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.error_message = response.data.message;
                    this.color="green"
                    this.snackbar=true;
                    this.load=false;
                    this.resetForm();
                    this.readData();                    
                }).catch(error => {
                    this.error_message=error.response.data.message;
                    this.color="red"
                    this.snackbar=true;
                    this.load=false;
                })
            },
            resetForm() {
                this.form = {
                    email: null,
                    pass: null,
                    username: null,
                    tglLahir: null,
                    jk: null,
                    img_user: null,   
                };                
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
</style>