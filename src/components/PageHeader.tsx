import { useMsal, AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import Image from 'next/image';
import useCurrentUser from '../hooks/useCurrentUser';
import { loginRequest } from '../lib/auth/config';

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export default function PageHeader(): JSX.Element {
  const { instance } = useMsal();
  const user = useCurrentUser();
  console.log(user);
  return (
    <>
      <div className='flex justify-between'>
        <Image src='/logo.png' alt='headerlogo' width={200} height={100} />
        <div className='flex w-1/4 items-center justify-center gap-4'>
          <button className='h-1/3 w-1/3 rounded-md bg-button-green text-xs text-white'>
            投稿
          </button>
          <UnauthenticatedTemplate>
            <button
              className='h-1/3 w-1/3 rounded-md border-2 border-button-border  text-xs text-font-green'
              onClick={() => instance.loginRedirect(loginRequest)}
            >
              ログイン
            </button>
          </UnauthenticatedTemplate>
          <AuthenticatedTemplate>
            <button
              className='h-1/3 w-1/3 rounded-md border-2 border-button-border  text-xs text-font-green'
              onClick={() => instance.logout()}
            >
              ログアウト
            </button>
          </AuthenticatedTemplate>
        </div>
      </div>
      <AuthenticatedTemplate>
        <p>
          こんにちは、{user?.familyName} {user?.givenName} さん
        </p>
        <p>メールアドレス：{user?.email}</p>
      </AuthenticatedTemplate>
    </>
  );
}
