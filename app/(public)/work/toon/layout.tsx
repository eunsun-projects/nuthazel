import "../../react-carousel.es.css";

export default function ToonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      id="toonbackground"
      style={{
        height: "calc(var(--vh, 1vh) * 100)",
        backgroundPosition: "center",
        backgroundImage: "url(/assets/toon/background/toon_wall_floor2.webp)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {children}
    </div>
  );
}
