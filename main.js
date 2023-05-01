const apikey='86c8qHnoEPQUd1PMJGKmEwKdnr8JP3mS';
const listcard=document.querySelector(".list-card");
const list=document.querySelector(".list");
const searchcity=document.querySelector("#searchcity");
const cityName=document.querySelector("#cityName");
const weatherText=document.querySelector("#weatherText");
const degree=document.querySelector("#degree");
const imageTime=document.querySelector("#imageTime");

const getcityName= async (city)=>{
    const url= 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete';
    const query= `?apikey=${apikey}&q=${city}`;

    const response= await fetch(url +query);
    const data= await response.json();
return data;

}

searchcity.addEventListener("keyup",(e) =>{

   if(e.target.value.length===0){
    listcard.classList.add('d-none');
   }else{

    list.innerHTML='';


    getcityName(e.target.value.trim().toLowerCase())
    .then(data =>{
        data.forEach(cities =>{
            list.innerHTML += `<h4 class="target-class">${cities.LocalizedName}</h4>`;
            listcard.classList.remove('d-none');
            console.log(cities.LocalizedName);
           
        });
    }).catch(err => console.log(err));

   }
})
list.addEventListener("click", (event)=>{
    updatetheUi(event.target.innerText.toLowerCase());

});
  
const getCityCode= async (city)=>{

    const url= 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query= `?apikey=${apikey}&q=${city}`;

    const response= await fetch(url +query);
    const data= await response.json();
     return data[0];

}


const updatetheUi=(city) =>{
 
    getCityCode(city)
    .then(data =>{
        // console.log(data);
        cityName.innerHTML=  `${data.LocalizedName} ,
          ${data.Country.LocalizedName}`;
                 searchcity.value='';
          return getweatherInfo(data.Key);

   

    }).then(data =>{
        console.log(data);
        weatherText.innerHTML= `${data.WeatherText}`;
        degree.innerHTML= `${data.Temperature.Metric.Value} &deg;C`;
        if(data.IsDayTime){
            imageTime.setAttribute('src', 'https://images.pexels.com/photos/296234/pexels-photo-296234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
        }else{
            imageTime.setAttribute('src', 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg?auto=compress&cs=tinysrgb&w=600');
        }

       localStorage.setItem('city', city);
        
        //   searchcity.value='';
    })
    listcard.classList.add('d-none');

}

const getweatherInfo= async (cityCode)=>{

    const url= 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query= `${cityCode}?apikey=${apikey}`;

    const response= await fetch(url +query);
    const data= await response.json();
    // console.log(data[0]);
      return data[0];
}


if(localStorage.getItem('city').length >0){
    updatetheUi(localStorage.getItem('city'));
}
// getweatherInfo("129237");





