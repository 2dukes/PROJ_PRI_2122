GET /cryptos/_search
{
  "_source": false,
  "size": 200,
  "query":  {
    "nested": {
      "path": "news",
      "inner_hits": {},
      "query": {
        "bool": {
          "must": [
            {
               "multi_match": {
                  "query": "blockchain game",
                  "type": "most_fields",
                  "fields": [
                    "news.title^5",
                    "news.article^3"
                  ]
                }
            },
            {
              "multi_match": {
                "query": "nft",
                "fields": [
                  "news.title",
                  "news.article"
                ],
                "boost": 10
              }
            }
          ]
        }
      }
    }
  }
}