(function(){


    //quando inicia carrega a localizacao e a metereologia da localização atual
window.addEventListener("load",load,false);
const urlMetereologia = "http://api.weatherapi.com/v1/current.xml?key=70d13dcfe9ab4061b27132744202105";
const urlCovid = "https://covid-193.p.rapidapi.com/statistics?country=";
function load(){
    geolocal();
   
    
    var botaoprocura=document.getElementById("botaoProcura");


 //carrega os dados da meteorologia associado à localização
    var loadMeteo = function(){
        metereologia(urlMetereologia+"&q="+document.getElementById("procura").value)
    }

        botaoprocura.addEventListener("click", loadMeteo,false);


    var botaocovid=document.getElementById("botaocovid");

    //carrega os dados do covid associado ao país da localização
    var loadCovid = function(){
        covidRes(urlCovid+document.getElementById("procuraCovid").value)  
    }

    botaocovid.addEventListener("click", loadCovid,false);
    

    //esconder metereologia
    
    document.getElementById('mostrarMetereologia').addEventListener("click",function(){ 
              var div=document.getElementById('metereologia');
       if (div.classList.contains("hidden")){
           div.classList.remove("hidden");
       }
    },false);

    //esconder pesquisa
    document.getElementById('mostrarPesquisa').addEventListener("click",function(){ 
              var div=document.getElementById('barraProcura');
       if (div.classList.contains("hidden")){
           div.classList.remove("hidden");
       }
    },false);

    //esconder tab covid

    document.getElementById('covid').addEventListener("click",function(){ 
        var div=document.getElementById('situacaocovid');
 if (div.classList.contains("hidden")){
     div.classList.remove("hidden");
 }
},false);

//esconder pesquisa covid

document.getElementById('pesquisacovid').addEventListener("click",function(){ 
    var div=document.getElementById('covidPro');
if (div.classList.contains("hidden")){
 div.classList.remove("hidden");
}
},false);



    
}

//funçao que retorna os dados da api geo localização

function geolocal() {
    var xmlhttp = new XMLHttpRequest();
    var url = "http://www.geoplugin.net/xml.gp";
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myFunction(this);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();


    function myFunction(xhttp) {
        var xml=xhttp.responseXML;

        var xPathEvaluator = new XPathEvaluator();

        // atraves do xPathEvaluator vai a API os buscar os dados indicados 
        var localizacao= xPathEvaluator.evaluate("//geoplugin_city",xml,null,XPathResult.STRING_TYPE,null).stringValue;
        var conselho= xPathEvaluator.evaluate("//geoplugin_region",xml,null,XPathResult.STRING_TYPE,null).stringValue;
        var paisatual= xPathEvaluator.evaluate("//geoplugin_countryName",xml,null,XPathResult.STRING_TYPE,null).stringValue;
        var latitude= xPathEvaluator.evaluate("//geoplugin_latitude",xml,null,XPathResult.STRING_TYPE,null).stringValue;
        var longitude= xPathEvaluator.evaluate("//geoplugin_longitude",xml,null,XPathResult.STRING_TYPE,null).stringValue;
        var simbolo= xPathEvaluator.evaluate("//geoplugin_currencySymbol",xml,null,XPathResult.STRING_TYPE,null).stringValue;
       

        // associa os dados aos id do html

        document.getElementById('localidade').innerHTML+=localizacao;
        document.getElementById('conselho').innerHTML+=conselho;
        document.getElementById('paisatual').innerHTML+=paisatual;
        document.getElementById('latitude').innerHTML+=latitude;
        document.getElementById('longitude').innerHTML+=longitude;
        document.getElementById('simbolo').innerHTML+=simbolo;
        metereologia(urlMetereologia+"&q="+localizacao); //parametro da api para procura
        covidRes(urlCovid+ paisatual);
    }
}



// funcao que faz o request da meteorologia
function metereologia(url) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            mostrarMetereologia(this);  //quando chamada mostra os dados da metereologia
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();


    // mostrar Metereologia e impede que os elementos seja duplicados quando feita a nova pesquisa.

    function mostrarMetereologia(xhttp) {
        document.getElementById('tempo').innerHTML="Tempo: ";
        document.getElementById('temperatura').innerHTML="Temperatura: ";
        document.getElementById('last_updated').innerHTML="Atualizado ás: ";
        document.getElementById('velVento').innerHTML="Vento: ";
        document.getElementById('humidade').innerHTML="Humidade: ";
        document.getElementById('sentem').innerHTML="Sensação Térmica: ";
        document.getElementById('visibilidade').innerHTML="Visibilidade: ";
        document.getElementById('posChuva').innerHTML="Chuva: ";
        document.getElementById('nome').innerHTML="Região: ";
        document.getElementById('localtime').innerHTML="Data e Hora Local: ";
        document.getElementById('nuvens').innerHTML="Ceu: ";
        document.getElementById('gust_kph').innerHTML="Rajada Máxima: ";
        document.getElementById('pais').innerHTML="País: ";
        var img = new Image();
        var xml=xhttp.responseXML;

        var xPathEvaluator = new XPathEvaluator();

       
       
        var temperatura= xPathEvaluator.evaluate("//temp_c",xml,null,XPathResult.NUMBER_TYPE,null).numberValue;
        img.src=xPathEvaluator.evaluate("//icon",xml,null,XPathResult.STRING_TYPE,null).stringValue;
        var localtime= xPathEvaluator.evaluate("//localtime",xml,null,XPathResult.STRING_TYPE,null).stringValue;
        var last_updated= xPathEvaluator.evaluate("//last_updated",xml,null,XPathResult.STRING_TYPE,null).stringValue;
        var velVento= xPathEvaluator.evaluate("//wind_kph",xml,null,XPathResult.NUMBER_TYPE,null).numberValue;
        var posChuva= xPathEvaluator.evaluate("//precip_mm",xml,null,XPathResult.NUMBER_TYPE,null).numberValue;
        var humidade= xPathEvaluator.evaluate("//humidity",xml,null,XPathResult.NUMBER_TYPE,null).numberValue;
        var sentem= xPathEvaluator.evaluate("//feelslike_c",xml,null,XPathResult.NUMBER_TYPE,null).numberValue;
        var visibilidade= xPathEvaluator.evaluate("//vis_km",xml,null,XPathResult.NUMBER_TYPE,null).numberValue;
        var nome= xPathEvaluator.evaluate("//region",xml,null,XPathResult.STRING_TYPE,null).stringValue;
        var tempo= xPathEvaluator.evaluate("//text",xml,null,XPathResult.STRING_TYPE,null).stringValue;
        var gust_kph= xPathEvaluator.evaluate("//gust_kph",xml,null,XPathResult.STRING_TYPE,null).stringValue;
        var pais= xPathEvaluator.evaluate("//country",xml,null,XPathResult.STRING_TYPE,null).stringValue;

        img.onload=function(){
        document.getElementById('nuvens').appendChild(img); // vai buscar a imagem ao xml no elemento icon linha 117 ao img.src e carrega essa imagem
        
    }
        document.getElementById('temperatura').innerHTML+=temperatura+" graus";
        document.getElementById('last_updated').innerHTML+=last_updated;
        document.getElementById('velVento').innerHTML+= +velVento+ " kph";
        document.getElementById('posChuva').innerHTML+=posChuva+" mm";
        document.getElementById('humidade').innerHTML+=humidade+"%";
        document.getElementById('sentem').innerHTML+=sentem + " graus";
        document.getElementById('visibilidade').innerHTML+=visibilidade+" km";
        document.getElementById('localtime').innerHTML+=localtime;
        document.getElementById('nome').innerHTML+=nome;
        document.getElementById('tempo').innerHTML+=tempo;
        document.getElementById('gust_kph').innerHTML+=gust_kph + "kph";
        document.getElementById('pais').innerHTML+=pais;
    }
}




function mostrar(obj) {
    document.getElementById('localizacao').style.display="none";
    document.getElementById('metereologia').style.display="none";
    document.getElementById('barraProcura').style.display="none";
    document.getElementById('covidPro').style.display="none";

    
    switch (obj.id) {
        case 'mostra1':
            document.getElementById('localizacao').style.display="block";
            break
        case 'mostra2':
            document.getElementById('metereologia').style.display="block";
            break
                case 'mostra3':
            document.getElementById('barraProcura').style.display="block";
            break
            case 'mostra4':
            document.getElementById('covidPro').style.display="block";
            break
            
    }
}



function covidRes(urlCovid) 
    {

      
     var xmlhttp = new XMLHttpRequest();
         
        
        xmlhttp.onreadystatechange= function() {
            if (this.readyState == 4 && xmlhttp.status == 200) {
             mostrarDados(JSON.parse(xmlhttp.responseText));
                           }
        };

        xmlhttp.open("GET", urlCovid, true);
        xmlhttp.setRequestHeader("x-rapidapi-key", "031a259b68msh789d3ec136f0590p137044jsn7fa06ed366e9");
        xmlhttp.send();
    }
    
   
        

function mostrarDados(DocJSON){
     
document.getElementById("nInfetados").innerHTML="Número de Infetados: ";
     
document.getElementById("nObitos").innerHTML="Número Total de Obitos: ";
    
document.getElementById("nDiarioMortos").innerHTML="Mortes nas últimas 24 horas: ";
  
document.getElementById("nRecuperados").innerHTML="Numero Total de Recuperados: ";

document.getElementById("nNovosCasos").innerHTML="Novos Casos: ";

document.getElementById("casosAtivos").innerHTML="Casos Ativos: ";

document.getElementById("oPais").innerHTML="País: ";

document.getElementById("aPopulacao").innerHTML="População: ";

document.getElementById("data").innerHTML="data: ";




   var dados=DocJSON;
   var casos= dados.response[0].cases.total;
   var Mortes=dados.response[0].deaths.total;
   var casosRecup =dados.response[0].cases.recovered;
   var novosCasos= dados.response[0].cases.new;
   var casosAtivo= dados.response[0].cases.active;
   var novosObitos= dados.response[0].deaths.new;
   var country= dados.response[0].country;
   var populacao= dados.response[0].population;
   var aData= dados.response[0].day;

		
   nInfetados.innerHTML+=casos;
    document.getElementById("nObitos").innerHTML+=Mortes;
    document.getElementById("nRecuperados").innerHTML+=casosRecup;
    document.getElementById("nNovosCasos").innerHTML+=novosCasos;
    document.getElementById("casosAtivos").innerHTML+=casosAtivo;
    document.getElementById("nDiarioMortos").innerHTML+=novosObitos;
    document.getElementById("aPopulacao").innerHTML+=populacao;
    document.getElementById("data").innerHTML+=aData;
    document.getElementById("oPais").innerHTML+=country;


    
  }

})();