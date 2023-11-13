class Pais {
    constructor(nombre, capital, poblacion) {
        this.nombre = nombre;
        this.capital = capital;
        this.poblacion = poblacion;
    }

    fillAttributes() {
        this.formaGobierno = "Unitario, representativo, descentralizado.";
        this.coordenadasCapital = [-77.044102302665, -12.044446952545284, 125.92];
        this.religionPredominante = "Católica";
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
        return "<ul>" +
            `<li>Población: ${this.poblacion}</li>` +
            `<li>Forma de gobierno: ${this.formaGobierno}</li>` +
            `<li>Religión predominante: ${this.religionPredominante}</li>` +
            "</ul>";
    }

    writeCoords() {
        document.write(`<p>Coordenadas capital: ${this.coordenadasCapital}</p>`);
    }
}