import React from 'react'
import { Link, useLocation } from 'react-router-dom';
export default function WhereIAm() {

    const location = useLocation();

    return (
        <div>
            <p>
                Route path :
            </p>
            <pre>
                {JSON.stringify(location, null, 2)}
            </pre>
        </div>
    )
}
