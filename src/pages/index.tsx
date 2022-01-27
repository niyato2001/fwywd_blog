import Head from 'next/head';
import Hero from '../components/Hero';
import PageMain from '../components/PageMain';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Hero />
      <PageMain />
    </div>
  );
}
