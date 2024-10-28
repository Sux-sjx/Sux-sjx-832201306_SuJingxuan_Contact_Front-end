

<template>
	<div class="login-body-class">
		<div class="main">
			<div class="login">
				<div class="inset">
					<!--start-main-->
					<div class="form">
						<h2>通讯录管理系统-用户-注册</h2>
						<div  style="margin: 3px 0px 25px">
							<span><label>登录名</label></span>
							<span>
								<input type="text"  placeholder="请输入登录名" name="loginName" v-model="loginName" class="textbox" id="loginName">
							</span>
						</div>
						<div  style="margin: 3px 0px 25px">
							<span><label>密码</label></span>
							<span>
								<input type="password" name="password"  placeholder="请输入密码"  v-model="password" class="textbox" id="password">
							</span>
						</div>
						<div  style="margin: 3px 0px 25px">
							<span><label>姓名</label></span>
							<span>
								<input type="text"  placeholder="请输入姓名" name="realName" v-model="realName" class="textbox" id="realName">
							</span>
						</div>
						<div  style="margin: 3px 0px 25px">
							<span><label>联系电话</label></span>
							<span>
								<input type="text"  placeholder="请输入联系电话" name="celPhone" v-model="celPhone" class="textbox" id="celPhone">
							</span>
						</div>
						<div  style="margin: 3px 0px 25px">
							<span><label>验证码</label></span>
							<div style="display:flex">
								<input type="text" class="textbox"  id="imgCode" name="imgCode" placeholder="验证码" v-model="imgCode" style="width:70%">
								<img id="codeImg1"  name="codeImg" @click="changeCode" :src="codeImg1" alt="点击更换" title="点击更换"    style="height:40px;width:30%;margin-top:4px;">
								</div>
							</div>
							<div class="sign">
								<a href="javascript:void(0)"   @click="submitForm" id="submitBtn" class="submit">用户-注册</a>
							</div>
							<div style="margin-top:8px;">
								<a  style="margin-left:10px;float:right"   data-href="/sys_login" data-params="" @click="goToPage">前往登录</a>
							</div>
						</div>
					</div>
				</div>
				<!--//end-main-->
			</div>
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
			loginName:'',
			password:'',
			realName:'',
			celPhone:'',
			imgCode:'',
			codeImg1:'',
			codeToken:'',
		};
	},
	mounted() {
		var that=this;
		this.changeCode();
	},
	methods:{
		changeCode(){
			var that = this;
			$.ajax({
				type: 'post',
				url: this.REQUEST_URL+"/"+'/validCode/code',
				data: {
				},
				success: function(result) {
					that.codeToken = result.codeToken;
					that.codeImg1 = result.imgUrl;
				}
			});
		},
		submitForm(){
			var that = this;
			var loginName = that.loginName;
			var password = that.password;
			var realName = that.realName;
			var celPhone = that.celPhone;
			$.ajax({
				type: 'post',
				url: this.REQUEST_URL+'/regist/userRegistSubmit',
				data: {
					'loginName':loginName,
					'password':password,
					'realName':realName,
					'celPhone':celPhone,
					'imgCode':that.imgCode,
					'imgCodeToken':that.codeToken,
				},
				success: function(result) {
					alert(result.msg);
					if(result.code==1){
						that.goToPageJS('/sys_login','');
					}
				}
			});
		},
	}
};

</script>
	<style type="text/css" src="../assets/login/login.css?t=44" scoped></style>
	<style scoped>
		/* reset */
		html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, dl, dt, dd, ol, nav ul, nav li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video,input {
		font-size: 100%;
		font: inherit;
		vertical-align: baseline;
		font-family: "Segoe UI", "Lucida Grande", Helvetica, Arial, "Microsoft YaHei", FreeSans, Arimo, "Droid Sans", "wenquanyi micro hei", "Hiragino Sans GB", "Hiragino Sans GB W3", FontAwesome, sans-serif;}
		article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
		display: block;
		}
		ol, ul {
		list-style: none;
		margin: 0px;
		padding: 0px;
		}
		blockquote, q {
		quotes: none;
		}
		blockquote:before, blockquote:after, q:before, q:after {
		content: '';
		content: none;
		}
		table {
		border-collapse: collapse;
		border-spacing: 0;
		}
		/* start editing from here */
		a {
		text-decoration: none;
		}
		img {
		max-width: 100%;
		}
		/*end reset*/
		/****-----start-body----****/
		h1 {
		font-size: 2.4em;
		padding-bottom: 28px;
		color: #fff;
		text-align: center;
		}
		h2 {
		font-size: 1.5em;
		padding-bottom: 28px;
		color: #0091e6;
		text-align: center;
		}
		.form span {
		display: block;
		font-size: 1.0em;
		color: #333;
		font-weight: 400;
		}
		.login-body-class{
		min-height:950px;
		background-image:url(../assets/login_bg.jpg);
		background-size:100% 100%;
		}
		.text-select{
		width:100%;
		height:35px;
		}
	</style>



