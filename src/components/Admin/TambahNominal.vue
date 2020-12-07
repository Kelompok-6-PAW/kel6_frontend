<template>
    <v-main class="list">
        <h3 class="text-h3 font-weight-bold mb-5 judul">Daftar Nominal Top Up Game.</h3>

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

            <v-data-table :headers="headers" :items="tambahNominals" :search="search" :items-per-page="5">
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn color="#ff9a76" v-if="filteredActions(item)" disabled small class="mr-2" @click="editHandler(item)">
                        <v-icon color="white">mdi-pencil-circle</v-icon> 
                    </v-btn>
                    <v-btn color="#ff9a76" v-else small class="mr-2" @click="editHandler(item)">
                        <v-icon color="white">mdi-pencil-circle</v-icon> 
                    </v-btn>                                    
                    <v-btn color="#ec5858" v-if="filteredActions(item)" disabled small class="mr-2" @click="deleteHandler(item.id)">
                        <v-icon color="white">mdi-close-circle</v-icon> 
                    </v-btn>
                    <v-btn color="#ec5858" v-else small class="mr-2" @click="deleteHandler(item.id)">
                        <v-icon color="white">mdi-close-circle</v-icon> 
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
                            v-model="form.topup"
                            label="Top Up"
                            outlined                            
                            :suffix="form.tipe"
                            prepend-icon="mdi-wallet-giftcard"
                            required>
                        </v-text-field>

                        <v-text-field
                            v-model="form.harga"
                            label="Harga"
                            outlined
                            type="number"
                            prefix="Rp"
                            prepend-icon="mdi-cash-usd"
                            required>
                        </v-text-field>

                        <v-text-field
                            v-model="form.stok"
                            label="Stok"
                            type="number"
                            outlined                            
                            prepend-icon="mdi-cube"
                            required>
                        </v-text-field>

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
                    <v-icon x-large color="red">mdi-alert-circle</v-icon>                    
                </v-card-title>
                <v-card-text>
                    <h5 class="font-weight-medium">Hapus pesanan top-up ini?</h5>                    
                </v-card-text>
                <v-card-actions class="justify-center">                    
                    <v-btn color="lime darken-1" text @click="dialogConfirm = false">
                        Batal
                    </v-btn>
                    <v-btn color="red darken-1" text @click="deleteData">
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
                search: null,
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
                pesanTopUps: [],                
                form: {
                    game: null,
                    topup: null,                    
                    harga: null,
                    stok: null,
                    tipe: null,                    
                },
                deleteId: '',
                editId: '',
                checkActions: false
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
            readDataPesanTopUp() {
                var url = this.$api + '/pesantopup'
                this.$http.get(url, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {                                        
                    this.pesanTopUps = response.data.data
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
                this.tambahNominal.append('topup', this.form.topup + ' ' + this.form.tipe);                
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
                this.filteredImage(item.game);
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
                    tipe: null,
                };
                if (this.inputType==='Ubah'){
                    this.initialSelected= [];
                } else {
                    this.$refs['single-select-image'].removeFromSingleSelected();
                } 
            },
            filteredImage(tes){
                var pil = this.dataImagesEdit.filter(img => img.alt === tes)
                this.initialSelected = pil            
                this.initialSelected[0].disabled = true                                
            },
            filteredActions(tes){                                   
                for (let index = 0; index < this.pesanTopUps.length; index++) {
                    if (this.pesanTopUps[index].nominal === tes.topup){
                        if (this.pesanTopUps[index].konfirmasi === 'Belum') {
                            return true
                        }  
                    }                    
                }
                return false                             
            },                        
            onSelectImage: function (data) {
                console.log('fire event onSelectImage: ', data)
                this.form.game = data.alt
                if (data.id === '1')                    
                    this.form.tipe = 'Diamonds'               
                else if (data.id === '2')
                    this.form.tipe = 'UC'
                else if (data.id === '3')                    
                    this.form.tipe = 'Points'
                else
                    this.form.tipe = null                      
            },                            
        },
        computed: {
            formTitle() {
                return this.inputType
            },
        },
        mounted() {
            this.readData();
            this.readDataPesanTopUp();                       
        },
    };
</script>