import MarketingStatCard from "@/components/admin/marketing/MarketingStatCard";

type OfferingsCategoryStatsProps = {
  total: number;
  published: number;
  draft: number;
  typeLabel: string;
  isFiltered: boolean;
};

export function OfferingsCategoryStats({
  total,
  published,
  draft,
  typeLabel,
  isFiltered,
}: OfferingsCategoryStatsProps) {
  return (
    <div className="offerings-category-stats" aria-label={`Resumen de ${typeLabel.toLowerCase()}s`}>
      <MarketingStatCard
        label={isFiltered ? "Resultados filtrados" : `Total ${typeLabel.toLowerCase()}s`}
        value={total}
        icon="inventory_2"
      />
      <MarketingStatCard
        label="Publicados"
        value={isFiltered ? "—" : published}
        icon="check_circle"
      />
      <MarketingStatCard
        label="Borradores"
        value={isFiltered ? "—" : draft}
        icon="edit_note"
      />
    </div>
  );
}
