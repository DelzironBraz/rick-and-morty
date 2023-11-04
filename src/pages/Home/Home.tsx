import { useEffect, useState } from 'react';
import './Home.scss';
import { getCharacters } from '../../utils/fetchFromApi';
import CardsGrid from '../../components/Grid/CardsGrid';
import { Box, Pagination } from '@mui/material';

const Home = () => {
    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);

    useEffect(() => {
        getCharacters(page)
            .then(({ info: { pages }, results }) => {
                setCharacters(results);
                setCount(pages);
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    });

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <Box sx={{ width: '100%', height: '100vh' }} >
            <CardsGrid results={characters} />
            <Pagination
                sx={{ width: '100%', display: 'flex', justifyContent: 'center', paddingY: '2rem' }}
                count={count}
                page={page}
                siblingCount={0}
                onChange={handleChange}
                showFirstButton
                showLastButton
                variant="outlined"
                shape="rounded"
            />
        </Box>
    )
}

export default Home;