import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import { CardMedia } from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import API from "../WebAPI/mongoapi";

const styles = theme => ({
    ListItemStyle: {
        borderBottom: 'solid .1px teal',
    },
    ListItemTextStyle: {
        minWidth: '200px',
    },
    coverSmall: {
        width: 50,
        height: 50,
        borderRadius: 0
    },
});

class ProductList extends Component {
    constructor() {
        super();
        this.getProduct();
    }
    state = {
        products: []
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.newProduct._id && this.props.newProduct._id !== nextProps.newProduct._id) {
            const plist = this.state.products;
            plist.push(nextProps.newProduct);
            this.setState({
                products: plist
            });
        }
    }

    getProduct() {
        API.ReadAll().then(products => {
            this.setState({
                products: products
            });
        });
    }
    editProduct = (index) => (e) => {
        const selectedProduct = this.state.products[index];
        this.props.editProduct(e, selectedProduct);
    };
    deleteProduct = (id, index) => () => {
        API.DeleteOne(id).then(res => {
            const pList = this.state.products;
            pList.splice(index, 1);
            this.setState({
                products: pList
            });

        });
    };

    render() {
        const { classes } = this.props;
        return (<List>
            {this.state.products.map((product, index) => (
                <ListItem
                    key={product._id}
                    button
                    className={classes.ListItemStyle} >
                    <Checkbox
                        tabIndex={-1}
                        disableRipple
                    />
                    <CardMedia
                        className={classes.coverSmall}
                        image={product.ProductImage}
                        title="Live from space album cover"
                    />
                    <ListItemText inset primary={product.Name} className={classes.ListItemTextStyle}
                        secondary={product.Price}>
                    </ListItemText>
                    <ListItemSecondaryAction>
                        <IconButton aria-label="Edit" onClick={this.editProduct(index)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label="Delete" onClick={this.deleteProduct(product._id, index)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                    <br />
                </ListItem>
            ))}
        </List>)
    }
}

ProductList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductList);