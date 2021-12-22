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
                  ],
                  "fuzziness": "auto"
                }
            },
            {
              "multi_match": {
                "query": "nat",
                "fields": [
                  "news.title",
                  "news.article"
                ],
                "fuzziness": "auto",
                "boost": 10
              }
            }
          ]
        }
      }
    }
  }
}