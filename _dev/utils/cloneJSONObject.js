
function cloneJSONObject(copyObject) {
    var isNull = copyObject === null;
    var isNotAnObject = typeof copyObject !== 'object';
    var isActiveClone = typeof copyObject['isActiveClone'] !== 'undefined';

    if (isNull || isNotAnObject || isActiveClone)
        return copyObject;

    var temp = copyObject.constructor();

    for (var key in copyObject) {
        if (Object.prototype.hasOwnProperty.call(copyObject, key)) {
            copyObject['isActiveClone'] = null;
            temp[key] = cloneJSONObject(copyObject[key]);
            delete copyObject['isActiveClone'];
        }
    }
    return temp;
}

module.exports = {
    clone: cloneJSONObject
};
