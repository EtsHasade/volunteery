import { eventiService } from '../../service/eventi-service.js'

export const eventiStore = {
    state: {
        eventis: [],
        tags: ['Animals', 'Children', 'Food', 'Needy', 'COVID-19', 'Fun', 'Baby'],
        neededs: ['Doctors', 'Field Manager', 'Chef'],
    },
    getters: {
        eventisForDisplay(state) {
            return state.eventis
        },
        tags(state) {
            return state.tags
        },
        neededs(state) {
            return state.neededs
        },
    },
    mutations: {
        setEventis(state, { eventis }) {
            state.eventis = eventis
        },
        addEventi(state, { eventi }) {
            state.eventis.push(eventi)
        },
        updateEventi(state, { eventi }) {
            const idx = state.eventis.findIndex(currEventi => {
                return currEventi._id === eventi._id
            })
            state.eventis.splice(idx, 1, eventi)
        },
        removeEventi(state, { eventi }) {
            const idx = state.eventis.findIndex(currEventi => currEventi._id === eventi._id)
            state.eventis.splice(idx, 1)
        },
    },
    actions: {
        async saveEventi({ commit }, { eventi }) {
            console.log('saveStoreEventi', eventi);
            const actionType = (eventi._id) ? 'updateEventi' : 'addEventi';
            const savedEventi = await eventiService.save(eventi)
            console.log('saved', savedEventi);
            commit({ type: actionType, eventi: savedEventi })
            return savedEventi;

        },
        async setEventis({ commit }) {
            try {
                const eventis = await eventiService.query()
                commit({ type: 'setEventis', eventis })
            } catch (err) {
                console.log('err', err);
            }
        },
        async removeEventi({ commit }, payload) {
            await eventiService.remove(payload.eventi._id)
            commit(payload)
        },
        async setSortEventis({ commit }, { sortBy }) {
            console.log(sortBy);
            const eventis = await eventiService.getSortList(sortBy)
            commit({ type: 'setEventis', eventis })
        },
        async getEventiById(context, { _id }) {
            console.log("🚀 ~ file: eventi-store.js ~ line 66 ~ getEventiById ~ _id", _id)
            return await eventiService.getById(_id)
        }
    }
}