
// move class
class Dialog{
	
	constructor(x,y,text,font, color, size, speed,time,isDisplayed){
		this.x = x;
		this.y = y;
		this.text = text;
		this.font = font;
		this.color = color;
		this.size = size;
		this.speed = speed;
		this.isDisplayed =isDisplayed;
		this.time =time;
		setTimeout(() => {this.display(true)},time); //匿名函数
	//	setTimeout(this.display,time);


	}

 	 display(isDisplayed){
	//	console.log('hihihihihihihi');
	//	console.log(this.time);
		this.isDisplayed = isDisplayed;
	}




	show(){
		if(this.isDisplayed==false){
			return;
		}
		
		scriptCanvas.textSize(this.size);
		scriptCanvas.textFont(this.font);
		scriptCanvas.fill(this.color);
		
		//scriptCanvas.translate(0,0)
		//scriptCanvas.scale(1,1.34);

        scriptCanvas.text(this.text,this.x,this.y);
		
		

		//ellipse(this.x,this.y,5);

		/*
		textSize(18);
		fill(255,80);
        text(this.text,this.x+5,this.y);
		text(this.text,this.x+10,this.y);

		textSize(18);
		fill(255,60);
		text(this.text,this.x+15,this.y);
		text(this.text,this.x+20,this.y);
      */

	}

	move(){
		if(this.isDisplayed==false){
			return;
		}	
		this.x = this.x - this.speed;
		//this.y = this.y + ((Math.random() * 3) -1);
	}
}



//popup class
class DialogP{
	constructor(x,y,text,font,color,size,borntime,deadtime,isDisplayed){
		this.x=x;
		this.y=y;
		this.text =text;
		this.font = font;
		this.color = color;
		this.size =size;
		this.isDisplayed = isDisplayed;
		setTimeout(() => {this.display(true)},borntime); //匿名函数
		//setTimeout(() => {this.blur(true)},borntime+1000); //匿名函数
		setTimeout(() => {this.remove(false)},deadtime); //匿名函数

	}
	display(isDisplayed){
		this.isDisplayed = isDisplayed;
	}


	remove(isDisplayed){
		this.isDisplayed = isDisplayed;
		
	}

	show(){
		if(this.isDisplayed==false){
			return;
		}	
		
		textSize(this.size);
		textFont(this.font);
		//scale(0.5,1)
	    fill(this.color);
		//this.y = this.y + random(-1,1);	
		//this.x = this.x + random(-1,1);	
		//scale(1,1.34)
		text(this.text,this.x,this.y);

/*
		let c = color(this.color);
		c.setAlpha(180);
		fill(c);
		text(this.text,this.x+10,this.y-10);
		*/
		//text(this.text,this.x-10,this.y+10);
	
	
	}
	
	
}



class Cloud{
	constructor(x,y,img,scale,borntime,isDisplayed){
		this.x = x;
		this.y = y;
		this.img = img;
		this.scale = scale;
		this.borntime = borntime;
		this.isDisplayed =isDisplayed;
		setTimeout(() => {this.display(true)},borntime); //匿名函数
		}

		display(isDisplayed){
			this.isDisplayed = isDisplayed;
		}
	
	
		show(){
			if(this.isDisplayed==false){
				return;
			}

			 push();
			 blendMode(OVERLAY);
		     image(this.img,this.x,this.y,this.img.width*this.scale,this.img.height*this.scale);
			 this.x = this.x - 5;
			 pop();

		}

}



class DialogT{
	////X,Y,X1,Y1,N,Text,Font,Color,Size,Speed
	constructor(xT,yT,xT1,yT1,n,textT,fontT,colorT,sizeT,borntimeT,speedT,isDisplayed)
	{
		this.xT = xT;
		this.yT = yT;
		this.xT1 = xT1;
		this.yT1 = yT1;
		this.n= n;
		this.textT = textT;
		this.fontT= fontT;
		this.colorT=colorT;
		this.sizeT = sizeT;
		this.borntimeT = borntimeT;
		this.speedT=speedT;
		this.isDisplayed = isDisplayed;
		setTimeout(() => {this.display(true)},borntimeT); //匿名函数

	}
	display(isDisplayed){
		this.isDisplayed = isDisplayed;
	}

	show(){
		if(this.isDisplayed==false){
			return;
		}
		print(this.textT + "hihihihihihi");
		if(this.n< (this.textT.length))	{
			push();
			fill(this.colorT);
			textFont(this.fontT);
			textSize(this.sizeT);
			text(this.textT.substring(0,this.n+1),this.xT,this.yT,this.xT1,this.yT1);
			this.n++;
			setTimeout(function(){
				new DialogT(this.textT,this.n,this.xT,this.yT,this.xT1,this.yT1,this.speedT)
			},this.speedT);
			pop();
			}
		}


}
	






