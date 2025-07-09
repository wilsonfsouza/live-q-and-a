export type GetRoomsResponse = {
  results: Array<{
    id: string
    name: string
    questionsCount: number
    createdAt: string
  }>
  meta: {
    resultsCount: number
    totalCount: number
  }
}
