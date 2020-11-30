var button = document.querySelector('.button');
var inputValue = document.querySelector('.inputValue');
var name = document.querySelector('.name');
var desc = document.querySelector('.desc');
var temp = document.querySelector('.temp');
var icono = document.querySelector('.icon');

button.addEventListener('click', function(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=f704c7c5a3f284520ad1bd870a72e6ee&lang=es&units=metric')
    .then(response => response.json())
    .then(data => {

        icono.innerHTML = `<img src="http://openweathermap.org/img/wn/${data['weather'][0]['icon']}@2x.png">`
        var nameValue = data['name'];
        var tempValue = data['main']['temp'];
        var descValue = data['weather'][0]['description'];

        name.innerHTML = nameValue;
        /*KELVIN A °C*/
        temp.innerHTML = Math.round(tempValue) + '°C';
        desc.innerHTML = descValue;

        console.log(data);
    })

.catch(err => alert("Nombre de Ciudad Erronea!"))
})