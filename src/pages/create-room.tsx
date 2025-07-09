import { useQuery } from '@tanstack/react-query'
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
import { dayjs } from '@/lib/dayjs'

type GetRoomsAPIResponse = Array<{
  id: string
  name: string
  questionCount: number
  createdAt: string
}>

export function CreateRoomPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['get-rooms'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3333/rooms')
      const result: GetRoomsAPIResponse = await response.json()

      return result
    },
  })
  return (
    <section className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-2 items-start gap-8">
          <div />

          <Card>
            <CardHeader>
              <CardTitle>Most recent rooms</CardTitle>
              <CardDescription>
                Shortcuts to the most recent rooms created
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {isLoading && (
                <p className="text-muted-foreground text-sm">
                  Loading rooms...
                </p>
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
                        {room.questionCount} question(s)
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
        </div>
      </div>
    </section>
  )
}
