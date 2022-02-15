import Router, { useRouter } from 'next/router';

export default function SelectButton() {
  const router = useRouter();
  return (
    <select
      className='rounded-md p-4 px-20 text-center'
      onChange={(e) => Router.push(e.target.value)}
      defaultValue={router.pathname}
    >
      <option value='/'>Home</option>
      <option value='/about'>About</option>
      <option value='/profile'>Profile</option>
    </select>
  );
}
