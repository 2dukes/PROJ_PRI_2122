#!/bin/bash

# Specify mappings
curl -XPUT "http://localhost:9200/cryptos" -H 'Content-Type: application/json' -d'
{
  "settings": {
    "analysis": {
      "char_filter": {
        "remove_comma_number": {
          "type": "pattern_replace",
          "pattern": "(?<=\\d),(?=\\d)",
          "replacement": ""
        },
        "swap_dollar_symbol": {
          "type": "pattern_replace",
          "pattern": "(\\$)(\\d+)",
          "replacement": "$2$1"
        },
        "add_usd_word": {
          "type": "pattern_replace",
          "pattern": "(?:(\\d+)\\$)",
          "replacement": "$1 usd"
        },
        "remove_dollar_symbol": {
          "type": "pattern_replace",
          "pattern": "\\$([A-Za-z]+)",
          "replacement": "$1"
        },
        "add_percentage_word": {
          "type": "pattern_replace",
          "pattern": "(\\d+)\\%",
          "replacement": "$1 percent"
        },
        "add_times_word": {
          "type": "pattern_replace",
          "pattern": "(\\d+)[xX]",
          "replacement": "$1 times"
        },
        "join_dot_separated_word": {
          "type": "pattern_replace",
          "pattern": "(?<=[A-Za-z])\\.(?=[A-Za-z])",
          "replacement": ""
        },
        "remove_special_chars": {
          "type": "pattern_replace",
          "pattern": "[®©™]",
          "replacement": ""
        }
      },
      "filter": {
        "synonym": {
          "type": "synonym",
          "synonyms": [
            "dollar, usd",
            "proof work => pow",
            "proof stake => pos"
          ]
        },
        "remove_urls": {
          "type": "keep_types",
          "types": ["<URL>"],
          "mode": "exclude"
        },
        "no_stem": {
          "type": "keyword_marker",
          "keywords": ["pow", "pos"] 
        }
      },
      "analyzer": {
        "my_analyzer": {
          "char_filter": [
            "html_strip",
            "remove_comma_number",
            "remove_special_chars",
            "join_dot_separated_word",
            "swap_dollar_symbol",
            "add_usd_word",
            "remove_dollar_symbol",
            "add_percentage_word",
            "add_times_word"
          ],
          "tokenizer": "uax_url_email",
          "filter": [
            "lowercase",
            "remove_urls",
            "stop",
            "synonym",
            "no_stem",
            "stemmer"
          ]
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "id":  { "type": "text" },
      "categories":  { "type": "text"},
      "block_time_in_minutes": { "type": "integer" },
      "hashing_algorithm": { "type": "text", "analyzer": "my_analyzer", 
        "fields": {
          "keyword": {
            "type": "keyword"
          }
        } 
      },
      "genesis_date": { "type": "date", "ignore_malformed": true },
      "developer_score": { "type": "float" },
      "community_score": { "type": "float" },
      "liquidity_score": { "type": "float" },
      "description":  { "type": "text", "analyzer": "my_analyzer" },
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
      "news_titles":  { "type": "text", "analyzer": "my_analyzer" },
      "news_articles":  { "type": "text", "analyzer": "my_analyzer" },
      "news_urls":  { "type": "keyword" }
    }
  }
}'

# Feed Elastic Search
curl -X POST "http://localhost:9200/cryptos/_bulk" -H 'Content-Type: application/json' --data-binary '@final_json.json'