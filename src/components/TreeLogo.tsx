type Props = {
  className?: string;
  /** id prefix so multiple instances don't clash when animated */
  idPrefix?: string;
};

/** Hand-drawn golden tree — VDL's mark. Strokes are targetable for draw-on animations. */
export default function TreeLogo({ className, idPrefix = "tree" }: Props) {
  return (
    <svg
      viewBox="0 0 200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      data-tree={idPrefix}
    >
      <g
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        className="tree-branch"
      >
        <path d="M100 228 C100 190 97 158 100 128" />
        <path d="M100 154 C82 140 66 124 56 98" />
        <path d="M100 162 C120 148 136 132 146 102" />
        <path d="M100 128 C94 104 88 88 78 68" />
        <path d="M100 128 C108 102 116 84 128 62" />
        <path d="M56 98 C50 84 47 72 46 56" />
        <path d="M146 102 C152 86 155 72 156 56" />
        <path d="M78 68 C74 58 72 50 72 40" />
        <path d="M128 62 C132 52 134 44 135 34" />
        <path d="M58 228 H142" />
      </g>
      <g fill="currentColor" className="tree-leaves">
        <circle cx="46" cy="48" r="7" />
        <circle cx="72" cy="32" r="8" />
        <circle cx="102" cy="22" r="9" opacity="0.9" />
        <circle cx="135" cy="27" r="7" />
        <circle cx="156" cy="48" r="6" />
        <circle cx="30" cy="72" r="5" opacity="0.7" />
        <circle cx="170" cy="74" r="5" opacity="0.7" />
        <circle cx="60" cy="18" r="4" opacity="0.6" />
        <circle cx="148" cy="14" r="4" opacity="0.6" />
        <circle cx="100" cy="48" r="5" opacity="0.75" />
      </g>
    </svg>
  );
}
