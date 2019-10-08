export class Metier {
  id: string;
  metier: string;
  idCategorie: Object[];
  color: string;

  constructor(data) {
    this.id = data.id;
    this.metier = data.metier;
    this.idCategorie = data.idCategorie;
    this.color = data.color;
  }
}
