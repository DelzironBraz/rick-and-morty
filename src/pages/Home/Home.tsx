import { useEffect, useState } from 'react';
import './Home.scss';
import { getCharacters } from '../../utils/fetchFromApi';
import CardsGrid from '../../components/Grid/CardsGrid';
import { Box, CircularProgress, InputAdornment, Pagination, TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { green } from '@mui/material/colors';
import { BiSearchAlt } from 'react-icons/bi';

const Home = () => {
    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [searchName, setSearchName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCharacters(page, searchName)
            .then(({ info: { pages }, results }) => {
                setCharacters(results);
                setCount(pages);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false);
            })
    }, [page, searchName]);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        setSearchName(event.target.value);
        setPage(1);
    };

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: green
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%' }}>
                        <CircularProgress color="success" size={200} />
                    </Box>
                ) : characters ? (
                    <Box sx={{ width: '100%', height: '100vh' }} >
                        <Box sx={{ width: '100%', padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TextField
                                sx={{ width: { xs: '100%', sm: '100%', md: '50%' } }}
                                value={searchName}
                                id="outlined-basic"
                                label="Search by Name"
                                variant="outlined"
                                onChange={handleSearch}
                                color='success'
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <BiSearchAlt style={{ fontSize: '1.5rem' }} />
                                        </InputAdornment>
                                    ),
                                }}
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
                            color='primary'
                        />
                    </Box>
                ) : (<h1>Can´t find Characters</h1>)}
            </CssBaseline>
        </ThemeProvider>

    );
}

export default Home;