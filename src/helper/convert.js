function convertArrayToObject(array=[]){
    if (array == null) {
        return fasle
    }

    let result = {...array[0]}
    return result

}

module.exports = {
    convertArrayToObject
}