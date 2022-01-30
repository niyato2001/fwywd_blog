import { notion } from './client';

interface NotionPage {
  database: Database;

  // added because page data is too nested
  id: string;
  title: string;
}

interface Database {
  id: string;
  properties: {
    title: {
      id: string;
      type: string;
      title: [
        {
          plain_text: string;
        },
      ];
    };
  };
}

export async function getDatabase(id: string): Promise<NotionPage> {
  const database = (await notion.database.query({
    database_id: id,
  })) as NotionPage['database'];

  return {
    database,
    id: database.id,
    title: database.properties.title.title[0].plain_text,
  };
}
