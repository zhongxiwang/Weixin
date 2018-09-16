import Vue from 'vue'
import Router from 'vue-router'

const NoticeBulletinItem = (resolve) => import('@/views/NoticeBulletinItem');
const NoticeBulletinInfo = (resolve) => import('@/views/NoticeBulletinInfo');
const OtherItem = (resolve) => import('@/views/OtherItem');
const OtherInfo = (resolve) => import('@/views/OtherInfo');
const FileList = (resolve) => import('@/views/FileList');
const VideoList = (resolve) => import('@/views/VideoList');
const HtmlView = (resolve) => import('@/views/HtmlView');

const WorkList = (restore) => import('@/views/WorkList');
const WorkItem = (resolve) => import('@/views/WorkItem');
const DoSubmit = (resolve) => import('@/views/DoSubmit');

const WorkSearch = (resolve) => import('@/views/WorkSearch');
const WorkViewList = (resolve) => import('@/views/WorkViewList');
const WorkView = (resolve) => import('@/views/WorkView');

const ClearLocal = (resolve) => import('@/views/ClearLocal');


Vue.use(Router)

export default new Router({
  mode: 'hash',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },
  routes: [
    {
      path: '/NoticeBulletinItem/:type',
      name: 'NoticeBulletinItem',
      component: NoticeBulletinItem,
      meta: {
        keepAlive: true, //此组件不需要被缓存
        isBack: false //用于判断上一个页面是哪个
      }
    }, {
      path: '/NoticeBulletinInfo/:type/:id',
      name: 'NoticeBulletinInfo',
      component: NoticeBulletinInfo,
    }, {
      path: '/OtherItem/:type',
      name: 'OtherItem',
      component: OtherItem,
      meta: {
        keepAlive: true, //此组件不需要被缓存
        isBack: false //用于判断上一个页面是哪个
      }
    }, {
      path: '/OtherInfo/:type/:id',
      name: 'OtherInfo',
      component: OtherInfo,
    }, {
      path: '/FileList/:type',
      name: 'FileList',
      component: FileList,
      meta: {
        keepAlive: true,
        isBack: false
      }
    }, {
      path: '/VideoList/:type',
      name: 'VideoList',
      component: VideoList,
      meta: {
        keepAlive: true,
        isBack: false
      }
    }, {
      path: '/HtmlView',
      name: 'HtmlView',
      component: HtmlView
    }, {
      path: '/WorkList/:type',
      name: 'WorkList',
      component: WorkList,
      meta: {
        keepAlive: true,
        isBack: false
      }
    }, {
      path: '/WorkItem/:type/:iid/:wiid/:nwiid/:step',
      name: 'WorkItem',
      component: WorkItem,
      meta: {
        keepAlive: true,
        isBack: false
      }
    }, {
      path: '/DoSubmit/:type/:iid/:wiid',
      name: 'DoSubmit',
      component: DoSubmit,
    }, {
      path: '/WorkSearch/:type',
      name: 'WorkSearch',
      component: WorkSearch,
      meta: {
        keepAlive: true,
        isBack: false
      }
    }, {
      path: '/WorkViewList/:type/:where',
      name: 'WorkViewList',
      component: WorkViewList,
      meta: {
        keepAlive: true,
        isBack: false
      }
    }, {
      path: '/WorkView/:type/:iid',
      name: 'WorkView',
      component: WorkView,
    }, {
      path: '/ClearLocal',
      name: 'ClearLocal',
      component: ClearLocal
    }
  ]
})
