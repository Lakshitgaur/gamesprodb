GameDB.controller('Reviews', function ($scope) {
    $(function () {


          var feedpointer = new google.feeds.Feed("http://www.giantbomb.com/feeds/reviews/");
        
        feedpointer.load(formatoutput)


        function formatoutput(result) {
            if (!result.error) {
                var rssoutput = ""
                var thefeeds = result.feed.entries
                for (var i = 0; i < thefeeds.length; i++) {
                    var entrydate = new Date(thefeeds[i].publishedDate) //get date of entry
                    var entrydatestr = ' ' + entrydate.getFullYear() + "/" + (entrydate.getMonth() + 1) + "/" + entrydate.getDate()
                    rssoutput += "<h1><ul class='news-headlines'> <li class='selected'></li></ul><div class='news-preview'><div class='news-content'><a href='" + thefeeds[i].link + "'>" + thefeeds[i].title + "</a></u></h1>" + "<h3>" + "Reviews release Date:" + entrydatestr + "</h3>" + "<br />" + thefeeds[i].content + "</p></br></div></div> <hr style='background:#F87431; border:0; height:7px' />"

                }
                
                var holder = $("#reviews-here");
               
                holder.append(rssoutput);
            }
            else 
                alert(result.error.message)
        }

    });
});