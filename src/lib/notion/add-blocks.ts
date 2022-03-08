import { getOgpMeta } from './get-embedOGP';

interface Block {
  [key: string]: any;
  object: string;
  id: string;
  created_time: Date;
  last_edited_time: Date;
  created_by: CreatedBy;
  last_edited_by: LastEditedBy;
  has_children: boolean;
  archived: boolean;
  type: string;
  paragraph: Paragraph;
  toggle: Toggle;
  heading_1: Heading1;
  image: Image;
  child_database: ChildDatabase;
  numbered_list_item: NumberedListItem;
  table: Table;
  heading_2: Heading2;
  heading_3: Heading3;
}

interface CreatedBy {
  object: string;
  id: string;
}

interface LastEditedBy {
  object: string;
  id: string;
}

interface Paragraph {
  text: Text[];
}

interface Toggle {
  text: Text[];
}

interface Heading1 {
  text: Text[];
}

interface Heading2 {
  text: Text[];
}

interface Heading3 {
  text: Text[];
}

interface NumberedListItem {
  text: Text[];
}

interface Table {
  table_width: number;
  has_column_header: boolean;
  has_row_header: boolean;
}

interface Image {
  caption: Text[];
  type: string;
  file: File;
}

interface File {
  url: string;
  expiry_time: Date;
}

interface ChildDatabase {
  title: string;
}

interface Data {
  properties: {
    [key: string]: any;
  };
}

interface Text {
  text: { content: string; link: { url: string } | null };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
}

export async function addBlocks(blocks: Block[], blocktype: string, blockkey: string) {
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
