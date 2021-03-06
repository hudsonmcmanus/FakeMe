const RequestCollection = require('../model/Request');

// Will return the Request count from RequestCount collection for the corresponding request.
const incRequestCount = async (request) => {
    let req_map = {
        "face": "GET",
        "face/getFaces": "GET",
        "id": "GET",
        "id/getIds": "GET",
        "auth/login": "POST",
        "auth/register": "POST",
        "auth/update": "PATCH",
        "auth/delete": "DELETE"
    }
    let requestCount = await RequestCollection.findOne({ request: request });

    if (!requestCount) {
        requestCount = new RequestCollection({
            request_type: req_map[request],
            request: request,
            count: 1,
        });
    } else {
        requestCount.count++;
    }

    try {
        await requestCount.save();

    } catch (err) {
        console.log(err);
    }

}
module.exports = incRequestCount;