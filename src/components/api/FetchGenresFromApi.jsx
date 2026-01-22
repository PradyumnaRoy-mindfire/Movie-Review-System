import { useState, useEffect } from "react";
const genreApiUrl = import.meta.env.VITE_GENRE_URL


function FetchGenreData() {
    const [genres, setGenre] = useState([]);

    useEffect(() => {
        genreData();
    }, [])

    async function genreData() {
        const url = genreApiUrl
        let res = await fetch(url, {
            method: 'GET'
        })
        res = await res.json();
        setGenre(res.genres);
    }

    const genreNameIdMap = Object.fromEntries(
        genres.map(g => [g.id, g.name])
    );

    return { genres, genreNameIdMap };
}

export default FetchGenreData;