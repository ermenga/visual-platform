//—————————
//第一个板块
//—————————
            function init()
            {
              var canvas = document.getElementById('canvas');
              canvas.width = 800;
              canvas.height = 800;
              var ctx = canvas.getContext('2d');
              ctx.beginPath();
              ctx.arc(173,551,2,0,2*Math.PI);
              ctx.stroke();
              ctx.beginPath();
              ctx.arc(249,496,2,0,2*Math.PI);
              ctx.stroke();
              ctx.beginPath();
              ctx.arc(325,420,2,0,2*Math.PI);
              ctx.stroke();
              ctx.beginPath();
              ctx.arc(400,268,2,0,2*Math.PI);
              ctx.stroke();
              ctx.beginPath();
              ctx.arc(476,116,2,0,2*Math.PI);
              ctx.stroke();
              ctx.beginPath();
              ctx.arc(551,98,2,0,2*Math.PI);
              ctx.stroke();
              ctx.beginPath();
              ctx.arc(627,79,2,0,2*Math.PI);
              ctx.stroke();
              var png = new Image();
              png.src = './movies/zbz.png';
              png.onload = function(){
                ctx.drawImage(png,0,0);
              }
              ctx.beginPath();
              ctx.moveTo(59,667);
              ctx.lineTo(629,59);
              ctx.strokeStyle = 'blue';
              ctx.stroke();
            }
            function update(k,b)
            {
              var canvas = document.getElementById('canvas');
              canvas.width = 800;
              canvas.height = 800;
              var ctx = canvas.getContext('2d');
              ctx.strokeStyle = 'black';
              ctx.beginPath();
              ctx.arc(173,551,2,0,2*Math.PI);
              ctx.stroke();
              ctx.beginPath();
              ctx.arc(249,496,2,0,2*Math.PI);
              ctx.stroke();
              ctx.beginPath();
              ctx.arc(325,420,2,0,2*Math.PI);
              ctx.stroke();
              ctx.beginPath();
              ctx.arc(400,268,2,0,2*Math.PI);
              ctx.stroke();
              ctx.beginPath();
              ctx.arc(476,116,2,0,2*Math.PI);
              ctx.stroke();
              ctx.beginPath();
              ctx.arc(551,98,2,0,2*Math.PI);
              ctx.stroke();
              ctx.beginPath();
              ctx.arc(627,79,2,0,2*Math.PI);
              ctx.stroke();
              var img = new Image();
              img.src = './movies/zbz.png';
              img.onload = function(){
                ctx.drawImage(img,0,0);
              }
              var bchange=97+(450-b)/10*38;
              var kchange=173+(((460-b)/k-15)/5)*76;
              ctx.strokeStyle = 'red';
              ctx.beginPath();
              ctx.moveTo(59,bchange);
              ctx.lineTo(kchange,59);
              ctx.stroke();
            }
            function clickButton(){ 
              var k = document.getElementById("k").value
              var b = document.getElementById("b").value;
              k = Number(k);
              b = Number(b);
              window.qk = k;
              window.qb = b;
              window.bo = true;
              update(k,b);
            }
            function clickReset(){
              window.bo = false;
              init();
              $("#k").val("");
              $("#b").val("");
            }
            if (!window.bo) {
          init();//范例_蓝
        } else {
          update(window.qk,window.qb);
        }
        //滑条变量
        function kchange() {
          var vk = document.getElementById("krange").value;
            //document.getElementById('k').innerHTML = value;
            window.qk = vk;
            $("#k").val(vk);
            update(vk,window.qb);
          }
          function bchange() {
            var vb = document.getElementById("brange").value;
            //document.getElementById('b').innerHTML = value;
            window.qb = vb;
            $("#b").val(vb);
            update(window.qk,vb);
          }
//—————————
//第二个板块
//—————————
  			function Init()
  			{
  				var canvas = document.getElementById("canva");
  				canvas.width = 800;
  				canvas.height = 800;
  				var ctx = canvas.getContext('2d');
  				ctx.beginPath();
  				ctx.arc(173,551,2,0,2*Math.PI);
  				ctx.stroke();
  				ctx.beginPath();
  				ctx.arc(249,496,2,0,2*Math.PI);
  				ctx.stroke();
  				ctx.beginPath();
  				ctx.arc(325,420,2,0,2*Math.PI);
  				ctx.stroke();
  				ctx.beginPath();
  				ctx.arc(400,268,2,0,2*Math.PI);
  				ctx.stroke();
  				ctx.beginPath();
  				ctx.arc(476,116,2,0,2*Math.PI);
  				ctx.stroke();
  				ctx.beginPath();
  				ctx.arc(551,98,2,0,2*Math.PI);
  				ctx.stroke();
  				ctx.beginPath();
  				ctx.arc(627,79,2,0,2*Math.PI);
  				ctx.stroke();
  				var png = new Image();
  				png.src = './movies/zbz.png';
  				png.onload = function(){
  					ctx.drawImage(png,0,0);
  				}
  				var k = 3.57;
  				var b = 300;
  				var bl = -3.5;
  				var bchange=97+(450-b)/10*38;
  				var kchange=173+(((460-b)/k-15)/5)*76;
  				ctx.strokeStyle = 'blue';
  				ctx.beginPath();
  				ctx.moveTo(59,bchange);
  				ctx.lineTo(703,bchange-5*k*38);
  				ctx.stroke();
  				
  				ctx.strokeStyle = 'red';
  				ctx.beginPath();
            		ctx.moveTo(173,551);//1
            		ctx.lineTo(173,bchange-(1.5*k*38+bl*k*7));
            		ctx.stroke();
            		ctx.beginPath();
            		ctx.moveTo(249,496);//2
            		ctx.lineTo(249,bchange-(2*k*38+bl*k*6));
            		ctx.stroke();
            		ctx.beginPath();
            		ctx.moveTo(325,420);//3
            		ctx.lineTo(325,bchange-(2.5*k*38+bl*k*5));
            		ctx.stroke();
            		ctx.beginPath();
            		ctx.moveTo(400,268);//4
            		ctx.lineTo(400,bchange-(3*k*38+bl*k*4));
            		ctx.stroke();
            		ctx.beginPath();
            		ctx.moveTo(476,116);//5
            		ctx.lineTo(476,bchange-(3.5*k*38+bl*k*3));
            		ctx.stroke();
            		ctx.beginPath();
            		ctx.moveTo(551,98);//6
            		ctx.lineTo(551,bchange-(4*k*38+bl*k*2));
            		ctx.stroke();
            		ctx.beginPath();
					ctx.moveTo(627,79);//7
					ctx.lineTo(627,bchange-(4.5*k*38+bl*k*1));
					ctx.stroke();
				}
				function Update(k,b)
				{
					var canvas = document.getElementById("canva");
					canvas.width = 800;
					canvas.height = 800;
					var ctx = canvas.getContext('2d');
					ctx.strokeStyle = 'black';
					ctx.beginPath();
					ctx.arc(173,551,2,0,2*Math.PI);
					ctx.stroke();
					ctx.beginPath();
					ctx.arc(249,496,2,0,2*Math.PI);
					ctx.stroke();
					ctx.beginPath();
					ctx.arc(325,420,2,0,2*Math.PI);
					ctx.stroke();
					ctx.beginPath();
					ctx.arc(400,268,2,0,2*Math.PI);
					ctx.stroke();
					ctx.beginPath();
					ctx.arc(476,116,2,0,2*Math.PI);
					ctx.stroke();
					ctx.beginPath();
					ctx.arc(551,98,2,0,2*Math.PI);
					ctx.stroke();
					ctx.beginPath();
					ctx.arc(627,79,2,0,2*Math.PI);
					ctx.stroke();
					var img = new Image();
					img.src = './movies/zbz.png';
					img.onload = function(){
						ctx.drawImage(img,0,0);
					}
					var bl = -3.5;
					var bchange=97+(450-b)/10*38;
					var kchange=173+(((460-b)/k-15)/5)*76;
					ctx.strokeStyle = 'blue';
					ctx.beginPath();
					ctx.moveTo(59,bchange);
					ctx.lineTo(703,bchange-5*k*38);
					ctx.stroke();
					
					ctx.strokeStyle = 'red';
					ctx.beginPath();
            		ctx.moveTo(173,551);//1
            		ctx.lineTo(173,bchange-(1.5*k*38+bl*k*7));
            		ctx.stroke();
            		ctx.beginPath();
            		ctx.moveTo(249,496);//2
            		ctx.lineTo(249,bchange-(2*k*38+bl*k*6));
            		ctx.stroke();
            		ctx.beginPath();
            		ctx.moveTo(325,420);//3
            		ctx.lineTo(325,bchange-(2.5*k*38+bl*k*5));
            		ctx.stroke();
            		ctx.beginPath();
            		ctx.moveTo(400,268);//4
            		ctx.lineTo(400,bchange-(3*k*38+bl*k*4));
            		ctx.stroke();
            		ctx.beginPath();
            		ctx.moveTo(476,116);//5
            		ctx.lineTo(476,bchange-(3.5*k*38+bl*k*3));
            		ctx.stroke();
            		ctx.beginPath();
            		ctx.moveTo(551,98);//6
            		ctx.lineTo(551,bchange-(4*k*38+bl*k*2));
            		ctx.stroke();
            		ctx.beginPath();
					ctx.moveTo(627,79);//7
					ctx.lineTo(627,bchange-(4.5*k*38+bl*k*1));
					ctx.stroke();
				}
				function ClickButton(){ 
					var k = document.getElementById("kk").value;
					var b = document.getElementById("bb").value;
					k = Number(k);
					b = Number(b);
					window.k = k;
					window.b = b;
					window.o = true;
					Update(k,b);
				}
				function ClickReset(){
					window.o = false;
					Init();
					$("#kk").val("");
					$("#bb").val("");
				}
				if (!window.o) {
					Init();//范例_蓝
					$("#kk").val("3.57");
					$("#bb").val("300");
					window.k = 3.57;
					window.b = 300;
				} else {
					Update(window.k,window.b);
				}
				//滑条变量
				function kkchange() {
					var vk = document.getElementById("kkrange").value;
					vk = Number(vk);
					window.k = vk;
					$("#kk").val(vk);
					Update(vk,window.b);
				}
				function bbchange() {
					var vb = document.getElementById("bbrange").value;
					vb = Number(vb);
					window.b = vb;
					$("#bb").val(vb);
					Update(window.k,vb);
				}
//—————————
//第三个板块
//—————————
          function print_bg() {
            var canvas = document.getElementById("canv");
            var ctx = canvas.getContext('2d');
            var ectx = new Image();
            ectx.src = './movies/ectx.png';
            ectx.onload = function(){
              ctx.drawImage(ectx,0,0);
            }
          }
          function Reset() {
            var canvas = document.getElementById("canv");
            var ctx = canvas.getContext('2d');
            var ectx = new Image();
            var kb = new Image();
            ectx.src = './movies/ectx.png';
            kb.src = './movies/kb.png'
            kb.onload = function(){
              ctx.drawImage(kb,0,0);
              ctx.drawImage(ectx,0,0);
            }
            window.oo = true;
            window.a = 0.01;
            window.x = -3;
            $("#kp").val("偏导数为 : \n横坐标为 : ")
          }
          function achange() {
            var va = document.getElementById("arange").value;
            window.a = va;
            $("#a").val(va);
          }
          function xchange() {
            var vx = document.getElementById("xrange").value;
            window.x = vx;
            $("#x").val(vx);
          }
          function cul_p() {
            return Number(20 * window.x - 5.687);
          }
          function f(x) {
            return Number(10 * x * x - 5.687 * x + 0.91)
          }
          function draw(xx) {
            if(xx < -3 || xx > 3.5) { return; }
            var x = (xx + 7) * 74.5 + 11;
            var y = (100 - f(xx)) * 5.5 + 27.5;
            var canvas = document.getElementById("canv");
            var ctx = canvas.getContext('2d');
            ctx.strokeStyle = 'blue';
            ctx.beginPath();
            ctx.arc(x,y,2,0,2*Math.PI);
            ctx.stroke();
          }
          function cul() {
            if(window.oo){
              var aa = document.getElementById("a").value;
              var xx = document.getElementById("x").value;
              if(aa) {
                window.a = aa;
              }
              if(xx) {
                window.x = xx;
              }
              window.oo = false;
            }
          draw(window.x);//画图像
          if(Math.abs( 20 * window.x - 5.687 ) >= 0.05) {
            var xx = window.x - a * cul_p();
            $("#kp").val("偏导数为 : " + Number(20 * window.x - 5.687) + "\n横坐标为 : " + window.x);
            window.x = xx;
          }
        }