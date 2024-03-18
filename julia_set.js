window.onload = function(){

		var width = 480;
		var height = 480;

		var fractal_set_x = 0;
		var fractal_set_y = 0;

		//Julia window
		var canvasL = document.getElementById("canvasLeft");
		canvasL.width = width;
		canvasL.height = height;
		var c = canvasL.getContext("2d");
		
		// Setting window
		var canvasR = document.getElementById("canvasRight");
		canvasR.width = width;
		canvasR.height = height;
		var cR=canvasR.getContext("2d");
		cR.fillStyle="white";
		
		
		var xmin = -2;
		var xmax = 2;
		var ymin = -2;
		var ymax = 2;
		var mouseclicked = false;


		generate(0,0,100,1);
		draw();

		window.onmouseup = function(e){
			mouseclicked = false;
		}

		var mouseup = function(e){
			e.preventDefault();
			mouseclicked = false;
			if(e.touches == undefined || e.touches[1] == undefined){
				if(e.clientX == undefined && e.touches[0] != undefined){
					e = e.touches[0];
				}
				var i = e.clientX - canvasR.getBoundingClientRect().left;
				var j = e.clientY - canvasR.getBoundingClientRect().top;
				var x = (i/width)*(xmax-xmin)+xmin;
				var y = (j/height)*(ymax-ymin)+ymin;
				generate(x,y,100,1);
				
				cR.beginPath();
				cR.lineTo(i,j);
				cR.lineTo(240,j);
				cR.closePath();
				cR.stroke();
		
				cR.beginPath();
				cR.lineTo(i,j);
				cR.lineTo(i,240);
				cR.closePath();
				cR.stroke();
			}
		}

		var mousemove = function(e){
			e.preventDefault();
			if(e.touches == undefined || e.touches[1] == undefined){
				if(e.clientX == undefined && e.touches[0] != undefined){
					e = e.touches[0];
				}
				if(mouseclicked){
					var i = e.clientX - canvasR.getBoundingClientRect().left;
					var j = e.clientY - canvasR.getBoundingClientRect().top;
					var x = (i/width)*(xmax-xmin)+xmin;
					var y = (j/height)*(ymax-ymin)+ymin;
					
					generate(x,y,30,4);
					
					
				cR.beginPath();
				cR.lineTo(i,j);
				cR.lineTo(240,j);
				cR.closePath();
				cR.stroke();

				cR.beginPath();
				cR.lineTo(i,j);
				cR.lineTo(i,240);
				cR.closePath();
				cR.stroke();
				}
			}
		}

		var mousedown = function(e){
			e.preventDefault();
			if(e.touches == undefined || e.touches[1] == undefined){
				if(e.clientX == undefined && e.touches[0] != undefined){
					e = e.touches[0];
				}
				mouseclicked = true;
				var i = e.clientX - canvasR.getBoundingClientRect().left;
				var j = e.clientY - canvasR.getBoundingClientRect().top;
				var x = (i/width)*(xmax-xmin)+xmin;
				var y = (j/height)*(ymax-ymin)+ymin;
				
				generate(x,y,30,4);

				
				cR.beginPath();
				cR.lineTo(i,j);
				cR.lineTo(240,j);
				cR.closePath();
				cR.stroke();
				
				cR.beginPath();
				cR.lineTo(i,j);
				cR.lineTo(i,240);
				cR.closePath();
				cR.stroke();
			}
		} 
	
		function draw(){
			
			cR.beginPath();
    			cR.lineTo(240, 0);/*ligne ordonnes*/
    			cR.lineTo(240, 480);
			cR.closePath();
			cR.stroke();

			cR.beginPath();
			cR.lineTo(0,240);/*ligne des abscisses*/
			cR.lineTo(480,240);
    			cR.closePath();
    			cR.stroke();
		}

			

		canvasR.addEventListener("mousedown", mousedown);
		canvasR.addEventListener("mouseup", mouseup);
		canvasR.addEventListener("mousemove", mousemove);
		canvasR.addEventListener("touchstart", mousedown);
		canvasR.addEventListener("touchend", mouseup);
		canvasR.addEventListener("touchmove", mousemove);

		function generate(real, imag, iterations, di){

			fractal_set_x = Math.round(real*1000)/1000;
			fractal_set_y = Math.round(imag*1000)/1000;

			document.getElementById("julia_set_style").innerHTML = "z = "+fractal_set_x+" + "+fractal_set_y + " . i";

			c.fillStyle = "#000";
			c.fillRect(0,0,width,height);

			for(var i = 0; i < width; i+=di){
				for(var j = 0; j < height; j+=di){
					var x = (i/width)*(xmax-xmin)+xmin;
					var y = (j/height)*(ymax-ymin)+ymin;
					var r2 = x*x + y*y;
					var n;
					// z = z^3 + c
					for(n = 0; n < iterations && r2 < 100; n++){
						var xx = x*x*x - 2*y*y*x - y*y*x + real;
						y = 2*x*x*y - y*y*y + imag;
						x = xx;
						r2 = x*x + y*y;
					}
					var a = Math.pow(n/(n+1), 5);
					if(r2 < 100){
						a = 1;
					}
					c.fillStyle = "rgba(255,255,255,"+a+")"; // rgba(red,green,blue, darkness)
					c.fillRect(width - i,j,di,di);
				}
			}

		}
		


};
