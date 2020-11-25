
import httpService from './http-service.js'

export const vlntrService = {
    query,
    getById,
    remove,
    update,
    add,
    emptyVlntr
}
function query() {
    return httpService.get(`volunteer`)
}
function getById(vlntrId) {
    return httpService.get(`volunteer/${vlntrId}`)
}
function remove(vlntrId) {
    return httpService.delete(`volunteer/${vlntrId}`)
}

function update(vlntr) {
    return httpService.put(`volunteer/${vlntr._id}`, vlntr)
}

async function add(vlntr) {
    vlntr.createdAt = new Date()
    return httpService.post('vlntr', vlntr);
}


function emptyVlntr(){
    return {
        name: "vlntr Name",

    }
}
