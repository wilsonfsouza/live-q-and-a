import { RoomList } from '@/components/room-list'

export function CreateRoomPage() {
  return (
    <section className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-2 items-start gap-8">
          <div />

          <RoomList />
        </div>
      </div>
    </section>
  )
}
