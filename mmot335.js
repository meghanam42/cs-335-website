let currentTab = "";
      function showHome() {
         if (currentTab != "Home") {
            currentTab = "Home";
            showNoTabs();
            document.getElementById("Home").style.backgroundColor = "aliceblue";
            document.getElementById("SectionHome").style.display = "inline";
         }
      }

      function showNews() {
         if (currentTab != "News") {
            currentTab = "News";
            showNoTabs();
            getNews();
            document.getElementById("News").style.backgroundColor = "aliceblue";
            document.getElementById("SectionNews").style.display = "inline";
         }
      }

      function showDisplays() {
         if (currentTab != "Displays") {
            currentTab = "Displays";
            showNoTabs();
            getDisplays();
            document.getElementById("Displays").style.backgroundColor = "aliceblue";
            document.getElementById("SectionDisplays").style.display = "inline";
         }
      }

      function showGuestbook() {
         if (currentTab != "Guestbook") {
            currentTab = "Guestbook";
            showNoTabs();
            reload();
            document.getElementById("Guestbook").style.backgroundColor = "aliceblue";
            document.getElementById("SectionGuestbook").style.display = "inline";
         }
      }

      function showNoTabs() {
         document.getElementById("Home").style.backgroundColor = "transparent";
         document.getElementById("News").style.backgroundColor = "transparent";
         document.getElementById("Displays").style.backgroundColor = "transparent";
         document.getElementById("Guestbook").style.backgroundColor = "transparent";

         document.getElementById("SectionHome").style.display = "none";
         document.getElementById("SectionNews").style.display = "none";
         document.getElementById("SectionDisplays").style.display = "none";
         document.getElementById("SectionGuestbook").style.display = "none";
      }

      function showOnlyHome() {
        showHome();
        document.getElementById("News").style.backgroundColor = "transparent";
        document.getElementById("Displays").style.backgroundColor = "transparent";
        document.getElementById("Guestbook").style.backgroundColor = "transparent";

        document.getElementById("SectionNews").style.display = "none";
        document.getElementById("SectionDisplays").style.display = "none";
        document.getElementById("SectionGuestbook").style.display = "none";
     }

      window.onload = function () {
         showOnlyHome();
         getVersion();
      }

      function getNews() {
        const uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/news";
        const xhr = new XMLHttpRequest();
        xhr.open("GET", uri, true);
        xhr.setRequestHeader("Accept", "application/json; charset=utf-8");
        xhr.onload = () => {
           const news = JSON.parse(xhr.responseText);
           displayNews(news);
        }
        xhr.send(null);
     }

     function displayNews(news){
        let news_output = []
        const addRecord = (record) => {
            news_output += "<p>" + "<h3>"+ "<a href = " + record.linkField+ ">" + record.titleField  + "</a>" + "</h3>"+ "<img class = im src = " + record.enclosureField.urlField + " height=300 width=300>" + "<br>" + "Published " + record.pubDateField +  "<br> <br>" + record.descriptionField  + "<br>" +  "<br>" + "—————&#x1F4F0;—————&#x1F4F0;—————&#x1F4F0;—————" + "</p>\n";
        }
        news.forEach(addRecord);
        document.getElementById("newsContent").innerHTML = news_output; 
     }

     function getDisplays() {
        const uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/items";
        const xhr = new XMLHttpRequest();
        xhr.open("GET", uri, true);
        xhr.setRequestHeader("Accept", "application/json; charset=utf-8");
        xhr.onload = () => {
           const displays = JSON.parse(xhr.responseText);
           displayDisplays(displays);
        }
        xhr.send(null);
     }

     function displayDisplays(displays){
        let displays_output = [];
        const addRecord = (record) => {
            imagelink = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/itemimg?id="+record.ItemId
            displays_output += "<p>" + "<h3>" + record.Title  + "</h3>"+ "<img src = " + imagelink + " height=300 width=300>"  + "<br>" + record.Description  + "<br>" +  "<br>" + "—————&#x1F4BB;—————&#x1F4BB;—————&#x1F4BB;—————" + "</p>\n"; 
        }
        displays.forEach(addRecord);
        document.getElementById("displaysContent").innerHTML = displays_output; 
     }

     function searchDisplays(){
        const searchValue = document.getElementById("searchDisplay").value;
        const xhr = new XMLHttpRequest();
        const uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/search?term="+searchValue;
        xhr.open("GET", uri, true);
        xhr.setRequestHeader("Accept", "application/json; charset=utf-8");
        xhr.onload = () => {
            const result = JSON.parse(xhr.responseText);
            displayDisplays(result);
        }
        xhr.send(null);
     }


    function reload(){
        document.getElementById("Name").value = ""
        document.getElementById("Comment").value = ""
        document.getElementById('commentsSection').src = document.getElementById('commentsSection').src
    } 


    function postComment(){
        const xhr = new XMLHttpRequest(); 
        const name = document.getElementById("Name").value;
        const comment =  document.getElementById("Comment").value;
        const commentlength = comment.length; 
        if (commentlength == 0){
            alert("Please enter a comment!");
        }
        else{
            const uri = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/comment?name="+name; 
            xhr.open("POST", uri, true); 
            xhr.setRequestHeader("Accept", "application/json; charset=utf-8");
            xhr.setRequestHeader("Content-Type", "application/json"); 
            xhr.setRequestHeader("Content-Length", commentlength);
            xhr.onload =  () =>{
            // POST succeeds; do something
                reload(); 
            }
            xhr.send(JSON.stringify(comment));
        }
    }

