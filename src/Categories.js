import React, { Component } from 'react';

export default class Category extends Component {
    constructor()
    {
        super();
        this.state = {
            Categories: []
        }
        fetch("http://localhost:4000/api/category").then(function(data){
            return data.json();
        }).then(json => {
            //console.log(json);
            this.setState({
                Categories: json
            });
        });
    }
    render() {
        function getProducts(products)
        {
            var plist = products.map(function(p,i){
                return (<li key={i}>
                    <h4>{p.ProductName}</h4>
                    <h5>$ {p.ProductPrice}</h5>
                    {p.AvailableCount} Available
                </li>);
            });
            return plist
        }
        var Categories = this.state.Categories.map(function(cat,index){
            var pList = getProducts(cat.Products);  
            return (
                <li key={index}>
                    {cat.CategoryName}
                    <ul>
                        {pList}
                    </ul>
                </li>
            )
        });
        
        return <ul>
            {Categories}
        </ul>;
    }
}

