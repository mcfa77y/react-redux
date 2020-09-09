import { createAsyncThunk } from '@reduxjs/toolkit';
import Base_Slice from '../../base_slice';
import { album_api } from '../album_api';

class Album_Detail_Slice extends Base_Slice {
    fetch_by_id: any;
    constructor() {
        super('album_detail');
        console.log('Album_Detail_Slice created');
        this.fetch_by_id = this.async_thunk_fn();
        this.async_thunk_list.push(this.fetch_by_id);
    }

    async_thunk_fn() {
        console.log('calling album async thunk');
        return createAsyncThunk(
            `${this.base_entity_name}/fetch_entity_detail`,
            async (entity_id: number, { getState, requestId }: { getState: any, requestId: any }) => {
                const { currentRequestId, loading } = getState()[this.entity_name];
                if (loading !== 'pending' || requestId !== currentRequestId) {
                    return;
                }
                const response = await album_api.fetch_by_id(entity_id);
                return response;
            },
        );
    }
}

export const select_album = (state: any) => state.album_detail;

export const album_detail_slice = new Album_Detail_Slice();

export default album_detail_slice.slice().reducer;
