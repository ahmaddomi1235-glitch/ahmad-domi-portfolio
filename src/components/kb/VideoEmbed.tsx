import { Play } from "lucide-react";
import type { VideoNode } from "@/lib/kb/types";

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

/**
 * Privacy-enhanced YouTube embed (youtube-nocookie.com), lazily loaded so it never blocks first paint.
 * The watch link below keeps the video reachable without JavaScript or iframes.
 */
export function VideoEmbed({ video, className }: { video: VideoNode; className?: string }) {
  return (
    <figure className={className}>
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-line bg-navy">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
          title={video.conceptTitle_ar}
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-muted">
        <span>
          {video.conceptTitle_ar} · {formatDuration(video.duration)}
        </span>
        <a
          href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
          target="_blank"
          rel="noopener noreferrer"
          data-track="video_click"
          data-track-id={video.youtubeId}
          className="inline-flex items-center gap-1.5 font-medium text-ink underline decoration-gold underline-offset-4"
        >
          <Play size={14} aria-hidden="true" />
          شاهد على YouTube
        </a>
      </figcaption>
    </figure>
  );
}
