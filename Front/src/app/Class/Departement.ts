/**
 *
 *
 * @export
 * @class Departement
 */
export default class Departement {
  id: string;
  departement: string;
  /**
   *Creates an instance of Departement.
   * @param {*} data
   * @memberof Departement
   */
  constructor(data) {
    this.id = data.id;
    this.departement = data.departement;
  }
}
