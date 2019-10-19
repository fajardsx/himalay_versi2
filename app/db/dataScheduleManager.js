class DATA_SCHEDULE{
    _data = null;
    constructor(data){
       this._data = data;
    }

    static async getDataSchedule(){
        return await this._data;
    }
    static async getDataVisitSchedule() {
        let _clone = Object.assign({}, this._data);

        return await _clone;
    }
    static updateDataSchedule(valuedata) {
        this._data = valuedata;
    }
  
}

export default DATA_SCHEDULE;