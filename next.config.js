/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: [
      's3.us-west-2.amazonaws.com',
      'fwywd.com',
      'cdn-ak.f.st-hatena.com',
      'cdn.user.blog.st-hatena.com',
      'favicon-generator.mintsu-dev.com',
      'realfavicongenerator.net',
      'qiita-user-contents.imgix.net',
      'www.itra.co.jp',
      'www.sungrove.co.jp',
      'deecode.net',
      'static.xx.fbcdn.net',
      'nextjs.org',
      'digitalidentity.co.jp',
      'squoosh.app',
      'secure.gravatar.com',
      'storage.googleapis.com',
      'user-images.githubusercontent.com',
      'cdn.sanity.io',
      'assets.st-note.com',
      'www.codegrid.net',
      'tsuyopon.xyz',
      'files.readme.io',
      'cdn.sstatic.net',
      'maku.blog',
      '',
      '',
      '',
      '',
    ],
  },
  reactStrictMode: true,
};
