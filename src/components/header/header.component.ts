import { Component, EventEmitter, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: "m-head",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  outputs: ["clickUrl", "fileUrl"],
  inputs: ["isPlaying"],
})
export class HeaderComponent {
  isPlaying: boolean;

  clickUrl: EventEmitter<any> = new EventEmitter();
  fileUrl: EventEmitter<any> = new EventEmitter();

  @ViewChild("url") url: ElementRef;

  constructor() {
    console.log(this);

  }

  toPlaying() {
    this.isPlaying = true;
  }

  clickPlay() {
    this.clickUrl.emit(this.url.nativeElement.value);
    this.toPlaying();
  }

  uploadFile() {
    let fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.click();

    fileInput.onchange = ($event) => {
      const files = fileInput.files;
      if (Array.from(files).every(e => !!e.name.match(/\.torrent$/g))) {
        this.fileUrl.emit({files: fileInput.files});
        this.toPlaying();
      } else {
        alert("只能上传torrent文件");
      }
    }
  }
}
