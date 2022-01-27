import Image from 'next/image';

export default function PageMain(): JSX.Element {
  return (
    <div className='bg-bg-gray'>
      <div className='mx-auto flex max-w-5xl flex-col'>
        <div className='rounded-md border-2 border-button-border text-xs text-font-green'>
          プログラミング
        </div>
      </div>
    </div>
  );
}
