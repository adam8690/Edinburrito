var Utils = function(){

}

Utils.prototype.formatDistance = function (distance) {
    result = Math.round(distance)
    if (result < 1000) {
        return result + "m"
    } else { 
        result /= 1000
        return result.toFixed(1) + "km"
    }
}

module.exports = Utils;