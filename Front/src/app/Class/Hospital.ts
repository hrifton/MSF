/**
 *
 *
 * @export
 * @class Hospital
 */
export class Hospital {
  projectCode: string;
  country: string;
  project: string;
  startingDate: Date;
  closuredate: Date;
  ipdStructure: string;
  leveOfCare: string;
  /**
   *
   *
   * @static
   * @param {object} json
   * @returns {Hospital}
   * @memberof Hospital
   */
  public static fromJson(json: object): Hospital {
    return new Hospital(
      json["projectCode"],
      json["country"],
      json["project"],
      json["startingDate"],
      json["closuredate"],
      json["ipdStructure"],
      json["leveOfCare"]
    );
  }
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
  constructor(
    projectCode: string,
    country: string,
    project: string,
    startingDate: string,
    closuredate: string,
    ipdStructure: string,
    leveOfCare: string
  ) {}
}
