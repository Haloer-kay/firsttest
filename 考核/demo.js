window.onload=function(){
    //请求实时天气及24小时天气状况
    function request(newData){
        var xhr=new XMLHttpRequest()
        xhr.open("get","https://v0.yiketianqi.com/api?version=v62&appid=27978971&appsecret=9i7x54LL&city="+newData,true)
        xhr.send()
        xhr.onreadystatechange=function(){
            if(xhr.readyState===4){
                if(xhr.status>=200&&xhr.status<=300||xhr.status==304){
                    var data=JSON.parse(xhr.responseText)
                    console.log(data);
                    document.querySelector(".city").innerHTML=data.city
                    document.querySelector(".temper").innerHTML=data.tem+"°"
                    document.querySelector('.locationName').innerHTML=newData   
                    var airLevel=  data.air+data.air_level
                    document.querySelector(".air").innerHTML=airLevel
                    var air1=document.querySelector('.air')
                    if(data.air_level==='良'){
                        air1.style.backgroundColor="#F0CC35"
                    }
                    else if(data.air_level==="优"){
                        air1.style.backgroundColor="green"
                    }
                    else{
                        air1.style.backgroundColor="red"
                    }
                    var airP=document.querySelectorAll(".airP")
                    airP[0].innerHTML=data.air_pm25
                    airP[1].innerHTML=data.aqi.pm10
                    airP[2].innerHTML=data.aqi.so2
                    airP[3].innerHTML=data.aqi.no2
                    airP[4].innerHTML=data.aqi.o3
                    airP[5].innerHTML=data.aqi.co
                    var background=document.querySelector('.bgc')
                    background.style.backgroundImage="url("+data.wea_img+'.jpg)'
                    document.querySelector(".wea").innerHTML=data.wea
                    document.querySelector(".humidity").innerHTML="湿度"+data.humidity
                    document.querySelector(".wind").innerHTML=data.win+" "+data.win_speed
                    let li=document.querySelectorAll('.txt-time')
                    for(let i=0;i<24;i++){      
                     li[i].innerHTML=data.hours[i].hours
                    document.querySelectorAll('.icon')[i].src=data.hours[i].wea_img+'.svg'
                   document.querySelectorAll('.txt-degree')[i].innerHTML=data.hours[i].tem+'°'
                   var air=document.querySelector(".air")
                    var airTxt=document.querySelector(".airTxt")
                    air.onclick=()=>{
                        stop()
                        bgchange.style.display="block"
                        airTxt.style.display="block"
                        document.querySelector(".air1").innerHTML=data.air
                        document.querySelector(".air2").innerHTML=data.air_level
    }
    var yuancha=document.querySelector('.yuancha')
    yuancha.onclick=()=>{
        move()
        airTxt.style.display='none'
        bgchange.style.display="none"
       
    }
                 }
                }   
            }
        }

            //请求今天 明天和七天记录
            var xhr1=new XMLHttpRequest()
            xhr1.open("get","https://v0.yiketianqi.com/api?version=v9&appid=27978971&appsecret=9i7x54LL&city&city="+newData,true)
            xhr1.send()
            xhr1.onreadystatechange=function(){
                if(xhr1.readyState===4){
                    if(xhr1.status>=200&&xhr1.status<=300||xhr1.status==304){
                        var data1=JSON.parse(xhr1.responseText)
                        console.log(data1);
                        document.querySelector(".todTem").innerHTML=data1.data[0].tem1+'/'+data1.data[0].tem2+'°'
                        document.querySelector(".todWea").innerHTML=data1.data[0].wea
                        document.querySelector(".tomTem").innerHTML=data1.data[1].tem1+'/'+data1.data[1].tem2+"°"
                        document.querySelector(".tomWea").innerHTML=data1.data[1].wea
                        document.querySelector(".img1").src=data1.data[0].wea_day_img+".svg"
                        document.querySelector(".img2").src=data1.data[1].wea_day_img+".svg"
                        for(let i=0;i<7;i++){
                            document.querySelectorAll(".date")[i].innerHTML=data1.data[i].date.slice(5)
                            document.querySelectorAll(".wea_day")[i].innerHTML=data1.data[i].wea_day
                            document.querySelectorAll(".wea_night")[i].innerHTML=data1.data[i].wea_night
                            document.querySelectorAll(".icon1")[i].src=data1.data[i].wea_night_img+".svg"
                            document.querySelectorAll(".icon0")[i].src=data1.data[i].wea_day_img+".svg"
                            document.querySelectorAll(".wind")[i].innerHTML=data1.data[i].win[0]
                            document.querySelectorAll('.wind_speed')[i].innerHTML=data1.data[i].win_speed
                                    }
                    for(let i=3;i<7;i++){
                    document.querySelectorAll(".day")[i].innerHTML="周"+ data1.data[i].day.slice(6,7)
                    }         
                            }
                (function() {
                    var arr1=new Array
                    for(let i=0;i<7;i++){
                    arr1.push(parseInt(data1.data[i].tem1))
                    }
                    var arr2=new Array
                     for(let i=0;i<7;i++){
                     arr2.push(parseInt(data1.data[i].tem2))
                    }
                    console.log(arr1);
                    console.log(arr2);
                    var myChart=echarts.init(document.querySelector('.echarts'))
                        option = {
                        grid:{
                            top:"20%",
                            bottom:"0%",
                            left:"-4%",
                         },
                                        
                         xAxis:{
                             type:"category",            
                         },
                            yAxis: {
                            type: 'value',
                                            
                            show:false,
                                axisLable:{
                                    formatter: function (){
                                        return "{value}°";
                                        }      
                                    }
                            },
                            series: [{
                             data: arr1,
                            type: 'line',
                            smooth: true,
                            symbol:'ciecle',//实心
                            itemStyle:{normal:{
                                    color:'#ffb74d',
                                    label:{show:true
                                }}},
                            lineStyle:{color:  '#ffb74d'}
                            },
                            {
                                 data: arr2,
                                type:'line',
                                 smooth:true,
                                symbol:'ciecle',//实心
                                itemStyle:{normal:{
                                color:'#4fc3f7',
                                label:{show:true
                                }}},
                            },
                                    ]
                        };
                            myChart.setOption(option)
                    })()

                }
                }
                // 请求生活指数
                    var xhr2=new XMLHttpRequest()
                    xhr2.open("get","https://www.tianqiapi.com/life/lifepro?appid=27978971&appsecret=9i7x54LL&city="+newData,true)
                    xhr2.send()
                    xhr2.onreadystatechange=function(){
                        if(xhr2.readyState===4){
                            if(xhr2.status>=200&&xhr2.status<=300||xhr2.status==304){
                                var data2=JSON.parse(xhr2.responseText)
                                console.log(data2);
                                var zhishuSu=document.querySelectorAll(".zhishu-su")
                                zhishuSu[0].innerHTML=data2.data.chuanyi.level
                                zhishuSu[1].innerHTML=data2.data.yusan.level
                                zhishuSu[2].innerHTML=data2.data.ganmao.level
                                zhishuSu[3].innerHTML=data2.data.xiche.level
                                zhishuSu[4].innerHTML=data2.data.jiaotong.level
                                zhishuSu[5].innerHTML=data2.data.wuran.level
                                zhishuSu[6].innerHTML=data2.data.shushidu.level
                                zhishuSu[7].innerHTML=data2.data.liangshai.level
                                zhishuSu[8].innerHTML=data2.data.yundong.level
                                zhishuSu[9].innerHTML=data2.data.fangshai.level
                                zhishuSu[10].innerHTML=data2.data.diaoyu.level
                                zhishuSu[11].innerHTML=data2.data.lvyou.level
                                zhishuSu[12].innerHTML=data2.data.huazhuang.level
                                zhishuSu[13].innerHTML=data2.data.chenlian.level
                                zhishuSu[14].innerHTML=data2.data.guomin.level
                                zhishuSu[15].innerHTML=data2.data.zhongshu.level
                                var arr=[]
                                arr.push(data2.data.chuanyi.desc,data2.data.yusan.desc,data2.data.ganmao.desc,data2.data.xiche.desc,data2.data.jiaotong.desc,
                                    data2.data.wuran.desc, data2.data.shushidu.desc,data2.data.liangshai.desc,data2.data.yundong.desc,data2.data.fangshai.desc,
                                    data2.data.diaoyu.desc,data2.data.lvyou.desc,data2.data.huazhuang.desc,data2.data.chenlian.desc,data2.data.guomin.desc,data2.data.zhongshu.desc)
                                console.log(arr);
                                let tip=document.querySelectorAll('.tip')
                                let bgchange=document.querySelector("#bgchange")
                                let newWindow=document.querySelector('#newWindow')
                                var zhishu=document.querySelectorAll(".zhishu")
                                var txtzhishu=document.querySelector("#txtzhishu")
                                var txtsu=document.querySelector("#txtsu")
                                for(let i=0;i<16;i++){
                                    tip[i].addEventListener('click',function(){
                                        stop()
                                        bgchange.style.display="block"
                                        txtzhishu.innerHTML=zhishu[i].innerHTML+"指数"
                                        txtsu.innerHTML=arr[i]
                                        newWindow.style.display="block"
                                    })
                                }
                                
                            }}}
    }
    //默认重庆
    request("重庆")
    var mo=function(e){
        e.preventDefault();
    };
    function stop(){
    document.body.style.overflow='hidden';
    document.addEventListener("touchmove",mo,{passive:false});
    }
    function move(){
        document.body.style.overflow='';
        document.removeEventListener("touchmove",mo,{passive:false})
    }
    var clj=document.querySelector(".tc")
    var newse=document.querySelector(".newse")
    var old=document.querySelector(".old")
    var cancenl=document.querySelector('.btncancel')
    var historyCom=document.querySelector('.history-com')
    var history=document.querySelector('.history')
    clj.onclick=()=>{
    newse.style.display="block"
    old.style.display="none"
    historyCom.style.display='block'
    init_history();
   var data=localStorage.getItem('data')
   historydata(JSON.parse(data))
        document.querySelector(".input").value=''
    }
    cancenl.onclick=()=>{
    newse.style.display="none"
    old.style.display="block"
    }
    let historyMax=3
    var input=document.querySelector('.input')
    input.addEventListener('focus',function(){
        input.value=''
        init_history();
        historyCom.style.display='none'
        let data=localStorage.getItem('data')
        historydata(JSON.parse(data));
    })
    input.addEventListener('blur', function () {
        document.querySelector(".history").style.display="block"
       historyCom.style.display='block'
         init_history();
        var data=localStorage.getItem('data')
        historydata(JSON.parse(data))
      })
        input.addEventListener('keyup',function fn(event){
        if(event.keyCode=='13'){
            var value=document.querySelector('.input').value
           request(value)
            var data=localStorage.getItem('data')
             historydata(JSON.parse(data))
            if(data){
                arr=JSON.parse(data);
            }else{
                arr=[]
            }
            arr.push(value)
            removal(arr)
            localStorage.setItem('data',JSON.stringify(arr))
            newse.style.display="none"
                old.style.display="block"
        }
    })
    function removal(arr){
        for(let i=0;i<arr.length;i++){
            var arritem=arr[i].trim()
            if(arritem==''){
                arr.splice(i,1);
            }
            if(arritem!=''){
                for(let j=i+1;j<arr.length;j++){
                    if(arr[i]==arr[j]){
                        arr.splice(i,1)
                    }
                }
            }
        }
        return arr
    }
    function historydata(searchArr){
        searchArr.reverse();
        var list=document.querySelector('.list')
        if(searchArr.length<=historyMax){
            for(let i=0;i<searchArr.length;i++){
               
                var li=document.querySelector('.li')
                list.appendChild(li)
                li.innerHTML=searchArr[i]
            }
        }
        else{
            for(let i=0;i<historyMax;i++){
                 list.innerHTML+="<li class='opt-city'>"+searchArr[i]+"<li>"               
            }
        }
        console.log(list);
    }
    var list=document.querySelector('.list')
    console.log(list);
    function init_history() {
        var list=document.querySelector('.list')
        list.innerHTML='';
      }
      var deleteImg=document.querySelector(".delete")
      var history=document.querySelector('.history')
      deleteImg.onclick=()=>{
            history.style.display="none"
            
            let liarr=list.querySelectorAll(".li")
            console.log(liarr);       
      }
      var optCity=document.querySelectorAll('.opt-city')
      for(let i=0;i<12;i++){
          optCity[i].onclick=()=>{
              request(optCity[i].innerHTML)
              newse.style.display='none'
              old.style.display='block'
        }
      }
    var tipIcon=document.querySelectorAll('.tipIcon')
    for(let i=0;i<16;i++){
        tipIcon[i].src="./images/"+i+".png"
    }  
    var newBtn=document.querySelector(".newBtn")
    newBtn.onclick=()=>{
        move()
        newWindow.style.display="none"
        bgchange.style.display="none"
    }
    var share=document.querySelector("#share")
    var fenxiang=document.querySelector(".share")
    
  fenxiang.onclick=()=>{
      stop()
      share.style.display="block"
      bgchange.style.display="block"    
  }
    var shareBtn=document.querySelector("#shareBtn")
    shareBtn.onclick=()=>{
        move()
        share.style.display="none"
        bgchange.style.display="none"
    }
    
}
