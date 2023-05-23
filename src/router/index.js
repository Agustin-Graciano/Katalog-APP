import { createRouter, createWebHistory } from 'vue-router'
import CatalogHome from '../views/CatalogHome.vue'
import PresentationSection from '../views/PresentationSection.vue'
import PresentationSectionDB from '../views/PresentationSectionDB.vue'
import IndexSection from '../views/IndexSection.vue'
import IndexSectionDB from '../views/IndexSectionDB.vue'
import CatalogCreator from '../views/CatalogCreator.vue'
import CatalogCreatorDB from '../views/CatalogCreatorDB.vue'
import TextEditorList from '../components/TextEditorList.vue'
import CatalogDownloader from '../views/CatalogDownloader.vue'
import CatalogDownloaderDB from '../views/CatalogDownloaderDB.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'CatalogHome',
      component: CatalogHome,
    },
    {
      path: '/PresentationSection',
      name: 'PresentationSection',
      component: PresentationSection,
      props: true // Enables passing props to the component
    },
    {
      path: '/PresentationSectionDB',
      name: 'PresentationSectionDB',
      component: PresentationSectionDB,
      props: true // Enables passing props to the component
    },
    {
      path: '/IndexSection/:id',
      name: 'IndexSection',
      component: IndexSection,
      props: true // Enables passing props to the component
    },
    {
      path: '/IndexSectionDB/:id',
      name: 'IndexSectionDB',
      component: IndexSectionDB,
      props: true // Enables passing props to the component
    },
    {
      path: '/CatalogCreator',
      name: 'CatalogCreator',
      component: CatalogCreator,
      props: (route) => ({ images: route.params.images }),
      children: [
        {
          path: 'text-editor-list',
          name: 'TextEditorList',
          component: TextEditorList,
          props: true
        }
      ]
    },
    {
      path: '/CatalogCreatorDB',
      name: 'CatalogCreatorDB',
      component: CatalogCreatorDB,
      props: (route) => ({ images: route.params.images }),
      children: [
        {
          path: 'text-editor-list',
          name: 'TextEditorList',
          component: TextEditorList,
          props: true
        }
      ]
    },
    {
      path: '/CatalogDownloader',
      name: 'CatalogDownloader',
      component: CatalogDownloader,
      props: true // Enables passing props to the component
    },
    {
      path: '/CatalogDownloaderDB',
      name: 'CatalogDownloaderDB',
      component: CatalogDownloaderDB,
      props: true // Enables passing props to the component
    },
  ],
});

export default router;

