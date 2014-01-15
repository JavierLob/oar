//OAR::API es Objetos ARrastrables, as� de facil y gratis
//OAR::API v1.0
//Si modificas esta API porfavor, mandame un correo a guru (en) javascript (p) es
//Si usas esta API en alg�n proyeto, me mandas un correo igualmente :)
//Iniciamos el objeto (namespace)
OAR={
//INICIA(): esta funci�n se llama para iniciar el script y copiar el load de la pagina
	inicia:function(){
		//hacemos una copia del window.onload por si hay otros script que lo requieren
		this.onloadBack=window.onload||function(){};
		//le indicamos al navegador que una vez cargada la p�gina ejecute la funci�n OAR.i();
		window.onload=this.i
	},//fin inicia
//I(): esta funci�n hace una copia de los eventos utilizados del document.
	i:function(){
		//copiamos la funci�n y si no existe la trampeamos (para que no de error)
		OAR.docmDB=document.onmousedown||function(){};
		OAR.docmUB=document.onmouseup||function(){};
		OAR.docMMB=document.onmousemove||function(){};
		//luego le metemos nuestros eventos del obj.
		document.onmousedown=OAR.mouseDown;
		document.onmouseup=OAR.mouseUp;
		//indicamos al OBJ que ya est� cargado
		OAR.loaded=true;
		//HAZ ARRASTRABLES LOS OBJ QUE SE HAN QUEDADO EN COLA...
		for(var ar=0;ar<OAR.pila.length;ar++){
			OAR.arrastrable(OAR.pila[ar]);
		}
		//y finalmente ejecutamos la funci�n que hemos copiado al inicia();
		OAR.onloadBack();
	},//fin i
//ARRASTRABLE(): esto vuelve arrastrable cualquier objeto, acepta ID y referencia a OBJ como argumento
	arrastrable:function(element){
		//miramos si la p�gina ya est� cargada
		if(this.loaded==true){
			//si le pasamos un ID; define elemento como el objeto en cuesti�n
			if(typeof element=="string"){
				element = document.getElementById(element);
			}
			//declaramos al elemento como arrastrable (diciendo que es OAR :P)
			element.isOAR=true;
		}else{ //si no est� cargada, suma a la pila inicial.
			if(!this.pila){
				this.pila = new Array();
			}
			this.pila[this.pila.length]=element;
		}
	},//fin arrastrable
//MOUSEDOWN(): cada vez que se pulsa el bot�n se ejecuta esta funci�n
	mouseDown:function(e){
		//si es IE define e como el evento
		if(!e){e=window.event;}
		//si es IE define e.target como el objeto donde se pulsa (e.target es para FF/NN)
		if(!e.target){e.target=e.srcElement;}
		//Si el objeto es arrastrable
		if(e.target.isOAR){
			//si su posici�n no es relativa
			if(e.target.style.position!="relative"||!e.target.style.position){
				//hazlo relativo
				e.target.style.position="relative";
			}
			//se est� arrastrando
			OAR.isDrag=true;
			//define el objeto que se est� arrastrando dentro del objeto OAR
			OAR.o=e.target;
			//define la posici�n actual del elemento
			OAR.tx = parseInt(OAR.o.style.left+0);
			OAR.ty = parseInt(OAR.o.style.top+0);
			//define la posici�n actual del rat�n
			OAR.x = e.clientX;
			OAR.y = e.clientY;
			//define el mousemove de document con la funci�n de mouseMove de OAR
			document.onmousemove=OAR.mouseMove;
		}//fin IF isOAR
		//ejecuta la copia de document.onmousedown
		OAR.docmDB();
	},//fin mousedown
//MOUSEUP(): Cuando sueltas el bot�n del rat�n pasa esto
	mouseUp:function(){
		//definimos isDrag como falso y as� ya no se arrastra nada
		OAR.isDrag=false;
		//ejecutamos la copia que tenemos de mouseUp de document
		OAR.docmUB();
	},//fin mouseup
//MOUSEMOVE(): esto se ejecuta cada vez que se mueve el rat�n (durante)
	mouseMove:function(e){
		//si es IE define e como el evento
		if(!e){e=window.event;}
		//si se est� arrastrando alg�n objeto
		if(OAR.isDrag){
			//reposiciona el objeto en base a la posici�n actual del rat�n
			//y la posici�n anterior del objeto
			OAR.o.style.left=OAR.tx+e.clientX-OAR.x;
			OAR.o.style.top=OAR.ty+e.clientY-OAR.y;
			//retorna falso para que no seleccione (aunque se lo pasa por los cojones)
			return false;
		}//fin IF isDrag
		//ejecuta la copia que hay del mousemove
		OAR.docMMB();
	}//fin mousemove
}//fin del objeto OAR
OAR.inicia();