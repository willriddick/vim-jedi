import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Command, CommandSet, CommandDictionary } from '../command.model';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  private dataUrl = 'commands.json';
  private command_dictionary!: CommandDictionary;
  private set_size: number = 0;
  private previous_index: number = -1;
  categories_enabled: number = 0;

  public category_set = [
    { name: "Global", enabled: false },
    { name: "Cursor Movement", enabled: false },
    { name: "Insert Mode", enabled: false },
    { name: "Editing", enabled: false },
    { name: "Marking Text", enabled: false },
    { name: "Registers", enabled: false },
    { name: "Cut and Paste", enabled: false },
    { name: "Macros", enabled: false }
  ]

  constructor(private http: HttpClient) {
    this.http.get<CommandDictionary>(this.dataUrl)
    .subscribe((response) => {
      this.command_dictionary = response;
    });
  }

  categoryEnabled(category: number): boolean {
    return this.category_set[category].enabled;
  }

  addCategory(category: number): void {
    // If this category is not already in the set, add it
    if (!this.categoryEnabled(category)) {
      this.category_set[category].enabled = true;

      // Add the number of commands in this category to our set size
      this.categories_enabled++;
      this.set_size += this.command_dictionary.sets[category].commands.length;
    }
  }

  removeCategory(category: number): void {
    // If this category is in the set, filter it out
    if (this.categoryEnabled(category) && this.categories_enabled > 1) {
      this.category_set[category].enabled = false;
    
      // Remove the number of commands in this category from our set size
      this.categories_enabled--;
      this.set_size -= this.command_dictionary.sets[category].commands.length;
    }
  }

  getRandomNumber(max: number): number {
    return Math.floor(Math.random() * max);
  }

  getRandomCommand(): Command {
    // Create a null command as a placeholder
    let newCommand: Command = {
      command: ["NA"],
      description: "NA"
    }

    // If there are no sets selected, return the null command
    if (this.set_size <= 0) {
      return newCommand;
    }

    // Get random index, making sure not to get the previous one
    let index: number = this.getRandomNumber(this.set_size);
    while (index === this.previous_index) {
      index = this.getRandomNumber(this.set_size);
    }
    this.previous_index = index;

    // Loop through our category set to find index
    for (let i = 0; index >= 0 && i < this.category_set.length; i++) {
      // Only consider this category if it is enabled
      if (this.categoryEnabled(i)) {
        let command_set: CommandSet = this.command_dictionary.sets[i];
        let command_set_size: number = command_set.commands.length;

        // If our index falls within the current set 
        if (command_set_size > index) {
          // Grab our newCommand and exit the loop
          newCommand = command_set.commands[index];
          index = -1;
        } 
        else 
        {
          // Otherwise, our index is in a later set, continue
          index -= command_set_size;
        }
      }
    }
    return newCommand;
  }

  getCommands(category: number): Command[] {
    return this.command_dictionary.sets[category].commands 
  }
}
