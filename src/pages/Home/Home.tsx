import { useEffect, useState } from 'react';
import './Home.scss';
import { getCharacters } from '../../utils/fetchFromApi';
import CardsGrid from '../../components/Grid/CardsGrid';
import { Box, Pagination, TextField } from '@mui/material';

const Home = () => {
    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [searchName, setSearchName] = useState('');

    useEffect(() => {
        getCharacters(page, searchName)
            .then(({ info: { pages }, results }) => {
                setCharacters(results);
                setCount(pages);
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }, [page, searchName]);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        setSearchName(event.target.value);
        setPage(1);
    }

    return (
        <Box sx={{ width: '100%', height: '100vh' }} >
            <Box sx={{ width: '80%', padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <TextField
                    sx={{ width: '40%', }}
                    value={searchName}
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                    onChange={handleSearch}
                />
            </Box>
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