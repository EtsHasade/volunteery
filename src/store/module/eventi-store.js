import { eventiService } from '../../service/eventi-service.js'

export const eventiStore = {
    state: {
        eventis: [],
        tags: ['Animals', 'Children', 'Food', 'Needy', 'COVID-19', 'Fun', 'Baby'],
        neededs: ['Doctors', 'Managers', 'Chefs', 'Teachers', 'Workers'],
        accommodation: ['food', 'housing'],
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
            housing: 'fas fa-bed',
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
            const optionFilds = { keyList: ['country', 'category', 'organization', 'accommodation'] };
            optionFilds.options = {};
            optionFilds.options.country = [];
            optionFilds.options.country = state.eventis.map(eventi => {
                if (!optionFilds.options.country.includes(eventi.location.country)) return eventi.location.country
            });
            optionFilds.options.country = optionFilds.options.country.reduce((acc, currCountry) => {
                if (!acc.includes(currCountry)) acc.push(currCountry);
                return acc;
            }, []);

            optionFilds.options.category = [];
            state.eventis.forEach(eventi => {
                optionFilds.options.category.push(...eventi.tags);
            });
            optionFilds.options.category = optionFilds.options.category.reduce((acc, currTag) => {
                if (!acc.includes(currTag)) acc.push(currTag);
                return acc;
            }, []);
            optionFilds.options.tags = optionFilds.options.category;

            optionFilds.options.organization = [];
            optionFilds.options.organization = state.eventis.map(eventi => {
                if (!optionFilds.options.organization.includes(eventi.byOrg.name)) return eventi.byOrg.name;
            });
            optionFilds.options.organization = optionFilds.options.organization.reduce((acc, currOrg) => {
                if (!acc.includes(currOrg)) acc.push(currOrg);
                return acc;
            }, []);


            optionFilds.options.accommodation = [];
            state.eventis.forEach(eventi => {
                optionFilds.options.accommodation.push(...eventi.accommodation);
            });
            optionFilds.options.accommodation = optionFilds.options.accommodation.reduce((acc, currTag) => {
                if (!acc.includes(currTag)) acc.push(currTag);
                return acc;
            }, []);

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