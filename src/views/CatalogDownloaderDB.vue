<template>
    <TopHeader />
    <div id="catalog-downloader"></div>
    <div class="flex justify-center items-center h-screen">
      <div class="flex bg-black opacity-70 w-full h-full justify-center">
        <div class="flex absolute items-center text-center">
          <h1 class="text-white text-3xl font-bold py-6 drop-shadow-sm">
            Merge and download your catalog!
          </h1>
        </div>
        <div class="bg-white border opacity-100 w-full mt-24 rounded-lg lg:w-1/1 h-screen lg:h-96 lg:mx-72">
          <div class="flex justify-center items-center h-full">
            <svg-icon
              class="mb-28"
              type="mdi"
              :path="path"
              style="width: 500px; height: 200px;"
            ></svg-icon>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import TopHeader from '../components/TopHeader.vue';
  import { PDFDocument } from 'pdf-lib';
  
  export default {
    components: {
      TopHeader,
    },
    data() {
      return {
        selectedPDFFiles: [], // Initialize as an empty array
      };
    },
    methods: {
      async mergeAllPDFs(urls) {
        const pdfDoc = await PDFLib.PDFDocument.create();
        const numDocs = urls.length;
  
        for (let i = 0; i < numDocs; i++) {
          const donorPdfBytes = await fetch(urls[i]).then((res) => res.arrayBuffer());
          const donorPdfDoc = await PDFLib.PDFDocument.load(donorPdfBytes);
          const docLength = donorPdfDoc.getPageCount();
  
          for (let k = 0; k < docLength; k++) {
            const [donorPage] = await pdfDoc.copyPages(donorPdfDoc, [k]);
            pdfDoc.addPage(donorPage);
          }
        }
  
        const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
        this.downloadMergedPDF(pdfDataUri);
      },
  
      downloadMergedPDF(dataUri) {
        const link = document.createElement('a');
        link.href = dataUri;
        link.target = '_blank';
        link.download = 'merged_catalog.pdf';
        link.click();
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