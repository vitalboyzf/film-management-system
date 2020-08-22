export interface IMovie {
  _id?: string;
  name: string;
  types: string[];
  areas: string[];
  timeLong: number;
  isHot: boolean;
  isComing: boolean;
  isClassic: boolean;
  description?: boolean;
  poster?: string;
}
export interface IReturnResult<T> {
  status: number;
  msg: string;
  data?: T[];
  error?: any;
  count?: number;
}
export interface ISearchCondition {
  page?: number;
  limit?: number;
  key?: string;
}