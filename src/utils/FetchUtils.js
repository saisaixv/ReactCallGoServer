class FetchUtils{
    constructor(){
        this.server=""
        this.header=""
    }

    setServer(server){
        this.server=server
    }

    setHeader(header){
        this.header=header
    }

    get(url,header,params,successcallback,errorcallback){

        // console.log(`params = ${params}`)
        if (params) {

            var hasProp = false;
            for (var prop in params){
                hasProp = true;
                break;
            }
            //如果有参数就添加
            if(hasProp){
                let paramsArray = [];
                //拼接参数
                Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
                if (url.search(/\?/) === -1) {
                    url += '?' + paramsArray.join('&')
                } else {
                    url += '&' + paramsArray.join('&')
                }
            }
        }

        // LogModule.e("fetch",`get url = ${url}`)
        // LogModule.e("header",`header = ${JSON.stringify(header)}`)


        fetch(url,{
            method:"GET",
            headers:header,
        })
            .then(response=>response.json())
            .then(json=>{
                // console.log(`response = ${JSON.stringify(json)}`)
                successcallback(json)
            })
            .catch(error=>{
                // console.log(`error = ${JSON.stringify(error)}`)
                errorcallback(error)
            })
    }

    post(url, header, params, callback,errorCallback){
        console.log(`url = ${url}`)
        console.log(`header = ${JSON.stringify(header)}`)
        console.log(`params = ${JSON.stringify(params)}`)
        fetch(url,{
            method:"POST",
            datatype:"jsonp",
            headers:header,
            body:`${JSON.stringify(params)}`
        })
            .then(response=>response.json())
            .then(json=>{
                // LogModule.e("fetch",`response = ${JSON.stringify(json)}`)
                callback(json)
            })
            .catch(error=>{
                // LogModule.e("fetch",`error = ${JSON.stringify(error)}`)
                errorCallback(error)
            })
    }

    put(url, header, params, callback,errorCallback){

        fetch(url,{
            method:"PUT",
            headers:header,
            body:`${JSON.stringify(params)}`
        })
            .then(response=>response.json())
            .then(json=>{
                // LogModule.e("fetch",`response = ${JSON.stringify(json)}`)
                callback(json)
            })
            .catch(error=>{
                // LogModule.e("fetch",`error = ${JSON.stringify(error)}`)
                errorCallback(error)
            })
    }

    register(params,callback,errcallback){
        let url=`http://${this.server}/register`
        this.post(url,this.header,params,callback,errcallback)
    }

    login(params,callback,errorcallback){
        let url=`http://${this.server}/login`
        this.post(url,this.header,params,callback,errorcallback)
    }

    getUsers(params,callback,errorcallback){
        let url=`http://${this.server}/userinfolist`
        this.get(url,this.header,params,callback,errorcallback)
    }


}

let fetchUtils=new FetchUtils()

export default fetchUtils