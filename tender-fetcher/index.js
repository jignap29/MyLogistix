const Parser = require('rss-parser');
const parser = new Parser();

const FEED_URL = 'https://timesofindia.indiatimes.com/rssfeedstopstories.cms';

(async () => {
  try {
    const feed = await parser.parseURL(FEED_URL);

    console.log(`\nTotal Tenders Fetched: ${feed.items.length}\n`);

    feed.items.slice(0, 10).forEach((item, index) => {
      console.log(`${index + 1}. Title     : ${item.title}`);
      console.log(`   Link      : ${item.link}`);
      console.log(`   Published : ${item.pubDate}`);
      console.log();
    });
  } catch (error) {
    console.error('Error fetching RSS feed:', error.message);                                      
  }
})();
