import axios from 'axios';

const retrieveCategories = stateSetter => {
    axios.get(`${process.env.REACT_APP_API}/api/Categories`)
        .then(response => stateSetter(response.data));
}

const retrieveMenuCounters = stateSetter => {
    axios.get(`${process.env.REACT_APP_API}/api/Tasks/get-menu-counters`)
        .then(response => stateSetter(response.data));
}

export { retrieveCategories, retrieveMenuCounters }