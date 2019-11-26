/**
 *
 *
 * @export
 * @class DateMaintenance
 */
export class DateMaintenance {
  codeBarre: String;
  StartTime: Date;
  EndTime: Date;
  idMaintenance: String;
  idHopital:String;

  /**
   *Creates an instance of DateMaintenance.
   * @param {String} codeBarre
   * @param {Date} StartTime
   * @param {Date} EndTime
   * @param {String} idMaintenance
   * @memberof DateMaintenance
   */
  constructor(
    codeBarre: String,
    StartTime: Date,
    EndTime: Date,
    idMaintenance: String,
    idHopital:String
  ) {
    this.codeBarre = codeBarre;
    this.StartTime = StartTime;
    this.EndTime = EndTime;
    this.idMaintenance = idMaintenance;
    this.idHopital = idHopital;
  }
}
