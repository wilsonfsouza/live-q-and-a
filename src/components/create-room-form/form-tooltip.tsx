import { useEffect, useState } from "react";

interface TooltipContent {
  heading: string;
  items: string[];
}

interface FormTooltipProps {
  activeField: string | null;
  tooltipPosition: number;
  content: Record<string, TooltipContent>;
}

export function FormTooltip({
  activeField,
  tooltipPosition,
  content,
}: FormTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (
      activeField &&
      typeof window !== "undefined" &&
      window.innerWidth >= 960
    ) {
      setIsVisible(true);
    }
  }, [activeField]);

  if (!isMounted || typeof window === "undefined" || window.innerWidth < 960) {
    return null;
  }

  const currentContent = activeField ? content[activeField] : content.title;

  return (
    <div
      className={`hidden lg:block absolute right-0 w-[400px] transition-all duration-500 ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        top: `${tooltipPosition}px`,
      }}
    >
      <div className="bg-card rounded-lg p-6 border border-border">
        <h3 className="text-lg font-semibold text-primary mb-4">
          {currentContent?.heading}
        </h3>
        <ul className="space-y-3 text-sm text-muted-foreground">
          {currentContent?.items.map((item, index) => (
            <li key={index} className="flex items-baseline gap-2">
              <span className="text-primary mt-1">•</span>
              <span className="flex-1">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
