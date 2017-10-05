import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import * as magnetURL from "magnet-uri";
import * as WebTorrent from "webtorrent";
import * as transformToUrl from "magnet-link";

@Component({
  selector: "m-play",
  templateUrl: "./play.component.html",
  styleUrls: ["./play.component.scss"],
  inputs: ["src"],
})
export class PlayComponent implements OnInit {
  isLoading: boolean = false;
  isHideList: boolean = false;

  _src: string;

  set src(value) {
    this._src = value;
    if (this._src) {
      console.log(`我执行了`);

      this.downloadFile();
    }
  }

  get src() {
    return this._src;
  }

  torrents: WebTorrent;

  files: any[] = [];

  @ViewChild("play") play: ElementRef;

  constructor(
    // private element: ElementRef
  ) {
    console.log(this);
  }

  ngOnInit() {
  }

  toggleLoading() {
    this.isLoading = !this.isLoading;
  }

  downloadFile() {
    this.torrents = new WebTorrent();
    this.toggleLoading();
    return this.getUrl().then((torrents: any) => {
      const files: any[] = torrents.files;
      if (files.length > 1) {
        this.files = files
      } else {
        let file = files[0];
        if (file) {
          if (/(\.mp4|\.webm|\.ogg|\.wave)$/.test(file.name)) {
            this.playFile(file);
          }
        }
      }

      this.toggleLoading();
    }, (err) => {
      console.log(err);

    })
  }

  getUrl() {
    return new Promise((res, rej) => {
      console.log(this.src);
      this.torrents.add(this.src, function () {

        console.log(arguments);

        res.apply(null, arguments)
      },(err) => rej(err));
    })
  }

  playFile(file: any) {
    this.toggleHideList();
    file.appendTo(this.play.nativeElement);
  }

  toggleHideList() {
    this.isHideList = !this.isHideList;
  }
}
