/*
 * 路由js文件
 * @create liurongtang 2018/07/08
*/
import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import HomeContent from './views/HomeContent.vue'
import AgentContent from './views/AgentContent.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import echarts from './views/charts/echarts.vue'
import UserForms from './views/UserForms.vue'
import DlsUserForms from './views/UserForms.vue'
import NewForm from './views/NewForm.vue'
import Notice from './views/Notice.vue'
import AgentHome from './views/AgentHome.vue'
import AgentManager from './views/AgentManager.vue'
import materialMaintenance from './views/materialMaintenance.vue'
import materialInformation from './views/materialInformation.vue'
import Reports from './views/Reports.vue'
import ConditionQuotation from './views/ConditionQuotation.vue'
import changePassword from './views/changePassword.vue'
import Homepage from './views/Homepage.vue'
import DlschangePassword from './views/changePassword.vue'

let routes = [
    {
        path: '/login/:tname',
        component: Login,
        name: '',
        hidden: true,
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    
    {
        path: '/',
        component: Home,
        name: '工作中心',
        iconCls: 'workMenuIcon',//图标样式class
        children: [
            { path: '/Notice/:noticeType/:noticeStatus/:searchStr', component: Notice, name: '收件-已处理', hidden: true, statisUrl:'/Notice/收件/已处理/0' },
            { path: '/Notice/:noticeType/:noticeStatus/:searchStr', component: Notice, name: '收件-待处理', hidden: true, statisUrl:'/Notice/收件/待处理/0' },
            { path: '/Notice/:noticeType/:noticeStatus/:searchStr', component: Notice, name: '通知', hidden: true, statisUrl:'/Notice/通知/0/0' },
            { path: '/Notice/:noticeType/:noticeStatus/:searchStr', component: Notice, name: '原稿', hidden: true, statisUrl:'/Notice/原稿/0/0' },
            { path: '/NewForm/:name/:id/:nr', component: NewForm, name: '发布公告', hidden: true, statisUrl:'/NewForm/公告/0/0' },
            { path: '/main', component: Main, name: '主页', hidden: true, statisUrl:'/main' },
            { path: '/HomeContent', component: HomeContent, name: '主页内容', hidden: true, statisUrl:'/HomeContent' },
           
            { path: '/agentmanager/:fromId', component: AgentManager, name: '代销商管理', statisUrl:'/agentmanager/0' },
            { path: '/ConditionQuotation/:id', component: ConditionQuotation, name: '空调报价', statisUrl:'/ConditionQuotation/0' },
            { path: '/changePassword', component: changePassword, name: '密码修改', statisUrl:'/changePassword' },
            { path: '/userforms/:viewname/:isShowSearch/:searchStr', component: UserForms, name: '物资分类信息', statisUrl:'/userforms/物资分类信息/0/0' }, //statisUrl 表示静态URL
        ]
    },
    {
        path: '/',
        component: Home,
        name: '主数据管理',
        iconCls: 'workMenuIcon',//图标样式class
        children: [
            { path: '/materialMaintenance', component: materialMaintenance, name: '物资分类维护', statisUrl:'/materialMaintenance',
            children:[
                { path: '/materialMaintenance/NewForm/:name/:id/:nr', component: NewForm, name: '物资分类维护', statisUrl:'/materialMaintenance/NewForm/物资分类维护/0/0'},
            ]
           },
           { path: '/materialInformation', component: materialInformation, name: '物资信息维护', statisUrl:'/materialInformation',
           children:[
               { path: '/materialInformation/userforms/:viewname/:isShowSearch/:searchStr', component: UserForms, name: '物资信息维护', statisUrl:'/userforms/物资信息维护/1/WZFLMC=标准'},
           ]
          },
          { path: '/materialInformation', component: materialInformation, name: '物资信息维护', statisUrl:'/materialInformation',
          children:[
              { path: '/materialInformation/NewForm/:name/:id/:nr', component: NewForm, name: '物资信息维护', statisUrl:'/materialInformation/NewForm/物资信息维护/0/0'},
          ]
         },
          { path: '/userforms/:viewname/:isShowSearch/:searchStr', component: UserForms, name: '物资价格维护', statisUrl:'/userforms/物资价格维护/0/0' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '账号管理',
        iconCls: 'accountMenuIcon',
        children: [
            { path: '/table', component: Table, name: 'Table', statisUrl:'/table' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '销售管理',
        iconCls: 'recieveMenuIcon',
        children: [
            { path: '/userforms/:viewname/:isShowSearch/:searchStr', component: UserForms, name: '提货计划', statisUrl:'/userforms/提货计划/0/0' },
            { path: '/userforms/:viewname/:isShowSearch/:searchStr', component: UserForms, name: '提货订单', statisUrl:'/userforms/提货订单/0/0' }, 
            { path: '/userforms/空调配置表/:isShowSearch/:searchStr', template: UserForms, name: '空调配置表', statisUrl:'/userforms/空调配置表/0/0' },
            { path: '/userforms/地暖配置表/:isShowSearch/:searchStr', component: UserForms, name: '地暖配置表', statisUrl:'/userforms/地暖配置表/0/0' },
            { path: '/userforms/外机选型/:isShowSearch/:searchStr', component: UserForms, name: '外机选型', statisUrl:'/userforms/外机选型/0/0' },
            { path: '/userforms/系统组件/:isShowSearch/:searchStr', component: UserForms, name: '系统组件', statisUrl:'/userforms/系统组件/0/0' }
    ]
    },
    {
        path: '/',
        component: Home,
        name: '项目登录',
        iconCls: 'loginMenuIcon',
        children: [
            { path: '/user', component: user, name: '列表', statisUrl:'/user' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '服务管理',
        iconCls: 'serviceMenuIcon',
        children: [
            { path: '/form', component: Form, name: 'Form', statisUrl:'/form' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '报表分析',
        iconCls: 'chartsMenuIcon',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts', statisUrl:'/echarts'},
            { path: '/Reports/:reponame', component: Reports, name: '', statisUrl:'/Reports'}
        ]
    },
    {
        path: '/AgentHome',
        component: AgentHome,
        name: '首页',
        iconCls: 'workMenuIcon',
        children: [
            { path: '/dlsuserforms/:viewname/:isShowSearch/:searchStr', 
              component: DlsUserForms, 
              name: '项目登录', 
              statisUrl:'/dlsuserforms/项目登录/0/0'
            },
            { path: '/AgentContent', component: AgentContent, name: '主页内容', hidden: true, statisUrl:'/AgentContent' },
            { path: '/Homepage', component: Homepage, name: '主页内容', hidden: true, statisUrl:'/Homepage' },
            { path: '/dlschangePassword', component: DlschangePassword, name: '修改密码', hidden: true, statisUrl:'/dlschangePassword' },
        ]
    },
    {
        path: '/AgentHome',
        component: NewForm,
        name: '首页',
        iconCls: 'workMenuIcon',//图标样式class
        children: [
            {
                path: '/materialInformation2',
                component: materialInformation,
                name: '物资信息维护',
                statisUrl: '/materialInformation'
            }]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];
export default routes;