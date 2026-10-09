import Link from "next/link";
import { ExternalLink, Mail, Phone } from "lucide-react";
import { accounts } from "@/config/site";
import { priceInquiryCta } from "@/config/services";
import { profile } from "@/content/profile";

type Kind = "card" | "lessons";

const copy: Record<Kind, { heading: string; primary?: string; secondary: string }> = {
  card: {
    heading: "اطلب بطاقة أحمد دومي التعليمية أو استفسر عن محتوياتها",
    primary: "اطلب بطاقة أحمد دومي التعليمية",
    secondary: "استفسر عن البطاقة ومحتوياتها",
  },
  lessons: {
    heading: "احجز درس BTEC IT خصوصي",
    secondary: "تواصل لمعرفة التفاصيل",
  },
};

/**
 * Contact / booking block for the commercial pages. Uses only contact methods that already exist on the site (the CV email and
 * phone shown in the contact section, and the card platform whose support team handles card orders). It does not name
 * WhatsApp for the phone number because that is not confirmed, offers no checkout, calendar or payment form, and states no
 * price: the owner chose to keep prices unpublished, so the call to action invites a direct inquiry instead.
 */
export function ContactCta({ id, track, kind }: { id?: string; track: string; kind: Kind }) {
  const c = copy[kind];
  return (
    <aside id={id} className="rounded-2xl border border-gold/40 bg-gold/10 p-6">
      <p className="text-lg font-semibold">{c.heading}</p>
      <p className="mt-2 leading-8 text-ink/85">{priceInquiryCta}</p>
      <ul className="mt-4 flex flex-wrap gap-3 text-sm font-medium">
        {c.primary && (
          <li>
            <a
              href={accounts.cardPlatform}
              target="_blank"
              rel="noopener noreferrer"
              data-track="card_click"
              data-track-id={`${track}-order`}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-navy px-5 py-2 text-ivory hover:bg-navy-surface"
            >
              {c.primary}
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          </li>
        )}
        <li>
          <a
            href={`mailto:${profile.email}`}
            data-track="contact_click"
            data-track-id={`${track}-email`}
            aria-label={`${c.secondary} عبر البريد الإلكتروني`}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-navy/30 bg-white px-5 py-2 text-navy hover:border-navy"
          >
            <Mail size={16} aria-hidden="true" />
            <bdi dir="ltr">{profile.email}</bdi>
          </a>
        </li>
        <li>
          <a
            href={`tel:${profile.phone}`}
            data-track="contact_click"
            data-track-id={`${track}-phone`}
            aria-label={`${c.secondary} بالاتصال`}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-navy/30 bg-white px-5 py-2 text-navy hover:border-navy"
          >
            <Phone size={16} aria-hidden="true" />
            <bdi dir="ltr">{profile.phoneDisplay}</bdi>
          </a>
        </li>
      </ul>
      <p className="mt-4 text-sm text-ink/75">
        {c.secondary}: بيانات التواصل الكاملة والحسابات الرسمية في{" "}
        <Link href="/about#contact" className="font-medium text-navy underline decoration-gold underline-offset-4">
          عن أحمد دومي
        </Link>
        .
      </p>
    </aside>
  );
}
