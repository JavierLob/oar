//OAR::API v1.0 es Objetos ARrastrables, así de facil y gratis
//Si modificas esta API porfavor, mandame un correo a guru (en) javascript (p) es
//Si usas esta API en algún proyeto, me mandas un correo igualmente :)
OAR={
	inicia:function(){
		this.onloadBack=window.onload||function(){};
		window.onload=this.i
	},
	i:function(){
		OAR.docmDB=document.onmousedown||function(){};
		OAR.docmUB=document.onmouseup||function(){};
		OAR.docMMB=document.onmousemove||function(){};
		document.onmousedown=OAR.mouseDown;
		document.onmouseup=OAR.mouseUp;
		OAR.loaded=true;
		for(var ar=0;ar<OAR.pila.length;ar++){
			OAR.arrastrable(OAR.pila[ar]);
		}
		OAR.onloadBack();
	},
	arrastrable:function(element){
		if(this.loaded==true){
			if(typeof element=="string"){
				element = document.getElementById(element);
			}
			element.isOAR=true;
		}else{
			if(!this.pila){
				this.pila = new Array();
			}
			this.pila[this.pila.length]=element;
		}
	},
	mouseDown:function(e){
		if(!e){e=window.event;}
		if(!e.target){e.target=e.srcElement;}
		if(e.target.isOAR){
			if(e.target.style.position!="relative"||!e.target.style.position){
				e.target.style.position="relative";
			}
			OAR.isDrag=true;
			OAR.o=e.target;
			OAR.tx = parseInt(OAR.o.style.left+0);
			OAR.ty = parseInt(OAR.o.style.top+0);
			OAR.x = e.clientX;
			OAR.y = e.clientY;
			document.onmousemove=OAR.mouseMove;
		}
		OAR.docmDB();
	},
	mouseUp:function(){
		OAR.isDrag=false;
		OAR.docmUB();
	},
	mouseMove:function(e){
		if(!e){e=window.event;}
		if(OAR.isDrag){
			OAR.o.style.left=OAR.tx+e.clientX-OAR.x;
			OAR.o.style.top=OAR.ty+e.clientY-OAR.y;
			return false;
		}
		OAR.docMMB();
	}
}
OAR.inicia();