import { Component, inject, OnInit, signal, PLATFORM_ID } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CallAdminDataService } from '../../core/service/call-admin-data.service';
import { WorkspaceData } from '../../workspace-data.interface';
import { isPlatformBrowser } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-all-workspace',
  imports: [ReactiveFormsModule],
  templateUrl: './all-workspace.component.html',
  styleUrl: './all-workspace.component.css',
})
export class AllWorkspaceComponent implements OnInit {
  private readonly toastrService = inject(ToastrService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  private readonly callAdminDataService = inject(CallAdminDataService);

  workspaces = signal<WorkspaceData[]>([]);
  totalWorkspaces = signal<WorkspaceData[]>([]);
  workspaceIdToDelete = signal<string>('');
  deleteIsOpen = signal(false);
  isModalOpen = signal(false);
  roomFilterById = signal<boolean>(false);

  roomById: FormControl = new FormControl('', Validators.required);

  ngOnInit(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      this.getWorkspaces();
    }
  }

  getWorkspaces() {
    this.callAdminDataService.getAllWorkspace().subscribe({
      next: (res) => {
        console.log(res);
        this.totalWorkspaces.set(res.data);
        this.workspaces.set(this.totalWorkspaces());
      },
    });
  }

  getRoomById() {
    if (this.roomById.valid) {
      this.callAdminDataService.getOneWorkspace(this.roomById.value).subscribe({
        next: (res) => {
          this.workspaces.set([res.data]);
          this.roomFilterById.set(true);
        },
      });
    }
  }

  toggleCollapseDelete() {
    this.deleteIsOpen.update((v) => !v);
  }

  openModal(id: string) {
    if (!id) {
      this.toastrService.warning('Please select a workspace first');
      return;
    }
    this.workspaceIdToDelete.set(id);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  deleteSelectWorkspace() {
    if (!this.workspaceIdToDelete()) {
      this.toastrService.warning('Please select a workspace first');
      return;
    }
    this.callAdminDataService.deleteOneWorkspace(this.workspaceIdToDelete()).subscribe({
      next: (res) => {
        this.toastrService.success('The workspace has been deleted');
        this.closeModal();
      },
      complete: () => {
        this.toggleCollapseDelete();
        this.getWorkspaces();
      },
    });
  }

  restFindBookById() {
    this.roomFilterById.set(false);
    this.roomById.reset();
    this.getWorkspaces();
  }
}
