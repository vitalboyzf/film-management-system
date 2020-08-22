import { MovieService } from './../../services/MovieService';
import { IRootState } from './../reducers/index';
import { IMovie, ISearchCondition } from '../../services/CommonTypes';
import { IAction } from './MovieActionTypes';
import { ThunkAction } from 'redux-thunk'
import { SwitchType } from '../../components/MovieTable';
export type SaveMovieAction = IAction<"movie-save", {
  movies: IMovie[],
  total: number
}>
// action创建函数
export function saveMovesAction(movies: IMovie[], total: number): SaveMovieAction {
  return {
    type: "movie-save",
    payload: {
      movies,
      total
    }
  }
}
export type SetLoadingAction = IAction<"movie-setLoading", boolean>;
export function setLoadingAction(isLoading: boolean): SetLoadingAction {
  return {
    type: "movie-setLoading",
    payload: isLoading
  }
}
export type SetConditionAction = IAction<"movie-setCondition", ISearchCondition>;
export function setConditionAction(condition: ISearchCondition): SetConditionAction {
  return {
    type: "movie-setCondition",
    payload: condition
  }
}
export type DeleteAction = IAction<"movie-delete", string>;
export function deleteAction(id: string): DeleteAction {
  return {
    type: "movie-delete",
    payload: id
  }
}
export type MovieChangeSwitch = IAction<"movie-switch", {
  type: SwitchType,
  newVal: boolean,
  id: string
}>
export function changeSwitchAction(type: SwitchType, newVal: boolean, id: string): MovieChangeSwitch {
  return {
    type: "movie-switch",
    payload: {
      type,
      newVal,
      id
    }
  }
}
// 联合类型action类型
export type MovieActions = SaveMovieAction | SetConditionAction | MovieChangeSwitch | SetLoadingAction | DeleteAction;
export function fetchMovies(condition: ISearchCondition): ThunkAction<Promise<void>, IRootState, any, MovieActions> {
  return async (dispatch, getState) => {
    // 设置加载状态为true
    dispatch(setLoadingAction(true));
    // 设置查询条件
    dispatch(setConditionAction(condition));
    // 获取当前仓库查询状态
    const currentCondition = getState().movie.condition;
    // 获取新数据
    const resp = await MovieService.getByCondition(currentCondition);
    // 重新设置仓库存储
    dispatch(saveMovesAction(resp.data!, resp.count!))
    // 设置加载状态为false
    dispatch(setLoadingAction(false));
  }
}
export function deleteMovie(id: string): ThunkAction<Promise<void>, IRootState, any, MovieActions> {
  return async (dispatch) => {
    // 设置加载状态为true
    dispatch(setLoadingAction(true));
    // 删除接口中的movie数据
    await MovieService.delete(id);
    // 删除仓库中的movie数据
    dispatch(deleteAction(id))
    // 设置加载状态为false
    dispatch(setLoadingAction(false));
  }
}
export function changeSwitch(type: SwitchType, newVal: boolean, id: string)
  : ThunkAction<Promise<void>, IRootState, any, MovieActions> {
  return async (dispatch) => {
    dispatch(changeSwitchAction(type, newVal, id));
    await MovieService.edit(id, {
      [type]: newVal
    })
  }
}