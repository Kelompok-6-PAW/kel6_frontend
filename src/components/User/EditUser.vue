<template>
    <v-main class="list">
        <h3 class="text-h3 font-weight-bold mb-5 judul">Profil.</h3>

        <div class="fullheight pa-3 px-10">        
            <v-card class="mx-auto" max-width="544">    
             
                    <img  class="mx-auto rounded-card" v-if="form.img_user==null" :src="'https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png'" width:200px height:200px>
                    <img class="mx-auto rounded-card" v-else :src="form.img_user" style="width: 200px; height: 200px">                                
                          
               
                <v-card-text>
                    <v-container>                                                
                                          
                        <v-file-input
                        color="primary"
                            v-model="img"
                            outlined 
                            prepend-icon="mdi-camera"
                            accept="image/*" 
                            label="Ganti Foto Profil"
                            v-on:change="imageChanged(img)">                        
                        </v-file-input>                        

                        <v-text-field
                            v-model="form.email"
                            label="Email"
                            outlined
                            disabled
                            readonly                            
                            prepend-icon="mdi-email">
                        </v-text-field>
                    
                        <v-text-field
                            v-model="form.pass"
                            label="Kata Sandi"
                            outlined
                            required
                            prepend-icon="mdi-lock">
                        </v-text-field>

                        <v-text-field
                            v-model="form.username"
                            label="Username"
                            outlined
                            required
                            prepend-icon="mdi-account-circle">
                        </v-text-field>

                         <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="form.tglLahir"
                                    label="Date"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    outlined
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                           
                            v-model="form.tglLahir"
                            :max="new Date().toISOString().substr(0, 10)"
                            min="1950-01-01"
                            @change="setDate"
                            ></v-date-picker>
                        </v-menu>
                        
                        <v-row align="start ml-0" >
                            <v-icon>mdi-gender-male-female</v-icon>
                            <div class="mx-3">
                            Jenis Kelamin

                            </div>
                        </v-row>
                        <v-radio-group
                        class="ml-6 my-1 small-radio"
                            v-model="form.jk"                          
                            row
                        >
                            <v-radio                             
                             
                                label="Pria"
                                value="pria"
                            >
                            </v-radio>
                            <v-radio                           
                                label="Wanita"
                                value="wanita"
                            ></v-radio>
                        </v-radio-group>

                        

                    </v-container>
                </v-card-text>

                <v-card-actions class="justify-center">                   
                    <v-btn color="primary" @click="update">
                        Simpan 
                    </v-btn>
                </v-card-actions>
            </v-card>
        </div>
        
        <v-snackbar v-model="snackbar" :color="color" timeout="5000" bottom>
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
                img: null,                              
                form: {                    
                    email: null,
                    pass: null,
                    username: null,                    
                    tglLahir: null,
                    jk: null,
                    img_user: null,                    
                },
                usernameLama: null,                
            };
        },

        methods: {
            
            setDate(date){
                this.$refs.menu.save(date)
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
                    this.usernameLama = this.userNow.username;
                    this.form.username = this.userNow.username;                      
                    this.form.email = this.userNow.email;
                    this.form.tglLahir = this.userNow.tglLahir;  
                    this.form.jk = this.userNow.jenisKelamin;
                    this.form.img_user = this.userNow.img_user;
                })
            },                        
            update() {
                let newData = {
                    usernameLama: this.usernameLama,
                    username: this.form.username,                    
                    jenisKelamin: this.form.jk,
                    tglLahir: this.form.tglLahir,
                    password: this.form.pass,                    
                    img_user: this.form.img_user,                                        
                }
                console.log(this.form)
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
                    location.reload();                     
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
                this.img = null;
                this.usernameLama = null;                
            },
            imageChanged(e) {                
                var fileReader = new FileReader()
                fileReader.readAsDataURL(e)
                fileReader.onload = (e) => {
                    this.form.img_user = e.target.result
                }                
                console.log(this.form)                
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
    .rounded-card {
        border-radius: 50% !important; 
        min-height: 300px;
        min-width: 300px; 
        padding: 20px;
    }

    
    .small-radio label {
    font-size: 14px;
    padding-left: 0px;
    margin-left: -4px;
    margin-top: 6px;
    }
    
    

</style>