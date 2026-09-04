type MarketplaceHeroVideoProps = {
  label: string;
  caption: string;
};

export function MarketplaceHeroVideo({ label, caption }: MarketplaceHeroVideoProps) {
  return (
    <figure className="marketplace-hero-visual" aria-labelledby="marketplace-hero-visual-title">
      <div className="marketplace-video-frame">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/cie-marketplace-hero-poster.webp"
          aria-describedby="marketplace-hero-visual-caption"
        >
          <source src="/cie-marketplace-hero.webm" type="video/webm" media="(min-width: 561px) and (prefers-reduced-motion: no-preference)" />
          <source src="/cie-marketplace-hero.mp4" type="video/mp4" media="(min-width: 561px) and (prefers-reduced-motion: no-preference)" />
        </video>
        <div className="marketplace-video-edge" aria-hidden="true"><span>LIVE SIGNAL</span><i /><b>CIE</b></div>
      </div>
      <figcaption id="marketplace-hero-visual-caption">
        <strong id="marketplace-hero-visual-title">{label}</strong>
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}
