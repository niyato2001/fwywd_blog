import Text from './Text';

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
}

export const renderBlockContents = (block: Block) => {
  //blockはオブジェクト
  //block={
  //{
  //  "object": "block",
  //"id": "1d95866b-810a-49b7-9421-a52935fc754b",
  //      "created_time": "2022-01-25T06:16:00.000Z",
  //    "last_edited_time": "2022-01-25T06:16:00.000Z",
  //   "has_children": false,
  //    "archived": false,
  //    "type": "paragraph",
  //    "paragraph": {
  //    "children":あれば子ブロック,
  //        "text": [
  //            {
  //                "type": "text",
  //               "text": {
  //                 "content": "【目次】",
  //               "link": null
  //         },
  //       "annotations": {
  //         "bold": true,
  //       "italic": false,
  //     "strikethrough": false,
  //        "underline": false,
  //             "code": false,
  //           "color": "default"
  //     },
  //        "plain_text": "【目次】",
  //        "href": null
  //    },
  //    {
  //           "type": "text",
  //                  "text": {
  //                    "content": "                                                                                                                  written by 田原純平",
  //                  "link": null
  //            },
  //          "annotations": {
  //            "bold": false,
  //          "italic": false,
  //        "strikethrough": false,
  //      "underline": false,
  //    "code": false,
  //      "color": "default"
  //      },
  //     "plain_text": "                                                                                                                  written by 田原純平",
  //    "href": null
  //      }
  //     ]
  //    }
  // }
  //}のような形。
  const { type, id } = block;
  //const type = block.type;
  //const id = block.id;　と同じ。分割代入。
  const value = block[type];
  //value=block[block.type]という意味。たとえば、value=block['paragraph']

  switch (type) {
    case 'heading_1':
      return (
        <h2 className='border-t border-bg-gray-dark py-4 text-sm font-bold'>
          <Text text={value.text} />
        </h2>
      );
    case 'heading_2':
      return (
        <h3 className='inline-block px-2 py-3 text-xs font-bold'>
          <Text text={value.text} />
        </h3>
      );
    case 'heading_3':
      return (
        <h4 className='inline-block px-4 py-1 text-xs'>
          <Text text={value.text} />
        </h4>
      );
    default:
      //      return `❌ Unsupported block (${
      //        type === 'unsupported' ? 'unsupported by Notion API' : type
      //      })`;
      return null;
  }
};
