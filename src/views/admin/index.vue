

<template>
	<div>
		<el-container class="layout-container-demo" style="height: 1020px">
			<el-aside width="200px">
				<el-scrollbar>
					<h4 style="text-align:center"><a  href="javascript:void(0)" style="color:rgb(255, 255, 255)">通讯录管理系统</a></h4>
					<hr style="border-bottom: 0px;border-top: 1px solid gray;margin-top:2px;">
						<el-menu  @select="gotoIframePage"
							background-color="#545c64"
							text-color="#fff"
							active-text-color="#5fffde">
							<el-menu-item :index="'/admin/user/list'">
								用户管理
							</el-menu-item>
						</el-menu>
					</el-scrollbar>
				</el-aside>
				<el-container>
					<el-header style="text-align: right; font-size: 12px">
						<div class="toolbar">
							<h3 style="margin-right:30px;">欢迎您，{{loginName}}！</h3>
							<h3 style="margin-right:30px;">
								<a href="javascript:void(0)" @click="alterPassword">
									修改密码
								</a>
							</h3>
							<h3 style="margin-right:30px;">
								<a href="javascript:void(0)" @click="logout">
									退出
								</a>
							</h3>
						</div>
					</el-header>
					<el-main>
						<el-scrollbar>
							<iframe  id="iframeDom" style=" width: 101%; height:910px; border:0px ;"    src="/admin/user/list"></iframe>
						</el-scrollbar>
					</el-main>
				</el-container>
			</el-container>
		</div>
	</template>
	
<script>
import $ from 'jquery'
import {utils} from '../../assets/listutils.js'
import {admin_utils} from '../../assets/admin/admin_utils.js'
export default {
	components: {
	},
	data() {
		return {
			loginId:'',
			loginName:'',
			loginToken:'',
			loginType:'',
			user:{},
		};
	},
	mounted() {
		this.loginId=utils.getCookie('loginId');
		this.loginName=utils.getCookie('loginName');
		this.loginToken=utils.getCookie('loginToken');
		this.loginType=utils.getCookie('loginType');
		this.getInitData();
		this.checkIsLogin();
	},
	methods:{
		handleExportJsMethod(e){
			var div = e.currentTarget;
			var methodtype = div.dataset.methodtype;
			if(methodtype=='clickMenu'){
				admin_utils.clickMenu(div);
			}
		},
		gotoIframePage(index, indexPath){
			var that = this;
			$('#iframeDom').attr('src', index);
			$("#page-container").removeClass("sidebar-o-xs");
		},
		alterPassword(){
			var that = this;
			$('#iframeDom').attr('src', '/alter_password');
			$("#page-container").removeClass("sidebar-o-xs");
		},
		goPageFunc(e){
			var that = this;
			var url =e.currentTarget.dataset.url;
			$('#iframeDom').attr('src', url);
		},
		logout(){
			var that = this;
			$.ajax({
				type: 'post',
				url: this.REQUEST_URL+"/login/sys_logout",
				data: {
					"token":that.loginToken
				},
				success: function(result) {
					if(result.code==1){
						that.goToPageJS('/sys_login','');
						}else{
						alert(result.msg);
					}
				}
			});
		},
		getInitData(){
			var that = this;
			$.ajax({
				dataType:"json",
				type:"post",
				url:this.REQUEST_URL+"/admin/index/getInitData",
				data:{
					"loginToken":that.loginToken
				},
				success:function (data,textStatus, jqXHR)  {
					var statusCode = jqXHR.status;
					if(statusCode!=200){
						that.goToPageJS('/sys_login','');
					}
					if(data.code!=undefined&&data.code==0){
						alert(data.msg);
						that.goToPageJS('/sys_login','');
					}
					that.user = data.user;
				},
				error: function(jqXHR, textStatus, errorThrown) {
					that.goToPageJS('/sys_login','');
				}
			})
		},
		checkIsLogin(){
			var that = this;
			$.ajax({
				type : 'get',
				url : this.REQUEST_URL+"/login/checkIsLogin",
				async: false,
				data : {
					"loginToken":that.loginToken,
				},
				success : function(result) {
					if(result.code==0) {
						that.goToPageJS('/sys_login','');
					}
				}
			});
		},
	}
};

</script>
	<style scoped>
		a{
		text-decoration: none;
		}
		.layout-container-demo .el-header {
		position: relative;
		background-color: #bec0c5;
		color: var(--el-text-color-primary);
		}
		.layout-container-demo .el-aside {
		color: var(--el-text-color-primary);
		background: #545c64;
		border:1px solid rgb(179, 175, 175);
		padding:10px;
		}
		.layout-container-demo .el-menu {
		border-right: none;
		}
		.layout-container-demo .el-main {
		padding: 0;
		margin-top:40px
		}
		.layout-container-demo .toolbar {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		right: 20px;
		}
	</style>



