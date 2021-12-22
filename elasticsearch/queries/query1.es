GET /cryptos/_search
{
  "_source": ["genesis_date", "current_price", "id", "hashing_algorithm", "block_time_in_minutes", "description"],
  "size": 250, 
  "query": {
    "function_score": {
      "query": {
        "bool": {
          "must": [
            {
              "range": {
                "genesis_date": {
                  "gte": "now/y-5y"
                }
              }
            },
            {
              "range": {
                  "current_price": {
                    "lt": 1
                  }
              }
            },
            {
              "script": {
                "script": {
                  "source": "doc['block_time_in_minutes'].value == 0"
                }
              }
            }
          ],
          "must_not": {
            "multi_match": {
              "query": "pos",
              "fields": [ "hashing_algorithm", "description" ],
              "fuzziness": "auto"
            }
          }
        }
      },
      "functions": [
        {
          "filter": {
            "match": {
              "description": {
                "query": "pow",
                "fuzziness": "auto"
              }
            }
          }, 
          "weight": 10
        },
        {
          "filter": {
            "term": {
              "hashing_algorithm.keyword": ""
            }
          },
          "weight": 0.5
        }
      ]
    } 
  }
}