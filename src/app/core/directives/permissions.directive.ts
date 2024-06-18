import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RbacService } from '../services/rbac.service';

@Directive({
  selector: '[appPermissions]',
  standalone: true
})
export class PermissionsDirective {
  @Input('appPermissions') permissions: string[] = [];
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService,
    private rbacService: RbacService
  ) { }

  ngOnInit() {
    this.checkPermission();
  }

  private checkPermission() {
    const user = this.authService.user; // Get the current user from your authentication service
    if (this.rbacService.checkPermission(this.permissions, user)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
