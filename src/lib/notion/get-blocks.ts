import { notion } from './client';

export const getBlocks = async (blockId) => {
  //Notion APIではblockIdはpageIdと同じ
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 100,
  });
  return response.results;
};
