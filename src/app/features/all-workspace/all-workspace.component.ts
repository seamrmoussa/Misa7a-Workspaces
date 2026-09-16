import { Component, inject, OnInit, signal, PLATFORM_ID } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CallAdminDataService } from '../../core/service/call-admin-data.service';
import { WorkspaceData } from '../../workspace-data.interface';

@Component({
  selector: 'app-all-workspace',
  imports: [],
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

  ngOnInit(): void {
    this.getWorkspaces();
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
}
