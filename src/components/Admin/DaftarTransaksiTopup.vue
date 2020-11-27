<template>
    <v-main class="list">
        <h3 class="text-h3 font-weight-medium mb-5">Tambah Nominal Top Up</h3>

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
                        value: "Game",
                    },
                    { text: "UserID", value: "UserID" },
                    { text: "Nominal", value: "Nominal" },
                    { text: "Harga", value: "Harga" },
                    { text: "Pembayaran", value: "Pembayaran" },
                    { text: "Username", value: "Username" },
                    { text: "Konfirmasi", value: "Konfirmasi" },
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
                    this.pesanTopUps = response.data.data
                })
            },
                      
        },
        mounted() {
            this.readData();
        },
    };
</script>