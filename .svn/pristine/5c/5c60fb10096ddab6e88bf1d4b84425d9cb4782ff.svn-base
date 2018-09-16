<template>
  <div class="viewbody" v-loading.lock="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"
    style="position: relative;">
    <el-tabs v-model="activeName" style="width: 96%;margin: 0 auto;position: relative;height: 92%;">
      <el-tab-pane label="公文表单" name="first">
        <el-main class="my-tab-panel-content">
          <div class="my-tab-panel-body">
            <div style="position: absolute;top: 5px;left: 0px;z-index: 1;">
              <div v-if="formList&&formList.length>1" v-for="(item,index) in formList">
                <el-button size="mini" v-if="index==0" icon="el-icon-caret-top" circle @click="triggerForm(-1)"></el-button>
                <el-button size="mini" v-if="index==1" icon="el-icon-caret-bottom" circle @click="triggerForm(+1)"></el-button>
              </div>
            </div>
            <iframe id="myformiframe" style="width:100%;display: block;margin: 0 auto;border: none;height: 100%; -webkit-overflow-scrolling: touch; overflow: auto; 
            /* 提示: 请在此处加上需要设置的大小(dimensions)或位置(positioning)信息! */ " onload="var data = {type:'slider',data: { SliderValue:0.5 }};window.frames['myformiframe'].contentWindow.postMessage(JSON.stringify(data), '*');"></iframe>

            <!-- 缩放条 -->
            <div v-show="sliderShow" style="position: absolute;top: 10px;bottom: 60px;right: 5px;z-index: 1;">
              <el-slider v-model="slider" :max="1" :step="0.01" size="mini" vertical style="height: 100%;" @change="SliderChange">
              </el-slider>
            </div>
            <div style="position: absolute;bottom: 15px;right: 10px;z-index: 1;">
              <el-button type="primary" size="mini" icon="el-icon-setting" circle @click="sliderShow=!sliderShow"></el-button>
            </div>
          </div>
        </el-main>
      </el-tab-pane>
      <el-tab-pane label="附件管理" name="second">
        <el-table ref="fileList" :data="fileList" style="width: 100%;" size="mini">
          <el-table-column show-overflow-tooltip prop="text" label="附件名">
            <template slot-scope="scope">
              <div style="word-break:break-all;word-wrap:break-word;" @click="downFile(scope.row)">
                <i class="el-icon-document" style="color: goldenrod;"></i>
                <span style="margin-left: 10px;white-space: normal;">{{ scope.row.text + scope.row.icon }}</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <!-- <el-tab-pane label="查看流向" name="fourth">
        <el-main class="my-tab-panel-content">
          <div class="my-tab-panel-body">
            <iframe :src="lxUrl" style="width:100%;display: block;margin: 0 auto;border: none;height: 100%;"></iframe>
          </div>
        </el-main>
      </el-tab-pane> -->
      <!-- <el-tab-pane label="进度视图" name="third">
        <el-main class="my-tab-panel-content">
          <div class="my-tab-panel-body">
            <a>
              <img :src="lcUrl" style="width:100%;display: block;margin: 0 auto;border: none;height: 100%;" />
            </a>
          </div>
        </el-main>
      </el-tab-pane> -->
    </el-tabs>
    <!--  -->
    <div style="position: fixed;bottom: 5px;width: 100%;">
      <el-row style="text-align: center;">
        <el-col :span="24">
          <el-button-group id="handlebtnGroup">
            <el-button type="success" size="small" icon="el-icon-upload" @click="SaveData">保存</el-button>
            <el-button type="primary" size="small" @click="DoSubmit">
              提交
              <i class="el-icon-success el-icon--right"></i>
            </el-button>
            <!-- <el-button type="warning" size="small">回退
              <i class="el-icon-arrow-right el-icon--right"></i>
            </el-button> -->
          </el-button-group>
        </el-col>
      </el-row>
    </div>
  </div>
  </div>
</template>

<script>
  import sys_dictionary from '../dictionary'
  let dictionary = sys_dictionary["dictionary"];
  export default {
    data() {
      return {
        isFirstEnter: false, // 是否第一次进入，默认false
        slider: 0.5,
        sliderShow: false,

        loading: false,
        formIndex: 0,//当前显示表单索引
        selectForm: {},//选中的form集合中的对象
        formList: [],
        activeName: "first",
        loading: false,
        pageData: [],
        fileList: [],

        selectFormUrl: "",
        lxUrl: "",
        lcUrl: "",
      };
    },
    beforeRouteEnter(to, from, next) {
      // 路由导航钩子，此时还不能获取组件实例 `this`，所以无法在data中定义变量（利用vm除外）
      if (from.name == "DoSubmit") {
        to.meta.isBack = true;
        //判断是从哪个路由过来的，
        //如果是page2过来的，表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可
      }
      next();
    },
    activated() {
      var type = this.$route.params.type;
      this.$GetWxUserInfo(this.$route);//获取用户信息
      if (dictionary[type].region == "sj") {//如果为市局公文办理则获取时间用户表信息
        this.$GetSjUserInfo(this.$UserInfo.mobile);
      }
      if (this.$UserInfo.userId == false) {
        $("#app").hide(0);
        layer.alert("数据库中不存在当前用户信息、请咨询相关人员！");

        return false;
      }
      // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
      if (!this.$route.meta.isBack || this.isFirstEnter) {
        let wx = this.$wx;
        this.activeName = "first";
        /* if (typeof document.WeixinJSBridge == "undefined") {
           document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
             // 通过下面这个API隐藏右上角按钮
             WeixinJSBridge.call('hideOptionMenu');
             // 通过下面这个API隐藏底部导航栏
             WeixinJSBridge.call('hideToolbar');
           });
         }
         else {
           // 通过下面这个API隐藏右上角按钮
           WeixinJSBridge.call('hideOptionMenu');
           // 通过下面这个API隐藏底部导航栏
           WeixinJSBridge.call('hideToolbar');
         }
 
         wx.ready(function () {
           console.log(wx);
           wx.hideOptionMenu();//隐藏微信右上角菜单
         });
         wx.error(function (a) {
           console.log("error");
         });*/

        this.getAllPgeData();
      }

      this.loading = true;
      let that = this;
      setTimeout(() => {
        that.loading = false;
      }, 4000);

      // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
      this.$route.meta.isBack = false;
      // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
      this.isFirstEnter = false;
    },
    created() {
      this.slider = 0.5;
      this.isFirstEnter = true;
    },
    methods: {
      getSelectFormUrl: function () {//表单url路径拼接
        var item = this.selectForm;
        if (this.$route.params.type == "gwbl") {
          var url = "http://218.94.36.101:8888/JnfjWebService/HtmlPage/HtmlMainPage.aspx?iid=" + item.iid + "&FormName=" + item.res_value + "&UserId=" + item.userid + "&input_index=" + item.input_index + "&rtid=" + item.rtid + "&wiid=" + item.wiid + "&indexfield=iid&indexvalue=" + item.iid + "&t=" + Math.random();
          this.selectFormUrl = url;
        }
        else {
          var url = "http://218.94.36.101:8888/netows2_jjg/HtmlPage/HtmlMainPage.aspx?iid=" + item.iid + "&FormName=" + item.res_value + "&UserId=" + item.userid + "&input_index=" + item.input_index + "&rtid=" + item.rtid + "&wiid=" + item.wiid + "&indexfield=iid&indexvalue=" + item.iid + "&t=" + Math.random();
          this.selectFormUrl = url;
        }

        if ($("#myformiframe").attr("src") != this.selectFormUrl) {
          $("#myformiframe").attr("src", this.selectFormUrl);
        }
      },
      getLxUrl: function () {//流向url路径拼接
        var iid = this.$route.params.iid;
        if (this.$route.params.type == "gwbl") {
          var url = "http://218.94.36.101:8888/JnfjWebService/UserApplication/workflow/WorkItemDetails.aspx?iid=" + iid;
          this.lxUrl = url;
        }
      },
      getLcUrl: function () {//流程url路径拼接
        var iid = this.$route.params.iid;
        if (this.$route.params.type == "gwbl") {
          var url = "http://218.94.36.101:8888/JnfjWebService/htmlpage/ViewWorkflowProcess.aspx?iid=" + iid + "&sctlid=&ectlid=";
          this.lcUrl = url;
        }
        else {
          var url = "http://218.94.36.101:8888/netows2_jjg/htmlpage/ViewWorkflowProcess.aspx?iid=" + iid + "&sctlid=&ectlid=";
          this.lcUrl = url;
        }
      },
      getAllPgeData: function () {  //获取当前页面所有相关数据
        //var jsonstr = '[{"rtid":"110bcdb3-51ad-441e-96f0-03e9c8bb7b55","type":"3","res_value":"c90ce1ad-a5dd-41be-abb6-d1a2c5134060","path":"市国土局文件传阅单","input_index":"0","orderno":"1","sort":"1","wiid":"3981856","userid":"81c5e30c-0791-4125-9f81-aa942e1e72e1","text":"市国土局文件传阅单","step":"机要室整理","stepctlid":"e0cbc7ff-dcf3-494a-8724-4922ccb248c4","icon":".page","iid":"362119","wid":"68b04fd8-a811-4c68-878d-512de1032afa","fsort":"1","scount":"","writeflag":""},{"rtid":"","type":"2","res_value":"4616056178934c24992b923c0a62ebf0","path":"第二次问卷员工版v2.1","input_index":"0","orderno":"1","sort":"101","wiid":"3981856","userid":"81c5e30c-0791-4125-9f81-aa942e1e72e1","text":"第二次问卷员工版v2.1","step":"机要室整理","stepctlid":"e0cbc7ff-dcf3-494a-8724-4922ccb248c4","icon":".docx","iid":"362119","wid":"68b04fd8-a811-4c68-878d-512de1032afa","fsort":"2","scount":"","writeflag":""}]';
        //var jsondata = JSON.parse(jsonstr);
        //this.pageData = jsondata;

        let MyGlobal = this.$MyGlobal;
        let that = this;

        that.loading = true;

        //获取数据成功回调
        var success = function (result) {
          var jsondata = JSON.parse(result);
          that.pageData = jsondata;
          if (jsondata.length <= 0) {
            layer.msg("该案件存在异常！", function (e) {
              that.$router.go(-1);
            });

            return false;
          }

          //表单类型
          that.formList = jsondata.filter(function (item) {
            return item.type == "3";
          });
          //附件类型
          that.fileList = jsondata.filter(function (item) {
            return item.type == "2";
          });

          that.selectForm = that.formList[0];//默认进入第一个表单

          that.getSelectFormUrl();
          that.getLcUrl();
          that.getLxUrl();
        };
        //获取数据失败回调
        var error = function (res) {
          console.log(res);
          that.loading = false;
        };
        //参数
        var userId = that.$UserInfo.userId;
        var wiid = that.$route.params.wiid;
        var params = [userId, wiid, "order by sort;text"];
        //获取当前页面需要所有信息数据
        var type = that.$route.params.type;
        if (type == "sjgwbl") {
          MyGlobal.GetDataWebServiceNJSJ("NetOffice.DoWorkHandle", "GetResourceTree", params.join(","), success, error);
        }
        else {
          MyGlobal.GetDataWebService("NetOffice.DoWorkHandle", "GetResourceTree", params.join(","), success, error);
        }


      },
      triggerForm(i) {
        console.log(this.formIndex);
        if (this.formIndex + i >= 0 && this.formIndex + i < this.formList.length) {
          this.formIndex += i;
          this.selectForm = this.formList[this.formIndex];
          this.slider = 0.5;
          this.getSelectFormUrl();
        }
      },
      downFile(info) {
        let MyGlobal = this.$MyGlobal;
        let that = this;

        var res_value = info.res_value;
        var AjaxData = {
          type: ["attachment a", "dynamic_resource b"],
          pageNum: 1,
          PageMax: 1,
          fileds: "replace(substr(a.ftp_path,instr(a.ftp_path,'@',1,2)+1),'\\','/') as path",
          where: "a.aid=b.res_value and b.res_value='" + res_value + "'",
        };

        var urlAfter = AjaxData.type.join(",");
        var success = function (result) {
          if (result.length > 0) {
            var path = "http://218.94.36.101:8888/weixinpage/ftpfile/" + result[0]["path"];
            window.location.href = path;
          }
          else {
            layer.msg("找不到文件！");
          }
        };
        var error = function (err) {
          that.loading2 = false;
          layer.alert("下载附件时发生异常！");
        }

        MyGlobal.GetDataAjax("get", urlAfter, AjaxData, success, error);
      },
      DoSubmit() {
        var iid = this.$route.params.iid;
        var wiid = this.$route.params.wiid;
        var type = this.$route.params.type;
        this.$router.push({
          name: "DoSubmit",
          params: { type: type, iid: iid, wiid: wiid }
        });
      },
      SaveData() {
        var data = {
          type: "saveform"
        };
        window.frames['myformiframe'].contentWindow.postMessage(JSON.stringify(data), '*');
      },
      SliderChange(val) { //刻度尺跳转、页面缩放比例
        var data = {
          type: "slider",
          data: {
            SliderValue: val
          }
        };
        window.frames['myformiframe'].contentWindow.postMessage(JSON.stringify(data), '*');
      }
    }
  };
</script>

<style>
  #app>div>.el-tabs.el-tabs--top>.el-tabs__content {
    position: absolute !important;
    top: 42px !important;
    bottom: 0 !important;
    left: 0 !important;
    width: 100%;
  }

  #app>div>.el-tabs.el-tabs--top>.el-tabs__content>.el-tab-pane {
    height: 100% !important;
    overflow: auto;
  }

  #app>div>.el-tabs.el-tabs--top>.el-tabs__content>.el-tab-pane>.my-tab-panel-content {
    height: 100% !important;
    padding: 0px 0px 0px 5px !important;
  }

  #app>div>.el-tabs.el-tabs--top>.el-tabs__content>.el-tab-pane>.my-tab-panel-content>.my-tab-panel-body {
    position: relative !important;
    height: 100% !important;
  }

  #dosubmitPanel {
    font-size: 1.2rem
  }

  #dosubmitPanel .el-radio-button--mini .el-radio-button__inner {
    width: 70px;
    overflow: hidden;
  }

  #handlebtnGroup {
    display: block;
    width: 100%;
  }

  #handlebtnGroup>button.el-button {
    width: 50% !important;
    display: inline-block;
  }
</style>