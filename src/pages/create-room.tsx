import { CreateRoomForm } from '@/components/create-room-form'
import { RoomList } from '@/components/room-list'

export function CreateRoomPage() {
  return (
    <section className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="grid-col-1 grid items-start gap-8">
          <CreateRoomForm />

          <RoomList />
        </div>
      </div>
    </section>
  )
}
