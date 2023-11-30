// These components will be making separate API calls from the app
// component to serve specific data about our artist
import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

function ArtistView() {
    const [ artistData, setArtistData ] = useState([])

    const { id } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `http://localhost:4000/album/${id}`
                const response = await fetch(url)
                const data = await response.json()
    
                const albums = data.results.filter(item => item.collectionType === 'Album')
                setArtistData(albums)
            } catch (error) {
                console.log('ERROR', error)
            }
        }

        fetchData()
    }, [id])

    const albumDisplay = artistData.map(album => {
        return (
            <div key={album.collectionId}>
                <Link to={`/album/${album.collectionId}`}>
                <p>{album.collectionName}</p>
                </Link>
            </div>
        )
    })

const navButtons = () => {
    return (
        <div>
            <button onClick={() => navigate(-1)}>back</button>
            |
            <button onClick={() => navigate('/')}>Home</button>
        </div>
    )
}

    return (
        <div>
            {navButtons()}
            <p>Artist Data Goes Here!</p>
            <p>ID: {id}</p>
            {albumDisplay}
        </div>
    )
}

export default ArtistView