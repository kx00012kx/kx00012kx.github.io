window.onload=function(){
	var n=0;		//滚轮事件标记;
	var flag=false; //让滚轮事件正确执行的通行证;

	var height=document.documentElement.clientHeight||document.body.clientHeight;
	var width=document.documentElement.clientWidth||document.body.clientWidth;
	var maxSide=Math.max(width,height);

	var oHead=document.querySelector('.head');
	var oCard=document.querySelector('.card');

	var oBack=document.querySelectorAll('.back');
	var oList=document.querySelectorAll('.list');
	var oWarp=document.querySelectorAll('.warp');

	var oUp=document.querySelectorAll('.up');
	var oDown=document.querySelectorAll('.down');
	var oPage=document.querySelectorAll('.page');
	var oTop=document.querySelector('.topPage');


	var oCir=document.querySelector('.circle');

	var iCon=document.querySelector('.avatar');
	var oMount=document.querySelector('.mountain');
	var oM_left=document.querySelector('.left');
	var oM_right=document.querySelector('.right');
	var oGo=document.querySelector('.go');

	var inputTxt=document.querySelector('.inputTxt');
	var line=document.querySelector('.line');

	function init(){		//初始化页面;
		var str=inputTxt.innerHTML;
		inputTxt.innerHTML='';

		for(var i=0;i<oList.length;i++){
			oList[i].style.transform='rotateY(90deg)';
			oBack[i].style.transform='rotateY(0deg)';
		}
		for(var i=2;i<oPage.length;i++){
			oPage[i].togo=1;		//设置通行id,用来还原flag值
		}

		//开场动画;
		startMove(oCir,{'width':maxSide*1.2,'height':maxSide*1.2},800,'easeOut',function(){		//圆扩大;	
			oPage[0].style.display='block';	
			oTop.style.display='block';	
			this.style.display='none';
			startMove(iCon,{'top':60,'left':80,'height':60,'width':60},1000,'easeOut',function(){	//头像移动;	
				oHead.onmouseenter=function(){
					startMove(oCard,{'height':200,'width':300},300,'linear',function(){
						this.onclick=function(e){
							e=e||window.event;
							e.stopPropagation();
							e.cancelBubble=true;
						}
						document.onclick=function(){
							startMove(oCard,{'height':0,'width':0},300,'linear');
						}
					});
					
					oCard.onmouseleave=function(){
						startMove(this,{'height':0,'width':0},300,'linear');
					}
				}
				inputTxt.style.display='inline';
				line.style.display='inline';
				input(str,inputTxt,function(){
					oGo.style.display='block';
					line.style.display='none';
					mousewheel();
				})
				startMove(iCon.children[0],{'opacity':100},1000,'easeOut')
			});
		});
	}

	init();

	function input(str,ele,fn){//文本输入;

		str=str.replace(/&emsp;/g,'@').replace(/<br>/g,'#');
		str=str.split('').join(',');
		str=str.replace(/@/g,'&emsp;').replace(/#/g,'<br>');
		str=str.split(',');

		var len=str.length;
		ele.n=0;
		clearInterval(ele.timer)
		ele.timer=setInterval(function(){		
			ele.innerHTML+=str[ele.n];
			ele.n++;
			if(ele.n==len-1){
				clearInterval(ele.timer);
				setTimeout(function(){
					fn&&fn.call();
				},40)
			}
		},30)
	}

	window.onresize=function(){
		height=document.documentElement.clientHeight||document.body.clientHeight;
		width=document.documentElement.clientWidth||document.body.clientWidth;
	}
	
	function mousewheel(){			//滚轮事件监听;
		document.addEventListener('DOMMouseScroll',function(e){//兼容Firefox;
			e=e||window.event;
			dir(e);
		},false);
		document.addEventListener('mousewheel',function(e){
			e=e||window.event;
			dir(e);
		},false);
	}

	oGo.onclick=function(){//go 按钮点击事件
		n=1;
		setTimeout(function(){
			rotate(oBack[1],90,function(){
				this.style.display='none';
				rotate(oList[1],0);
			});					
			setTimeout(function(){
				rotate(oBack[2],90,function(){
					this.style.display='none';
					rotate(oList[2],0);
				});						
			},60)
		},60)
		rotate(oBack[0],90,function(){
			this.style.display='none';
			rotate(oList[0],0);
		});
	}

	function dir(e){//滚轮方向与事件调用
		if(flag){
			return;
		}
		flag=true;
		var dir=e.detail||e.wheelDelta;
		if(e.detail>0||e.wheelDelta<0){
			n++;
			switch(n){
				case 1:
				setTimeout(function(){
					rotate(oBack[1],90,function(){
						this.style.display='none';
						rotate(oList[1],0);
					});					
					setTimeout(function(){
						rotate(oBack[2],90,function(){
							this.style.display='none';
							rotate(oList[2],0);
						});						
					},60)
				},60)
				rotate(oBack[0],90,function(){
					this.style.display='none';
					rotate(oList[0],0);
				});
				break;
				case 2:
				startMove(oWarp[0],{'top':-height},400,'easeBoth',function(){
					this.style.top='-100%';
				});							
				startMove(oWarp[1],{'top':0},400,'easeBoth');
				startMove(oWarp[2],{'top':-height},400,'easeBoth',function(){
					this.style.top='-100%';
				});
				break;
				case 3:
				hide(dir);
				break;
				case 4:
				case 5:
				startMove(oPage[n-2],{'top':0},500,'easeOut');
				break;
			}								
		}else if(e.detail<0||e.wheelDelta>0){
			switch(n){
				case 1:
				setTimeout(function(){
					rotate(oList[1],90,function(){
						oBack[1].style.display='block';
						rotate(oBack[1],0);
					});					
					setTimeout(function(){
						rotate(oList[2],90,function(){
							oBack[2].style.display='block';
							rotate(oBack[2],0);
						});						
					},60)
				},60)
				rotate(oList[0],90,function(){
					oBack[0].style.display='block';
					rotate(oBack[0],0);
				});				
				break;
				case 2:
				startMove(oWarp[0],{'top':0},400,'easeBoth');
				startMove(oWarp[1],{'top':-height},400,'easeBoth',function(){
					this.style.top='-100%';
				});
				startMove(oWarp[2],{'top':0},400,'easeBoth');
				break;
				case 3:
				hide(dir);
				break;
				case 4:
				case 5:
				startMove(oPage[n-2],{'top':height},500,'easeOut',function(){
					this.style.top='100%';
				});
				break;
			}
			n--;
		}
		if(n==6){
			n--;
			flag=false;
		}else if(n==-1){
			n++;
			flag=false;
		}
		console.log(n);
	}

	function rotate(obj,target,fn){//三联旋转
		obj.tm=setInterval(function(){
			var str=obj.style.transform;
			var icur=Math.round(parseFloat(str.substring(8)));
			obj.speed=target>icur?6:-6;		
			if(icur==target){
				clearInterval(obj.tm);
				if(obj===oList[2]){
					flag=false;
				}
				fn&&fn.call(obj);
			}else{
				obj.style.transform='rotateY('+Math.round(icur+obj.speed)+'deg)';//ie下角度计算会出现小数
			}			
		},15)
	}

	var Tween = {//运动函数
		linear: function (t, b, c, d){  //匀速
			return c*t/d + b;
		},
		easeIn: function(t, b, c, d){  //加速曲线
			return c*(t/=d)*t + b;
		},
		easeOut: function(t, b, c, d){  //减速曲线
			return -c *(t/=d)*(t-2) + b;
		},
		easeBoth: function (t, b, c, d) {
	        if ((t /= d / 2) < 1) {
	            return c / 2 * t * t + b;
	        }
	        return -c / 2 * ((--t) * (t - 2) - 1) + b;
	    }
	}

	function startMove(obj,json,tim,fx,fn){//运动
	    var icur={};
	    for(var attr in json){
	        icur[attr]=0;
	        if(attr=='opacity'){
	            icur[attr]=Math.round(parseFloat(css(obj,attr)*100));
	        }else{
	            icur[attr]=Math.round(parseFloat(css(obj,attr)));
	        }
	    }
	    var startTime=new Date().getTime();
	    clearInterval(obj.tm)
	    obj.tm=setInterval(function(){
	        var changeTime=new Date().getTime();
	        var t=tim-Math.max(0,startTime-changeTime+tim);
	        for(var attr in json){
	            var value=Tween[fx](t,icur[attr],json[attr]-icur[attr],tim)
	            if(attr=='opacity'){
	                obj.style.opacity=value/100;
	                obj.style.filter='alpha(opacity='+value+')';
	            }else{
	                obj.style[attr]=value+'px';
	            }
	        }
	        if(t==tim){
	            clearInterval(obj.tm);	
	            if(obj===oWarp[2]||obj===oList[2]||obj.togo===1){
					flag=false;
				}
				if(json['top']===0&&obj===oList[2]){
					oPage[1].style.display='none';
				}
				fn&&fn.call(obj);
	        }
	    },20)
	}

	function hide(d){//三联隐藏
		var j=0;
		oPage[1].style.display='block';	
		clearInterval(timer);	
		var timer=setInterval(function(){
			if(d==3||d==-120){				
				startMove(oList[j],{'top':-height},350,'easeBoth',function(){
					this.style.top='-100%';
				});				
			}else if(d==-3||d==120){
				startMove(oList[j],{'top':0},350,'easeBoth');
			}			
			j++;
			if(j==3){
				clearInterval(timer);			
			}
		},200)
	}

	function css(obj,attr){//获取css属性值

		var win_H=document.documentElement.clientHeight||document.body.clientHeight;
		var win_W=document.documentElement.clientWidth||document.body.clientWidth;
		
		if(obj.currentStyle){
			if(obj.currentStyle[attr].indexOf('%')!=-1){
				if(attr=='top'||'bottom'||'height'){	//ie下会获取相对值,需要转化为绝对值;
					return parseInt(parseFloat(obj.currentStyle[attr])/100*win_H);
				}else if(attr=='left'||'right'||'width'){
					return parseInt(parseFloat(obj.currentStyle[attr])/100*win_W);
				}
			}else{
				return	obj.currentStyle[attr];
			}						
		}else{
		 	return getComputedStyle(obj)[attr];
		}
	}
}