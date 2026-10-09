import Link from "next/link";
import { ExternalLink, Mail, Phone } from "lucide-react";
import { accounts } from "@/config/site";
import { profile } from "@/content/profile";

/**
 * Contact / booking block for the commercial pages. Uses only contact methods that already exist on the site (the CV email and
 * phone shown in the contact section, and the card platform whose support team handles card bookings). It does not name
 * WhatsApp for the phone number because that is not confirmed, and it offers no checkout, calendar or payment form.
 */
export function ContactCta({ id, track, showPlatform = true }: { id?: string; track: string; showPlatform?: boolean }) {
  return (
    <aside id={id} className="rounded-2xl border border-gold/40 bg-gold/10 p-6">
      <p className="text-lg font-semibold">للاستفسار عن البطاقة أو حجز درس خصوصي، تواصل مع أحمد دومي.</p>
      <ul className="mt-4 flex flex-wrap gap-3 text-sm font-medium">
        <li>
          <a
            href={`mailto:${profile.email}`}
            data-track="contact_click"
            data-track-id={`${track}-email`}
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
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-navy/30 bg-white px-5 py-2 text-navy hover:border-navy"
          >
            <Phone size={16} aria-hidden="true" />
            <bdi dir="ltr">{profile.phoneDisplay}</bdi>
          </a>
        </li>
        {showPlatform && (
          <li>
            <a
              href={accounts.cardPlatform}
              target="_blank"
              rel="noopener noreferrer"
              data-track="card_click"
              data-track-id={`${track}-platform`}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-navy px-5 py-2 text-ivory hover:bg-navy-surface"
            >
              منصة البطاقات: أول فيديو مجانًا والحجز عبر الدعم
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          </li>
        )}
      </ul>
      <p className="mt-4 text-sm text-ink/75">
        بيانات التواصل الكاملة والحسابات الرسمية في{" "}
        <Link href="/about#contact" className="font-medium text-navy underline decoration-gold underline-offset-4">
          عن أحمد دومي
        </Link>
        .
      </p>
    </aside>
  );
}
