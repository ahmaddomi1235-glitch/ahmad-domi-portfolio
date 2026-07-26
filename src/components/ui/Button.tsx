import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "gold" | "onDark" | "ghostOnDark";

const variantClasses: Record<Variant, string> = {
  primary: "bg-navy text-ivory hover:bg-navy-surface border border-navy",
  secondary: "bg-transparent text-ink border border-line hover:border-navy",
  ghost: "bg-transparent text-ink hover:text-gold border border-transparent",
  // For use on a navy/dark background — do not combine with the variants above via className overrides.
  gold: "bg-gold text-navy hover:bg-gold/90 border border-gold",
  onDark: "bg-transparent text-ivory border border-ivory/30 hover:border-ivory",
  ghostOnDark: "bg-transparent text-ivory/80 hover:text-gold border border-transparent",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  icon?: ReactNode;
  onClick?: () => void;
};

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
  download?: string | boolean;
  type?: never;
};

type ButtonAsButton = CommonProps & {
  href?: undefined;
  type?: "button" | "submit";
  external?: never;
  download?: never;
};

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { children, variant = "primary", className, icon } = props;
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 min-h-[44px]",
    "hover:-translate-y-0.5",
    variantClasses[variant],
    className,
  );

  if ("href" in props && props.href) {
    if (props.external) {
      return (
        <a href={props.href} target="_blank" rel="noopener noreferrer" onClick={props.onClick} className={classes}>
          {children}
          {icon}
        </a>
      );
    }
    if (props.download) {
      return (
        <a href={props.href} download={props.download} onClick={props.onClick} className={classes}>
          {children}
          {icon}
        </a>
      );
    }
    return (
      <Link href={props.href} onClick={props.onClick} className={classes}>
        {children}
        {icon}
      </Link>
    );
  }

  return (
    <button type={props.type ?? "button"} onClick={props.onClick} className={classes}>
      {children}
      {icon}
    </button>
  );
}
