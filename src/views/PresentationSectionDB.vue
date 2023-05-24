<template>
    <TopHeader />
    <div class="flex justify-center items-center">
      <div class="flex bg-black opacity-70 w-full h-full justify-center z-10">
        <div class="flex absolute items-center text-center">
          <h1 class="text-white text-3xl font-bold py-6 drop-shadow-sm">
            Add a catalog presentation
          </h1>
        </div>
      </div>
    </div>
    <div id="presentation-section" class="flex items-center justify-center bg-black opacity-70">
      <div class="sheet editor-container w-2/3 h-1/2">
        <div class="flex flex-col items-center justify-center mb-36">
          <div class="w-96 h-96 bg-white rounded-lg flex items-center justify-center mb-8">
            <img v-if="selectedImage" 
                 :src="selectedImage" 
                 class="w-full h-full object-contain rounded-lg"
            />
              <div v-else class="text-gray-500 font-bold text-4xl relative">
             <div class="absolute inset-10 rounded-full shadow-lg"></div>
            <div class="relative z-10 flex items-center justify-center w-full h-full">+</div>
           </div>
          </div>
          <input ref="fileInput" 
                 type="file"
                 class="hidden"
                 @change="onFileSelected" 
                 accept="image/*" 
           />
           <v-button 
                class="button-styling text-white font-semibold -mt-5 mb-4" 
                @click="$refs.fileInput.click()">
                Add Presentation Image
           </v-button>
           <div class="flex inline-row space-x-2">
           <v-button   v-if="selectedImage"
                      class="button-styling text-white font-semibold"
                      @click="goToIndexDB">
                      Go to Index
           </v-button>
           <v-button
                v-if="selectedImage"
                class="button-styling text-white font-semibold"
                @click="downloadPDF"
                >
               <svg-icon type="mdi" :path="path"></svg-icon>
         </v-button>
         </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import TopHeader from '../components/TopHeader.vue';
  import jsPDF from 'jspdf';
  import html2canvas from 'html2canvas';
  import { mapMutations } from 'vuex';
  import SvgIcon from '@jamescoyle/vue-icon';
  import { mdiDownload } from '@mdi/js';

  export default {
    components: {
      TopHeader,
      SvgIcon,
    },
    data() {
      return {
        selectedImage: null,
        path: mdiDownload,
      };
    },
    methods: {
      ...mapMutations(['setPdfData']),
      onFileSelected(event) {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.selectedImage = reader.result;
          localStorage.setItem('selectedImage', this.selectedImage);
        };
      },
      downloadPDF() {
  const selectedImage = localStorage.getItem('selectedImage');
  if (!selectedImage) {
    console.error('No image selected');
    return;
  }

  const pdf = new jsPDF();

  const presentationImage = document.querySelector('#presentation-section .sheet .bg-white img');
  if (!presentationImage) {
    console.error('Presentation image not found');
    return;
  }

  const scaleRatio = 2; // Increase the scale ratio for better image quality
  const canvasWidth = presentationImage.clientWidth * scaleRatio;
  const canvasHeight = presentationImage.clientHeight * scaleRatio;

  html2canvas(presentationImage, { useCORS: true, scale: scaleRatio })
    .then((canvas) => {
      const imageData = canvas.toDataURL('image/jpeg', 1.0); // Increase the image quality by setting a higher JPEG quality
      pdf.addImage(imageData, 'JPEG', 10, 10, 190, 266);
      pdf.save('presentation.pdf'); // Save the PDF file with a specified name
    })
    .catch((error) => {
      console.error('Error generating PDF:', error);
    });
},
      goToIndexDB() {
        const step = this.$route.query.step;
        if (step === '2') {
          this.$router.push({
            name: 'IndexSectionDB',
            params: { id: 0 },
            query: { step: 3 },
          });
        }
      },
    },
  };
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