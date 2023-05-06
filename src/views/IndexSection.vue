<template>
  <div>
    <TopHeader />
    <div class="flex justify-center items-center">
      <div class="flex bg-black opacity-70 w-full h-full justify-center z-20">
        <div class="flex absolute items-center text-center">
          <h1 class="text-white text-3xl font-bold py-6 drop-shadow-sm">
            Add an index catalog
          </h1>
        </div>
      </div>
    </div>
    <div>
      <div class="flex justify-center bg-black opacity-70">
        <div class="mt-20">
          <TextEditor />
          <v-button>
            <div class="button-styling text-white font-semibold">
            <router-link :to="{ name: 'CatalogCreator', props: { images: $route.params.images }, query: { step: 3 } }">Go to Catalog Creator</router-link>
            </div>
          </v-button>
        </div>
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
}
</script>


<style>
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