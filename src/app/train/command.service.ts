import { Injectable } from '@angular/core';
import { Command } from './command';

@Injectable({
    providedIn: 'root',
})
export class CommandService {

    general_commands = [
        new Command('Open help', ':h'),
        new Command('Save a file', ':w'),
        new Command('Quit a file', ':q'),
        new Command('Save and quit a file', ':wq'),
        new Command('Quit a file without saving', ':q!'),
        new Command('Start visual mode', 'v'),
        new Command('Start insert mode', 'i'),
        new Command('Edit a file called \'test.txt\'', 'vim test.txt'),
        new Command('Create and edit a file called \'two.java\'', 'vim two.java'),
    ]
 

    move_commands = [
        new Command('Move up', 'k'),
        new Command('Move down', 'j'),
        new Command('Move left', 'h'),
        new Command('Move right', 'l'),
        new Command('Jump forward to start of a word', 'w'),
        new Command('Jump forward to start of a big word', 'W'),
        new Command('Jump backward to start of a word', 'b'),
        new Command('Jump backward to start of a big word', 'B'),
        new Command('Jump forward to end of a word', 'e'),
        new Command('Jump forward to end of a big word', 'E'),
        new Command('Jump backward to end of a word', 'ge'),
        new Command('Jump backward to end of a big word', 'gE'),
        new Command('Jump to matching character pair: () {} []', '%'),
        new Command('Jump to start of the line', '0'),
        new Command('Jump to end of the line', '$'),
        new Command('Jump to first non-blank character on a line', '^'),
        new Command('Jump to first line in document', 'gg'),
        new Command('Jump to last line in document', 'G'),
        new Command('Jump to next paragraph', '}'),
        new Command('Jump to previous paragraph', '{'),
        new Command('Go to line 26', '26gg'),
    ]

    insert_mode_commands = [
        new Command('Insert before the cursor', 'i'),
        new Command('Insert at the beginning of the line', 'I'),
        new Command('Insert after the cursor', 'a'),
        new Command('Insert at the end of the line', 'A'),
        new Command('Insert a new line below the current line', 'o'),
        new Command('Insert a new line above the current line', 'O'),
        new Command('Insert at the end of a the word', 'ea'),
    ];
    
    cut_paste_commands = [
        new Command('Yank a line', 'yy'),
        new Command('Paste after the cursor', 'p'),
        new Command('Paste before the curosr', 'P'),
        new Command('Cut a line', 'dd'),
        new Command('Cut a word', 'dw'),
        new Command('Cut from the cursor to the end of the line', 'D'),
        new Command('Yank from the cursor to the end of the line', 'Y'),
        new Command('Yank 2 lines', 'y2y'),
        new Command('Cut 2 lines', 'd2d'),
    ]

    change_replace_commands = [
        new Command('Replace a single character', 'r'),
        new Command('Replace until esc is pressed', 'R'),
        new Command('Change an entire line', 'cc'),
        new Command('Undo', 'u'),
        new Command('Restore', 'U'),
        new Command('Change a word', 'cw'),
        new Command('Indent a line', '>>'),
        new Command('De-indent a line', '<<'),
    ]

    search_commands = [
        new Command('Search for the word \'test\'', '/test'),
        new Command('Repeat serach in same direction', 'n'),
        new Command('Repeat search in opposite direction', 'N'),
        new Command('Replace all occurences of \'old\' with \'new\'', ':%/old/new/g'),
    ]

    settings = [
        {name: "General", enabled: false, style: "button-1", array: this.general_commands},
        {name: "Movement", enabled: false, style: "button-1", array: this.move_commands},
        {name: "Insert Mode", enabled: false, style: "button-1", array: this.insert_mode_commands},
        {name: "Cut-Paste", enabled: false, style: "button-1", array: this.cut_paste_commands},
        {name: "Change-Replace", enabled: false, style: "button-1", array: this.change_replace_commands},
        {name: "Search", enabled: false, style: "button-1", array: this.search_commands},
    ]


    getActiveSettings = (): Array<string> => {
        let settings: Array<string> = [];
        for (let i = 0; i < this.settings.length; i++) {
            if (this.settings[i]["enabled"]) {
                settings.push(this.settings[i]['name']);
            }
        }

        if (settings.length === 0) {
            for (let i = 0; i < this.settings.length; i++) {
                settings.push(this.settings[i]['name']);
            }
        }

        return settings;
    }


    clearSettings = (): void => {
        for (let i = 0; i < this.settings.length; i++) {
            this.settings[i]["enabled"] = false;
            this.settings[i]["style"] = "button-1";
        }
    }


    enableSettingTrain = (index: number): void => {
        this.settings[index]["enabled"] = !this.settings[index]["enabled"];
        for (let i = 0; i < this.settings.length; i++) {
            if (this.settings[i]["enabled"]) this.settings[i]["style"] = "button-1 button-toggle";
            else this.settings[i]["style"] = "button-1";
        }
    }


    enableSettingLearn = (index: number): void => {
        this.clearSettings();
        this.settings[index]["enabled"] = true;
        this.settings[index]["style"] = "button-1 button-toggle";
    }



    previous_index: number = -1;
    private getRandomIndex = (array: Array<Command>): number => {
        return Math.floor(Math.random() * array.length);
    }


    /*
     * getNew
     *
     * Gets a new command for the train componnet
     */ 
    public getNew = (): Command => {
        // Add in the appropriate Commands based upon the enabled settings
        let sampling: Array<Command> = [];
        for (let i = 0; i < this.settings.length; i++) {
            if (this.settings[i]["enabled"]) {
                sampling = sampling.concat(this.settings[i]["array"]);
            }
        }

        // If sampling is empty, add all commands...
        if (sampling.length === 0) {
            for (let i = 0; i < this.settings.length; i++) {
                sampling = sampling.concat(this.settings[i]["array"]);
            }
        }
       
        // Get a new index
        let index: number = this.getRandomIndex(sampling); 

        // If we have more than one possible command,
        // verify that we do not repeat a command
        if (sampling.length > 1) {
            while (index === this.previous_index) {
                index = this.getRandomIndex(sampling);
            }
        }

        // Set our previous index and return the Command at index
        this.previous_index = index;
        return sampling[index]; 
    }


    score: number = 0;
    setScore = (score: number): void => { this.score = score; }
    getScore = (): number => { return this.score; }
}