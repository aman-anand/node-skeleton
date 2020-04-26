let helper = {}
helper.getRes = function (success, data, error, message) {
    let res = {success: 0, message: "", data: {}, error: {}}
    if (success) {
        res.success = 1;
    }
    if (data) {
        res.data = data
        if (Array.isArray(data) && data.length == 0) {
            res.success = 0;
        }
    }
    if (error) {
        res.message = error.message;
        res.error = error
    }
    if (message) {
        res.message = message;
    }
    return res
};
helper.getResPage = function (success, data, page, total, error, message) {
    let res = {success: 0, message: "", page: 0, total: 0, data: {}, error: {}}
    if (success) {
        res.success = 1;
    }
    if (page) {
        res.page = Number(page);
    } else {
        res.page = 1;
    }
    if (total) {
        res.total = total;
        // res.nextPage=page<total
    } else {
        res.total = 0;
        // res.nextPage = false;
    }
    if (data) {
        res.data = data
    }
    if (error) {
        res.message = error.message;
        res.error = error
    }
    if (message) {
        res.message = message;
    }
    return res
};
helper.handleErr = function (error, resp) {
    console.log("handle error called");
    console.log(JSON.stringify(error));
    let res = {success: 0, message: "", data: {}, error: {}}

    if (error) {
        res.message = error.message;
        res.error = error
    }

    return resp.json(res)
};
let showLogs = true;
helper.debug = function (message) {
    if (showLogs) {
        console.log(message);
    }
};

module.exports = helper;
