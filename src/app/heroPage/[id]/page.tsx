import Loading from '@/components/Loading';
import CharacterDetails from '@/components/CharacterDetails';

export default async function HeroPage({ params }: any) {
   const { id } = params;
   const numericId = Number(id);

   if (!id) {
      return <Loading />;
   }

   return (
      <>
         <CharacterDetails id={numericId}/>
      </>
   );
};