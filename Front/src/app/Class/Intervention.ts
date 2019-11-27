import { User } from './user';

export default class Intervention {
                 //ajout variable x pour palié au _id de mongoose (interventions.components.ts)
                 [x: string]: any;
                 idDepartement: String;
                 idHopital: String;
                 locality: String;
                 priority: String;
                 day: String;
                 description: String;
                 status: String;
                 idUser: String;
                 type: String;
                 tech: String;
                 _id: Object;
                 useMat: String;
                 asset: String;
                 slugI: Number;
                 metier: String;
                 user: Array<User>;
                 dateAssing: String;

                 constructor(
                   idDepartement: string,
                   idHopital: string,
                   locality: string,
                   priority: string,
                   day: string,
                   description: string,
                   status: string,
                   idUser: string,
                   type: string,
                   tech: string,
                   _id: string,
                   useMat: string,
                   asset: string,
                   slugI: number,
                   metier: string,
                   dateAssing?: string
                 ) {
                   this.idDepartement = idDepartement;
                   this.idHopital = idHopital;
                   this.locality = locality;
                   this.priority = priority;
                   this.day = day;
                   this.description = description;
                   this.status = status;
                   this.idUser = idUser;
                   this.type = type;
                   this.tech = tech;
                   this._id = _id;
                   this.useMat = useMat;
                   this.asset = asset;
                   this.slugI = slugI;
                   this.metier = metier;
                   this.dateAssing = dateAssing;
                 }
               }
