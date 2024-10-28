

<template>
	<div  style="width:70%;margin-left:5%;margin-top:10px;">
		<el-card class="box-card">
			<template #header>
				<div class="card-header">
					<span>用户-修改</span>
				</div>
			</template>
			<div style="margin-top:8px;width:45%;margin-left:2%;"   id="loginNameForm">
				<div>登录名</div>
				<div style="display:flex">
					<div style="width:100%">
						<el-input type="text"  placeholder="请输入登录名" name="loginName" v-model="loginName" class="" id="loginName"></el-input>
					</div>
				</div>
			</div>
			<div style="margin-top:8px;width:45%;margin-left:2%;"   id="passwordForm">
				<div>密码</div>
				<div style="display:flex">
					<div style="width:100%">
						<el-input type="password"  placeholder="请输入密码" name="password" v-model="password" class="" id="password"></el-input>
					</div>
				</div>
			</div>
			<div style="margin-top:8px;width:45%;margin-left:2%;"   id="realNameForm">
				<div>姓名</div>
				<div style="display:flex">
					<div style="width:100%">
						<el-input type="text"  placeholder="请输入姓名" name="realName" v-model="realName" class="" id="realName"></el-input>
					</div>
				</div>
			</div>
			<div style="margin-top:8px;width:45%;margin-left:2%;"   id="celPhoneForm">
				<div>联系电话</div>
				<div style="display:flex">
					<div style="width:100%">
						<el-input type="text"  placeholder="请输入联系电话" name="celPhone" v-model="celPhone" class="" id="celPhone"></el-input>
					</div>
				</div>
			</div>
			<div style="margin-top:8px;width:60%;margin-left:2%">
				<el-button type="primary" @click="submitData" >提交</el-button>
				<el-button type="default" onclick="javascript:history.back(-1);"  >返回</el-button>
			</div>
		</el-card>
	</div>
</template>

<script>
import $ from 'jquery'
import {utils} from '../../../assets/listutils.js'
import {admin_utils} from '../../../assets/admin/admin_utils.js'
export default {
	components: {
	},
	data() {
		return {
			currentLoginToken:'',
			id:'',
			loginName:'',
			password:'',
			realName:'',
			celPhone:'',
		};
	},
	mounted() {
		var that = this;
		that.currentLoginToken=utils.getCookie('loginToken');
		that.id= that.$route.query.id;
		that.queryDataDetail();
	},
	methods:{
		queryDataDetail(){
			var that = this;
			$.ajax({
				type : 'get',
				url : this.REQUEST_URL+"/admin/user/queryDataDetail",
				async: false,
				data : {
					'id':that.id,
					'loginToken':that.currentLoginToken,
				},
				success : function(result) {
					that.loginName=result.loginName;
					that.password=result.password;
					that.realName=result.realName;
					that.celPhone=result.celPhone;
				}
			});
		},
		submitData(){
			var that = this;
			var loginName = that.loginName;
			var password = that.password;
			var realName = that.realName;
			var celPhone = that.celPhone;
			$.ajax({
				type : 'post',
				url : this.REQUEST_URL+"/admin/user/update_submit",
				async: false,
				data : {
					'id':that.id,
					'loginName':loginName,
					'password':password,
					'realName':realName,
					'celPhone':celPhone,
					'loginToken':that.currentLoginToken,
				},
				success : function(result) {
					alert(result.msg);
					if(result.code==1){
						that.$router.go(-1);
					}
				}
			});
		},
	}
};

</script>
<style scoped>
	.editorDiv {
	z-index: 1000 !important;
	}
	.editorText {
	z-index: 1000 !important;
	}
	.el-card{
	overflow: visible !important;
	}
</style>



