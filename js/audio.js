var maximo,
	barra,
	progreso,
	estado,
	repetir,
	favorito,
	pista,
	icono,
	dur,
	tiempo,
	fav,
	minutos = 0,
	segundos = 0,
	horas = 0,
	duracion,
	minutosw2,
	segundos2,
	horas2,
	duracion2,
	r = false,
	maximo = 346,
	f = false,
	seg = 0;

function elementos(){
	barra = document.getElementById('barra');
	progreso = document.getElementById('progreso');
	icono = document.getElementById('estado');
	estado = document.getElementsByClassName('max')[0];
	repetir = document.getElementsByClassName('rep')[0];
	favorito = document.getElementsByClassName('favorito')[0];
	pista = document.getElementsByTagName('audio')[0]; 
	dur = document.getElementsByClassName('dur')[0];
	tiempo = document.getElementsByClassName('pro')[0];
	fav = document.getElementById('fav');

	estado.addEventListener('click', reproduccion, false);
	repetir.addEventListener('click', bucle, false);
	favorito.addEventListener('click', agregar, false);
	barra.addEventListener('click', posicion, false);
	barra.addEventListener('click', tim, false);

	dcion();

	if (pista.play()){
		tmer =setInterva(ltime, 1000);
	}   
}

function reproduccion(){
	if((pista.paused==false) && (pista.ended==false)) {
		pista.pause();
		icono.className="fas fa-play-circle";
} else {
	pista.play();
	icono.className="fas fa-pause-circle";

	load = setInterval(rep, 1);
	}
}

function agregar(){
	if(f==false){
		fav.className="fas fa-heart";
		f = true;
		alert('Cancion agregada');
	} else {
		fav.className="far fa-heart";
		f = false;
		alert('Cancion eliminada');
	}
}

function rep(){
	if(pista.ended==false){
		var total = parseInt(pista.currentTime * maximo / pista.duration);

		progreso.style.width=total + "px";
	}
}

function bucle(){
	if (r==false){
		 repetir.style.color="#53DC0D";
		 r = true;
	} else {
		repetir.style.color="#FFF";
		 r = false;
	}
}

function posicion(posicion){
	var raton = posicion.pageX-barra.offsetLeft;

	var nuevoTiempo = raton * pista.duration/maximo;

	pista.currentTime = nuevoTiempo;
	progreso.style.width = raton + "px";
}

function tim(posicion){
	if(pista.ended==false){

		var raton = posicion.pageX-barra.offsetLeft;

		var nuevoTiempo = raton * pista.duration/maximo;

		duracion = nuevoTiempo;

		horas = parseInt(duracion / 3600);

		minutos = parseInt(duracion / 60) - horas * 60;

		segundos = parseInt(( duracion /  60 -  (horas  *  60)) * 60) - (minutos * 60);

		if (segundos<10){
			tiempo.innerHTML = minutos.toString() + ":0" + segundos.toString();
		} else {
			tiempo.innerHTML = minutos.toString() + ":" + segundos.toString();
		}
	}
}

function dcion(){
	duracion2 = pista.duration;

		horas2 = parseInt(duracion2 / 3600);
		minutos2 = parseInt(duracion2 / 60) - horas2 * 60;
		segundos2 = parseInt((duracion2 / 60 - (horas2 * 60)) * 60) - (minutos2 * 60);

		dur.innerHTML = minutos2.toString() + ":0" + segundos2.toString();
}

function time(){
	seg = pista.currentTime;

	if((pista.ended == false) && (pista.pause==false)){
		if (segundos<60) segundos ++;

		if(segundos==60 && minutos <60){
			minutos++;
			segundos = 0;
		}


		if (segundos<10){
			tiempo.innerHTML = minutos.toString() + ":0" + segundos.toString();
		} else {
			tiempo.innerHTML = minutos.toString() + ":" + segundos.toString();
		}
	}

	if(seg >= pista.duration){
		segundos = 0;
		minutos = 0;
		duracion = 0;

		tiempo.innerHTML = minutos.toString() + ":0" + segundos.toString();
		progreso.style.width = 0 + "px";
		icono.className="fas fa-play-circle";

		if(r == true){
			pista.play();
			icono.className="fas fa-pause-circle";
		}
	}
}

window.addEventListener('load', elementos, false);