class TempManager {
    constructor(){
        this.cityData = []
    }

    async getDataFromDB(){//get data from DB
        try{
            const cities = await $.get(`/cities`)
            cities.forEach(c => this.cityData.unshift(c))
            console.log(this.cityData);
            return (this.cityData)
        }catch (err){
            console.log(err.message);
        }
    }   

    async getCityData(city){// send rqst to the external api and get info on city 
        try{
            const cityWeather = await $.get(`/city/${city}`)
            this.cityData.unshift(cityWeather)                        
        }catch(err){
            console.log(err.message);
        }

    }

    async saveCity(cityName){
        try{
            const index = this.cityData.findIndex(c => c.name === cityName)
             await $.post('/city', (this.cityData[index]))
        }catch(err){
            alert(err.message)
        }



    }

    async removeCity(cityName){
        const index = this.cityData.findIndex(c => c.name === cityName)
        this.cityData.splice(index, 1)
        $.ajax({
            url: `/city/${cityName}`,
            method: "DELETE",
            success: function (res) {
                console.log('city deleted');
             },
             error: function (xhr, text, error) {
                console.log(text);
             }
        })
    }


}
