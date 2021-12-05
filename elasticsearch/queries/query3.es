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
// {
//     "query": {
//         "bool": {
//             "must": [
//                 {
//                     "range": {
//                         "developer_score": {
//                             "lte": 0.0
//                         }
//                     }
//                 },
//                 {
//                     "bool": {
//                         "should": [
//                             {
//                                 "range": {
//                                     "price_change_percentage_1y": {
//                                         "lt": 0.0
//                                     }
//                                 }
//                             },
//                             {
//                                 "range": {
//                                     "price_change_percentage_30d": {
//                                         "lt": 0.0
//                                     }
//                                 }
//                             },
//                             {
//                                 "range": {
//                                     "price_change_percentage_7d": {
//                                         "lt": 0.0
//                                     }
//                                 }
//                             }
//                         ]
//                     }
//                 }
//             ]
//         }
//     }
// }