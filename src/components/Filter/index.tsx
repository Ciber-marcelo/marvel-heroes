import Image from "next/image"

type Props = {
  image: any
  text: string
  onClick?: any
}

export default function Filter({ image, text, onClick }: Props) {
  return (
    <button 
      className='min-w-[224px] flex items-center gap-4 p-2 rounded-md hover:bg-color2 active:bg-color3' 
      onClick={onClick}
    >
      <Image
        className='w-auto h-auto' 
        width={20}
        height={20}
        src={image}
        alt="image hero"
        priority={true}
      />
      <div className="text-color1">{text}</div>
    </button>
  );
}
