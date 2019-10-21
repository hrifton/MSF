export class Metier {
  id: string;
  metier: string;
  categorie: Object[];
  color: string;

  constructor(data) {
    this.id = data.id;
    this.metier = data.metier;
    this.categorie = data.categorie;
    this.color = data.color;
  }
}
