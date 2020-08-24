export interface Race {
    id: number;
    name: string;
    description: string;
    playable: boolean;
    attributes: {
        attribute: {
            Strength: number;
            Dexterity: number;
            Constitution: number;
            Wisdom: number;
            Intelligence: number;
            Charisma: number;
        }
    }
}
