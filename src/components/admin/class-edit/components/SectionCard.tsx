import Card from "@/components/ui/Card";
import type { ReactNode } from "react";

type SectionCardProps = {
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  compact?: boolean;
};

export function SectionCard({
  title,
  description,
  action,
  children,
  className = "",
  contentClassName = "space-y-5",
  compact = false,
}: SectionCardProps) {
  return (
    <Card
      padding={compact ? "md" : "lg"}
      className={`cms-editor-card class-edit-section-card rounded-2xl ${contentClassName} ${className}`}
    >
      {title || action ? (
        <div className="cms-editor-card__head class-edit-section-card__head">
          {title ? (
            <div>
              <h3 className="class-edit-section-card__title">{title}</h3>
              {description ? (
                <p className="cms-editor-card__description">{description}</p>
              ) : null}
            </div>
          ) : (
            <div />
          )}
          {action}
        </div>
      ) : null}
      <div className="class-edit-section-card__body">{children}</div>
    </Card>
  );
}
