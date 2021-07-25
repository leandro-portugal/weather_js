document.querySelector('.busca').addEventListener('submit', async (event) =>{
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;
    
    if(input !== ''){

        clearInformation();
        showWarning('Carregando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=d97c4dcd70574dee9e7c2836821e89c3&units=metric&lang=pt_br`;
        
        let result = await fetch(url);
       
        let json = await result.json();

        if (json.cod === 200){

            showInformation({
                name:json.name,
                country:json.sys.country,
                temp:json.main.temp,
                tempIcon:json.weather[0].icon,
                windSpeed:json.wind.speed,
                wingAngle:json.wind.deg,
                humidity:json.main.humidity,
                fells: json.main.feels_like,
                

            })

        }else{
            clearInformation();
            showWarning("Desculpe, não encontramos esta localidade.");
        }

    }

});

function showInformation(json){

    showWarning('');
   
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;

    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;

    document.querySelector('.humiInfo').innerHTML = `${json.humidity} <spam>%</spam>`;
    document.querySelector('.senInfo').innerHTML = `${json.fells} <sup>ºC</sup>`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.wingAngle-90}deg)`;
    document.querySelector('.resultado').style.display = 'block';
    

}

function clearInformation(){
    showWarning("");
    document.querySelector('.resultado').style.display = 'none';

}

function showWarning(msg){

    document.querySelector('.aviso').innerHTML = msg;
}