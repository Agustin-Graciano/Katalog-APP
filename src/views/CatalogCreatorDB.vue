<template>
  <TopHeader />
  <div class="flex justify-center items-center">
    <div class="flex bg-black opacity-70 w-full h-full justify-center z-20">
      <div class="flex absolute items-center text-center">
        <h1 class="text-white text-3xl font-bold my-5 drop-shadow-sm">
          Create your catalog
        </h1>
      </div>
    </div>
  </div>
  <div class="flex items-center justify-center bg-black opacity-70">
  <div class="sheet editor-container w-2/2 h-1/2">
  <div class="">
      <TextEditorList :images="images" :categories="[]" ref="textEditorList"/>
   </div>
   <div class="flex flex-col items-center justify-center my-5 mb-28">
  <button
    class="button-styling text-white font-semibold"
    @click="redirectToPage()"
  >
    Go to Finish Catalog
  </button>
     </div>
    </div>
  </div>
</template>

<script>
import TopHeader from '../components/TopHeader.vue';
import ImageSelector from '../components/ImageSelector.vue';
import TextEditorList from '../components/TextEditorList.vue';
import { mapState, mapMutations } from 'vuex';
import jsPDF from 'jspdf';

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
  redirectToPage() {
      window.location.href = "https://tools.pdf24.org/en/merge-pdf";
    },
  openModal() {
    this.showModal = true;
  },
  closeModal() {
    this.showModal = false;
  },
  addImage(image) {
    this.images.push(image);
    console.log('add image function')
  },
  ...mapMutations(['addImage']),
  addImageToStore(image) {
    this.addImage(image);
  },
  addImageToEditor(imageUrl) {
    this.$store.commit('setImage', imageUrl)
    console.log('add image to editor', imageUrl, this.$refs.textEditorList)
  },
  async downloadAsPdf() {
    // Create a new jsPDF instance
    const pdf = new jsPDF();
    // Wait for the next tick to ensure that the ref is available
    await this.$nextTick();
    // Access the ref and call the getContent method
    const content = this.$refs.textEditorList.getContent();
    // Convert the content to PDF format
    pdf.text(content, 10, 10); // Adjust the position and styling as needed
    // Save the PDF file
    pdf.save('catalog.pdf');
  },
},
}
</script>

<style scoped>
/*Sheet margin-top*/
.sheet {
margin-top: 5rem;
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
