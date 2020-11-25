
import httpService from './http-service.js'

const VOLUNTEER_COLECTION_KEY = 'eventi';
export const volunteerService = {
    query,
    getById,
    remove,
    save,
    getEmptyVolunteer,
    getSortList
}

function getById(id) {
    return httpService.get(`${VOLUNTEER_COLECTION_KEY}/${id}`)
}

async function getSortList(sortBy) {
    const volunteers = await query()
    return volunteers.sort((a, b) => (a[sortBy] > b[sortBy]) ? 1 : ((b[sortBy] > a[sortBy]) ? -1 : 0));
}

// function query(q = '', delay = 0) {
function query() {
    return httpService.get(VOLUNTEER_COLECTION_KEY)
}

function remove(volunteerId) {
    // eventBusService.$emit(SHOW_MSG, { txt: `${volunteerId} Removed Succefully`, type: 'success' });
    return httpService.delete(`${VOLUNTEER_COLECTION_KEY}/${volunteerId}`)
}

function save(volunteer) {
    const savedVolunteer = (volunteer._id) ? _update(volunteer) : _add(volunteer)
    return savedVolunteer
}

function _add(volunteer) {
    volunteer.createdAt = Date.now()
        // eventBusService.$emit(SHOW_MSG, { txt: `${volunteer.name} Added Succefully`, type: 'success' });
    return httpService.post(VOLUNTEER_COLECTION_KEY, volunteer)
}

function _update(volunteer) {
    volunteer.updateAt = Date.now()
    return httpService.put(`${VOLUNTEER_COLECTION_KEY}/${volunteer._id}`, volunteer)
}

function getEmptyVolunteer() {
    return {
        name: '',
        price: null,
        type: '',
        inStock: true,
    }
}