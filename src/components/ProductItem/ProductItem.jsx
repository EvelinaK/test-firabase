import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useRouteMatch, useLocation ,useHistory} from 'react-router-dom';

import { DaysUntil, Sale} from '../../helpers/index'

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import {deleteProduct} from '../../redux/userProducts/userProductsOperations';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';

export default function ProductItem({product}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  
  const removeProduct = () => {
    dispatch(deleteProduct(product.id));
  };
  
  const  WithSale = DaysUntil(product.saleEndDate) !== 0 && product.sale >= 10;

  return (
    <>
     <Grid item xs={12}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={`${product.image}`}
          />
          <CardContent className="Link-detail">
          <h2>Product :{product.title}</h2>
              <div className="location-box">
                <h3> Price: <p withSale={Sale}>${(product.price)}</p></h3>
                    { WithSale && <div>-{product.sale}%</div>} 
                    { WithSale && (
                    <>
                    <div>
                    <h3> With Sale: ${(Sale(product.price,product.sale))}</h3>
                    </div>
                    <div>
                    <h3>  Days until sale ends: {DaysUntil(product.saleEndDate)}</h3>
                    </div>
                    </>
                )}
              </div>
              <Typography paragraph>
    
          </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions disableSpacing>


          <Button
        variant="contained"
        style={{ color: '#669c54'}}
        size="large"
        className={classes.button}
        startIcon={<EditIcon />}
        // onClick={() => history.push(`/edit/${product.id}`)}
      >
        onClick={() => history.push(`/edit/${product.id}`)} Edit
      </Button>
          <IconButton
            aria-label="delete"
            color="secondary"
            onClick={() => removeProduct(product.id)}
          >
            <DeleteIcon style={{ color: red[500],fontSize: 40 }} />
          </IconButton>

          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Description</Typography>
          <Typography paragraph>
          Description of product
          </Typography>
          <Typography paragraph style={{ 'word-break': 'break-word' }}>
          {product.description}
          </Typography>
        </CardContent>
      </Collapse>
      </Card>
      </Grid>
    </>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    width: 354,
    margin: 25,
    display: 'flex',
    justifyContent:'center',
    flexDirection: 'column',
    backgroundColor: 'rgba(255, 255, 255, 0.4);',
    boxShadow:' 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
    textDecoration: 'none',
    color: '#000000ba',
    fontSize: '30px', 
     '&:hover': {
        boxShadow:' 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
      }
  },

  media: {
    height: 0,
    paddingTop: '30.9%',
    backgroundSize: '25%',
  },

  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },

  Typography:{
display:'flex',
wordbreak:'break-word',
  }

}));
