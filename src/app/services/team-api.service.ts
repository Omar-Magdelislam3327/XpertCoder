import { Injectable } from '@angular/core';
import { Team } from '../modules/team';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeamApiService {
  private baseUrl = 'http://xpert.runasp.net/api/Teams';
  constructor(private http: HttpClient) {
  }
  getTeams() {
    return this.http.get<Team[]>(`${this.baseUrl}/GetAllTeamMembers`);
  }
  getTeamById(id: number) {
    return this.http.get<Team>(`${this.baseUrl}/GetMemberDetails/${id}`);
  }
  addTeam(team: any) {
    return this.http.post<Team>(`${this.baseUrl}/AddNewMember`, team);
  }
  updateTeam(id: number, team: FormData) {
    return this.http.put(`${this.baseUrl}/EditMember/${id}`, team);
  }
  deleteTeam(id: number) {
    return this.http.delete(`${this.baseUrl}/DeleteMember/${id}`);
  }
}
