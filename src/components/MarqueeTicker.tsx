'use client';

// Visueel scheidingselement tussen secties — horizontale ticker
const ITEMS = [
  'FOTOGRAFIE',
  'EVENTS',
  'CORPORATE',
  'BRANDING',
  'PORTRET',
  'PRODUCTEN',
  'FOTOGRAFIE',
  'EVENTS',
  'CORPORATE',
  'BRANDING',
  'PORTRET',
  'PRODUCTEN',
];

// 4× dupliceren voor naadloze loop (translateX -50% = precies 1 volledige set)
const TICKER = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

export default function MarqueeTicker() {
  return (
    <div
      className="overflow-hidden border-y border-white/[0.06] bg-primary-dark select-none"
      aria-hidden="true"
    >
      <div className="flex animate-marquee md:animate-marquee-desktop whitespace-nowrap py-[18px] md:py-5 3xl:py-6">
        {TICKER.map((word, i) => (
          <span key={i} className="inline-flex items-center shrink-0">
            <span className="text-[0.55rem] md:text-[0.65rem] 2xl:text-xs 3xl:text-sm font-body uppercase tracking-[0.55em] text-white/20 px-7 md:px-10 3xl:px-14 4xl:px-18">
              {word}
            </span>
            <span className="text-accent/20 text-[0.5rem] md:text-xs">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
