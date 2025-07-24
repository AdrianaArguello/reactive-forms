import { Routes } from "@angular/router";
import { BasicPageComponent } from "./pages/basic-page/basic-page.component";
import { DinamicPageComponent } from "./pages/dinamic-page/dinamic-page.component";
import { SwitchesPageComponent } from "./pages/switches-page/switches-page.component";

export const reactiveRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'basic',
        title: 'Basicos',
        component: BasicPageComponent
      },
      {
        path: 'dinamic',
        title: 'Dinamicos',
        component: DinamicPageComponent
      },
      {
        path: 'switches',
        title: 'Switches',
        component: SwitchesPageComponent
      },
      {
        path: '**',
        redirectTo: 'basic'
      },
    ]
  }
]
