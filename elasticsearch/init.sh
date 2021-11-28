#!/bin/bash

# Specify mappings
curl -XPUT "http://localhost:9200/cryptos" -H 'Content-Type: application/json' -d'
{
  "mappings": {
    "properties": {
      "id":  { "type": "text" },
      "categories":  { "type": "text" },
      "block_time_in_minutes": { "type": "integer" },
      "hashing_algorithm": { "type": "keyword" },
      "genesis_date": { "type": "date", "ignore_malformed": true },
      "developer_score": { "type": "float" },
      "community_score": { "type": "float" },
      "liquidity_score": { "type": "float" },
      "description":  { "type": "text" },
      "homepage_link": { "type": "keyword" },
      "blockchain_site": { "type": "keyword" },
      "subreddit_url": { "type": "keyword" },
      "github": { "type": "keyword" },
      "image_url": { "type": "keyword" },
      "all_time_high(usd)": { "type": "double" },
      "all_time_high_date": { "type": "date" },
      "market_cap": { "type": "double" },
      "current_price": { "type": "double" },
      "price_change_percentage_1y": { "type": "double" },
      "price_change_percentage_30d": { "type": "double" },
      "price_change_percentage_7d": { "type": "double" },
      "news_titles":  { "type": "text" },
      "news_articles":  { "type": "text" },
      "news_urls":  { "type": "text" }
    }
  }
}'

# Feed Elastic Search
curl -X POST "http://localhost:9200/cryptos/_bulk" -H 'Content-Type: application/json' --data-binary '@final_json.json'