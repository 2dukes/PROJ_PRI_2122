GET /cryptos/_search
{
    "_source": false,
    "min_score": 25,
    "query": {
        "nested": {
            "path": "news",
            "inner_hits": {},
            "query": {
                "bool": {
                    "should": [
                        {
                            "multi_match": {
                                "query": "china",
                                "type": "most_fields",
                                "fields": [
                                    "news.title^5",
                                    "news.article^3"
                                ],
                                "fuzziness": "auto",
                                "boost": 5
                            }
                        },
                        {
                            "multi_match": {
                                "query": "restrictions",
                                "type": "most_fields",
                                "fields": [
                                    "news.title^5",
                                    "news.article^3"
                                ],
                                "fuzziness": "auto",
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
                                "fuzziness": "auto", 
                                "boost": 3
                            }
                        },
                        {
                            "multi_match": {
                                "query": "bitcoin",
                                "type": "most_fields",
                                "fields": [
                                    "news.title",
                                    "news.article"
                                ],
                                "fuzziness": "auto" 
                            }
                        }
                    ]
                }
            }
        }
    }
}