import { eventBusService, SHOW_MSG } from '../services/eventBus.service.js'
import HttpService from './HttpService'

export const volunteerService = {
    query,
    getById,
    remove,
    save,
    getEmptyVolunteer,
    getSortList
}

function getById(id) {
    return HttpService.get(`volunteer/${id}`)
}

async function getSortList(sortBy) {
    const volunteers = await query()
    return volunteers.sort((a, b) => (a[sortBy] > b[sortBy]) ? 1 : ((b[sortBy] > a[sortBy]) ? -1 : 0));
}

function query(q = '', delay = 0) {
    return HttpService.get('volunteer')
}

function remove(volunteerId) {
    // eventBusService.$emit(SHOW_MSG, { txt: `${volunteerId} Removed Succefully`, type: 'success' });
    return HttpService.delete(`volunteer/${volunteerId}`)
}

function save(volunteer) {
    const savedVolunteer = (volunteer._id) ? _update(volunteer) : _add(volunteer)
    return savedVolunteer
}

function _add(volunteer) {
    volunteer.createdAt = Date.now()
        // eventBusService.$emit(SHOW_MSG, { txt: `${volunteer.name} Added Succefully`, type: 'success' });
    return HttpService.post(`volunteer`, volunteer)
}

function _update(volunteer) {
    volunteer.updateAt = Date.now()
    return HttpService.put(`volunteer/${volunteer._id}`, volunteer)
}

function getEmptyVolunteer() {
    return {
        name: '',
        price: null,
        type: '',
        inStock: true,
    }
}