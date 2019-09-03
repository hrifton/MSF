export class Hospital {
  projectCode: string;
  country: string;
  project: string;
  startingDate: Date;
  closuredate: Date;
  ipdStructure: string;
  leveOfCare: string;

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
