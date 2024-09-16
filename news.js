const API_KEY = "5d24bbb7250345f4a02d5e456d329fc8";
const url = "https://newsapi.org/v2/everything?q=";

$(document).ready(() => {
    fetchNews("India");
});

async function fetchNews(query) {

    const response = await fetch(`${url}${query}&from=2024-09-04&sortBy=publishedAt&apiKey=${API_KEY}`);
    const data = await response.json();
    
    bindData(data.articles);
}

function bindData(articles) {
    const bigContainer = $(".big-container");
    const newsTemplate = $("#temp-news");

    bigContainer.empty();

    $.each(articles, (index, article) => {
        if (!article.urlToImage) return;
        const newsClone = $(newsTemplate.html());
        fillDataInCard(newsClone, article);
        bigContainer.append(newsClone);
    });
}
function toggleMenu() {
    const navLinks = $('.nav-links');
    navLinks.toggleClass('active');
}


function fillDataInCard(newsClone, article) {
    const newsImg = newsClone.find("img");
    const newsTitle = newsClone.find("#title");
    const newsTime = newsClone.find("#time");
    const newsDesc = newsClone.find("#content");

    newsImg.attr("src", article.urlToImage);
    newsTitle.html(article.title);
    newsDesc.html(article.description);

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
    });

    newsTime.html(`${article.source.name} . ${date}`);

    newsClone.on("click", () => {
        window.open(article.url, "_blank");
    });
}

function onNavItemClick(id) {
    fetchNews(id);

}

const searchButton = $("#search-button");
const searchInput = $(".search input");

searchButton.on("click", () => {
    const query = searchInput.val();
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.removeClass("active");
    curSelectedNav = null;
});
function reload(){
    window.location.reload();
}