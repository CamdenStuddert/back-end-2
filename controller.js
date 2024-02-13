const houses = require(`./db.json`)
let globalID = 4

module.exports = {
    getHouses: (req, res) => {
        res.status(200).send(houses)
    }, 
    // createHouse: (req, res) => {
    //     let {address, price, imageURL} = req.body

    //     let newHouse = {
    //         id: globalID,
    //         address,
    //         price,
    //         imageURL,
    //     }

    //     houses.push(newHouse)
    //     res.status(200).send(houses)
    //     globalID++
    // },
    createHouse: (req, res) => {
        let {address, price, imageURL} = req.body

        let newHouse = {
            id: globalID,
            address,
            price,
            imageURL,
        }
        if(isNaN(newHouse.price)){
            res.status(400).send(`Is not a Number`)
        } else {
        houses.push(newHouse)
        res.status(200).send(houses)
        globalID++
        }
    },
    deleteHouses: (req, res) => {
        const {id} = req.params
        
        const index = houses.findIndex(house => house.id === +id)

        houses.splice(index, 1)
        
        res.status(200).send(houses)
    },
    updatePrices: (req, res) => {
        const {id} = req.params
        const { type } = req.body;
        const index = houses.findIndex(house => house.id === +id)
        if (houses[index].price - 10000 <= 0 && type === `minus`){
            res.status(400).send(`Cannot go below 0.`)
        } else if (type === `plus`){
            houses[index].price += 10000
            res.status(200).send(houses)
        } else if (type === `minus`){
            houses[index].price -= 10000
            res.status(200).send(houses)
        } else {
            res.sendStatus(400)
        }
    }
};

