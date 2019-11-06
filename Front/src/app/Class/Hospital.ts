/**
 *
 *
 * @export
 * @class Hospital
 */
export class Hospital {
  
         _id: string;
         projectCode: string;
         country: string;
         project: string;
         startingDate: Date;
         closuredate: Date;
         ipdStructure: string;
         leveOfCare: string;
         metier: [{ any; categorie: [{ any }] }];

         /**
          *Creates an instance of Hospital.
          * @param {string} projectCode
          * @param {string} country
          * @param {string} project
          * @param {string} startingDate
          * @param {string} closuredate
          * @param {string} ipdStructure
          * @param {string} leveOfCare
          * @memberof Hospital
          */
         constructor();
         constructor(hopital: {
           _id?: string;
           projectCode?: string;
           country?: string;
           project?: string;
           startingDate?: string;
           closuredate?: string;
           ipdStructure?: string;
           leveOfCare?: string;
         });
         constructor({
           _id,
           projectCode,
           country,
           project,
           startingDate,
           closuredate,
           ipdStructure,
           leveOfCare
         }: {
           _id?: string;
           projectCode?: string;
           country?: string;
           project?: string;
           startingDate?: string;
           closuredate?: string;
           ipdStructure?: string;
           leveOfCare?: string;
         } = {}) {}

         delete() {
           this._id = "";
           this.projectCode = "";
           this.country = "";
           this.project = "";
           this.startingDate = null;
           this.closuredate = null;
           this.ipdStructure = "";
           this.leveOfCare = "";
         }
       }
