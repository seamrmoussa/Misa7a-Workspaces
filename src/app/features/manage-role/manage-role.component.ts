import { Component, inject, signal } from '@angular/core';
import { CallAdminDataService } from '../../core/service/call-admin-data.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MainButtonComponent } from '../../shared/ui/main-button/main-button.component';

export interface AdminRole {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  fullName: any;
  email: string;
  companyName: any;
  jobTitle: any;
  roles: string[];
  avatarBase64: any;
}

@Component({
  selector: 'app-manage-role',
  imports: [ReactiveFormsModule, MainButtonComponent],
  templateUrl: './manage-role.component.html',
  styleUrl: './manage-role.component.css',
})
export class ManageRoleComponent {
  private readonly callAdminDataService = inject(CallAdminDataService);
  private readonly toastrService = inject(ToastrService);
  private readonly fb = inject(FormBuilder);

  allAdminUsers = signal<AdminRole[]>([]);
  selectRoleValue = signal<string>('');
  startModalToUpdateRole = signal<boolean>(false);
  startModalToRemoveRole = signal<boolean>(false);
  roleUserIdToString = signal<string>('');
  openAssignUserRole = signal<boolean>(false);

  formAssignNewUserRole: FormGroup = this.fb.group({
    userRole: ['', Validators.required],
    userId: ['', Validators.required],
  });

  getAllUsersByRole(role: string) {
    if (role) {
      this.callAdminDataService.getRoleForUser(role).subscribe({
        next: (res) => {
          console.log(res);
          this.allAdminUsers.set(res.data);
        },
      });
    } else {
      this.toastrService.warning('Choose the role value first.');
    }
  }

  setRollOnButton(role: string) {
    const result = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase() + 's';
    this.selectRoleValue.set(result);
  }

  toggleCollapseAssignNewUserRole() {
    this.openAssignUserRole.update((v) => !v);
  }

  DoneAssignNewUserRole() {
    if (this.formAssignNewUserRole.valid) {
      this.callAdminDataService
        .updateRoleForUser(
          this.formAssignNewUserRole.get('userId')?.value,
          this.formAssignNewUserRole.get('userRole')?.value,
        )
        .subscribe({
          next: () => {
            this.toastrService.success(
              `The role has been updated to ${this.formAssignNewUserRole.get('userRole')?.value.toLowerCase()} role`,
            );
          },
          complete: () => {
            this.toggleCollapseAssignNewUserRole();
          },
        });
    } else {
      this.formAssignNewUserRole.markAllAsTouched;
      this.toastrService.warning('Please fill all fields.');
    }
  }

  openModalToUpdateRole(userId: number) {
    this.roleUserIdToString.set(userId.toString());
    this.startModalToUpdateRole.set(true);
  }

  doneRoleUserUpdateRole(newRole: string) {
    if (this.roleUserIdToString()) {
      this.callAdminDataService.updateRoleForUser(this.roleUserIdToString(), newRole).subscribe({
        next: () => {
          this.toastrService.success(`The role has been updated to ${newRole.toLowerCase()} role`);
        },
        complete: () => {
          this.closeUpdateModal();
        },
      });
    } else {
      this.toastrService.warning('Choose the role value first.');
    }
  }

  closeUpdateModal() {
    this.startModalToUpdateRole.set(false);
  }

  openModalToRemoveRole(userId: number) {
    this.roleUserIdToString.set(userId.toString());
    this.startModalToRemoveRole.set(true);
  }

  doneRoleUserRemoveRole(removeRole: string) {
    if (this.roleUserIdToString())
      this.callAdminDataService.removeRoleForUser(this.roleUserIdToString(), removeRole).subscribe({
        next: () => {
          this.toastrService.success(`The role has been removed ${removeRole.toLowerCase()} role`);
        },
        complete: () => {
          this.closeRemoveModal();
        },
      });
  }

  closeRemoveModal() {
    this.startModalToRemoveRole.set(false);
  }
}
