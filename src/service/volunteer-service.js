import httpService from './http-service.js'
import { utilService } from '../service/utils/util.service.js'

const VOLUNTEER_COLECTION_KEY = 'eventi';
export const volunteerService = {
    query,
    getById,
    remove,
    save,
    getEmptyVolunteer,
    getSortList,
    timeAgo,
    makeId
}

function getById(id) {
    console.log("🚀 ~ file: volunteer-service.js ~ line 17 ~ getById ~ id", id)
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
        title: '',
        desc: '',
        startAt: null,
        endAt: null,
        rate: 0,
        location: {
            lat: null,
            lng: null,
            country: '',
            address: '',
        },
        imgUrls: [],
        capacity: null,
        tags: [],
        neededs: [],
        members: [],
        reviews: [],
        byOrg: {
            _id: "5d6f6552j3kk8,2m2jh",
            name: "Save worlds",
            rate: 4,
            imgUrl: "https://images.unsplash.com/photo-1606335221768-18e3dac0e879?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
        },
    }
}

function timeAgo(time) {
    return utilService.timeAgo(time)
}

function makeId(length = 5) {
    return utilService.makeId(length)
}