import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';




export const MapCardItem = ({image, description, name}) => {

    return (
        <Card sx={{
            maxWidth: 500,
          }}>
            <CardActionArea>
                <CardMedia sx={{
                        height: 200,
                    }} image = {image} title= "MapPreview" />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Open in editor
                </Button>
                <Button size="small" color="primary">
                    Delete
                </Button>
            </CardActions>
        </Card>
    )
}