package com.example.zhongs.zhifa;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.KeyEvent;
import android.webkit.WebView;
import android.widget.ProgressBar;
import com.baidu.location.BDLocation;
import com.baidu.location.BDLocationListener;
import com.baidu.location.LocationClient;
import com.baidu.location.LocationClientOption;
import com.baidu.mapapi.*;
import com.baidu.mapapi.map.*;
import com.baidu.mapapi.model.LatLng;

import java.io.File;
import java.net.URISyntaxException;

//AppCompatActivity         Activity


public class MainActivity extends AppCompatActivity {


    private WebView webview;
    private ProgressBar progressBar;
    WebClient web;
    static BaiduMap baidu;
    private MapView mMapView = null;
    private com.baidu.mapapi.map.BaiduMap mBaiduMap;
    LocationClient mLocationClient;


    @Override
    protected void onCreate(Bundle savedInstanceState)
    {

        super.onCreate(savedInstanceState);
        //在使用SDK各组件之前初始化context信息，传入ApplicationContext
        //注意该方法要再setContentView方法之前实现

        //SDKInitializer.initialize(getApplicationContext());





        //delete title
        //requestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(R.layout.activity_main);
        //mMapView =findViewById(R.id.bmapView);
        this.webview=findViewById(R.id.webview);
        this.progressBar=findViewById(R.id.progressbar);
      //  mBaiduMap = mMapView.getMap();

        // 开启定位图层
        //mBaiduMap.setMyLocationEnabled(true);
        //mMapView.showZoomControls(false);

        // 当不需要定位图层时关闭定位图层
        //mBaiduMap.setMyLocationEnabled(false);


        GpsLocation gl= GpsLocation.GpsLocationFactory(this);
        //gl.Start();




        baidu= BaiduMap.CreateBaiduMap("username",getApplicationContext());
        web=new WebClient(this,"http://pbaike.top:81/");//http://pbaike.top:81/
    }


    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        Log.i("ansen","是否有上一个页面:"+webview.canGoBack());
        if (webview.canGoBack() && keyCode == KeyEvent.KEYCODE_BACK){//点击返回按钮的时候判断有没有上一页
            webview.goBack(); // goBack()表示返回webView的上一页面
            return true;
        }
        return super.onKeyDown(keyCode,event);
    }


    @Override
    protected void onDestroy() {
        super.onDestroy();
        mMapView.onDestroy();
        //释放资源
        //webview.destroy();
        webview=null;
    }



    @Override
    protected void onResume() {
        super.onResume();
       // mMapView =findViewById(R.id.bmapView);
        //在activity执行onResume时执行mMapView. onResume ()，实现地图生命周期管理
       // mMapView.onResume();
    }
    @Override
    protected void onPause() {
        super.onPause();
        //在activity执行onPause时执行mMapView. onPause ()，实现地图生命周期管理
        //mMapView.onPause();
    }
    void setUpBaiduAPPByLoca(double LATITUDE_QIDIAN,double LONGTITUDE_QIDIAN,double LATITUDE_ZHONGDIAN ,double LONGTITUDE_ZHONGDIAN){
        try {
            Intent intent = Intent.getIntent("intent://map/direction?origin=latlng:"+LATITUDE_QIDIAN+","+LONGTITUDE_QIDIAN+"|name:万家丽国际Mall&destination=latlng:"+LATITUDE_ZHONGDIAN+","+LONGTITUDE_ZHONGDIAN+"|name:东郡华城广场|A座&mode=driving&src=yourCompanyName|yourAppName#Intent;scheme=bdapp;package=com.baidu.BaiduMap;end");
            if(isInstallByread("com.baidu.BaiduMap")){
                startActivity(intent);
                Log.e("导航", "百度地图客户端已经安装") ;
            }else {
                Log.e("导航", "没有安装百度地图客户端") ;
            }
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
    }

    /**
     * 通过起终点名字使用百度地图
     */
    void setUpBaiduAPPByName(){
        try {
            Intent intent = Intent.getIntent("intent://map/direction?origin=万家丽国际Mall&destination=东郡华城广场|A座&mode=driving&src=yourCompanyName|yourAppName#Intent;scheme=bdapp;package=com.baidu.BaiduMap;end");
            if(isInstallByread("com.baidu.BaiduMap")){
                startActivity(intent);
                Log.e("百度导航", "百度地图客户端已经安装") ;
            }else {
                Log.e("百度导航", "没有安装百度地图客户端") ;
            }
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
    }


    /**
     * 我的位置到终点通过百度地图
     */
    public   void setUpBaiduAPPByMine(String wz1,String mb ){
        try {
            Intent intent = Intent.getIntent("intent://map/direction?origin="+wz1+"&destination="+mb+"&mode=driving&src=北京世纪安图|com.example.zhongs.zhifa#Intent;scheme=bdapp;package=com.baidu.BaiduMap;end");
            if(isInstallByread("com.baidu.BaiduMap")){
                startActivity(intent);
                Log.e("百度导航", "百度地图客户端已经安装") ;
            }else {
                Log.e("百度导航", "没有安装百度地图客户端") ;
            }
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
    }

    /**
     * 判断是否安装目标应用
     * @param packageName 目标应用安装后的包名
     * @return 是否已安装目标应用
     */
    public static boolean isInstallByread(String packageName) {
        return new File("/data/data/" + packageName).exists();
    }
}


