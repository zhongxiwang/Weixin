<template>
  <div class="viewbody" v-loading="loading2" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <el-row class="NotiveBulletin">
      <header class="NotiveBulletin-title" v-cloak>接收时间: {{ data.title }}</header>
      <el-row class="NotiveBulletin-info" :gutter="10">
        <el-col class="auther-img" :span="6">
          <i style="font-size:3rem" class="iconfont icon-icon"></i>
        </el-col>
        <el-col class="auther-name" :span="18">
          {{ data.username }}
        </el-col>
        <el-col class="auther-time" :span="18">
          <el-row>
            <el-col :span="12">创建人: {{ data.username }}</el-col>
            <el-col :span="12">时间: {{ data.createtime | stringreplace('T',' ') }}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="NotiveBulletin-content" v-html="$options.filters.stringreplace(data.content,'/ypt/NJYPT/upload/..','http://218.94.36.101:8888/weixinpage')"></el-row>
      <!-- 文件 -->
      <el-row class="NotiveBulletin-file" :gutter="10" v-if="data.filename">
        <a download="data.filename | filenamefilter('$')" :title="data.filename | filenamefilter('$')" style="margin-top: 2rem;cursor: pointer;display:block;">
          <el-col class="file-img" :span="6">
            <i class="iconfont icon-fujian" style="font-size:3rem;color: darkorange;"></i>
          </el-col>
          <el-col class="file-name" :span="18">
            {{ data.filename | filenamefilter('$') }}
          </el-col>
        </a>
      </el-row>
    </el-row>
    <br>
    <br>
    <br>
  </div>
</template>

<script>
  import sys_dictionary from '../dictionary'
  let dictionary = sys_dictionary["dictionary"];
  export default {
    name: "NoticeBulletin",
    data() {
      return {
        loading2: true,
        data: {}
      };
    },
    created() {
      this.getNoticeBulletin();
    },
    methods: {
      getNoticeBulletin() {
        let that = this;
        const MyGlobal = this.$MyGlobal;

        var type = that.$route.params.type;
        var id = that.$route.params.id;
        var AjaxData = dictionary[type].AjaxData(id);

        var urlAfter = AjaxData.type.join(",");
        var success = function (result) {
          that.data = result[0];
          that.loading2 = false;
        };
        var error = function (err) {
          that.loading2 = false;
          layer.alert("获取NoticeBulletinInfo发生异常！");
        }

        MyGlobal.GetDataAjax("get", urlAfter, AjaxData, success, error);
      }
    }
  };
</script>

<style scoped>
  img {
    transform: scale(0.2);
  }

  #htmlinfo {
    font-size: 2rem;
    line-height: 150%;
  }

  .NotiveBulletin {
    padding: 1rem 0.6rem;
  }

  .NotiveBulletin>.NotiveBulletin-title {
    font-size: 2.2rem;
    text-align: center;
    margin-bottom: 0.5rem;
    /* font-weight: 600; */
  }

  .NotiveBulletin>.NotiveBulletin-info {
    font-size: 1rem;
    color: gray;
    border: 0.04rem dashed gray;
    padding: 0.3rem 0px;
  }

  .NotiveBulletin-info>.auther-img {
    height: 5rem;
    text-align: center;
  }

  .auther-img>img {
    width: 98%;
    height: 100%;
    background-color: grey;
  }

  .NotiveBulletin-info>.auther-name {
    font-size: 1.4rem;
    color: black;
    height: 2.5rem;
    line-height: 2.5rem;
    vertical-align: bottom;
    overflow: hidden;
  }

  .NotiveBulletin-info>.auther-time {
    height: 2.5rem;
    line-height: 2.5rem;
    vertical-align: top;
    overflow: hidden;
  }

  .NotiveBulletin>.NotiveBulletin-content {
    margin: 2rem auto !important;
    width: 90%;
    /* font-size: 1.4rem; */
  }


  .NotiveBulletin>.NotiveBulletin-file {
    font-size: 1rem;
    color: gray;
    border: 0.04rem dashed gray;
    padding: 0.3rem 0px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .NotiveBulletin-file>a>.file-img {
    height: 5rem;
    text-align: center;

  }

  .file-img>img {
    width: 98%;
    height: 100%;
    background-color: grey;
  }

  .NotiveBulletin-file>a>.file-name {
    word-wrap: break-word;
    word-break: break-all;
    font-size: 1.4rem;
    color: black;
    height: 2.5rem;
    line-height: 2.5rem;
    vertical-align: bottom;
    text-overflow: ellipsis;
  }
</style>