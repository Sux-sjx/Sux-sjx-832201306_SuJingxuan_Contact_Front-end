import { createRouter, createWebHistory } from 'vue-router'
	import sys_login from '../views/sys_login.vue';
	import user_regist from '../views/user_regist.vue';
	import admin_index from '../views/admin/index.vue';
	import user_index from '../views/user/index.vue';
	import admin_user_list from '../views/admin/user/list.vue';
	import user_contact_list from '../views/user/contact/list.vue';
	import user_personal from '../views/user/personal.vue';
	import alter_password from '../views/alter_password.vue';
	import admin_user_add from '../views/admin/user/add_page.vue';
	import admin_user_update from '../views/admin/user/update_page.vue';
	import user_user_update1 from '../views/user/user/update1_page.vue';
	import user_contact_add from '../views/user/contact/add_page.vue';
	import user_contact_update from '../views/user/contact/update_page.vue';
	const  routes= [
{
	path: '/',
	component: sys_login,
	name:'sys_login0',
meta:{auth:true}
},
{
	path: '/sys_login',
	component: sys_login,
	name:'sys_login',
meta:{auth:true}
},
{
	path: '/user_regist',
	component: user_regist,
	name:'user_regist',
meta:{auth:true}
},
{
	path: '/admin/index',
	component: admin_index,
	name:'admin_index',
meta:{auth:true}
},
{
	path: '/user/index',
	component: user_index,
	name:'user_index',
meta:{auth:true}
},
{
	path: '/admin/user/list',
	component: admin_user_list,
	name:'admin_user_list',
meta:{auth:true}
},
{
	path: '/user/contact/list',
	component: user_contact_list,
	name:'user_contact_list',
meta:{auth:true}
},
{
	path: '/user/personal',
	component: user_personal,
	name:'user_personal',
meta:{auth:true}
},
{
	path: '/alter_password',
	component: alter_password,
	name:'alter_password',
meta:{auth:true}
},
{
	path: '/admin/user/add_page',
	component: admin_user_add,
	name:'admin_user_add',
meta:{auth:true}
},
{
	path: '/admin/user/update_page',
	component: admin_user_update,
	name:'admin_user_update',
meta:{auth:true}
},
{
	path: '/user/user/update1_page',
	component: user_user_update1,
	name:'user_user_update1',
meta:{auth:true}
},
{
	path: '/user/contact/add_page',
	component: user_contact_add,
	name:'user_contact_add',
meta:{auth:true}
},
{
	path: '/user/contact/update_page',
	component: user_contact_update,
	name:'user_contact_update',
meta:{auth:true}
},
]
const router = createRouter({
	mode: 'history', // 设置为history模式
	history:createWebHistory(),
	base: process.env.BASE_URL,
	routes
})
export default router
