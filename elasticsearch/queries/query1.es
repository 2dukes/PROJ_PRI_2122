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
                    "gt": 0
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
              "fields": [ "hashing_algorithm", "description" ]
            }
          }
        }
      },
      "functions": [
        {
          "filter": {
            "match": {
              "description": "pow"
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