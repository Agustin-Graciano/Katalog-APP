import { createRouter, createWebHistory } from 'vue-router'
import CatalogHome from '../views/CatalogHome.vue'
import PresentationSection from '../views/PresentationSection.vue'
import IndexSection from '../views/IndexSection.vue'
import CatalogCreator from '../views/CatalogCreator.vue'
import TextEditorList from '../components/TextEditorList.vue'

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
      path: '/IndexSection/:id',
      name: 'IndexSection',
      component: IndexSection,
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
  ],
});

export default router;

