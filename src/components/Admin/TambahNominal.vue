<template>
    <v-main class="list">
        <h3 class="text-h3 font-weight-bold mb-5 judul">Daftar Nominal Top Up Game</h3>

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

                <v-btn color="primary" dark @click="dialog = true">
                    Tambah Nominal Top-Up Game
                </v-btn>
            </v-card-title>

            <v-data-table :headers="headers" :items="tambahNominals" :search="search">
                <template v-slot:[`item.actions`]="{ item }">
                     <v-btn color="#ff9a76" small class="mr-2" @click="editHandler(item)">
                        <v-icon color="white">mdi-pencil-circle</v-icon> 
                    </v-btn>
                    <v-btn color="#ec5858" small class="mr-2" @click="deleteHandler(item.id)">
                        <v-icon color="white">mdi-close-circle</v-icon> 
                    </v-btn>
                </template>
            </v-data-table>
        </v-card>
    </div>

        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline font-weight-bold">{{ formTitle }} Nominal Top Up Game</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <vue-select-image class="mb-3"
                            :h='80'
                            :W='80'
                            :useLabel=true 
                            :dataImages="dataImages"
                            @onselectimage="onSelectImage" 
                            ref="single-select-image"                           
                            >
                        </vue-select-image>

                        <v-text-field
                            v-model="form.topup"
                            label="Top Up"
                            outlined
                            required>
                        </v-text-field>

                        <v-text-field
                            v-model="form.harga"
                            label="Harga"
                            outlined
                            required>
                        </v-text-field>

                        <v-text-field
                            v-model="form.stok"
                            label="Stok"
                            outlined
                            required>
                        </v-text-field>

                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="blue darken-1" text @click="cancel">
                        Batal
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="setForm">
                        Simpan
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogConfirm" persistent max-width="400px">
            <v-card>
                <v-card-title > 
                    <span class="headline">warning!</span>
                </v-card-title>
                <v-card-text>
                    Anda yakin ingin menghapus pesanan top up ini?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogConfirm = false">
                        Batal
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="deleteData">
                        Hapus
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
        name: "List",
        data() {
            return {
                inputType: 'Tambah',
                load: false,
                snackbar: false,
                error_message: '',
                color: '',
                dataImages: [{
                                id: '1',
                                src: 'https://play-lh.googleusercontent.com/iuTt8Y9wzC3YCWgMGp_JcswmXGyG_t6XHDyPDv6ZLlGZQbEbeuLmSbZGD2DHwUB3ZAvY',
                                alt: 'Mobile Legends',                                
                                }, {
                                id: '2',
                                src: 'https://lh3.googleusercontent.com/nD3N4Lorg82wdrwqdf0SPjrUImwRT4ThOMU9L5ASGYQIcxJ9xvT-6xGPK6KzccxXlg',
                                alt: 'PUBGM',                                
                                }, {
                                id: '3',
                                src: 'https://kaleoz-media.oss-ap-southeast-1.aliyuncs.com//kaleoz-store/202009/oss-37af9dc791b0866936cbd413950b3697.jpg',
                                alt: 'Valorant',                                
                            }],
                search: null,
                dialog: false,
                dialogConfirm: false,
                headers: [
                    {
                        text: "Game",
                        align: "start",
                        sortable: true,
                        value: "game",
                    },
                    { text: "Nominal Top-Up", value: "topup" },                    
                    { text: "Harga", value: "harga" },
                    { text: "Stok", value: "stok" },
                    { text: "Actions", value: "actions" },
                ],
                tambahNominal: new FormData,
                tambahNominals: [],
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
                var url = this.$api + '/tambahnominal'
                this.$http.get(url, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.tambahNominals = response.data.data
                })
            },
            setForm() {
                if (this.inputType === 'Tambah') {
                    this.save()
                } else {
                    this.update()
                }
            },
            save() {
                this.tambahNominal.append('game', this.form.game);
                this.tambahNominal.append('topup', this.form.topup);                
                this.tambahNominal.append('harga', this.form.harga);
                this.tambahNominal.append('stok', this.form.stok);                

                var url = this.$api + '/tambahnominal'
                this.load = true
                this.$http.post(url, this.tambahNominal, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.error_message = response.data.message;
                    this.color="green"
                    this.snackbar=true;
                    this.load=false;
                    this.close();
                    this.readData();
                    this.resetForm();
                }).catch(error => {
                    this.error_message=error.response.data.message;
                    this.color="red"
                    this.snackbar=true;
                    this.load=false;
                })
            },
            update() {
                let newData = {
                    game: this.form.game,
                    topup: this.form.topup,                    
                    harga: this.form.harga,
                    stok: this.form.stok,                    
                }
                var url = this.$api + '/tambahnominal/' + this.editId;
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
                    this.close();
                    this.readData();
                    this.resetForm();
                    this.inputType = 'Tambah';
                }).catch(error => {
                    this.error_message=error.response.data.message;
                    this.color="red"
                    this.snackbar=true;
                    this.load=false;
                })
            },
            deleteData() {
                var url = this.$api + '/tambahnominal/' + this.deleteId;
                this.$http.delete(url, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.error_message = response.data.message;
                    this.color="green"
                    this.snackbar=true;
                    this.load=false;
                    this.close();
                    this.readData();
                    this.resetForm();
                    this.inputType = 'Tambah';
                }).catch(error => {
                    this.error_message=error.response.data.message;
                    this.color="red"
                    this.snackbar=true;
                    this.load=false;
                })
            },
            editHandler(item) {
                this.inputType = 'Ubah';
                this.editId = item.id;
                this.form.game = item.game;
                this.form.topup = item.topup;                
                this.form.harga = item.harga;
                this.form.stok = item.stok;
                this.dialog = true;
            },
            deleteHandler(id) {
                this.deleteId = id;
                this.dialogConfirm = true;
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
                    topup: null,                    
                    harga: null,
                    stok: null, 
                };
                this.$refs['single-select-image'].removeFromSingleSelected()
            },
            onSelectImage: function (data) {
                console.log('fire event onSelectImage: ', data)
                this.form.game = data.alt
            },                
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