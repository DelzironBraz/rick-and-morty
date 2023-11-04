import './CardsGrid.scss';
import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';

const CardsGrid = ({ results }) => {
    return (
        <Box sx={{ flexGrow: 1, padding: '1rem' }}>
            <Grid sx={{ justifyContent: 'space-between', alignItems: 'center' }} container spacing={2} columnSpacing={{ sx: 1, sm: 2, md: 3, lg: 4 }} rowSpacing={2} columns={{ xs: 1, sm: 2, md: 4 }}>
                {results.map(({ id, name, image }) => (
                    <Grid item key={id}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height={300}
                                    width={300}
                                    image={image}
                                    alt={name}
                                />
                                <CardContent>
                                    <Typography sx={{ textAlign: 'center' }} gutterBottom variant="h5" component="div">
                                        {name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default CardsGrid;