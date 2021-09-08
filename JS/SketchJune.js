var playButton;
var timerButton;

var languageBtn;

var scanImage;
var scanCanvas;
let scanLine = 0;



//timer
var counter =0;
var seconds,minutes;



let overAlltexture;
let texture1;
let texture2;


let startCanvas;

//shader
let theShader;
let Img;
let WebglCanvas;
let WebglCanvas2;




//text
let scriptCanvas;
var dialogp = []; //popup
var dialogs = []; //move
let moveScript;
let moveNum;
let popScript;
let moveEn;
let popEn;
let moveCh;
let popCh;
let typeCh;
let popNum;
var dialogT = [];
let typeScript;
let typeNum;

  






// cloud image
let cloud=[];
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


const minFreqHz = 2300;//C3
const maxFreqHz = 2500;//C7


let mic, fft, spectrum;
let historygram;
let sounds = [];

let enFont;
let chFont;





function preload(){

	mic= loadSound("Asset/Sound/noise1min.mp3");
	fft = new p5.FFT(0.0, 1024);
	mic.connect(fft);
	mic.onended(soundloop);

	scanImage = loadImage("Asset/Image/testcloud.jpeg");

	overAlltexture = loadImage('Asset/bgAssets/texture.png');
	texture1=loadImage("Asset/bgAssets/texture1.png")
	texture2=loadImage("Asset/bgAssets/texture2.png")
	enFont=loadFont('Asset/Font/enFont0.7.ttf');
	chFont=loadFont("Asset/Font/chFont0.8.ttf");

	moveEn = loadTable("Asset/CSV/moveScript.csv","csv", "header");
	popEn = loadTable("Asset/CSV/popScript.csv","csv", "header");
	typeScript = loadTable("Asset/CSV/typeScript.csv","csv", "header");
	//chinese version
	moveCh = loadTable("Asset/CSV/moveScript-c.csv","csv", "header");
	popCh= loadTable("Asset/CSV/popScript-c.csv","csv", "header");


	
	theShader0 = loadShader('shaders/shader1.vert', 'shaders/shader1.frag');
	//Shader
	theShader = new p5.Shader(this.renderer,vert,frag);
	Img = loadImage('Asset/bgAssets/light.jpg');


	
	// preload cloud images, cloud1img, cloud2img, cloud3img, etc.... please add more....
	cloud1img = loadImage("Asset/Image/cloud1.png");

	//cloud images : x, y, image, scale, borntime
	cloud[0] = new Cloud(windowWidth,windowHeight/5,cloud1img,0.5,15000,false);
	cloud[1] = new Cloud(windowWidth,windowHeight/5,cloud1img,1,20000,false);
	cloud[2] = new Cloud(windowWidth,windowHeight/5,cloud1img,2,35000,false);
	cloud[3] = new Cloud(windowWidth,windowHeight/5,cloud1img,3,35000,false);






}


function setup() {




	frameRate(10);

	//timer
	// timer =createP('timer');
	// setInterval(timeIt,1000);
	// timer.position(7/10*windowWidth,30);
	//timer.style('color','#ffffff');



	background(0);



	//glitchjs
	//scriptGlitch = new Glitch();

	startCanvas = createGraphics(windowWidth,windowHeight);
	scriptCanvas = createGraphics(windowWidth,windowHeight);
	scanCanvas = createGraphics(windowWidth,windowHeight);
	// pixelDensity(1);
	// noStroke();


	//button
	playButton = createButton("start");
	playButton.addClass("connectBtn");
	playButton.mousePressed(togglePlaying);
	playButton.position(50,50);

	//timer button
	timerButton = createButton("0:00");
	timerButton.addClass("connectBtn");
	timerButton.mousePressed(timeIt);
	timerButton.position(200,50);
	setInterval(timeIt,1000);




	// if(mic.isPlaying()){
	// 	setInterval(togglePlaying,1000);
	// }

	

	languageBtn = createButton("Switch to Chinese Version");
	languageBtn.addClass("connectBtn");
	languageBtn.mousePressed(languageSwitch);
	languageBtn.position(400,50);



	// for(let i = 0; i< 5 ; i++){
	// 	playButtons[0] = createButton("1st play");
	// 	playButtons[1] = createButton("2nd play");
	// 	playButtons[2] = createButton("3rd play");
	// 	playButtons[3] = createButton("4th play");
	// 	playButtons[4] = createButton("5th play");
	// 	playButtons[i].position(80*i+10,20);
	// 	playButtons[i].mousePressed(togglePlaying);
	// 	// playButtons[1].mousePressed(togglePlaying1);
	// 	// playButtons[2].mousePressed(togglePlaying2);
	// 	// playButtons[3].mousePressed(togglePlaying3);
	// 	// playButtons[4].mousePressed(togglePlaying4);

	// }

	// if(playButtons[0].mousePressed == true){
	// 	mic = sounds[0];
	// }
	// else if(playButtons[1].mousePressed == true){
	// 	mic = sounds[1];
	// }
	// else if(playButtons[2].mousePressed == true){
	// 	mic = sounds[2];
	// }
	// else if(playButtons[3].mousePressed == true){
	// 	mic = sounds[3];
	// }
	// else if(playButtons[4].mousePressed == true){
	// 	mic = sounds[4];
	// }
	


	createCanvas(1920, 5000);

	//shader
    WebglCanvas = createGraphics(1920,5000,WEBGL);
	pixelDensity(1);
	noStroke();

	WebglCanvas2 = createGraphics(1920,5000,WEBGL);
	pixelDensity(1);
	noStroke();
    

	historygram = createGraphics(windowWidth*20,5000);

	moveScript=moveEn;
	popScript=popEn;
	

	moveNum = moveScript.getRowCount();
		
	//print(moveNum);

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
		dialogs[i]= new Dialog(Number(x[i])*windowWidth, Number(y[i])*windowHeight, text[i], eval(font[i]),color[i],Number(size[i]),Number(speed[i]),Number(time[i]),false);

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
	
		dialogp[z]= new DialogP(Number(px[z])*windowWidth, Number(py[z])*windowHeight, ptext[z], eval(pfont[z]),pcolor[z],Number(psize[z]),pborntime[z],pdeadtime[z],false);
		//print(pfont);
		
	}

	typeNum = typeScript.getRowCount();
	//X,Y,X1,Y1,N,Text,Font,Color,Size,Speed
	let xT = typeScript.getColumn("X");
	let yT = typeScript.getColumn("Y");
	let xT1 = typeScript.getColumn("X1");
	let yT1 = typeScript.getColumn("Y1");
	let n = typeScript.getColumn("N");
	let textT = typeScript.getColumn("Text");
	let fontT = typeScript.getColumn("Font");
	let colorT = typeScript.getColumn("Color");
	let sizeT = typeScript.getColumn("Size");
	let borntimeT = typeScript.getColumn("Borntime");
	let speedT = typeScript.getColumn("Speed");

	for(let q = 0; q< typeNum ; q++){
	
		dialogT[q]= new DialogT(Number(xT[q])*windowWidth, Number(yT[q])*windowHeight,Number(xT1[q])*windowWidth, Number(yT1[q])*windowHeight, Number(n[q]),textT[q], eval(fontT[q]),colorT[q],Number(sizeT[q]),borntimeT[q],Number(speedT[q]),false);
		//print(pfont);
	
	}

	
	

	
}



function draw() {


	
	
	frameRate(10);


	background(0);

	//drawImage2();
	
	

	theShader.setUniform('u_resolution',[width/1000,height/1000])
	theShader.setUniform('u_time',millis()/1000)
	theShader.setUniform('tex0',WebglCanvas)
	theShader.setUniform('tex1',Img)
	WebglCanvas2.shader(theShader)
	// webGLGraphics2.rect(00,width,height)
	WebglCanvas2.rect(-width/2,-height/2,width,height)



	
	
	//shader 
	//WebglCanvas.shader(theShader0);
//	theShader0.setUniform("iResolution", [width, height]);
//	theShader0.setUniform("iFrame", frameCount);
//	theShader0.setUniform('tex',Img)
		// rect gives us some geometry on the screen
	//	WebglCanvas.rect(0,0,width, height);
	//	image(WebglCanvas,0,0);	
  


//		if(frameCount%100 > 10 && frameCount%100 <15)
//	{
		//glitch();
		
//	}
	

  
	// startCanvas.textSize(16);
	// startCanvas.textFont(enFont);
	// startCanvas.text("press any key to start",20,50);
	// startCanvas.fill(100);
	//image(startCanvas,0,0);
	//clear(0,0,width*2,height)




		vx=vx+5;
			
		spectrum = fft.analyze();
		// let volumne = fft.getEnergy(2400);
		// let low = fft.getEnergy(1000);
		//let gap = volumne - low;
		//print(gap);
		//print('high'+volumne);


		for (let i = maxFreqHz; i >= minFreqHz; i--) {
			
			//var high = fft.getEnergy(2400);

			//let index = i - minFreq;
			let index = maxFreqHz - i;
			//let intensity = (spectrum[i] - spectrum[500])*3;
			

			let intensity = (fft.getEnergy(i)-fft.getEnergy(1000))*2.5;

			let highintensity = (fft.getEnergy(2400)-fft.getEnergy(1000))*2.5;
			//console.log("intensity"+highintensity);
			let intensityX= map(intensity,0,300,0.5,5);
			

			if(frameCount % 10 < 3)
			{

		

				if(intensity>150){
					
				let transp = map(intensity,150,255,0,100);
				//let widthhis = map(intensity,240,255,1,3);

				let widthhis = map(intensity,0,400,1,10);

				historygram.stroke(intensity/3,intensity/3,intensity/3,transp);
				//historygram.stroke(intensity,intensity,ntensity,transp);

				//red
				historygram.stroke(218,18,32,50,50);

	

				let y = index / (maxFreqHz - minFreqHz - 1) * height;

				historygram.line(vx-2+intensityX,y, vx+intensityX,y);
				//historygram.line(vx,y+3, vx+1,y); //1 
				
					if(intensity>220){

						historygram.stroke(intensity,intensity,intensity,transp/3);

						let y = index / (maxFreqHz - minFreqHz - 1) * height;

						//historygram.line(vx-widthhis+intensityX,y, vx+intensityX,y);
						historygram.noStroke();


						//let color = map(intensity/3,-200,100,-100,100);

						
						let colorR = 176 + random(-50,100);
						let colorG = 73 + random(10,50);
						let colorB = 20 + random(-30,30);
						
					

					

						historygram.fill(colorR,colorG,colorB,2);
						historygram.rect(vx,y,widthhis,2);

						historygram.fill(colorR,colorG,colorB,2);
						historygram.ellipse(vx,y,widthhis+10);

						historygram.fill(colorR,colorG,colorB,3);
						historygram.ellipse(vx,y,widthhis+6);

						historygram.fill(colorR,colorG,colorB,4);
						historygram.ellipse(vx,y,widthhis+3);

						historygram.fill(colorR,colorG,colorB,5);
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
					historygram.stroke(106,33,228,90);
	
		
	
					let y = index / (maxFreqHz - minFreqHz - 1) * height;
	
					historygram.line(vx-2+intensityX,y, vx+intensityX,y);
					//historygram.line(vx,y+3, vx+1,y); //1 
					
						if(intensity>220){
	
							historygram.stroke(intensity,intensity,intensity,transp/3);
	
							let y = index / (maxFreqHz - minFreqHz - 1) * height;
	
							//historygram.line(vx-widthhis+intensityX,y, vx+intensityX,y);
							historygram.noStroke();
	
	
							//let color = map(intensity/3,-200,100,-100,100);
	
							
							let colorR = 176 + random(-50,100);
							let colorG = 73 + random(10,50);
							let colorB = 20 + random(-30,30);
							
						
	
						
							historygram.fill(colorR,colorG,colorB,2);
							historygram.rect(vx,y,widthhis,2);
	
							historygram.fill(colorR,colorG,colorB,2);
							historygram.ellipse(vx,y,widthhis+10);
	
							historygram.fill(colorR,colorG,colorB,3);
							historygram.ellipse(vx,y,widthhis+6);
	
							historygram.fill(colorR,colorG,colorB,4);
							historygram.ellipse(vx,y,widthhis+3);
	
							historygram.fill(colorR,colorG,colorB,5);
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
					historygram.stroke(21,49,190,80);
					
	
					let y = index / (maxFreqHz - minFreqHz - 1) * height;
	
					historygram.line(vx-2+intensityX,y, vx+intensityX,y);
					//historygram.line(vx,y+3, vx+1,y); //1 
					
						if(intensity>220){
							let widthhis = map(intensity,240,255,1,3);
	
							historygram.stroke(intensity,intensity,intensity,transp/3);
	
							let y = index / (maxFreqHz - minFreqHz - 1) * height;
	
							//historygram.line(vx-widthhis+intensityX,y, vx+intensityX,y);
							historygram.noStroke();
	
	
							//let color = map(intensity/3,-200,100,-100,100);
							
							let colorR = 166 + random(-50,100);
							let colorG = 106 + random(10,50);
							let colorB = 67 + random(-30,30);
							
					
	
						
							historygram.fill(colorR,colorG,colorB,2);
							historygram.rect(vx,y,widthhis,2);
	
							historygram.fill(colorR,colorG,colorB,3);
							historygram.ellipse(vx,y,widthhis+10);
	
							historygram.fill(colorR,colorG,colorB,5);
							historygram.ellipse(vx,y,widthhis+6);
	
							historygram.fill(colorR,colorG,colorB,8);
							historygram.ellipse(vx,y,widthhis+3);
	
							historygram.fill(colorR,colorG,colorB,10);
							historygram.ellipse(vx,y,widthhis);
							
	
					
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
	image(texture2,0,0,width,height)

	pop()
	
	//drawImage2();
	
	image(historygram, windowWidth-vx,0);
	//image(historygram, windowWidth-vx,height/2);
	

	




		

	
		// // info text
		// textSize(16);
		// textFont(enFont);
		// fill(255);
		// text("2020-12-30--10-12-11--593_pX.fots",1/25*width,15/20*height);
		// textSize(25);
		// text("age:2s",1/25*width,16/20*height);
		// text("ctr_s:5[nc]",1/25*width,50/60*height);
		// text("ctr_f: 1759",1/25*width,52/60*height);
		// text("lat:-77.04°",1/25*width,54/60*height);
		// text("lst:13.89 hrs",1/25*width,56/60*height);
		// fill(255);
		
		// textSize(18);
		// text("age:2s",5/25*width,16/20*height);
		// text("ctr_s:5[nc]",5/25*width,50/60*height);
		// text("ctr_f: 1759",5/25*width,52/60*height);
		// text("lat:-77.04°",5/25*width,54/60*height);
		// text("lst:13.89 hrs",5/25*width,56/60*height);
		// fill(255);

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
	//	glitch1();
	}


	



}


function timeIt(){
	// if(!mic.isPlaying()){
	// 	timerButton.html("connecting");
	// }

	// if(mic.isPlaying()){
	counter++;
	minutes =floor(counter/60);
	seconds = counter%60;
	timerButton.html(+ minutes + ":"+ seconds);
// }
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
		
		// image(historygram,windowWidth,0);
		// scriptCanvas.reset();
		mic.play();
		mic.amp(1);
		// mic.onended(soundloop);
	
		playButton.html("connecting");
		}

		else{
			playButton.html("start");
		// counter++;
		// minutes =floor(counter/60);
		// seconds = counter%60;
		// playButton.html("connecting"+ minutes + ":"+ seconds);

		}

  }


//   function timerCount(){
// 	  if(mic.isPlaying()){
// 		counter++;
// 		minutes =floor(counter/60);
// 		seconds = counter%60;
// 		timerButton.html(minutes + ":"+ seconds);
// 	  }
//   }





  function soundloop(){
	  mic.play();
	  mic.amp(1);
	  //mic.onended(soundloop);
	  historygram = createGraphics(windowWidth*10, height);
	  vx = 0;
  }







function script(){
	//if(mic.isPlaying()){


	
		for(i=0;i<dialogs.length;i++) {
			
			dialogs[i].show();
			dialogs[i].move();
		}

		for(z=0;z<dialogp.length;z++) {
		
			dialogp[z].show();
		
		}

		for(q=0;q<dialogT.length;q++){
			dialogT[q].show();
		}

		// for(o=0;o<cloud.length;o++){
		// 	cloud[o].show();
		// }



	//}
		
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

//   function windowResized() {
// 	resizeCanvas(windowWidth, windowHeight);
//   }


  function drawImage2(){
    scanImage.resize(windowWidth,0);
    let pixelColors = [];

    if(scanLine<=height){
        for(let s=0; s<width; s++) {
            pixelColors[s] = scanImage.get(s,scanLine);
            let clr = color(pixelColors[s]);
            clr.setAlpha(100);
        }
    }

    for (let s=0; s<windowWidth;s++) {
        scanCanvas.noStroke();
        scanCanvas.fill(pixelColors[s]);
        scanCanvas.rect(s,scanLine,5,2);
    }


    push();
    blendMode(ADD);
    blendMode(OVERLAY);
    image(scanCanvas,0,0);
    pop();

    scanLine = scanLine + 1;
}





 



function languageSwitch(){


	// console.log("hiii"+counter);

	if(moveScript == moveEn){
		moveScript = moveCh;
		popScript = popCh;
		languageBtn.html("Switch to English");
	}
	 else{
		moveScript = moveEn;
		popScript = popEn;
		 languageBtn.html("Switch to Chinese");
	}

	//delete all script array objects

		dialogs.splice(0,dialogs.length);

		dialogp.splice(0,dialogp.length);

		dialogT.splice(0,dialogT.length);	




	//rewrite

	moveNum = moveScript.getRowCount();

	let x = moveScript.getColumn("X");
	let y = moveScript.getColumn("Y");
	let text = moveScript.getColumn("Text");
	let font = moveScript.getColumn("Font");
	let color = moveScript.getColumn("Color");
	let size = moveScript.getColumn("Size");
	let speed = moveScript.getColumn("Speed");
	let time = moveScript.getColumn("Borntime");

	

	for(let i = 0; i< moveNum ; i++){
	
		  if(Number(time[i])>counter*1000){
			  dialogs.push(new Dialog(Number(x[i])*windowWidth, Number(y[i])*windowHeight, text[i], eval(font[i]),color[i],Number(size[i]),Number(speed[i]),Number(time[i]),false));
			  //dialogs[i]= new Dialog(Number(x[i])*windowWidth, Number(y[i])*windowHeight, text[i], eval(font[i]),color[i],Number(size[i]),Number(speed[i]),Number(time[i]),false);
			  }
	}



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

		  if(Number(pborntime[z])>counter*1000){
			  dialogp.push(new DialogP(Number(px[z])*windowWidth, Number(py[z])*windowHeight, ptext[z], eval(pfont[z]),pcolor[z],Number(psize[z]),pborntime[z],pdeadtime[z],false));
		//	dialogp[z]= new DialogP(Number(px[z])*windowWidth, Number(py[z])*windowHeight, ptext[z], eval(pfont[z]),pcolor[z],Number(psize[z]),pborntime[z],pdeadtime[z],false);
			//print(pfont);
		  }		
	}

	typeNum = typeScript.getRowCount();
	//X,Y,X1,Y1,N,Text,Font,Color,Size,Speed
	let xT = typeScript.getColumn("X");
	let yT = typeScript.getColumn("Y");
	let xT1 = typeScript.getColumn("X1");
	let yT1 = typeScript.getColumn("Y1");
	let n = typeScript.getColumn("N");
	let textT = typeScript.getColumn("Text");
	let fontT = typeScript.getColumn("Font");
	let colorT = typeScript.getColumn("Color");
	let sizeT = typeScript.getColumn("Size");
	let borntimeT = typeScript.getColumn("Borntime");
	let speedT = typeScript.getColumn("Speed");

	for(let q = 0; q< typeNum ; q++){

			dialogT[q]= new DialogT(Number(xT[q])*windowWidth, Number(yT[q])*windowHeight,Number(xT1[q])*windowWidth, Number(yT1[q])*windowHeight, Number(n[q]),textT[q], eval(fontT[q]),colorT[q],Number(sizeT[q]),borntimeT[q],Number(speedT[q]),false);
			//print(pfont);
		
	
	}
	



}


  