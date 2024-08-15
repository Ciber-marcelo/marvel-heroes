import Image from "next/image"

type SearchProps = {
  onChange: any
  onKeyDown: any
}

export default function Search({ onChange, onKeyDown }: SearchProps) {
  return (
    <div className='w-full  max-w-[880px] flex items-center px-2 bg-color2 rounded-full'>
      {/* <FaSearch size={20} color='white'/> */}

      <Image
        className='w-[20px] h-[20px] mx-4'
        width={20}
        height={20}
        src='/assets/busca/Lupa/Shape.png'
        alt="image hero"
        priority={true}
      />

      <input
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        maxLength={25}
        className="
            h-[55px] 
            w-full
            rounded-full
            p-4
            bg-color2
            text-texteColor1
            placeholder:text-color1
            focus:outline-none
         "
        placeholder="Procure por heróis"
      />
    </div>
  )
}