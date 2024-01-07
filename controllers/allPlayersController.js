//all players controller
const axios = require('axios');
const Player = require('../models/player');

class allPlayersController {
    async getAllPlayers(req, res) {
        try {
            const randomPlayerIds = [44, 2, 100];
            const randomPlayers = [];

            for (const id of randomPlayerIds) {
                try {
                    const apiResponse = await axios.get(`${process.env.API_BASE_URL}/v4/persons/${id}`, {
                        headers: { 'X-Auth-Token': process.env.FOOTBALL_API_KEY },
                    });

                    const player = apiResponse.data;
                    randomPlayers.push({
                         name: player.name, 
                         position: player.position,
                         nationality: player.nationality,
                         shirtNumber:player.shirtNumber,
                        });
                } catch (error) {
                    // Handle 404 or other errors gracefully
                    console.error(`Error fetching player with ID ${id}: ${error.message}`);
                }
                //so my computer wont blow up in my face
                await new Promise(resolve => setTimeout(resolve, 1000)); // 1-second delay
            }
                        // Render the view with the fetched players
            res.render('allPlayers', { title: 'All Players', randomPlayers });
        } catch (error) {
            // Handle error
            console.error(error);
            res.status(500).render('error', { title: 'Error', error });
        }
    }

  }

module.exports = new allPlayersController();