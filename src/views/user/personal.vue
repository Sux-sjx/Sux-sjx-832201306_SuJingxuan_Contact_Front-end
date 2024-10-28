

<template>
	<div >
		<div style="background-color:white;width:60%;margin-left:5%;margin-top:10px;">
			<el-card class="box-card">
				<template #header>
					<div class="card-header">
						<span>用户</span>
					</div>
				</template>
				<div>
					<table class="admin-table">
						<tbody id="detailBody">
							<tr>
								<td class="col1">登录名</td>
								<td class="col2" v-html="loginName==null?'':loginName"></td>
							</tr>
							<tr>
								<td class="col1">姓名</td>
								<td class="col2" v-html="realName==null?'':realName"></td>
							</tr>
							<tr>
								<td class="col1">联系电话</td>
								<td class="col2" v-html="celPhone==null?'':celPhone"></td>
							</tr>
							<tr>
								<td class="col1">注册时间</td>
								<td class="col2" v-html="createTime==null?'':createTime"></td>
							</tr>
						</tbody>
					</table>
				</div>
				<div style="margin-top:8px;width:60%;margin-left:20%">
					<el-button  href="javascript:void(0)" :data-params="'id='+id+''" data-href="/user/user/update1_page" @click="goToPage" type="primary">修改</el-button>
				</div>
			</el-card>
		</div>
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
			id:'',
			currentLoginToken:'',
			currentLoginId:'',
			currentLoginType:'',
			loginName:'',
			realName:'',
			celPhone:'',
			createTime:'',
			detail:{},
		};
	},
	mounted() {
		this.currentLoginToken=utils.getCookie('loginToken');
		this.currentLoginId=utils.getCookie('loginId');
		this.currentLoginType=utils.getCookie('loginType');
		this.queryDataDetail();
	},
	methods:{
		queryDataDetail(){
			var that = this;
			$.ajax({
				type : 'get',
				url : this.REQUEST_URL+"/user/user/getDetailData",
				async: false,
				data : {
					'id':that.id,
					'loginToken':that.currentLoginToken,
				},
				success : function(result) {
					that.id = result.detail.user.id;
					that.loginName = (result.detail.user.loginName==null?'':result.detail.user.loginName);
					that.realName = (result.detail.user.realName==null?'':result.detail.user.realName);
					that.celPhone = (result.detail.user.celPhone==null?'':result.detail.user.celPhone);
					that.createTime = (result.detail.user.createTime==null?'':result.detail.user.createTime);
				}
			});
		},
	}
};

</script>
<style scoped>
	a{
	text-decoration: none;
	font-weight: 600;
	cursor: pointer;
	}
	.bodyClass::-webkit-scrollbar {
	display: none; /* Chrome Safari */
	}
	.admin-ibox-content {
	background-color: #ffffff;
	color: inherit;
	padding: 15px 20px 20px 20px;
	border-color: #e7eaec;
	border-image: none;
	border-style: solid solid none;
	border-width: 1px 0px;
	}
	.admin-table-bordered {
	border: 1px solid #EBEBEB;
	}
	.admin-table  > thead > tr > td >div{
	display:inline
	}
	.admin-table > thead > tr > th{
	text-align:center
	}
	.admin-table {
	width: 100%;
	max-width: 100%;
	margin-bottom: 20px;
	background-color: transparent;
	border-spacing: 0;
	border-collapse: collapse;
	text-indent: initial;
	}
	.admin-table > thead > tr > th, .admin-table > tbody > tr > th, .admin-table > tfoot > tr > th, .admin-table > thead > tr > td, .admin-table > tbody > tr > td, .admin-table > tfoot > tr > td {
	border-top: 1px solid #e7eaec;
	line-height: 1.42857;
	padding: 8px;
	vertical-align: top;
	border: 1px solid #e7e7e7;
	text-align:center;
	}
	.admin-table > thead > tr > th{
	background-color: #F5F5F6;
	}
	.admin-table > thead > tr > th {
	border-bottom: 1px solid #DDDDDD;
	vertical-align: bottom;
	}
	video{
	width:200px !important;
	}
	audio{
	width:200px !important;
	}
	th{
	background-color:white !important
	}
	.col1{
	width:20%;
	background-color:#c1d5c5 !important
	}
	.col2{
	width:60%;
	text-align:left !important
	}
</style>



