import Axios from 'axios';

export default class Hiscore {
    // klassen behöver instantieras med en url
    // för att testa så anv. du localhost
    // vi kommer behöva en färdig url vid ett senare tillfälle
    constructor(url) {
        this.instance = Axios.create({
            baseURL: url,
        });
    }

    // Använd postscore när spelarens score ska postas
    // ni kommer att få gameids, troligast gruppnamn
    async postScore(gameID, score, name) {
        try {
            const response = await this.instance.post('/hiscore', {
                id: gameID,
                score: score,
                name: name.substring(0, 3),
            });

            console.log(response.data.msg);
        } catch (error) {
            console.log(error);
        }
    }

    // för att hämta alla hiscores så använder ni getscore
    getScore(gameID) {
        this.instance
            .get('/hiscore/' + gameID)
            .then(function (response) {
                // handle success
                console.log(response);
                return response;
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }
}
