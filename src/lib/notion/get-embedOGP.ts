import { JSDOM } from 'jsdom';

export async function getOgpMeta(link) {
  const ogpMeta = await fetch(link)
    .then((res) => res.text())
    .then((text) => {
      const metaData = {
        url: link,
        title: '',
        description: '',
        image: '',
      };
      const doms = new JSDOM(text);
      const metas = doms.window.document.getElementsByTagName('meta');
      for (let i = 0; i < metas.length; i++) {
        let pro = metas[i].getAttribute('property');
        let con = metas[i].getAttribute('content');
        if (typeof pro == 'string') {
          if (pro.match('title')) metaData.title = metas[i].getAttribute('content');
          if (pro.match('description')) metaData.description = metas[i].getAttribute('content');
          if (pro.match('image') && con.match('http'))
            metaData.image = metas[i].getAttribute('content');
          if (pro.match('og:title')) metaData.title = metas[i].getAttribute('content');
          if (pro.match('og:description')) metaData.description = metas[i].getAttribute('content');
        }

        pro = metas[i].getAttribute('name');
        if (typeof pro == 'string') {
          if (pro.match('title')) metaData.title = metas[i].getAttribute('content');
          if (pro.match('description')) metaData.description = metas[i].getAttribute('content');
          if (pro.match('image') && con.match('http'))
            metaData.image = metas[i].getAttribute('content');
        }
      }
      return metaData;
    })
    .catch((e) => {
      console.log(e);
    });
  return ogpMeta;
}
