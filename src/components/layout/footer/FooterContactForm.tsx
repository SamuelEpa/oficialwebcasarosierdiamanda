"use client";

import { memo, useMemo } from "react";
import type { PublicFooterContactFormProps } from "@/lib/cms/public-footer-model";
import {
  layoutFooterFormFieldNodes,
  sortedVisibleFooterFormFields,
} from "@/lib/layout/footer-contact-form/fields";
import { useFooterContactFormSubmit } from "@/lib/layout/footer-contact-form/useFooterContactFormSubmit";
import { FooterContactFormField } from "./FooterContactFormField";

function FooterContactFormComponent({
  config,
  preview = false,
}: {
  config: PublicFooterContactFormProps;
  preview?: boolean;
}) {
  const fields = useMemo(() => sortedVisibleFooterFormFields(config.form), [config.form]);
  const nodes = useMemo(() => layoutFooterFormFieldNodes(fields), [fields]);
  const { state, message, handleSubmit, isSubmitting } = useFooterContactFormSubmit(config, preview);

  const body = (
    <>
      {nodes.map((node) =>
        node.kind === "row" ? (
          <div className="contact-form__row" key={node.key}>
            <FooterContactFormField field={node.fields[0]} preview={preview} />
            <FooterContactFormField field={node.fields[1]} preview={preview} />
          </div>
        ) : (
          <FooterContactFormField key={node.key} field={node.field} preview={preview} />
        ),
      )}
      <button
        className="contact-form__submit"
        type={preview ? "button" : "submit"}
        disabled={preview || isSubmitting}
      >
        {isSubmitting ? "Enviando..." : "Enviar"}
      </button>
      {message ? (
        <p className={`contact-form__status contact-form__status--${state}`} role="status">
          {message}
        </p>
      ) : null}
    </>
  );

  if (preview) {
    return (
      <div className="contact-form" aria-label="Formulario de contacto del footer">
        {body}
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {body}
    </form>
  );
}

export const FooterContactForm = memo(FooterContactFormComponent);
