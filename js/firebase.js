var mainContainer = document.getElementById("newsPage");
const data = {}

if (mainContainer == null) {
    mainContainer = document.getElementById("newsPageFull")
    let params = new URLSearchParams(location.search);
    let id = params.get('id')
    var docRef = newsRef.doc(id);

    docRef.get().then(function(doc) {
        if (doc.exists) {
            var html = createArticle(doc.data());
            console.log(html);
            mainContainer.innerHTML = html;
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

} else {
    newsRef
        .get()
        .then((snapshot) => {
            let data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            data = data.reverse()
                // console.log(data)

            const html = summary(data)
            console.log(html)
            mainContainer.innerHTML = html;
            for (let i = 0; i < data.length; i++) {
                console.log(data[i]);
                var doc_id = "news-id-" + data[i].article_num;
                var element = document.getElementById(doc_id);
                element.addEventListener("click", function() {
                    newPage(data[i].id);
                });
            }
        });
    // [ { id: 'glMeZvPpTN1Ah31sKcnj', title: 'The Great Gatsby' } ]

}

function createArticle(data) {
    // <div class="cover-photo" style="background-image: ">
    //     <img src="../img/nsei-preview.jpeg" alt="" title="test1" />
    // </div>
    // <h1 class="title"> weekly 1</h1>
    // <h6 class="author"> Author 1</h6>
    // <p class="news-text">
    //     Warwick Esports is number one in university UK esports. We help students play, learn and compete to become the best they can.
    // 		</p>

    var html = ''
    html += '<img src="' + data.images[0] + '" id="article-cover-img" alt="" title="' + data.title + '" />'
    html += '<h1 class="title">' + data.title + '</h1>'
    html += '<h6 class="author">' + data.author + '</h6>'
    html += '<p class="news-text">' + data.text_blobs[0] + '</p>'
    for (var i = 1; i < data.text_blobs.length; i++) {
        html += '<img src="' + data.images[i] + '" alt="" title="' + data.title + '" />'
        html += '<p class="news-text">' + data.text_blobs[i] + '</p>'

    }
    return html


}

function summary(news) {
    var i = 0;
    var html = "";
    for (news_article of news) {
        let id = generateid(news_article.article_num);
        html += '<div class="news-summary-container" id=' + id + '> '
        // if (i % 2 == 0) {

            html += '<img src=' + news_article.images[0] + 'alt = "" title = "' + news_article.title + '" />'
            html += '<div class = "news-summary" >'
            html += '<h1 class = "title">' + news_article.title + '</h1>'
            html += '<h6 class = "author">' + news_article.author + '</h6>'
            html += '<p class = "news-text">' + createSummary(news_article.text_blobs[0]) + '</p>'
            html += '</div> </div>'

        // } else {

        //     html += '<div class = "news-summary" >'
        //     html += '<h1 class = "title">' + news_article.title + '</h1>'
        //     html += '<h6 class = "author">' + news_article.author + '</h6>'
        //     html += '<p class = "news-text">' + createSummary(news_article.text_blobs[0]) + '</p>'
        //     html += '</div>'
        //     html += '<img src=' + news_article.images[0] + 'alt = "" title = "' + news_article.title + '" />'
        //     html += '</div>'


        // }


        i += 1

        // < div class = "news-summary-container" onclick = "window.location.href='news.html'" >
        //     <
        //     img src = "../img/about-img.jpg"
        // alt = ""
        // title = "test1" / >
        //     <
        //     div class = "news-summary" >
        //     <
        //     h1 class = "title" > weekly 1 < /h1> <
        //     h6 class = "author" > Author 1 < /h6> <
        //     p class = "news-text" >
        //     Warwick Esports is number one in university UK esports.We help students play, learn and compete to become the best they can. <
        //     /p> <
        //     /div>

        //     <
        //     /div>
    }
    return html;
}

let createSummary = text => text.slice(0, 100)
let generateid = text => "news-id-" + text
let newPage = text =>
    window.location = "news.html?id=" + text