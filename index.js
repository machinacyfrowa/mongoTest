const { MongoClient } = require('mongodb');
const mongoString = "mongodb+srv://admin:w7ArSUVAh2HXjM6R@cluster0.qtyrl5o.mongodb.net/?retryWrites=true&w=majority";

async function main() {
    //stworz nowe połaczenie do bazy danych pod nazwa client używając sterownika MongoClient (alias do mongodb)
    //i danych do połaczenia wygenerowanych z atlasa
    const client = new MongoClient(mongoString);
    //uwaga - otwieram połączenie - to może potrwać więc dajemy await
    await client.connect();
    
    await client.close();
}

//uruchom funkcje main - jeśli coś pójdzie nie tak to wyrzuc bład na konsole
main().catch(console.error);