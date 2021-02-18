var mainContainer = document.getElementById("newsPage");
const data = {};

// if news page id doesn't exist we create a full newspage
if (mainContainer == null) {
    mainContainer = document.getElementById("newsPageFull");
    let params = new URLSearchParams(location.search);
    let id = params.get("id");
    var docRef = newsRef.doc(id);

    docRef
        .get()
        .then(function(doc) {
            if (doc.exists) {
                var html = createArticle(doc.data());
                // console.log(html);
                mainContainer.innerHTML = html;
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        })
        .catch(function(error) {
            console.log("Error getting document:", error);
        });
} else {
    newsRef.get().then((snapshot) => {
        let data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        data = data.reverse();


        // console.log(data)

        const html = summary(data);
        // console.log(html)
        mainContainer.innerHTML = html;
        for (let i = 0; i < data.length; i++) {
            // console.log(data[i]);
            var doc_id = "news-id-" + data[i].id;
            var element = document.getElementById(doc_id);
            element.addEventListener("click", function() {
                newPage(data[i].id);
            });
        }
    });
    // [ { id: 'glMeZvPpTN1Ah31sKcnj', title: 'The Great Gatsby' } ]
}

function createArticle(data) {
    

    var html = "";
    var image = getImage(data.images[0]);
    html += '<div id="article-cover">';
    html +=
        '<img src="' +
        image +
        '" id="article-cover-img" alt="" title="' +
        data.title +
        '" />';
    html += "</div>";
    html += '<h1 class="title">' + data.title + "</h1>";
    html += '<h6 class="author">' + data.author + "</h6>";
    html += '<div id="article-content">';
    html += '<div class="news-text">' + data.text_blobs[0] + "</div>";
    for (var i = 1; i < data.text_blobs.length; i++) {
        var image = getImage(data.images[i]);
        html +=
            '<img src="' + image + '" alt="" title="' + data.title + '" />';
        html += '<div class="news-text">' + data.text_blobs[i] + "</div>";
    }
    html += "</div>";
    return html;
}

function summary(news) {
    var i = 0;
    var html = "";
    for (news_article of news) {
        let id = generateid(news_article.id);
        html += '<div class="news-summary-container" id=' + id + "> ";
        var image = getImage(news_article.images[0]);
        html +=
            "<img src=" +
            image +
            'alt = "" title = "' +
            news_article.title +
            '" />';
        html += '<div class = "news-summary" >';
        html += '<h1 class = "title">' + news_article.title + "</h1>";
        html += '<h6 class = "author">' + news_article.author + "</h6>";
        html +=
            '<div class = "news-summary-text">' +
            news_article.summary +
            "</div>";
        html += "</div> </div>";

        i += 1;

        
    }
    return html;
}

let createSummary = (text) => text.slice(0, 300);
let generateid = (text) => "news-id-" + text;
let newPage = (text) => (window.location = "news/news.html?id=" + text);
let getImage = (text) => text;
