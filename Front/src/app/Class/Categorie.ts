export class Categorie {
  name: string;
  color: string;
  idHopital: string;
  idMetier: string;
  _id: string;

  constructor(
    name: string,
    color: string,
    idHopital?: string,
    idMetier?: string,
    _id?: string,
  ) {
    this.name = name;
    this.color = color;
    this.idMetier = idMetier;
    this.idHopital = idHopital;
    this._id = _id
  }
}
