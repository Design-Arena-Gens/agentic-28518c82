interface KpiCardProps {
  label: string;
  value: string;
  deltaLabel?: string;
  variant?: "default" | "success" | "warning" | "danger" | "info";
}

export default function KpiCard({
  label,
  value,
  deltaLabel,
  variant = "default"
}: KpiCardProps) {
  return (
    <div className={`panel ${variantClass(variant)}`}>
      <span className="stat__label">{label}</span>
      <span className="stat__value">{value}</span>
      {deltaLabel && <span className="stat__delta">{deltaLabel}</span>}
    </div>
  );
}

function variantClass(variant: KpiCardProps["variant"]) {
  switch (variant) {
    case "success":
      return "panel--highlight";
    case "warning":
      return "";
    case "danger":
      return "";
    case "info":
      return "";
    default:
      return "";
  }
}
