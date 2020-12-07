<template>
    <v-main class="Home">
       

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
                <h1>Mobile Legends</h1>
                <p>Let’s go out and relax! -  Akai</p>                
            </b-carousel-slide>

            <!-- Slides with custom text -->
            <b-carousel-slide img-src="https://www.popsci.com/resizer/0eQsCPRWhjB3PNPxqrtRnPNGxwA=/1200x628/smart/arc-anglerfish-arc2-prod-bonnier.s3.amazonaws.com/public/AUSBJ7SDRWXMD7VXVNJASUT6ME.jpg">
                <h1>Netflix</h1>
                <p>See What's Next</p>                
            </b-carousel-slide>            

            </b-carousel>
            
       

        
    </v-main>
</template>


<script>
import TentangKamiVue from './User/TentangKami.vue';
//import image from "./assets/couponic.png"
    export default {
        name: "Home",
        data() {
            return {
                routes : [
                { path: '/tentangkamiawal', component: TentangKamiVue }],
            }
        },

    }
</script>

<style >
    .napbar {
        background-color: black;
    }
    
</style>