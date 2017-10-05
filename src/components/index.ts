import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { HeaderComponent } from "./header/header.component";
import { PlayComponent } from "./playComponent/play.component";

@NgModule({
  imports: [BrowserModule],
  declarations: [
    HeaderComponent,
    PlayComponent,
  ],
  exports: [
    HeaderComponent,
    PlayComponent,
  ]
})
export class ComponentsModule {}
