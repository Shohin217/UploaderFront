import client from '../http'
import { GALLERY_FETCH_REQUEST, GALLERY_FETCH_SUCCESS, GALLERY_FETCH_FAILURE, MEDIA_UPLOAD_REQUEST, MEDIA_UPLOAD_SUCCESS, MEDIA_UPLOAD_FAILURE, MEDIA_DELETE_REQUEST, MEDIA_DELETE_SUCCESS, MEDIA_DELETE_FAILURE } from './actionTypes'


export const galleryItemsListFetchRequest = ()=>{
    return{
        type: GALLERY_FETCH_REQUEST,
        payload: {}
    }
}
export const galleryItemsListFetchSuccess = items =>{
    return{
        type: GALLERY_FETCH_SUCCESS,
        payload: {items}
    }
}
export const galleryItemsListFetchFailure = error =>{
    return{
        type: GALLERY_FETCH_FAILURE,
        payload: { error }
    }
}

export const galleryItemsListFetch =  () => async (dispatch, getState) =>{
    console.log('getted!')
    dispatch(galleryItemsListFetchRequest())
    try{
        const { data } = await client.get('/media')
        dispatch(galleryItemsListFetchSuccess(data))
    }catch(error){
        dispatch(galleryItemsListFetchFailure(error))
    }
}

export const galleryUploadRequest = () =>{
    return{
        type: MEDIA_UPLOAD_REQUEST,
        payload: {}
    }
}
export const galleryUploadSuccesss = item =>{
    return{
        type: MEDIA_UPLOAD_SUCCESS,
        payload: { item }
    }
}
export const galleryUploadFailure = error =>{
    return{
        type: MEDIA_UPLOAD_FAILURE,
        payload: { error }
    }
}

export const galleryUpload = file => async dispatch =>{
    dispatch(galleryUploadRequest())
    try {
        const data = new FormData()
        data.append('media', file, file.name);
        const response = await client.post('/upload', data)
        console.log(response)
        dispatch(galleryUploadSuccesss())
        dispatch(galleryItemsListFetch(data))
    } catch (error) {
        dispatch(galleryItemsListFetchFailure(error))
    }
}



export const mediaDeleteRequest = item =>{
    return{
        type: MEDIA_DELETE_REQUEST,
        payload: {item}
    }
}
export const mediaDeleteSuccess = () =>{
    return{
        type: MEDIA_DELETE_SUCCESS,
        payload: {}
    }
}
export const mediaDeleteFailure = error =>{
    return{
        type: MEDIA_DELETE_FAILURE,
        payload: {error}
    }
}

export const mediaDelete = item => async dispatch => {
    dispatch(mediaDeleteRequest(item))
    try{
        const response = await client.delete(`/media/${item}`)
        dispatch(mediaDeleteSuccess())
        dispatch(galleryItemsListFetch())
    }catch(error){
        dispatch(mediaDeleteFailure(error))
    }
}

