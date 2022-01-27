import Image from 'next/image';

export default function PageFooter(): JSX.Element {
  return (
    <div className='flex w-full flex-col justify-center gap-10 bg-bg-black py-8 text-white'>
      <div className='flex items-center justify-center gap-4'>
        <span className='text-sm'>CREATED BY</span>
        <span>名前 太郎</span>
      </div>
      <div className='mx-auto'>
        <Image src='/logo_white.png' alt='footerlogo' width={100} height={120} />
      </div>
      <div className='flex justify-center gap-4'>
        <Image src='/twitter.png' alt='footer_twitter' width={18} height={15} />
        <Image src='/facebook.png' alt='footer_facebook' width={18} height={18} />
      </div>
      <div className='mx-auto'>
        <span>© 2021 KIKAGAKU</span>
      </div>
    </div>
  );
}
