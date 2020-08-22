import React from 'react'
import MovieForm from '../components/MovieForm'
import { MovieService } from '../services/MovieService'
import { message } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router-dom'

function AddMovie(props: RouteComponentProps) {
  return (
    <div>
      <MovieForm onSubmit={async (movie) => {
        const result = await MovieService.add(movie)
        if (result.status === 200) {
          message.success("添加成功", 1, () => {
            props.history.push('/movie')
          })
        } else {
          message.error("添加失败");
        }
      }}></MovieForm>
    </div>
  )
}
export default withRouter(AddMovie)
