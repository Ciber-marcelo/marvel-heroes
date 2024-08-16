import Image from "next/image"

type Props = {
   image: any
   text: string
   num: number
}

export default function InfoCard({ image, text, num }: Props) {

   return (
      <div className='w-auto h-[60px] flex flex-col gap-2'>
         <div className="text-textColor1 text-[12px] font-bold">{text}</div>

         <div className="flex h-[30px] gap-4 items-end">
            <Image
               className='w-auto h-auto'
               width={30}
               height={30}
               src={image}
               alt="image icon"
               priority={true}
            />
            <div className="text-textColor1 font-semibold">{num}</div>
         </div>
      </div>
   );
}
