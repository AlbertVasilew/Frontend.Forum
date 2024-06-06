import axios from "axios"
import moment from "moment-timezone";

const retrieveCategories = stateSetter => {
    axios.get(`${process.env.REACT_APP_API}/api/Categories`)
        .then(response => stateSetter(response.data));
}

const retrieveMenuCounters = stateSetter => {
    axios.get(`${process.env.REACT_APP_API}/api/Tasks/get-menu-counters`, { headers: { "User-Timezone": moment.tz.guess() }})
        .then(response => stateSetter(response.data));
}

export { retrieveCategories, retrieveMenuCounters }