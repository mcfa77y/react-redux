import { createAsyncThunk } from '@reduxjs/toolkit';
import Base_Detail_Slice from '../../base_detail_slice';
import { album_api } from '../album_api';

class Album_Detail_Slice extends Base_Detail_Slice {
    constructor() {
        super('album');
        console.log('Album_Detail_Slice created');
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
