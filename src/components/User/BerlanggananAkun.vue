<template>
    <v-main class="list">

        <h3 class="text-h3 font-weight-bold mb-5 judul">Berlangganan Akun.</h3>

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
                    Pesan Berlangganan Akun
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

        <v-dialog v-model="dialog" persistent max-width="600px" >
            <v-card>
                <v-card-title>
                    <span class="headline font-weight-bold">{{ formTitle }} Berlangganan Akun</span>
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
                            v-model="form.email"
                            label="Email"
                            outlined
                            required
                            prepend-icon="mdi-email">
                        </v-text-field>
                    
                        <v-select 
                            v-model="form.jenisLangganan"
                            :items="filteredSelect(form.aplikasi)"                            
                            v-on:change="filteredHarga(form.jenisLangganan)"
                            item-text="jenis"
                            item-value="jenis"                            
                            label="Jenis Berlangganan"
                            outlined
                            :hint="form.desc"
                            persistent-hint                            
                            required
                            prepend-icon="mdi-wallet-giftcard">
                        </v-select>

                        <v-text-field
                            class="mt-3"
                            v-model="form.harga"
                            disabled
                            label="Harga"
                            outlined
                            readonly
                            prefix="Rp"                            
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
                    <h5 v-if="checkConfirm==false" class="font-weight-medium">Hapus pesanan berlangganan akun ini?</h5>
                    <h5 v-else class="font-weight-medium">Konfirmasi pesanan berlangganan akun ini?</h5>                    
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
                                src: 'https://play-lh.googleusercontent.com/TBRwjS_qfJCSj1m7zZB93FnpJM5fSpMA_wUlFDLxWAb45T9RmwBvQd5cWR5viJJOhkI',
                                alt: 'Netflix'
                                }, {
                                id: '2',
                                src: 'https://i.pinimg.com/originals/7a/ec/a5/7aeca525afa2209807c15da821b2f2c6.png',
                                alt: 'Spotify'
                                }],
                dataImagesEdit: [{
                                id: '1',
                                src: 'https://play-lh.googleusercontent.com/TBRwjS_qfJCSj1m7zZB93FnpJM5fSpMA_wUlFDLxWAb45T9RmwBvQd5cWR5viJJOhkI',
                                alt: 'Netflix',
                                disabled: false
                                }, {
                                id: '2',
                                src: 'https://i.pinimg.com/originals/7a/ec/a5/7aeca525afa2209807c15da821b2f2c6.png',
                                alt: 'Spotify',
                                disabled: false                            
                            }],
                initialSelected: [],                
                search: null,
                dialog: false,
                dialogConfirm: false,
                headers: [
                    {
                        text: "Aplikasi",
                        align: "start",
                        sortable: true,
                        value: "aplikasi",
                    },
                    { text: "Email", value: "email" },
                    { text: "Jenis Berlangganan", value: "jenisLangganan" },
                    { text: "Harga", value: "harga" },
                    { text: "Pembayaran", value: "pembayaran" },
                    { text: "Actions", value: "actions" },
                ],
                berlangganan: new FormData,
                berlangganans: [],
                langgananOptions: [
                    {apk:'Spotify', harga:'45000' , jenis:'1 Bulan', 
                        desc:'tanpa iklan, bebas download lagu, bebas memilih dan memutar lagu' },
                    {apk:'Spotify', harga:'125000' , jenis:'3 Bulan',
                        desc:'tanpa iklan, bebas download lagu, bebas memilih dan memutar lagu' },
                    {apk:'Spotify', harga:'250000' , jenis:'6 Bulan',
                        desc:'tanpa iklan, bebas download lagu, bebas memilih dan memutar lagu' },
                    {apk:'Netflix', harga:'115000' , jenis:'Basic',
                        desc:'nonton di TV/laptop, jumlah profil 1' },
                    {apk:'Netflix', harga:'145000' , jenis:'Standard',
                        desc:'nonton di TV/laptop, jumlah profil 2, resolusi HD' },
                    {apk:'Netflix', harga:'160000' , jenis:'Premium',
                        desc:'nonton di TV/laptop, jumlah profil 4, resolusi Ultra HD' },
                ],                                
                form: {
                    aplikasi: null,
                    email: null,
                    jenisLangganan: null,
                    harga: null,
                    pembayaran: null,
                    desc: null,                    
                },
                deleteId: '',
                editId: '',
                confirmId: '',
                checkConfirm: false,
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
                this.berlangganan.append('aplikasi', this.form.aplikasi);
                this.berlangganan.append('email', this.form.email);
                this.berlangganan.append('jenisLangganan', this.form.jenisLangganan);
                this.berlangganan.append('harga', this.form.harga);
                this.berlangganan.append('pembayaran', this.form.pembayaran);
                this.berlangganan.append('uname', this.userNow.username);
                this.berlangganan.append('konfirmasi', 'Belum');

                var url = this.$api + '/berlangganan'
                this.load = true
                this.$http.post(url, this.berlangganan, {
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
                    aplikasi: this.form.aplikasi,
                    email: this.form.email,
                    jenisLangganan: this.form.jenisLangganan,
                    harga: this.form.harga,
                    pembayaran: this.form.pembayaran,                    
                }
                var url = this.$api + '/berlangganan/' + this.editId;
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
                var url = this.$api + '/berlangganan/' + this.deleteId;
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
                var url = this.$api + '/berlangganan/confirm/' + this.confirmId;
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
                this.form.aplikasi = item.aplikasi;
                this.form.email = item.email;
                this.form.jenisLangganan = item.jenisLangganan;                
                this.form.pembayaran = item.pembayaran;
                this.filteredImage(item.aplikasi); 
                this.filteredHarga(item.jenisLangganan); 
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
                    aplikasi: null,
                    email: null,
                    jenisLangganan: null,
                    harga: null,
                    pembayaran: null,
                    desc: null,  
                };
                if (this.inputType==='Ubah'){
                    this.initialSelected= [];
                } else {
                    this.$refs['single-select-image'].removeFromSingleSelected();
                }   
            },
            filteredSelect(tes){
                return this.langgananOptions.filter(langganan => langganan.apk === tes)
            },            
            filteredHarga(tes){               
                 var object = this.langgananOptions.filter(langganan => langganan.jenis === tes)
                 this.form.harga = object[0].harga
                 this.form.desc = object[0].desc
            },
            filteredTable(){
                return this.berlangganans.filter(
                    berlangganans => berlangganans.konfirmasi === 'Belum' && berlangganans.uname === this.userNow.username)
            },
            filteredImage(tes){
                var pil = this.dataImagesEdit.filter(img => img.alt === tes)
                this.initialSelected = pil            
                this.initialSelected[0].disabled = true                                
            },               
            onSelectImage: function (data) {
                console.log('fire event onSelectImage: ', data)
                this.form.aplikasi = data.alt
                this.form.jenisLangganan = null
                this.form.harga = null,
                this.form.desc = null
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
        },
    };
</script>
