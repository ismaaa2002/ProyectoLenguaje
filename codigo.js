//Cantida de noticias que se cargaran cada vez que se presione siguiente (5 + 1)
let cantidadNoticias = 5;
let pageFinal = cantidadNoticias;
let pageInicial = 0;
let temaActual = "Deportes";
let contadorVerMas = 0;

let noticias = {
    "apiKey": "148dd3d1968249b8a39f3fcb68384a80",
    fetchNoticias: function (categoria) {
        fetch(
            //Con esta funcion lo que hago es que con mi api key, se puede solicitar a la api la categoria que eliga el usuario al navegar por el html
            "https://newsapi.org/v2/everything?q="
            + categoria +
            //Y con el parametro languaje selleciona el lenguaje de las noticas añadiendo la apikey, aunque aveces con la busqueda genera noticias en otros idiomas por si no encuentra en español
            "&languaje=es&apiKey=" + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => this.displayNoticias(data));
    },


    displayNoticias: function (data) {
        //elimino todo si ha seleccionado un nuevo tema
        if (pageInicial == 0) {
            document.querySelector(".container-noticias").textContent = "";
        }


        for (i = pageInicial; i <= pageFinal; i++) {
            const { title } = data.articles[i];
            let h2 = document.createElement("h2");
            h2.textContent = title;

            const { urlToImage } = data.articles[i];
            let img = document.createElement("img");
            img.setAttribute("src", urlToImage);

            let info_item = document.createElement("div");
            info_item.className = "info_item";
            const { publishedAt } = data.articles[i];
            let fecha = document.createElement("span");
            let date = publishedAt;
            date = date.split("T")[0].split("-").reverse().join("-");
            fecha.className = "fecha";
            fecha.textContent = date;

            const { name } = data.articles[i].source;
            let fuente = document.createElement("span");
            fuente.className = "fuente";
            fuente.textContent = name;

            info_item.appendChild(fecha);
            info_item.appendChild(fuente);

            const { url } = data.articles[i];

            let item = document.createElement("div");
            item.className = "item";
            item.appendChild(h2);
            item.appendChild(img);
            item.appendChild(info_item);
            item.setAttribute("onclick", "location.href='" + url + "'");
            document.querySelector(".container-noticias").appendChild(item);
        }

        let btnSiguiente = document.createElement("span");
        btnSiguiente.id = "btnSiguiente";
        btnSiguiente.textContent = "Ver más";
        btnSiguiente.setAttribute("onclick", "siguiente()");

        if (contadorVerMas == 0) {
            document.querySelector(".container").appendChild(btnSiguiente);
            contadorVerMas++;
        }
    }
}



function buscar(cat) {
    pageInicial = 0;
    pageFinal = cantidadNoticias;
    temaActual = cat;
    noticias.fetchNoticias(cat);
}

function buscarTema() {
    pageInicial = 0;
    pageFinal = cantidadNoticias;

    let tema = document.querySelector("#busqueda").value;
    temaActual = tema;
    noticias.fetchNoticias(temaActual);
}

function siguiente() {
    pageInicial = pageFinal + 1;
    pageFinal = pageFinal + cantidadNoticias + 1;
    //eliminamos el botón siguiente
    document.querySelector("#btnSiguiente").remove();
    noticias.fetchNoticias(temaActual);
    contadorVerMas--;

}

noticias.fetchNoticias(temaActual);