import React from 'react'
type Debug_Type = {
    title: string, response: any, loading: any, currentRequestId: any, error: any
}
export default function Debug({ title, response, loading, currentRequestId, error }: Debug_Type) {
    return (
        <div>
            <h6>Debug {title}:</h6>
            <pre> response:
                {JSON.stringify(response, null, 2)}
            </pre>
            <pre> loading:
                {JSON.stringify(loading, null, 2)}
            </pre>
            <pre> currentRequestId:
                {JSON.stringify(currentRequestId, null, 2)}
            </pre>
            <pre> error:
                {JSON.stringify(error, null, 2)}
            </pre>
        </div>
    )
}
