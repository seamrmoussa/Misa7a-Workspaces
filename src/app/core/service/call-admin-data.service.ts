import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CallAdminDataService {
  private readonly http = inject(HttpClient);

  // ! For new workspace

  createNewWorkspace(data: object): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/v1/workspaces`, data);
  }

  getAllWorkspace(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/v1/workspaces`);
  }

  getOneWorkspace(workspaceId: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/v1/workspaces/${workspaceId}`);
  }

  updateOneWorkspace(workspaceId: string, data: object): Observable<any> {
    return this.http.put(`${environment.baseUrl}/api/v1/workspaces/${workspaceId}`, data);
  }

  deleteOneWorkspace(workspaceId: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/api/v1/workspaces/${workspaceId}`);
  }

  // ! For new space Type

  createNewTypeSpace(data: object): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/v1/workspace-types`, data);
  }

  getAllTypeSpace(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/v1/workspace-types`);
  }

  getOneTypeSpace(workspaceId: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/v1/workspace-types/${workspaceId}`);
  }

  updateOneTypeSpace(workspaceId: string, data: object): Observable<any> {
    return this.http.put(`${environment.baseUrl}/api/v1/workspace-types/${workspaceId}`, data);
  }

  deleteOneTypeSpace(workspaceId: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/api/v1/workspace-types/${workspaceId}`);
  }

  getRoleForUser(role: string): Observable<any> {
    const params = new HttpParams().set('role', role);
    return this.http.get(`${environment.baseUrl}/api/v1/admin/roles/users`, { params });
  }

  updateRoleForUser(userId: string, newRole: string): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/v1/admin/roles/${userId}/assign`, newRole);
  }

  removeRoleForUser(userId: string, removeRole: string): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/v1/admin/roles/${userId}/remove`, removeRole);
  }
}
