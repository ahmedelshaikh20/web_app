const axios = require('axios');

const profile = async () => {
    try {
        const resp = await axios.get('http://localhost:3000/api/user/viewProfile');
        console.log(resp.data);
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};

export {profile}