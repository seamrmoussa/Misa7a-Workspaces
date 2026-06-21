import {
  Component,
  ElementRef,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
  viewChild,
  ViewChild,
} from '@angular/core';
import { CallAdminDataService } from '../../core/service/call-admin-data.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe, isPlatformBrowser } from '@angular/common';

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
  selector: 'app-space-type',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './space-type.component.html',
  styleUrl: './space-type.component.css',
})
export class SpaceTypeComponent implements OnInit {
  private readonly callAdminDataService = inject(CallAdminDataService);
  private readonly fb = inject(FormBuilder);
  private readonly toastrService = inject(ToastrService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);

  dataType = signal<object | null>(null);
  toggleCollapseNewType = signal<boolean>(false);
  allSpacesType = signal<SpaceDataType[]>([]);
  spacesTypeDataUpdate = signal<SpaceDataType[]>([]);
  totalSpacesType = signal<SpaceDataType[]>([]);
  oneSpacesType = signal<SpaceDataType[]>([]);
  toggleCollapseModalUpdateType = signal<boolean>(false);
  toggleCollapseModalDeleteType = signal<boolean>(false);
  workSpaceSelectEle = viewChild<ElementRef>('workSpaceSelection');
  typeIdToUpdate = signal<string>('');
  typeIdToDelete = signal<string>('');

  spaceTypeForm: FormGroup = this.fb.group({
    typeCode: ['', [Validators.required, Validators.minLength(5)]],
    typeName: ['', [Validators.required, Validators.minLength(5)]],
    iconName: ['', [Validators.required, Validators.minLength(5)]],
    isActive: ['', Validators.required],
    description: ['', [Validators.required, Validators.minLength(10)]],
  });

  spaceTypeUpdateForm: FormGroup = this.fb.group({
    typeCode: ['', [Validators.required, Validators.minLength(5)]],
    typeName: ['', [Validators.required, Validators.minLength(5)]],
    iconName: ['', [Validators.required, Validators.minLength(5)]],
    isActive: ['', Validators.required],
    description: ['', [Validators.required, Validators.minLength(10)]],
  });

  ngOnInit(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      this.getAllSpaceType();
    }
  }

  toggleCollapseOpenNewType() {
    this.toggleCollapseNewType.update((v) => !v);
  }

  startTypeUpdateModal(id: number, data: SpaceDataType) {
    this.typeIdToUpdate.set(id.toString());
    this.toggleCollapseModalUpdateType.set(true);
    this.spaceTypeUpdateForm.patchValue(data);
  }

  updateSpaceType() {
    if (this.spaceTypeUpdateForm.valid) {
      this.callAdminDataService
        .updateOneTypeSpace(this.typeIdToUpdate(), this.spaceTypeUpdateForm.value)
        .subscribe({
          next: () => {
            this.toastrService.success('A Space type has been updated');
          },
          complete: () => {
            this.toggleCollapseModalUpdateType.set(false);
            this.getAllSpaceType();
          },
        });
    } else {
      this.spaceTypeUpdateForm.markAllAsTouched();
    }
  }

  toggleCollapseModalUpdateClose() {
    this.toggleCollapseModalUpdateType.set(false);
  }

  startTypeDeleteModal(id: number) {
    this.typeIdToDelete.set(id.toString());
    this.toggleCollapseModalDeleteType.set(true);
  }

  doneTypeModalDelete() {
    this.callAdminDataService.deleteOneTypeSpace(this.typeIdToDelete()).subscribe({
      next: () => {
        this.toastrService.success('A Space type has been deleted');
      },
      complete: () => {
        this.toggleCollapseModalDeleteType.set(false);
        this.getAllSpaceType();
      },
    });
  }

  toggleCollapseModalDeleteClose() {
    this.toggleCollapseModalDeleteType.set(false);
  }

  createNewTypeSpace() {
    if (this.spaceTypeForm.valid) {
      this.callAdminDataService.createNewTypeSpace(this.spaceTypeForm.value).subscribe({
        next: () => {
          this.toastrService.success('A new type of workspace has been created');
          this.toggleCollapseOpenNewType();
        },
        complete: () => {
          this.spaceTypeForm.reset();
          this.getAllSpaceType();
        },
      });
    } else {
      this.spaceTypeForm.markAllAsTouched();
    }
  }

  getOneTypeSpace(id: string) {
    if (id) {
      this.callAdminDataService.getOneTypeSpace(id).subscribe({
        next: (res) => {
          this.oneSpacesType.set([res.data]);
          this.allSpacesType.set([...this.oneSpacesType()]);
        },
      });
    } else {
      this.toastrService.warning('Please select the space type.');
    }
  }

  resetAllSpaceView() {
    this.allSpacesType.set([...this.totalSpacesType()]);
    const selectElement = this.workSpaceSelectEle()?.nativeElement;
    if (selectElement) {
      selectElement.value = '';
      this.oneSpacesType.set([]);
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
