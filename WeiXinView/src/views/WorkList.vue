<template>
    <div class="viewbody" v-loading.lock="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-row class="WorkList-search">
            <el-col :span="24">
                <div class="demo-input-suffix">
                    <el-input v-model="value" placeholder="请输入标题" class="input-with-select" size="small" prefix-icon="el-icon-search">
                        <el-button slot="append" icon="el-icon-search" @click.native="getWrokListSearch();"></el-button>
                    </el-input>
                </div>
            </el-col>
        </el-row>
        <el-row v-if="data.length==0">
            <el-col class="WorkList-Error" :span="24">无数据</el-col>
        </el-row>

        <el-row class="WorkList" v-for="(item,index) in data" :key="index" @click.native="ItemClick(item);">
            <el-row :gutter="10">
                <el-col class="WorkList-img" :span="5">
                    <div class="img-border">
                        <i style="font-size:4rem" class="iconfont icon-weibiaoti1"></i>
                    </div>
                </el-col>
                <el-col class="WorkList-title" :span="19">
                    {{ item.name }}
                </el-col>
                <el-col class="WorkList-info" :span="24">
                    <el-row :gutter="30">
                        <el-col :span="12">类型: {{ item.wname }}</el-col>
                        <el-col :span="12" style="text-align: right;">{{ item.createtime | stringreplace('T',' ') }}</el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-row>
    </div>
</template>

<script>
    import sys_dictionary from '../dictionary'
    let dictionary = sys_dictionary["dictionary"];
    export default {
        name: "WorkList",
        data() {
            return {
                isFirstEnter: false, // 是否第一次进入，默认false

                loading: false,
                data: [],
                pageNum: 1,
                PageMax: 20,
                value: "",
                sw: false
            };
        },
        beforeRouteEnter(to, from, next) {
            // 路由导航钩子，此时还不能获取组件实例 `this`，所以无法在data中定义变量（利用vm除外）
            if (from.name == "WorkItem") {
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
                let that = this;

                that.data = [];
                that.pageNum = 1;
                that.PageMax = 20;
                //首次进入加载事件
                this.getWorkList();
                this.pageNum = 1;
                if (this.pageNum == "1") {//首次加载数据出现加载层
                    this.loading = true;
                }

                //滚动加载事件
                $(window).unbind("scroll");
                $(window).scroll(function (e) {
                    let scrollTop = $(this).scrollTop();
                    let scrollHeight = $(document).height();
                    let windowHeight = $(this).height();
                    if (scrollTop + windowHeight >= scrollHeight - 350) {
                        if (that.$route.name.toLowerCase() != "worklist") {
                            return false;
                        }

                        if (that.sw) {
                            that.sw = false;
                            //this.pageNum = this.pageNum + 1;
                            that.getWorkList();
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
            var type = this.$route.params.type;
            $("#title").html(dictionary[type]["title"]);
            layer.closeAll();
        },
        methods: {
            getWorkList() {
                let that = this;
                const MyGlobal = that.$MyGlobal;

                var userid = that.$UserInfo.userId;
                var type = this.$route.params.type;

                var whereValue = this.value;
                var AjaxData = dictionary[type].AjaxData(this.pageNum, this.PageMax, userid, whereValue);

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
                    that.loading = false;
                    if (result.length > 0) {
                        that.sw = true;
                    }
                    else {
                        that.sw = false;
                        layer.msg("无数据！");
                    }
                };
                var error = function (err) {
                    that.loading = false;
                    layer.alert("获取WrokList发生异常！");
                }

                MyGlobal.GetDataAjax("get", urlAfter, AjaxData, success, error);
            },
            getWrokListSearch() {
                this.data = [];
                this.pageNum = 1;
                this.loading = true;

                this.getWorkList();
            },
            ItemClick(data) {
                var id = data.id;
                var type = this.$route.params.type;
                this.$router.push({
                    name: "WorkItem",
                    params: { type: type, iid: data.iid, wiid: data.wiid, nwiid: "w" + data.wiid, step: data.step }
                });
            }
        }
    };
</script>

<style>
    .WorkList-search {
        padding: 1rem;
        border-bottom: 0.1rem solid #f1f1f1;
    }

    .WorkList-Error {
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

    .WorkList {
        height: 10rem;
        margin: 0.5rem 0rem;
        padding: 1rem 0.5rem;
        border-bottom: 0.1rem solid #f1f1f1;
        cursor: pointer;
        box-sizing: border-box;
    }

    /* .WorkList:hover {
        background-color: #5cb85c;
        color: white;
      } */

    .WorkList .WorkList-title {
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

    .WorkList .WorkList-img {
        height: 5rem !important;
        text-align: center !important;
        color: gray !important;
    }

    .WorkList-img>.img-border {
        min-width: 5rem !important;
        height: 100% !important;
        /* border: 0.5px solid #f1f1f1; */
    }

    .WorkList .WorkList-info {
        margin-top: 1rem;
        font-size: 1.4rem;
        color: gray;
        /*height: 2.5rem;*/
        line-height: 1.6rem;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>