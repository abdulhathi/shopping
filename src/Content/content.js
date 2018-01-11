import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import { HomeComponent } from "../routes/About";


class Content extends Component {
    render() {
        const Loading = () => <div>Loading...</div>;

        const Home = Loadable({
            loader: () => import('../routes/Home'),
            loading: Loading,
        });

        const About = Loadable({
            loader: () => import('../routes/About'),
            loading: Loading,
        });
        
        const Product = Loadable({
            loader: () => import('../Product/product'),
            loading: Loading,
        });
        //var productImage = require('../Images/product.png');
        const ProductImage = Loadable({
            loader: () => import('../Images/product.png'),
            loading: Loading,
        });

        const App = () => (
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/product" component={Product} />
                    <Route path="/productimage" component={ProductImage} />
                </Switch>
            </Router>
        );

        return (
            <App />
        )
    }
}

export default Content