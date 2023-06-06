export interface ITag {
  label: string;
  value: number | string;
}

export interface ApiTags {
  id: number;
  user_hash_id: string;
  tag_label: string;
}

export type ITags = Array<ITag>;
