//----Declare dependencies----
const axios = require('axios');

//----Create a class ----
class AllPlayersController {
    async getAllPlayers(req, res) {
        try {
            //Trending players (specific)
            //hundreds of Thousands of players in api, missing info
            const specificPlayerIds = [44, 49, 3218, 39635, 1556, 125010];
            const specificPlayers = [];

            //call the api and receive info
            for (const id of specificPlayerIds) {
                try {
                    const apiResponse = await axios.get(`${process.env.API_BASE_URL}/v4/persons/${id}`, {
                        headers: { 'X-Auth-Token': process.env.FOOTBALL_API_KEY },
                    });

                    //properties pulled
                    const playerData = apiResponse.data;
                    const formattedPlayer = {
                        name: playerData.name,
                        position: playerData.position,
                        nationality: playerData.nationality,
                        shirtNumber: playerData.shirtNumber,
                    };

                    //push to all players page
                    specificPlayers.push(formattedPlayer);
                } catch (error) {
                    console.error(`Error fetching player with ID ${id}: ${error.message}`);
                }
            }
            //show them
            res.render('allPlayers', { title: 'All Players', specificPlayers });
        } catch (error) {
            console.error(error);
            res.status(500).render('error', { title: 'Error', error });
        }
    }
}
//----Export module ----
module.exports = new AllPlayersController();
