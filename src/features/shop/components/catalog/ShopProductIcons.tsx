import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const defaults: IconProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true,
};

export function ShopIconEye(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function ShopIconBag(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path
        d="M6 7h12l-1 14H7L6 7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9 7V5a3 3 0 0 1 6 0v2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ShopIconHeart({
  filled,
  strokeWidth = 1.5,
  ...props
}: IconProps & { filled?: boolean; strokeWidth?: number }) {
  if (filled) {
    return (
      <svg {...defaults} {...props}>
        <path
          d="M12 20s-7-4.6-9-8.2C1.2 8.8 3.4 5 7 5c2 0 3.2 1.2 4 2.4C11.8 6.2 13 5 15 5c3.6 0 5.8 3.8 4 6.8-2 3.6-9 8.2-9 8.2Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg {...defaults} {...props}>
      <path
        d="M12 20s-7-4.6-9-8.2C1.2 8.8 3.4 5 7 5c2 0 3.2 1.2 4 2.4C11.8 6.2 13 5 15 5c3.6 0 5.8 3.8 4 6.8-2 3.6-9 8.2-9 8.2Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
