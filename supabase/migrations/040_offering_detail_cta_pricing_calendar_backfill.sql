-- Migration 040: Backfill CTA, pricing and calendar defaults in offerings.details.class.
-- Aligns legacy rows with CMS defaults and offerings.price for queryable pricing JSON.

update public.offerings o
set
  details = jsonb_set(
    coalesce(o.details, '{}'::jsonb),
    '{class}',
    coalesce(o.details -> 'class', '{}'::jsonb)
      || case when o.details -> 'class' ? 'showConsultCta' then '{}'::jsonb else jsonb_build_object('showConsultCta', true) end
      || case when o.details -> 'class' ? 'showEnrollCta' then '{}'::jsonb else jsonb_build_object('showEnrollCta', true) end
      || case when o.details -> 'class' ? 'ctaConsultLabel' then '{}'::jsonb else jsonb_build_object(
        'ctaConsultLabel',
        case when o.type = 'gift_card' then 'Comprar' else 'Consultar' end
      ) end
      || case when o.details -> 'class' ? 'ctaEnrollLabel' then '{}'::jsonb else jsonb_build_object(
        'ctaEnrollLabel',
        case when o.type = 'gift_card' then 'Anadir al carrito' else 'Inscribirme' end
      ) end
      || case when o.details -> 'class' ? 'ctaConsultHref' then '{}'::jsonb else jsonb_build_object(
        'ctaConsultHref',
        coalesce(nullif(o.details #>> '{class,ctaHref}', ''), '')
      ) end
      || case when o.details -> 'class' ? 'ctaEnrollHref' then '{}'::jsonb else jsonb_build_object('ctaEnrollHref', '') end
      || case when o.details -> 'class' ? 'pricing' then '{}'::jsonb else jsonb_build_object(
        'pricing',
        case
          when o.price is not null then jsonb_build_array(
            jsonb_build_object(
              'description', 'Precio base',
              'price', o.price,
              'order', 0
            )
          )
          else '[]'::jsonb
        end
      ) end
      || case when o.details -> 'class' ? 'showCalendarLabels' then '{}'::jsonb else jsonb_build_object('showCalendarLabels', false) end
      || case when o.details -> 'class' ? 'calendarLabels' then '{}'::jsonb else jsonb_build_object('calendarLabels', '[]'::jsonb) end
      || case when o.details -> 'class' ? 'calendarLabelsTitle' then '{}'::jsonb else jsonb_build_object(
        'calendarLabelsTitle', 'PRÓXIMAS FECHAS DEL WORKSHOP'
      ) end
      || case when o.details -> 'class' ? 'calendarLabelsDescription' then '{}'::jsonb else jsonb_build_object(
        'calendarLabelsDescription',
        'Consulta las próximas fechas disponibles del workshop durante el año y elige la edición que mejor se adapte a tu calendario. Cada convocatoria incluye información sobre horarios, plazas disponibles y detalles de reserva.'
      ) end,
    true
  ),
  updated_at = now()
where o.type in ('class', 'workshop', 'experience', 'gift_card')
  and o.deleted_at is null
  and (
    not (coalesce(o.details -> 'class', '{}'::jsonb) ? 'showConsultCta')
    or not (coalesce(o.details -> 'class', '{}'::jsonb) ? 'showEnrollCta')
    or not (coalesce(o.details -> 'class', '{}'::jsonb) ? 'pricing')
    or not (coalesce(o.details -> 'class', '{}'::jsonb) ? 'calendarLabels')
    or not (coalesce(o.details -> 'class', '{}'::jsonb) ? 'showCalendarLabels')
  );
