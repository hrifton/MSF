export default class Intervention {
  //ajout variable x pour palié au _id de mongoose (interventions.components.ts)
  [x: string]: any;
  departement: String;
  locality: String;
  priority: String;
  day: String;
  description: String;
  status: String;
  user: String;
  type: String;
  tech: String;
  id: Object;
  useMat: String;
  asset: String;
  slug: Number;
  domaine: String;

  constructor(
    departement: string,
    locality: string,
    priority: string,
    day: string,
    description: string,
    status: string,
    user: string,
    type: string,
    tech: string,
    id: string,
    useMat: string,
    asset: string,
    slug: number,
    domaine: string
  ) {
    this.departement = departement;
    this.locality = locality;
    this.priority = priority;
    this.day = day;
    this.description = description;
    this.status = status;
    this.user = user;
    this.type = type;
    this.tech = tech;
    this.id = id;
    this.useMat = useMat;
    this.asset = asset;
    this.slug = slug;
    this.domaine = domaine;
  }
}
