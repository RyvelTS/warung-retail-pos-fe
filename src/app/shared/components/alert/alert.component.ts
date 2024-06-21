import { Component, Input } from '@angular/core';
import { AngularMaterialModule } from '../../modules/angular-material/angular-material.module';
import { CommonModule } from '@angular/common';

export interface AlertConfig {
  type: 'success' | 'warning' | 'danger' | 'info',
  message: string
}

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  @Input() config: AlertConfig = {
    type: 'info',
    message: ''
  }
}
