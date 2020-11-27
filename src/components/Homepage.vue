<template>
    <v-main class="Home">
        <div>
            <b-navbar toggleable="lg" type="dark" class="napbar">
                <b-navbar-brand href="#">Couponic</b-navbar-brand>
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto mr-7 font-weight-medium">
                    <b-nav-item @click="dialog = true">Tentang Kami</b-nav-item>
                    <b-nav-item @click="dialogRegister = true">Daftar</b-nav-item>
                    <b-nav-item @click="dialog = true">Masuk</b-nav-item>
                </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </div>

        <div>
            <b-carousel
            id="carousel-1"
            v-model="slide"
            :interval="4000"
            controls
            indicators
            background="#ababab"
            img-width="1024"
            img-height="480"
            style="text-shadow: 1px 1px 2px #333;"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
            >
            
            <!-- Slides with custom text -->
            <b-carousel-slide img-src="https://indogamers.id/courier/2020/06/carmilla-mobile-legends-bang-bang-4k-bv-2560x1440-1.jpg">
                <h1>Hello world!</h1>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>                
            </b-carousel-slide>

            <!-- Slides with custom text -->
            <b-carousel-slide img-src="https://www.popsci.com/resizer/0eQsCPRWhjB3PNPxqrtRnPNGxwA=/1200x628/smart/arc-anglerfish-arc2-prod-bonnier.s3.amazonaws.com/public/AUSBJ7SDRWXMD7VXVNJASUT6ME.jpg">
                <h1>Hello world!</h1>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>                
            </b-carousel-slide>

            </b-carousel>
        </div>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Masuk di Couponic</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field
                        v-model="loginForm.email"
                        :rules="emailRules"
                        label="E-mail"
                        required
                        ></v-text-field>

                        <v-text-field
                        v-model="loginForm.password"
                        label="Kata Sandi"
                        required
                        ></v-text-field>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="lime lighten-1" text @click="close">
                        Batal
                    </v-btn>
                    <v-btn color="lime lighten-1" text @click="login">
                        Masuk
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogRegister" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Daftar di Couponic</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field
                        v-model="regisForm.email"
                        :rules="emailRules"
                        label="E-mail"
                        required
                        ></v-text-field>

                        <v-text-field
                        v-model="regisForm.password"
                        label="Kata Sandi"
                        required
                        ></v-text-field>

                        <v-text-field
                        v-model="regisForm.username"
                        label="Username"
                        required
                        ></v-text-field>

                        <v-text-field
                        v-model="regisForm.tanggalLahir"
                        label="Tanggal Lahir"
                        required
                        ></v-text-field>

                        <v-radio-group
                        v-model="row"
                        row
                        >
                        <v-radio
                            label="Pria"
                            value="pria"
                        ></v-radio>
                        <v-radio
                            label="Wanita"
                            value="wanita"
                        ></v-radio>
                        </v-radio-group>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="lime lighten-1" text @click="close">
                        Batal
                    </v-btn>
                    <v-btn color="lime lighten-1" text @click="daftar">
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
    export default {
        name: "Home",
        data() {
            return {
                inputType: 'Tambah',
                load: false,
                snackbar: false,
                error_message: '',
                color: '',
                search: null,
                dialog: false,
                dialogRegister: false,
                dialogConfirm: false,
                pesanTopUp: new FormData,                             
                form: {
                    game: null,
                    userID: null,
                    nominal: null,
                    harga: null,
                    pembayaran: null,                    
                },
                loginForm: {
                    email:"",
                    password:""
                },
                regisForm: {
                    email:"",
                    password:""
                },
                deleteId: '',
                editId: '',

                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ],
            };
        },

        methods: {
            setForm() {
                if (this.inputType === 'Tambah') {
                    this.save()
                } else {
                    this.update()
                }
            },
            login() {
                
                if (this.$refs.form.validate()) { //cek apakah data yang akan dikirim sudah valid

                    this.load=true
                    this.$http.post(this.$api+ '/homepage', {
                        email: this.loginForm.email,
                        password: this.loginform.password
                        }).then(response =>{
                            localStorage.setItem('id',response.data.user.id);
                            localStorage.setItem('token',response.data.access_token);
                            this.error_message=response.data.message;

                            this.color="green"
                            this.snackbar=true;
                            this.load = false;
                            this.resetForm();
                            this.$router.push({
                                name: 'HomepageUser'
                            })
                        }).catch(error => {
                        this.error_message=error.response.data.message; 
                        this.color="red" 
                        this.snackbar=true;
                        localStorage.removeItem('token')
                        this.load = false
                        })
                }
            },
            close() {
                this.dialog = false;
                this.dialogRegister = false;
                this.dialogConfirm = false;
                this.inputType = 'Tambah';
            },
            cancel() {
                this.resetForm();
                this.readData();
                this.dialog = false;
                this.inputType = 'Tambah';
            },
            resetForm() {
                this.form = {
                    game: null,
                    userID: null,
                    nominal: null,
                    harga: null,
                    pembayaran: null,  
                };
            },

            
            onSlideStart(slide) {
                this.sliding = true
            },
            onSlideEnd(slide) {
                this.sliding = false
            }              

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