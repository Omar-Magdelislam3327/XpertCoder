/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Injectable } from '@angular/core';
import { Projects } from '../modules/projects';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectsApiService {
  private baseUrl = "http://xpert.runasp.net/api/Projects";
  private baseUrlTwo = "http://xpert.runasp.net/api/Features";
  constructor(private http: HttpClient) {
  }
  getProjects(pageIndex: number = 1,
    pageSize: number = 12) {
    return this.http.get<any[]>(`${this.baseUrl}?pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }
  getProjectById(id: number): any {
    return this.http.get<Projects>(`${this.baseUrl}/${id}`);
  }
  addProject(project: FormData): any {
    return this.http.post(this.baseUrl, project);
  }
  addFeature(feature: any) {
    return this.http.post(`${this.baseUrlTwo}`, feature);
  }
  updateProject(id: number, project: any): any {
    return this.http.put(`${this.baseUrl}/${id}`, project);
  }
  deleteProject(id: number): any {
    return this.http.delete(`${this.baseUrl}?projectId=${id}`, { responseType: "JSON" as "text" });
  }
}
