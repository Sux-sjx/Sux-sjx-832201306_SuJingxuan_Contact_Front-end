

<template>
	<div style="width:60%;margin-left:20%;margin-top:10px;">
		<el-card class="box-card">
			<h2 style="text-align:center">修改密码</h2>
			<div style="margin-top:8px;width:60%;margin-left:20%">
				<div>旧密码</div>
				<div style="display:flex">
					<el-input type="password" id="password1"  v-model="password1"  placeholder="请输入密码" ></el-input>
				</div>
			</div>
			<div style="margin-top:8px;width:60%;margin-left:20%">
				<div>新密码</div>
				<div style="display:flex">
					<el-input type="password" id="password2"  v-model="password2"  placeholder="请输入密码" ></el-input>
				</div>
			</div>
			<div style="margin-top:8px;width:60%;margin-left:20%">
				<div>新密码</div>
				<div style="display:flex">
					<el-input type="password" id="password3"  v-model="password3"  placeholder="请输入密码" ></el-input>
				</div>
			</div>
			<div style="margin-top:8px;width:60%;margin-left:20%">
				<el-button type="primary" @click="alterPassword" >提交密码</el-button>
			</div>
		</el-card>
	</div>
</template>

<script>
import $ from 'jquery'
import {utils} from '../assets/listutils.js'
export default {
	components: {
	},
	data() {
		return {
			currentLoginToken:'',
			password1:'',
			password2:'',
			password3:'',
		};
	},
	mounted() {
		this.currentLoginToken=utils.getCookie('loginToken');
	},
	methods:{
		alterPassword(){
			var that = this;
			var password1 =that.password1;
			var password2 =that.password2;
			var password3 =that.password3;
			$.ajax({
				type : 'get',
				url : this.REQUEST_URL+"/alterPwd/alterPassword/submit",
				async: false,
				data : {
					'password1':password1,
					'password2':password2,
					'password3':password3,
					'loginToken':that.currentLoginToken,
				},
				success : function(result) {
					alert(result.msg);
				}
			});
		},
	}
};

</script>
<style scoped>
</style>



