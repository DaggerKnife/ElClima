((d,w)=>{
    // Antes de jugar con el DOM, debemos esperar que cargue
    d.onreadystatechange = ()=>{
        // El dom esta listo para manipular en interactive
        // En complete, ya se pueden accerde a todo...
        if(d.readyState === "complete" ){
            metodos.init();
            w.metodos = metodos;
        }
    }
    
    const metodos = {
        datos:[],
        rutas:{},
        dias:{
            0:"Domingo",
            1:"Lunes",
            2:"Martes",
            3:"Miercoles",
            4:"Jueves",
            5:"Viernes",
            6:"Sabado"
        },
        token:'12d889927a2ab0508477527474cd4699',
        buscarElemento(elemento){
            return d.querySelector(elemento);
        },
        crearElemento(elemento){
            return d.createElement(elemento);
        },
        anadirCiudad(nuevaCiudad){
            // Fetch de la ciudad
            let tempDatos = this.datos;
            let tempCrear = this.crearInterna;
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${nuevaCiudad},cl&appid=${this.token}&lang=es&units=metric`)
            .then(resultado =>{
                return resultado.json();
            })
            .then(json =>{
                // Destructurando los datos de la respuesta
                let {name, 
                    weather:{0:{description,icon}},
                    main: {temp, temp_max,temp_min},
                    sys:{country}
                } = json;

                const nuevoRegistro = {
                    ciudad: name,
                    icono: icon,
                    estado_del_tiempo:description,
                    actual:temp,
                    max:temp_max,
                    min:temp_min,
                    pais:country
                }
                tempDatos.push(nuevoRegistro);
                tempCrear(nuevoRegistro);
            })
            .catch(err=>{
                w.console.error(err);
            })
        },
        crearCajitas(){

        },
        dibujar(elemento){
            const datos = this.buscarElemento("#datos");
            console.log(datos);
            datos.appendChild(elemento);
            setTimeout(()=>{
                requestAnimationFrame(()=>{
                    elemento.classList.remove("esconder");
                });
            },200);
        },
        crearInterna({
            ciudad,
            estado_del_tiempo,
            icono,
            actual,
            min,
            max,
            pais
        }){
            console.log("Entro a crearInterna");
            const div = this.metodos.crearElemento("div");
            console.log(ciudad);
            div.classList.add("col","s12" ,"m4","l6","icon-block","z-depth-2","fondo-tarjeta");
            div.id=ciudad;

            // Cabecera de carta
            const header = this.metodos.crearElemento("header");
            // 
            // Agregando hijos a header
            const picture = this.metodos.crearElemento("picture");
            const img = this.metodos.crearElemento("img");
            img.src = `http://openweathermap.org/img/wn/${icono}@2x.png`;
            img.classList.add("center","scale-sun");
            picture.appendChild(img);
            
            header.appendChild(picture);
            header.classList.add("center");
            // 
            // cuerpo de carta
            const section = this.metodos.crearElemento("section");
            const detalle = this.metodos.crearElemento("section");
            const titulo = this.metodos.crearElemento("h2");
            titulo.classList.add("center")
            titulo.innerText = ciudad;
            const dia = this.metodos.crearElemento("h3");
            dia.classList.add("center")
            dia.innerText = this.metodos.dias[new Date().getDay()];
            const estado = this.metodos.crearElemento("h4");
            estado.classList.add("center","capitalizexD")
            estado.innerText = estado_del_tiempo;
            const textoPais = this.metodos.crearElemento("h2");
            textoPais.classList.add("center")
            textoPais.innerText = pais;
            detalle.appendChild(titulo);
            detalle.appendChild(dia);
            detalle.appendChild(estado);
            detalle.appendChild(textoPais);
            section.appendChild(detalle);
            // footer de la carta
            const footer = this.metodos.crearElemento("footer");
            footer.classList.add("center","temp-alt")
            const p = this.metodos.crearElemento("p");
            p.innerText = `${Number.parseFloat(actual).toFixed(1)}°`;
            footer.appendChild(p);
            // Añadiendo al padre
            div.appendChild(section);
            div.appendChild(header);
            div.appendChild(footer);
            
            this.metodos.dibujar(div);
        },
        init(){
            if(this.datos.length > 0){
                this.crearCajitas();
            }
            this.eventos();
        },
        enrutar(ruta,payload){
            if(this.rutas[ruta] === undefined){
                this.rutas[ruta] = payload;
            }
        },
        cargarWeb(){
            console.log(w.location);
        },
        eventos(){
            w.onhashchange = this.cargarWeb();
        }
    };


})(document,window);

    
function agregar(){
    var inputValue = document.querySelector('.inputValue');
    metodos.anadirCiudad(inputValue.value);
    

}/*
document.getElementById("agregar").onclick = function (){
    agregar();
}*/


/* $("#Santiago").hide(); */

function eliminar(){
    var inputValue = document.querySelector('.inputValue');
    document.getElementById(inputValue.value).remove();
}


function buscar(){
    var inputValue = document.querySelector('.inputValue');
    
}


function eliminar2(){
    var inputValue = document.querySelector('.inputValue2');
    document.getElementById(inputValue.value).remove();
}


function agregar2(){
    var inputValue = document.querySelector('.inputValue2');
    metodos.anadirCiudad(inputValue.value);
    

}







function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }
