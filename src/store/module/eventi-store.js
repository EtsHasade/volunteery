import { eventiService } from '../../service/eventi-service.js'

export const eventiStore = {
    state: {
        eventis: [],
        tags: ['Animals', 'Children', 'Food', 'Needy', 'COVID-19', 'Fun', 'Baby'],
        neededs: ['Doctors', 'Managers', 'Chefs', 'Teachers', 'Workers'],
        accommodation: ['food', 'lodging'],
        tagsIcon: {
            Animals: 'fas fa-paw',
            Children: 'fas fa-child',
            Food: 'fas fa-utensils',
            Needy: 'fas fa-hand-holding-heart',
            ["COVID-19"]: 'fas fa-biohazard',
            Fun: 'far fa-smile-beam',
            Baby: 'fas fa-baby'
        },
        neededsIcon: {
            Doctors: 'fas fa-user-md',
            Managers: 'fas fa-sitemap',
            Chefs: 'fas fa-bread-slice',
            Teachers: 'fas fa-graduation-cap',
            Workers: 'fas fa-tractor'
        },
        accommodationIcon: {
            food: 'fas fa-utensils',
            lodging: 'fas fa-bed',
        },
    },
    getters: {
        eventisForDisplay(state) {
            return state.eventis;
        },
        tags(state) {
            return state.tags;
        },
        neededs(state) {
            return state.neededs;
        },
        allFilds(state) {
            // const filds = {};
            // filds.keyList = state.eventis.reduce((acc, eventi) => {
            //     if (!acc.length) acc = Object.keys(eventi);
            //     else Object.keys(eventi).forEach(key => {
            //         if (!acc.includes(key)) acc.push(key);
            //     })
            //     return acc;
            // }, []);
            // console.log("🚀 ~ file: eventi-store.js ~ line 38 ~ filds.keyList=state.eventis.reduce ~ filds.keyList", filds.keyList)
            const optionFilds = {keyList:['country', 'organizatin', 'food', 'lodging']}
                optionFilds.country = state.eventis.map(eventi =>{
                    if (!optionFilds.organizatin.includes(eventi.location.countery)) return eventi.location.countery
                });
                optionFilds.organizatin = state.eventis.map(eventi =>{
                    if (!optionFilds.organizatin.includes(eventi.byOrg.name)) return eventi.byOrg.name;
                });
                optionFilds.food = ['including food','excluding food', 'all'];
                optionFilds.lodging = ['including lodging','excluding lodging', 'all'];

            return optionFilds            
        },
        tagsIcon(state) {
            return state.tagsIcon;
        },
        neededsIcon(state) {
            return state.neededsIcon;
        },
        accommodationIcon(state) {
            return state.accommodationIcon;
        }
    },
    mutations: {
        setEventis(state, { eventis }) {
            state.eventis = eventis;
        },
        addEventi(state, { eventi }) {
            state.eventis.push(eventi);
        },
        updateEventi(state, { eventi }) {
            const idx = state.eventis.findIndex(currEventi => {
                return currEventi._id === eventi._id;
            })
            state.eventis.splice(idx, 1, eventi);
        },
        removeEventiById(state, { eventId }) {
            const idx = state.eventis.findIndex(currEventi => currEventi._id === eventId);
            state.eventis.splice(idx, 1);
        },
    },
    actions: {
        async saveEventi({ commit }, { eventi }) {
            try {
                console.log('saveStoreEventi', eventi);
                const actionType = (eventi._id) ? 'updateEventi' : 'addEventi';
                const savedEventi = await eventiService.save(eventi);
                console.log('saved', savedEventi);
                commit({ type: actionType, eventi: savedEventi });
                return { type: true, err: null };
            } catch (err) {
                return { type: false, err };
            }

        },
        async setEventis({ commit }) {
            try {
                console.log('setEventi');
                const eventis = await eventiService.query();
                commit({ type: 'setEventis', eventis });
                return { type: true, err: null };
            } catch (err) {
                console.log('err', err);
                return { type: false, err };
            }
        },
        async removeEventiById({ commit }, payload) {
            try {
                await eventiService.remove(payload.eventiId);
                commit(payload);
                return { type: true, err: null };
            } catch (err) {
                return { type: false, err };
            }
        },
        async setSortEventis({ commit }, { sortBy }) {
            console.log(sortBy);
            const eventis = await eventiService.getSortList(sortBy);
            commit({ type: 'setEventis', eventis });
        },
        async getEventiById(context, { _id }) {
            return await eventiService.getById(_id);
        }
    }
}