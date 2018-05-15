import StorageProvider from 'utilities/storage-provider';
import API_ENDPOINT from 'constants/api-endpoint';
import MESSAGES from 'constants/ui-message';


function Request() {
}

var _request = function(param) {
    var access_token = StorageProvider.getAccessToken();
    return new Promise(function(resolve, reject) {

        var successHandler = function(data) {
            resolve(data);
        };

        var errorHandler = function(error) {
            reject(error);
        };

        if(access_token) {
            param.headers = param.headers || {};
            _.extend(param.headers, {Authorization: access_token});
        }

        var params = _.extend({
            cache: false
        }, param);

        $.ajax(params).success(successHandler).error(errorHandler);
    });
};

var _doGet = function(url, data) {
    var param = {
        data: data,
        url: url,
        method: "GET"
    };
    return _request(param);
};

var _doPost = function(url, data, authHeader = BASIC_AUTH) {
    var param = {
        data: JSON.stringify(data),
        url: url,
        method: "POST",
        headers: _.extend({'Content-Type': 'application/json'}, authHeader)
    };
    return _request(param);
};

var _doPut = function(url, data) {
    var param = {
        data: JSON.stringify(data),
        url: url,
        method: "PUT",
        headers: {'Content-Type': 'application/json'}
    };
    return _request(param);
};

var _doDelete = function(url, data) {
    var param = {
        data: data,
        url: url,
        method: "DELETE",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    };
    return _request(param);
};

var _doUpload = function(url, data) {
    var param = {
        data: data,
        url: url,
        method: "POST",
        processData: false,
        contentType: false,
    };
    return _request(param);
};

Request.prototype.save = function(url, data, authData) {
    return _doPost(url, data, authData);
};

Request.prototype.fetch = function(url, data) {
    return _doGet(url, data);
};

Request.prototype.upload = function(url, data) {
    return _doUpload(url, data);
};

Request.prototype.update = function(url, data) {
    return _doPut(url, data);
};

Request.prototype.delete = function(url, data) {
    return _doDelete(url, data);
};

var request = new Request();

export default request;
