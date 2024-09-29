import SetScreenSize from "@/components/setscreensize";

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SetScreenSize />
      <div
        style={{
          height: "100%",
          minHeight: "calc(var(--vh, 1vh) * 100)",
          overflowY: "auto",
        }}
      >
        {children}
      </div>
    </>
  );
}
