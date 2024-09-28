import SetScreenSize from "@/components/setscreensize";

export default function GoodsLayout({
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
          minHeight: "calc(var(--vh, 1vh) * 100 - 1px)",
          overflowY: "auto",
          overflowX: "hidden",
          // overflow:"hidden",
          // backgroundColor:'#eee7d1'
          // backgroundColor:'#634f3e'
          backgroundColor: "#916b4d",
        }}
      >
        {children}
      </div>
    </>
  );
}
