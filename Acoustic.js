
function direBonjour() {
      alert("Bonjour cher lecteur !!! ")
}

function fun1(x,y) {return (x+y)**2;  }
function fun2(x) {return Math.cos(3*x);}



function drawAcousticRay(){	
	//Canvas drawing
	let width = 480;
        let height = 480;

    	// getValue
    	var freq = document.getElementById("freq").value;
    	var vitesse = document.getElementById("vitesse").value;
	var diam_lens = document.getElementById("diam_lens").value;
	var angle_in = document.getElementById("angle_in").value;
	
	let canvas = document.getElementById("canvas");
	canvas.width = width;
	canvas.height = height;
	let c = canvas.getContext("2d");

	c.beginPath();
	c.lineTo(0,240);/*ligne des abscisses*/
	c.lineTo(480,240);
    	c.closePath();
    	c.stroke();	
	
	function dist(x,y,x1,y1) { return Math.sqrt((x-x1)**2+(y-y1)**2) ;}
	
	var omega = parseFloat(freq)*10**6; //
	
 	var c0 = parseFloat(vitesse); // ;
	var konde=omega/c0;
	var a = parseFloat(diam_lens); //;
	var angle = parseFloat(angle_in)
	var xmin = -a;
 	var xmax = a;
 	var ymin = -a;
 	var ymax = a;

//------------- Begin function Ray------------------------------------------------------	
	function Ray(x1,y1,c,alpha1,alpha2){
		
    		//diffeomorphisme
    		function phi(y,c,alpha1,alpha2){return Math.sqrt(a**2-y**2);}

    		//derivée de phi
    		function dphi(y,c,alpha1,alpha2){
			epsilon = 0.0001;
        		return (phi(y+epsilon,c,alpha1,alpha2)-phi(y,c,alpha1,alpha2))/epsilon; 
        		}
    
    		var som=0 ;
    		var somI=0;
    		var Nmax = 100;
    		var yymax = a*Math.cos(angle), yymin = -a*Math.cos(angle); 
    		
    		//Surface vibrante    
    
    		//Rayonnement
    		for (var n=0;n<Nmax;n++) {
        		var y = (n/Nmax)*(yymax-yymin)+yymin;
        		var h = (yymax-yymin)/Nmax;
        		//concave
        		somI = somI + h*dphi(y,c,alpha1,alpha2)*Math.sin(omega/c0*dist(phi(y,c,alpha1,alpha2),y,x1,y1))/(dist(phi(y,c,alpha1,alpha2),y,x1,y1));
        		som = som + h*dphi(y,c,alpha1,alpha2)*Math.cos(omega/c0*dist(phi(y,c,alpha1,alpha2),y,x1,y1))/(dist(phi(y,c,alpha1,alpha2),y,x1,y1));
        		}
    		return Math.sqrt(som**2+somI**2) ;
    		}
 
// --------------- END function Ray ----------------------

 
var sum=0;
for (var i=0;i<width;i++) {
 	for (var j=0;j<height;j++) {
 	var x = (i/width)*(xmax-xmin)+xmin;
	var y = (j/height)*(ymax-ymin)+ymin;

  	sum = Ray(x,y,0,0,0);
  	
  	sum=Math.abs(sum*255);
  	
  	c.fillStyle = "rgba("+sum*2+","+sum+",245,0.5)";
  	c.fillRect(width - i,j,1,1);
  	}
 }

}

function funGraph (ctx,axes,func,color,thick) {
 var xx, yy, dx=4, x0=axes.x0, y0=axes.y0, scale=axes.scale;
 var iMax = Math.round((ctx.canvas.width-x0)/dx);
 var iMin = axes.doNegativeX ? Math.round(-x0/dx) : 0;
 ctx.beginPath();
 ctx.lineWidth = thick;
 ctx.strokeStyle = color;

 for (var i=iMin;i<=iMax;i++) {
  xx = dx*i; yy = scale*func(xx/scale);
  if (i==iMin) ctx.moveTo(x0+xx,y0-yy);
  else         ctx.lineTo(x0+xx,y0-yy);
 }
 ctx.stroke();
}

function funGraph2d(width,height,func,ctx){
 var xmin = -2;
 var xmax = 2;
 var ymin = -2;
 var ymax = 2;
 var dx=4,dy=1;
 var sum=0;
 
 ctx.fillStyle = "#000";
 ctx.fillRect(0,0,width,height);
 
 for (var i=0;i<width;i++) {
 	for (var j=0;j<height;j++) {
 	var x = (i/width)*(xmax-xmin)+xmin;
	var y = (j/height)*(ymax-ymin)+ymin;

  	sum = func(x,y);
  	
  	sum=Math.abs(sum*255);
  	
  	ctx.fillStyle = "rgba("+sum+","+sum+",255,0.5)";
  	ctx.fillRect(width - i,j,1,1);
  	}
 }
}

function showAxes(ctx,axes) {
 var x0=axes.x0, w=ctx.canvas.width;
 var y0=axes.y0, h=ctx.canvas.height;
 var xmin = axes.doNegativeX ? 0 : x0;
 ctx.beginPath();
 ctx.strokeStyle = "rgb(128,128,128)"; 
 ctx.moveTo(xmin,y0); ctx.lineTo(w,y0);  // X axis
 ctx.moveTo(x0,0);    ctx.lineTo(x0,h);  // Y axis
 ctx.stroke();
}
