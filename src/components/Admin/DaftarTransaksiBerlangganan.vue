<template>
    <v-main class="list">
        <h3 class="text-h3 font-weight-bold mb-5 judul">Daftar Transaksi Berlangganan</h3>

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
            </v-card-title>

            <v-data-table :headers="headers" :items="berlangganans" :search="search" :items-per-page="5">
                <template v-slot:[`item.aplikasi`]="{ item }">
                    <v-avatar                                                                
                        size="36px">
                        <img v-if="item.aplikasi==='Netflix'" src="https://play-lh.googleusercontent.com/TBRwjS_qfJCSj1m7zZB93FnpJM5fSpMA_wUlFDLxWAb45T9RmwBvQd5cWR5viJJOhkI">                        
                        <img v-else src="https://i.pinimg.com/originals/7a/ec/a5/7aeca525afa2209807c15da821b2f2c6.png">
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
                        text: "Aplikasi",
                        align: "start",
                        sortable: true,
                        value: "aplikasi",
                    },
                    { text: "Email", value: "email" },
                    { text: "Jenis Langganan", value: "jenisLangganan" },
                    { text: "Harga", value: "harga" },
                    { text: "Pembayaran", value: "pembayaran" },
                    { text: "Username", value: "uname" },
                    { text: "Konfirmasi", value: "konfirmasi" },
                ],               
                berlangganans: [],                
                deleteId: '',
                editId: ''
            };
        },

        methods: {
             readData() {
                var url = this.$api + '/berlangganan'
                this.$http.get(url, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.berlangganans = response.data.data
                })
            },
                      
        },
        
        mounted() {
            this.readData();
        },
    };
</script>