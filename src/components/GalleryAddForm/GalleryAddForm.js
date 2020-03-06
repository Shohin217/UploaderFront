import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { galleryUpload } from '../../actions/actionCreators'
import Loader from '../Loader/Loader'

export default function GalleryAddForm() {
    const { loading, error } = useSelector(state => state.gallery.edit)
    const dispatch = useDispatch()
    const fileRef = useRef(null)

    const handleSubmit = evt => {
        evt.preventDefault()
    }

    const handleFileChange = () => {
        const [file] = Array.from(fileRef.current.files)
        if (file === undefined) {
            return
        }
        dispatch(galleryUpload(file))
        fileRef.current.value = ''
    }
    const getFooter =()=>{
        if(loading){
            return <Loader />
        }
        if(error){
            return <div>Произошла ошибка при добовлении записи</div>
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="file" ref={fileRef} onChange={handleFileChange} accept='image/*, video/*, audio/*' />
            </form>
            {getFooter()}
        </>

    )
}
