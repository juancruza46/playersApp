const axios = require('axios');
const Player = require('../models/player');

class AllPlayersController {
    async getAllPlayers(req, res) {
        try {
            //call specific players to work with
            const specificPlayerIds = [44, 49, 3218, 39635, 1556, 125010];
            const specificPlayers = [];

            for (const id of specificPlayerIds) {
                try {
                    const apiResponse = await axios.get(`${process.env.API_BASE_URL}/v4/persons/${id}`, {
                        headers: { 'X-Auth-Token': process.env.FOOTBALL_API_KEY },
                    });

                    const player = apiResponse.data;
                    specificPlayers.push({
                        name: player.name,
                        position: player.position,
                        nationality: player.nationality,
                        shirtNumber: player.shirtNumber,
                    });
                } catch (error) {
                    // Handle 404 or other errors gracefully
                    console.error(`Error fetching player with ID ${id}: ${error.message}`);
                }
            }

            // Render the view with the fetched players
            res.render('allPlayers', { title: 'All Players', specificPlayers });
        } catch (error) {
            // Handle error
            console.error(error);
            res.status(500).render('error', { title: 'Error', error });
        }
    }
}

module.exports = new AllPlayersController();