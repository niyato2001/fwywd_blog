import '../styles/globals.css';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '../components/Layout';
import { msalConfig } from '../lib/auth/config';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const pca = new PublicClientApplication(msalConfig);
  return (
    <>
      <MsalProvider instance={pca}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MsalProvider>
    </>
  );
}

export default MyApp;
