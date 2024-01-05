//all players controller
const axios = require('axios');
const Player = require('../models/player');

class allPlayersController {
    async getAllPlayers(req, res) {
        try {
            const randomPlayerIds = [44, 2, 100];

            const apiRequests = randomPlayerIds.map(async (id) => {
                try {
                    const apiResponse = await axios.get(`${process.env.API_BASE_URL}/v4/persons/${id}`, {
                        headers: { 'X-Auth-Token': process.env.FOOTBALL_API_KEY },
                    });

                    const player = apiResponse.data;
                    //check if already a fav
                    const isFavorite = await Player.exists({ name: player.name, isFavorite: true });

                    return {
                        name: player.name,
                        position: player.position,
                        nationality: player.nationality,
                        shirtNumber: player.shirtNumber,
                        isFavorite,
                    };
                } catch (error) {
                    // Handle 404 or other errors gracefully
                    console.error(`Error fetching player with ID ${id}: ${error.message}`);
                    return null;
                }
            });

            const fetchedPlayers = await Promise.all(apiRequests);
            const validPlayers = fetchedPlayers.filter(player => player !== null);

            // Render the view with the fetched players
            res.render('allPlayers', { title: 'All Players', randomPlayers: validPlayers });
        } catch (error) {
            // Handle error
            console.error(error);
            res.status(500).render('error', { title: 'Error', error });
        }
    }

    //mark as favorite handle
    async markAsFavorite(req, res) {
        try {
            const playerId = req.params.id;
            const player = await Player.findByIdAndUpdate(playerId, { $set: { isFavorite: true } }, { new: true });

            res.redirect('/myPlayers');
        } catch (error) {
            console.error(error);
            res.status(500).render('error', { title: 'Error', error });
        }
    }
}



module.exports = new allPlayersController();
//no content error display