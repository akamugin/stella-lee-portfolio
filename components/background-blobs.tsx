function seeded(step: number) {
  const x = Math.sin(step * 999) * 10000;
  return x - Math.floor(x);
}

const hearts = Array.from({ length: 90 }, (_, id) => ({
  id,
  top: `${seeded(id + 301) * 98}%`,
  left: `${seeded(id + 401) * 98}%`,
  delay: seeded(id + 501) * 3.5,
  duration: 4 + seeded(id + 601) * 4,
  size: 12 + Math.floor(seeded(id + 701) * 16),
  opacity: 0.52 + seeded(id + 801) * 0.42
}));

export function BackgroundBlobs() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {hearts.map((heart) => (
        <span
          key={`bg-heart-${heart.id}`}
          className="global-heart absolute select-none text-white"
          style={{
            top: heart.top,
            left: heart.left,
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            textShadow: "0 0 14px rgba(255,255,255,0.95), 0 0 4px rgba(255,255,255,0.9)"
          }}
        >
          ♡
        </span>
      ))}
      <div className="blob blob-a" />
      <div className="blob blob-b" />
      <div className="blob blob-c" />
      <div className="grid-overlay" />
    </div>
  );
}
