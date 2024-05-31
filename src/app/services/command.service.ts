import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Commands, Command } from '../Command';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  private dataUrl = 'commands.json';

  private commands!: Commands;

  constructor(private http: HttpClient) {
    this.http.get<Commands>(this.dataUrl)
    .subscribe((response) => {
      this.commands = response;
    });
  }

  getRandomCommand(): Command {
    return this.commands.general_commands[0];
  }
}
