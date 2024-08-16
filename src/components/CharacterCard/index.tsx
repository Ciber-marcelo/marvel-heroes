import { formatName } from "@/utils/formatName"
import Image from "next/image"
import Link from "next/link"

type Props = {
  image: string
  name: string
  onClick: any
  fav: boolean
  link: any
}

export default function CharacterCard({ image, name, onClick, fav, link }: Props) {
  return (
    <div className='flex flex-col justify-start'>
      <Link href={`/heroPage/${link}`}>
        <Image
        className='w-[240px] h-[240px] object-cover'
        width={240}
        height={240}
        src={image}
        alt="image hero"
        priority={true}
      />
      </Link>
      <div className="w-[240px] h-1 mb-2 bg-color1"></div>

      <div className='w-[240px] flex justify-between items-center'>
        <p className=''>{formatName(name)}</p>
        <div onClick={onClick}>
          <Image
            className='w-5 h-5 cursor-pointer'
            width={20}
            height={20}
            src={fav ? '/assets/icones/heart/Path.svg' : '/assets/icones/heart/Path Copy 2.png'}
            alt="favorite hero"
            priority={true}
          />
        </div>
      </div>
    </div>
  );
}
