import SetScreenSize from "@/components/setscreensize";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SetScreenSize />
      <div
        style={{
          height: "100%",
          minHeight: "calc(var(--vh, 1vh) * 100)",
          overflowY: "auto",
          backgroundColor: "#eee7d1",
          display: "flex",
          alignItems: "center",
        }}
      >
        {children}
      </div>
    </>
  );
}
