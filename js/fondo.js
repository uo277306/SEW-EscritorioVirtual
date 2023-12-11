class Fondo {
    constructor(nombrePais, nombreCapital, coordenadasCapital) {
        this.nombrePais = nombrePais;
        this.nombreCapital = nombreCapital;
        this.coordenadasCapital = coordenadasCapital;
        this.apiKey = "8bd8d3faabe99e2ecbecfa8545e0a201";
    }

    getFondos() {
        const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.apiKey}&lat=${this.coordenadasCapital[1]}&lon=${this.coordenadasCapital[0]}&format=json&nojsoncallback=1&extras=url_o`;

        $.ajax({
            dataType: "json",
            url,
            method: 'GET',
            success: function (response) {
                let i = 0;
                while (!response.photos.photo[i].url_o) {
                    i++;
                }

                $("main").css({
                    backgroundImage: `url(${response.photos.photo[i].url_o})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    height: "80vh",
                });

            },
            error: function () {
                alert("Error en la llamada a la api de flickr");
            }
        });
    }
}