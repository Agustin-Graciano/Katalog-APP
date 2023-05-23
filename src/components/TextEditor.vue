<template>
  <div class="document-editor mt-5 mb-5">
    <div class="document-editor__toolbar bg-white">
      <div class="flex justify-start">
        <button class="text-black bg-white round-lg mx-5" @click="addMainCategory">Add Main Category</button>
        <button class="text-black bg-white mx-5" @click="addSubcategory">Add Subcategory</button>
        <button class="text-black bg-white mx-5" @click="deleteCategory">Delete Category</button>
        <div class="dropdown-container">
          <input type="text" v-model="searchOption" @input="filterProducts" placeholder="DB Search" class="search-input" />
             <div class="dropdown">
               <div v-for="product in computedFilteredProducts" :key="product.productIndex" class="dropdown-item">
                <div class="product-info">
                  <a :href="product.linkUrl">
                   <img :src="product.imageUrl" alt="ProdImg" class="product-image px-2">
                    </a>
                  <h3 class="product-title px-2 center">{{ product.productName }}</h3>
                  <p class="product-price center px-2 center">{{ product.price }} kr.</p>
                  <button class="product-button rounded-xl px-2 center" @click="copyProduct(product)">Copy</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="document-editor__editable-container">
      <div class="document-editor__editable" id="text-editor">
        <div v-for="(category, index) in categories" :key="index" style="margin-bottom: 20px">
          <strong>{{ category.name }}</strong>
          <div v-for="(subCategory, subIndex) in category.subcategories" :key="subIndex" style="margin-left: 20px">
            {{ subCategory.name }}
            <div v-if="subCategory.image"><img :src="subCategory.image" /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import axios from 'axios';

export default {
  data() {
    return {
      currentCategory: null,
      list: this.categories,
      editorInstance: null,
      searchOption: '',
      products: [], // Initialize the products array
      filteredProducts: [], // Renamed the data property
      copiedProduct: null,
    }
  },
  created() {
    // Fetch the products data and assign it to the products array
    axios.get('http://65.109.137.46:5000/api')
      .then(response => {
        this.products = response.data;
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  },
  computed: {
    computedFilteredProducts() {
      const searchTerm = this.searchOption.toLowerCase();
      if (searchTerm === '') {
        return [];
      } else {
        return this.$store.state.products.filter(product => {
          const productName = product.productName.toLowerCase();
          return productName.includes(searchTerm);
        });
      }
    },
    categories() {
      return this.$store.state.categories
  },  
},
  watch: {
    list(cats) {
      
      console.log('categories are changed', cats)
      if (cats)
        this.updateEditor()
    }
  },
  async mounted() {
     this.fetchData();
    
    CKEDITOR.ClassicEditor.create(this.$el.querySelector('.document-editor__editable'), {
                // https://ckeditor.com/docs/ckeditor5/latest/features/toolbar/toolbar.html#extended-toolbar-configuration-format
                toolbar: {
                    items: [
                        'exportPDF','exportWord', '|',
                        'findAndReplace', 'selectAll', '|',
                        'heading', '|',
                        'bold', 'italic', 'strikethrough', 'underline', 'code', 'subscript', 'superscript', 'removeFormat', '|',
                        'bulletedList', 'numberedList', 'todoList', '|',
                        'outdent', 'indent', '|',
                        'undo', 'redo',
                        '-',
                        'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', 'highlight', '|',
                        'alignment', '|',
                        'link', 'insertImage', 'blockQuote', 'insertTable', 'mediaEmbed', 'codeBlock', 'htmlEmbed', '|',
                        'specialCharacters', 'horizontalLine', 'pageBreak', '|',
                        'textPartLanguage', '|',
                        'sourceEditing'
                    ],
                    shouldNotGroupWhenFull: true
                },
                // Changing the language of the interface requires loading the language file using the <script> tag.
                // language: 'es',
                list: {
                    properties: {
                        styles: true,
                        startIndex: true,
                        reversed: true
                    }
                },
                // https://ckeditor.com/docs/ckeditor5/latest/features/headings.html#configuration
                heading: {
                    options: [
                        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                        { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                        { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                        { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
                    ]
                },
                // https://ckeditor.com/docs/ckeditor5/latest/features/editor-placeholder.html#using-the-editor-configuration
                placeholder: 'Welcome to CKEditor 5!',
                // https://ckeditor.com/docs/ckeditor5/latest/features/font.html#configuring-the-font-family-feature
                fontFamily: {
                    options: [
                        'default',
                        'Arial, Helvetica, sans-serif',
                        'Courier New, Courier, monospace',
                        'Georgia, serif',
                        'Lucida Sans Unicode, Lucida Grande, sans-serif',
                        'Tahoma, Geneva, sans-serif',
                        'Times New Roman, Times, serif',
                        'Trebuchet MS, Helvetica, sans-serif',
                        'Verdana, Geneva, sans-serif'
                    ],
                    supportAllValues: true
                },
                // https://ckeditor.com/docs/ckeditor5/latest/features/font.html#configuring-the-font-size-feature
                fontSize: {
                    options: [ 10, 12, 14, 'default', 18, 20, 22 ],
                    supportAllValues: true
                },
                // Be careful with the setting below. It instructs CKEditor to accept ALL HTML markup.
                // https://ckeditor.com/docs/ckeditor5/latest/features/general-html-support.html#enabling-all-html-features
                htmlSupport: {
                    allow: [
                        {
                            name: /.*/,
                            attributes: true,
                            classes: true,
                            styles: true
                        }
                    ]
                },
                // Be careful with enabling previews
                // https://ckeditor.com/docs/ckeditor5/latest/features/html-embed.html#content-previews
                htmlEmbed: {
                    showPreviews: true
                },
                // https://ckeditor.com/docs/ckeditor5/latest/features/link.html#custom-link-attributes-decorators
                link: {
                    decorators: {
                        addTargetToExternalLinks: true,
                        defaultProtocol: 'https://',
                        toggleDownloadable: {
                            mode: 'manual',
                            label: 'Downloadable',
                            attributes: {
                                download: 'file'
                            }
                        }
                    }
                },
                // https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html#configuration
                mention: {
                    feeds: [
                        {
                            marker: '@',
                            feed: [
                                '@apple', '@bears', '@brownie', '@cake', '@cake', '@candy', '@canes', '@chocolate', '@cookie', '@cotton', '@cream',
                                '@cupcake', '@danish', '@donut', '@dragée', '@fruitcake', '@gingerbread', '@gummi', '@ice', '@jelly-o',
                                '@liquorice', '@macaroon', '@marzipan', '@oat', '@pie', '@plum', '@pudding', '@sesame', '@snaps', '@soufflé',
                                '@sugar', '@sweet', '@topping', '@wafer'
                            ],
                            minimumCharacters: 1
                        }
                    ]
                },
                // The "super-build" contains more premium features that require additional configuration, disable them below.
                // Do not turn them on unless you read the documentation and know how to configure them and setup the editor.
                removePlugins: [
                    // These two are commercial, but you can try them out without registering to a trial.
                    // 'ExportPdf',
                    // 'ExportWord',
                    'CKBox',
                    'CKFinder',
                    'EasyImage',
                    // This sample uses the Base64UploadAdapter to handle image uploads as it requires no configuration.
                    // https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/base64-upload-adapter.html
                    // Storing images as Base64 is usually a very bad idea.
                    // Replace it on production website with other solutions:
                    // https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/image-upload.html
                    // 'Base64UploadAdapter',
                    'RealTimeCollaborativeComments',
                    'RealTimeCollaborativeTrackChanges',
                    'RealTimeCollaborativeRevisionHistory',
                    'PresenceList',
                    'Comments',
                    'TrackChanges',
                    'TrackChangesData',
                    'RevisionHistory',
                    'Pagination',
                    'WProofreader',
                    // Careful, with the Mathtype plugin CKEditor will not load when loading this sample
                    // from a local file system (file://) - load this site via HTTP server if you enable MathType.
                    'MathType',
                    // The following features are part of the Productivity Pack and require additional license.
                    'SlashCommand',
                    'Template',
                    'DocumentOutline',
                    'FormatPainter',
                    'TableOfContents'
                ]
              }).then(editor => {
  this.editorInstance = editor;
  console.log('editor created', editor);
  const toolbarContainer = this.$el.querySelector('.document-editor__toolbar');
  toolbarContainer.appendChild(editor.ui.view.toolbar.element);

  window.editor = editor;

  // set the maximum number of lines per sheet
  const MAX_LINES_PER_SHEET = 20;

  // track the current number of lines in the editor
  let currentLineCount = editor.getData().split('\n').length;

  // add a listener for editor changes
  editor.model.document.on('change:data', () => {
    // count the number of lines in the editor
    const lineCount = editor.getData().split('\n').length;

    // if the number of lines has exceeded the maximum
    if (lineCount > currentLineCount + MAX_LINES_PER_SHEET) {
      // create a new sheet
      editor.execute('pageBreak');
      // update the current line count
      currentLineCount = lineCount;
    }
  });

  // load the categories and subcategories from localStorage
  const storedCategories = localStorage.getItem('categories');
  if (storedCategories) {
    const _categories = JSON.parse(storedCategories);
    this.$store.commit('setCategories', _categories);
    this.currentCategory = this.$store.state.categories[0]; // set the current category to the first one
    this.updateEditor();
  }

  editor.model.document.on('change:data', () => {
    this.$store.commit('setEditorData', editor.getData());
  });
  this.editorInstance = editor; // Assign the CKEditor instance to the component property
  });
  },
  methods: {
  exportPDF() {
    if (this.editorInstance) {
      const content = this.editorInstance.getData(); // Get the content from the text editor
      this.$emit('export-pdf', content); // Emit the 'export-pdf' event with the content
    } else {
      console.error('Editor instance is not available.');
      // Handle the case when the editor instance is not available
      // You can display an error message to the user or handle it in any other way.
    }
  },

  copyProduct(product) {
  const copiedText = `${product.imageUrl} ${product.productName} - ${product.price}.kr`;
  navigator.clipboard.writeText(copiedText)
    .then(() => {
      // Optional: Provide feedback to the user (e.g., show a notification)
      // You can use your preferred notification mechanism here
      // For example:
      // this.showNotification('Product copied!');
    })
    .catch((error) => {
      console.error('Failed to copy product:', error);
      // Handle any error that occurred during the copying process
    });
},

  fetchData() {
      // Make the GET request using Axios
      axios
        .get('http://65.109.137.46:5000/api', {
          params: {
            search: this.searchOption, // pass the search option as a query parameter
          },
        })
        .then(response => {
          // Handle the response and update your products data
          const products = response.data;              
      
          // Update your array of objects with the products data
          this.$store.state.products = products.map(product => {
            return {
              imageUrl: `http://65.109.137.46:5000/img/${product.ProductIndex}_0`,
              productIndex: product.ProductIndex,
              productName: product.ProductName,
              price: product.Price,
            };
          });

          // Save the updated products to localStorage
          localStorage.setItem('products', JSON.stringify(this.$store.state.products));

          // Emit the updated products
          this.emitProducts();
        })
        .catch(error => {
          console.error(error);
          // Handle any error that occurred during the request
        });
    },
    store: {
      ...mapMutations(['setCategories'])
    },
    addMainCategory() {
      const name = prompt("Add a main category:");
      if (name) {
        const newCategory = {
          name,
          subcategories: []
        };
        // this.categories.push(newCategory);
        this.$store.commit('addMainCategory', newCategory);
        // this.currentCategory = newCategory;
        // save the categories and subcategories to localStorage
        localStorage.setItem('categories', JSON.stringify(this.$store.state.categories));
        this.updateEditor();
        this.emitCategories();
      }
    },
    addSubcategory() {
      if (this.categories.length === 0) {
        alert("Please add a main category first");
        return;
      }
      const name = prompt("Add subcategory:");
      if (name) {
        const newSubcategory = {
          name
        };
        this.$store.commit('addSubcategory', newSubcategory);
        // this.currentCategory.subcategories.push(newSubcategory);
        // save the categories and subcategories to localStorage
        localStorage.setItem('categories', JSON.stringify(this.$store.state.categories));
        this.updateEditor();
        this.emitCategories();
      }
    },
    // addImage(_subCategory, imageUrl) {
    //   this.categories.map(category => ({
    //     name: category.name,
    //     subcategories: category.subcategories.map(subcategory => {
    //       if (_subCategory !== subcategory.name) {
    //         return subcategory
    //       } else {
    //         return { name: subcategory.name, image: imageUrl }
    //       }
    //     })
    //   }))
    // },
    emitCategories() {
      this.$emit('categories-updated', this.categories);
    },

    updateEditor() {
      console.log('update editor')
      const editorData = this.categories.map(category => {
        let categoryText = `<strong>${category.name}</strong><br>`;
        category.subcategories.forEach(subcategory => {
          categoryText += `${subcategory.name}<br>`;
          if (subcategory.image) 
            categoryText += `<img src="${subcategory.image}" />`
        });
        return categoryText;
      }).join('');
      window.editor.setData(editorData);
      this.emitCategories();
    },

    deleteCategory() {
      const categoryName = prompt("Enter the name of the category to delete:");
       if (categoryName) {
        this.$store.commit('removeCategory', categoryName)
        localStorage.setItem('categories', JSON.stringify(this.categories));
        // update the editor
        this.updateEditor();
        // emit the updated categories
        this.emitCategories();
      }
    },
  },
};
</script>

<style>
.dropdown-container {
  position: relative;
  width: 550px;
  padding: 5px;
}

.search-input {
  width: 100%;
  height: 30px;
  font-size: 16px;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 20;
  width: 550px;
  max-height: 100px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.dropdown-item {
  padding: 8px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f2f2f2;
}

.document-editor__page-indicator {
  font-size: 14px;
  font-weight: bold;
  margin-right: 16px;
}

.product-info {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 40px; /* Adjust the height value as needed */
}

.product-image,
.product-title,
.product-price{
  padding: 0.2em;
}
.product-button {
  padding: 0.2em;
  font-size: 12px;
  justify-items: flex-start;
  color: white;
  background-color: grey;
}
</style>

<style scoped>
.document-editor {
border: 1px solid var(--ck-color-base-border);
border-radius: var(--ck-border-radius);

/* Set vertical boundaries for the document editor. */
max-height: 700px;

/* This element is a flex container for easier rendering. */
display: flex;
flex-flow: column nowrap;
}
.document-editor__toolbar {
/* Make sure the toolbar container is always above the editable. */
z-index: 1;

/* Create the illusion of the toolbar floating over the editable. */
box-shadow: 0 0 5px hsla( 0,0%,0%,.2 );

/* Use the CKEditor CSS variables to keep the UI consistent. */
border-bottom: 1px solid var(--ck-color-toolbar-border);
}

/* Adjust the look of the toolbar inside the container. */
.document-editor__toolbar .ck-toolbar {
border: 0;
border-radius: 1;
}
/* Make the editable container look like the inside of a native word processor application. */
.document-editor__editable-container {
  padding: calc( 2 * var(--ck-spacing-large) );
  background: var(--ck-color-base-foreground);

  /* Make it possible to scroll the "page" of the edited content. */
  overflow-y: scroll;
}

.document-editor__editable-container .ck-editor__editable {
  /* Set the dimensions of the "page". */
  width: 600px;
  min-height: 500px;

  /* Keep the "page" off the boundaries of the container. */
  padding: 1cm 2cm 2cm;

  border: 1px hsl( 0,0%,82.7% ) solid;
  border-radius: var(--ck-border-radius);
  background: white;

  /* The "page" should cast a slight shadow (3D illusion). */
  box-shadow: 0 0 5px hsla( 0,0%,0%,.1 );

  /* Center the "page". */
  margin: 0 auto;
}
/* Set the default font for the "page" of the content. */
.document-editor .ck-content,
.document-editor .ck-heading-dropdown .ck-list .ck-button__label {
  font: 16px/1.6 "Helvetica Neue", Helvetica, Arial, sans-serif;
}
/* Adjust the headings dropdown to host some larger heading styles. */
.document-editor .ck-heading-dropdown .ck-list .ck-button__label {
  line-height: calc( 1.7 * var(--ck-line-height-base) * var(--ck-font-size-base) );
  min-width: 6em;
}

/* Scale down all heading previews because they are way too big to be presented in the UI.
Preserve the relative scale, though. */
.document-editor .ck-heading-dropdown .ck-list .ck-button:not(.ck-heading_paragraph) .ck-button__label {
  transform: scale(0.8);
  transform-origin: left;
}

/* Set the styles for "Heading 1". */
.document-editor .ck-content h2,
.document-editor .ck-heading-dropdown .ck-heading_heading1 .ck-button__label {
  font-size: 2.18em;
  font-weight: normal;
}

.document-editor .ck-content h2 {
  line-height: 1.37em;
  padding-top: .342em;
  margin-bottom: .142em;
}

/* Set the styles for "Heading 2". */
.document-editor .ck-content h3,
.document-editor .ck-heading-dropdown .ck-heading_heading2 .ck-button__label {
  font-size: 1.75em;
  font-weight: normal;
  color: hsl( 203, 100%, 50% );
}

.document-editor .ck-heading-dropdown .ck-heading_heading2.ck-on .ck-button__label {
  color: var(--ck-color-list-button-on-text);
}

/* Set the styles for "Heading 2". */
.document-editor .ck-content h3 {
  line-height: 1.86em;
  padding-top: .171em;
  margin-bottom: .357em;
}

/* Set the styles for "Heading 3". */
.document-editor .ck-content h4,
.document-editor .ck-heading-dropdown .ck-heading_heading3 .ck-button__label {
  font-size: 1.31em;
  font-weight: bold;
}

.document-editor .ck-content h4 {
  line-height: 1.24em;
  padding-top: .286em;
  margin-bottom: .952em;
}

/* Set the styles for "Paragraph". */
.document-editor .ck-content p {
  font-size: 1em;
  line-height: 1.63em;
  padding-top: .5em;
  margin-bottom: 1.13em;
}
/* Make the block quoted text serif with some additional spacing. */
.document-editor .ck-content blockquote {
  font-family: Georgia, serif;
  margin-left: calc( 2 * var(--ck-spacing-large) );
  margin-right: calc( 2 * var(--ck-spacing-large) );
}
.page-container {
  height: 800px; /* adjust as needed */
  overflow: auto; /* enable scrolling when content exceeds container height */
}
</style>