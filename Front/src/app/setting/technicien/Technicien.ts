export default class Technicien {
    id: string;
    nom: string;
    prenom: string;
    mail: string;
    poste: string;

    constructor(data) {
        this.id = data.id;
        this.nom = data.nom;
        this.prenom = data.prenom;
        this.mail = data.mail;
        this.poste = data.poste;

    }
}
