import React from 'react'
import Loader from '../Loader/Loader'
import GalleryItem from '../GalleryItem/GalleryItem'


export default function GalleryItemsList({ items, loading, error }) {

    console.log(items, loading)

    const getItems = () => {

        if (error) {
            return (
                <p>Ошибка при загрузке галлерии</p>
            )
        }
        return (<>
            {loading && <div>
                Загрузка записей
                   <Loader />
            </div>}
            {items.map(o => <GalleryItem key={o} item={o} />)}
        </>
        )
    }

    return (
        <div>
            {getItems()}
        </div>
    )
}
