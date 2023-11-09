import { useEffect, useState } from 'react';
import './About.scss';
import { getCharacterById } from '../../utils/fetchFromApi';
import { Link, useParams } from 'react-router-dom';
import { Box, Button, List, ListItem, ListItemText } from '@mui/material';

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

    return (
        <>
            {loading ? (<h1>Loading...</h1>)
                : character ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <Button variant="contained">
                            <Link to="/">
                                Back
                            </Link>
                        </Button>
                        <Box>
                            <Box>
                                <img src={character.image} alt={character.name} />
                            </Box>
                            <Box>
                                <List>
                                    <ListItem>
                                        <ListItemText primary="Name" secondary={character.name} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Status" secondary={character.status} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Species" secondary={character.species} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Gender" secondary={character.gender} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Origin" secondary={character.origin.name} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Location" secondary={character.location.name} />
                                    </ListItem>
                                </List>
                            </Box>
                        </Box>
                    </Box>
                )
                    : (<h1>Character not found</h1>)
            }
        </>
    );
};

export default About;