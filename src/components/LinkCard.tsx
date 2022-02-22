import Image from 'next/image';
import Link from 'next/link';

interface Props {
  url: string;
  title: string;
  description: string;
  image: string;
}

export default function LinkCard(props: Props) {
  return (
    <Link href={props.url}>
      <a className='grid grid-cols-5 rounded-md bg-white p-3'>
        <div className='relative col-span-1 flex items-center justify-start'>
          <Image
            src={props.image ? props.image : '/vercel.svg'}
            alt={props.title}
            layout='fill'
            objectFit='contain'
          />
        </div>
        <div className='col-span-4 flex flex-col justify-start'>
          <div className='text-black text-xl font-bold'>{props.title}</div>
          <div className='text-xs text-gray-400'>{props.description}</div>
        </div>
      </a>
    </Link>
  );
}
