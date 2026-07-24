import { SectionCard } from "@/components/admin/class-edit/components/SectionCard";

export function FooterFixedLinksNotice() {
  return (
    <SectionCard compact className="cms-footer-fixed-links-card">
      <div className="cms-footer-fixed-links">
        <span className="material-symbols-outlined" aria-hidden="true">
          lock
        </span>
        <div>
          <h3 className="class-edit-section-card__title">Enlaces fijos</h3>
          <p className="cms-editor-card__description">
            Administración y Política de privacidad se mantienen visibles y no son editables desde esta pantalla.
          </p>
        </div>
      </div>
    </SectionCard>
  );
}
