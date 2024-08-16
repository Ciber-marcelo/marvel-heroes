'use client'

import { fetchCharacterById } from "@/services/marvelService";
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react";
import Loading from "../Loading";
import Footer from "../Footer";
import CharacterInfo from "../CharacterInfo";

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

         <CharacterInfo 
            character={character} 
            onClick={() => handleFavorite(character)}
            fav={favorites.some(fav => fav.id === character.id ? true : false)}
         />

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
