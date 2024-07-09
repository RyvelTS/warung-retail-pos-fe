import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RbacService } from '../services/rbac.service';

@Directive({
  selector: '[appPermissions]',
  standalone: true
})
export class PermissionsDirective {
  private permissions: string[] = [];
  private elseTemplateRef: TemplateRef<any> | null = null;
  private hasView = false;

  @Input() set appPermissions(permissions: string[]) {
    this.permissions = permissions;
    this.checkPermission();
  }

  @Input() set appPermissionsElse(templateRef: TemplateRef<any> | null) {
    this.elseTemplateRef = templateRef;
    this.checkPermission();
  }

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
    const hasPermission = this.rbacService.checkPermission(this.permissions, user);

    if (hasPermission) {
      if (!this.hasView) {
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasView = true;
      }
    } else {
      if (this.elseTemplateRef && !this.hasView) {
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this.elseTemplateRef);
        this.hasView = true;
      } else if (!this.elseTemplateRef) {
        this.viewContainer.clear();
        this.hasView = false;
      }
    }
  }
}
