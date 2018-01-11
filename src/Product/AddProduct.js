import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import API from "../WebAPI/mongoapi";
import PhotoCamera from 'material-ui-icons/PhotoCamera';

const formData = require('form-data');

API.URL = "http://localhost:2000/products/";
API.BaseURL = "http://localhost:2000/";

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
        color: theme.palette.text.secondary,
    },
    pos: {
        marginBottom: 12,
        color: theme.palette.text.secondary,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    ButtonStyle: {
        backgroundColor: '#2196F3',
    },
    avatar: {
        margin: 10,
    },
    bigAvatar: {
        width: 60,
        height: 60,
    },
    cover: {
        width: 120,
        height: 120,
        marginTop: -75,
        borderWidth: '1px',
        borderColor: 'lightblue',
        borderStyle: 'solid',
        borderRadius: 0
    },
    inputfile: {
        width: '0.1px',
        height: '0.1px',
        opacity: 0,
        overflow: 'lime',
        position: 'absolute',
        zIndex: -1
    },
    button: {

    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
});

class AddProduct extends React.Component {

    constructor() {
        super();
        this.editProduct = this.editProduct.bind(this);
    }
    productItem = {
        Name: '',
        Price: 0,
        ProductImage: 'http://localhost:2000/uploads/product.png'
    }

    state = {
        index: 0,
        id: '',
        product: this.productItem,
        newProduct: {},
        AddOrUpdate: 'Add',
        fileFormData: new formData()
    };

    editProduct(e, selectedProduct) {
        e.preventDefault();
        this.setState({
            AddOrUpdate: 'Update',
            product: selectedProduct,
            id: selectedProduct._id
        });
    };

    postProduct = value => (e) => {
        e.preventDefault();
        console.log(this.state.product);
        API.CreateWithFormData(this.state.product, this.state.fileFormData).then(json => {
            if (json) {
                this.setState({
                    newProduct: json,
                });
            }
        });
        this.clearProduct();
    };

    patchProduct = value => (e) => {
        e.preventDefault();
        let updates = [];
        const selectedProduct = this.state.newProduct;
        for (const key in this.productItem) {
            if (this.productItem.hasOwnProperty(key)) {
                if (this.state.product[key] !== selectedProduct[key]) {
                    updates.push({ "key": key, "value": this.state.product[key] });
                }
            }
        }
        console.log(updates);
        API.UpdateOne(updates, this.state.id).then(res => {
            console.log(res);
        });
        this.clearProduct();
    }

    handleChange = name => event => {
        if (this.productItem.hasOwnProperty(name)) {
            const p = this.state.product;
            p[name] = event.target.value;
            this.setState({
                product: p
            });
        }
    };
    handleCancle = value => () => {
        this.clearProduct();
    };
    clearProduct = () => {
        this.setState({
            product: this.productItem,
            index: 0,
            id: '',
            AddOrUpdate: 'Add',
            fileFormData: new formData(),

        })
    }
    FileLoaded = value => event => {
        var selectedFiles = event.target.files;
        if (selectedFiles.length > 0) {
            const fData = new formData();
            fData.append('productImage', selectedFiles[0]);
            const p = this.state.product;
            p.ProductImage = window.URL.createObjectURL(selectedFiles[0]);
            this.setState({
                product: p,
                fileFormData: fData
            });
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography type="headline" component="h2" color='primary'>
                            Add new Product
                        </Typography>
                        <TextField
                            id="name"
                            label="Name"
                            className={classes.textField}
                            onChange={this.handleChange('Name')}
                            margin="normal"
                            value={this.state.product.Name}
                        />
                        <TextField
                            id="name"
                            label="Price"
                            className={classes.textField}
                            onChange={this.handleChange('Price')}
                            margin="normal"
                            value={this.state.product.Price}
                        />
                        <input accept="image/*" id="icon-button-file" type="file"
                            onChange={this.FileLoaded()} className={classes.inputfile} />
                        <label htmlFor="icon-button-file" >
                            <IconButton color="accent" className={classes.button} component="span">
                                <PhotoCamera />
                            </IconButton>
                        </label>
                    </CardContent>
                    <CardActions>
                        <Button raised color="primary" className={classes.ButtonStyle}
                            onClick={this.state.AddOrUpdate === 'Add' ? this.postProduct() : this.patchProduct()}>
                            {this.state.AddOrUpdate}
                        </Button>
                        <Button raised color="primary" onClick={this.handleCancle()} className={classes.ButtonStyle}>
                            Cancel
                        </Button>
                        <CardMedia
                            className={classes.cover}
                            image={this.state.product.ProductImage}
                            title="Live from space album cover"
                        />
                    </CardActions>
                </Card>
                
            </div>
        );
    }
}

AddProduct.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddProduct);