import { Component } from '@angular/core';
import {LoaderService} from "../../service/loader.service";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  public loader: any = LoaderService.get();
}
