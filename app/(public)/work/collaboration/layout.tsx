import SetScreenSize from "@/components/setscreensize";
import "../../globals.css";

export default function CollaborationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SetScreenSize />
      <div
        style={{
          height: "calc(var(--vh, 1vh) * 100)",
          backgroundColor: "#916b4d",
        }}
      >
        {children}
      </div>
    </>
  );
}
