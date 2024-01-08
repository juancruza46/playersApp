// allPlayersController.js

const axios = require('axios');

class AllPlayersController {
    async getAllPlayers(req, res) {
        try {
            const specificPlayerIds = [44, 49, 3218, 39635, 1556, 125010];
            const specificPlayers = [];

            for (const id of specificPlayerIds) {
                try {
                    const apiResponse = await axios.get(`${process.env.API_BASE_URL}/v4/persons/${id}`, {
                        headers: { 'X-Auth-Token': process.env.FOOTBALL_API_KEY },
                    });

                    const playerData = apiResponse.data;
                    const formattedPlayer = {
                        name: playerData.name,
                        position: playerData.position,
                        nationality: playerData.nationality,
                        shirtNumber: playerData.shirtNumber,
                    };

                    specificPlayers.push(formattedPlayer);
                } catch (error) {
                    console.error(`Error fetching player with ID ${id}: ${error.message}`);
                }
            }

            res.render('allPlayers', { title: 'All Players', specificPlayers });
        } catch (error) {
            console.error(error);
            res.status(500).render('error', { title: 'Error', error });
        }
    }
}

module.exports = new AllPlayersController();
