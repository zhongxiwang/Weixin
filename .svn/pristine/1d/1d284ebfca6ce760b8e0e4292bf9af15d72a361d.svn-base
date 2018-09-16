package com.example.zhongs.zhifa;

import android.content.Context;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.widget.Toast;
import com.baidu.trace.api.track.TrackPoint;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.File;
import java.util.List;

import static android.content.ContentValues.TAG;

public class JavaScriptInterface {
    MainActivity context;
    public JavaScriptInterface(MainActivity c){
        context= c;
    }
    @JavascriptInterface
    public void showToast(String ssss)
    {
        Toast.makeText(context, ssss, Toast.LENGTH_LONG).show();
    }
    @JavascriptInterface
    public  void OpBaidu(int n)
    {
        switch (n){
            case 1:BaiduMap.CreateBaiduMap().StartService();break;
            case 2:BaiduMap.CreateBaiduMap().StartGather();break;
            case 3:BaiduMap.CreateBaiduMap().StopService();break;
            case 4:BaiduMap.CreateBaiduMap().StopGather();break;
        }
    }

    @JavascriptInterface
    public  String  Query()
    {
        BaiduMap.CreateBaiduMap().Query();
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        StringBuffer Sb=new StringBuffer();
        List<TrackPoint> list= BaiduMap.CreateBaiduMap().GetResult();

        for (TrackPoint key:list
             ) {
            if(Sb.length()==0)
                Sb.append("{\"x\":\""+key.getLocation().getLongitude()+"\",\"y\":\""+key.getLocation().getLatitude()+"\"}");
            else Sb.append(",{\"x\":\""+key.getLocation().getLongitude()+"\",\"y\":\""+key.getLocation().getLatitude()+"\"}");
            Log.i("list:" ,key.getLocation().getLongitude()+": " +key.getLocation().getLatitude());
        }
        return  "["+Sb.toString()+"]";//BaiduMap.CreateBaiduMap().GetResult();
    }

    @JavascriptInterface
    public  String CurrentLocation(){
        Log.i("infoinfo","test");
        return GpsLocation.GpsLocationFactory().GetLocation();
    }

    @JavascriptInterface
    public String BaiduDh(String location,String weiz ){
        this.context.setUpBaiduAPPByMine(location,weiz);
        return "";
    }

}
