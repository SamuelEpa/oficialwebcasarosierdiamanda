"use client";

import Link from "next/link";
import type { ExperienceItem } from "@/data/types";

const OUTLINE_BTN = "class-detail__button class-detail__button--outline";

type Props = {
  item: ExperienceItem;
  enrollHref: string;
  enrollLabel: string;
  consultHref?: string;
  consultLabel: string;
  isGiftCard: boolean;
  added: boolean;
  defaultPrice: string;
  onAddGiftCard: () => void;
};

export function ClassDetailEnrollActions({
  enrollHref,
  enrollLabel,
  consultHref,
  consultLabel,
  isGiftCard,
  added,
  defaultPrice,
  onAddGiftCard,
  item,
}: Props) {
  const showEnroll = Boolean(enrollHref || isGiftCard);
  const showConsult = Boolean(consultHref);

  if (!showEnroll && !showConsult) return null;

  return (
    <div className="class-detail__actions">
      {showEnroll ? (
        isGiftCard ? (
          <>
            <button className={OUTLINE_BTN} type="button" onClick={onAddGiftCard}>
              {enrollLabel}
            </button>
            {added ? (
              <div className="gift-card-cart-feedback">
                <p className="gift-card-cart-feedback__message">
                  Gift card anadida al carrito.
                </p>
                <div className="gift-card-cart-feedback__summary">
                  <div className="gift-card-cart-feedback__row">
                    <span>Producto</span>
                    <strong>{item.title}</strong>
                  </div>
                  {defaultPrice ? (
                    <div className="gift-card-cart-feedback__row">
                      <span>Precio</span>
                      <strong>{defaultPrice}</strong>
                    </div>
                  ) : null}
                </div>
                <Link className={OUTLINE_BTN} href="/carrito">
                  Ver carrito
                </Link>
              </div>
            ) : null}
          </>
        ) : enrollHref ? (
          <a
            className={OUTLINE_BTN}
            href={enrollHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            {enrollLabel}
          </a>
        ) : null
      ) : null}

      {showConsult ? (
        <a
          className={OUTLINE_BTN}
          href={consultHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          {consultLabel}
        </a>
      ) : null}
    </div>
  );
}
