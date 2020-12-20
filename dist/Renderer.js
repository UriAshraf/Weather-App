class Renderer {
    constructor(){

    }

    renderData (cities){
        const source = $('#cities-template').html()
        const template = Handlebars.compile(source)
        const newHtml = template({cities})
        $('#cities-container').empty()
        $('#cities-container').append(newHtml)

    }
}