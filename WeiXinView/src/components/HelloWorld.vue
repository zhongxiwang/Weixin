<template>
  <div>
    <el-row>
      <btn-btngroup :btn-group="item" v-for="(item,index) in btnGroup" :key="index"></btn-btngroup>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      btnGroup: [
        {
          title: "日常管理",
          children: [
            {
              title: "通知公告",
              class: "icon-xinxi"
            },
            {
              title: "通知公告",
              class: "icon-xinxi"
            },
            {
              title: "通知公告",
              class: "icon-xinxi"
            },
            {
              title: "通知公告",
              class: "icon-xinxi"
            },
            {
              title: "通知公告",
              class: "icon-xinxi"
            },
            {
              title: "通知公告",
              class: "icon-xinxi"
            }
          ]
        },
        {
          title: "党团建设",
          children: [
            {
              title: "通知公告",
              class: "icon-xinxi"
            },
            {
              title: "通知公告",
              class: "icon-xinxi"
            },
            {
              title: "通知公告",
              class: "icon-xinxi"
            },
            {
              title: "通知公告",
              class: "icon-xinxi"
            },
            {
              title: "通知公告",
              class: "icon-xinxi"
            },
            {
              title: "通知公告",
              class: "icon-xinxi"
            }
          ]
        }
      ]
    };
  },
  created () {
    this.getBtnGroup();
  },
  methods: {
    getBtnGroup() {
      $.ajax({
        url: "http://localhost/api/items/tzgg/q/9C8547FA-A13N-6EDT-A31U-24FF8B67BCED",
        type: "get",
        dataType: "json",
        data: { userId: "test" }
      })
        .then(result => {
          console.log(result);
          this.btnGroup = result;
        })
        .catch(err => {
          console.log(err);
          layer.alert("获取btnGroup发生异常！");
        });
    }
  }
};
</script>

<style scoped>

</style>
