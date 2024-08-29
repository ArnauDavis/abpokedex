document.querySelector('.searchButton').addEventListener('click',getFetch)
document.querySelector('.pokeDes').innerText = ''
function getFetch(){
    const choice = document.querySelector('input').value.toLowerCase()
    const url = `https://pokeapi.co/api/v2/pokemon/${choice}`
    console.log(url)


    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        //console.log(data.id)

        const idNumber = data.id
        console.log(idNumber)
        document.querySelector('.pokeName').innerText = choice.charAt(0).toUpperCase() + choice.slice(1)
        document.querySelector('.pics').style.backgroundColor = '#c6ffc6'
        
        document.querySelector('.searchText').placeholder = 'who is up next?'
       
        //styles are added to take effect after function call
        document.querySelector('#reg').src = data.sprites.other['official-artwork']['front_default']
        document.querySelector('#shiny').src = data.sprites.other['official-artwork']['front_shiny']
        document.querySelector('#reg').style.display = 'flex'
        document.querySelector('#shiny').style.display = 'flex'
        document.querySelector('.greenLight').style.backgroundColor = '#1be71b'
        document.querySelector('.redLight').style.backgroundColor = 'black'
        document.querySelector('.pokeDes').style.display = 'flex'
        
        
        
        //cries section
        
        document.querySelector('.audCry').src = data.cries.latest
        document.querySelector('.pokeName').style.display = 'inline' 
        
        
        //here is how the previous and next pokemon is decided
        
        if(idNumber == 1){ 
            fetch(`https://pokeapi.co/api/v2/pokedex/1/`)
            .then(res => res.json())
            .then(data => {
                document.querySelector('.prevName').style.display = 'none'
                document.querySelector('.nextName').style.display = 'block'
                document.querySelector('.nextName').innerText = data.pokemon_entries[idNumber].pokemon_species.name.charAt(0).toUpperCase() + data.pokemon_entries[idNumber].pokemon_species.name.slice(1)
                
               
            })
            
        } else if (idNumber == 1025){
            console.log('pecharunt')
            fetch(`https://pokeapi.co/api/v2/pokedex/1/`)
            .then(res => res.json())
            .then(data => {
                
                document.querySelector('.nextName').style.display = 'none'
                document.querySelector('.prevName').style.display = 'block'
                document.querySelector('.prevName').innerText = data.pokemon_entries[(idNumber - 2)].pokemon_species.name.charAt(0).toUpperCase()+data.pokemon_entries[(idNumber - 2)].pokemon_species.name.slice(1)
                
            })

        } else {
           
            
            fetch(`https://pokeapi.co/api/v2/pokedex/1/`)
            .then(res => res.json())
            .then(data => {
                document.querySelector('.prevName').style.display = 'block'
                document.querySelector('.nextName').style.display = 'block'
                document.querySelector('.prevName').innerText = data.pokemon_entries[(idNumber - 2)].pokemon_species.name.charAt(0).toUpperCase()+data.pokemon_entries[(idNumber-2)].pokemon_species.name.slice(1)
                document.querySelector('.nextName').innerText = data.pokemon_entries[idNumber].pokemon_species.name.charAt(0).toUpperCase() + data.pokemon_entries[idNumber].pokemon_species.name.slice(1)
                console.log(data)
                
            })

        }
        

        // this one checks to see how many types and adjusts display to accommodate
       if((data.types).length === 2){
        console.log('we have two types')
        document.querySelector('#pType2').style.display = 'flex'
        document.querySelector('#pType').style.display = 'flex'
        fetch(`${data.types[0].type.url}`)
        .then(res => res.json())
        .then(data => {
            document.querySelector('#pType').src = data.sprites['generation-viii']['sword-shield']['name_icon']
            
        })

        fetch(`${data.types[1].type.url}`)
        .then(res => res.json())
        .then(data => {
            document.querySelector('#pType2').src = data.sprites['generation-viii']['sword-shield']['name_icon']
            

        })

       } else if ((data.types).length === 1) {
        console.log('if there is only one type, it works!')
        document.querySelector('#pType').style.display = 'flex'
        fetch(`${data.types[0].type.url}`)
        .then(res => res.json())
        .then(data => {
            document.querySelector('#pType').src.display = 'flex'
            document.querySelector('#pType').src = data.sprites['generation-viii']['sword-shield']['name_icon']
            document.querySelector('#pType2').style.display = 'none'
            

        })
       } 

       fetch(`https://pokeapi.co/api/v2/pokemon-species/${idNumber}/`)
        .then(res => res.json())
        .then(data => {
            
            document.querySelector('.pokeDes').innerText = data.flavor_text_entries[1].flavor_text

        })
        .catch(err =>{
            document.querySelector('.pokeDes').innerText = 'Data unavilable'
        })
    
    })
    .catch(err => {
        console.log(`error ${err}`)
        document.querySelector('.searchText').placeholder = 'let\'s try again!'
        document.querySelector('.pics').style.backgroundColor = '#000000'
        document.querySelector('#pType2').style.display = 'none'
        document.querySelector('#pType').style.display = 'none'
        document.querySelector('#reg').style.display = 'none'
        document.querySelector('#shiny').style.display = 'none'
        document.querySelector('.pokeName').innerText = 'Pokémon not found, please check your spelling'
        document.querySelector('.redLight').style.backgroundColor = 'red'
        document.querySelector('.greenLight').style.backgroundColor = 'black'
        document.querySelector('.audCry').src = 'none'
        document.querySelector('.pokeDes').innerText = ''
        document.querySelector('.prevName').style.display = 'none'
        document.querySelector('.nextName').style.display = 'none'
    })
}

