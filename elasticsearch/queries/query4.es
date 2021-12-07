GET /cryptos/_search
{
    "_source": false,
    "query": {
        "nested": {
            "path": "news",
            "inner_hits": {},
            "query": {
                "bool": {
                    "must": [
                        {
                            "multi_match": {
                                "query": "china",
                                "type": "most_fields",
                                "fields": [
                                    "news.title^5",
                                    "news.article^3"
                                ],
                                "boost": 5
                            }
                        },
                        {
                            "bool": {
                                "should": [
                                    {
                                        "multi_match": {
                                            "query": "restrictions",
                                            "type": "most_fields",
                                            "fields": [
                                                "news.title^5",
                                                "news.article^3"
                                            ],
                                            "boost": 3
                                        }
                                    },
                                    {
                                        "multi_match": {
                                            "query": "ban",
                                            "type": "most_fields",
                                            "fields": [
                                                "news.title^5",
                                                "news.article^3"
                                            ],
                                            "boost": 3
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            "multi_match": {
                                "query": "bitcoin",
                                "type": "most_fields",
                                "fields": [
                                    "news.title^5",
                                    "news.article^3"
                                ]
                            }
                        }
                    ]
                }
            }
        }
    }
}