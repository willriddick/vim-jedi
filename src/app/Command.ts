export interface Command {
    command: string[];
    description: string;
}

export interface Commands {
    general_commands: Command[];
    movement_commands: Command[];
    editing_commands: Command[];
}