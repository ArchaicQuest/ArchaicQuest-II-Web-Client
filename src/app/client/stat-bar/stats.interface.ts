export interface Stats {
    current: number,
    max: number
}

export interface PlayerStats {
    hp: Stats,
    mana: Stats,
    moves: Stats,
    exp: Stats
};