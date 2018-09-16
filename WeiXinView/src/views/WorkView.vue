<template>
  <div class="viewbody" v-loading.lock="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"
    style="position: relative;">
    <el-tabs v-model="activeName" style="width: 96%;margin: 0 auto;position: relative;height: 100%;">
      <el-tab-pane label="公文表单" name="first">
        <el-main class="my-tab-panel-content">
          <div class="my-tab-panel-body">
            <div style="position: absolute;top: 5px;left: 0px;z-index: 1;">
              <div v-if="formList&&formList.length>1" v-for="(item,index) in formList">
                <el-button size="mini" v-if="index==0" icon="el-icon-caret-top" circle @click="triggerForm(index)"></el-button>
                <el-button size="mini" v-if="index==1" icon="el-icon-caret-bottom" circle @click="triggerForm(index)"></el-button>
              </div>
            </div>
            <iframe id="myformiframe" :src="selectFormUrl" style="width:100%;display: block;margin: 0 auto;border: none;height: 100%;"
              onload="var data = {type:'slider',data: { SliderValue:0.5 }};window.frames['myformiframe'].contentWindow.postMessage(JSON.stringify(data), '*');"></iframe>

            <!-- 缩放条 -->
            <div v-show="sliderShow" style="position: absolute;top: 10px;bottom: 60px;right: 5px;z-index: 1;">
              <el-slider v-model="slider" :max="1" :step="0.01" size="mini" vertical style="height: 100%;" @change="SliderChange">
              </el-slider>
            </div>
            <div style="position: absolute;bottom: 15px;right: 10px;z-index: 1;">
              <el-button size="mini" icon="el-icon-setting" circle @click="sliderShow=!sliderShow"></el-button>
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
  </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        slider: 0.5,
        sliderShow: false,

        loading: false,
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
    created() {
      console.log(this.$route);
      this.slider = 0.5;

      this.getAllPgeData();

      this.loading = true;
      let that = this;
      setTimeout(() => {
        that.loading = false;
      }, 4000);
    },
    methods: {
      getSelectFormUrl: function () {//表单url路径拼接
        var item = this.selectForm;

        var url = "http://218.94.36.101:8888/JnfjWebService/HtmlPage/HtmlMainPage.aspx?iid=" + item.iid + "&FormName=" + item.res_value + "&input_index=" + item.input_index + "&rtid=" + item.rtid + "&t=" + Math.random();
        this.selectFormUrl = url;
      },
      getLxUrl: function () {//流向url路径拼接
        var iid = this.$route.params.iid;
        var url = "http://218.94.36.101:8888/JnfjWebService/UserApplication/workflow/WorkItemDetails.aspx?iid=" + iid;
        this.lxUrl = url;;
      },
      getLcUrl: function () {//流程url路径拼接
        var iid = this.$route.params.iid;
        var url = "http://218.94.36.101:8888/JnfjWebService/htmlpage/ViewWorkflowProcess.aspx?iid=" + iid + "&sctlid=&ectlid=";
        this.lcUrl = url;
      },
      getAllPgeData: function () {  //获取当前页面所有相关数据
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
        var iid = that.$route.params.iid;
        var params = " and iid='" + iid + "' order by sort";
        //获取当前页面需要所有信息数据
        MyGlobal.GetDataWebService("Handle.WorkHandle", "GetResourceTreeAll", params, success, error);

      },
      triggerForm(index) {
        this.selectForm = this.formList[index];
        this.slider = 0.5;
        this.getSelectFormUrl();
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
    width: 33.3%;
    display: inline-block;
  }
</style>