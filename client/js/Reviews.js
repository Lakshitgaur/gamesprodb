$(function () {


//    $("body").append('<div class="news-holder" id="news-holder"></div>');
//document.write('<div class="news-holder" id="news-holder"></div>')
var feedpointer = new google.feeds.Feed("http://www.giantbomb.com/feeds/reviews/");
//feedpointer.setNumEntries(1) //Show 1 entry only
feedpointer.load(formatoutput)


function formatoutput(result) {
    if (!result.error) {
        var rssoutput = ""
        var thefeeds = result.feed.entries
        for (var i = 0; i < thefeeds.length; i++) {
            var entrydate = new Date(thefeeds[i].publishedDate) //get date of entry
            var entrydatestr = ' ' + entrydate.getFullYear() + "/" + (entrydate.getMonth() + 1) + "/" + entrydate.getDate()
            rssoutput += "<ul class='news-headlines'> <li class='selected'>"+ thefeeds[i].link +"</li></ul><div class='news-preview'><div class='news-content'><a href='" + thefeeds[i].link + "'>" + thefeeds[i].title + "</a></u></h1>" + "<h3>" + "News Date:" + entrydatestr + "</h3>" + "<br />" + thefeeds[i].content + "</p></br></div></div>"
       
        }
        //        document.getElementByID("news-holder").innerHTML = rssoutput
        var holder = $("#reviews-here");
        console.log(holder);
        holder.append(rssoutput);
    }
    else //if error fetching feed, alert human readable error message
        alert(result.error.message)
}

});


/*
<div class="news-holder cf">
                        <ul class="news-headlines">
                            <li class="selected">100 red bicycles stolen from local bike store</li>
                            <li>New leash laws in effect for floppy-eared dogs</li>
                            <li>Insider: Can palm trees be saved?</li>
                            <li>Fresh recipes to titillate the taste buds</li>
                            <li>Truck inspections under way for the metropolitan area</li>
                            <li>Are the beaches safe for swimming this year?</li>
                            <!-- li.highlight gets inserted here -->
                        </ul>
                        <div class="news-preview">
                            <div class="news-content top-content">
                                <img src="http://cdn.impressivewebs.com/news1.jpg">
                                <p><a href="#">100 red bicycles stolen from local bike store</a></p>
                                <p>A hundred red bicycles were stolen from under our noses yesterday, and nobody knows what went wrong.</p>
                            </div><!-- .news-content -->
                            <div class="news-content">
                                <img src="http://cdn.impressivewebs.com/news2.jpg">
                                <p><a href="#">New leash laws in effect for floppy-eared dogs</a></p>
                                <p>Ears on dogs can be a tricky thing. Find out more about this amazing story and why these dogs are a nuisance.</p>
                            </div><!-- .news-content -->
                            <div class="news-content">
                                <img src="http://cdn.impressivewebs.com/news3.jpg">
                                <p><a href="#">Insider: Can palm trees be saved?</a></p>
                                <p>Ah, the palm tree. It feeds us, it shades us, it does whatever we ask. We should think about it more deeply.</p>
                            </div><!-- .news-content -->
                            <div class="news-content">
                                <img src="http://cdn.impressivewebs.com/news4.jpg">
                                <p><a href="#">Fresh recipes to titillate the taste buds</a></p>
                                <p>Food is great. These recipes will make you appreciate food as if it were even greater than great. It will be super great.</p>
                            </div><!-- .news-content -->
                            <div class="news-content">
                                <img src="http://cdn.impressivewebs.com/news5.jpg">
                                <p><a href="#">Truck inspections under way for the metropolitan area</a></p>
                                <p>The Sherrif's department has put out an APB on these trucks. You know, this is the kind of thing that only happens in small towns.</p>
                            </div><!-- .news-content -->
                            <div class="news-content">
                                <img src="http://cdn.impressivewebs.com/news6.jpg">
                                <p><a href="#">Are the beaches safe for swimming this year?</a></p>
                                <p>Giant orange pedal boats have been spotted at various beaches. In this report we tell you some ridiculous precautions to take.</p>
                            </div><!-- .news-content -->
                        </div><!-- .news-preview -->
                    </div><!-- .news-holder -->*/