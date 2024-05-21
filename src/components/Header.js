import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import ShopTwoOutlinedIcon from '@material-ui/icons/ShopTwoOutlined';

const StyledBadge = withStyles((theme) => ({
    badge: {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}))(Badge);

const useStyles = makeStyles({
    root: {
        display: "flex"
    },
    title: {
        fontSize: 18,
    },

});

const Header = () => {
    const classes = useStyles();
    const numberCart = useSelector((state) => state.Products.numberCart)
    return (
        <Grid item xs={12} sm={12}>
            <Card className={classes.root}>
                <Box m={2} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                    <Box className={classes.title} color="textSecondary" >
                        <Link to="/" className="nav-link active"> <ShopTwoOutlinedIcon /></Link>
                    </Box>
                    <Box className={classes.title} color="textSecondary" >
                        <Link to="/carts" className="nav-link">
                            <IconButton aria-label="cart">
                                <StyledBadge badgeContent={numberCart} color="secondary">
                                    <ShoppingCartIcon />
                                </StyledBadge>
                            </IconButton>
                        </Link>
                    </Box>
                </Box>
            </Card>
        </Grid>
    )
}
export default Header

