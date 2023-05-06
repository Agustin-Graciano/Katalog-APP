<template>
  <div>
    <TopHeader />
    <div class="flex justify-center items-center">
      <div class="flex bg-black opacity-70 w-full h-full justify-center z-20">
        <div class="flex absolute items-center text-center">
          <h1 class="text-white text-3xl font-bold py-6 drop-shadow-sm">
            Create your catalog
          </h1>
        </div>
      </div>
    </div>
    <div class="flex justify-center bg-black opacity-70">
      <div class="mt-20">
        <ImageSelector @image-selected="addImage" />
        <TextEditorList :images="images" />
      </div>
    </div>

    <!-- Button to open modal -->
    <button class="fixed bottom-10 right-10 py-2 px-2 rounded-full bg-green-500 bg-black text-white" @click="openModal">
      Open to see uploaded images
    </button>

    <!-- Modal -->
    <div class="fixed inset-0 z-50 flex justify-center items-center" v-if="showModal">
      <div class="bg-white rounded-lg p-6">
        <h2 class="text-lg font-semibold mb-4">Image Selector</h2>
        <ImageSelector @image-selected="addImageToEditor" />
        <button class="mt-4 px-4 py-2 rounded-lg bg-red-500 bg-black text-white" @click="closeModal">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import TopHeader from '../components/TopHeader.vue';
import ImageSelector from '../components/ImageSelector.vue';
import TextEditorList from '../components/TextEditorList.vue';
import { mapState, mapMutations } from 'vuex';

export default {
  components: {
    TopHeader,
    TextEditorList,
    ImageSelector,
  },
  computed: {
    ...mapState(['images']),
  },
  data() {
    return {
      showModal: false,
      images: [],
    }
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    addImage(image) {
      this.images.push(image);
    },
    ...mapMutations(['addImage']),
    addImageToStore(image) {
      this.addImage(image);
    },
  },
}
</script>

  