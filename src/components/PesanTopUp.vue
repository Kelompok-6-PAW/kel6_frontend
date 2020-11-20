<template>
    <v-main class="list">
        <h3 class="text-h3 font-weight-medium mb-5">Pesan Top Up</h3>

        <v-card>
            <v-card-title>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details>
                </v-text-field>

                <v-spacer></v-spacer>

                <v-btn color="success" dark @click="dialog = true">
                    Tambah
                </v-btn>
            </v-card-title>

            <v-data-table :headers="headers" :items="pesanTopUps" :search="search">
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn small class="mr-2" @click="editHandler(item)">
                        edit
                    </v-btn>
                    <v-btn small @click="deleteHandler(item.id)">
                        delete
                    </v-btn>
                </template>
            </v-data-table>
            
        </v-card>

        <v-dialog v-model="dialog" persistent max-width="600px" >
            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }} Pesanan Top Up Game</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <!-- <v-text-field
                            v-model="form.game"
                            label="Game"
                            required>
                        </v-text-field> -->

                        <!-- <v-radio-group label="Active?" v-model="form.game">
                            <v-radio name="active"  value="Mobile Legends">HA</v-radio>
                            <v-radio name="active"  value="Valorant"></v-radio>                
                        </v-radio-group> -->

                        <v-text-field
                            v-model="form.userID"
                            label="User ID"
                            required>
                        </v-text-field>
                    
                        <v-select 
                            v-model="form.nominal"
                            :items="filteredSelect(form.game)"
                            item-text="topup"
                            item-value="topup"
                            label="Nominal"                            
                            required>
                        </v-select>

                        <v-text-field
                            v-model="form.harga"
                            label="Harga"
                            required>
                        </v-text-field>

                        <v-select
                            v-model="form.pembayaran"
                            :items="['OVO', 'GOPAY']"
                            label="Pembayaran"
                            required>
                        </v-select>

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
                    { text: "UserID", value: "userID" },
                    { text: "Nominal", value: "nominal" },
                    { text: "Harga", value: "harga" },
                    { text: "Pembayaran", value: "pembayaran" },
                    { text: "Actions", value: "actions" },
                ],
                pesanTopUp: new FormData,
                pesanTopUps: [],
                nominalOptions: [],                                
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
            readData() {
                var url = this.$api + '/pesantopup'
                this.$http.get(url, {
                    
                }).then(response => {
                    this.pesanTopUps = response.data.data
                })
            },
            readDataSelect() {
                var url = this.$api + '/tambahnominal/'
                this.$http.get(url, {
                    
                }).then(response => {                    
                    this.nominalOptions = response.data.data                    
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
                this.pesanTopUp.append('game', this.form.game);
                this.pesanTopUp.append('userID', this.form.userID);
                this.pesanTopUp.append('nominal', this.form.nominal);
                this.pesanTopUp.append('harga', this.form.harga);
                this.pesanTopUp.append('pembayaran', this.form.pembayaran);
                this.pesanTopUp.append('uname', "rastrk");
                this.pesanTopUp.append('konfirmasi', 'Belum');

                var url = this.$api + '/pesantopup'
                this.load = true
                this.$http.post(url, this.pesanTopUp, {
                    // headers: {
                    //     'Authorization': 'Bearer ' + localStorage.getItem('token')
                    // }
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
                    userID: this.form.userID,
                    nominal: this.form.nominal,
                    harga: this.form.harga,
                    pembayaran: this.form.pembayaran,                    
                }
                var url = this.$api + '/pesantopup/' + this.editId;
                this.load = true
                this.$http.put(url, newData, {
                    // headers: {
                    //     'Authorization': 'Bearer ' + localStorage.getItem('token')
                    // }
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
                var url = this.$api + '/pesantopup/' + this.deleteId;
                this.$http.delete(url, {
                    // headers: {
                    //     'Authorization': 'Bearer ' + localStorage.getItem('token')
                    // }
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
                this.form.userID = item.userID;
                this.form.nominal = item.nominal;
                this.form.harga = item.harga;
                this.form.pembayaran = item.pembayaran;
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
                    userID: null,
                    nominal: null,
                    harga: null,
                    pembayaran: null,  
                };
            },
            filteredSelect(tes){
                return this.nominalOptions.filter(nominalOption => nominalOption.game === tes)
            }                     
        },
        computed: {
            formTitle() {
                return this.inputType
            },            
        },
        mounted() {
            this.readData();
            this.readDataSelect();
        },
    };
</script>