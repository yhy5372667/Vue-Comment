import Vue from "vue";
import Router from "vue-router";
import Home from '../components/Home.vue'
import Login from '../components/Login.vue' 

Vue.use(Router)

export default new Router({
    routes:[
        {
            path:'/',
            redirect:'/login',
            hidden:true,
            component:Login  //常规用法 需要import Home from '../components/Home.vue'
        
        },

        {
            path:'/login',
            name:'Login',
            hidden:true,
            component:Login  //常规用法 需要import Home from '../components/Home.vue'
        
        },

        /* {
        path:'/home',
         component:Home  //常规用法 需要import Home from '../components/Home.vue'
        // component:()=>import('@/components/Home') 路由懒加载实现挂载路由
        // component:resolve => require(['@/components/Home'],resolve) 异步组件实现挂载路由
        }, */
        {
            path:'/home',
            name:'学生管理',
            iconClass:'fa fa-users',
            redirect:'/home/student',
            component:Home,
            children:[
                {
                    path:'/home/student',
                    name:'学生列表',
                    iconClass:'fa fa-list',
                    component:()=> import ('@/components/students/StudentList.vue')
                },
                {
                    path:'/home/infolist',
                    name:'信息列表',
                    iconClass:'fa fa-list-alt',
                    component:()=> import ('@/components/students/InfoList.vue')
                },
                {
                    path:'/home/infomanage',
                    name:'信息管理',
                    iconClass:'fa fa-list-alt',
                    component:()=> import ('@/components/students/InfoManage.vue')
                },
                {
                    path:'/home/worklist',
                    name:'作业列表',
                    iconClass:'fa fa-list-ul',
                    component:()=> import ('@/components/students/WorkList.vue')
                },
                {
                    path:'/home/workmanage',
                    name:'作业管理',
                    iconClass:'fa fa-th-list',
                    component:()=> import ('@/components/students/WorkManage.vue')
                },
            ] 
        },

        {
            path:'/home',
            name:'数据分析',
            iconClass:'fa fa-bar-chart',
            component:Home,
            children:[
                {
                    path:'/home/dataview',
                    name:'数据概览',
                    iconClass:'fa fa-database',
                    component:()=> import ('@/components/dataAnalysis/DataView.vue')
                },
                {
                    path:'/home/mapview',
                    name:'地图概览',
                    iconClass:'fa fa-line-chart',
                    component:()=> import ('@/components/dataAnalysis/MapView.vue')
                },
                {
                    path:'/home/scoremap',
                    name:'分数地图',
                    iconClass:'fa fa-line-chart',
                    component:()=> import ('@/components/dataAnalysis/ScoreMap.vue')
                },
                {
                    path:'/home/travelmap',
                    name:'旅游地图',
                    iconClass:'fa fa-line-chart',
                    component:()=> import ('@/components/dataAnalysis/TravelMap.vue')
                },
            ] 
        },

        {
            path:'/home',
            name:'用户中心',
            iconClass:'fa fa-user',
            component:Home,
            children:[
                {
                    path:'/users/user',
                    name:'权限管理',
                    iconClass:'fa fa-user',
                    component:() => import ('@/components/users/User.vue')
                }
            ]
        },
    ],
    mode:'history'
})