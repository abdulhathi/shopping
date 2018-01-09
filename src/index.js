import React from 'react';
import ReactDOM from 'react-dom';
import RootApp from './App';
import './index.css';

function App()
{
    return (
        <div>
            <RootApp />
        </div>
    )
}
//const element = <Welcome name="sara" />;
ReactDOM.render(
    <App />,
    document.getElementById('root')
  );

// // import './index.css';
// // import App from './App';
// // import registerServiceWorker from './registerServiceWorker';
// mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://localhost/mykart",{
//     useMongoClient: true,
// });
// let result = "";
// function getCategories(result)
// {
//     fetch("http://localhost:4000/api/category").then(function(res){
//          return (res.json());
//     }).then(json => {
//         result = json.map(function(cat,index){
//              //return cat.CategoryName;
//               console.log(cat);
//             return(<ul>
//                 <li key={index}>
//                     <span>{cat.CategoryName}</span>
//                     <ul>
//                         <li>{cat.Products[0].ProductName}</li>
//                     </ul>
//                 </li>
//                 </ul>);
//         });
//         ReactDOM.render(result, document.getElementById('root'));
//     });
//     console.log("hi")
// }


// const app = React.createElement({
//     getini
//     componentDidMount()
//     {
//         console.log("componentDidMount");
//     }
// })
// getCategories(result);
