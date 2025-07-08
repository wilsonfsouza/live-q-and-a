import { Navigate, useParams } from 'react-router-dom'

type RoomParams = {
  roomId: string
}

export function RoomPage() {
  const params = useParams<RoomParams>()

  if (!params.roomId && params.roomId === '') {
    return <Navigate replace to="/" />
  }

  return <div>Create details {params.roomId}</div>
}
