$.get('https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=9hndRpl4TSRmPLB4VRGLV9OVZcOBz5kf', function(data){
    var Books=data.results.books;
        Books.forEach(MakeCards);
    })

function MakeCards(item){
    var card = $("<div style='margin-left:5%; margin-right:5%; margin-top:5%; margin-bottom:5%;'></div>").attr("class", "card");
    card.css("width","18rem");
    var img = $("<img></img>").attr("src", item.book_image);
    img.attr("class", "card-img-top");
    card.append(img);
    var myDiv = $("<div></div>").attr("class", "card-body");
    var title= $("<h5></h5>").attr("class", "card-title").text(item.title);
    myDiv.append(title);
    var desc= $("<p></p>").attr("class", "card-text").text(item.description);

    var BtnDiv =$('<a>Buy</a>' ).attr({ class:"btn btn-dark", href:item.amazon_product_url});
    myDiv.append(desc);
    BtnDiv.appendTo(myDiv)
    card.append(myDiv);
    card.css("display","inline-block");
    card.css("auto","inline-block");
    var x = card.appendTo("body");

     $.get(`https://booksrun.com/api/v3/price/buy/${item.primary_isbn10}?key=9pn7zo3q1hh7ukfca097`, function(dat){
    const Pris = dat.result.offers.booksrun.new.price;
    var Price = (Pris == undefined) ? "Not Available" :  `${dat.result.offers.booksrun.new.price} $`;
    (Pris == undefined) ? $( BtnDiv ).remove() : false;
    var priceDiv = $('<p id="out" style=" margin-left:5%;"></p>').attr({ class:"card-text btn btn-dark"}).text(Price);
    priceDiv.appendTo(myDiv);
});
    return x;
}