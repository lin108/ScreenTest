var playButton;

let overAlltexture;
let texture1;
let texture2;


let startCanvas;

//shader
let theShader;
let Img;
let WebglCanvas;
let WebglCanvas2;

//glitchjs
let scriptGlitch;


//text
let scriptCanvas;
var dialogp = []; //popup
var dialogs = []; //move
let moveScript;
let moveNum;
let popScript;
let popNum;

  






// cloud image
let cloud1;
let cloud1img;




var vx =0;
let info=[];



//glitch
const maxXChange = 125;
const maxYChange = 5;
const yNoiseChange = 0.01;
const mouseYNoiseChange = 0.3;
const timeNoiseChange = 0.013;

let inverted = false;

const micSampleRate = 44100;

const freqDefinition = 8192;


const minFreqHz = 200;//C3
const maxFreqHz = 3103;//C7
const minFreq = Math.floor(minFreqHz/2/1.445);//2/1.445 is a magic number to convert Hz to MIC frequency, dont know why...
const maxFreq = Math.floor(maxFreqHz/2/1.445);//2/1.445 is a magic number to convert Hz to MIC frequency, dont know why...
//Andy update, the default number of frequency bins is 1024 , so maybe something with that?
const magconvertNumber = 2/1.445;


let mic, fft, spectrum;
let historygram;

let enFont;
let chFont;





function preload(){
	

	overAlltexture = loadImage('Asset/bgAssets/texture.png');
	texture1=loadImage("Asset/bgAssets/texture1.png")
	texture2=loadImage("Asset/bgAssets/texture2.png")
	enFont=loadFont('Asset/Font/Menlo-Regular.ttf');
	chFont=loadFont("Asset/Font/I.BMing-3.500.ttf");

	moveScript = loadTable("Asset/CSV/script1.csv","csv", "header");
	popScript = loadTable("Asset/CSV/popScript.csv","csv", "header");

	

	cloud1img = loadImage("cloud1.png");
	
	
	theShader0 = loadShader('shaders/shader1.vert', 'shaders/shader1.frag');
	//Shader
	theShader = new p5.Shader(this.renderer,vert,frag);
	Img = loadImage('Asset/bgAssets/light.jpg');


	


	//cloud image
	cloud1 = new Cloud(2*windowWidth,windowHeight/5,cloud1img);

}


function setup() {







	//glitchjs
	//scriptGlitch = new Glitch();

	startCanvas = createGraphics(windowWidth,windowHeight);
	scriptCanvas = createGraphics(windowWidth,windowHeight);
	pixelDensity(1);
	noStroke();


	//button
	playButton = createButton("play");
	playButton.mousePressed(togglePlaying);
	playButton.position(50,20);


	createCanvas(windowWidth, windowHeight);
	//shader
    WebglCanvas = createGraphics(windowWidth,windowHeight,WEBGL);
	pixelDensity(1);
	noStroke();

	WebglCanvas2 = createGraphics(windowWidth,windowHeight,WEBGL);
	pixelDensity(1);
	noStroke();
    
	mic= loadSound("Asset/Sound/noise1min.mp3");
	historygram = createGraphics(windowWidth*5,height);
	fft = new p5.FFT(0.0, 8192);

/*
	//dialog???????????? ?????????x?????????y??????????????????, color, size ??????????????????????????????false???
dialogs[0] = new Dialog(windowWidth,windowHeight/2,"????????????",chFont,"#fff", 18,  5,5000,false);
dialogs[1] = new Dialog(windowWidth,windowHeight/3,"WEATHER/SNOOZE",enFont, "#fff", 16, 15,7000,false);
dialogs[0] = new Dialog(windowWidth,windowHeight/2,"????????????",chFont, "#fff", 18, 5,9000,false);

dialogs[2] = new Dialog(windowWidth,2*windowHeight/3,"WEATHER/SNOOZE ",enFont,"#fff", 16,  15,15000,false);
dialogs[3] = new Dialog(windowWidth,windowHeight/3-100,"??????[????????????]",chFont,"#fff", 25, 15,30000,false);
dialogs[4] = new Dialog(windowWidth,windowHeight/3,"?????????",chFont,"#fff", 25, 10,45000,false);



//dialog popup?????? ???x???y?????????????????????color???size?????????????????????????????????false???
dialogp[0] = new DialogP(9*windowWidth/10,windowHeight/2+50,"33591",enFont,"#fff", 16, 4500,5000,false);
dialogp[1] = new DialogP(9*windowWidth/10,windowHeight/2-50,"NORAD ID",enFont,"#fff",16,4600,5000,false);
dialogp[2] = new DialogP(4*windowWidth/5,3*windowHeight/4,"Int'I Code 2009-005A",enFont,"#fff",16,10000,12000,false);
dialogp[3] = new DialogP(windowWidth/5,windowHeight/5,"137.100/1698.000  ",enFont,"#fff",16,15000,17000,false);

dialogp[4] = new DialogP(4*windowWidth/5,3*windowHeight/4,"LAT: 6 ",enFont,"#fff",16,20000,23000,false);
dialogp[5] = new DialogP(4*windowWidth/5,3*windowHeight/4-30,"SPD: 7.2 ",enFont,"#fff",16,20000,23000,false);

dialogp[5] = new DialogP(windowWidth/2,windowHeight/4," AZIMUTH",enFont,"#fff",16,30000,32000,false);
dialogp[6] = new DialogP(windowWidth/5,windowHeight/4+100," (?????????????????????????????????)",chFont,"#fff",16,40000,50000,false);
dialogp[7] = new DialogP(windowWidth/2,windowHeight/2-400," ????????????",chFont,"#fff",20,46000,55000,false);
*/




	moveNum = moveScript.getRowCount();
		
	print(moveNum);

	let x = moveScript.getColumn("X");
	let y = moveScript.getColumn("Y");
	let text = moveScript.getColumn("Text");
	let font = moveScript.getColumn("Font");
	let color = moveScript.getColumn("Color");
	let size = moveScript.getColumn("Size");
	let speed = moveScript.getColumn("Speed");
	let time = moveScript.getColumn("Borntime");
	//let isDisplayed = moveScript.getColumn("Default");

	for(let i = 0; i< moveNum ; i++){
		dialogs[i]= new Dialog(x[i], y[i], text[i], font[i],color[i],size[i],5,time[i],false);

	}
	//print(dialogs[0]);
	//print(dialogs[1]);



	popNum = popScript.getRowCount();

	let px = popScript.getColumn("X");
	//print("x"+px);
	let py = popScript.getColumn("Y");
	let ptext = popScript.getColumn("Text");
	let pfont = popScript.getColumn("Font");
	let pcolor = popScript.getColumn("Color");
	let psize = popScript.getColumn("Size");
	let pborntime = popScript.getColumn("Borntime");
	let pdeadtime = popScript.getColumn("Deadtime");



	for(let z = 0; z< popNum ; z++){
	
		dialogp[z]= new DialogP(px[z], py[z], ptext[z], pfont,pcolor[z],psize[z],pborntime[z],pdeadtime[z],false);
		//print(pfont);
		//print(psize)
	}

	//print(dialogp[0]);
	

	
}



function draw() {

	

	

	theShader.setUniform('u_resolution',[width/1000,height/1000])
	theShader.setUniform('u_time',millis()/1000)
	theShader.setUniform('tex0',WebglCanvas)
	theShader.setUniform('tex1',Img)
	WebglCanvas2.shader(theShader)
	// webGLGraphics2.rect(00,width,height)
	WebglCanvas2.rect(-width/2,-height/2,width,height)



	
	
	//shader 
	WebglCanvas.shader(theShader0);
	theShader0.setUniform("iResolution", [width, height]);
	theShader0.setUniform("iFrame", frameCount);
	theShader0.setUniform('tex',Img)
		// rect gives us some geometry on the screen
	//	WebglCanvas.rect(0,0,width, height);
	//	image(WebglCanvas,0,0);	
  


		if(frameCount%100 > 10 && frameCount%100 <15)
	{
		glitch();
		
	}
	

  
	startCanvas.textSize(16);
	startCanvas.textFont(enFont);
	startCanvas.text("press any key to start",20,50);
	startCanvas.fill(100);
	//image(startCanvas,0,0);
	//clear(0,0,width*2,height)

	//push ();
	
//	pop ();


		vx=vx+5;
			
		spectrum = fft.analyze();


		for (let i = maxFreqHz; i >= minFreqHz; i--) {
			
			//var high = fft.getEnergy(2400);

			//let index = i - minFreq;
			let index = maxFreq - i;
			let intensity = (spectrum[i] - spectrum[500])*3;
			let intensityX= map(intensity,0,100,0.5,5);
			

			if(frameCount % 10 < 3)
			{

		

				if(intensity>150){
					
				let transp = map(intensity,150,255,0,100);
				let widthhis = map(intensity,240,255,1,3);
				historygram.stroke(intensity/3,intensity/3,intensity/3,transp);
				//historygram.stroke(intensity,intensity,ntensity,transp);

				//red
				historygram.stroke(218,18,32,50,80);

	

				let y = index / (maxFreq - minFreq - 1) * height;

				historygram.line(vx-2+intensityX,y, vx+intensityX,y);
				//historygram.line(vx,y+3, vx+1,y); //1 
				
					if(intensity>240){

						historygram.stroke(intensity,intensity,intensity,transp/3);

						let y = index / (maxFreq - minFreq - 1) * height;

						//historygram.line(vx-widthhis+intensityX,y, vx+intensityX,y);
						historygram.noStroke();


						//let color = map(intensity/3,-200,100,-100,100);

						
						let colorR = 176 + random(-50,100);
						let colorG = 73 + random(10,50);
						let colorB = 20 + random(-30,30);
						
					

					

						historygram.fill(colorR,colorG,colorB,5);
						historygram.rect(vx,y,widthhis,2);

						historygram.fill(colorR,colorG,colorB,2);
						historygram.ellipse(vx,y,widthhis+6);

						historygram.fill(colorR,colorG,colorB,3);
						historygram.ellipse(vx,y,widthhis+3);

						historygram.fill(colorR,colorG,colorB,4);
						historygram.ellipse(vx,y,widthhis);
						
						

				
					}
				}

			}

			else if (frameCount %10 >=3 && frameCount %10 <5)
			{

				if(intensity>150){
					
					let transp = map(intensity,150,255,0,100);
					let widthhis = map(intensity,240,255,1,3);
					historygram.stroke(intensity/3,intensity/3,intensity/3,transp);
					//historygram.stroke(intensity,intensity,ntensity,transp);
	
					//red
					historygram.stroke(67,43,86,80);
	
		
	
					let y = index / (maxFreq - minFreq - 1) * height;
	
					historygram.line(vx-2+intensityX,y, vx+intensityX,y);
					//historygram.line(vx,y+3, vx+1,y); //1 
					
						if(intensity>240){
	
							historygram.stroke(intensity,intensity,intensity,transp/3);
	
							let y = index / (maxFreq - minFreq - 1) * height;
	
							//historygram.line(vx-widthhis+intensityX,y, vx+intensityX,y);
							historygram.noStroke();
	
	
							//let color = map(intensity/3,-200,100,-100,100);
	
							
							let colorR = 176 + random(-50,100);
							let colorG = 73 + random(10,50);
							let colorB = 20 + random(-30,30);
							
						
	
						
	
							historygram.fill(colorR,colorG,colorB,5);
							historygram.rect(vx,y,widthhis,2);
	
							historygram.fill(colorR,colorG,colorB,2);
							historygram.ellipse(vx,y,widthhis+6);
	
							historygram.fill(colorR,colorG,colorB,3);
							historygram.ellipse(vx,y,widthhis+3);
	
							historygram.fill(colorR,colorG,colorB,4);
							historygram.ellipse(vx,y,widthhis);
							
							
	
					
						}
					}

			}

			else if (frameCount % 10 >= 5)
			{
				if(intensity>150){
					
					let transp = map(intensity,150,255,0,100);
					historygram.stroke(intensity/3,intensity/3,intensity/3,transp);
					let widthhis = map(intensity,240,255,1,3);
					//historygram.stroke(intensity,intensity,ntensity,transp);
	
					//red
					historygram.stroke(21,49,190,50);
					
	
					let y = index / (maxFreq - minFreq - 1) * height;
	
					historygram.line(vx-2+intensityX,y, vx+intensityX,y);
					//historygram.line(vx,y+3, vx+1,y); //1 
					
						if(intensity>240){
							let widthhis = map(intensity,240,255,1,3);
	
							historygram.stroke(intensity,intensity,intensity,transp/3);
	
							let y = index / (maxFreq - minFreq - 1) * height;
	
							//historygram.line(vx-widthhis+intensityX,y, vx+intensityX,y);
							historygram.noStroke();
	
	
							//let color = map(intensity/3,-200,100,-100,100);
							
							let colorR = 166 + random(-50,100);
							let colorG = 106 + random(10,50);
							let colorB = 67 + random(-30,30);
							
					
	
						
	
							historygram.fill(colorR,colorG,colorB,5);
							historygram.rect(vx,y,widthhis,2);
	
							historygram.fill(colorR,colorG,colorB,2);
							historygram.ellipse(vx,y,widthhis+6);
	
							historygram.fill(colorR,colorG,colorB,3);
							historygram.ellipse(vx,y,widthhis+3);
	
							historygram.fill(colorR,colorG,colorB,4);
							historygram.ellipse(vx,y,widthhis-1);
							
	
					
						}
				}

			}


		}


	


	image(WebglCanvas2,0,0,width,height);

	push()
	//blendMode(HARD_LIGHT)
	blendMode(DIFFERENCE)

	//image(texture1,0,0,width,height)
	
	blendMode(DARKEST)
	image(texture2,0,0,width+random(-100,100),height)

	pop()

	
	image(historygram, windowWidth-vx,0);
	image(historygram, windowWidth-vx,height/2);
	

	
	



		

	
		// info text
		textSize(16);
		textFont(enFont);
		fill(255);
		text("2020-12-30--10-12-11--593_pX.fots",1/25*width,15/20*height);
		textSize(18);
		text("age:2s",1/25*width,16/20*height);
		text("ctr_s:5[nc]",1/25*width,50/60*height);
		text("ctr_f: 1759",1/25*width,52/60*height);
		text("lat:-77.04??",1/25*width,54/60*height);
		text("lst:13.89 hrs",1/25*width,56/60*height);
		fill(255);
		
		textSize(18);
		text("age:2s",5/25*width,16/20*height);
		text("ctr_s:5[nc]",5/25*width,50/60*height);
		text("ctr_f: 1759",5/25*width,52/60*height);
		text("lat:-77.04??",5/25*width,54/60*height);
		text("lst:13.89 hrs",5/25*width,56/60*height);
		fill(255);

		//glitch();
	
	
		image(overAlltexture,0,0,width,height);
	
		script();
		image(scriptCanvas,0,0);

		if(frameCount%15 == 0){
			return;
		}
		else{
			scriptCanvas.clear(0,0,width,height);
		}
		

	


	if(frameCount%100>80 && frameCount%100<95){
		glitch1();
	}


	



}





/*
  function keyPressed() {

	if (keyCode === LEFT_ARROW) {
		if (mic.isPlaying()) {
			// .isPlaying() returns a boolean
			mic.stop();
		  } else {
			mic.play();
			mic.amp(1);
		   // mic.loop();
		  }
	}

  }

  */



  function togglePlaying(){
	  if(!mic.isPlaying()){
		  mic.play();
		  mic.amp(1);
		  playButton.html("pause");
		}
		else{
			mic.pause();
			playButton.html("play");

		}

  }




function script(){
	if(mic.isPlaying()){


	
		for(i=0;i<dialogs.length;i++) {
			
			dialogs[i].show();
			dialogs[i].move();
		}

		for(z=0;z<dialogp.length;z++) {
		
			dialogp[z].show();
		

		}

	}
		
  }

 
  




  function glitch(){

	let y = floor(random(height));
	let h = floor(random(20, 30)); 
	let xChange = floor(random(-maxXChange/5, maxXChange/5));
	let yChange = floor(xChange/5);
	image(WebglCanvas, xChange - maxXChange, yChange - maxYChange + y, width, h, 0, y, width, h);


  }


  function glitch1(){
	var x1 = floor(random(windowWidth/2,windowWidth/2 +40));
	var y1 = floor(random(10,200));
  
	var x2 = round(x1 + random(-100, 100));
	var y2 = round(y1 + random(-50, 50));
  
	var w = floor(random(10, 300));
	var h = floor(random(10, 500));

	var col = get(x1, y1, w, h)
   
	set(x2, y2, col);
  }

  function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
  }
   






  