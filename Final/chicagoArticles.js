// Set up the apikey parameter in the url
var API_KEY = "https://api.nytimes.com/svc/search/v2/articlesearch.json" + "?api-key=e3BR7FpoYqYR79HrXMSBliCR61BxvzXu" + "&fq=Chicago"

fetch(API_KEY)
  .then((response) => { return response.json() })
  .then((data) => {
    console.log(data.response.docs);

    data.response.docs.forEach((article) => {
      var articleTitle = article.headline.main;
      var articleDate = article.pub_date.substring(0,10);
      var articleLeadPara = article.lead_paragraph;
      var articleURL = article.web_url;
      var articleImage = article.multimedia; // TODO: Get the thumbnail if possible

      // Create the card content for each article
      let card = document.createElement("div");
      card.setAttribute("class", "mdc-card mdc-card--outlined");

      let cardContent = document.createElement("div");
      cardContent.setAttribute("class", "mdc-card__content");

      let cardTitle = document.createElement("h3");
      cardTitle.setAttribute("class", "article-title")
      cardTitle.innerText = articleTitle;

      let cardDate = document.createElement("p");
      cardDate.setAttribute("class", "article-date")
      cardDate.innerText = articleDate;

      let cardPara = document.createElement("p")
      cardPara.setAttribute("class", "article-paragraph")
      cardPara.innerText = articleLeadPara;

      // Append the card content HTMl to the card
      cardContent.appendChild(cardTitle);
      cardContent.appendChild(cardDate);
      cardContent.appendChild(cardPara);

      // Create a button that redirect the user to the article's link
      let cardAction = document.createElement("div")
      cardAction.setAttribute("class", "mdc-card__actions")
      
      let cardButton = document.createElement("button")
      cardButton.setAttribute("class", "mdc-button mdc-card__action mdc-card__action--button")

      let cardButtonRipple = document.createElement("div")
      cardButtonRipple.setAttribute("class", "mdc-button__ripple")

      let cardButtonLabel = document.createElement("span")
      cardButtonLabel.setAttribute("class", "mdc-button__label")
      cardButtonLabel.innerText = "Read more";

      cardButton.appendChild(cardButtonRipple)
      cardButton.appendChild(cardButtonLabel)
      cardAction.appendChild(cardButton)

      // If the user clicks the button, go to the article's page
      cardButton.addEventListener("click", (event) => {
        window.open(articleURL);
      })
      
      // Append the card content HTML to the screen
      card.appendChild(cardContent);
      card.appendChild(cardAction);
      document.querySelector(".article-container").appendChild(card);
    })

  })
