import { useRoomQuestions } from '@/http/use-room-questions'
import { QuestionItem } from '../question-item'

interface QuestionListProps {
  roomId: string
}

export const QuestionList = ({ roomId }: QuestionListProps) => {
  const { data } = useRoomQuestions(roomId)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl text-foreground">Q&A</h2>
      </div>

      {data?.map((question) => (
        <QuestionItem key={question.id} question={question} />
      ))}
    </div>
  )
}

// continue at 12:06
