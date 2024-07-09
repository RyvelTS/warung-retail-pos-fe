import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../shared/modules/angular-material/angular-material.module';
import { PrimaryLayoutComponent } from '../../shared/layouts/primary-layout/primary-layout.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    AngularMaterialModule,
    PrimaryLayoutComponent,
    RouterModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

}
