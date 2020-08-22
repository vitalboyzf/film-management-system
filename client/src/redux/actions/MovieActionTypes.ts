export interface IAction<S extends string, P> {
  type: S;
  payload: P;
}