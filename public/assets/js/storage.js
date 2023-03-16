const _storage = {
  name: 'PESTINGYAWAGIATAY',
  version: '1.0',
  description: 'My First Web-SQL Example',
  size: 2 * 1024 * 1024,
  init() {
    openDatabase(db.name, db.version, db.description, db.size)
  },
  webstorageTransaction(db) {
    dbObj.transaction(function (tx)  {
      tx.executeSql('CREATE TABLE IF NOT EXISTS albums (id unique, Name, Location,did)');
    }); 
  },
}
// webstorage -- https://www.c-sharpcorner.com/article/crud-operations-using-websql-in-html5-and-jquery/
export default {..._storage};