export default function Loading() {
  return (
    <div className="w-full flex flex-col items-center justify-center text-textColor1 pt-32 px-4">
      <p className="text-[40px] font-bold">Carregando...</p>
      <p className="text-[16px]">Aguarde, o retorno da API pode levar até 2 minutos.</p>
    </div>
  );
}
