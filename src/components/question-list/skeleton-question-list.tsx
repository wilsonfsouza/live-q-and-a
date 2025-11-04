import { SkeletonQuestionItem } from "../question-item/skeleton-question-item";

export function SkeletonQuestionList() {
  return (
    <div className="flex flex-col gap-3">
      <SkeletonQuestionItem />
      <SkeletonQuestionItem />
    </div>
  );
}
