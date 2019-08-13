export class Hospital {
  projectCode: String;
  country: String;
  project: String;
  startingDate: String;
  closuredate: String;
  ipdStructure: String;
  leveOfCare: String;

  public static fromJson(json: Object): Hospital {
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

  constructor(
    projectCode: String,
    country: String,
    project: String,
    startingDate: String,
    closuredate: String,
    ipdStructure: String,
    leveOfCare: String
  ) {}
}
