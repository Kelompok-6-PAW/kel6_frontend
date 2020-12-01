<template>
    <v-main class="list">
        <h3 class="text-h3 font-weight-medium mb-5">Daftar Transaksi Top Up</h3>

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
                
            </v-data-table>
        </v-card>

       
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