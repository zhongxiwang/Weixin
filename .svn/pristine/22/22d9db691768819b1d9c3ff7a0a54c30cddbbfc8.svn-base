<template>
  <div id="#scroll" class="viewbody" v-loading="loading2" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <el-row class="FileList-search">
      <el-col :span="24">
        <div class="demo-input-suffix">
          <el-input v-model="value" placeholder="请输入标题" class="input-with-select" size="small" prefix-icon="el-icon-search">
            <el-button slot="append" icon="el-icon-search" @click.native="getFileListSearch();"></el-button>
          </el-input>
        </div>
      </el-col>
    </el-row>
    <el-row v-if="data.length==0">
      <el-col class="FileList-Error" :span="24">无数据</el-col>
    </el-row>

    <a style="color:#000000" v-for="(item,index) in data" :key="index" @click="downFile(item)">
      <el-row class="FileList">
        <el-row :gutter="10">
          <el-col class="FileList-img" :span="5">
            <div class="img-border">
              <i style="font-size:4rem" class="iconfont icon-xiazai"></i>
            </div>
          </el-col>
          <el-col class="FileList-title" :span="19">
            <el-badge is-dot class="item" :hidden="!(item.readflag!='1'&&item.readflag!='Y')">
              &nbsp;&nbsp;{{ item.filename | filenamefilter('$',' ') }}
            </el-badge>
          </el-col>
          <el-col class="FileList-info" :span="24">
            <el-row>
              <el-col :span="12">创建人: {{ item.username }}</el-col>
              <el-col :span="12">接收时间: {{ item.createtime | stringreplace('T',' ') }}</el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-row>
    </a>
  </div>
</template>

<script>
  import sys_dictionary from '../dictionary'
  let dictionary = sys_dictionary["dictionary"];
  export default {
    name: "FileList",
    data() {
      return {
        isFirstEnter: false, // 是否第一次进入，默认false

        loading2: true,
        data: [],
        pageNum: 1,
        PageMax: 20,
        value: "",
        sw: false
      };
    },
    beforeRouteEnter(to, from, next) {
      // 路由导航钩子，此时还不能获取组件实例 `this`，所以无法在data中定义变量（利用vm除外）
      /*if (from.name == "NoticeBulletinInfo") {
        to.meta.isBack = true;
        //判断是从哪个路由过来的，
        //如果是page2过来的，表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可
      }*/
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
        let that = this;
        let wx = this.$wx;
        //首次进入加载事件
        this.getFileList();
        if (this.pageNum == "1") {//首次加载数据出现加载层
          this.loading2 = true;
        }

        //滚动加载事件
        $(window).scroll(function (e) {
          let scrollTop = $(this).scrollTop();
          let scrollHeight = $(document).height();
          let windowHeight = $(this).height();
          if (scrollTop + windowHeight >= scrollHeight - 350) {
            if (that.$route.name.toLowerCase() != "filelist") {
              return false;
            }

            if (that.sw) {
              that.sw = false;
              this.pageNum = this.pageNum + 1;
              that.getFileList();
            }
          }
        });
      }

      // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
      this.$route.meta.isBack = false;
      // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
      this.isFirstEnter = false;
    },
    created() {
      this.isFirstEnter = true;
      // 只有第一次进入或者刷新页面后才会执行此钩子函数
      // 使用keep-alive后（2+次）进入不会再执行此钩子函数
      let type = this.$route.params.type.toLowerCase();
      $("#title").html(dictionary[type].title);

    },
    methods: {
      getFileList() {
        let that = this;
        const MyGlobal = that.$MyGlobal;

        var loginName = that.$UserInfo.loginName;
        var type = this.$route.params.type;
        var department = dictionary[type].type;
        var whereValue = this.value;

        var AjaxData = dictionary[type].AjaxData(this.pageNum, this.PageMax, loginName, whereValue);

        var urlAfter = AjaxData.type.join(",");
        var success = function (result) {
          if (that.pageNum <= 1) {
            that.data = result;
          }
          else {
            for (var i in result) {
              that.data.push(result[i]);
            }
          }

          that.pageNum += 1;
          that.loading2 = false;
          if (result.length > 0) {
            that.sw = true;
          }
          else {
            that.sw = false;
            layer.msg("无数据！");
          }
        };
        var error = function (err) {
          that.loading2 = false;
          layer.alert("获取FileList发生异常！");
        }

        MyGlobal.GetDataAjax("get", urlAfter, AjaxData, success, error);
      },
      getFileListSearch() {
        this.data = [];
        this.pageNum = 1;
        this.loading2 = true;

        this.getFileList();
      },
      downFile(item) {
        item.readflag = '1';
        var type = this.$route.params.type;
        if (dictionary[type].region == "fj") {//如果为市局公文办理则获取时间用户表信息
          window.location.href = "http://218.94.36.101:8888/weixinpage/ftpfile/res/" + item.filepath;
        }
        else {
          if (item.department == "SubData") {
            window.location.href = 'http://218.94.36.101:8888/Ftpfile/' + item.owner + '/' + item.filename;
          }
          else {
            window.location.href = "http://218.94.36.101:8888/weixinpage/ftpfile/res/" + item.department + '/' + item.owner + '/' + item.filename;
          }
        }
      }
    }
  };
</script>

<style>
  .FileList .FileList-title>.el-badge.item>.el-badge__content.is-fixed.is-dot {
    top: 1rem !important;
    left: -1.2rem !important;
  }
</style>

<style scoped>
  .FileList-search {
    padding: 1rem;
    border-bottom: 0.1rem solid #f1f1f1;
  }

  .FileList-Error {
    font-family: "Courier New", Courier, monospace;
    text-align: center;
    font-size: 1.2rem;
    font-weight: 600;
    color: gray;
    /* height: 3rem; */
    line-height: 2rem;

    vertical-align: middle;
    padding: 1rem 0.5rem;
    border-bottom: 0.1rem solid #f1f1f1;
    cursor: pointer;
  }

  .FileList {
    height: 10rem;
    margin: 0.5rem 0rem;
    padding: 1rem 0.5rem;
    border-bottom: 0.1rem solid #f1f1f1;
    cursor: pointer;
    box-sizing: border-box;
  }

  .FileList .FileList-title {
    font-size: 1.7rem;
    padding-bottom: 0.5rem;
    line-height: 2.2rem;
    height: 4.05rem;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    word-break: break-all;
    box-sizing: border-box;
  }

  .FileList .FileList-img {
    height: 5rem !important;
    text-align: center !important;
    color: gray !important;
  }

  .FileList-img>.img-border {
    min-width: 5rem !important;
    height: 100% !important;
    /* border: 0.5px solid #f1f1f1; */
  }

  .FileList .FileList-info {
    margin-top: 1rem;
    font-size: 1.4rem;
    color: gray;
    /*height: 2.5rem;*/
    line-height: 1.6rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>