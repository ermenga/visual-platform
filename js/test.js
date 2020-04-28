	var wheel_allow = false;
	$("canvas").mouseenter(function(){
		if(!wheel_allow){
			wheel_allow = true;
			$(document.body).css({
					"overflow-x":"hidden",
					"overflow-y":"hidden"
				});
			document.addEventListener('DOMMouseScroll', scrollFunc, false);//给页面绑定滑轮滚动事件
			document.onmousewheel = scrollFunc;//滚动滑轮触发scrollFunc方法
		}
	});
	$("canvas").mouseleave(function(){
		document.getElementById("canvas").style.cursor = "zoom-in";
		if(wheel_allow){
			wheel_allow = false;
			$(document.body).css({
					"overflow-x":"auto",
					"overflow-y":"auto"
			});
			document.removeEventListener('DOMMouseScroll',scrollFunc,false);
			document.onmousewheel = null;
		}
	});

	var canvas = document.getElementById('canvas'),
	context = canvas.getContext('2d'),
   	//外边距(坐标系距离画布距离)
	AXIS_MARGIN = 0,
	//原点(改为中心点)
	AXIS_ORIGIN = {x: canvas.width / 2 - AXIS_MARGIN, y: canvas.height / 2 - AXIS_MARGIN},
	//y轴顶点位置
	AXIS_TOP = AXIS_MARGIN,
	//x轴顶点位置
	AXIS_RIGHT = canvas.width - AXIS_MARGIN,
	AXIS_LEFT = AXIS_MARGIN,
	AXIS_BOTTOM = canvas.height - AXIS_MARGIN,
	//缩放倍数(没有用到)
	AXIS_MULTI = 1,
	//横向刻度线间距
	HORIZONTAL_TICK_SPACING = 10,
	//垂直刻度线间距
	VERTICAL_TICK_SPACING = 10,

	//X轴长度
	AXIS_WIDTH = AXIS_RIGHT - AXIS_LEFT,
	//y轴长度
	AXIS_HEIGHT = AXIS_BOTTOM - AXIS_TOP,

	//y轴上的点的最大值
	NUM_VERTICAL_TICKS = AXIS_HEIGHT / VERTICAL_TICK_SPACING,
	NUM_HORIZONTAL_TICKS = AXIS_WIDTH / HORIZONTAL_TICK_SPACING,

	TICK_WIDTH = 10,
	TICKS_LINEWIDTH = 0.5,
	TICK_COLOR = 'navy',

	AXIS_LINEWIDTH = 1.0,
	AXIS_COLOR = 'blue';
	function changex(xx){
		return (AXIS_ORIGIN.x + xx * HORIZONTAL_TICK_SPACING)
	}
	function changey(yy){
		return (AXIS_ORIGIN.y - yy * VERTICAL_TICK_SPACING)
	}
	canvas.onmousedown = function(e){
		var posX = AXIS_ORIGIN.x;
		var posY = AXIS_ORIGIN.y;
		var x = e.clientX;
		var y = e.clientY;
		document.getElementById("canvas").style.cursor = "move";
		//判断鼠标是否点击在canvas内
		if(e.clientX-this.offsetLeft >= 0 && e.clientX-this.offsetLeft <= AXIS_RIGHT && e.clientY-this.offsetTop >= 0 && e.clientY-this.offsetTop <= AXIS_BOTTOM){
			document.onmousemove = function(e){
				AXIS_ORIGIN.x = posX + e.clientX - x;
				AXIS_ORIGIN.y = posY + e.clientY - y;
				//改变原点位置
				context.clearRect(0, 0, canvas.width, canvas.height);
				drawGrid('lightgray', VERTICAL_TICK_SPACING , HORIZONTAL_TICK_SPACING);
				drawAxis();
				//重绘坐标系
			};
			document.onmouseup = function(){
				document.onmousemove = null;
			};
		}
	};
	canvas.onmouseup = function(){
		document.getElementById("canvas").style.cursor = "default";
	}

	var scrollFunc = function (e) {
		if(wheel_allow){
			e = e || window.event;
			if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
				if (e.wheelDelta > 0) { //当滑轮向上滚动时
					document.getElementById("canvas").style.cursor = "zoom-in";
					Redraw(true);
				}
				if (e.wheelDelta < 0) { //当滑轮向下滚动时
					document.getElementById("canvas").style.cursor = "zoom-out";
					Redraw(false);
				}
			} else if (e.detail) {  //Firefox滑轮事件
				if (e.detail> 0) { //当滑轮向上滚动时
					document.getElementById("canvas").style.cursor = "zoom-in";
					Redraw(true);
				}
				if (e.detail< 0) { //当滑轮向下滚动时
					document.getElementById("canvas").style.cursor = "zoom-in";
					Redraw(false);
				}
			}
		}
	};
	/**
	 * 绘制点 xx yy rr color isFill
	 */
	function drawPoint(xx, yy, rr, color, isFill){
		context.fillStyle = context.strokeStyle = color;
		context.beginPath();
		context.arc(changex(xx),changey(yy),rr,0,2*Math.PI);
		context.stroke();
		if(isFill){
			context.fill();
		}
	}
	/**
	 * 背景网格线
	 * @param color
	 * @param stepX
	 * @param stepY
	 */
	function drawGrid(color, stepX, stepY) {
		context.strokeStyle = color;
		context.lineWidth = 0.5;
		for (var i = AXIS_ORIGIN.x + 0.5; i < context.canvas.width; i += stepX) {
			context.beginPath();
			context.moveTo(i, 0);
			context.lineTo(i, context.canvas.height);
			context.stroke();
		}
		for (var i = AXIS_ORIGIN.x + 0.5; i > 0; i -= stepX) {
			context.beginPath();
			context.moveTo(i, 0);
			context.lineTo(i, context.canvas.height);
			context.stroke();
		}
		for (var i = AXIS_ORIGIN.y + 0.5; i < context.canvas.height; i += stepY) {
			context.beginPath();
			context.moveTo(0, i);
			context.lineTo(context.canvas.width, i);
			context.stroke();
		}
		for (var i = AXIS_ORIGIN.y + 0.5; i > 0; i -= stepY) {
			context.beginPath();
			context.moveTo(0, i);
			context.lineTo(context.canvas.width, i);
			context.stroke();
		}
	}
	/**
	 * 画坐标轴
	 */
	function drawAxis() {
		context.save();
		context.strokeStyle = AXIS_COLOR;
		context.lineWidth = AXIS_LINEWIDTH;

		drawHorizontalAxis();
		drawVerticalAxis();

		context.lineWidth = TICKS_LINEWIDTH;
		context.strokeStyle = TICK_COLOR;

		drawVerticalAxisTicks();
		drawHorizontalAxisTicks();

		context.restore();
	}
	/**
	 * 绘制x轴
	 */
	function drawHorizontalAxis() {
		context.beginPath();
		context.moveTo(AXIS_LEFT, AXIS_ORIGIN.y);
		context.lineTo(AXIS_RIGHT, AXIS_ORIGIN.y);
		context.stroke();
	}
	/**
	 * 绘制y轴
	 */
	function drawVerticalAxis() {
		context.beginPath();
		context.moveTo(AXIS_ORIGIN.x, AXIS_BOTTOM);
		context.lineTo(AXIS_ORIGIN.x, AXIS_TOP);
		context.stroke();
	}
	/**
	 * 绘制y轴刻度
	 */
	function drawVerticalAxisTicks() {
		//小刻度长度的临时变量
		var deltaY = TICK_WIDTH / 2;
		for (var i = 1; i < NUM_VERTICAL_TICKS * 2; i++) {
			context.beginPath();
			context.moveTo(AXIS_ORIGIN.x - deltaY, AXIS_ORIGIN.y - i * VERTICAL_TICK_SPACING);
			context.lineTo(AXIS_ORIGIN.x + deltaY, AXIS_ORIGIN.y - i * VERTICAL_TICK_SPACING);
			context.stroke();
			context.beginPath();
			context.moveTo(AXIS_ORIGIN.x - deltaY, AXIS_ORIGIN.y + i * VERTICAL_TICK_SPACING);
			context.lineTo(AXIS_ORIGIN.x + deltaY, AXIS_ORIGIN.y + i * VERTICAL_TICK_SPACING);
			context.stroke();
		}
	}
	/**
	 * 绘制x轴刻度
	 */
	function drawHorizontalAxisTicks() {
		//小刻度长度的临时变量
		var deltaY = TICK_WIDTH / 2;
		for (var i = 1; i < NUM_HORIZONTAL_TICKS * 2; i++) {
			context.beginPath();
			context.moveTo(AXIS_ORIGIN.x + i * HORIZONTAL_TICK_SPACING, AXIS_ORIGIN.y - deltaY);
			context.lineTo(AXIS_ORIGIN.x + i * HORIZONTAL_TICK_SPACING, AXIS_ORIGIN.y + deltaY);
			context.stroke();
			context.beginPath();
			context.moveTo(AXIS_ORIGIN.x - i * HORIZONTAL_TICK_SPACING, AXIS_ORIGIN.y - deltaY);
			context.lineTo(AXIS_ORIGIN.x - i * HORIZONTAL_TICK_SPACING, AXIS_ORIGIN.y + deltaY);
			context.stroke();
		}
	}

	function Initialization(){
		drawGrid('lightgray', 10, 10);
		drawAxis();
	}
	function Redraw(up_istrue){
		if(up_istrue){
			if(HORIZONTAL_TICK_SPACING <= 80){
				context.clearRect(0, 0, canvas.width, canvas.height);
				HORIZONTAL_TICK_SPACING += 5;
				VERTICAL_TICK_SPACING += 5;
				NUM_VERTICAL_TICKS = AXIS_HEIGHT / VERTICAL_TICK_SPACING,
				NUM_HORIZONTAL_TICKS = AXIS_WIDTH / HORIZONTAL_TICK_SPACING,
				TICK_WIDTH += 5;
				TICKS_LINEWIDTH += 0.25;
				AXIS_LINEWIDTH += 0.5;
			}else{
				alert("不能再大啦！");
			}
			drawGrid('lightgray', VERTICAL_TICK_SPACING , HORIZONTAL_TICK_SPACING);
			drawAxis();
		}else{
			context.clearRect(0, 0, canvas.width, canvas.height);
			if(HORIZONTAL_TICK_SPACING >= 10){
				HORIZONTAL_TICK_SPACING -= 5;
				VERTICAL_TICK_SPACING -= 5;
				NUM_VERTICAL_TICKS = AXIS_HEIGHT / VERTICAL_TICK_SPACING,
				NUM_HORIZONTAL_TICKS = AXIS_WIDTH / HORIZONTAL_TICK_SPACING,
				TICK_WIDTH -= 5;
				TICKS_LINEWIDTH -= 0.25;
				AXIS_LINEWIDTH -= 0.5;
			}else{
				alert("不能再小啦！");
			}
			drawGrid('lightgray', VERTICAL_TICK_SPACING , HORIZONTAL_TICK_SPACING);
			drawAxis();
		}
		
	}