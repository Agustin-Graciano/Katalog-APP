<template>
  <div>
    <button @click="showImages"></button>
    <div v-if="showPopup">
      <div v-for="imageUrl in imageUrls" :key="imageUrl">
        <img :src="imageUrl" alt="Uploaded Image">
        <button class="bg-black text-white rounded my-2" @click="selectImage(imageUrl)"></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    imageUrls() {
      return this.$store.state.images.map(image => image.url);
    }
  },
  data() {
    return {
      showPopup: false,
    }
  },
  methods: {
    showImages() {
      this.showPopup = true;
    },
    selectImage(imageUrl) {
      this.$emit('image-selected', imageUrl);
      this.showPopup = false; // Hide the popup after selecting an image
    },
  }
}
</script>

