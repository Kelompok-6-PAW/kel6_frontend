<template>
    <v-main class="list">

        <h3 class="text-h3 font-weight-bold mb-5 judul">Top-Up Game.</h3>

    <div class="fullheight pa-6 px-15">
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

                <v-btn color="primary" dark @click="dialog = true">
                    Pesan Top-Up Game
                </v-btn>
            </v-card-title>

            <v-data-table :headers="headers" :items="filteredTable()" :search="search">
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn color="#ff9a76" small class="mr-2" @click="editHandler(item)">
                        <v-icon color="white">mdi-pencil-circle</v-icon> 
                    </v-btn>
                    <v-btn color="#ec5858" small class="mr-2" @click="deleteHandler(item.id)">
                        <v-icon color="white">mdi-close-circle</v-icon> 
                    </v-btn>
                    <v-btn color="#679b9b" small @click="confirmHandler(item.id)">
                        <v-icon color="white">mdi-cash-check</v-icon> 
                    </v-btn>
                </template>
                <template v-slot:[`item.harga`]="{ item }">
                    <span>Rp {{ item.harga }} </span>
                </template>
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

        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline font-weight-bold">{{ formTitle }} Pesanan Top-Up Game</span>
                </v-card-title>
                <v-card-text>
                    <v-container>                        

                        <vue-select-image class="mb-3"
                            :h='80'
                            :W='80'                            
                            :useLabel=true 
                            :dataImages="dataImages"                              
                            @onselectimage="onSelectImage"
                            v-if="inputType==='Tambah'"                                                         
                            ref="single-select-image"                           
                            >
                        </vue-select-image>

                        <vue-select-image class="mb-3"
                            :h='80'
                            :W='80'                            
                            :useLabel=true 
                            :dataImages="initialSelected"
                            v-else                                                                                                                                                                                                    
                            >
                        </vue-select-image>
                        
                        <v-text-field
                            v-model="form.userID"
                            label="User ID"
                            outlined
                            required
                            prepend-icon="mdi-account">
                        </v-text-field>
                    
                        <v-select 
                            v-model="form.nominal"
                            :items="filteredSelect(form.game)" 
                            v-on:change="filteredHarga(form.nominal)"                           
                            item-text="topup"
                            item-value="topup"
                            label="Nominal" 
                            outlined                           
                            required
                            prepend-icon="mdi-wallet-giftcard">
                        </v-select>

                        <v-text-field
                            v-model="form.harga"
                            disabled
                            label="Harga"
                            outlined
                            prefix="Rp"
                            readonly
                            required
                            prepend-icon="mdi-cash-usd">
                        </v-text-field>

                        <v-select
                            v-model="form.pembayaran"
                            :items="['OVO', 'GOPAY']"
                            label="Pembayaran"
                            outlined
                            required
                            prepend-icon="mdi-credit-card">
                        </v-select>

                    </v-container>
                </v-card-text>

                <v-card-actions class="justify-center">                    
                    <v-btn color="lime darken-1" text @click="cancel">
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
                <v-card-title class="justify-center">
                    <v-icon v-if="checkConfirm==false" x-large color="red">mdi-alert-circle</v-icon>
                    <v-icon v-else x-large color="success">mdi-check-circle</v-icon>                     
                </v-card-title>
                <v-card-text>
                    <h5 v-if="checkConfirm==false" class="font-weight-medium">Hapus pesanan top-up ini?</h5>
                    <h5 v-else class="font-weight-medium">Konfirmasi pesanan top-up ini?</h5>                    
                </v-card-text>
                <v-card-actions class="justify-center">                    
                    <v-btn color="lime darken-1" text @click="dialogConfirm = false, checkConfirm = false">
                        Batal
                    </v-btn>
                    <v-btn v-if="checkConfirm==false" color="red darken-1" text @click="deleteData">
                        Hapus
                    </v-btn>
                    <v-btn v-else color="success darken-1" text @click="confirmData">
                        Konfirmasi
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
                userNow: [],
                dataImages: [{
                                id: '1',
                                src: 'https://play-lh.googleusercontent.com/iuTt8Y9wzC3YCWgMGp_JcswmXGyG_t6XHDyPDv6ZLlGZQbEbeuLmSbZGD2DHwUB3ZAvY',
                                alt: 'Mobile Legends',                                   
                                }, {
                                id: '2',
                                src: 'https://www.apkmirror.com/wp-content/uploads/2020/07/43/5f03ed84c1091-384x384.png',
                                alt: 'PUBGM',                                                           
                                }, {
                                id: '3',
                                src: 'https://kaleoz-media.oss-ap-southeast-1.aliyuncs.com//kaleoz-store/202009/oss-37af9dc791b0866936cbd413950b3697.jpg',
                                alt: 'Valorant',                                
                            }],
                dataImagesEdit: [{
                                id: '1',
                                src: 'https://play-lh.googleusercontent.com/iuTt8Y9wzC3YCWgMGp_JcswmXGyG_t6XHDyPDv6ZLlGZQbEbeuLmSbZGD2DHwUB3ZAvY',
                                alt: 'Mobile Legends',   
                                disabled: false                             
                                }, {
                                id: '2',
                                src: 'https://www.apkmirror.com/wp-content/uploads/2020/07/43/5f03ed84c1091-384x384.png',
                                alt: 'PUBGM',  
                                disabled: false                              
                                }, {
                                id: '3',
                                src: 'https://kaleoz-media.oss-ap-southeast-1.aliyuncs.com//kaleoz-store/202009/oss-37af9dc791b0866936cbd413950b3697.jpg',
                                alt: 'Valorant',
                                disabled: false                                
                            }],
                initialSelected: [],
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
                editId: '',
                confirmId: '',
                checkConfirm: false,
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
                    
                        this.pesanTopUps = response.data.data
                })
            },
            readDataSelect() {
                var url = this.$api + '/tambahnominal/'
                this.$http.get(url, {
                     headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {                    
                    this.nominalOptions = response.data.data                    
                })
            },
            readDataUser() {
                var url = this.$api + '/detailuser'
                this.$http.get(url, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    console.log(response)
                    this.userNow = response.data.user                    
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
                this.pesanTopUp.append('uname', this.userNow.username);
                this.pesanTopUp.append('konfirmasi', 'Belum');

                var url = this.$api + '/pesantopup'
                this.load = true
                this.$http.post(url, this.pesanTopUp, {
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
                    userID: this.form.userID,
                    nominal: this.form.nominal,
                    harga: this.form.harga,
                    pembayaran: this.form.pembayaran,                    
                }
                var url = this.$api + '/pesantopup/' + this.editId;
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
                var url = this.$api + '/pesantopup/' + this.deleteId;
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
            confirmData() {
                var url = this.$api + '/pesantopup/confirm/' + this.confirmId;
                console.log(url);
                this.$http.get(url, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.error_message = response.data.message;
                    this.color="green"
                    this.snackbar=true;
                    this.load=false;
                    this.checkConfirm=false;
                    this.close();
                    this.readData();
                    this.resetForm();
                    this.inputType = 'Tambah';
                }).catch(error => {
                    this.error_message=error.response.data.message;
                    this.color="red"
                    this.snackbar=true;
                    this.checkConfirm=false;
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
                this.filteredImage(item.game);                
                this.dialog = true;
            },
            deleteHandler(id) {
                this.deleteId = id;
                this.dialogConfirm = true;
            },
            confirmHandler(id) {
                this.confirmId = id;
                this.checkConfirm = true;
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
                if (this.inputType==='Ubah'){
                    this.initialSelected= [];
                } else {
                    this.$refs['single-select-image'].removeFromSingleSelected();
                }                    
                
            },            
            filteredSelect(tes){
                return this.nominalOptions.filter(nominalOption => nominalOption.game === tes && nominalOption.stok > 0)
            },
            filteredHarga(tes){               
                 var object = this.nominalOptions.filter(nominalOption => nominalOption.topup === tes)
                 return this.form.harga = object[0].harga
            },
            filteredTable(){
                return this.pesanTopUps.filter(
                    pesanTopUp => pesanTopUp.konfirmasi === 'Belum' && pesanTopUp.uname === this.userNow.username)
            },
            filteredImage(tes){
                var pil = this.dataImagesEdit.filter(img => img.alt === tes)
                this.initialSelected = pil            
                this.initialSelected[0].disabled = true                                
            },               
            onSelectImage: function (data) {
                console.log('fire event onSelectImage: ', data)
                this.form.game = data.alt
                this.form.nominal = null
                this.form.harga = null
            },           
        },
        computed: {
            formTitle() {
                return this.inputType
            },            
        },
        mounted() {
            this.readDataUser();
            this.readData();
            this.readDataSelect();            
        },
    };
</script>

