import React from 'react'
type ButtonDeleteProps = { is_disable_delete: boolean, handle_delete_click: any }

export default function ButtonDelete({ is_disable_delete, handle_delete_click }
    : ButtonDeleteProps) {
    return (
        <div>
            <button className="btn btn-danger m-3" disabled={is_disable_delete} onClick={handle_delete_click}>Delete</button>
        </div>
    )
}
