import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Command, CommandSet, CommandDictionary } from '../Command';

enum Category {
  general,
  movement,
  editing
}

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  private dataUrl = 'commands.json';

  private command_dictionary!: CommandDictionary;

  private category_set: Category[] = [];

  private set_size: number = 0;

  constructor(private http: HttpClient) {
    this.http.get<CommandDictionary>(this.dataUrl)
    .subscribe((response) => {
      this.command_dictionary = response;
    });
  }

  categoryInSet(category: Category): boolean {
    return (this.category_set.find(value => value === category) !== undefined)
  }

  addCategory(category: Category): void {
    // If this category is not already in the set, add it
    if (!this.categoryInSet(category)) {
      this.category_set.push(category);

      // Add the number of commands in this category to our set size
      this.set_size += this.command_dictionary.sets[category].commands.length;

      // Log for debugging
      console.log(`Added: ${category}`);
      console.log(`Current set: ${this.category_set}`);
      console.log(`Set size: ${this.set_size}`);
    }
  }

  removeCategory(category: Category): void {
    // If this category is in the set, filter it out
    if (this.categoryInSet(category)) {
      this.category_set = this.category_set.filter(value => value !== category);
    
      // Remove the number of commands in this category from our set size
      this.set_size -= this.command_dictionary.sets[category].commands.length;

      // Log for debugging
      console.log(`Removed: ${category}`);
      console.log(`Current set: ${this.category_set}`);
      console.log(`Set size: ${this.set_size}`);
    }
  }

  getRandomCommand(): Command {
    // Grab the first command defined as a placeholder value
    let newCommand: Command = this.command_dictionary.sets[0].commands[0];

    // Loop through our category set
    for (let i = 0; i < this.category_set.length; i++) {
      let category: Category = this.category_set[i];
      let command_set_size: number = this.command_dictionary.sets[category].commands.length;
    }
    return newCommand;
  }
}
