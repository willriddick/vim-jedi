import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commands, Command } from '../Command';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  private dataUrl = 'assets/commands.json'; 

  private commands!: Commands;

  constructor(private http: HttpClient) {
    this.getCommands().subscribe(data => {
      this.commands = data;
    })
  }

  private getCommands(): Observable<Commands> {
    return this.http.get<Commands>(this.dataUrl);
  }

  getRandomCommand(): Command {
    return this.commands.general_commands[0];
  }
}
