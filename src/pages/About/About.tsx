import { useEffect, useState } from 'react';
import './About.scss';
import { getCharacterById } from '../../utils/fetchFromApi';
import { Link, useParams } from 'react-router-dom';
import { Box, Button, CircularProgress, CssBaseline, List, ListItem, ListItemText, ThemeProvider, createTheme } from '@mui/material';
import { green } from '@mui/material/colors';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const About = () => {
    const { characterId } = useParams();

    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCharacterById(Number(characterId))
            .then((data) => {
                if (data) {
                    setCharacter(data);
                } else {
                    console.warn('Character not found.');
                }

                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching character:', error);
                setLoading(false);
            });
    }, [characterId]);

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
                )
                    : character ? (
                        <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', flexDirection: 'column', height: '100vh', width: '100%' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'start', width: '100%', padding: '2rem' }}>
                                <Link to="/">
                                    <Button variant="outlined" color='primary' sx={{ padding: '1rem' }}>
                                        <AiOutlineArrowLeft style={{ fontSize: '1.3rem' }} />
                                    </Button>
                                </Link>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'center', md: 'space-between' }, alignItems: 'center', width: '100%', flexDirection: { xs: 'column', sm: 'column', md: 'row' } }} >
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: { xs: '100%', sm: '100%', md: '30%' } }}>
                                    <img src={character.image} alt={character.name} />
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: { xs: '100%', sm: '100%', md: '65%' } }}>
                                    <List sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', flexDirection: 'row', paddingX: { xs: '2rem', sm: '2rem' } }}>
                                        <ListItem sx={{ width: { xs: '100%', sm: '100%', md: '33%' } }}>
                                            <ListItemText primary="Name" secondary={character.name} />
                                        </ListItem>
                                        <ListItem sx={{ width: { xs: '100%', sm: '100%', md: '33%' } }}>
                                            <ListItemText primary="Status" secondary={character.status} />
                                        </ListItem>
                                        <ListItem sx={{ width: { xs: '100%', sm: '100%', md: '33%' } }}>
                                            <ListItemText primary="Species" secondary={character.species} />
                                        </ListItem>
                                        <ListItem sx={{ width: { xs: '100%', sm: '100%', md: '33%' } }}>
                                            <ListItemText primary="Gender" secondary={character.gender} />
                                        </ListItem>
                                        <ListItem sx={{ width: { xs: '100%', sm: '100%', md: '33%' } }}>
                                            <ListItemText primary="Origin" secondary={character.origin.name} />
                                        </ListItem>
                                        <ListItem sx={{ width: { xs: '100%', sm: '100%', md: '33%' } }}>
                                            <ListItemText primary="Location" secondary={character.location.name} />
                                        </ListItem>
                                    </List>
                                </Box>
                            </Box>
                        </Box>
                    )
                        : (<h1>Character not found</h1>)
                }
            </CssBaseline>
        </ThemeProvider>
    );
};

export default About;