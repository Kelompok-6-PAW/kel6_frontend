<template>
    <v-container>
        <v-main class="list">
            <div class="jumbotron">
                <div class="logo">
                    <img src="@/assets/slogan.png" width="500px" alt="">
                </div>
            </div>

            <div>
                <h1 class="font-weight-bold mb-5"> Tentang Kami </h1>
                <h5 style="text-align : justify" class="font-weight-bold mb-5"> Couponic merupakan situs yang menyediakan fasilitas top-up dalam komunitas game dan
                    penjualan akun premium di Indonesia. Kami mempunyai layanan yang menjamin 100% keamanan dan 
                    kemudahan bertransaksi karena aman dan praktis untuk digunakan. Kami akan selalu berusaha
                    memberikan fasilitas terbaik dan harga termurah untuk pelanggan. </h5>
            </div>
            
            <div>
                <b-card no-body class="mx-auto" style="max-width: 900px; max-height: 500px;" elevation="10">
                    <b-row no-gutters>
                    <b-col md="6">
                        <iframe class="mt-8" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d988.2770253111815!2d110.40768602913928!3d-7.778361370884056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a59ebffa226fb%3A0xc7b08c10552662b2!2sArtindo!5e0!3m2!1sid!2sid!4v1607318298571!5m2!1sid!2sid" width="400" height="350" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                    </b-col>
                    <b-col md="6">
                        <b-card-body class="hubungiKami font-weight-medium" title="Hubungi Kami">
                        <b-card-text class="text-left" >
                            <v-form
                                ref="form"
                                v-model="valid"
                                lazy-validation
                            >
                                <v-text-field
                                v-model="name"
                                :rules="nameRules"
                                label="Nama"
                                required
                                ></v-text-field>

                                <v-text-field
                                v-model="email"
                                :rules="emailRules"
                                label="E-mail"
                                required
                                ></v-text-field>

                                <v-textarea
                                name="input-7-1"
                                label="Pesan"
                                required
                                ></v-textarea>
                            </v-form>
                            <v-btn
                            color="primary"
                            class="mr-4"
                            @click="reset"
                            >
                            Kirim
                            </v-btn>
                        </b-card-text>
                        </b-card-body>
                    </b-col>
                    </b-row>
                </b-card>

            </div>
        </v-main>
    </v-container>
</template>


<script>
    export default {
        name: "List",
        data() {
            return {
                valid: true,
                name: '',
                nameRules: [
                    v => !!v || 'Name is required'
                ],
                email: '',
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ],
            }
                
        },
        methods: {
            reset () {
                this.$refs.form.reset()
            },
        }

    }
</script>

<style >
    .jumbotron {
        background-image: url("https://png.pngtree.com/thumb_back/fh260/background/20190223/ourmid/pngtree-light-pastel-geometric-banner-background-bluegeometrygraywhiteliterarysimple-image_83281.jpg");
        background-size:100%;
        height: 30%;
        font-size: 50;
        color: black;
    }
    .logo{
        margin-bottom: 10%;
    }
    .card{
        margin-top: 5%;
    }
    .hubungiKami{
        color: black;
    }
    .napbar {
        background-color: black;
    }
    .ikon :hover{
        color: yellow;
    }
</style>