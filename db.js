const { MongoClient } = require('mongodb');
const mongoString = "mongodb+srv://admin:w7ArSUVAh2HXjM6R@cluster0.qtyrl5o.mongodb.net/?retryWrites=true&w=majority";

//funkcja tworząca połaczenie
async function connect() {
    const client = new MongoClient(mongoString);
    try {
        await client.connect();
        return client;
    } catch (e) {
        console.error(e);
    }
}
//ściągnij listę baz danych i wyświetl w konsoli 
//jako parametr przyjmuje połaczenie do bazy
async function listDB(client) {
    let list = await client.db().admin().listDatabases();
    //pokaż w konsoli nagłowek listy
    console.log("Lista baz danych na serwerze:");
    //dla każdej bazy danych na liście...
    list.databases.forEach(database => {
        //wyświetl napis Baza: i doklej nazwę bazy danych
        console.log("Baza: " + database.name);
    });
}
//ściagnij jeden lokal z bazy airbnb po jego nazwie
async function getOneByName(client, name) {
    //wez dane z bazy o nazwie "sample_airbrb", z kolekcji o nazwie "listingsAndReviews"
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").findOne(
        //findOne jest funkcją zaprogramowaną w sterowniku do mongodb
        //potrzebuje ona filtra (odpowiednik WHERE w mysql zdefiniowanego w jsonie)
        {
            "name": name
        }
    ); //koniec findOne()
    //jeśli uda  się znaleźć pasujący rekord
    if(result) {
        return result;
    //jeśli nie:
    } else {
        console.log("Nie znaleziono pasującego rekordu:");
    }
}

function close(client) {
    client.close();
}

module.exports = {connect, listDB, getOneByName, close}