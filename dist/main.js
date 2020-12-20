const manager = new TempManager()
const render = new Renderer()

const loadPage = async function(){
    try{
        let cities = await manager.getDataFromDB()
        render.renderData(cities)
    }catch (err){
        console.log(err.message)   
    }
}

loadPage()

const handleSearch = async function (){
    try{
        const city = $("input").val()
        $("input").val('')
        await manager.getCityData(city)
        render.renderData(manager.cityData)
    }catch (err){
        alert(err.message)
        console.log(err.message)
    }
}

$('#cities-container').on('click', '.save', function (){
    const cityName = $(this).closest('.cityWeather').find('.name').text()
    manager.saveCity(cityName)
    render.renderData(manager.cityData)

})

$('#cities-container').on('click', '.delete', function (){
    const cityName = $(this).closest('.cityWeather').find('.name').text()
    console.log(cityName);
    manager.removeCity(cityName)
    render.renderData(manager.cityData)
})