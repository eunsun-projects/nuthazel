import SetScreenSize from "@/components/setscreensize";
import "../globals.css";

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SetScreenSize />
      <div
        style={{
          width: "100%",
          height: "100%",
          minHeight: "calc(var(--vh, 1vh) * 100)",
          overflow: "hidden",
          backgroundImage: "url(/assets/contact/contact_background.webp)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {children}
      </div>
    </>
  );
}
