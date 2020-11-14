export interface Quest {
    description: string;

    Id: number;
    Title: string;
    Type: any;
    Description: string;
    Area: string;
    MobsToKill: [{ Name: string; Current: number; Count: number }]
    ItemsToGet: [{ Name: string; Current: number; Count: number }]
    ExpGain: number;
    GoldGain: number;
    ItemGain: [any];
    Completed: boolean;
};