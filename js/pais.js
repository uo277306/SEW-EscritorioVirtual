class Pais {
    constructor(nombre, capital, poblacion) {
        this.nombre = nombre;
        this.capital = capital;
        this.poblacion = poblacion;

        this.apikey = '2ed2c4e1baca9ae0ffa7e790c37fe2a3';
    }

    fillAttributes() {
        this.formaGobierno = 'Unitario, representativo, descentralizado.';
        this.coordenadasCapital = [-77.044102302665, -12.044446952545284, 125.92];
        this.religionPredominante = 'Católica';
    }

    getNombre() {
        return this.nombre;
    }

    getCapital() {
        return this.capital;
    }

    getPoblacion() {
        return this.poblacion;
    }

    getFormaGobierno() {
        return this.formaGobierno;
    }

    getCoordenadasCapital() {
        return this.coordenadasCapital;
    }

    getReligionPredominante() {
        return this.religionPredominante;
    }

    getSecondaryInformation() {
        return '<ul>' +
            `<li>Población: ${this.poblacion}</li>` +
            `<li>Forma de gobierno: ${this.formaGobierno}</li>` +
            `<li>Religión predominante: ${this.religionPredominante}</li>` +
            '</ul>';
    }

    writeCoords() {
        document.write(`<p>Coordenadas capital: ${this.coordenadasCapital}</p>`);
    }

    getForecast() {
        const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${this.coordenadasCapital[1]}&lon=${this.coordenadasCapital[0]}&appid=${this.apikey}&units=metric&lang=es`;

        $.ajax({
            dataType: 'json',
            url,
            method: 'GET',
            success: function (datos) {
                datos.list.forEach(forecast => {
                    let tr = $('<tr>');
                    tr.append($('<td>').text(new Date(forecast.dt_txt).toLocaleString('ES-es')).attr('scope', 'row').attr('id', forecast.dt).attr('headers', 'dt_txt'));
                    tr.append($('<td>').text(forecast.main.temp_min + ' ºC').attr('headers', `temp_min ${forecast.dt}`));
                    tr.append($('<td>').text(forecast.main.temp_max + ' ºC').attr('headers', `temp_max ${forecast.dt}`));
                    tr.append($('<td>').text(forecast.main.humidity + ' %').attr('headers', `humidity ${forecast.dt}`));
                    tr.append($('<td>').html(`<img src=https://openweathermap.org/img/w/${forecast.weather[0].icon}.png alt='icono del tiempo'/>`).attr('headers', `icon ${forecast.dt}`));
                    if(forecast.rain){
                        tr.append($('<td>').text(forecast.rain['3h'] + ' mm').attr('headers', `rain ${forecast.dt}`));
                    } else {
                        tr.append($('<td>').text('0 mm').attr('headers', `rain ${forecast.dt}`));
                    }

                    $('tbody').append(tr);
                });
            },
            error: function () {
                alert('Error en la llamada a la api de openweathermap');
            }
        });
    }
}