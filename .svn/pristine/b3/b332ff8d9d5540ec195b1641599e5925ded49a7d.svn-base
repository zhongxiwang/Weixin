<template>
  <div class="viewbody" v-loading="loading2" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <el-row class="Other">
      <header class="Other-title" v-cloak>{{ data.title }}</header>
      <el-row class="Other-info" :gutter="10">
        <el-col class="auther-img" :span="6">
          <i style="font-size:3rem" class="iconfont icon-icon"></i>
        </el-col>
        <el-col class="auther-name" :span="18">
          &nbsp;
        </el-col>
        <el-col class="auther-time" :span="18">
          <el-row>
            <el-col :span="24">发布时间: {{ data.createtime | stringreplace('T',' ') }}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row id="htmlinfo" class="Other-content" v-html="$options.filters.stringreplace(data.content,'/ypt/NJYPT/upload/..','http://218.94.36.101:8888/weixinpage')"></el-row>
      <!-- 文件 -->
      <el-row class="Other-file" :gutter="10" v-if="data.filename">
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
    name: "OtherInfo",
    data() {
      return {
        loading2: true,
        data: {}
      };
    },
    created() {
      this.getOther();
    },
    methods: {
      getOther() {
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
          layer.alert("获取OtherInfo发生异常！");
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

  .Other {
    padding: 1rem 0.6rem;
  }

  .Other>.Other-title {
    font-size: 2.2rem;
    text-align: center;
    margin-bottom: 0.5rem;
    /* font-weight: 600; */
  }

  .Other>.Other-info {
    font-size: 1rem;
    color: gray;
    border: 0.04rem dashed gray;
    padding: 0.3rem 0px;
  }

  .Other-info>.auther-img {
    height: 5rem;
    text-align: center;
  }

  .auther-img>img {
    width: 98%;
    height: 100%;
    background-color: grey;
  }

  .Other-info>.auther-name {
    font-size: 1.4rem;
    color: black;
    height: 2.5rem;
    line-height: 2.5rem;
    vertical-align: bottom;
    overflow: hidden;
  }

  .Other-info>.auther-time {
    height: 2.5rem;
    line-height: 2.5rem;
    vertical-align: top;
    overflow: hidden;
  }

  .Other-content {
    margin: 2rem auto !important;
    width: 90%;
  }

  .Other>.Other-file {
    font-size: 1rem;
    color: gray;
    border: 0.04rem dashed gray;
    padding: 0.3rem 0px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .Other-file>.file-img {
    height: 5rem;
    text-align: center;

  }

  .file-img>img {
    width: 98%;
    height: 100%;
    background-color: grey;
  }

  .Other-file>.file-name {
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