GET /cryptos/_search
{
    "query": {
        "bool": {
            "must": [
                {
                    "range": {
                        "price_change_percentage_30d": {
                            "gte": 100.0
                        }
                    }
                },
                {
                    "range": {
                        "liquidity_score": {
                            "gte": 20.0
                        }
                    }
                }
            ]
        }
    }
}