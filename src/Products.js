import React, {Fragment, useEffect} from "react";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    Grid,
    Typography,
    IconButton, Box
} from "@material-ui/core";
import {fetchProducts} from "./actions";
import {connect} from "react-redux";
import {makeStyles} from "@material-ui/styles";
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import {Link,} from "react-router-dom";

const useStyles = makeStyles(theme=>({
    root: {
        minWidth: 275,
        padding: 10,
        minHeight:"75vh"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    counter: {
        display: "flex",
        alignItems: "center",
        justifyContent:"center",
    },
    iconBtn: {
        fontSize: "2rem",
    },
    jc:{
        justifyContent:"center"
    },
    img:{
        // width: 200
    }
}));

function Products(props) {
    const classes = useStyles();
    const {products, error, isLoading, productsReducer, addedProducts} = props;
    console.log("productsReducer=", productsReducer);

    useEffect(() => {
        // console.log("products length=", products.length > 0);
        if (!products.length > 0) {
            props.fetchProducts();
        }
    }, []);
    const handleAddItemClick = (id) => {
        props.addToCart(id);
    }
    const handleAddingProductQuantity = (id) => {
        props.addQuantity(id);
    }
    const handleSubtractProductQuantity = (id) => {
        props.subtractQuantity(id);
    }
    return (
        <div>
            <Box textAlign="left" m={2}>
                <Button variant={"contained"} color={"primary"} disabled={addedProducts.length == 0} component={Link}
                        to={"/cart"}>
                    GO TO Cart
                </Button>
            </Box>

            {error != "" ? <Typography color={"primary"}>{error}</Typography> : null}
            {isLoading ? <CircularProgress color="secondary"/>
                :
                <Fragment>
                    <Grid container spacing={1}>
                        <Fragment>
                            {products.length > 0 && products.map((product, i) =>
                                <Grid item key={i} md={3} style={{margin: 12}}>
                                    <Card className={classes.root} key={i}>
                                        <CardContent>
                                            <Typography className={classes.title} color="textSecondary"
                                                        gutterBottom>
                                                <b>Product</b>
                                            </Typography>
                                            <Typography component="h2">
                                                {product.name}
                                            </Typography>
                                            <Typography align={"center"}>
                                                <img className={classes.img} src={product.icon} alt={"Icon"} height={"100%"}/>
                                            </Typography>
                                            <Typography component="p">
                                                <b>Price:</b> {product.price}
                                            </Typography>
                                        </CardContent>
                                        <CardActions className={classes.jc}>
                                            {(product.quantity) ?
                                                <div className={classes.counter}>
                                                    <IconButton className={classes.iconBtn}
                                                                onClick={() => handleAddingProductQuantity(product.id)}>
                                                        <AddBoxRoundedIcon/>
                                                    </IconButton>
                                                    <Typography color={"primary"}
                                                                variant={"body1"}>{product.quantity}</Typography>
                                                    <IconButton className={classes.iconBtn}
                                                                onClick={() => handleSubtractProductQuantity(product.id)}>
                                                        <IndeterminateCheckBoxIcon/>
                                                    </IconButton>
                                                </div>
                                                :
                                                <IconButton className={classes.iconBtn}
                                                            onClick={() => handleAddItemClick(product.id)}>
                                                    <AddBoxRoundedIcon/>
                                                </IconButton>
                                            }
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )}
                        </Fragment>
                    </Grid>
                </Fragment>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    products: state.products.products,
    error: state.products.error,
    isLoading: state.products.isLoading,
    productsReducer: state.products,
    addedProducts: state.products.addedProducts,
});
const mapDispatchToProps = (dispatch) => ({
    fetchProducts: () => dispatch(fetchProducts()),
    addToCart: (id) =>
        dispatch({
            type: "ADD_TO_CART",
            id
        })
    ,
    addQuantity: (id) =>
        dispatch({
            type: "ADD_QUANTITY",
            id
        })
    ,
    subtractQuantity: (id) => dispatch({
        type: "SUB_QUANTITY",
        id
    })
});
export default connect(mapStateToProps, mapDispatchToProps)(Products);