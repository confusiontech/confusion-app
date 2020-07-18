class EventService {
    getDates() {
        return ['2019-10-19','2019-10-20']
    }
    getAllCategories() {
        return new Map([
            ["0", "Artes Escénicas" ],
            ["1", "Arte Urbano" ],
            ["2", "Audiovisual" ],
            ["3", "Exposición" ],
            ["4", "Música" ],
            ["5", "Otros" ],
            ["6", "Poesía" ],
            ["7", "Talleres / Charlas" ],
            ["8", "Instalaciones Urbanas"],
        ]);
    }
}


export default new EventService();


