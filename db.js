"use strict";

const DB = {

  loadData(value){
    this._guitars = value;
  },

  getAll(){
    return this._guitars;
  }
};

module.exports = DB;
