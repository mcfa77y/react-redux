import React from 'react'

export default function button_delete({ is_disable_delete, handle_delete_click }
    : { is_disable_delete: boolean, handle_delete_click: any }) {
    return (
        <div>
            <button className="btn btn-danger m-3" disabled={is_disable_delete} onClick={handle_delete_click}>Delete</button>
        </div>
    )
}
