class FauxExpress
{
    // STATIC --- ///

    static instances = [];

    static addInstance(expressInstance)
    {
        FauxExpress.instances.push(expressInstance);
    }

    static checkPort(port)
    {
        let valid = true; 

        for (let i = 0; i < FauxExpress.instances.length; ++i)
        {
            const currentInstance = FauxExpress.instances[i];

            if (currentInstance.getPort() === port) {
                valid = false;
                break; 
            }
        }

        return valid; 
    }

    static getEndpoint(url)
    {
        const slashIndex = url.indexOf('/');
        const endpointStart = slashIndex >= 0? slashIndex : url.length;
        return url.substring(endpointStart); 
    }

    static async fauxFetch(url, req = { method: 'get' }, port = 3000) // get as default
    {
        let res = new Responder(); 

        let endpoint = FauxExpress.getEndpoint(url);
        endpoint = ""? endpoint = '/' : endpoint = endpoint;

        // Take request parameters
        const method = req.method.toLowerCase(); 

        // Make sure body is a Javascript object
        if (req.body !== undefined && typeof(req.body) !== JSON)
            req.body = JSON.parse(req.body); 

        // check port / endpoint match
        const functionObject = FauxExpress.findFunction(port, endpoint, method); 

        if (functionObject === null) {
            res.send( { error: 'Unable to find method function' } ); 
            return res;
        }
        
        const methodAction = functionObject.action;
        const methodEndpoint = functionObject.endpoint;

        // Grab params from URL -> add to req.query and req.params

        req['query'] = FauxExpress.parseQuery(endpoint);
        req['params'] = FauxExpress.parseParams(methodEndpoint, endpoint); 
        
        // Send to correct method
        methodAction(req, res); 

        // Return response
        return res; 
    }

    static findFunction(port, endpoint, method)
    {
        for (let i = 0; i < FauxExpress.instances.length; ++i)
        {
            const instance = FauxExpress.instances[i];

            if (instance.getPort() !== port)
                continue;
            
            // Get matching endpoint
            let endpoints = instance.getMethodEndpoints(method);

            // urlMatcher used, to support :id - and the like
            endpoints = endpoints.filter(x => this.urlMatcher(x, endpoint));

            if (endpoints.length === 0)
                return null;
            else
                return ( 
            {   action: instance.getMethodHandler(endpoints[0], method),
                endpoint: endpoints[0] } ); 
        }

        return null; 
    }


    // URL Handling

    static validSubmitURL(url)
    {
        /* Don't need to check validity for current implementation */
    }

    static #splitURL(url)
    {
        let urlElements = url.split('/');
        urlElements = urlElements.map(i => i.trim()); 

        return urlElements; 
    }

    static urlQueryRemover(givenURL)
    {
        // Remove queries before checking
        const questionMarkIndex = givenURL.indexOf('?');

        if (questionMarkIndex >= 0)
            givenURL = givenURL.substring(0, questionMarkIndex); 

        return givenURL; 
    }

    static urlMatcher(templateURL, rawGivenURL)
    {
        const givenURL = FauxExpress.urlQueryRemover(rawGivenURL); 


        const templateElements = FauxExpress.#splitURL(templateURL);
        const givenElements = FauxExpress.#splitURL(givenURL);
        
        if (templateElements.length !== givenElements.length)
            return false;


        let urlMatch = true; 

        for (let i = 0; i < templateElements.length; ++i)
        {
            const templateCurrent = templateElements[i];
            const givenCurrent = givenElements[i];

            if (templateCurrent === givenCurrent)
                continue; 

            /* That template url uses ':' validly should be checked when its given */

            if (templateCurrent.length > 1 && templateCurrent.charAt(0) === ':')
                if (givenCurrent.length > 0) // valid param name given
                    continue; 
            
            urlMatch = false; 
            break; 
        }

        return urlMatch; 
    }

    static parseParams(templateURL, rawGivenURL)
    {
        const givenURL = FauxExpress.urlQueryRemover(rawGivenURL); 

        // Split by '/'

        let urlElements = FauxExpress.#splitURL(templateURL);

        if (urlElements.length === 0)
            return {}; 

        // Take last argument...

        const lastElementIndex = urlElements.length - 1;
        const lastElement = urlElements[lastElementIndex];

        if (lastElement.length <= 1)
            return {}; 

        // check for colon at the first position

        const firstChar = lastElement.charAt(0); 

        if (firstChar !== ':')
            return {};

        const paramName = lastElement.substring(1) // last pos is pre-defined

        // Should have already been tested for match
        let givenElements = FauxExpress.#splitURL(givenURL);

        let paramObject = {};
        paramObject[`${paramName}`] = givenElements[lastElementIndex];

        return paramObject; 
    }

    static parseQuery(givenURL)
    {
        let urlElements = FauxExpress.#splitURL(givenURL);

        if (urlElements.length <= 1)
            return {}

        const urlEnd = urlElements[urlElements.length - 1]; 

        const questionMarkIndex = urlEnd.indexOf('?');

        if (questionMarkIndex < 0)
            return {}

        const queries = urlEnd.substring(questionMarkIndex + 1);

        const queryList = queries.split('&');

        let queryObject = {}; 

        for (let i = 0; i < queryList.length; ++i)
        {
            const currentQuery = queryList[i];
            
            const currentKeyValue = currentQuery.split('=');

            if (currentKeyValue.length !== 2)
                continue; 

            const currentKey = currentKeyValue[0];
            const currentValue = currentKeyValue[1];

            const currentObject = {};
            currentObject[`${currentKey}`] = currentValue; 

            queryObject = {...queryObject, ...currentObject}; 
        }

        return queryObject; 
    }

    // INSTANCE ----- ///
    
    port = null;

    methodHandlers = 
    {
        get: [],
        post: [],
        put: [],
        delete: [],
    }

    constructor()
    {
        FauxExpress.addInstance(this); 
    }

    listen(givenPort, errorFunction = () => {})
    {
        let error = null; 

        if (FauxExpress.checkPort(givenPort))
            this.port = givenPort;
        else 
            error = new Error(`Port ${givenPort} is taken`, undefined);

        errorFunction(error); 
    }

    getPort()
    {
        return this.port; 
    }


    // Method handler adders
    #addMethodHandler(method, endpoint, givenFunction)
    {
        if (!Object.keys(this.methodHandlers).includes(method)) // invalid method name
            throw new Error('Invalid method name', undefined); 
        
        const currentHandlers = this.methodHandlers[method]; 

        const toAdd = { endpoint : endpoint, function : givenFunction }; 

        this.methodHandlers[method] = [...currentHandlers, toAdd]
    }

    get(endpoint, givenFunction) // (req, res) - function
    {
        this.#addMethodHandler('get', endpoint, givenFunction);
    }

    post(endpoint, givenFunction)
    {
        this.#addMethodHandler('post', endpoint, givenFunction);
    }

    put(endpoint, givenFunction)
    {
        this.#addMethodHandler('put', endpoint, givenFunction);
    }

    delete(endpoint, givenFunction)
    {
        this.#addMethodHandler('delete', endpoint, givenFunction);
    }


    getMethodHandler(url, method)
    {
        const list = this.methodHandlers[`${method}`];

        if (list.length <= 0)
            return null; 

        for (let i = 0; i < list.length; ++i)
        {
            const listItem = list[i];

            if (listItem.endpoint === url)
                return listItem.function;  
        }

        return null; 
    }

    getMethodEndpoints(givenMethod)
    {
        return this.methodHandlers[`${givenMethod}`]
            .map(i => 
            { 
                return Object.values(i)[0] 
            }); 
    }

}


export default FauxExpress; 


// Passing promise as attribute?

class Responder
{
    #data = undefined;
    #status = undefined; 

    ok = true; 


    constructor() {

    }

    send(sentObject)
    {
        this.#data = sentObject;

        return this; // for method chaining
    }

    status(sentStatus)
    {
        this.#status = sentStatus; 

        return this; // for method chaining
    }

    async json(content)
    {
        return this.send(content);
    }

    async json()
    {
        let timeout = 10.0; // seconds
        const delay = 200; // ms

        while (this.#data === undefined && timeout > 0) {
            await sleep(200);
            console.log('Waiting...'); 
            timeout -= (delay / 1000); 
        }

        return this.#data; 
    }

}

// https://stackoverflow.com/questions/1447407/whats-the-equivalent-of-javas-thread-sleep-in-javascript
async function sleep(msec) {
    return new Promise(resolve => setTimeout(resolve, msec));
}