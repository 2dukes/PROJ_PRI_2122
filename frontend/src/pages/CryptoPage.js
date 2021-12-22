import React , {useEffect, useState} from 'react';

const CryptoPage = ({ coinId }) => {

    const [coin, setCoin] = useState(null);

    useEffect(() => {

        

    }, [coinId]);
    
    let searchData = {query: {ids: {values: [coinId]}}}

    const coin = fetch("http://localhost:9200/cryptos/_search", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(searchData),
    })

};

export default CryptoPage;