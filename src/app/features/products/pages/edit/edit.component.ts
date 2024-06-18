import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../../../shared/modules/angular-material/angular-material.module';
import { PrimaryLayoutComponent } from '../../../../shared/layouts/primary-layout/primary-layout.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    AngularMaterialModule,
    PrimaryLayoutComponent,
    ButtonComponent,
    RouterModule,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent {}
