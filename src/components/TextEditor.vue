<template>
  <div class="document-editor">
    <div class="document-editor__toolbar">
      <button class=" text-black bg-white round-lg mx-5" @click="addMainCategory">Add Main Category</button>
      <button class=" text-black  bg-white mx-5" @click="addSubcategory">Add Subcategory</button>
      <button class=" text-black bg-white mx-5" @click="deleteCategory">Delete category</button>
    </div>
    <div class="document-editor__editable-container">
      <div class="document-editor__editable">
        <div v-for="(category, index) in categories" 
          :key="index" 
          style="margin-bottom: 20px">
        <div v-for="(category, index) in categories" 
          :key="index" 
          style="margin-bottom: 20px">
          <strong>{{ category.name }}</strong>
          <div v-for="(subCategory, subIndex) in category.subcategories" 
          :key="subIndex" 
          style="margin-left: 20px">
          {{ subCategory.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

export default {
  data() {
    return {
      categories: [],
      currentCategory: null
    }
  },
  mounted() {
    DecoupledEditor.create(this.$el.querySelector('.document-editor__editable'), {
      cloudServices: {
        // A configuration of CKEditor Cloud Services.
        // ...
      },
    })
    .then(editor => {
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
      this.categories = JSON.parse(storedCategories);
      this.currentCategory = this.categories[0]; // set the current category to the first one
      this.updateEditor();
    }
    })
    .catch(err => {
      console.error(err);
    });
  },
  methods: {
    addMainCategory() {
      const name = prompt("Add a main category:");
      if (name) {
        const newCategory = {
          name,
          subcategories: []
        };
        this.categories.push(newCategory);
        this.currentCategory = newCategory;
        // save the categories and subcategories to localStorage
        localStorage.setItem('categories', JSON.stringify(this.categories));
        this.updateEditor();
        this.emitCategories();
      }
    },
    addSubcategory() {
      if (!this.currentCategory) {
        alert("Please add a main category first");
        return;
      }
      const name = prompt("Add subcategory:");
      if (name) {
        const newSubcategory = {
          name
        };
        this.currentCategory.subcategories.push(newSubcategory);
        // save the categories and subcategories to localStorage
        localStorage.setItem('categories', JSON.stringify(this.categories));
        this.updateEditor();
        this.emitCategories();
      }
    },

    emitCategories() {
      this.$emit('categories-updated', this.categories);
    },

    updateEditor() {
      const editorData = this.categories.map(category => {
        let categoryText = `<strong>${category.name}</strong><br>`;
        category.subcategories.forEach(subcategory => {
          categoryText += `${subcategory.name}<br>`;
        });
        return categoryText;
      }).join('');
      window.editor.setData(editorData);
      this.emitCategories();
    },

    deleteCategory() {
      const categoryName = prompt("Enter the name of the category to delete:");
       if (categoryName) {
     for (let i = 0; i < this.categories.length; i++) {
      const category = this.categories[i];
      if (category.name === categoryName) {
        // remove the category and its subcategories
        this.categories.splice(i, 1);
        // save the updated categories to localStorage
        localStorage.setItem('categories', JSON.stringify(this.categories));
        // update the editor
        this.updateEditor();
        // emit the updated categories
        this.emitCategories();
        break;
      }
    }
  }
}
  }
}
</script>

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
  width: 700px;
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