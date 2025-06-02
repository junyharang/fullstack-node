import {deleteRequest, getRequest, patchRequest, postRequest} from "../../../utility/requests";
import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {TASK_URL} from "../../../utility/apiUrl";
import type {ApiState} from "../../Type";

const initialState: ApiState = {
    getItemsData: null,
};

const getItemsFetchThunk = (actionType: string, apiUrl: string) => {
    return createAsyncThunk(actionType, async (userId: string) => {
        console.log(`getItemsFetchThunk() apiUrl: ${apiUrl} \t userId: ${userId} \t totalUrl: ${apiUrl}${userId}`);

        return await getRequest(`${apiUrl}${userId}`);
    });
};

const postCompletedFetchThunk = (actionType: string, apiUrl: string) => {
    return createAsyncThunk(actionType, async (postData: any) => {
        if (!postData) {
            throw new Error(`postData not found: ${postData}`);
        }

        return await postRequest(apiUrl, {
            body: JSON.stringify(postData),
        });
    });
};

const updateCompletedFetchThunk = (actionType: string, apiUrl: string) => {
    return createAsyncThunk(actionType, async (options: any) => {
        return await patchRequest(apiUrl, options);
    });
};

const deleteCompletedFetchThunk = (actionType: string, apiUrl: string) => {
    return createAsyncThunk(actionType, async ({ userId, index }: { userId: string, index: number}) => {
        return await deleteRequest(`${apiUrl}${userId}${index}`, {
            method: "DELETE",
        });
    });
};

export const fetchGetItems = getItemsFetchThunk('fetchGetItems', TASK_URL);
export const fetchPostItems = postCompletedFetchThunk('fetchPostItems', TASK_URL);
export const fetchUpdateCompleted = updateCompletedFetchThunk('fetchUpdateCompleted', TASK_URL);
export const fetchDeleteCompleted = deleteCompletedFetchThunk('fetchDeleteCompleted', TASK_URL);

let apiSlice = createSlice({
    name: 'api',
    initialState,
    reducers: {
        setItemsData: (state, action: PayloadAction<any>) => {
            state.getItemsData = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchGetItems.fulfilled, (state, action) => {
                state.getItemsData = action.payload;
            })
            .addCase(fetchGetItems.rejected, (_state, action) => {
                console.error("🛑 Fetch rejected:", action.error);
            })

            .addCase(fetchPostItems.fulfilled, (state, action) => {
                state.getItemsData = action.payload;
            })
            .addCase(fetchPostItems.rejected, (_state, action) => {
                console.error(`🛑 Rejected Fetch rejected:  ${action.error}`);
            })

            .addCase(fetchUpdateCompleted.fulfilled, (state, action) => {
                state.getItemsData = action.payload;
            })
            .addCase(fetchUpdateCompleted.rejected, (_state, action) => {
                console.error("🛑 Update Fetch rejected:", action.error)
            })

            .addCase(fetchDeleteCompleted.fulfilled, (state, action) => {
                state.getItemsData = action.payload;
            })
            .addCase(fetchDeleteCompleted.rejected, (_state, action) => {
                console.error("🛑 Delete Fetch rejected:", action.error);
            });
    }
});
export default apiSlice.reducer;
