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
				Initialization();
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
	function keyclick_r(){
		document.getElementById("canvas").style.cursor = "zoom-in";
	}
	function keyclick_g(){
		document.getElementById("canvas").style.cursor = "zoom-in";
	}
	/**
	 * 绘制点 xx yy color rr isFill
	 * 注释部分为原版-函数点绘器
	 */
	function drawPoint(xx, yy, color, rr, isFill){
		// context.fillStyle = context.strokeStyle = color;
		// context.beginPath();
		// rr=rr||0.02; 
		// isFill=isFill||true;
		xx = AXIS_ORIGIN.x + xx * VERTICAL_TICK_SPACING;
		yy = AXIS_ORIGIN.y + (-1) * yy * HORIZONTAL_TICK_SPACING;
		rr = rr * VERTICAL_TICK_SPACING;
		if(xx>=AXIS_RIGHT||xx<=AXIS_LEFT){
			return false;
		}
		// context.arc(xx,yy,rr,0,2*Math.PI);
		// context.stroke();
		// if(isFill){
		// 	context.fill();
		// }
		return true;
	}
	/**
	 * 绘制线 startx starty endx endy color width
	 */
	function drawLine(startx, starty, endx, endy, color, width){
		context.strokeStyle = color;
		context.lineWidth = (width || 0.15) * VERTICAL_TICK_SPACING;
		startx = AXIS_ORIGIN.x + startx * VERTICAL_TICK_SPACING;
		starty = AXIS_ORIGIN.y + (-1) * starty * HORIZONTAL_TICK_SPACING;
		endx = AXIS_ORIGIN.x + endx * VERTICAL_TICK_SPACING;
		endy = AXIS_ORIGIN.y + (-1) * endy * HORIZONTAL_TICK_SPACING;
		context.beginPath();
		context.moveTo(startx, starty);
		context.lineTo(endx, endy);
		context.stroke();
	}
	/**
	 * 绘制函数 str(JS代码) color
	 */
	function drawF(str,color){
		eval("function y(x){return "+str+"}");
		color=color||"green";
		var i = 0.01 - AXIS_ORIGIN.x / VERTICAL_TICK_SPACING;
		var tempi,tempy;
		while(drawPoint(i, y(i), color)){
			tempi = i;
			tempy = y(i);
			i += 0.0002*(80-VERTICAL_TICK_SPACING);
			if(tempy-y(i)<50&&tempy-y(i)>-50){
				drawLine(tempi,tempy,i,y(i),color);
			}
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
	function set(col){
		var temp = null;
		if(col=='g'){
			temp = document.getElementById('func_g').value;
		}
		else{
			temp = document.getElementById('func_r').value;
		}
		temp = temp.toLowerCase();
		if (temp.indexOf("x") == -1){
			if(temp != null && temp != ""){
				alert("表达式不合法!");
			}
		}
		temp = temp.replace(RegExp("e","g"),"Math.E");
		temp = temp.replace(RegExp("pi","g"),"Math.PI");
		temp = temp.replace(RegExp("abs","g"),"Math.abs");
		temp = temp.replace(RegExp("sin","g"),"Math.sin");
		temp = temp.replace(RegExp("cos","g"),"Math.cos");
		temp = temp.replace(RegExp("tan","g"),"Math.tan");
		temp = temp.replace(RegExp("arcc","g"),"Math.acos");
		temp = temp.replace(RegExp("arcs","g"),"Math.asin");
		temp = temp.replace(RegExp("arct","g"),"Math.atan");
		temp = temp.replace(RegExp("xp","g"),"Math.exp");
		temp = temp.replace(RegExp("sqrt","g"),"Math.sqrt");
		temp = temp.replace(RegExp("pow","g"),"Math.pow");
		temp = temp.replace(RegExp("min","g"),"Math.min");
		temp = temp.replace(RegExp("max","g"),"Math.max");
		temp = temp.replace(RegExp("ln","g"),"Math.log");
		if(col=='g'){
			window.a = temp;
		}
		else{
			window.b = temp;
		}
		context.clearRect(0, 0, canvas.width, canvas.height);
		Initialization();
	}
	function drawOthers(){
		if(window.a!=null){
			drawF(window.a,"#2CAC67");
		}
		if(window.b!=null){
			drawF(window.b,"#FA5858");
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

		drawOthers();

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
		drawGrid('lightgray', VERTICAL_TICK_SPACING , HORIZONTAL_TICK_SPACING);
		drawAxis();
	}
	function Redraw(up_istrue){
		if(up_istrue){
			if(HORIZONTAL_TICK_SPACING < 70){
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
		}
		Initialization();
	}

	function log_calculate(){
		var str_a = document.getElementById("a").value;
		var str_N = document.getElementById("N").value;
		var a = parseFloat(str_a);
		var N = parseFloat(str_N);
		if(N<=0 || a<=0){
			alert("真数和底数必须非负！");
			return;
		}else if(str_a.length <= 0 || str_N.length <= 0){
			alert("真数和底数不能为空！")
			return;
		}
		if(str_a.charAt(str_a.length-1) == 'e'){
			a = a * Math.E;
		}
		if(str_N.charAt(str_N.length-1) == 'e'){
			N = N * Math.E;
		}
		var resu = Math.log(N)/Math.log(a);
		document.getElementById("result").innerHTML="结果为："+resu;
	}
	function a_e(){
		var str_a = document.getElementById("a").value;
		if(str_a.charAt(str_a.length-1) != 'e'){
			document.getElementById("a").value=str_a+"*e";
		}
	}
	function N_e(){
		var str_N = document.getElementById("N").value;
		if(str_N.charAt(str_N.length-1) != 'e'){
			document.getElementById("N").value=str_N+"*e";
		}
	}
	function index_calculate(){
		var str_b = document.getElementById("b").value;
		var str_n = document.getElementById("n").value;
		var b = parseFloat(str_b);
		var n = parseFloat(str_n);
		if(str_b.length <= 0 || str_n.length <= 0){
			alert("指数和底数不能为空！")
			return;
		}
		if(str_b.charAt(str_b.length-1) == 'e'){
			b = b * Math.E;
		}
		if(str_n.charAt(str_n.length-1) == 'e'){
			n = n * Math.E;
		}
		var resu = Math.pow(b,n);
		document.getElementById("Result").innerHTML="结果为："+resu;
	}
	function b_e(){
		var str_b = document.getElementById("b").value;
		document.getElementById("b").value = str_b+"*e";
	}
	function n_e(){
		var str_n = document.getElementById("n").value;
		document.getElementById("n").value = str_n+"*e";
	}

	/**
	 * T分布表
	 */
	function normsinv(pp) {
		var x, y;
		var q = 1 - pp;
		bb = [1.570796288, 0.03706987906, -0.0008364353589, -0.0002250947176, 0.000006841218299, 0.000005824238515, -0.00000104527497, 8.360937017e-8, -3.231081277e-09, 3.657763036e-11, 6.936233982e-13];
		if (q == 0.5) return 0;
		var p;
		if (q > 0.5) p = 1 - q;
		else p = q;
		var b;
		y = -Math.log(4 * p * (1 - p));
		b = y * bb[10];
		var i;
		for (i = 9; i >= 0; i--) {
			b = y * (bb[i] + b);
		}
		x = Math.sqrt(b);
		if (q > 0.5) x = -x;
		return x;
	}
	function gamma(x) {
		var i;
		var y, t, s, u;
		var a = [0.0000677106, -0.0003442342, 0.0015397681, -0.0024467480, 0.0109736958, -0.0002109075, 0.0742379071, 0.0815782188, 0.4118402518, 0.4227843370, 1.0];
		if (x <= 0.0) throw "x不能小于0";
		y = x;
		if (y <= 1.0) {
			t = 1.0 / (y * (y + 1.0));
			y += 2.0;
		} else if (y <= 2.0) {
			t = 1.0 / y;
			y += 1.0;
		} else if (y <= 3.0) t = 1.0;
		else {
			t = 1.0;
			while (y > 3.0) {
				y -= 1.0;
				t = t * y;
			}
		}
		s = a[0];
		u = y - 2.0;
		for (i = 1; i <= 10; i++) s = s * u + a[i];
		s *= t;
		return s;
	}
	function betacf(a, b, x) {
		var MAXIT = 1000;
		var EPS = 1e-10;
		var FPMIN = 1e-8;
		var m, m2;
		var aa, c, d, del, h, qab, qam, qap;
		qab = a + b;
		qap = a + 1;
		qam = a - 1;
		c = 1;
		d = 1 - qab * x / qap;
		if (Math.abs(d) < FPMIN) d = FPMIN;
		d = 1 / d;
		h = d;
		for (m = 1; m <= MAXIT; m++) {
			m2 = 2 * m;
			aa = m * (b - m) * x / ((qam + m2) * (a + m2));
			d = 1 + aa * d;
			if (Math.abs(d) < FPMIN) d = FPMIN;
			c = 1 + aa / c;
			if (Math.abs(c) < FPMIN) c = FPMIN;
			d = 1 / d;
			h *= d * c;
			aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
			d = 1 + aa * d;
			if (Math.abs(d) < FPMIN) d = FPMIN;
			c = 1 + aa / c;
			if (Math.abs(c) < FPMIN) c = FPMIN;
			d = 1 / d;
			del = d * c;
			h *= del;
			if (Math.abs(del - 1) <= EPS) break;
		}
		if (m > MAXIT) throw "a or b too big, or MAXIT too small in betacf";
		return h;
	}
	function gammln(xx) {
		var j;
		var x, y, tmp, ser;
		var cof = [76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5];
		y = x = xx;
		tmp = x + 5.5;
		tmp -= (x + 0.5) * Math.log(tmp);
		ser = 1.000000000190015;
		for (j = 0; j < 6; j++) ser += cof[j] / ++y;
		return - tmp + Math.log(2.5066282746310005 * ser / x);
	}
	function betai(a, b, x) {
		var bt;
		if (x < 0 || x > 1) throw "Bad x in routine batai";
		if (x == 0 || x == 1) bt = 0;
		else bt = Math.exp(gammln(a + b) - gammln(a) - gammln(b) + a * Math.log(x) + b * Math.log(1 - x));
		if (x < (a + 1) / (a + b + 2)) return bt * betacf(a, b, x) / a;
		else return 1 - bt * betacf(b, a, 1 - x) / b;
	}
	function tdist2(t, free) {
		if (free < 1) throw "free must biger than 0";
		var f;
		f = free;
		var p;
		p = 1 - betai(f / 2.0, 0.5, f / (f + t * t));
		return p;
	}
	function tdist(t, free) {
		if (t == 0) {
			return 0.5;
		}
		if (t > 0) {
			return 0.5 + tdist2(t, free) / 2;
		}
		return (1 - tdist2( - t, free)) / 2;
	}
	var outpp;
	function t_dist(n, t) {
		var sign, ibi, n2, i;
		var tt, x, p, u, ga1, ga2, dd;
		if (t == 0) {
			ga1 = gamma(n / 2.0);
			ga2 = gamma(0.5 + n / 2.0);
			outpp = 0.5;
			return ga2 / (Math.sqrt(n * Math.PI) * ga1);
		}
		if (t < 0) {
			sign = -1;
		} else sign = 1;
		tt = t * t;
		x = tt / (n + tt);
		if (n % 2 == 0) {
			p = Math.sqrt(x);
			u = p * (1 - x) / 2.0;
			ibi = 2;
		} else {
			u = Math.sqrt(x * (1 - x)) / Math.PI;
			p = 1 - 2 * Math.atan(Math.sqrt((1 - x) / x)) / Math.PI;
			ibi = 1;
		}
		if (ibi == n) {
			dd = u / Math.abs(t);
			outpp = 0.5 + sign * p / 2.0;
			return dd;
		} else {
			n2 = n - 2;
		}
		for (i = ibi; i <= n2; i += 2) {
			p += 2.0 * u / i;
			u = u * (1 + i) / i * (1 - x);
		}
		dd = u / Math.abs(t);
		outpp = 0.5 + sign * p / 2.0;
		return dd;
	}
	function tdistinv(pvar, n) {
		var q;
		q = 1 - pvar;
		var t = 0.0;
		var pis, dfr2, c, q2, p, yq, e, ga1, ga2, ga3, t0, pp, d;
		var k;
		pis = Math.sqrt(Math.PI);
		dfr2 = n / 2.0;
		if (n == 1) return Math.tan(Math.PI * (0.5 - q));
		if (n == 2) {
			if (q > 0.5) c = -1;
			else c = 1;
			q2 = (1 - 2 * q);
			q2 *= q2;
			return Math.sqrt(2.0 * q2 / (1.0 - q2)) * c;
		}
		p = 1 - q;
		yq = normsinv(p);
		e = 1.0 - 1.0 / (4.0 * n);
		e = e * e - yq * yq / (2.0 * n);
		if (e > 0.5) t0 = yq / Math.sqrt(e);
		else {
			ga1 = gammln(dfr2);
			ga2 = gammln(dfr2 + 0.5);
			ga3 = Math.exp((ga1 - ga2) / n);
			t0 = Math.pow(Math.sqrt(n) / (pis * q * n), (1.0 / n) / ga3);
		}
		for (k = 1; k <= 30; k++) {
			d = t_dist(n, t0);
			pp = outpp;
			if (d == 0) return t0;
			t = t0 - (pp - p) / d;
			if (Math.abs(t0 - t) < 0.000001 * Math.abs(t)) {
				return t;
			} else t0 = t;
		}
		return t;
	}
	var free = null;
	function calc() {
		var s, a;
		var type = "计算分布函数的值";
		type = $('#type').val();
		free = parseInt($('#nn').val());
		a = parseInt($('#xx').val());
		if (type=="计算分布函数的值"||type == 1) {
			$('#T_resu').html("f(x)=" + tdist(a, free).toFixed(6) + ", 此外, 1-f(x)=" + (1 - tdist(a, free)).toFixed(6));
		} else if (type=="计算分布函数的反函数的值"||type == 2) {
			$('#T_resu').html("x=" + tdistinv(a, free).toFixed(6));
		} else if (type=="计算上a分位点"||type == 3) {
			$('#T_resu').html("x=" + tdistinv(1 - a, free).toFixed(6));
		} else if (type=="计算双侧a分位点"||type == 4) {
			$('#T_resu').html("x=" + tdistinv(1 - a / 2, free).toFixed(6));
		}
	}
	function type_clear(){
		document.getElementById('type').value='';
	}
	function type_text(){
		var type = document.getElementById('type').value;
		if (type=="计算分布函数的值"||type == 1) {
			document.getElementById('x_text').innerHTML='变量值x：';
		} else if (type=="计算分布函数的反函数的值"||type == 2) {
			document.getElementById('x_text').innerHTML='概率p：';
		} else if (type=="计算上a分位点"||type == 3) {
			document.getElementById('x_text').innerHTML='α：';
		} else if (type=="计算双侧a分位点"||type == 4) {
			document.getElementById('x_text').innerHTML='概率a：';
		}
	}
	function F(X,DF1,DF2){
		var temp = Math.exp(gammln((DF1+DF2)/2))*(DF1^(DF1/2))*(DF2^(DF2/2))*(X^(DF1/2-1))/Math.exp(gammln(DF1/2))/Math.exp(gammln(DF2/2))/((DF2+DF1*X)^((DF1+DF2)/2));
		document.getElementById("F_resu").innerHTML="结果为："+temp;
		alert(temp);
		return temp;
	}