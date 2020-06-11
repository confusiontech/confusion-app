class EventService {
    getDates() {
        return ['2019-10-19','2019-10-20']
    }
    getAllCategories() {
        return [
            { id: "arts", name: "Artes Escénicas" },
            { id: "audiovisual", name: "Audiovisual" },
            { id: "craftwork", name: "Artesanía" },
            { id: "gastronomy", name: "Gastronomía" },
            { id: "health", name: "Salud y Bienestar" },
            { id: "literature", name: "Literatura" },
            { id: "music", name: "Música" },
            { id: "other", name: "Otros" },
            { id: "street_art", name: "Arte Urbano" },
            { id: "visual", name: "Artes Visuales" }
        ];
    }
}


export default new EventService();
