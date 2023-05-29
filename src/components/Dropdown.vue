<template>
    <div class="dropdown-container">
      <input type="text" v-model="searchOption" @input="filterProducts" placeholder="DB Search" class="search-input" />
      <div class="dropdown">
        <div v-for="product in computedFilteredProducts" :key="product.productIndex" class="dropdown-item">
          <div class="product-info">
            <a :href="product.linkUrl">
              <img :src="product.imageUrl" alt="ProdImg" class="product-image px-2">
            </a>
            <h3 class="product-title px-2 center">{{ product.productName }}</h3>
            <p class="product-price center px-2 center">{{ product.price }} kr.</p>
            <button class="product-button rounded-xl px-2 center" @click="copyProduct(product)">Copy</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex';
  
  export default {
    data() {
      return {
        searchOption: '',
      };
    },
    computed: {
      ...mapState(['products']),
      computedFilteredProducts() {
        const searchTerm = this.searchOption.toLowerCase();
        if (searchTerm === '') {
          return [];
        } else {
          return this.products.filter(product => {
            const productName = product.productName.toLowerCase();
            return productName.includes(searchTerm);
          });
        }
      },
    },
    methods: {
      copyProduct(product) {
        const copiedText = `${product.imageUrl} ${product.productName} - ${product.price}.kr`;
        navigator.clipboard.writeText(copiedText)
          .then(() => {
          
          })
          .catch((error) => {
            console.error('Failed to copy product:', error);
          });
      },
      filterProducts() {
     
      },
    },
  };
  </script>
  
<style scoped>
.dropdown-container {
  position: relative;
  width: 550px;
  padding: 5px;
}

.search-input {
  width: 100%;
  height: 30px;
  font-size: 16px;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 20;
  width: 550px;
  max-height: 150px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.dropdown-item {
  padding: 8px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f2f2f2;
}

.document-editor__page-indicator {
  font-size: 14px;
  font-weight: bold;
  margin-right: 16px;
}

.product-info {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 40px; /* Adjust the height value as needed */
}

.product-image,
.product-title,
.product-price{
  padding: 0.2em;
}
.product-button {
  padding: 0.2em;
  font-size: 12px;
  justify-items: flex-start;
  color: white;
  background-color: grey;
}
</style>
 
  