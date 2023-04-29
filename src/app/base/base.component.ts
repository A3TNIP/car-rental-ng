import {AuthenticationService} from "../common/service/authentication.service";

export class BaseComponent {

  public is!: any;

  constructor(public service: AuthenticationService) {
    this.is = service.getRoleBoolean();
    console.log(this.is)
  }

}
