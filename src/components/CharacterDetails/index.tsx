'use client'

import { fetchCharacterById } from "@/services/marvelService";
import { formatName } from "@/utils/formatName"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react";
import Loading from "../Loading";
import InfoCard from "../InfoCard";
import Footer from "../Footer";

export default function CharacterDetails({ id }: { id: number }) {
   const [character, setCharacter] = useState<any>([]);
   const [loading, setLoading] = useState(true);
   const [fav, setFav] = useState(false);
   const [favorites, setFavorites] = useState<any[]>([]);

   //Verifico se existe favoritos no localStorage
   useEffect(() => {
      const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]') as number[];
      
      setFavorites(storedFavorites);
      
   }, []);

   const toggleFavorite = (character: any) => {
      let updatedFavorites: number[];

      if (favorites.some(fav => fav.id === character.id)) {
         // Remove o personagem 
         updatedFavorites = favorites.filter(fav => fav.id !== character.id);
         setFav(false)
      } else {
         // Adiciona o personagem
         updatedFavorites = [...favorites, character];
         setFav(true)
      }

      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
   };

   //callback para o clique do botão
   const handleFavorite = (character: any) => {
      toggleFavorite(character);
   };

   const getCharacter = async () => {
      setLoading(true);
      try {
         const data = await fetchCharacterById(id);
         setCharacter(data);
         setLoading(false);
      } catch (error) {
         console.log('Falha ao buscar personagens, erro: ', error);
         setLoading(false);
      }
   };

   useEffect(() => {
      getCharacter();
   }, []);

   if (loading) {
      return <Loading />;
   }

   return (
      <div className='flex flex-col bg-color3 gap-16'>
         <div className="container flex pt-16">
            <Link href={'/'}>
               <Image
                  className='w-[163px] h-[60px]'
                  width={327}
                  height={120}
                  src={'/assets/logo/Group@3x.png'}
                  alt="logo"
                  priority={true}
               />
            </Link>
         </div>

         <div className='container flex flex-wrap justify-between items-center gap-4'>
            <div className='flex flex-col w-[350px] gap-8'>
               <div className="flex justify-between items-center">
                  <p className="text-textColor1 text-[34px] font-bold uppercase">
                     {formatName(character.name)}
                  </p>
                  <div onClick={() => handleFavorite(character)}>
                     <Image
                        className='w-[30px] h-[30px] cursor-pointer'
                        width={30}
                        height={30}
                        src={fav ? '/assets/icones/heart/Path@3x.png' : '/assets/icones/heart/Path Copy 2@3x.png'}
                        alt="image hero"
                        priority={true}
                     />
                  </div>
               </div>

               <h1 className="min-h-[200px] text-textColor2 text-[16px]">
                  {character.description ? character.description : 'Sem descrição'}
               </h1>

               <div className='flex items-center gap-16'>
                  <InfoCard image={'/assets/icones/book/Group@1,5x.svg'} text="Quadrinhos" num={character.comics.available} />
                  <InfoCard image={'/assets/icones/video/Shape@1,5x.svg'} text="Filmes" num={character.series.available} />
               </div>

               {/* <div className="flex gap-2 text-textColor1 text-[14px]">
                  <p className="font-bold">Último quadrinho:</p>
                  <p>{character.modified}</p>
               </div> */}

               <div className="flex gap-2 text-textColor1 text-[14px]">
                  <p className="font-bold">Último quadrinho:</p>
                  <p>{character.comics.available > 0 ? '27 mar. 2021' : 'Sem quadrinhos'}</p>
               </div>
            </div>

            <Image
               className='w-[500px] h-[500px] object-cover'
               width={500}
               height={500}
               src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
               alt="image hero"
               priority={true}
            />
         </div>

         <div className="container flex flex-col gap-8 pb-16">
            <p className=" text-[20px] text-textColor1 font-bold">Últimos lançamentos</p>
            <div className="flex flex-wrap gap-x-20 gap-y-10">
               {character.comics.length === 0 ?
                  character.comics.items.slice(0, 10).map((comic: any, i: number) => (
                     <div key={i} className="flex flex-col w-[103px] gap-4">
                        <Image
                           className='w-[103px] h-[150px]'
                           width={103}
                           height={150}
                           src={'/comic.png'}
                           alt="image comic"
                           priority={true}
                        />
                        <p className="w-[103px] h-[40px] break-words overflow-hidden text-textColor1 text-[14px] font-bold">
                           {comic.name}
                        </p>
                     </div>

                  ))
                  :
                  <div className="">Sem lançamentos</div>
               }
            </div>
         </div>
         <Footer />
      </div>
   );
}
