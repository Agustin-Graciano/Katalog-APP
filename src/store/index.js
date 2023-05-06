import { createApp } from 'vue';
import { createStore } from 'vuex';

const store = createStore({
  state: {
    images: [],
  },
  mutations: {
    addImages(state, newImages) {
      state.images = [...state.images, ...newImages];
      console.log('New images added to store:', state.images);
    },
  },
  actions: {
    addImages({ commit }, newImages) {
      const imagesWithNames = newImages.map(image => ({
        name: image.name,
        url: URL.createObjectURL(image)
      }));
      commit('addImages', imagesWithNames);
    },
  },
});


const app = createApp({ /* your root component */ });

app.use(store);

export default store;
