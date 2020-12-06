<template>
    <v-main class="Home">
        <div>
            <b-navbar toggleable="lg" type="dark" class="napbar">
                <b-navbar-brand href="/homepage"><img src="@/assets/couponic.png" width="100" alt=""></b-navbar-brand>
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto mr-7 font-weight-medium">
                    <b-nav-item href="/tentangkamiawal">Tentang Kami</b-nav-item>
                    <b-nav-item @click="dialogRegister = true">Daftar</b-nav-item>
                    <b-nav-item @click="dialog = true">Masuk</b-nav-item>
                </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </div>

        
        <div class=" lighten-4 fullheight">
                <router-view></router-view>
        </div>

        <!-- DIALOG LOGIN -->
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline font-weight-bold">Masuk di Couponic</span>                    
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-form v-model="valid" ref="form">
                            <v-text-field
                                v-model="loginForm.email"
                                :rules="emailRules"
                                label="E-mail"
                                prepend-icon="mdi-email"
                                outlined
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="loginForm.password"
                                :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="rules.required"
                                :type="show3 ? 'text' : 'password'"
                                name="input-10-2"
                                label="Kata Sandi"
                                value="wqfasds"
                                class="input-group--focused"
                                prepend-icon="mdi-lock"
                                outlined
                                @click:append="show3 = !show3"
                            ></v-text-field>
                        </v-form>
                    </v-container>
                </v-card-text>

                <v-card-actions class="justify-center">                   
                    <v-btn color="lime lighten-1" text @click="cancelLogin">
                        Batal
                    </v-btn>
                    <v-btn color="blue lighten-1" text @click="login">
                        Masuk
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Dialog Registrasi -->
        <v-dialog v-model="dialogRegister" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline font-weight-bold">Daftar di Couponic</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field
                        v-model="regisForm.email"
                        :rules="emailRules"
                        label="E-mail"
                        prepend-icon="mdi-email"
                        outlined
                        required
                        ></v-text-field>

                        <v-text-field
                        v-model="regisForm.password"
                        :rules="rules"
                        label="Kata Sandi"
                        prepend-icon="mdi-lock"
                        outlined
                        required
                        type="password"
                        ></v-text-field>

                        <v-text-field
                        v-model="regisForm.username"
                        :rules="rules"
                        label="Username"
                        prepend-icon="mdi-account-circle"
                        outlined
                        required
                        ></v-text-field>

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
                                v-model="regisForm.tanggalLahir"
                                label="Date"
                                prepend-icon="mdi-calendar-text"
                                readonly
                                outlined
                                v-bind="attrs"
                                v-on="on"
                                :rules="rules"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            ref="picker"
                            v-model="regisForm.tanggalLahir"
                            :max="new Date().toISOString().substr(0, 10)"
                            min="1950-01-01"
                            @change="setDate"
                            ></v-date-picker>
                        </v-menu>

                        <v-row class="ml-0">
                            <v-icon >mdi-gender-male-female</v-icon>
                            <v-divider
                                class="mx-1"
                                
                                vertical
                            ></v-divider>
                            Jenis Kelamin
                        </v-row>
                        <v-radio-group
                            v-model="regisForm.jenisKelamin"
                            :rules="rules"
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
                    <v-btn color="lime lighten-1" text @click="cancelRegis">
                        Batal
                    </v-btn>
                   
                    <v-btn color="blue lighten-1" text @click="daftar">
                        Daftar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>
            {{error_message}}
        </v-snackbar>

    </v-main>
</template>


<script>
import TentangKamiVue from './User/TentangKami.vue';
//import image from "./assets/couponic.png"
    export default {
        name: "Home",
        data() {
            return {
                routes : [
                { path: '/tentangkamiawal', component: TentangKamiVue }],
                inputType: 'Tambah',
                onSlideStart: true,
                onSlideEnd: false,
                menu: false,
                load: false,
                show3: false,
                snackbar: false,
                error_message: '',
                color: '',                
                dialog: false,
                dialogRegister: false,                
                loginForm: {
                    email:this.email,
                    password:this.password,
                },
                user: new FormData,
                regisForm: {
                    email: this.email,
                    password: this.password,
                    username: this.username,
                    tanggalLahir: this.tanggalLahir,
                    jenisKelamin: this.jenisKelamin,
                },
                deleteId: '',
                editId: '',

                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ],
                rules: [
                    v => !!v || 'required'
                ],
            };
        },

        watch: {
            menu(val){
                val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
            },
        },

        methods: {
            setDate(date){
                this.$refs.menu.save(date)
            },           
            login() {        
                if (this.$refs.form.validate()) { //cek apakah data yang akan dikirim sudah valid
                    this.load=true
                    this.$http.post(this.$api+ '/login', {
                        email: this.loginForm.email,
                        password: this.loginForm.password,
                        }).then(response =>{
                            localStorage.setItem('id',response.data.user.id);
                            localStorage.setItem('token',response.data.access_token);
                            this.error_message=response.data.message;

                            this.color="green"
                            this.snackbar=true;
                            this.load = false;                            
                            if(this.loginForm.email == 'tubespawkel6@gmail.com'){
                                this.$router.push({
                                name: 'tambahnominal'
                                })
                            }else{
                                this.$router.push({
                                    name: 'awaluser'
                                })
                            }
                            this.resetForm();
                        }).catch(error => {
                        this.error_message=error.response.data.message; 
                        this.color="red" 
                        this.snackbar=true;
                        localStorage.removeItem('token')
                        this.load = false
                        })
                }
            },

            daftar() {
                this.user.append('email', this.regisForm.email);
                this.user.append('password', this.regisForm.password);
                this.user.append('username', this.regisForm.username);
                this.user.append('tglLahir', this.regisForm.tanggalLahir);
                this.user.append('jenisKelamin', this.regisForm.jenisKelamin);

                var url = this.$api + '/register'
                this.$http.post(url, this.user, {
                    email: this.regisForm.email,
                    password: this.regisForm.password,
                    username: this.regisForm.username,
                    tglLahir: this.regisForm.tanggalLahir,
                    jenisKelamin: this.regisForm.jenisKelamin,
                }).then(response => {
                    console.log(this.regisForm);
                    this.error_message=response.data.message;
                    this.color="green"
                    this.snackbar=true;
                    this.load=false;     
                    this.close();
                    this.resetFormRegis();
                    this.readData(); //ambil data
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = "red"
                    this.snackbar = true;
                    this.load = false;
                })
                
            },

            close() {
                this.dialogRegister = false;
            },
            cancelLogin() {
                this.dialog = false;
                this.readData();
                this.resetForm();
            },

            cancelRegis() {
                this.dialogRegister = false;
                this.resetFormRegis();
            },

            resetForm() {
                this.loginForm = {
                    email: null,
                    password: null,
                };
            },

            resetFormRegis() {
                this.regisForm = {
                    email: '',
                    password: '',
                    username: '',
                    tanggalLahir: '',
                    jenisKelamin: '',
                }
            },
            // onSlideStart(slide) {
            //     this.sliding = true
            // },
            // onSlideEnd(slide) {
            //     this.sliding = false
            // }              

        },
        computed: {
            formTitle() {
                return this.inputType
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