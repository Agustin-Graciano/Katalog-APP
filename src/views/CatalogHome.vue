<template>
  <TopHeader />
  <div class="flex justify-center items-center h-screen">
    <div class="flex bg-black opacity-70 w-full h-full justify-center">
      <div class="flex absolute items-center text-center">
        <h1 class="text-white text-3xl font-bold py-6 drop-shadow-sm">
          Select your images to create your catalog!
        </h1>
      </div>
      <div
        class="bg-white border opacity-100 w-full mt-24 rounded-lg lg:w-1/1 h-screen lg:h-96 lg:mx-72"
      >
        <div class="flex justify-center items-center h-full">
          <svg-icon
            class="mb-28"
            type="mdi"
            :path="path"
            style="width: 500px; height: 200px;"
          ></svg-icon>
        </div>
        <div class="flex justify-around -mt-28 py-5 bg-black opacity-90">
          <v-button
            v-if="!selectedImages.length"
            @click="handleButtonClick"
            class="button-styling text-white font-semibold"
          >
            Select Local Images
          </v-button>
          <v-button
            type="button"
            v-if="!selectedImages.length"
            class="button-styling text-white font-semibold" 
            :disabled="true"
          >
            Select Images from DB
          </v-button>
          <v-button
            v-if="selectedImages.length"
            class="button-styling text-white font-semibold"
            @click="goToPresentationSection"
          >
            Go to presentation section
          </v-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiFileUpload } from "@mdi/js";
import TopHeader from "../components/TopHeader.vue";
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    TopHeader,
    SvgIcon,
  },
  computed: {
    ...mapState({
      images: (state) => state.images,
    }),
  },
  data() {
    return {
      path: mdiFileUpload,
      selectedImages: [], // Initialize an array to store the selected images
    };
  },
  methods: {
    ...mapActions({
      addImages: 'addImages',
    }),
    handleButtonClick() {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.multiple = true;
      input.onchange = (e) => {
        const files = e.target.files;
        this.addImages(Array.from(files)); // Dispatch the "addImages" action with the selected files
      };
      input.click();
    },
    goToPresentationSection() {
      if (this.selectedImages.length > 0) {
        this.$router.push({
          name: "PresentationSection",
          params: { images: this.selectedImages },
          query: { step: 2 } // Pass a query parameter to indicate the step
        });
      }
    },
  },
  watch: {
    images(newImages) {
      this.selectedImages = newImages;
    },
  },
};
</script>

<style scoped>
/*Responsiveness for the white square box*/
@media (min-width: 1024px) {
    .mx-80 {
      margin-left: 80px;
      margin-right: 80px;
  }
}

/*buttons styling*/ 
.button-styling {
 cursor: pointer;
 padding: 10px 15px;
 font-size: 17px;
 border-radius: 0.5em;
 background: #646464;
 transition: all .3s;
}
.button-styling:active {
 box-shadow: inset 4px 4px 12px #000000,
             inset -4px -4px 12px #000000;
}
</style>



