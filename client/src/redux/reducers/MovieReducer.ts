import { MovieActions, SaveMovieAction, DeleteAction, SetConditionAction, SetLoadingAction, MovieChangeSwitch } from './../actions/MovieAction';
import { ISearchCondition, IMovie } from "../../services/CommonTypes";
type Reducer<S, A> = (prevState: S, action: A) => S;
export type IMovieCondition = Required<ISearchCondition>
export interface IMovieState {
  data: IMovie[];
  condition: IMovieCondition;
  total: number;
  isLoading: boolean;
}
const defaultState: IMovieState = {
  data: [],
  condition: {
    key: "",
    page: 1,
    limit: 10
  },
  total: 0,
  isLoading: false
}
const saveMovie: Reducer<IMovieState, SaveMovieAction> = function (state, action) {
  return Object.assign({}, state, {
    data: action.payload.movies,
    total: action.payload.total
  })
}
const setCondition: Reducer<IMovieState, SetConditionAction> = function (state, action) {
  return {
    ...state,
    condition: {
      ...state.condition,
      ...action.payload,
    }
  }
}
const setLoading: Reducer<IMovieState, SetLoadingAction> = function (state, action) {
  return {
    ...state,
    isLoading: action.payload
  }
}
const deleteMovie: Reducer<IMovieState, DeleteAction> = function (state, action) {
  return {
    ...state,
    data: state.data.filter(m => m._id !== action.payload)
  }
}
const changeSwitch: Reducer<IMovieState, MovieChangeSwitch> = function (state, action) {
  // 获取到对应id的movie对象 state.data为movies数组
  const movie = state.data.find(d => d._id === action.payload.id);
  // 如果没有找到对应movie，直接返回原始状态
  if (!movie) return state;
  // 克隆一个新的对象，内容和movie相同
  const newMovie = { ...movie };
  // 将新对象的 【isComing|isHot|isClassic】修改为传入的newVal:boolean
  newMovie[action.payload.type] = action.payload.newVal;
  // 映射仓库data电影数组
  const newDate = state.data.map(d => {
    // 如果某一项的id等于传入的id
    if (d._id === action.payload.id) {
      // 这一项就是需要修改的，返回newMovie
      return newMovie;
    } else {
      // 否则不变
      return d;
    }
  })
  return {
    ...state,
    data: newDate
  }
}
export default function (state = defaultState, action: MovieActions) {
  switch (action.type) {
    case "movie-save":
      return saveMovie(state, action);
    case "movie-setCondition":
      return setCondition(state, action);
    case "movie-setLoading":
      return setLoading(state, action);
    case "movie-delete":
      return deleteMovie(state, action);
    case "movie-switch":
      return changeSwitch(state, action);
    default:
      return state;
  }
}