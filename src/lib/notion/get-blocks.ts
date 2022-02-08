import { notion } from './client';

export const getBlocks = async (blockId) => {
  //Notion APIではblockIdはpageIdと同じ
  let results = [];
  let response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 100,
  });
  results = [...response.results];
  while (response.has_more) {
    response = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 100,
      start_cursor: response.next_cursor,
    });
    results = [...results, ...response.results];
  }
  return [...results];
};
