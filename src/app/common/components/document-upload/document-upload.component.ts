import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FileUpload} from "primeng/fileupload";
import {ApiConstants} from "../../constants/ApiConstants";
import {BaseService} from "../../service/base.service";
import {LoaderService} from "../../service/loader.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css']
})
export class DocumentUploadComponent implements OnInit{
  @Input("Type") public type : "Document" | "Image" = "Document";
  @Input("Extra") public extra?: any;
  @ViewChild('tFileUploadButton') uploadButton !: FileUpload;

  public selectedDocument: string = "citizenship";
  file!: File;
  public fileUrl!: string;

  constructor(private service: BaseService, private router: Router) {
  }


  ngOnInit(): void {

  }

  openFileUpload() {
    this.uploadButton.choose();
  }

  uploadDocument() {
    if (!this.file) return;
    console.log(this.file);
    let formGroup = new FormData();
    let url = "";
    if (this.type === 'Document') {
      formGroup.append("file", this.file);
      formGroup.append("documentType", this.selectedDocument);
      url = `${ApiConstants.USER_CONTROLLER}/UploadDocument`
    } else {
      formGroup.append("image", this.file);
      formGroup.append("carId", this.extra);
      url = `${ApiConstants.CARS_CONTROLLER}/UploadImage`
    }
    LoaderService.show();
    this.service.postRequest(formGroup, url)
      .subscribe({
        next: () => {
          LoaderService.hide();
          if (this.type === 'Document') {
            this.router.navigateByUrl('/home').then();
          } else {
            window.location.reload();
          }
        },
        error: () => {
          LoaderService.hide();
        }
      })
    console.log(formGroup);
  }

  selectFile(event: any) {
    console.log(event)
    this.file = event.currentFiles[0]
    this.fileUrl = URL.createObjectURL(this.file);
  }
}
