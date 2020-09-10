import React from 'react'
import { useLocation } from 'react-router-dom'

export default function WhereAmI() {
    const location = useLocation();
    return (
        <div>
            <pre>{`location: ${JSON.stringify(location, null, 2)}`}</pre>
        </div>
    )
}
