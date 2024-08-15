export default function Loading() {
  return (
    <div className="w-full flex flex-col items-center justify-center text-textColor1">
      <p className="text-[40px] font-bold">Loading...</p>
      <p className="text-[16px]">API da marvel está lenta, o retorno pode levar até 2 minutos.</p>
    </div>
  );
}
