const https = require('https')
module.exports = (host, page, method, data, headers, port) => {
    return new Promise((res, rej) => {
        let d = ''
        data = data ? JSON.stringify(data) : JSON.stringify({})
        let req = https.request({
            hostname: host,
            method: method && typeof method === 'string' ? method.toUpperCase() : 'GET',
            path: page,
            port: port || 443,
            headers: headers || {'Content-Type': 'application/json'},
        }, resp => {
            resp.on('data', l => d+= l)
            resp.on('end', () => {
                let o
                try {
                    o=JSON.parse(d)
                } catch(e) {
                    return res(d)
                }
                return res(o)
            })
        })
        req.on('error', e => rej(e))
        if (method) req.write(data)
        req.end()
    })
}