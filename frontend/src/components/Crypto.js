export default class Crypto {
    constructor({
        id,
        all_time_high,
        all_time_high_date,
        block_time_in_minutes,
        blockchain_site,
        categories, // to add
        community_score,
        current_price,
        description,
        developer_score,
        genesis_date,
        github,
        hashing_algorithm,
        homepage_link,
        image_url,
        liquidity_score,
        market_cap,
        news, // to add
        price_change_percentage_1y, // to add
        price_change_percentage_7d, // to add
        price_change_percentage_30d, // to add
        subreddit_url,
    }) {
        this.id = id;
        this.all_time_high = all_time_high;
        this.all_time_high_date = all_time_high_date;
        this.block_time_in_minutes = block_time_in_minutes;
        this.blockchain_site = blockchain_site;
        this.categories = categories;
        this.community_score = community_score;
        this.current_price = current_price;
        this.description = description;
        this.developer_score = developer_score;
        this.genesis_date = genesis_date;
        this.github = github;
        this.hashing_algorithm = hashing_algorithm;
        this.homepage_link = homepage_link;
        this.image_url = image_url;
        this.liquidity_score = liquidity_score;
        this.market_cap = market_cap;
        this.news = news;
        this.price_change_percentage_1y = price_change_percentage_1y;
        this.price_change_percentage_7d = price_change_percentage_7d;
        this.price_change_percentage_30d = price_change_percentage_30d;
        this.subreddit_url = subreddit_url;
    }
}
