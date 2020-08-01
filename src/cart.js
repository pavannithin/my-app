import React, {Fragment, useEffect} from "react";
import {connect} from "react-redux";
import {Grid, Typography, Button, Box, TextField} from "@material-ui/core";
import {Link} from "react-router-dom";
import {withRouter} from "react-router";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

function Cart(props) {
    const classes = useStyles();
    const {addedProducts, total} = props;
    const {location: {pathname}, history} = props;
    const [errors, setErrors] = React.useState({});
    const [values, setValues] = React.useState({});
    const handleChange = (event) => {
        event.persist();
        setValues(values => ({...values, [event.target.name]: event.target.value}));
    };
    useEffect(() => {
        if (Object.keys(errors).length === 0) {
            handleFinialSubmit();
        }
    }, [errors]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validate(values));

    }
    const handleFinialSubmit = () => {
        console.log("form Submitted");
        console.log("Selected Products:= ", addedProducts);
        console.log("Total:= ", total);
        console.log("Form Details as follow");
        console.log(values);
    }

    const validate = () => {
        let errors = {};
        if (!values.email) {
            errors.email = 'Email address is required';
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = 'Email address is invalid';
        }
        if (!values.name) {
            errors.name = 'Name is required';
        }
        if (!values.phone) {
            errors.phone = 'Phone is required';
        }
        return errors;
    }
    return (
        <Grid container spacing={2} justify={"flex-start"}>
            <Grid item md={12}>
                <Box textAlign="left" m={2}>
                    <Button variant={"contained"} color={"default"} onClick={() => history.goBack()}>
                        Go Back
                    </Button>
                </Box>
            </Grid>
            <Grid item md={12}>
                <Typography color={"textPrimary"} variant={"h4"} align={"left"}>Cart Review:</Typography>
            </Grid>
            <Grid item md={12}>
                {addedProducts.map((addedProduct,i) => <div key={i}>
                        <Box>
                            <Typography variant={"body1"} color={"primary"} align={"left"} gutterBottom>
                                Product Name: {addedProduct.name}</Typography>
                        </Box>
                        <Box>
                            <Typography variant={"body1"} color={"primary"} align={"left"} gutterBottom>
                                Product Quantity: {addedProduct.quantity}
                            </Typography>
                        </Box>
                    </div>
                )}
                <Typography align={"left"} color={"primary"} variant={"h5"}><b> Total: {total}</b></Typography>
            </Grid>
            <Grid item>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
                    <TextField name={"name"} label="Name"
                        // onChange={e => setName(e.target.value)}
                               onChange={handleChange}
                               value={values.name || ''}
                               error={errors.name ? true : false}
                               helperText={errors.name ? errors.name : ''}
                               required
                    />
                    <TextField name={"email"} label="Email Address"
                        // onChange={e => setEmail(e.target.value)}
                               onChange={handleChange}
                               value={values.email || ''}
                               error={errors.email ? true : false}
                               helperText={errors.email ? errors.email : ''}
                               required/>
                    <TextField name={"phone"} label="Phone Number"
                        // onChange={e => setPhone(e.target.value)}
                               onChange={handleChange}
                               value={values.phone || ''}
                               error={errors.phone ? true : false}
                               helperText={errors.phone ? errors.phone : ''}
                               required
                    />
                    <Box>
                        <Button type={"submit"} variant={"contained"}>Submit</Button>
                    </Box>
                </form>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = state => ({
    addedProducts: state.products.addedProducts,
    error: state.products.error,
    isLoading: state.products.isLoading,
    total: state.products.total,

});
export default withRouter(connect(mapStateToProps, null)(Cart));