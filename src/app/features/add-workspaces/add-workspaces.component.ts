import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CallAdminDataService } from '../../core/service/call-admin-data.service';
import { ToastrService } from 'ngx-toastr';
import { WorkspaceData } from '../../workspace-data.interface';

export interface SpaceDataType {
  id: number;
  typeCode: string;
  typeName: string;
  iconName: string;
  isActive: string;
  createdOn: string;
  createdBy: string;
  description: string;
}
@Component({
  selector: 'app-add-workspaces',
  imports: [ReactiveFormsModule],
  templateUrl: './add-workspaces.component.html',
  styleUrl: './add-workspaces.component.css',
})
export class AddWorkspaceComponent {
  private readonly fb = inject(FormBuilder);
  private readonly toastrService = inject(ToastrService);
  private readonly callAdminDataService = inject(CallAdminDataService);

  workspaces = signal<WorkspaceData[]>([]);
  workspacesDataUpdate = signal<WorkspaceData[]>([]);
  workspacesSendUpdate = signal<object>({});
  addIsOpen = signal(false);
  updateIsOpen = signal(false);
  allSpacesType = signal<SpaceDataType[]>([]);
  totalSpacesType = signal<SpaceDataType[]>([]);

  workspaceForm: FormGroup = this.fb.group({
    workspaceName: ['', [Validators.required, Validators.minLength(3)]],
    workspaceCode: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(50)]],
    capacity: [2, [Validators.required, Validators.min(2)]],
    priceHourly: [200, [Validators.required, Validators.min(200)]],
    priceDaily: [1000, [Validators.required, Validators.min(1000)]],
    priceMonthly: [10000, [Validators.required, Validators.min(10000)]],
    currency: ['EGP', Validators.required],
    workspaceTypeId: [0, Validators.required],
    floorNumber: [0],
    roomNumber: ['', [Validators.required, Validators.minLength(2)]],
    minBookingHrs: [1, [Validators.required, Validators.min(1)]],
    maxBookingHrs: [12, Validators.required],
  });

  workspaceFormUpdate: FormGroup = this.fb.group({
    workspaceName: ['', [Validators.required, Validators.minLength(3)]],
    workspaceCode: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(50)]],
    capacity: [2, [Validators.required, Validators.min(2)]],
    priceHourly: [200, [Validators.required, Validators.min(200)]],
    priceDaily: [1000, [Validators.required, Validators.min(1000)]],
    priceMonthly: [10000, [Validators.required, Validators.min(10000)]],
    currency: ['EGP', Validators.required],
    workspaceTypeId: [0, Validators.required],
    floorNumber: [0],
    roomNumber: ['', [Validators.required, Validators.minLength(2)]],
    minBookingHrs: [1, [Validators.required, Validators.min(1)]],
    maxBookingHrs: [12, Validators.required],
  });

  toggleCollapseAdd() {
    this.addIsOpen.update((v) => !v);
    if (this.addIsOpen()) {
      this.getAllSpaceType();
    }
  }

  toggleCollapseUpdate() {
    this.updateIsOpen.update((v) => !v);
    if (this.updateIsOpen()) {
      this.getWorkspaces();
    }
  }

  onSubmitNewWorkspace() {
    if (this.workspaceForm.valid) {
      this.callAdminDataService.createNewWorkspace(this.workspaceForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.toastrService.success('A new meeting room has been created');
          this.workspaceForm.reset();
          this.toggleCollapseAdd();
        },
      });
    } else {
      this.workspaceForm.markAllAsTouched();
    }
  }

  getWorkspaces() {
    this.callAdminDataService.getAllWorkspace().subscribe({
      next: (res) => {
        this.workspacesDataUpdate.set(res.data);
      },
      complete: () => {
        this.getAllSpaceType();
      },
    });
  }

  setFormDataForUpdate(workspaceId: string) {
    const idToNumber = Number(workspaceId);

    const selectedItem: any = this.workspacesDataUpdate().find((item) => item.id === idToNumber);

    if (selectedItem) {
      this.workspacesSendUpdate.set(selectedItem);
      this.workspaceFormUpdate.patchValue({ ...selectedItem, workspaceTypeId: selectedItem.id });
    }
  }

  updateWorkspaces(id: string) {
    if (this.workspaceFormUpdate.valid) {
      this.callAdminDataService.updateOneWorkspace(id, this.workspaceFormUpdate.value).subscribe({
        next: (res) => {
          this.toastrService.success('Workspace data has been updated');
          this.toggleCollapseUpdate();
        },
      });
    } else {
      this.workspaceFormUpdate.markAllAsTouched();
    }
  }

  getAllSpaceType() {
    this.callAdminDataService.getAllTypeSpace().subscribe({
      next: (res) => {
        this.totalSpacesType.set(res.data);
        this.allSpacesType.set([...this.totalSpacesType()]);
      },
    });
  }
}
