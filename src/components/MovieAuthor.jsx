import React from 'react'
import { Link } from 'react-router-dom'

const MovieAuthor = ({item}) => {
  return (
    <Link to={`/detail/${item.id}`} state={{ from: item }}>
      <div className="max-w-[130px] w-[130px]">
        <img className="w-[130px] h-[190px] " src={item.poster_path} />
        <p className="text-center">{item?.title}</p>
      </div>
    </Link>
  )
}

export default MovieAuthor