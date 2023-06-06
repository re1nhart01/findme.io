export interface IInterest {
    label: string;
    value: number | string;
}

export interface ApiInterests {
    id: number;
    user_hash_id: string;
    interests_id: number;
}

export type IInterests = Array<IInterest>;
