export interface Command {
    config: {
        name: string;
        description: string;
    };
    run: (client: Client, msg: Message, args: string[]) => void;
}
