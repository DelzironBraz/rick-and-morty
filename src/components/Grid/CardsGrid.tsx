import { Link } from 'react-router-dom';
import './CardsGrid.scss';
import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';

const CardsGrid = ({ results }) => {

    return (
        <Box sx={{ flexGrow: 1, padding: '1rem' }}>
            <Grid sx={{ justifyContent: 'space-around', alignItems: 'center' }} container spacing={2} rowSpacing={2} columns={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                {results.map(({ id, name, image }) => (
                    <Grid item xs={8} key={id} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Link to={`about/${id}`}>
                            <Card sx={{ maxWidth: 300, height: '400px' }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height={300}
                                        width={300}
                                        image={image}
                                        alt={name}
                                    />
                                    <CardContent sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', height: '100%', textAlign: 'center' }}>
                                        <Typography variant="h5" component="div">
                                            {name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default CardsGrid;