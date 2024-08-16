'use client'

import { useState, useEffect } from 'react';
import { fetchCharacters } from '../../services/marvelService';
import CharacterCard from '../CharacterCard';
import Image from "next/image"
import Filter from '../Filter';
import Search from '../Search';
import Loading from '../Loading';
import Footer from '../Footer';

export default function CharacterList() {
  const [characters, setCharacters] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState(false);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);

  //Verifico se existe favoritos no localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]') as number[];
    setFavorites(storedFavorites);
  }, []);

  const getCharacters = async () => {
    setLoading(true);
    try {
      const data = await fetchCharacters(search);
      setCharacters(data);
      setLoading(false);
    } catch (error) {
      console.log('Falha ao buscar personagens, erro: ', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCharacters();
  }, []);

  const keyPress = (e: any) => {
    if (e.keyCode === 13) {
      getCharacters();
    }
  }

  const sortCharacters = () => {
    if (sort) {
      const sortedChar = [...characters].sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
      });
      setCharacters(sortedChar)

      const sortedFav = [...favorites].sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
      });
      setFavorites(sortedFav)

      setSort(false)
    } else {
      const sorted = [...characters].sort((a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
        return 0;
      });
      setCharacters(sorted)

      const sortedFav = [...favorites].sort((a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
        return 0;
      });
      setFavorites(sortedFav)

      setSort(true)
    }
  }

  const toggleFavorite = (character: any) => {
    let updatedFavorites: number[];

    if (favorites.some(fav => fav.id === character.id)) {
      // Remove o personagem 
      updatedFavorites = favorites.filter(fav => fav.id !== character.id);
    } else {
      // Adiciona o personagem
      updatedFavorites = [...favorites, character];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  //callback para o clique do botão
  const handleFavorite = (character: any) => {
    toggleFavorite(character);
  };

  const handleFilterChange = () => {
    setShowFavorites(!showFavorites);
  };

  const displayedCharacters = showFavorites ? favorites : characters;

  return (
    <div>
      <div className='container flex flex-col justify-center items-center my-10'>
        <Image
          className='w-[327px] h-[120px]'
          width={327}
          height={120}
          src={'/assets/logo/Group@3x.png'}
          alt="logo"
          priority={true}
        />
        <p className='text-textColor1 text-[34px] font-bold'>
          EXPLORE O UNIVERSO
        </p>
        <p className='text-textColor3 text-[14px]'>
          Mergulhe no dominio deslumbrante de todos os personagens clássicos
          que você ama - e aqueles que você descobrirá em breve!
        </p>
      </div>

      <div className='container flex justify-center mb-10'>
        <Search onChange={(e: any) => setSearch(e.target.value)} onKeyDown={keyPress} disabled={loading} />
      </div>

      {loading ?
        <Loading />
        :
        <div>
          <div className='container flex flex-wrap justify-between items-center gap-8 mb-10'>
            <p className='text-textColor3'>
              Encontrados {showFavorites ? favorites.length : characters.length} heróis
            </p>
            <div className='flex flex-wrap gap-8'>
              <Filter
                image='/assets/icones/heroi/noun_Superhero_2227044.png'
                text='Ordenar por nome - A/Z'
                onClick={sortCharacters}
              />

              <Filter
                image='/assets/icones/heart/Path.svg'
                text={showFavorites ? 'Todos os personagens' : 'Somente favoritos'}
                onClick={handleFilterChange}
              />
            </div>
          </div>

          <div className='container flex flex-wrap justify-center items-center gap-10 mb-10'>
            {displayedCharacters.map((character: any) => (
              <CharacterCard
                key={character.id}
                name={character.name}
                image={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                onClick={() => handleFavorite(character)}
                fav={favorites.some(fav => fav.id === character.id ? true : false)}
                link={character.id}
              />
            ))}
          </div>
        </div>
      }

      <Footer />
    </div>
  );
}
