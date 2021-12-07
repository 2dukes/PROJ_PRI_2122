GET /cryptos/_search
{
    "_source": [
        "id",
        "category",
        "description",
        "news_titles",
        "news_articles"
    ],
    "query": {
        "bool": {
            "should": [
                {
                    "match_phrase": {
                        "id": {
                            "query": "fan token",
                            "boost": 10
                        }
                    }
                },
                {
                    "match_phrase": {
                        "categories": {
                            "query": "fan token",
                            "boost": 15
                        }
                    }
                },
                {
                    "match": {
                        "description": "fan tokens football soccer"
                    }
                }
            ]
        }
    }
}
