<template>
    <v-main class="list">
        <h3 class="text-h3 font-weight-bold mb-5 judul">Daftar Transaksi Top Up</h3>

    <div class="fullheight pa-6 px-15">
        <v-card >
            <v-card-title>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details>
                </v-text-field>

                <v-spacer></v-spacer>

                <v-btn color="error" dark @click="dialog = true">
                    Cetak PDF
                </v-btn>
            </v-card-title>

            <v-data-table :headers="headers" :items="pesanTopUps" :search="search">
                <template v-slot:[`item.game`]="{ item }">
                    <v-avatar                                                                
                        size="36px">
                        <img v-if="item.game==='Mobile Legends'" src="https://play-lh.googleusercontent.com/iuTt8Y9wzC3YCWgMGp_JcswmXGyG_t6XHDyPDv6ZLlGZQbEbeuLmSbZGD2DHwUB3ZAvY">
                        <img v-else-if="item.game==='PUBGM'" src="https://www.apkmirror.com/wp-content/uploads/2020/07/43/5f03ed84c1091-384x384.png">
                        <img v-else src="https://kaleoz-media.oss-ap-southeast-1.aliyuncs.com//kaleoz-store/202009/oss-37af9dc791b0866936cbd413950b3697.jpg">
                    </v-avatar>
                </template>
            </v-data-table>
        </v-card>
    </div>
       
    </v-main>
</template>


<script>
    export default {
        name: "List",
        data() {
            return {
                inputType: 'Tambah',
                load: false,
                
                error_message: '',
                color: '',
                search: null,
                
                headers: [
                    {
                        text: "Game",
                        align: "start",
                        sortable: true,
                        value: "game",
                    },
                    { text: "UserID", value: "userID" },
                    { text: "Nominal", value: "nominal" },
                    { text: "Harga", value: "harga" },
                    { text: "Pembayaran", value: "pembayaran" },
                    { text: "Username", value: "uname" },
                    { text: "Konfirmasi", value: "konfirmasi" },
                ],          
                pesanTopUps: [],
                form: {
                    game: null,
                    topup: null,                    
                    harga: null,
                    stok: null,                    
                },
                deleteId: '',
                editId: ''
            };
        },

        methods: {
            readData() {
                var url = this.$api + '/pesantopup'
                this.$http.get(url, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    console.log(response)
                    
                    this.pesanTopUps = response.data.data;
                    console.log(this.pesanTopUps)
                })
            },
                      
        },
        mounted() {
            this.readData();
        },
    };
</script>