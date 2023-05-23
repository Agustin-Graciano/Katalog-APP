<template>
    <div class="document-editor">
      <div class="document-editor__toolbar">
      <!--   <input type="text" v-model="selectedSubcategory" placeholder="Enter subcategory name">
        <button class="text-black bg-white round-lg mx-5" @click="addImageToCKEditor">Add Image to Subcategory</button> -->
      </div>
      <div class="document-editor__editable-container">
        <div class="document-editor__editable">
          <TextEditor ref="textEditor" :categories="categoriesData" @categories-updated="updateCategories" @text-editor-insert-block="addBlock" />
          <ImageSelector @image-selected="handleImageSelected"/>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import TextEditor from '../components/TextEditor.vue';
  import ImageSelector from './ImageSelector.vue';
  
  export default {
    components: {
      TextEditor,
      ImageSelector,
    },
    data() {
      return {
        categoriesData: [],
        selectedSubcategory: '',
        showImageSelector: false,
        files: [],
        currentPageIndicator: '',
        subcategories: [],
        selectedImage: null,
      };
    },
    props: {
      categories: {
        type: Array,
        required: true,
      },
      images: {
        type: Array,
        default: () => [],
      },
    },
    methods: {
      handleImageSelected(imageUrl) {
        this.selectedImage = imageUrl;
        console.log('handle image selected')
      },
      updateCategories(categories) {
        this.categoriesData = [
          { category: 'Product Categories', subcategory: '' },
          ...categories.map((category) => ({
            category: category.name,
            subcategory: category.subcategories
              .map((subcategory) => subcategory.name)
              .join(','),
          })),
        ];
      },
      addImageToCKEditor() {
        console.log('Adding image to editor')
        const editor = window.editor;
        const selection = editor.model.document.selection;
  
        // if (selection.isCollapsed) {
        //   alert('Please select a block to insert the image into.');
        //   return;
        // }
        if(!this.$store.state.image || !this.selectedSubcategory) {
          alert('Please select an image to insert.');
          return;
        }
        this.$store.commit('addImage2SubCategory', this.selectedSubcategory)
        console.log(this.$store.state.categories) 
        localStorage.setItem('categories', JSON.stringify(this.$store.state.categories));
        this.updateCategories(this.$store.state.categories)
        // return
        // if (!this.selectedImage) {
        //   alert('Please select an image to insert.');
        //   return;
        //}
  
        // const imageElement = new editor.model.contentDomParser.parseFragment(`<img src="${this.selectedImage}" alt=""/>`).firstChild;
        const imageElement = new editor.model.contentDomParser.parseFragment(`<img src="${this.$store.state.image}" alt=""/>`).firstChild;
  
        const insertIndex = selection.getFirstPosition().parentOffset;
        const parent = selection.getFirstPosition().parent;
  
        editor.model.insertContent(imageElement, parent, insertIndex);
  
        this.selectedImage = null;
      },
      getContent() {
        const textEditor = this.$refs.textEditor; // Assuming you have a ref named "textEditor" on the TextEditor component
  
        // Access the editor instance and get the content
        const editorContent = textEditor.getEditorContent();
  
        return editorContent;
      }
    },
    mounted() {
      return
      const toolbarContainer = this.$el.querySelector('.document-editor__toolbar');
      const editableContainer = this.$el.querySelector('.document-editor__editable');
  
      // DecoupledEditor.create(editableContainer, {
      //   cloudServices: {
      //     // A configuration of CKEditor Cloud Services.
      //     // ...
      //   },
      // })
      //   .then((editor) => {
      //     toolbarContainer.appendChild(editor.ui.view.toolbar.element);
  
      //     const MAX_LINES_PER_SHEET = 20;
      //     let currentLineCount = editor.getData().split('\n').length;
  
      //     editor.model.document.on('change:data', () => {
      //       const lineCount = editor.getData().split('\n').length;
  
      //       if (lineCount > currentLineCount + MAX_LINES_PER_SHEET) {
      //         editor.execute('pageBreak');
      //         currentLineCount = lineCount;
      //       }
      //     });
  
      //     const editorData = this.categoriesData
      //       .map((category) => {
      //         let categoryText = `<strong>${category.category}</strong><br>`;
      //         categoryText += `${category.subcategory}<br>`;
      //         return categoryText;
      //       })
      //       .join('');
      //     editor.setData(editorData);
  
      //     editor.editing.view.document.on('focus', () => {
      //       const { lineNumber, columnNumber } = editor.model.document.selection.getFirstPosition();
  
      //       const currentPageNumber = Math.ceil(lineNumber / MAX_LINES_PER_SHEET);
  
      //       const pageIndicator = toolbarContainer.querySelector('.document-editor__page-indicator');
      //       pageIndicator.innerHTML = `Page ${currentPageNumber}`;
  
      //       editor.editing.view.document.on('blur', () => {
      //         pageIndicator.innerHTML = '';
      //       });
      //     });
  
      //     this.categoriesData = [{ category: 'Categories', subcategory: '' }, ...this.categories.map((category) => ({ category: category.name, subcategory: category.subcategories.map((subcategory) => subcategory.name).join('\n') }))];
  
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //   });
    },
  };
  </script>
    
    <style>
    .document-editor__page-indicator {
      font-size: 14px;
      font-weight: bold;
      margin-right: 16px;
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