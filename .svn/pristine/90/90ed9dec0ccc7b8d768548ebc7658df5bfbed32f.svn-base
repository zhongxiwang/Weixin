<template>
    <div class="viewbody" v-loading.lock="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-card shadow="hover" style="width: 98%;margin: 3px auto">
            <div slot="header" class="clearfix" style="margin: -9px 0px;">
                <span style="font-size: 1.6rem;">选择流向</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="DoSubmit">提交</el-button>
            </div>
            <!--  -->
            <div id="dosubmitPanel" style="margin: -10px;">
                <table border="1" cellpadding="0" cellspacing="0" style="width: 100%">
                    <tr v-for="(item1,index1) in tableData">
                        <td id="step" :colspan="(!item1.UserGroupList||item1.UserGroupList.length==0)&&(!item1.UserList||item1.UserList.length==0)?2:''" style="min-width: 50px;width: 20%;padding: 10px 5px;">
                            <span v-if="!((!item1.UserGroupList||item1.UserGroupList.length==0)&&(!item1.UserList||item1.UserList.length==0))">{{ item1.FlowName }}</span>
                            <el-radio-group v-if="(!item1.UserGroupList||item1.UserGroupList.length==0)&&(!item1.UserList||item1.UserList.length==0)"
                                v-model="selectUser" size="mini">
                                <el-radio-button :label="item1.FlowName">{{ item1.FlowName }}</el-radio-button>
                            </el-radio-group>
                        </td>
                        <td id="groupby1" v-if="!item1.UserGroupList&&item1.UserList" style="width: 80%;">
                            <div is="el-radio-group" v-model="selectUser" size="mini">
                                <span is="el-radio-button" v-for="(item2,index2) in item1.UserList" :label="item1.FlowName+','+item2.UserId">{{ item2.UserName }}</span>
                            </div>
                        </td>
                        <td id="groupby2" v-if="item1.UserGroupList&&!item1.UserList" style="width: 80%">
                            <table border="0" cellpadding="0" cellspacing="0">
                                <tr v-for="(item2,index2) in item1.UserGroupList">
                                    <td style="min-width: 50px;width: 20%;border-top: 0.6px solid gray;padding: 10px 5px;text-align: center;border-right: 0.6px solid gray">{{ item2.groupname }}</td>
                                    <td style="border-top: 0.6px solid gray;width: 80%">
                                        <div is="el-radio-group" v-model="selectUser" size="mini">
                                            <span is="el-radio-button" v-for="(item3,index3) in item2.UserList" :label="item1.FlowName+','+item2.groupname+','+item3.UserId">{{ item3.UserName }}</span>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                selectUser: "",
                tableData: {}
            };
        },
        created() {
            this.JsonSubmitUser();
            layer.closeAll();
        },
        methods: {
            JsonSubmitUser() {
                let that = this;
                const MyGlobal = this.$MyGlobal;

                that.loading = true;
                var iid = this.$route.params.iid;
                var wiid = this.$route.params.wiid;
                var urlParams = "wiid=" + wiid + "&iid=" + iid;
                var success = function (result) {
                    that.tableData = JSON.parse(result).FlowList;
                    that.loading = false;
                };
                var error = function (err) {
                    that.loading = false;
                };

                var type = that.$route.params.type;
                if (type == "gwbl") {
                    MyGlobal.GetDataAshx(urlParams, "", success, error);
                }
                else {
                    MyGlobal.GetDataAshxNJSJ(urlParams, "", success, error);
                }
            },
            DoSubmit() {
                if (this.selectUser) {
                    let that = this;
                    var list = this.selectUser.split(",");
                    var iid = this.$route.params.iid;
                    var wiid = this.$route.params.wiid;
                    var flows = list[0];
                    var users = list.length > 1 ? list[list.length - 1] : "";

                    let MyGlobal = this.$MyGlobal;
                    var success = function (result) {
                        that.loading = false;
                        if (!result) {
                            layer.msg("提交成功！", function (e) {
                                /*that.$router.replace({
                                    name: "WorkList"
                                });*/
                                console.log(window.history.length);
                                that.$router.go((window.history.length - 1) * -1);
                                layer.closeAll();
                            });

                        }
                        else {
                            layer.msg("提交失败！");
                        }
                    };
                    //获取数据失败回调
                    var error = function (res) {
                        that.loading = false;
                        console.log(res);
                        layer.msg("提交失败！");
                    };
                    that.loading = true;
                    var type = that.$route.params.type;
                    if (type == "gwbl") {
                        MyGlobal.NetofficeSubmit(iid, wiid, flows, users, success, error);
                    }
                    else {
                        MyGlobal.NetofficeSubmitNJSJ(iid, wiid, flows, users, success, error);
                    }
                }
                else {
                    layer.msg("请选择提交流向及提交人");
                }
            }
        }
    }
</script>

<style>
    #dosubmitPanel {
        font-size: 1.2rem
    }

    #groupby1,
    #groupby2 .el-radio-button--mini .el-radio-button__inner {
        width: 70px;
        overflow: hidden;
    }

    #step>.el-radio-group>.el-radio-button.el-radio-button--mini>.el-radio-button__inner {
        width: auto;
    }
</style>