import React from 'react'

export function Debug({ entity, loading, currentRequestId, error }:
    {
        entity: any,
        loading: any,
        currentRequestId: any,
        error: any,
    }
) {
    return (
        <div>
            <pre>entity: {JSON.stringify(entity, null, 2)}</pre>
            <pre>loading: {JSON.stringify(loading, null, 2)}</pre>
            <pre>currentRequestId: {JSON.stringify(currentRequestId, null, 2)}</pre>
            <pre>error: {JSON.stringify(error, null, 2)}</pre>
        </div>
    )
}
