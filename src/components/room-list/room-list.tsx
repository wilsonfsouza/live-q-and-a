import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useRooms } from '@/http/use-rooms'
import { dayjs } from '@/lib/dayjs'

export const RoomList = () => {
  const { data, isLoading } = useRooms()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Most recent rooms</CardTitle>
        <CardDescription>
          Shortcuts to the most recent rooms created
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {isLoading && (
          <p className="text-muted-foreground text-sm">Loading rooms...</p>
        )}
        {data?.map((room) => (
          <Link
            className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent"
            key={room.id}
            to={`/rooms/${room.id}`}
          >
            <div className="flex flex-1 flex-col gap-1">
              <h3 className="font-medium">{room.name}</h3>

              <div className="flex items-center gap-2">
                <Badge className="text-xs" variant="secondary">
                  {dayjs(room.createdAt).fromNow()}
                </Badge>

                <Badge className="text-xs" variant="secondary">
                  {room.questionsCount} question(s)
                </Badge>
              </div>
            </div>

            <span className="flex items-center gap-1 text-sm">
              Join
              <ArrowRight className="size-3" />
            </span>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
