package com.example.zhongs.zhifa;

import android.util.Log;
import com.baidu.location.BDAbstractLocationListener;
import com.baidu.location.BDLocation;
import com.baidu.mapapi.map.*;
import com.baidu.mapapi.model.LatLng;

import java.lang.reflect.Field;

public class MyLocationListener extends BDAbstractLocationListener
{

    private  StringBuffer Sb=new StringBuffer();
    private boolean isFirstLocation = true;
    private com.baidu.mapapi.map.BaiduMap mBaiduMap;
    private MapView mMapView = null;
    boolean isFirstLoc=true;

    public int accuracyCircleFillColor = 4521984;
    public int accuracyCircleStrokeColor = 4653056;


    public  MyLocationListener(MapView mapView){
        this.mMapView=mapView;
        mBaiduMap=this.mMapView.getMap();
    }
    public  MyLocationListener(){

    }
    @Override
    public void onReceiveLocation(BDLocation location)
    {
        //此处的BDLocation为定位结果信息类，通过它的各种get方法可获取定位相关的全部结果
        //以下只列举部分获取经纬度相关（常用）的结果信息
        //更多结果信息获取说明，请参照类参考中BDLocation类中的说明

        //获取定位结果
        Sb.append("{");
        Sb.append("\"定位时间\":\""+location.getTime()+"\",");    //获取定位时间
        Sb.append("\"定位类型\":\""+location.getLocType()+"\",");    //获取定位唯一ID，v7.2版本新增，用于排查定位问题
        Sb.append("\"纬度信息\":\""+location.getLatitude()+"\",");
        Sb.append("\"经度信息\":\""+location.getLongitude()+"\",");
        Sb.append("\"定位精准度\":\""+location.getRadius()+"\",");
        Sb.append("\"地址信息\":\""+location.getAddrStr()+"\",");
        Sb.append("\"国家信息\":\""+location.getCountry()+"\",");
        Sb.append("\"国家码\":\""+location.getCountryCode()+"\",");
        Sb.append("\"城市信息\":\""+location.getCity()+"\",");
        Sb.append("\"城市码\":\""+location.getCityCode()+"\",");
        Sb.append("\"区县信息\":\""+location.getDistrict()+"\",");
        Sb.append("\"街道信息\":\""+location.getStreet()+"\",");

        Sb.append("\"街道码\":\""+location.getStreetNumber()+"\",");
        Sb.append("\"描述信息\":\""+location.getLocationDescribe()+"\",");
        Sb.append("\"POI信息\":\""+location.getPoiList()+"\",");
        Sb.append("\"楼宇ID\":\""+location.getBuildingID()+"\",");
        Sb.append("\"楼宇名称\":\""+location.getBuildingName()+"\",");
        Sb.append("\"楼层信息\":\""+location.getFloor()+"\",");

        location.getLocType();    //获取定位类型
        location.getLatitude();    //获取纬度信息
        location.getLongitude();    //获取经度信息
        location.getRadius();    //获取定位精准度
        location.getAddrStr();    //获取地址信息
        location.getCountry();    //获取国家信息
        location.getCountryCode();    //获取国家码
        location.getCity();    //获取城市信息
        location.getCityCode();    //获取城市码
        location.getDistrict();    //获取区县信息
        location.getStreet();    //获取街道信息
        location.getStreetNumber();    //获取街道码
        location.getLocationDescribe();    //获取当前位置描述信息
        location.getPoiList();    //获取当前位置周边POI信息

        location.getBuildingID();    //室内精准定位下，获取楼宇ID
        location.getBuildingName();    //室内精准定位下，获取楼宇名称
        location.getFloor();    //室内精准定位下，获取当前位置所处的楼层信息


        double latitude = location.getLatitude();    //获取纬度信息
        double longitude = location.getLongitude();    //获取经度信息
        float radius = location.getRadius();    //获取定位精度，默认值为0.0f

        String coorType = location.getCoorType();
        //获取经纬度坐标类型，以LocationClientOption中设置过的坐标类型为准

        int errorCode = location.getLocType();
        //获取定位类型、定位错误返回码，具体信息可参照类参考中BDLocation类中的说明
        Sb.append("\"x\":\""+longitude+"\",\"y\":\""+latitude+"\",\"radius\":\""+radius+"\",\"coorType\":\""+coorType+"\",\"errorCode\":\""+errorCode+"\"}");




        /**************/

        // map view 销毁后不在处理新接收的位置
        ///if (location == null || mMapView == null)
       //     return;
        //setPosition2Center(mBaiduMap,location,isFirstLoc);
        //SetMarker(longitude,latitude);
    }
    public  String GetLocation(){return  Sb.toString();}

    /**
     * 设置中心点和添加marker
     *
     * @param map
     * @param bdLocation
     * @param isShowLoc
     */
    public void setPosition2Center(com.baidu.mapapi.map.BaiduMap map, BDLocation bdLocation, Boolean isShowLoc) {
        MyLocationData locData = new MyLocationData.Builder()
                .accuracy(bdLocation.getRadius())
                .direction(bdLocation.getRadius()).latitude(bdLocation.getLatitude())
                .longitude(bdLocation.getLongitude()).build();

        //设置定位数据
        map.setMyLocationData(locData);

        BitmapDescriptor mCurrentMarker = BitmapDescriptorFactory
                .fromResource(R.drawable.icon_geo);
        MyLocationConfiguration conf= new MyLocationConfiguration(MyLocationConfiguration.LocationMode.FOLLOWING, true, mCurrentMarker,accuracyCircleFillColor, accuracyCircleStrokeColor);
        conf.accuracyCircleFillColor = 0xFF0000FF;
        map.setMyLocationConfiguration(conf);

        // 当不需要定位图层时关闭定位图层
        map.setMyLocationEnabled(false);

       if (isShowLoc) {
            LatLng ll = new LatLng(bdLocation.getLatitude(), bdLocation.getLongitude());
            MapStatus.Builder builder = new MapStatus.Builder();
            builder.target(ll).zoom(18.0f);
            map.animateMapStatus(MapStatusUpdateFactory.newMapStatus(builder.build()));
        }
    }
    public void SetMarker(double x,double y)
    {
        //Log.i("到这了","testtest");
        //删除坐标点
       mBaiduMap.clear();


        LatLng point = new LatLng(x,y);

//构建Marker图标

        BitmapDescriptor bitmap = BitmapDescriptorFactory
                .fromResource(R.drawable.icon_marka);

//构建MarkerOption，用于在地图上添加Marker

        OverlayOptions option = new MarkerOptions()
                .position(point)
                .icon(bitmap);

//在地图上添加Marker，并显示

        mBaiduMap.addOverlay(option);

    }

}
