<template>
    <TopHeader />
    <div class="flex justify-center items-center">
        <div class="flex bg-black opacity-70 w-full h-full justify-center z-20">
          <div class="flex absolute items-center text-center">
            <h1 class="text-white text-3xl font-bold my-5 drop-shadow-sm">
              Create your index
            </h1>
          </div>
        </div>
      </div>
    <div class="flex items-center justify-center bg-black opacity-70">
    <div class="sheet editor-container w-2/2 h-1/2">
      <div class="">
          <TextEditor :images="images" :categories="[]" ref="textEditorList"/>
       </div>
     <div class="flex flex-col items-center justify-center mb-56">
            <router-link
             class="button-styling text-white font-semibold"
             :to="{
                    name: 'CatalogCreatorDB',
                    props: { images: $route.params.images },
                    query: { step: 3 }
                  }"
            tag="button"
            >
            Go to Catalog Creator
            </router-link>
          </div>
        </div>
        </div>
  </template>
  
  <script>
  import TopHeader from '../components/TopHeader.vue';
  import TextEditor from '../components/TextEditor.vue';
  
  export default {
    components: {
      TopHeader,
      TextEditor,
    },
    methods: {
      goToCatalogCreatorDB() {
        this.$router.push({
          name: 'CatalogCreatorDB',
          props: { images: this.$route.params.images },
          query: { step: 3 },
        });
      },
    },
  };
  </script>
  
  
  <style scoped>
  /*Sheet margin-top*/
  .sheet {
    margin-top: 4rem;
  }
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