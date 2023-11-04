import { useEffect, useState } from 'react';
import './Home.scss';
import { getCharacters } from '../../utils/fetchFromApi';
import CardsGrid from '../../components/Grid/CardsGrid';
import { Box } from '@mui/material';

const Home = () => {
    const [characters, setCharacters] = useState([]);
    useEffect(() => {
        getCharacters()
            .then(({ results }) => {
                setCharacters(results);
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    })

    return (
        <Box sx={{ width: '100%', height: '100vh' }} >
            <CardsGrid results={characters} />
        </Box>
    )
}

export default Home;