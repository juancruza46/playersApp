const axios = require('axios');

class searchPlayersController {
    async searchPlayers(req, res) {
        try {
            const { name, position, nationality, shirtNumber } = req.query;

            // Make API request to search players
            const apiResponse = await axios.get(`${process.env.API_BASE_URL}/v4/persons`, {
                params: {
                    name,
                    position,
                    nationality,
                    shirtNumber,
                },
                headers: {
                    'X-Auth-Token': process.env.FOOTBALL_API_KEY,
                },
            });

            const players = apiResponse.data;

            res.render('searchPlayers', { title: 'Search Players', players });
        } catch (error) {
            console.error(error);
            res.status(500).render('error', { title: 'Error', error });
        }
    }
}

module.exports = new searchPlayersController();