// variables

var author = document.querySelector("#author");
var article = document.querySelector("#article");
var wrapper = document.querySelector("#wrapper"),
    wrapper2 = document.querySelector("#wrapper-2");
var btn = document.querySelector("#header__back-button");
var a = document.getElementsByClassName("news");

// EVENT LISTENERS

window.addEventListener("load", displayNewsSources);
// window.addEventListener("load", getRequest);
btn.addEventListener("click", displayNewsSources);

//function to display news sources on home page

function displayNewsSources() {

    var xhr = new XMLHttpRequest();
    var method = "GET";
    var URL = "https://newsapi.org/v1/sources?language=en";

    xhr.open(method, URL);
    appendSources(xhr);
    
    xhr.send();

}

//fetch articles

function getRequest(b, i) {
    
        var request = new XMLHttpRequest();
        var method = "GET";  
        var URL = "https://newsapi.org/v1/articles?source="+ b.sources[i].id +"&sortBy=top&apiKey=f06cf653fb394fc9b33e490f5ff5a9bc";
        // var URL = "https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=f06cf653fb394fc9b33e490f5ff5a9bc";
        // request.responseType = "json";
        request.open(method, URL);
        showArticle(request);
        request.onerror = function() {
            console.log("error");
        }
        request.send();
    }

// show news sources in html

function appendSources(xhr) {

    xhr.onload = function() {
        var data = JSON.parse(xhr.response);
        wrapper.style.display = "flex";
        wrapper2.style.display = "none";
        // console.log(data.sources);
        for (var i = 0; i < data.sources.length - 1; i++) {
            wrapper.innerHTML += 
            "<div class='news'>" + 
                "<div class='news__img'>" +
                    "<img src='img/1.png'>" + 
                "</div>" +
                "<div class='news__inner'>" +
                    data.sources[i].name + 
                "</div>"
            "</div>";

            for (var j = 0; j < a.length - 1; j++) {
                (function (j) {
                    a[j].onclick = function() {
                        getRequest(data, j);
                    }
                })(j);
               
            }
        }    
        wrapper2.innerHTML = "";
    }    
}


//show articles in html

function showArticle(newRequest) {

    newRequest.onload = function() {
    var data = JSON.parse(newRequest.response);
    console.log(data.articles);
        if (newRequest.status >= 200 && newRequest.status <= 400) {
            wrapper.style.display = "none";
            wrapper2.style.display = "flex";

            for (var y = 0; y < 1; y++) {
                wrapper2.innerHTML += 
                "<h3>" + data.articles[y].author + "</h3>";
            }

            for (var x = 0; x < data.articles.length; x++) {
                (function (x) {
                    wrapper2.innerHTML += 
                        "<div class='article-box'>" +
                            "<i class='fa fa-heart-o' aria-hidden='true'></i>" +
                            "<img src='" + data.articles[x].urlToImage + "'>" + 
                            "<div class='article__inner'>" +
                                "<a  href='" + data.articles[x].url +"' target='blank'>" + 
                                    "<h4>" + data.articles[x].title + "</h4>" +
                                    // "<span>" + data.articles[x].publishedAt + "</span>" +
                                    "<p>" + data.articles[x].description + "</p>" +
                                "</a>" + 
                                "<div class='icons'>" +
                                    "<i class='fa fa-twitter' aria-hidden='true'></i>" + 
                                    "<i class='fa fa-facebook' aria-hidden='true'></i>" +
                                "</div>" +
                            "</div>" +
                        "</div>";
                })(x);
            
            }
            
            wrapper.innerHTML = "";
        }
    }

}

// function show