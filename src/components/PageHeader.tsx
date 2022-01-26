import Image from 'next/image';

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export default function PageHeader(): JSX.Element {
  return (
    <div className='flex justify-between'>
      <Image src='/logo.png' alt='headerlogo' width={200} height={100} />
      <div className='flex w-1/6 items-center justify-around'>
        <button className='w-1/3 rounded-md bg-button-green text-sm text-white'>投稿</button>
        <button className='w-1/3  rounded-md border border-button-border text-sm text-font-green'>
          ログアウト
        </button>
      </div>
    </div>
  );
}
