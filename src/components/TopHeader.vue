<template>
    <div class="bg-white px-4 py-2">
      <div class="flex justify-center">
        <div class="right-border mt-20 mb-20">
          <router-link to="/PSA Cards" class="inline-block px-4 mt-2 mb-2 text-blue font-bold hover:text-black">PSA Cards</router-link>
          <router-link to="/Card Holders" class="inline-block px-4 mt-2 mb-2 text-blue font-bold hover:text-black">Card Holders</router-link>
          <router-link to="/Prises" class="inline-block px-4 mt-2 mb-2 text-blue font-bold hover:text-black">Prises</router-link>
        </div>
        <div>
          <router-link to="/"><img src="https://cdn.shopify.com/s/files/1/0558/2749/7135/files/160951771_137318954966106_5380319641252698276_n_360x.png?v=1616866138" width="150" class="rounded-full" alt="logo"/></router-link>
        </div>
        <div class="left-border mt-20 mb-20">
          <router-link to="/Valuation" class="inline-block px-4 mt-2 mb-2 text-blue font-bold hover:text-black">Get a free valuation</router-link>
          <router-link to="/FAQ"
            class="inline-block px-4 mt-2 mb-2 text-blue font-bold hover:text-black">FAQ</router-link>
          <router-link to="/Contact" class="inline-block px-4 mt-2 mb-2 text-blue font-bold hover:text-black">Contact</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
        components: {
        },
      }
  </script>
  
  <style scoped>
    .right-border {
      border-color: #133f8d;
      border-style: solid;
      border-top-width: 2px;
      border-bottom-width: 2px;
    }
    .left-border {
      border-color: #133f8d;
      border-style: solid;
      border-top-width: 2px;
      border-bottom-width: 2px;
    }
  
    .center-border {
      border-color: #133f8d;
      border-style: solid;
      border-top-width: 2px;
      border-bottom-width: 2px;
    }
    
    .imgPoke {
      -webkit-filter: brightness(50%);
      filter: brightness(50%);
      border-width: 2px;
      border-color: #133f8d;
      z-index: -1 !important;
    }
    .pi {
      font-size: 180%;
    }
  </style>