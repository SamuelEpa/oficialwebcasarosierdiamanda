"use client";

import type { ExperienceItem } from "@/data/types";
import { useClassDetailEnroll } from "../../hooks/useClassDetailEnroll";
import { useClassDetailViewModel } from "../../hooks/useClassDetailViewModel";
import { ClassDetailBodySections } from "./ClassDetailBodySections";
import { ClassDetailEnrollActions } from "./ClassDetailEnrollActions";
import { ClassDetailIntro } from "./ClassDetailIntro";
import { ClassDetailLeadCopy } from "./ClassDetailLeadCopy";
import { ClassDetailMediaColumn } from "./ClassDetailMediaColumn";
import { ClassDetailPriceDuration } from "./ClassDetailPriceDuration";

type Props = {
  item: ExperienceItem;
  titleLevel?: "h1" | "h2";
};

export function ClassDetailSection({ item, titleLevel = "h1" }: Props) {
  const viewModel = useClassDetailViewModel(item);
  const enroll = useClassDetailEnroll(item);

  return (
    <section className="class-detail section">
      <div className="container class-detail__container">
        <div className="class-detail__layout">
          <ClassDetailMediaColumn
            item={item}
            showPaymentMethods={viewModel.showPaymentMethods}
            hasSideContent={viewModel.hasSideContent}
            calendarLabels={viewModel.calendarLabels}
          />

          <section className="class-detail__content-column">
            <ClassDetailIntro item={item} titleLevel={titleLevel} />
            <ClassDetailLeadCopy item={item} />
            <ClassDetailPriceDuration item={item} />
            <ClassDetailEnrollActions
              item={item}
              enrollHref={viewModel.enrollHref}
              enrollLabel={viewModel.enrollLabel}
              consultHref={viewModel.consultHref}
              consultLabel={viewModel.consultLabel}
              isGiftCard={enroll.isGiftCard}
              added={enroll.added}
              defaultPrice={enroll.defaultPrice}
              onAddGiftCard={enroll.addGiftCard}
            />
            <ClassDetailBodySections
              item={item}
              showIncluded={viewModel.showIncluded}
              hasLearningContent={viewModel.hasLearningContent}
              hasParticipationContent={viewModel.hasParticipationContent}
              showProgram={viewModel.showProgram}
              programItems={viewModel.programItems}
            />
          </section>
        </div>
      </div>
    </section>
  );
}
