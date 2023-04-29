import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private static object: any = {
    loading: false,
  };


  constructor() { }

  public static show() {
    return this.object.loading = true;
  }

  public static hide() {
    return this.object.loading = false;
  }

  public static get() {
    return this.object;
  }
}
