import React , {useEffect, useState} from 'react';

import { useParams } from "react-router-dom";

import { getCrypto } from '../services/getCrypto';

const CryptoPage = () => {

    // const { id } = useParams();
    // const [coin, setCoin] = useState(null);

    // useEffect(() => {
        
    //     const data = getCrypto(id);
    //     setCoin(coin => data);

    //     console.log(data)
        
    // }, [id]);

    // console.log(coin);

    return (
        <div>
            Crypto
        </div>
    );
};

export default CryptoPage;