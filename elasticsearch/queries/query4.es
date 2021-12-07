GET /cryptos/_search
{
    "_source": [
        "id",
        "description",
        "news_titles",
        "news_articles"
    ],
    "query": {
        "bool": {
            "should": [
                {
                    "match_phrase": {
                        "news_titles": {
                            "query": "china restrictions bitcoin",
                            "boost": 10
                        }
                    }
                },
                {
                    "match": {
                        "news_articles": "china restrictions bitcoin"
                    }
                }
            ]
        }
    }
}