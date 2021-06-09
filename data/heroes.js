const fs = require('fs').promises
const path = './data/heroes.json'

async function getHeroes(){
    const heroes = await fs.readFile(path, 'utf-8')
    return JSON.parse(heroes)
}

async function getHeroe(id){
    const heroes = await getHeroes()
    return heroes.find(heroe => heroe.id == id)

}

async function addHeroe(heroe){
    const heroes = await getHeroes()
    heroes.sort((a, b)  => a.id - b.id)
    const lastId = heroes[heroes.length-1].id
    heroe.id = lastId + 1
    heroes.push(heroe)
    await fs.writeFile(path, JSON.stringify(heroes, null, ' '))
    
    return heroe
}

async function updateHeroe(heroe){
    const heroes = await getHeroes()
    const index = heroes.findIndex(her => her.id == heroe.id)
    if(heroe.name){
        heroes[index].name = heroe.name
    }
    if(heroe.power){
        heroes[index].power = heroe.power
    }
    if(heroe.iq){
        heroes[index].iq = heroe.iq
    }

    await fs.writeFile(path, JSON.stringify(heroes, null, ' '))

    return heroes[index]
}

async function deleteHeroe(id){
    const heroes = await getHeroes()
    const index = heroes.findIndex(her => her.id == id)
    heroes.splice(index, 1)
    await fs.writeFile(path, JSON.stringify(heroes, null, ' '))
}

module.exports = {getHeroes, getHeroe, addHeroe, updateHeroe, deleteHeroe}