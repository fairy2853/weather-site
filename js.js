
let xhr= new XMLHttpRequest();
let html = document.getElementById('main');
let arr = [];
let current= document.getElementById('current');
let country = document.getElementById('country');
let timeElement = document.getElementById('timeElement');
let time_table = document.getElementById('time_table');
let info = document.getElementById('info');
let daysHolder = document.getElementById('daysHolder');
let button = document.getElementById('search_button')

let type =(a)=>a-273;
const days =["неділя","понеділок","вівторок","середа","четвер","п'ятниця","субота"];
const months =["січня",'лютого','березня',"квітня","травня","червня","липня","серпня","вересня","жовтня","листопада","грудня"]

let url;

button.addEventListener("click",function(){
  if(document.getElementById('search').value !=''){
  arr=[];
  daysHolder.innerHTML='';
  html.innerHTML='';
  let element_to_delete = document.getElementById('e1');
  time_table.removeChild(element_to_delete);
  url=`https://api.openweathermap.org/data/2.5/forecast?q=${document.getElementById('search').value}&lang=ua&appid=1ce9370a31ca136fdf72c09c9c571ecf`
  getCoords(`https://api.openweathermap.org/data/2.5/forecast?q=${document.getElementById('search').value}&lang=ua&appid=1ce9370a31ca136fdf72c09c9c571ecf`,type)
  }
})



setInterval(()=>{
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const minutes = time.getMinutes();
  if(minutes<10){
    timeElement.innerHTML='Зараз: ' + hour + ":"+ 0 + minutes  + ","+ date + ' ' + months[month]+ "," + days[day]
  }
  else{
    timeElement.innerHTML='Зараз: ' + hour + ":" + minutes  + ","+ date + ' ' + months[month]+ "," + days[day]
  }
  



},1000)

document.getElementById("f_button").addEventListener("click",function(){
  if(type != "(a)=>(a-273)*1.8+32"){
  type =(a)=>(a-273)*1.8+32;
  arr=[];
  html.innerHTML='';
  daysHolder.innerHTML='';
  let element_to_delete = document.getElementById('e1');
  time_table.removeChild(element_to_delete);
  getCoords();
  }
});
document.getElementById("c_button").addEventListener("click",function(){
  if(type != "(a)=>a-273"){
  type =(a)=>a-273;
  arr=[];
  html.innerHTML='';
  daysHolder.innerHTML='';
  let element_to_delete = document.getElementById('e1');
  time_table.removeChild(element_to_delete);
  getCoords();
  }
})


function getCoords(url){
  navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    if(url!==undefined){
      xhr.open("GET",url)
    }else{
      xhr.open("GET",`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=ua&appid=1ce9370a31ca136fdf72c09c9c571ecf`);
    }
    
    xhr.responseType="json";

    xhr.onload = function(){
    arr.push(xhr.response);
  
    
    let day = new Date();
    let nextDay = new Date(day);
    let i =1;
    let t = 0;
    let body = document.createElement('div');
    let ranok = document.createElement('div');
    let obid = document.createElement('div');
    let vechir = document.createElement('div');
    let day_info = document.createElement('div');
    


    ranok.innerHTML = ' ';
    obid.innerHTML = ' ';
    vechir.innerHTML = ' ';
    ranok.classList.add('ranok');
    obid.classList.add('obid');
    vechir.classList.add('vechir');

    let ranok_title = document.createElement('div');
    let obid_title = document.createElement('div');
    let vechir_title = document.createElement('div');
    let asd = document.createElement('div');

    ranok_title.classList.add('label');
    obid_title.classList.add('label');
    vechir_title.classList.add('label');

    ranok_title.innerHTML="<p>ранок</p>";
    obid_title.innerHTML="<p>день</p>";
    vechir_title.innerHTML="<p>вечір</p>";

    let m=0;
    let d=0;
    let v=0;
    
    let dt = 0;
    arr.forEach(e=>{
            info.classList.add('info');
            country.innerHTML=`${e.city.name}`;
            info.innerHTML=
            `
            <div class="curr_temp"><div><p>${Math.floor(type(e.list[0].main.temp))}&deg</p></div></div>
            <div class="icon">
            <img src="http://openweathermap.org/img/wn/${e.list[0].weather[0].icon}@2x.png"> 
            <p>${e.list[0].weather[0].description}</p>
            </div>
            
            `
          
//<div class="feels_like">
//<p>Відчувається як ${Math.floor(e.list[0].main.feels_like-273)}&deg</p>          
//</div>


      e.list.forEach(r=>{
        body.classList.add('forecast');
        body.setAttribute('id',`e${i}`);
        dt = new Date(r.dt_txt);
        if(Number(dt.getHours())>0 && Number(dt.getHours())<=9){
          m++;
          ranok.innerHTML+=`
          <div class="time_info">
          <p>${new Date(r.dt_txt).getHours()}:00</p>
          
          <p>${Math.floor(type(r.main.temp))}</p>
          <p>${Math.floor(type(r.main.feels_like))}</p>
          <p>${r.main.humidity}</p>
          <img src="http://openweathermap.org/img/wn/${r.weather[0].icon}@2x.png" width="50px" height="50px"> 
          </div>`;
        }
        else if(Number(dt.getHours())>=9 && Number(dt.getHours())<18){
          d++;
          obid.innerHTML+=`
          <div class="time_info">
          <p>${new Date(r.dt_txt).getHours()}:00</p>
          
          <p>${Math.floor(type(r.main.temp))}</p>
          <p>${Math.floor(type(r.main.feels_like))}</p>
          <p>${r.main.humidity}</p>
          <img src="http://openweathermap.org/img/wn/${r.weather[0].icon}@2x.png" width="50px" height="50px"> 
          </div>`;
        }
        else if(Number(dt.getHours())>=18 && Number(dt.getHours())){
          v++;
          vechir.innerHTML+=
          `
          <div class="time_info">
          <p>${new Date(r.dt_txt).getHours()}:00</p>
          
          <p>${Math.floor(type(r.main.temp))}</p>
          <p>${Math.floor(type(r.main.feels_like))}</p>
          <p>${r.main.humidity}</p>
          <img src="http://openweathermap.org/img/wn/${r.weather[0].icon}@2x.png" width="50px" height="50px"> 
          </div>
          `;
        }

        if (nextDay.getDate() === new Date(r.dt_txt).getDate()) {
        } else {
          if(i!=1){
          daysHolder.innerHTML+=
          `
          <div onclick="openElement(${i})" class="day">
          <div><p>${days[nextDay.getDay()]}</p></div>
          <div><p>${nextDay.getDate()} ${months[nextDay.getMonth()]}</p></div>
          </div>
          `
          }
          nextDay = new Date(r.dt_txt);
          
            if(ranok.innerHTML != ' '){
              t++;
              
              ranok.classList.add(`grid${m}`);
              ranok.style.display="grid";
              ranok.style.gridTemplateColumns=`repeat(${m},1fr)`;
              asd.append(ranok);
              asd.prepend(ranok_title);
              body.append(asd);
              ranok_title = document.createElement('div');
              ranok_title.classList.add('label');
              ranok_title.innerHTML="<p>ранок</p>";
              ranok = document.createElement('div');
              ranok.innerHTML=' ';
              ranok.innerHTML+=`<p>${r.dt_txt}</p>`;
              asd = document.createElement('div');
              
            }
            if(obid.innerHTML != ' '){
              t++;
              obid.classList.add(`grid${d}`);
              if(m!=0){
                obid.style.borderLeft="1px solid gray"
              }
              obid.style.display="grid";
              obid.style.gridTemplateColumns=`repeat(${d},1fr)`;
              asd.append(obid);
              asd.prepend(obid_title);
              body.append(asd);
              obid = document.createElement('div');
              obid_title = document.createElement('div');
              obid_title.classList.add('label');
              obid_title.innerHTML="<p>день</p>";
              obid.innerHTML=' ';
              obid.innerHTML+=`<p>${r.dt_txt}</p>`;
              asd = document.createElement('div');
              
            }
            if(vechir.innerHTML != ' '){
              t++;
              
              vechir.classList.add(`grid${v}`);
              if(d!=0){
                vechir.style.borderLeft="1px solid gray"
              }
              vechir.style.display="grid";
              vechir.style.gridTemplateColumns=`repeat(${v},1fr)`;
              asd.append(vechir);
              asd.prepend(vechir_title);
              body.append(asd);
              vechir = document.createElement('div');
              vechir_title = document.createElement('div');
              vechir_title.classList.add('label');
              vechir_title.innerHTML="<p>вечір</p>";
              vechir.innerHTML=' ';
              
              asd = document.createElement('div');
              
            }
            
            body = document.createElement('div');
            ranok = document.createElement('div');
            obid = document.createElement('div');
            vechir = document.createElement('div');
            
            i++;
            m=0;
            d=0;
            v=0;

         
        } 
        if(i ==1){
        time_table.append(body);
        }
        else if(i!=6){
          body.style.display="none"
          html.append(body);
        }
        if(t!= 0){

        }
        
      })
      
     
    })
    console.log(arr)
}

xhr.send();
  })
}

getCoords();



let sign = document.createElement('div');
sign.classList.add('sign');
sign.innerHTML=
`
                <p>Температура,C</p>
                <p>Відчуається як</p>
                <p>Вологість,%</p>
`

let last_div =1;
function openElement(el){
    if(last_div == 1){
      let elem = document.getElementById(`e${el}`);
      elem.style.display="flex";
      elem.style.boxShadow="box-shadow: 0 0 12px 0 #0003";
      elem.style.borderRadius="25px";
      elem.style.padding="20px";
      elem.prepend(sign);
      console.log(el)
      last_div = el;
    }
    else{
      let last = document.getElementById(`e${last_div}`);
      last.style.display="none";
      let elem = document.getElementById(`e${el}`);
      elem.style.display="flex";
     elem.style.boxShadow="box-shadow: 0 0 12px 0 #0003";
      elem.style.borderRadius="25px";
      elem.style.padding="20px";
      elem.prepend(sign);
      console.log(el)
      last_div = el;
    }
    
}

arr=[];



