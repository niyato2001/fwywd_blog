import { notion } from './client';

export async function getPage(pageId: string) {
  const page = await notion.pages.retrieve({
    page_id: pageId,
  });
  return page;
}
