  //提供给外部调用的Javascript方法 
  //保存
  //showMsg是否显示保存成功信息 true-显示，false-不显示
  //funName保存成功后须调父窗体的方法名称
  //url保存成功后要打开的页面       
  //表单保存
  function SaveAll2(showMsg, funName, url, isReload) {
    var strValues = "";
    var gridValues = "";
    var firstWrite = $("#InputSaveIds").val();
    var saveOk = false;
    var formidobj;

    SaveUnDoSign();

    if (isSaved && !saveEdit)
      return true;

    if (saveEdit == false && !NeedSaveDefault()) {
      if (showMsg != false) showMsgBox("您没有修改过数据，无需保存！");
      return;
    }

    if (!$('#form1').form('validate') && (showMsg != false)) {
      if (isLeave == true) {
        isLeave = false;
        return "【存在未通过验证的录入数据，无法保存。】";
      }
      else {
        if (confirm('存在未通过验证的录入数据，无法保存。请问是否重新填写？\n点击“确定”返回重填，或“取消”进行其他操作。')) {
          return false;
        }
        {
          isSaved = false;
          isLeave = false;
          return true;
        }
      }
    } /* why fyx 加载easyui会导致多台电脑访问后，页面无法打开？*/

    if (arrValids.length > 0) {
      $(document.getElementById(arrValids[0][0])).focus();
      showMsgBox(arrValids[0][1], true);
      return false;
    }


    saveChangedFonts(); //by oklin 2010-10-20

    saveComboxVal(); // by oklin 2010-06-01

    strValues = GetFormValues();

    gridValues = GetFormGridValues();
    if (gridValues.indexOf('return') > -1) gridValues = '';
    if ((gridValues == "") && strValues == "") return;

    if (!signatureLoaded) {
      alert("表单未加载完成，无法保存！");
      return;
    }

    //检测签章类型，并进行相关处理 var stype = $('#hSignType').val()
    var losesign = CheckSign(strValues, gridValues)
    if (losesign) {
      var signeds = CearSignedValue(strValues);
      if (signeds) {
        if (!confirm("表单内容已修改，已有签名将被清空，是否继续修改？"))
          return;

        if (strValues)
          strValues = strValues.substring(0, strValues.length - 1) + signeds + "]";
        else
          strValues = signeds.substring(1, signeds.length - 1);
      }
    }
    var saveResult = false;
    var sendObj = {};
    sendObj.iid = $("#hIidPlus").val(); //$("#hiid").val(); //"<%=iid%>";
    sendObj.fid = $("#hfid").val(); //"<%=fid%>";
    sendObj.step = $("#hsctlid").val(); //"<%=sctlid%>";
    sendObj.userid = $("#huserid").val(); //"<%=userid%>";
    sendObj.input_index = RealInputIdx(); //"<%=input_index%>";
    sendObj.strElements = encodeURIComponent(strValues);
    sendObj.gridElements = encodeURIComponent(gridValues);
    sendObj.firstWriteIds = encodeURIComponent(firstWrite);
    sendObj.acttype = "FormSave";

    $.ajax({
      type: "POST",
      async: false,
      cache: false,
      //url: "../Service.asmx/FormSave",
      //data: JSON.stringify(sendObj),
      //contentType: "application/json",
      url: '../appservice/HtmlMainPageHandle.ashx',
      data: eval(sendObj),
      dataType: 'text', //'json',
      //beforeSend: showWait,
      //complete: hiddenWait,
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        if (showMsg)
          showMsgBox(JSON.stringify(errorThrown), true);
      },
      success: function (result) {
        eventFormSaved(sendObj, (result == "表单保存成功！" ? true : false));
        if (result == "表单保存成功！") {
          isSaved = true;
          saveEdit = false;
          saveOk = true;
          if (showMsg != false) showMsgBox(result);

          if (funName != null && funName != "") {
            var strfunName = commFun.GetSaveAllCallBackFun(funName);
            eval(strfunName);
          }
          if (url != null && url != "") {
            var strOpenUrl = "window.open('" + url + "');";
            eval(strOpenUrl);
          }
          if (isReload == true || isReload == null) {
            refresh(); //刷新，重新加载数据
          }
          saveResult = true;
        }
        else {
          var msg = "表单保存出错。" + result;
          if (showMsg != false) showMsgBox(msg, true);
          return msg;
        }
      }
    });
    return saveResult;
    var options = {
      url: '../appservice/formsave.ashx',
      type: 'post',
      success: function (result) {
        if (result == "表单保存成功！") {
          isSaved = true;
          saveEdit = false;
          saveOk = true;
          if (showMsg != false) showMsgBox(result);

          if (funName != null && funName != "") {
            var strfunName = "parent." + funName + "();";
            eval(strfunName);
          }
          if (url != null && url != "") {
            var strOpenUrl = "window.open('" + url + "');";
            eval(strOpenUrl);
          }
          refresh(); //刷新，重新加载数据           
        }
        else {
          var msg = "表单保存出错。" + result;
          if (showMsg != false) showMsgBox(msg, true);
          return msg;
        }
      }
    };
    $('#form1').ajaxSubmit(options);
  }
  