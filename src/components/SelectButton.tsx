import Router, { useRouter } from 'next/router';

export default function SelectButton() {
  const router = useRouter();
  return (
    <select
      className='rounded-md p-4 px-20 text-center text-font-black'
      onChange={(e) => Router.push(e.target.value)}
      defaultValue={router.pathname}
    >
      <option value='/'>Home</option>
      <option value='/blogtables'>ページ1</option>
      <option value='/blogtables/{router.query.number}'>ページ{router.query.number}</option>
    </select>
  );
}
