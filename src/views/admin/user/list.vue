

<template>
	<div class="admin-modal admin-inmodal admin-in" id="bodyModal" tabindex="-1" role="dialog" aria-hidden="false" style="top: 80px; left: -200px; ">
		<div class="admin-modal-dialog">
			<div class="admin-modal-content">
				<div class="admin-modal-header">
					<button type="button" class="admin-close" @click="handleExportJsMethod"  data-methodtype="hideModal"><span aria-hidden="true">×</span><span class="admin-sr-only">关闭</span>
					</button>
					<h4 class="admin-modal-title" id="bodyModalTile"></h4>
				</div>
				<div class="admin-modal-body" id="bodyModalContent" style="padding:30px;"></div>
				<div class="admin-modal-footer">
					<button type="button" class="admin-btn admin-btn-white" @click="handleExportJsMethod"  data-methodtype="hideModal">关闭</button>
				</div>
			</div>
		</div>
	</div>
	<el-card class="box-card"  style="width:90%;margin-left:5%">
		<template #header>
			<div class="card-header">
				<span>用户</span>
			</div>
		</template>
		<div>
			<el-form :inline="true" :model="formInline" class="demo-form-inline">
				<el-form-item label="登录名"  style="min-width:250px">
					<el-input type="text"  placeholder="请输入登录名" name="loginName" v-model="loginName" class="" id="loginName"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="ajaxList(1)" >查询</el-button>
				</el-form-item>
			</el-form>
			<div style="margin-top:5px;padding-left: 15px;">
				<el-button
					href="javascript:void(0)" :data-params="''" data-href="/admin/user/add_page" @click="goToPage"
					type="success" style="margin-left:5px;margin-top:5px;"
					>
					新增
				</el-button>
			</div>
			<div style="margin-top:5px;margin-bottom:5px;padding-left: 15px;">
			</div>
			<div >
				<el-table
					ref="multipleTable"
					:data="dataList"
					tooltip-effect="dark"
					style="width: 100%"
					>
					<el-table-column
						label="登录名"
						show-overflow-tooltip>
						<template v-slot="{ row }">
							<div v-html="''+(row.user.loginName==null?'':row.user.loginName)+''"></div>
						</template>
					</el-table-column>
					<el-table-column
						label="姓名"
						show-overflow-tooltip>
						<template v-slot="{ row }">
							<div v-html="''+(row.user.realName==null?'':row.user.realName)+''"></div>
						</template>
					</el-table-column>
					<el-table-column
						label="联系电话"
						show-overflow-tooltip>
						<template v-slot="{ row }">
							<div v-html="''+(row.user.celPhone==null?'':row.user.celPhone)+''"></div>
						</template>
					</el-table-column>
					<el-table-column
						label="注册时间"
						show-overflow-tooltip>
						<template v-slot="{ row }">
							<div v-html="''+(row.user.createTime==null?'':row.user.createTime)+''"></div>
						</template>
					</el-table-column>
					<el-table-column
						fixed="right"
						label="操作"
						width="240">
						<template v-slot="{ row }">
							<el-button
								href="javascript:void(0)" :data-params="'id='+row.user.id+''" data-href="/admin/user/update_page" @click="goToPage"
								type="primary" style="margin-left:5px;margin-top:5px;"
								>
								修改
							</el-button>
							<el-button
								href="javascript:void(0)" :data-id="row.user.id" @click="del"
								type="danger" style="margin-left:5px;margin-top:5px;"
								>
								删除
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div>
					<div id="user_bar" class="pagination" style="margin-top:20px;"></div>
				</div>
			</div>
		</div>
	</el-card>
</template>

<script>
import $ from 'jquery'
import {utils} from '../../../assets/listutils.js'
import {admin_utils} from '../../../assets/admin/admin_utils.js'
import {myPagination} from '../../../assets/page/myPagination.js'
export default {
	components: {
	},
	data() {
		return {
			currentLoginToken:'',
			currentLoginId:'',
			currentLoginType:'',
			loginName:'',
			dataList:[],
		};
	},
	mounted() {
		var that = this;
		that.currentLoginToken=utils.getCookie('loginToken');
		that.currentLoginId=utils.getCookie('loginId');
		that.currentLoginType=utils.getCookie('loginType');
		that.ajaxList(1);
	},
	methods:{
		del(e){
			var that = this;
			var dataId  =e.currentTarget.dataset.id;
			var r=confirm("确认删除该数据吗？");
			if(r==true){
				$.ajax({
					type : 'get',
					url : this.REQUEST_URL+"/admin/user/del",
					async: false,
					data : {
						"loginToken":that.currentLoginToken,
						"id":dataId
					},
					success : function(result) {
						alert(result.msg);
						if(result.code==1){
							that.ajaxList(1);
						}
					}
				});
			}
		},
		ajaxCount(){
			var that = this;
			var rs = null;
			var loginName = that.loginName;
			$.ajax({
				type : 'get',
				url : this.REQUEST_URL+'/admin/user/queryCount',
				async: false,
				data : {
					"loginToken":that.currentLoginToken,
					"loginName":loginName,
				},
				success : function(result) {
					rs = result;
				}
			});
			return rs;
		},
		ajaxList(page){
			var that = this;
			if(page==undefined||page==null){
				page=1;
			}
			var loginName = that.loginName;
			var countRs = that.ajaxCount();
			if(countRs.totalPage<page){
				page = countRs.totalPage;
			}
			$.ajax({
				type : 'get',
				url : this.REQUEST_URL+'/admin/user/queryList',
				async: false,
				data : {
					"page":page,
					"loginToken":that.currentLoginToken,
					"loginName":loginName,
				},
				success : function(result) {
					admin_utils.hideLoading();
					var rows = result.list;
					var total = countRs.count;//得到数据总数
					var totalPage=countRs.totalPage;
					that.dataList=rows;
					new myPagination({
						id: 'user_bar',
						curPage:page, //初始页码
						pageTotal:totalPage, //总页数
						pageAmount: 10,  //每页多少条
						dataTotal: total, //总共多少条数据
						pageSize: 10, //可选,分页个数
						showPageTotalFlag:true, //是否显示数据统计
						showSkipInputFlag:false, //是否支持跳转
						getPage: function (page) {
							that.ajaxList(page)
						}
					})
				}
			});
		},
		handleExportJsMethod(e){
			var div = e.currentTarget;
			var methodtype = div.dataset.methodtype;
			if(methodtype=='maxImg'){
				admin_utils.maxImg(div);
			}
			if(methodtype=='hideModal'){
				admin_utils.hideModal(div);
			}
		},
	}
};

</script>
<style type="text/css" src="../../../assets/page/myPagination.css?t=44" scoped></style>
<style type="text/css" src="../../../assets/admin/style.css?t=44" scoped></style>
<style scoped>
	a{
	text-decoration: none;
	cursor: pointer;
	}
	.el-select{
	min-width:100px
	}
</style>



