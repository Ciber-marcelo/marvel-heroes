import { formatName } from "@/utils/formatName"
import Image from "next/image"

type Props = {
  image: string
  name: string
  onClick: any
  fav: boolean
}

export default function CharacterCard({ image, name, onClick, fav }: Props) {
  return (
    <div className='flex flex-col justify-start'>
      <Image
        className='w-[240px] h-[240px] object-cover'
        width={240}
        height={240}
        src={image}
        alt="image hero"
        priority={true}
      />
      <div className="w-[240px] h-1 mb-2 bg-color1"></div>

      <div className='w-[240px] flex justify-between items-center'>
        <p className=''>{formatName(name)}</p>
        <div onClick={onClick}>
          <Image
            className='w-5 h-5 cursor-pointer'
            width={20}
            height={20}
            src={fav ? '/assets/icones/heart/Path Copy 7.svg' : '/assets/icones/heart/Path Copy 2.png'}
            alt="favorite hero"
            priority={true}
          />
        </div>
      </div>
    </div>
  );
}