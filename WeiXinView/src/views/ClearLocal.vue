<template>
    <el-row>
        <el-col :span="24">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="手机号" size="small">
                    <el-input v-model="mobile" placeholder="请输入你想要切换的号码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="triggerMobile">切换号码</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="24" style="text-align: center;">
            <el-button type="primary" @click="ClearCache">清楚本地缓存</el-button>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        data() {
            return {
                mobile: localStorage.mobile
            }
        },
        methods: {
            triggerMobile() {
                localStorage.setItem("mobile", this.mobile);
                layer.alert("更换成功！");
            },
            ClearCache() {
                function setCookie(name, value, Days) {
                    var exp = new Date();
                    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
                    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
                };

                localStorage.clear();
                setCookie("mobile", "", 1);
                layer.alert("清理成功！");
            }
        }
    }
</script>