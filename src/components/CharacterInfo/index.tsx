import { formatName } from "@/utils/formatName";
import Image from "next/image"
import InfoCard from "../InfoCard";

type Props = {
  character: any
  onClick?: any
  fav: boolean
}

export default function CharacterInfo({character, onClick, fav}: Props) {
  return (
    <div className='container flex flex-wrap justify-between items-center gap-4'>
      <div className='flex flex-col w-[350px] gap-8'>
        <div className="flex justify-between items-center">
          <p className="text-textColor1 text-[34px] font-bold uppercase">
            {formatName(character.name)}
          </p>
          <div onClick={onClick}>
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

        <h1 className="min-h-[150px] text-textColor2 text-[16px]">
          {character.description ? character.description : 'Sem descrição'}
        </h1>

        <div className='flex items-center gap-16'>
          <InfoCard image={'/assets/icones/book/Group@1,5x.svg'} text="Quadrinhos" num={character.comics.available} />
          <InfoCard image={'/assets/icones/video/Shape@1,5x.svg'} text="Filmes" num={character.series.available} />
        </div>

        <div className="flex items-center gap-2 text-textColor1 text-[14px]">
          <p className="font-bold">Rating:</p>
          <Image
              className='w-[87px] h-[15px] cursor-pointer'
              width={87}
              height={15}
              src={fav ? '/assets/review/Group 4@3x.png' : '/assets/review/Group 5@3x.png'}
              alt="image hero"
              priority={true}
            />
        </div>

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
  );
}
