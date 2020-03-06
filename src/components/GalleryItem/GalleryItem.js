import React, {useMemo}from 'react'
import { getExtension } from "../../utils";
import {useDispatch, useSelector} from 'react-redux'
import { mediaDelete } from '../../actions/actionCreators';
import Loader from '../Loader/Loader';



export default function GalleryItem({item}) {
    const {removeItem, loading, error} = useSelector(store => store.gallery.remove)
    
    const dispatch = useDispatch()
    const ext = useMemo(() => getExtension(item), [item]);
    const handlerRemove =()=>{
       dispatch(mediaDelete(item))
    }

    const getFooter = () =>{
        if(loading && removeItem === item){
            return (
                <div>
                    Удаление
                    <Loader/>
                </div>
            )
        }
        if(error){
            return(
                <div>Произошла ошибка при удалении записи</div>
            )
        }
       return <button onClick={handlerRemove}>Удалить!</button>
    }
    return(
        <div>
            {ext === '.png' && <img  src={`${process.env.REACT_APP_MEDIA_URL}/${item}`} alt='IMG' />}
            {ext === '.jpg' && <img  src={`${process.env.REACT_APP_MEDIA_URL}/${item}`} alt='IMG' />}
            {ext === '.mp3' && <audio controls='enabled' src={`${process.env.REACT_APP_MEDIA_URL}/${item}`} />}
            {ext === '.mp4' && <video controls='enabled' src={`${process.env.REACT_APP_MEDIA_URL}/${item}`} />}
            {getFooter()}
            {/* [a href={`${process.env.REACT_APP_MEDIA_URL}/${item}`} download]
                <button>Скачать</button>
            [/a] */}
        </div>
    )
}
