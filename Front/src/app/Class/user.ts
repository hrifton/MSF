/**
 *
 *
 * @export
 * @class User
 */
export class User {
  fullName: string;
  email: string;
  password: string;
  /**
   *Creates an instance of User.
   * @param {string} fullName
   * @param {string} email
   * @param {string} password
   * @memberof User
   */
  constructor(fullName: string, email: string, password: string) {
    this.fullName = fullName;
    this.email = email;
    this.password = password;
  }
}
