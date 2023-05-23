import { createApp } from 'vue';
import { createStore } from 'vuex';

const store = createStore({
  state: {
    images: [],
    categories: [],
    currentCategory: -1,
    image: '',
    pdfData: null,
    textEditorContent: '',
  },
  mutations: {
    setProducts(state, products) {
        state.products = products;
    },
    setPdfData(state, data) {
      state.pdfData = data;
    },
    setSelectedImage(state, image) {
      state.image = image;
    },
    setTextEditorContent(state, content) {
      state.textEditorContent = content;
    },
    addImages(state, newImages) {
      state.images = [...state.images, ...newImages];
      console.log('New images added to store:', state.images);
    },
    setCategories(state, categories) {
      state.categories = categories
      state.currentCategory = categories.length - 1;
    },
    deleteCategory(state, category) {

    },
    addMainCategory(state, category) {
      state.currentCategory ++;
      state.categories.push(category)
    },
    addSubcategory(state, subCategory) {
      state.categories[state.currentCategory].subcategories.push(subCategory)
    },
    addImage2SubCategory(state, _subCategory) {
      state.categories = state.categories.map(category => ({
        name: category.name,
        subcategories: category.subcategories.map(subcategory => {
          if (_subCategory !== subcategory.name) {
            return subcategory
          } else {
            console.log('found sub category', subcategory)
            return { name: subcategory.name, image: state.image }
          }
        })
      }))
      state.image = ''
    },
    removeCategory(state, name) {
      for (let i = 0; i < state.categories.length; i++) {
        if (state.categories[i].name === name) {
          // remove the category and its subcategories
          state.categories.splice(i, 1);
          state.currentCategory --;
          break;
        }
      }
    }
  },
  actions: {
    addImages({ commit }, newImages) {
      const imagesWithNames = newImages.map(image => ({
        name: image.name,
        url: URL.createObjectURL(image)
      }));
      commit('addImages', imagesWithNames);
    },
    initCategories () {
      // const storedCategories = localStorage.getItem('categories');
      // if (storedCategories) {
      //   this.categories = JSON.parse(storedCategories);
      //   this.currentCategory = this.categories[0]; // set the current category to the first one
      //   this.updateEditor();
      // }
    },
    setCategories() {

    },
    addMainCategory() {

    },
    addSubCategory() {

    },
  },
});


const app = createApp({ /* your root component */ });

app.use(store);

export default store;
