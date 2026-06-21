import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420',
    });
    return this.http.get(`/api/v1/workspaces`, { headers });
  }

  getOneWorkspace(workspaceId: string): Observable<any> {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420',
    });
    return this.http.get(`/api/v1/workspaces/${workspaceId}`, { headers });
  }

  updateOneWorkspace(workspaceId: string, data: object): Observable<any> {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420',
    });
    return this.http.put(`/api/v1/workspaces/${workspaceId}`, data, { headers });
  }

  deleteOneWorkspace(workspaceId: string): Observable<any> {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420',
    });
    return this.http.delete(`/api/v1/workspaces/${workspaceId}`, { headers });
  }

  // ! For new space Type

  createNewTypeSpace(data: object): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/v1/workspace-types`, data);
  }

  getAllTypeSpace(): Observable<any> {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420',
    });
    return this.http.get(`/api/v1/workspace-types`, { headers });
  }

  getOneTypeSpace(workspaceId: string): Observable<any> {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420',
    });
    return this.http.get(`/api/v1/workspace-types/${workspaceId}`, { headers });
  }

  updateOneTypeSpace(workspaceId: string, data: object): Observable<any> {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420',
    });
    return this.http.put(`/api/v1/workspace-types/${workspaceId}`, data, { headers });
  }

  deleteOneTypeSpace(workspaceId: string): Observable<any> {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420',
    });
    return this.http.delete(`/api/v1/workspace-types/${workspaceId}`, { headers });
  }

  getRoleForUser(role: string): Observable<any> {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': '69420',
    });
    const params = new HttpParams().set('role', role);
    return this.http.get(`/api/v1/admin/roles/users`, { params, headers });
  }

  updateRoleForUser(userId: string, newRole: string): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/v1/admin/roles/${userId}/assign`, newRole);
  }

  removeRoleForUser(userId: string, removeRole: string): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/v1/admin/roles/${userId}/remove`, removeRole);
  }
}
