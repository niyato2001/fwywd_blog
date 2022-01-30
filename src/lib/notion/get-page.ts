import { notion } from './client';

export async function getPage() {
  const id = process.env.NOTION_PAGE_ID;
  const page = await notion.pages.retrieve({
    page_id: id,
  });
  return page;
}
