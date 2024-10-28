

<template>
	<div  style="width:70%;margin-left:5%;margin-top:10px;">
		<el-card class="box-card">
			<template #header>
				<div class="card-header">
					<span>联系人-新增</span>
				</div>
			</template>
			<div style="margin-top:8px;width:45%;margin-left:2%;"   id="nameForm">
				<div>姓名</div>
				<div style="display:flex">
					<div style="width:100%">
						<el-input type="text"  placeholder="请输入姓名" name="name" v-model="name" class="" id="name"></el-input>
					</div>
				</div>
			</div>
			<div style="margin-top:8px;width:45%;margin-left:2%;"   id="sexForm">
				<div>性别</div>
				<div style="display:flex">
					<div style="width:100%">
						<el-select  class="" data-id="sex"  v-model="sex"  id="sex" >
							<template v-for="item in sexList">
								<el-option  :value="item.id"   :label="item.name"></el-option>
							</template>
						</el-select>
					</div>
				</div>
			</div>
			<div style="margin-top:8px;width:45%;margin-left:2%;"   id="headImgForm">
				<div>头像</div>
				<div style="display:flex">
					<div style="width:100%">
						<div id="headImg" class="dropzone" data-id="headImg" max-num="1" file-type="1" max-size="1000" init-val="" :request-url="REQUEST_URL" :init-val="headImg"></div>
					</div>
				</div>
			</div>
			<div style="margin-top:8px;width:45%;margin-left:2%;"   id="celphoneForm">
				<div>联系电话</div>
				<div style="display:flex">
					<div style="width:100%">
						<el-input type="text"  placeholder="请输入联系电话" name="celphone" v-model="celphone" class="" id="celphone"></el-input>
					</div>
				</div>
			</div>
			<div style="margin-top:8px;width:45%;margin-left:2%;"   id="emailForm">
				<div>邮箱</div>
				<div style="display:flex">
					<div style="width:100%">
						<el-input type="text"  placeholder="请输入邮箱" name="email" v-model="email" class="" id="email"></el-input>
					</div>
				</div>
			</div>
			<div style="margin-top:8px;width:45%;margin-left:2%;"   id="addressForm">
				<div>住址</div>
				<div style="display:flex">
					<div style="width:100%">
						<el-input type="text"  placeholder="请输入住址" name="address" v-model="address" class="" id="address"></el-input>
					</div>
				</div>
			</div>
			<div style="margin-top:8px;width:45%;margin-left:2%;"   id="remarkForm">
				<div>备注</div>
				<div style="display:flex">
					<div style="width:100%">
						<el-input type="text"  placeholder="请输入备注" name="remark" v-model="remark" class="" id="remark"></el-input>
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
import {getFileVal2,initDropZone,setZoneImg} from '../../../assets/imgupload/js/imgupload.js'
export default {
	components: {
	},
	data() {
		return {
			currentLoginToken:'',
			name:'',
			sex:'1',
			headImg:'',
			celphone:'',
			email:'',
			address:'',
			remark:'',
			sexList:[],
		};
	},
	mounted() {
		var that = this;
		that.currentLoginToken=utils.getCookie('loginToken');
		that.getDataList();
		var headImgDrop = initDropZone('headImg');
	},
	methods:{
		getDataList(){
			var that = this;
			$.ajax({
				type : 'get',
				url : this.REQUEST_URL+"/user/contact/getInitData",
				async: false,
				data : {
					'loginToken':that.currentLoginToken
				},
				success : function(result) {
					that.sexList = result.sexList;
				}
			});
		},
		submitData(){
			var that = this;
			var name = that.name;
			var sex = that.sex;
			var headImg = getFileVal2('headImg');
			var celphone = that.celphone;
			var email = that.email;
			var address = that.address;
			var remark = that.remark;
			$.ajax({
				type : 'post',
				url : this.REQUEST_URL+"/user/contact/add_submit",
				async: false,
				data : {
					'name':name,
					'sex':sex,
					'headImg':headImg,
					'celphone':celphone,
					'email':email,
					'address':address,
					'remark':remark,
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
<style type="text/css" src="../../../assets/imgupload/css/dropzone.min.css?t=44" scoped></style>
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



