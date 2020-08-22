import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import MovieForm from '../components/MovieForm'
import { MovieService } from '../services/MovieService';
import { IMovie } from '../services/CommonTypes';
import { message } from 'antd';
interface IParams {
  id: string
}

const EditMovie: React.FC<RouteComponentProps<IParams>> = function (props) {
  const [movie, setMovie] = useState<IMovie | undefined>(undefined)
  useEffect(() => {
    MovieService.getById(props.match.params.id).then(movie => {
      setMovie(movie)
    })
  }, [props.match.params.id])
  return <>
    {movie ? <MovieForm
      initValue={movie}
      onSubmit={async (movie) => {
        const resp = await MovieService.edit(props.match.params.id, movie)
        if (resp.status === 200) {
          message.success("修改成功", 1, () => {
            props.history.push('/movie')
          })
        } else {
          message.error("修改失败", 1)
        }
      }} /> : null}
  </>
}
export default EditMovie
