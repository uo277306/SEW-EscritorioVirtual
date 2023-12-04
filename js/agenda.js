class Agenda {
    constructor(url) {
        this.url = url;
        this.last_api_call = null;
        this.last_api_result = null;

        $('button').on('click', () => this.getRaces());
    }

    getRaces() {
        // 10 mins
        if (Date.now() - this.last_api_call <= 600_000 || this.last_api_result == null) {
            $.ajax({
                dataType: 'xml',
                url: this.url,
                method: 'GET',
                success: (datos) => {
                    this.last_api_result = datos;
                },
                error: () => {
                    alert('Error en la llamada a la api de ergast');
                },
                complete: () => {
                    this.formatRaces(this.last_api_result);
                }
            });
            this.last_api_call = Date.now();
        } else {
            this.formatRaces(this.last_api_result);
        }
    }

    formatRaces(racesXml) {
        const list = $('<ol>');

        $(racesXml).find('Race').each((i, race) => {
            const raceLi = $('<li>');

            raceLi.append($('<p>').text('Nombre: ' + $('RaceName', race).text()));
            raceLi.append($('<p>').text('Circuito: ' + $('Circuit CircuitName', race).text()));
            raceLi.append($('<p>').text('Coordenadas: ' + $('Circuit Location', race).attr('lat') + ' ' + $('Circuit Location', race).attr('long')));
            raceLi.append($('<p>').text('Fecha y hora: ' + new Date(Date.parse($('> Date', race).text() + ' ' + $('> Time', race).text())).toLocaleString('ES-es')));

            list.append(raceLi);
        });

        $('main').append(list);
    }
}