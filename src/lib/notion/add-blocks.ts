import { getOgpMeta } from './get-embedOGP';

export async function addBlocks(blocks, blocktype, blockkey) {
  const addBlocks = await Promise.all(
    blocks
      .filter((block) => block[blocktype])
      //block[blockType]がtrueの要素のみの配列に変換
      .map(async (block) => {
        //子ブロックがある場合は、内容がすべて表示されるわけではないので、追加でblock_idからgetBlocksする必要がある
        return {
          id: block.id,
          target: await getOgpMeta(block[blocktype][blockkey]),
        };
      }),
  );

  const blocksWithAdd = blocks.map((block) => {
    // Add child blocks if the block should contain children but none exists
    if (block[blocktype] && !block[blocktype]?.target) {
      //has_childrenがtrueだが、childrenオブジェクトを持っていない場合にchildrenオブジェクトをつくる！
      block[blocktype].target = addBlocks.find((x) => x.id === block.id)?.target;
      //xはblocks.filterで作られたblock.has_childrenがtrueのみのblockによる配列の要素（idとtarget）
      //childBlocks=[{id:block.id,children:await getBlocks(block.id),{id:...,children:...},...]
      //x.idはchildBlocksで呼び出されているblock.idであり、あとのblock.idはblocksで呼び出されているblock.id
      //"?."はオプショナルチェーン演算子とよび、childblocks.find()がある場合にchildrenを呼び出す。childblocks.find()がnullの場合はundefinedを返す。
    }
    return block;
    //has_childrenがtrueのものは、childrenが加えられた状態でfalseのものはそのままreturnされる。
  });
  return blocksWithAdd;
}
