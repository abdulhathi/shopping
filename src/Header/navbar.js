import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Button from 'material-ui/Button';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';

class navbar extends Component {
    constructor() {
        super();
        this.state = {
            Categories: []
        }
        fetch("http://localhost:4000/api/category").then(function (data) {
            return data.json();
        }).then(json => {
            this.setState({
                Categories: json
            });
        });
    }
    state = {
        top: false,
        left: false,
        bottom: false,
        right: false,
    };
    toggleDrawer = (position, isOpen) => () => {
        this.setState({
            [position]: isOpen
        });
    };
    render() {
        var Categories = this.state.Categories.map(function (cat, index) {
            return (
                <List key={index}>
                    {cat.CategoryName}
                </List>
            )
        });
        return (
            <div>
                <Drawer open={this.state.left}
                    onClose={this.toggleDrawer('left', false)}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('left', false)}
                        onKeyDown={this.toggleDrawer('left', false)}>
                        <div className="drawerList">
                            {Categories}
                        </div>
                    </div>
                </Drawer>
                <AppBar position="static">
                    <Toolbar className="AppBar">
                        <IconButton color="contrast" onClick={this.toggleDrawer('left', true)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography color="inherit" className="flex">
                            Shopping Kart
                        </Typography>
                        <Button>Products</Button>
                    </Toolbar>
                </AppBar>
                
            </div>
        );
    }
}

export default navbar;