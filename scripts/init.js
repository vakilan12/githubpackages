idCounters = [
    {
      object: "material",
      prefix: "M-",
      seq: 0,
    },
    {
      object: "bom",
      prefix: "BOM-",
      seq: 0,
    },
  ];
  
  ReplaceMany(db.idCounter, idCounters);
  
  db.material.createIndex({ version: -1 }, { name: "sortVersion" });
  db.bom.createIndex({ version: -1 }, { name: "sortVersion" });
  
  uniqueIndexes = [
    {
      collection: db.group,
      document: { group_name: 1 },
    },
    {
      collection: db.uom,
      document: { uom_name: 1 },
    },
    {
      collection: db.noun,
      document: { noun_name: 1, uom_id: 1, group_id: 1 },
    },
    {
      collection: db.attribute,
      document: { attr_name: 1, noun_id: 1 },
    },
    {
      collection: db.nounVariant,
      document: {
        nounvariant_name: 1,
        noun_id: 1,
        "primary_attr.attr_id": 1,
        "primary_attr.option_id": 1,
      },
    },
    {
      collection: db.country,
      document: { country_name: 1, code: 1 },
    },
    {
      collection: db.currency,
      document: { currency_code: 1 },
    },
  ];
  
  CreateIndexes(uniqueIndexes, { unique: true });
  function CreateIndexes(indexes, options) {
    for (var i = 0; i < indexes.length; i++) {
      indexes[i].collection.createIndex(indexes[i].document, options);
    }
  }
  
  // ReplaceOne replaces the document in the specified collection with the given document.
  function ReplaceOne(collection, document) {
    collection.replaceOne(document, document, { upsert: true });
  }
  
  // ReplaceMany replaces the documents in the specified collection with the given documents.
  function ReplaceMany(collection, documents) {
    for (var i = 0; i < documents.length; i++) {
      ReplaceOne(collection, documents[i]);
    }
  }