

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
				<span>联系人</span>
			</div>
		</template>
		<div>
			<el-form :inline="true" :model="formInline" class="demo-form-inline">
				<el-form-item label="姓名"  style="min-width:250px">
					<el-input type="text"  placeholder="请输入姓名" name="name" v-model="name" class="" id="name"></el-input>
				</el-form-item>
				<el-form-item label="性别"  style="min-width:250px">
					<el-select  class="" data-id="sex"  v-model="sex"  id="sex" >
						<template v-for="item in sexList">
							<el-option  :value="item.id"   :label="item.name"></el-option>
						</template>
					</el-select>
				</el-form-item>
				<el-form-item label="联系电话"  style="min-width:250px">
					<el-input type="text"  placeholder="请输入联系电话" name="celphone" v-model="celphone" class="" id="celphone"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="ajaxList(1)" >查询</el-button>
				</el-form-item>
			</el-form>
			<div style="margin-top:5px;padding-left: 15px;">
				<el-button
					href="javascript:void(0)" :data-params="''" data-href="/user/contact/add_page" @click="goToPage"
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
						label="姓名"
						show-overflow-tooltip>
						<template v-slot="{ row }">
							<div v-html="''+(row.contact.name==null?'':row.contact.name)+''"></div>
						</template>
					</el-table-column>
					<el-table-column
						label="性别"
						show-overflow-tooltip>
						<template v-slot="{ row }">
							<div v-html="''+(row.sexStr==null?'':row.sexStr)+''"></div>
						</template>
					</el-table-column>
					<el-table-column label="头像"  width="200px">
						<template v-slot="{ row }">
							<template v-for="item4 in row.headImgList">
								<img :src="item4"  style="width:80px;height:80px;display:inline;margin-left:4px;" @click="handleExportJsMethod"  data-methodtype="maxImg">
								</template>
							</template>
						</el-table-column>
						<el-table-column
							label="联系电话"
							show-overflow-tooltip>
							<template v-slot="{ row }">
								<div v-html="''+(row.contact.celphone==null?'':row.contact.celphone)+''"></div>
							</template>
						</el-table-column>
						<el-table-column
							label="邮箱"
							show-overflow-tooltip>
							<template v-slot="{ row }">
								<div v-html="''+(row.contact.email==null?'':row.contact.email)+''"></div>
							</template>
						</el-table-column>
						<el-table-column
							label="住址"
							show-overflow-tooltip>
							<template v-slot="{ row }">
								<div v-html="''+(row.contact.address==null?'':row.contact.address)+''"></div>
							</template>
						</el-table-column>
						<el-table-column
							label="备注"
							show-overflow-tooltip>
							<template v-slot="{ row }">
								<div v-html="''+(row.contact.remark==null?'':row.contact.remark)+''"></div>
							</template>
						</el-table-column>
						<el-table-column
							label="创建时间"
							show-overflow-tooltip>
							<template v-slot="{ row }">
								<div v-html="''+(row.contact.createTime==null?'':row.contact.createTime)+''"></div>
							</template>
						</el-table-column>
						<el-table-column
							label="用户ID"
							show-overflow-tooltip>
							<template v-slot="{ row }">
								<div v-html="''+(row.userIdStr==null?'':row.userIdStr)+''"></div>
							</template>
						</el-table-column>
						<el-table-column
							fixed="right"
							label="操作"
							width="240">
							<template v-slot="{ row }">
								<el-button
									href="javascript:void(0)" :data-params="'id='+row.contact.id+''" data-href="/user/contact/update_page" @click="goToPage"
									type="primary" style="margin-left:5px;margin-top:5px;"
									>
									修改
								</el-button>
								<el-button
									href="javascript:void(0)" :data-id="row.contact.id" @click="del"
									type="danger" style="margin-left:5px;margin-top:5px;"
									>
									删除
								</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div>
						<div id="contact_bar" class="pagination" style="margin-top:20px;"></div>
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
			name:'',
			sex:'',
			celphone:'',
			dataList:[],
			sexList:[],
		};
	},
	mounted() {
		var that = this;
		that.currentLoginToken=utils.getCookie('loginToken');
		that.currentLoginId=utils.getCookie('loginId');
		that.currentLoginType=utils.getCookie('loginType');
		that.getInitData();
		that.ajaxList(1);
	},
	methods:{
		getInitData(){
			var that = this;
			$.ajax({
				type : 'get',
				url : this.REQUEST_URL+"/user/contact/getInitData",
				async: false,
				data : {
					"loginToken":that.currentLoginToken,
				},
				success : function(result) {
					that.sexList = admin_utils.addAllSelect(result.sexList);
				}
			});
		},
		del(e){
			var that = this;
			var dataId  =e.currentTarget.dataset.id;
			var r=confirm("确认删除该数据吗？");
			if(r==true){
				$.ajax({
					type : 'get',
					url : this.REQUEST_URL+"/user/contact/del",
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
			var name = that.name;
			var sex = that.sex;
			var celphone = that.celphone;
			$.ajax({
				type : 'get',
				url : this.REQUEST_URL+'/user/contact/queryCount',
				async: false,
				data : {
					"loginToken":that.currentLoginToken,
					"name":name,
					"sex":sex,
					"celphone":celphone,
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
			var name = that.name;
			var sex = that.sex;
			var celphone = that.celphone;
			var countRs = that.ajaxCount();
			if(countRs.totalPage<page){
				page = countRs.totalPage;
			}
			$.ajax({
				type : 'get',
				url : this.REQUEST_URL+'/user/contact/queryList',
				async: false,
				data : {
					"page":page,
					"loginToken":that.currentLoginToken,
					"name":name,
					"sex":sex,
					"celphone":celphone,
				},
				success : function(result) {
					admin_utils.hideLoading();
					var rows = result.list;
					var total = countRs.count;//得到数据总数
					var totalPage=countRs.totalPage;
					that.dataList=rows;
					new myPagination({
						id: 'contact_bar',
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



