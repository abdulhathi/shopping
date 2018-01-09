
// const fs = require('fs');
var Domain = String;
var URL = String;

var Create = function (body) {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify(body),
    };
    var req = new Request(this.URL, options);
    const promise = fetch(req).then(res => {
        return res.status === 200 ? res.json() : '';
    });
    CatchError(promise);
    return promise;
}

var CreateWithFormData = function (body, fileFormData) {
    //var form = new formData();
    fileFormData.append('Name', body['Name']);
    fileFormData.append('Price', body['Price']);
    //form.append('productImage', url)
    const options = {
        method: 'POST',
        mode: 'cors',
        body: fileFormData,
    };
    
    var req = new Request(this.URL, options);
    const promise = fetch(req).then(res => {
        return res.status === 200 ? res.json() : '';
    });
    CatchError(promise);
    return promise;
}

var ReadAll = function(){
    const promise =  fetch(this.URL).then(res => {
        //console.log(res);
        return res.json();
    });
    CatchError(promise);
    return promise;
}

var UpdateOne = function(body, param){
    const options = {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(body),
    };
    var req = new Request(this.URL + param, options);
    const promise = fetch(req).then(res => {
        return res.json();
    });
    CatchError(promise);
    return promise;
}

var DeleteOne = function (param) {
    const options = {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        },
        mode: 'cors',
    };
    var req = new Request(this.URL + param, options);
    const promise = fetch(req).then(res => {
        return res.json();
    });
    CatchError(promise);
    return promise;
}

// putProduct = value => (e) => {
//     e.preventDefault();
//     const options = {
//         method: 'PATCH',
//         headers: { 'content-type': 'application/json' },
//         mode: 'cors',
//         body: JSON.stringify([{ 'key': 'Name', 'value': 'IPad 4th Gen' }])
//     };
//     var req = new Request('http://localhost:2000/products/' + this.state.id, options);
//     fetch(req).then(res => {
//         //console.log(res);
//     }).catch(error => {
//         console.log(error);
//     });
// }

function CatchError(promise)
{
    promise.catch(error => {
        console.log(error)
    });
}

module.exports = {
    Domain: Domain,
    URL: URL,
    Create: Create,
    ReadAll: ReadAll,
    UpdateOne: UpdateOne,
    DeleteOne: DeleteOne,
    CreateWithFormData: CreateWithFormData
}