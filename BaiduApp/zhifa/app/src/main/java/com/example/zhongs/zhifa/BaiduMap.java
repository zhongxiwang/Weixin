package com.example.zhongs.zhifa;

import android.content.Context;
import android.util.Log;
import com.baidu.trace.Trace;
import com.baidu.trace.LBSTraceClient;
import com.baidu.trace.api.track.HistoryTrackRequest;
import com.baidu.trace.api.track.HistoryTrackResponse;
import com.baidu.trace.api.track.OnTrackListener;
import com.baidu.trace.api.track.TrackPoint;
import com.baidu.trace.model.OnTraceListener;
import com.baidu.trace.model.PushMessage;
import org.json.JSONObject;

import java.util.List;

public class BaiduMap implements OnTraceListener {

    int gatherInterval = 3;  //位置采集周期 (s)
    int packInterval = 10;  //打包周期 (s)
    String entityName = "ServiceName";  // entity标识
    long serviceId = 203995;// 鹰眼服务ID
    int traceType = 2;  //轨迹服务类型
    int tag = 1;
    private  Trace mTrace;  // 实例化轨迹服务
    private  LBSTraceClient mTraceClient;  // 实例化轨迹服务客户端
    //private  OnTraceListener mTraceListener;

    // 是否需要对象存储服务，默认为：false，关闭对象存储服务。注：鹰眼 Android SDK v3.0以上版本支持随轨迹上传图像等对象数据，若需使用此功能，该参数需设为 true，且需导入bos-android-sdk-1.0.2.jar。
    boolean isNeedObjectStorage = false;
    private BaiduMap(String username,Context cont)
    {
        this.entityName=username;
         mTraceClient = new LBSTraceClient(cont);
         mTrace = new Trace(serviceId, entityName, isNeedObjectStorage);
        //mTraceListener = new BaiduMap();
    }
    private static  BaiduMap baidu=null;

    public  static  BaiduMap CreateBaiduMap(String username,Context cont)
    {
        if(baidu==null)baidu=new BaiduMap(username,cont);
        return baidu;
    }

    public  static  BaiduMap CreateBaiduMap()
    {
        return baidu;
    }

    // 开启服务
    public  void StartService(){
        mTraceClient.startTrace(mTrace, this);
    }

    // 停止服务
    public  void StopService(){
         mTraceClient.stopTrace(mTrace, this);
    }

    // 开启采集
    public void StartGather()
    {
        mTraceClient.startGather(this);
    }

    public  void StopGather()
    {
        mTraceClient.stopGather(this);
    }
    List<TrackPoint> Result=null;
    long startTime;
    long endTime;
    public  void Query(){
        HistoryTrackRequest historyTrackRequest = new HistoryTrackRequest(tag, serviceId, entityName);
        System.out.println("启动"+startTime);
        historyTrackRequest.setStartTime(startTime);
        historyTrackRequest.setEndTime(endTime);
        // 初始化轨迹监听器
        OnTrackListener mTrackListener = new OnTrackListener() {
            // 历史轨迹回调
            @Override
            public void onHistoryTrackCallback(HistoryTrackResponse response)
            {
                    Log.i("历史轨迹回调",response.getMessage());
                    Log.i("数据查询"," "+response.getSize());
                    if(response.getSize()>0){
                        Result= response.getTrackPoints();
                    }
            }
        };




// 查询历史轨迹
        mTraceClient.queryHistoryTrack(historyTrackRequest, mTrackListener);

    }


    public  List<TrackPoint> GetResult()
    {
        return  Result;
    }

    // 初始化轨迹服务监听器
    @Override
    public void onBindServiceCallback(int i, String s) {

    }
    // 开启服务回调
    @Override
    public void onStartTraceCallback(int status, String message) {}
    // 停止服务回调
    @Override
    public void onStopTraceCallback(int status, String message) {}
    // 开启采集回调
    @Override
    public void onStartGatherCallback(int status, String message) {
        startTime= System.currentTimeMillis() / 1000;
    }
    // 停止采集回调
    @Override
    public void onStopGatherCallback(int status, String message) {
        endTime = System.currentTimeMillis() / 1000;
    }
    // 推送回调
    @Override
    public void onPushCallback(byte messageNo, PushMessage message)
    {
        Log.i("推送回调",message.getMessage());
        //JSONArray.fromObject(list).toString()
    }

    @Override
    public void onInitBOSCallback(int i, String s) {

    }

}
