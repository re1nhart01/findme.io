export interface IInterest {
    label: string;
    value: number | string;
}

export interface ApiInterests {
    id: number;
    user_hash_id: string;
    interests_id: string;
}

export type IInterests = Array<IInterest>;
