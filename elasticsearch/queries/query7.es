GET /cryptos/_search
{
  "_source": "false",
  "size": 200,
  "query": {
    "bool": {
      "must": [
        {
          "bool": {
            "should": [
              {
                "nested": {
                  "path": "news",
                  "inner_hits": {},
                  "query": {
                    "multi_match": {
                      "query": "nft blockchain game",
                      "fields": [
                        "news.title^5",
                        "news.article^3"
                      ],
                      "fuzziness": "auto"
                    }
                  }
                }
              }
            ]
          }
        }
      ]
    }
  },
  "sort": {
    "_score": "desc"
  }
}
