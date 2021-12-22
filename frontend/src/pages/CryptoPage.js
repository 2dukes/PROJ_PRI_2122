import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getCrypto } from "../services/getCrypto";

const CryptoPage = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState(null);

    useEffect(() => {
        getCrypto(id)
            .then((data) => {
                setCoin(data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [id]);

    console.log(coin);

    return (
        <div>
            <h1>{coin?._source.id}</h1>
        </div>
    );
};

export default CryptoPage;
