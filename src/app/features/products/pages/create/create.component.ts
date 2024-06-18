import { Component } from '@angular/core';
import { PrimaryLayoutComponent } from '../../../../shared/layouts/primary-layout/primary-layout.component';
import { AngularMaterialModule } from '../../../../shared/modules/angular-material/angular-material.module';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    AngularMaterialModule,
    PrimaryLayoutComponent,
    ButtonComponent,
    RouterModule,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {}
