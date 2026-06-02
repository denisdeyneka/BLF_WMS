// bridge между renderer и electron backend

const {
    contextBridge,
    ipcRenderer
} = require('electron');


contextBridge.exposeInMainWorld(

    'api',

    {

        ping: () => 'pong',


        getProducts: () =>

            ipcRenderer.invoke(
                'products:getAll'
            ),


        createProduct: (data) =>

            ipcRenderer.invoke(
                'products:create',
                data
            ),


        deleteProduct: (id) =>

            ipcRenderer.invoke(
                'products:delete',
                id
            )
    }
);