<template>
    <v-main class="Home">
        <div>
            <b-navbar toggleable="lg" type="dark" class="napbar">
                <b-navbar-brand href="#">Couponic</b-navbar-brand>
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto mr-7 font-weight-bold">
                    <b-nav-item href="#">Tentang Kami</b-nav-item>
                    <b-nav-item href="#">Daftar</b-nav-item>
                    <b-nav-item href="#">Masuk</b-nav-item>
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
                slide: 0,
                sliding: null,
                search: null,
                dialog: false,
                dialogConfirm: false,
                pesanTopUp: new FormData,                             
                form: {
                    game: null,
                    userID: null,
                    nominal: null,
                    harga: null,
                    pembayaran: null,                    
                },
                deleteId: '',
                editId: ''
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
            save() {
                
            },
            close() {
                this.dialog = false;
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