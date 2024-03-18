

// Global Physics Variables
var cond = 0.024;  // air conductivity
var Tmax = 60;	   // radiator temperature
var Tmin = 10;	   // window temperature

// Input Variables
var Conductivity = 0;
var Reso = 0;
var TempMax = 0; 
var TempMin = 0;
var Domain = 4;

var CFLInp = 0;
var cfl = 0.5;

// Render view variable
var resolution = 1.0;

var canvas = 0;
var c = 0;	

function getValue(){
	// Input values
	// Visu
	Reso        = document.getElementById("Reso").value;
	// Physics 
 	TempMin = document.getElementById("TempMin").value;

	TempMax = document.getElementById("TempMax").value;
	Conductivity = document.getElementById("Conductivity").value;

	// Domain 
	Domain  = document.getElementById("Domaine").value;
	
	//Numeric
	CFLInput = document.getElementById("CFL").value;
}// END GETVALUES


function domainDef(){
	
	canvas = document.getElementById("canvasHeat");
	canvas.width = 480;                       // width in pixel
	canvas.height = 480;			   // height in pixel
	c = canvas.getContext("2d");
	
	let isDrawing = false;
	let x = 50;
	let y = 50;
	const rect = canvas.getBoundingClientRect();

	c.beginPath();
	c.moveTo(canvas.width*0.25, 0);
	c.lineTo(canvas.width*0.75, 0);
	c.closePath();	
	c.stroke();
		
	canvas.addEventListener('mousedown', e => {
 		 x = e.clientX - rect.left;
 		 y = e.clientY - rect.top;
  		isDrawing = true;
	});

	window.addEventListener('mouseup', e => {
 		 if (isDrawing === true) {
 		   x = e.clientX - rect.left;
   		   y = e.clientY - rect.top;
    		   c.rect(x,y,20,8);
    		   c.stroke();
    		 //isDrawing = false;
  		}
	});

 	// Main radiator
	c.rect(canvas.width*0.25,canvas.height*0.25,canvas.width*0.05,canvas.width*0.2);
	c.stroke();
	
}
		
function drawHeatFlux(){

	        cond = parseFloat(Conductivity); // 0.24 air conductivity 
		Tmax = parseFloat(TempMax);      // 60 Radiator Temperature
		Tmin = parseFloat(TempMin);      // 10 window Temperature
		resolution = parseFloat(Reso);   //0.33333 In percent 0.3, 0.5 , 1, 2
		
		var xmin = 0;
		var xmax = parseFloat(Domain);
		var ymin = 0;
		var ymax = parseFloat(Domain);
		
		// pixel size
       	let pixx  = 480/(120*resolution);
       	let pixy  = 480/(120*resolution);
		//Canvas drawing resolution
		let width = 120*resolution;
       	let height = 120*resolution;
		
// --------------- Linear System -----------------------------------
//------------------------------------------------------------------
let Tn = []; // Solution of linear system
//let H  = []; // Mass Matrix H*T + B = 0
let hx = (xmax - xmin)/width;
let hy = (ymax - ymin)/height;

hx = hx*hx;
hy = hy*hy; 

// Fill the Mass matrix
/*var HW = height*width;
for (var i=0; i<HW; i++) {               // Warning note that i line ----> height*width
	H[i] = [];  
	for ( var j=0; j<HW; j++) { 
		H[i][j] = 1; 
		}           // Init
}*/
// BUG : IMPOSSIBLE TO CREATE A LARGE MATRIX 480*480

// Time advanving Euler explicite
function Time_advancing(Tn,Tn1,deltaT) {
	for (var i=1; i<height-1; i++) {       
		for ( var j=1; j<width-1; j++) {
		Tn1[i][j] = Tn[i][j] + deltaT*cond*Discrete_Laplace(Tn,i,j);
		}
	}
}

function Discrete_Laplace(Tn,i,j) {
	var Laplace = 0;
	Laplace = (Tn[i+1][j] - 2*Tn[i][j] + Tn[i-1][j])/hy + (Tn[i][j+1] - 2*Tn[i][j] + Tn[i][j-1])/hx; 
	return Laplace;
}

function initial_condition(Tn) {
	for (var i=0; i<height; i++) {  
		Tn[i] = [] ;     
		for ( var j=0; j<width; j++) { 
		if (c.isPointInStroke(i*pixx, j*pixy)) {   // warning here isPointInStroke(x, y) x: width
			if (j==0) { 
			Tn[i][j] = Tmin;  // window Temperature
			} else {
			Tn[i][j]  = Tmax ;  // radiator Temperature
			}
		} else {
		Tn[i][j] = 20; // air Temperature
		}
		}// end for
	}
}

function boundary_condition(Tn) {
	for (var i=0; i<height; i++) {  
		//Tn[i] = [] ;     
		for ( var j=0; j<width; j++) { 
		if (c.isPointInStroke(i*pixx, j*pixy)) {   // warning here isPointInStroke(x, y) x: width
			if (j==0) { 
			Tn[i][j] = Tmin;  // window Temperature
			} else {
			Tn[i][j]  = Tmax ;  // radiator Temperature
			}
		}
		}// end for
	}
}

//-----------------------------------------------------------------		
		
var sum=0;
var Tn1 = [];

cfl = parseFloat(CFLInput);
var deltaT = cfl*hx;

var summax = -10000000;
var summin = 10000000;


initial_condition(Tn);
initial_condition(Tn1);


if ( parseFloat(TempMax)!=0) {
	
setInterval( function() {

	Time_advancing(Tn,Tn1,deltaT);
	
	boundary_condition(Tn1);

	for (var ii=0;ii<width;ii++) {
 		for (var jj=0;jj<height;jj++) {
 		
 		var x = (ii/width)*(xmax-xmin)+xmin;
		var y = (jj/height)*(ymax-ymin)+ymin;

  		//sum = fun1(x,y);
  		sum = Tn1[ii][jj];
  		
  		if (summax < sum) { summax = sum; }
  		if (summin > sum) { summin = sum; }
  	
  		sum=Math.abs(sum*255/(Tmax+1));
  		Tn[ii][jj] = Tn1[ii][jj];
  	
  		c.fillStyle = "rgba("+sum*2+","+sum+",245,0.5)";
  		c.fillRect(ii*pixx,jj*pixy,pixx,pixy);

  		 
  	}
 }

 if ( summax > Tmax ) { alert("Temperature max ="+summax+" , Temperature min ="+summin); }
 }, 10);
 
}// If temperature!=0

} 

//----------------------------------------------------------------------------------
//----------------------- END HEATFLUX ---------------------------------------------




