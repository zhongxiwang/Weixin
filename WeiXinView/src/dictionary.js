var dictionary = {
    tz: {
        title: "通知",
        type: 3,
        region: "fj",
        program_name: "fjtz",
        AjaxData: function (pageNum, PageMax, loginName, whereValue) {
            var AjaxData = {
                type: ["other a", "othertend b", "user c"],
                pageNum: pageNum,
                PageMax: PageMax,
                fileds: "a.id as id,a.title,a.time as createtime,c.user_name as username,case when nvl(b.isclick,'1')='1' then 0 else 1 end as readflag",
                where: "a.id=b.otherid and a.cuser=c.login_name and a.type='通知通报' and b.userid='" + loginName + "'",
                desc: true,
                filed: "a.time"
            };

            if (whereValue != "") {
                AjaxData.where += " and instr(a.title,'" + whereValue + "')>0 ";
            }

            return AjaxData;
        }
    },
    tzinfo: {
        title: "通知详情",
        type: 3,
        region: "fj",
        program_name: "fjtz",
        AjaxData: function (id) {
            var AjaxData = {
                type: ["other a", "user c"],
                pageNum: 1,
                PageMax: 1,
                fileds: "a.id as id,a.title,a.time as createtime,c.user_name as username,a.content,a.filename as filename",
                where: "a.cuser=c.login_name and a.id='" + id + "'"
            };

            return AjaxData;
        }
    },
    gg: {
        title: "公告",
        type: 1,
        region: "fj",
        program_name: "gg"
    },
    ljcy: {
        title: "来件查阅",
        type: "SubData",
        region: "fj",
        program_name: "ljcy",
        AjaxData: function (pageNum, PageMax, loginName, whereValue) {
            var AjaxData = {
                type: ["uploadfile a", "browsefile b", "user c"],
                pageNum: pageNum,
                PageMax: PageMax,
                fileds: "a.id,a.filename,a.owner,a.uploadtime as createtime,c.user_name as username,nvl(b.readflag,'0') as readflag,replace(substr(a.ftppath,instr(a.ftppath,'@',1,2)+1),'\\','/') as filepath",
                where: "a.filename=b.filename and nvl(b.isdelete,0)='0' and a.owner=c.login_name and a.department='SubData' and b.userid='" + loginName + "'",
                desc: true,
                filed: "a.uploadtime"
            };

            if (whereValue != "") {
                AjaxData.where += " and instr(substr(a.filename,instr(a.filename,'$')+1),'" + whereValue + "')>0 ";
            }

            return AjaxData;
        }
    },
    mzcp: {
        title: "每周菜谱",
        type: "每周菜单",
        region: "fj",
        program_name: "mzcp",
        AjaxData: function (pageNum, PageMax, whereValue) {
            var AjaxData = {
                type: ["other a"],
                pageNum: pageNum,
                PageMax: PageMax,
                fileds: "a.id,a.title,a.time as createtime",
                where: "a.type='每周菜单'",
                desc: true,
                filed: "a.time"
            };

            if (whereValue != "") {
                AjaxData.where += " and instr(a.title,'" + whereValue + "')>0 ";
            }

            return AjaxData;
        }
    },
    mzcpinfo: {
        title: "每周菜谱",
        type: "每周菜单",
        program_name: "mzcp",
        region: "fj",
        AjaxData: function (id) {
            var AjaxData = {
                type: ["other a"],
                pageNum: 1,
                PageMax: 1,
                fileds: "a.id,a.title,a.content,a.time as createtime,a.filename",
                where: "a.id='" + id + "'",
                desc: true,
                filed: "a.time"
            };

            return AjaxData;
        }
    },
    sjjgsw: {
        title: "机关事务",
        type: "工会工作",
        region: "fj",
        program_name: "sjjgsw",
        AjaxData: function (pageNum, PageMax, whereValue) {
            var AjaxData = {
                type: ["other a"],
                pageNum: pageNum,
                PageMax: PageMax,
                fileds: "a.id,a.title,a.time as createtime",
                where: "a.type='工会工作'",
                desc: true,
                filed: "a.time"
            };

            if (whereValue != "") {
                AjaxData.where += " and instr(a.title,'" + whereValue + "')>0 ";
            }

            return AjaxData;
        }
    },
    jgswinfo: {
        title: "机关事务详情",
        type: "机关事务",
        region: "fj",
        program_name: "jgsw",
        AjaxData: function (id) {
            var AjaxData = {
                type: ["other a"],
                pageNum: 1,
                PageMax: 1,
                fileds: "a.id,a.title,a.content,a.time as createtime,a.filename",
                where: "a.id='" + id + "'",
                desc: true,
                filed: "a.time"
            };

            return AjaxData;
        }
    },
    gbrm: {
        title: "干部任免",
        type: "干部任免",
        region: "fj",
        program_name: "gbrm",
        AjaxData: function (pageNum, PageMax, whereValue) {
            var AjaxData = {
                type: ["other a"],
                pageNum: pageNum,
                PageMax: PageMax,
                fileds: "a.id,a.title,a.time as createtime",
                where: "a.type='干部任免'",
                desc: true,
                filed: "a.time"
            };

            if (whereValue != "") {
                AjaxData.where += " and instr(a.title,'" + whereValue + "')>0 ";
            }

            return AjaxData;
        }
    },
    jgbrminfo: {
        title: "市局干部任免详情",
        type: "干部任免",
        region: "fj",
        program_name: "gbrm",
        AjaxData: function (id) {
            var AjaxData = {
                type: ["other a"],
                pageNum: 1,
                PageMax: 1,
                fileds: "a.id,a.title,a.content,a.time as createtime,a.filename",
                where: "a.id='" + id + "'",
                desc: true,
                filed: "a.time"
            };

            return AjaxData;
        }
    },
    ldyzgzap: {
        title: "领导一周工作安排",
        type: "GZAP",
        region: "fj",
        program_name: "ldyzgzap",
        AjaxData: function (pageNum, PageMax, loginName, whereValue) {
            var AjaxData = {
                type: ["uploadfile a", "user c"],
                pageNum: pageNum,
                PageMax: PageMax,
                fileds: "a.id,a.filename,a.owner,a.uploadtime as createtime,c.user_name as username,'1' as readflag,a.department",
                where: "a.owner=c.login_name and a.department='GZAP'",
                desc: true,
                filed: "a.uploadtime"
            };

            if (whereValue != "") {
                AjaxData.where += " and instr(substr(a.filename,instr(a.filename,'$')+1),'" + whereValue + "')>0 ";
            }

            return AjaxData;
        }
    },
    hyjy: {
        title: "会议纪要",
        type: "HYJY",
        program_name: "hyjy",
        region: "fj",
        AjaxData: function (pageNum, PageMax, loginName, whereValue) {
            var AjaxData = {
                type: ["uploadfile a", "user c"],
                pageNum: pageNum,
                PageMax: PageMax,
                fileds: "a.id,a.filename,a.owner,a.uploadtime as createtime,c.user_name as username,'1' as readflag,a.department",
                where: "a.owner=c.login_name and a.department='HYJY'",
                desc: true,
                filed: "a.uploadtime"
            };

            if (whereValue != "") {
                AjaxData.where += " and instr(substr(a.filename,instr(a.filename,'$')+1),'" + whereValue + "')>0 ";
            }

            return AjaxData;
        }
    },
    gzjb: {
        title: "工作简报",
        type: "GTZYZWXX",
        program_name: "gzjb",
        region: "fj",
        AjaxData: function (pageNum, PageMax, loginName, whereValue) {
            var AjaxData = {
                type: ["uploadfile a", "user c"],
                pageNum: pageNum,
                PageMax: PageMax,
                fileds: "a.id,a.filename,a.owner,a.uploadtime as createtime,c.user_name as username,'1' as readflag,a.department",
                where: "a.owner=c.login_name and a.department='GTZYZWXX'",
                desc: true,
                filed: "a.uploadtime"
            };

            if (whereValue != "") {
                AjaxData.where += " and instr(substr(a.filename,instr(a.filename,'$')+1),'" + whereValue + "')>0 ";
            }

            return AjaxData;
        }
    },
    fjdctb: {
        title: "市局督察通报",
        type: "DCDBTB",
        program_name: "dctb",
        region: "fj",
        AjaxData: function (pageNum, PageMax, loginName, whereValue) {
            var AjaxData = {
                type: ["sjuploadfile a", "user c"],
                pageNum: pageNum,
                PageMax: PageMax,
                fileds: "a.id,a.filename,a.owner,a.uploadtime as createtime,c.user_name as username,'1' as readflag,a.department",
                where: "a.owner=c.login_name and a.department='DCDBTB'",
                desc: true,
                filed: "a.uploadtime"
            };

            if (whereValue != "") {
                AjaxData.where += " and instr(substr(a.filename,instr(a.filename,'$')+1),'" + whereValue + "')>0 ";
            }

            return AjaxData;
        }
    },
    gqtd: {
        title: "市局共青团队",
        type: "共青团工作",
        program_name: "gqtd",
        region: "fj",
        AjaxData: function (pageNum, PageMax, whereValue) {
            var AjaxData = {
                type: ["other a"],
                pageNum: pageNum,
                PageMax: PageMax,
                fileds: "a.id,a.title,a.time as createtime",
                where: "a.type='共青团工作'",
                desc: true,
                filed: "a.time"
            };

            if (whereValue != "") {
                AjaxData.where += " and instr(a.title,'" + whereValue + "')>0 ";
            }

            return AjaxData;
        }
    },
    gqtdinfo: {
        title: "市局共青团队详情",
        type: "共青团工作",
        program_name: "gqtd",
        region: "fj",
        AjaxData: function (id) {
            var AjaxData = {
                type: ["other a"],
                pageNum: 1,
                PageMax: 1,
                fileds: "a.id,a.title,a.content,a.time as createtime,a.filename",
                where: "a.id='" + id + "'",
                desc: true,
                filed: "a.time"
            };

            return AjaxData;
        }
    },
    sjdzt: {
        title: "十九大专题",
        type: "十九大",
        program_name: "sjdzt",
        region: "fj",
        AjaxData: function (pageNum, PageMax, whereValue) {
            var AjaxData = {
                type: ["uploadfile a", "user c"],
                pageNum: pageNum,
                PageMax: PageMax,
                fileds: "a.id,a.filename,a.owner,a.uploadtime as createtime,c.user_name as username,'1' as readflag,a.department",
                where: "a.owner=c.login_name and a.department='十九大'",
                desc: true,
                filed: "a.uploadtime"
            };

            if (whereValue != "") {
                AjaxData.where += " and instr(substr(a.filename,instr(a.filename,'$')+1),'" + whereValue + "')>0 ";
            }

            return AjaxData;
        }
    },
    jgdj: {
        title: "机关党建",
        type: "机关党建",
        program_name: "jgdj",
        region: "fj",
        AjaxData: function (pageNum, PageMax, whereValue) {
            var AjaxData = {
                type: ["other a"],
                pageNum: pageNum,
                PageMax: PageMax,
                fileds: "a.id,a.title,a.time as createtime",
                where: "a.type='机关党建'",
                desc: true,
                filed: "a.time"
            };

            if (whereValue != "") {
                AjaxData.where += " and instr(a.title,'" + whereValue + "')>0 ";
            }

            return AjaxData;
        }
    },
    jgdjinfo: {
        title: "机关党建详情",
        type: "机关党建",
        program_name: "jgdj",
        region: "fj",
        AjaxData: function (id) {
            var AjaxData = {
                type: ["other a"],
                pageNum: 1,
                PageMax: 1,
                fileds: "a.id,a.title,a.content,a.time as createtime,a.filename",
                where: "a.id='" + id + "'",
                desc: true,
                filed: "a.time"
            };

            return AjaxData;
        }
    },
    zsk: {
        title: "知识库",
        type: "ZSK",
        program_name: "zsk",
        region: "fj",
        AjaxData: function (pageNum, PageMax, whereValue) {
            var AjaxData = {
                type: ["videoinfo a"],
                pageNum: pageNum,
                PageMax: PageMax,
                fileds: "a.id,a.name as title,a.uptime as createtime",
                where: "a.type='ZSK' ",
                desc: true,
                filed: "a.uptime"
            };

            if (whereValue != "") {
                AjaxData.where += " and instr(a.name,'" + whereValue + "')>0 ";
            }

            return AjaxData;
        }
    },
    xwzx: {
        title: "市局新闻中心",
        type: "行业新闻",
        program_name: "xwzx",
        region: "fj",
        AjaxData: function (pageNum, PageMax, whereValue) {
            var AjaxData = {
                type: ["other a"],
                pageNum: pageNum,
                PageMax: PageMax,
                fileds: "a.id,a.title,a.time as createtime",
                where: "a.type='行业新闻'",
                desc: true,
                filed: "a.time"
            };

            if (whereValue != "") {
                AjaxData.where += " and instr(title,'" + whereValue + "')>0 ";
            }

            return AjaxData
        }
    },
    xwzxinfo: {
        title: "新闻中心详情",
        type: "行业新闻",
        region: "fj",
        program_name: "xwzx",
        AjaxData: function (id) {
            var AjaxData = {
                type: ["other a"],
                pageNum: 1,
                PageMax: 1,
                fileds: "a.id,a.title,a.content,a.time as createtime,a.filename",
                where: "id='" + id + "'",
                desc: true,
                filed: "a.time"
            };

            return AjaxData;
        }
    },
    gwbl: {
        title: "公文办理",
        type: "公文办理",
        program_name: "gwbl",
        region: "fj",
        AjaxData: function (pageNum, PageMax, userid, whereValue) {
            var AjaxData = {
                type: ["instance a", "workitem b", "workflow c", "workflow_define d"],
                pageNum: pageNum,
                PageMax: PageMax,
                fileds: "a.iid,a.wid,c.wname,a.name,b.wiid,b.step,b.active,b.accepted_time as createtime",
                where: "a.status=1 and b.active>=0 and a.iid=b.iid and a.wid=c.wid and c.wname=d.flowname and d.flowtype='公文' and b.userid='" + userid + "'",
                desc: true,
                filed: "b.wiid"
            };
            if (whereValue != "") {
                AjaxData.where += " and instr(name,'" + whereValue + "')>0 ";
            }

            return AjaxData;
        }
    },
    gwcx: {
        title: "公文查询",
        type: "公文查询",
        program_name: "gwcx",
        region: "fj",
        AjaxData: function (pageNum, PageMax, whereValue) {
            var AjaxData = {
                type: ["instance a", "workflow c", "workflow_define d"],
                pageNum: pageNum,
                PageMax: PageMax,
                fileds: "a.iid,a.wid,c.wname,a.name,a.accepted_time as createtime",
                where: "a.wid=c.wid and c.wname=d.flowname and d.flowtype='公文'",
                desc: true,
                filed: "a.accepted_time"
            };
            if (whereValue.name) {
                AjaxData.where += " and instr(a.name,'" + whereValue.name + "')>0 ";
            }
            if (whereValue.wname) {
                AjaxData.where += " and c.wname='" + whereValue.wname + "'";
            }
            if (whereValue.date1) {
                AjaxData.where += " and a.accepted_time>to_date('" + whereValue.date1 + "','yyyy-MM-dd')";
            }
            if (whereValue.date2) {
                AjaxData.where += " and a.accepted_time<to_date('" + whereValue.date2 + "','yyyy-MM-dd')+1";
            }
            if (whereValue.status.length > 0) {
                AjaxData.where += " and a.status in ('" + whereValue.status.join("','") + "')";
            }

            return AjaxData;
        }
    },

    // 市局
    sjtz: {
        title: "市局通知",
        type: 3,
        region: "sj",
        program_name: "sjtz",
        AjaxData: function (pageNum, PageMax, loginName, whereValue) {
            var AjaxData = {
                type: ["njtzgg a", "njtzgguser b", "njuser c"],
                pageNum: pageNum,
                PageMax: PageMax,
                fileds: "a.issueid as id,a.title,a.issuetime as createtime,c.user_name as username,nvl(b.user_read,1) as readflag",
                where: "a.issueid = b.issueid and a.userid=c.login_name and b.userid='" + loginName + "'",
                desc: true,
                filed: "a.issuetime"
            };

            if (whereValue != "") {
                AjaxData.where += " and instr(a.title,'" + whereValue + "')>0 ";
            }

            return AjaxData;
        }
    },
    sjtzinfo: {
        title: "市局通知详情",
        type: 3,
        region: "sj",
        program_name: "sjtz",
        AjaxData: function (id) {
            var AjaxData = {
                type: ["njtzgg a", "njuser c"],
                pageNum: 1,
                PageMax: 1,
                fileds: "a.issueid as id,a.title,a.issuetime as createtime,c.user_name as username,a.content,a.fileload as filename",
                where: "a.userid=c.login_name and a.issueid ='" + id + "'",
            };

            return AjaxData;
        }
    },
    sjljcy: {
        title: "来件查阅",
        type: "SubData",
        region: "sj",
        program_name: "sjljcy",
        AjaxData: function (pageNum, PageMax, loginName, whereValue) {
            var AjaxData = {
                type: ["njsjuploadfile a", "njsjbrowsefile b", "njuser c"],
                pageNum: pageNum,
                PageMax: PageMax,
                fileds: "a.id,a.filename,a.owner,a.uploadtime as createtime,c.user_name as username,nvl(b.readflag,'0') as readflag,a.department",
                where: "a.filename=b.filename and nvl(b.isdelete,0)='0' and a.owner=c.login_name and a.department='SubData' and b.userid='" + loginName + "'",
                desc: true,
                filed: "a.uploadtime"
            };

            if (whereValue != "") {
                AjaxData.where += " and instr(substr(a.filename,instr(a.filename,'$')+1),'" + whereValue + "')>0 ";
            }

            return AjaxData;
        }
    },
    sjjgsw: {
        title: "市局机关事务",
        type: "工会工作",
        region: "fj",
        program_name: "sjjgsw",
        AjaxData: function (pageNum, PageMax, whereValue) {
            var AjaxData = {
                type: ["njother a"],
                pageNum: pageNum,
                PageMax: PageMax,
                fileds: "a.id,a.title,a.time as createtime",
                where: "a.type='工会工作'",
                desc: true,
                filed: "a.time"
            };

            if (whereValue != "") {
                AjaxData.where += " and instr(a.title,'" + whereValue + "')>0 ";
            }

            return AjaxData;
        }
    },
    sjjgswinfo: {
        title: "市局机关事务详情",
        type: "机关事务",
        region: "sj",
        program_name: "sjjgsw",
        AjaxData: function (id) {
            var AjaxData = {
                type: ["njother a"],
                pageNum: 1,
                PageMax: 1,
                fileds: "a.id,a.title,a.content,a.time as createtime,a.filename",
                where: "a.id='" + id + "'",
                desc: true,
                filed: "a.time"
            };

            return AjaxData;
        }
    },
    sjgbrm: {
        title: "市局干部任免",
        type: "干部任免",
        region: "sj",
        program_name: "sjgbrm",
        AjaxData: function (pageNum, PageMax, whereValue) {
            var AjaxData = {
                type: ["njother a"],
                pageNum: pageNum,
                PageMax: PageMax,
                fileds: "a.id,a.title,a.time as createtime",
                where: "a.type='干部任免'",
                desc: true,
                filed: "a.time"
            };

            if (whereValue != "") {
                AjaxData.where += " and instr(a.title,'" + whereValue + "')>0 ";
            }

            return AjaxData;
        }
    },
    sjgbrminfo: {
        title: "市局干部任免详情",
        type: "干部任免",
        region: "sj",
        program_name: "sjgbrm",
        AjaxData: function (id) {
            var AjaxData = {
                type: ["njother a"],
                pageNum: 1,
                PageMax: 1,
                fileds: "a.id,a.title,a.content,a.time as createtime,a.filename",
                where: "a.id='" + id + "'",
                desc: true,
                filed: "a.time"
            };

            return AjaxData;
        }
    },
    sjldyzgzap: {
        title: "市局领导一周工作安排",
        type: "GZAP",
        region: "sj",
        program_name: "sjldyzgzap",
        AjaxData: function (pageNum, PageMax, loginName, whereValue) {
            var AjaxData = {
                type: ["njsjuploadfile a", "njuser c"],
                pageNum: pageNum,
                PageMax: PageMax,
                fileds: "a.id,a.filename,a.owner,a.uploadtime as createtime,c.user_name as username,'1' as readflag,a.department",
                where: "a.owner=c.login_name and a.department='GZAP'",
                desc: true,
                filed: "a.uploadtime"
            };

            if (whereValue != "") {
                AjaxData.where += " and instr(substr(a.filename,instr(a.filename,'$')+1),'" + whereValue + "')>0 ";
            }

            return AjaxData;
        }
    },
    sjhyjy: {
        title: "市局会议纪要",
        type: "HYJY",
        program_name: "sjhyjy",
        region: "sj",
        AjaxData: function (pageNum, PageMax, loginName, whereValue) {
            var AjaxData = {
                type: ["njsjuploadfile a", "njuser c"],
                pageNum: pageNum,
                PageMax: PageMax,
                fileds: "a.id,a.filename,a.owner,a.uploadtime as createtime,c.user_name as username,'1' as readflag,a.department",
                where: "a.owner=c.login_name and a.department='HYJY'",
                desc: true,
                filed: "a.uploadtime"
            };

            if (whereValue != "") {
                AjaxData.where += " and instr(substr(a.filename,instr(a.filename,'$')+1),'" + whereValue + "')>0 ";
            }

            return AjaxData;
        }
    },
    sjgzjb: {
        title: "市局工作简报",
        type: "GTZYZWXX",
        program_name: "gzjb",
        region: "sj",
        AjaxData: function (pageNum, PageMax, loginName, whereValue) {
            var AjaxData = {
                type: ["njsjuploadfile a", "njuser c"],
                pageNum: pageNum,
                PageMax: PageMax,
                fileds: "a.id,a.filename,a.owner,a.uploadtime as createtime,c.user_name as username,'1' as readflag,a.department",
                where: "a.owner=c.login_name and a.department='GTZYZWXX'",
                desc: true,
                filed: "a.uploadtime"
            };

            if (whereValue != "") {
                AjaxData.where += " and instr(substr(a.filename,instr(a.filename,'$')+1),'" + whereValue + "')>0 ";
            }

            return AjaxData;
        }
    },
    sjdctb: {
        title: "市局督察通报",
        type: "DCDBTB",
        program_name: "sjdctb",
        region: "sj",
        AjaxData: function (pageNum, PageMax, loginName, whereValue) {
            var AjaxData = {
                type: ["njsjuploadfile a", "njuser c"],
                pageNum: pageNum,
                PageMax: PageMax,
                fileds: "a.id,a.filename,a.owner,a.uploadtime as createtime,c.user_name as username,'1' as readflag,a.department",
                where: "a.owner=c.login_name and a.department='DCDBTB'",
                desc: true,
                filed: "a.uploadtime"
            };

            if (whereValue != "") {
                AjaxData.where += " and instr(substr(a.filename,instr(a.filename,'$')+1),'" + whereValue + "')>0 ";
            }

            return AjaxData;
        }
    },
    sjgqtd: {
        title: "市局共青团队",
        type: "共青团工作",
        program_name: "sjgqtd",
        region: "sj",
        AjaxData: function (pageNum, PageMax, whereValue) {
            var AjaxData = {
                type: ["njother a"],
                pageNum: pageNum,
                PageMax: PageMax,
                fileds: "a.id,a.title,a.time as createtime",
                where: "a.type='共青团工作'",
                desc: true,
                filed: "a.time"
            };

            if (whereValue != "") {
                AjaxData.where += " and instr(a.title,'" + whereValue + "')>0 ";
            }

            return AjaxData;
        }
    },
    sjgqtdinfo: {
        title: "市局共青团队详情",
        type: "共青团工作",
        program_name: "sjgqtd",
        region: "sj",
        AjaxData: function (id) {
            var AjaxData = {
                type: ["njother a"],
                pageNum: 1,
                PageMax: 1,
                fileds: "a.id,a.title,a.content,a.time as createtime,a.filename",
                where: "a.id='" + id + "'",
                desc: true,
                filed: "a.time"
            };

            return AjaxData;
        }
    },
    sjsjdzt: {
        title: "市局十九大专题",
        type: "十九大",
        program_name: "sjsjdzt",
        region: "sj",
        AjaxData: function (pageNum, PageMax, loginName, whereValue) {
            var AjaxData = {
                type: ["njsjuploadfile a", "njuser c"],
                pageNum: pageNum,
                PageMax: PageMax,
                fileds: "a.id,a.filename,a.owner,a.uploadtime as createtime,c.user_name as username,'1' as readflag,a.department",
                where: "a.owner=c.login_name and a.department='十九大'",
                desc: true,
                filed: "a.uploadtime"
            };

            if (whereValue != "") {
                AjaxData.where += " and instr(substr(a.filename,instr(a.filename,'$')+1),'" + whereValue + "')>0 ";
            }

            return AjaxData;
        }
    },
    sjjgdj: {
        title: "市局机关党建",
        type: "机关党建",
        program_name: "sjjgdj",
        region: "sj",
        AjaxData: function (pageNum, PageMax, whereValue) {
            var AjaxData = {
                type: ["njother a"],
                pageNum: pageNum,
                PageMax: PageMax,
                fileds: "a.id,a.title,a.time as createtime",
                where: "a.type='机关党建'",
                desc: true,
                filed: "a.time"
            };

            if (whereValue != "") {
                AjaxData.where += " and instr(a.title,'" + whereValue + "')>0 ";
            }

            return AjaxData;
        }
    },
    sjjgdjinfo: {
        title: "市局机关党建详情",
        type: "机关党建",
        program_name: "sjjgdj",
        region: "sj",
        AjaxData: function (id) {
            var AjaxData = {
                type: ["njother a"],
                pageNum: 1,
                PageMax: 1,
                fileds: "a.id,a.title,a.content,a.time as createtime,a.filename",
                where: "a.id='" + id + "'",
                desc: true,
                filed: "a.time"
            };

            return AjaxData;
        }
    },
    sjzsk: {
        title: "市局知识库",
        type: "ZSK",
        program_name: "sjzsk",
        region: "sj",
        AjaxData: function (pageNum, PageMax, whereValue) {
            var AjaxData = {
                type: ["njvideoinfo a"],
                pageNum: pageNum,
                PageMax: PageMax,
                fileds: "a.id,a.name as title,a.uptime as createtime",
                where: "a.type='ZSK' ",
                desc: true,
                filed: "a.uptime"
            };

            if (whereValue != "") {
                AjaxData.where += " and instr(a.name,'" + whereValue + "')>0 ";
            }

            return AjaxData;
        }
    },
    sjxwzx: {
        title: "市局新闻中心",
        type: "行业新闻",
        program_name: "sjxwzx",
        region: "sj",
        AjaxData: function (pageNum, PageMax, whereValue) {
            var AjaxData = {
                type: ["njother a"],
                pageNum: pageNum,
                PageMax: PageMax,
                fileds: "a.id,a.title,a.time as createtime",
                where: "a.type='行业新闻'",
                desc: true,
                filed: "a.time"
            };

            if (whereValue != "") {
                AjaxData.where += " and instr(title,'" + whereValue + "')>0 ";
            }

            return AjaxData
        }
    },
    sjxwzxinfo: {
        title: "市局新闻中心详情",
        type: "行业新闻",
        region: "sj",
        program_name: "sjxwzx",
        AjaxData: function (id) {
            var AjaxData = {
                type: ["njother a"],
                pageNum: 1,
                PageMax: 1,
                fileds: "a.id,a.title,a.content,a.time as createtime,a.filename",
                where: "id='" + id + "'",
                desc: true,
                filed: "a.time"
            };

            return AjaxData;
        }
    },
    sjgwbl: {
        title: "市局公文办理",
        type: "市局公文办理",
        program_name: "asjgwbl",
        region: "sj",
        AjaxData: function (pageNum, PageMax, userid, whereValue) {
            var AjaxData = {
                type: ["njinstance a", "njworkitem b", "njworkflow c", "njworkflow_define d"],
                pageNum: pageNum,
                PageMax: PageMax,
                fileds: "a.iid,a.wid,c.wname,a.name,b.wiid,b.step,b.active,b.accepted_time as createtime",
                where: "a.status=1 and b.active>=0 and a.iid=b.iid and a.wid=c.wid and c.wname=d.name and d.type='公文' and b.userid='" + userid + "'",
                desc: true,
                filed: "b.wiid"
            };
            if (whereValue != "") {
                AjaxData.where += " and instr(name,'" + whereValue + "')>0 ";
            }

            return AjaxData;
        }
    }
};

export default { dictionary };
