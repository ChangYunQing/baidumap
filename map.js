jQuery(document).ready(function($) {
 function tab_2(e){
        $(".tab_2 li").click(function(){
            $(".tab_2 li").eq($(this).index()).addClass("active_2").siblings().removeClass("active_2");
            $(".tabCon_2 .checkTab_2").hide().eq($(this).index()).show();
        })
    }tab_2();
    function tab_3(e){
        $(".tab_3 li").click(function(){
            $(".tab_3 li").eq($(this).index()).addClass("active_3").siblings().removeClass("active_3");
            $(".tabCon_3 .checkTab_3").hide().eq($(this).index()).show();
        })
    }tab_3();
     function tab_4(e){
        $(".tab_4 li").click(function(){
            $(".tab_4 li").eq($(this).index()).addClass("active_4").siblings().removeClass("active_4");
            $(".tabCon_4 .checkTab_4").hide().eq($(this).index()).show();
        })
    }tab_4();
    function tab_5(e){
        $(".tab_5 li").click(function(){
            $(".tab_5 li").eq($(this).index()).addClass("active_5").siblings().removeClass("active_5");
            $(".tabCon_5 .checkTab_5").hide().eq($(this).index()).show();
        })
    }tab_5();
    function tab_6(e){
        $(".tab_6 li").click(function(){
            $(".tab_6 li").eq($(this).index()).addClass("active_6").siblings().removeClass("active_6");
            $(".tabCon_6 .checkTab_6").hide().eq($(this).index()).show();
        })
    }tab_6();
    function tab_7(e){
        $(".tab_7 li").click(function(){
            $(".tab_7 li").eq($(this).index()).addClass("active_7").siblings().removeClass("active_7");
            $(".tabCon_7 .checkTab_7").hide().eq($(this).index()).show();
        })
    }tab_7();

    var mp = new BMap.Map("divMap");//创建地图

    var point = new BMap.Point(116.329, 40.079);
    mp.centerAndZoom(point, 14);

    function ctrlFn(txtDiv, tabDiv){
        mp.clearOverlays();
        $(txtDiv).empty();
        var marker = new BMap.Marker(point);  // 创建标注
        mp.addOverlay(marker);
        var opts = {
          position : point,    // 指定文本标注所在的地理位置
          offset   : new BMap.Size(-43, -80)    //设置文本偏移量
        }
        var label = new BMap.Label("您当前的位置", opts);  // 创建文本标注对象
            label.setStyle({
                 color : "#ff6600",
                 fontSize : "12px",
                 height : "25px",
                 lineHeight : "25px",
                 fontFamily:"微软雅黑",
                 width: "80px",
                 textAlign: "center",
                 border: "1px solid #e1e2e2"
             });
        mp.addOverlay(label);
        marker.setAnimation(BMAP_ANIMATION_BOUNCE);
        var s=$(tabDiv).html();
        var ls = new BMap.LocalSearch(mp);
        ls.searchNearby(s,point,1000);
        var i=1;
        ls.setSearchCompleteCallback(function(rs){
            if (ls.getStatus() == BMAP_STATUS_SUCCESS){
                for(j=0;j<rs.getCurrentNumPois();j++)
                {
                    var poi=rs.getPoi(j);
                    var markDivName = tabDiv.replace('#','')+[j];
                    // console.log(poi);
                    var pointB = new BMap.Point(poi.point.lng,poi.point.lat);
                    var str = '';
                    str +=  '<li class="nearby" data-wtf = "'+ markDivName +'"><p class="title" title="'+poi.title+'">'+poi.title+'</p>';
                    str +=  '<span class="distance"><i class="arrowIcon"></i>'+(mp.getDistance(point,pointB)).toFixed(0)+'<b>米</b></span>';
                    str +=  '<p class="address" title="'+poi.address+'">'+poi.address+'</p></li>';
                    $(txtDiv).append(str);
                    function ComplexCustomOverlay(point){
                        this._point = point;
                    }
                    ComplexCustomOverlay.prototype = new BMap.Overlay();
                    ComplexCustomOverlay.prototype.initialize = function(map){
                        var pois = poi;
                        var str_1='';
                        str_1 +=  '<li class="nearby_1"><p class="title" title="'+poi.title+'">'+poi.title+'</p>';
                        str_1 +=  '<span class="distance"><i class="arrowIcon"></i>'+(mp.getDistance(point,pointB)).toFixed(0)+'<b>米</b></span>';
                        str_1 +=  '<p class="address" title="'+poi.address+'">'+poi.address+'</p></li>';
                        this._map = map;
                        var oDiv = this._div = document.createElement("div");
                        oDiv.style.position = "relative";
                        oDiv.style.background = "url(aaa.png)";
                        oDiv.style.color = "#5a646c";
                        oDiv.style.height = "25px";
                        oDiv.style.width = "19px";
                        oDiv.setAttribute("data-wtf", markDivName );
                        oDiv.setAttribute("class", "conts" );
                        var attr = oDiv.attributes["data-wtf"].nodeValue;
                        var span = this._span = document.createElement("span");
                        span.setAttribute('class','cont')
                        // oDiv.appendChild(span);
                        var that = this;
                        span.innerHTML = str_1;
                        var arrow = this._arrow = document.createElement("div");
                        arrow.style.borderRight = "8px solid rgba(0, 0, 0, 0)";
                        arrow.style.borderTop = "10px solid #fff";
                        arrow.style.borderLeft = "8px solid rgba(0, 0, 0, 0)";
                        arrow.style.position = "absolute";
                        arrow.style.width = "0";
                        arrow.style.height = "0";
                        arrow.style.top = "-10px";
                        arrow.style.left = "2px";
                        // arrow.style.display = "none";
                        arrow.style.zIndex = "999";
                        // oDiv.appendChild(arrow);

                        span.style.position = "absolute";
                        span.style.width = "280";
                        span.style.height = "85px";
                        span.style.backgroundColor = '#fff';
                        span.style.boxShadow = "0 0 6px 0 rgba(13,4,9,0.2)";
                        span.style.border = '1px solid #ececec';
                        span.style.top = "-95px";
                        span.style.left = "-130px";
                        // span.style.display = "none";
                        span.style.zIndex = "999";


                        $("li[data-wtf="+markDivName+"]").on('click',function () {
                            $('.conts').empty();
                            oDiv.appendChild(span);
                            oDiv.appendChild(arrow)
                        });

                        oDiv.onclick = function () {
                            $('.conts').empty();
                            oDiv.appendChild(span);
                            oDiv.appendChild(arrow);
                            event.stopPropagation()
                        };

                        $('#divMap').on('click',function () {
                            $('.conts').empty();
                        })

                        mp.getPanes().labelPane.appendChild(oDiv);

                        return oDiv;
                    }
                    ComplexCustomOverlay.prototype.draw = function(){
                        var map = this._map;
                        var pixel = map.pointToOverlayPixel(this._point);
                        this._div.style.left = pixel.x - 9 + "px";
                        this._div.style.top  = pixel.y - 25 + "px";
                    }

                    var myCompOverlay = new ComplexCustomOverlay(pointB, poi.title);
                    mp.addOverlay(myCompOverlay);
                }
                // if(rs.getPageIndex!=rs.getNumPages())
                // {
                //     ls.gotoPage(i);
                //     i=i+1;
                // }
            }});
    }
    $(document).ready(function(){
        if($('.tabCon_3, .tabCon_4, .tabCon_5, .tabCon_6, .tabCon_7').css('height') <= '373px'){
            $('.tabCon_3, .tabCon_4, .tabCon_5, .tabCon_6, .tabCon_7').css('overflow-y','visible')
        }
        ctrlFn('#txtSubway', "#subway");
    })
    $('#traffic').on('click',function tra(){
        ctrlFn('#txtSubway', "#subway");
    });
    $('#subway').on('click',function sub(){
        ctrlFn('#txtSubway', "#subway");
    });
    $('#bus').on('click',function bus(){
        ctrlFn('#txtBus', "#bus");
    })
    $('#edu').on('click',function edu(){
        ctrlFn('#txtkindergarten', "#kindergarten");
    })
    $('#kindergarten').on('click',function kindergarten(){
        ctrlFn('#txtkindergarten', "#kindergarten");
    })
    $('#primarySchool').on('click',function primarySchool(){
        ctrlFn('#txtprimarySchool', "#primarySchool");
    })
    $('#middleSchool').on('click',function middleSchool(){
        ctrlFn('#txtmiddleSchool', "#middleSchool");
    })
    $('#college').on('click',function college(){
        ctrlFn('#txtcollege', "#college");
    })
    $('#medical').on('click',function medical(){
        ctrlFn('#txthospital', "#hospital");
    })
    $('#hospital').on('click',function college(){
        ctrlFn('#txthospital', "#hospital");
    })
    $('#pharmacy').on('click',function college(){
        ctrlFn('#txtpharmacy', "#pharmacy");
    })
    $('#shopping').on('click',function shopping(){
        ctrlFn('#txtshoppingMall', "#shopping");
    })
    $('#shoppingMall').on('click',function college(){
        ctrlFn('#txtshoppingMall', "#shopping");
    })
    $('#superMarket').on('click',function college(){
        ctrlFn('#txtsuperMarket', "#superMarket");
    })
    $('#market').on('click',function college(){
        ctrlFn('#txtmarket', "#market");
    })
    $('#life').on('click',function life(){
        ctrlFn('#txtpark', "#park");
    })
    $('#park').on('click',function park(){
        ctrlFn('#txtpark', "#park");
    })
    $('#bank').on('click',function bank(){
        ctrlFn('#txtbank', "#bank");
    })
    $('#atm').on('click',function atm(){
        ctrlFn('#txtatm', "#atm");
    })
    $('#restaurant').on('click',function restaurant(){
        ctrlFn('#txtrestaurant', "#restaurant");
    })
 });
