import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { galleryItemsListFetch } from '../../actions/actionCreators'
import GalleryItemsList from './GalleryItemsList'
import GalleryAddForm from '../GalleryAddForm/GalleryAddForm'
export default function Gallery() {
    const state = useSelector(state => state.gallery.list)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(galleryItemsListFetch())
    },[dispatch])
    return (
        <>
            <GalleryAddForm/>
            <GalleryItemsList {...state}/>
        </>
    )
}
