import express from 'express'
// import helmet from 'helmet'
// import cors from 'cors'
import {
    getPortPromise,
} from 'portfinder'
import os from 'os'

const getLocalIp = () => {
    const networkInterfaces = Object.entries(os.networkInterfaces()).reduce<os.NetworkInterfaceInfo[]>((intefaces, [,networkInterfaces = []]) => [
        ...intefaces,
        ...networkInterfaces,
    ], []).filter(({ family, address }) => family === 'IPv4' && ![
        '127.0.0.1',
        '2.0.0.1',
    ].includes(address))
    return networkInterfaces.length > 0 ? networkInterfaces[0].address : '127.0.0.1'
}

export const createServe = () => {
    return new Promise<{
        url: string,
    }>((resolve) => {
        getPortPromise().then((port) => {
            const root = process.cwd()
            const app = express()
            // app.use(helmet())
            // app.use(cors())
            app.use(express.static(root))
            app.listen(port, () => {
                resolve({
                    url: `http://${getLocalIp()}:${port}`,
                })
            })
        })
    })
}
