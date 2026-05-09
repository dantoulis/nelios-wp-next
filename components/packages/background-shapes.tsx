export function BackgroundShapes() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute left-1/2 top-[118px] h-[470px] w-[760px] -translate-x-1/2 rounded-b-[55%] rounded-t-[45%] bg-[#d8f6ff]" />
      <div className="absolute -left-[170px] top-[520px] h-[520px] w-[560px] rounded-[50%] bg-[#b9eee2]" />
      <div className="absolute -right-[180px] top-[430px] h-[640px] w-[520px] rounded-[50%] bg-[#d8f6ff]" />
      <div className="absolute -left-[120px] top-[2050px] hidden h-[720px] w-[650px] rounded-[50%] bg-[#b9eee2] md:block" />
      <div className="absolute -right-[190px] top-[2160px] hidden h-[760px] w-[600px] rounded-[50%] bg-[#d8f6ff] md:block" />
      <div className="absolute -left-[130px] top-[520px] h-[210px] w-[260px] rounded-[50%] bg-[#b9eee2] md:hidden" />
      <div className="absolute -right-[150px] top-[740px] h-[240px] w-[260px] rounded-[50%] bg-[#d8f6ff] md:hidden" />
    </div>
  );
}
