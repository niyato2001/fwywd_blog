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
    <div className='rounded-md border-2 p-1'>
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
          <div className='col-span-4 flex flex-col justify-start divide-y-2 px-2'>
            <div className='text-black p-1 text-lg font-bold'>{props.title}</div>
            <div className='p-1 text-xs text-gray-800'>{props.description}</div>
          </div>
        </a>
      </Link>
    </div>
  );
}
