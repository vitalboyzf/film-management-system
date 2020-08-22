import MovieTable, { IPropsEvents } from '../components/MovieTable'
import { connect } from 'react-redux'
import { IRootState } from '../redux/reducers'
import { Dispatch } from 'react'
import * as MovieAction from '../redux/actions/MovieAction'

function mapStateToProps(state: IRootState) {
  return state.movie
}
function mapDispatchToProps(dispatch: Dispatch<any>): IPropsEvents {
  return {
    onLoad() {
      dispatch(MovieAction.fetchMovies({}));
    },
    onSwitchChange(type, open, id) {
      dispatch(MovieAction.changeSwitch(type, open, id));
    },
    async onDelete(id) {
      dispatch(MovieAction.deleteMovie(id));
    },
    onChange(newPage) {
      dispatch(MovieAction.fetchMovies({
        page: newPage
      }))
    },
    onKeyChange(newKey) {
      dispatch(MovieAction.setConditionAction({
        key: newKey
      }))
    },
    onSearch() {
      dispatch(MovieAction.fetchMovies({
        page: 1
      }))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MovieTable)