<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix" style="margin: -9px 0px;">
            <div style="text-align: center;font-size: 1.6rem;">公文查询</div>
        </div>
        <div>
            <el-form ref="form" :model="form" :label-position="'top'">
                <el-form-item label="公文名称" prop="name">
                    <el-input v-model="form.name" placeholder="请填写公文名称"></el-input>
                </el-form-item>
                <el-form-item label="公文类型" prop="wname">
                    <el-select v-model="form.wname" placeholder="请选择公文类型">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="(item,index) in wnameList" :key="item.wname" :label="item.wname" :value="item.wname"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="创建时间">
                    <el-col :span="24">
                        <el-form-item prop="date1">
                            <el-date-picker type="date" :editable="false" placeholder="起始时间" v-model="form.date1" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="24">至</el-col>
                    <el-col :span="24">
                        <el-form-item prop="date2">
                            <el-date-picker type="date" :editable="false" placeholder="截至时间" v-model="form.date2" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="当前状态" prop="status">
                    <el-checkbox-group v-model="form.status">
                        <el-checkbox label="0','1" name="status">在办</el-checkbox>
                        <el-checkbox label="2" name="status">办结</el-checkbox>
                        <el-checkbox label="-2" name="status">退案</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-card>
</template>

<script>
    export default {
        data() {
            return {
                isFirstEnter: false, // 是否第一次进入，默认false
                wnameList: [],
                form: {
                    name: '',
                    wname: '',
                    date1: '',
                    date2: '',
                    status: [],
                }
            }
        },
        beforeRouteEnter(to, from, next) {
            // 路由导航钩子，此时还不能获取组件实例 `this`，所以无法在data中定义变量（利用vm除外）
            if (from.name == "WorkViewList") {
                to.meta.isBack = true;
                //判断是从哪个路由过来的，
                //如果是page2过来的，表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可
            }
            next();
        },
        activated() {
            // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
            if (!this.$route.meta.isBack || this.isFirstEnter) {
                let that = this;

                this.getWnameList();
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
            $("#title").html('公文查询');
            layer.closeAll();
        },
        methods: {
            getWnameList() {
                let MyGlobal = this.$MyGlobal;
                let that = this;

                var AjaxData = {
                    type: ["workflow_define d"],
                    pageNum: 1,
                    PageMax: 1000,
                    fileds: "d.flowname as wname",
                    where: "d.flowtype='公文'",
                    desc: true,
                    filed: "d.flowname"
                };
                var urlAfter = AjaxData.type.join(",");
                var success = function (result) {
                    if (result.length > 0) {
                        for (let i = 0; i < result.length; i++) {
                            that.wnameList.push(result[i]);
                        }
                    }
                };
                var error = function (err) {
                    that.loading = false;
                    layer.alert("获取所有公文类型流程发生异常！");
                }

                MyGlobal.GetDataAjax("get", urlAfter, AjaxData, success, error);
            },
            onSubmit() {
                let that = this;

                var type = that.$route.params.type;
                this.$router.push({
                    name: "WorkViewList",
                    params: {
                        type: type,
                        where: JSON.stringify(that.form)
                    },
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
</style>