import {combineReducers} from 'redux'
import { GALLERY_FETCH_SUCCESS, GALLERY_FETCH_FAILURE, GALLERY_FETCH_REQUEST, MEDIA_UPLOAD_REQUEST, MEDIA_UPLOAD_SUCCESS, MEDIA_UPLOAD_FAILURE, MEDIA_DELETE_REQUEST, MEDIA_DELETE_FAILURE } from "../actions/actionTypes"



const initialListState = {
    items: [],
    loading: false,
    error:null,
}

export function galleryItemsListReducers(state = initialListState, action){
    switch(action.type){
        case GALLERY_FETCH_REQUEST:
            return {...state, loading: true, error: null}
        case GALLERY_FETCH_SUCCESS:
            return {...state, items: action.payload.items, loading: false, error: null}
        case GALLERY_FETCH_FAILURE: 
            return {...state, loading: false, error: action.payload.error}
        default:
            return state
    }
}
const initialEditState = {
    item: null,
    loading: false,
    error: null,
}

export function galleryItemEditReducer(state=initialEditState, action){
    switch(action.type){
        case MEDIA_UPLOAD_REQUEST:
            return{...state, loading: true, error: null}
        case MEDIA_UPLOAD_SUCCESS:
            return{...state, loading:false, error: null}
        case MEDIA_UPLOAD_FAILURE:
            return{...state, loading:false, error: action.payload.error}
        default:
                return state
    }
    
}

const initialRemoveState = {
    removeItem: null,
    loading: false,
    erorr: null,
}

export function galleryRemoveItemReducer(state=initialRemoveState, action){
    switch(action.type){
        case MEDIA_DELETE_REQUEST:
            return {...state, removeItem: action.payload.item, loading: true, error: null}
        case MEDIA_UPLOAD_SUCCESS:
            return {...state, removeItem: null, loading: false, error: null}
        case MEDIA_DELETE_FAILURE:
            return {...state, loading: false, error: action.payload.error}
        default:
            return state
    }
}

const galleryReducer = combineReducers({
    list: galleryItemsListReducers,
    edit: galleryItemEditReducer,
    remove: galleryRemoveItemReducer,
})
export default galleryReducer;