export interface Command {
    command: string[];
    description: string;
}

export interface CommandSet {
    name: string;
    commands: Command[];
}

export interface CommandDictionary {
    sets: CommandSet[];
}