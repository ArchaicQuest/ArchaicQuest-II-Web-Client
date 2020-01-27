export interface Player {
    aid: string;
    id?: string;
    name: string;
    gender: string;
    race: string;
    className: string;
    inventory: any[];
    equipped: any;
    level: string;
    description: string;
    alignmentScore: number;
    totalExperience?: number;
    experience?: number;
    experienceToNextLevel?: number;
    stats: {
        hitPoints: number;
        manaPoints: number;
        movePoints: number;
    };
    maxStats: {
        hitPoints: number;
        manaPoints: number;
        movePoints: number;
    };
    attributes: any;
    maxAttributes: any;
    targetName?: string;
    armorRating: {
        armour: number;
        magic: number;
    };
    status: string;
    money?: {
        gold: number;
        silver: number;
        copper: number;
    };
    qffects?: any;
    config?: any;
}
