var CoSS = (function (my, YUI, window) {
    "use strict";

    var MAX_ENTRIES = 5,
        MAX_WORDS = 30;

    my.feed = function (id, url, maxEntries, maxWords) {
        maxEntries = typeof maxEntries === "number" ? maxEntries : MAX_ENTRIES;
        maxWords = typeof maxWords === "number" ? maxWords : MAX_WORDS;

        YUI().use("yql", function (Y) {
            Y.YQL(query(url, maxEntries), function (r) { //r is result as JSON
                fill(id, r.query.results.item, maxWords);
            });
        });
    };

    function query(url, max) {
        return "select * from rss(0," + max + ') where url = "' + url + '"';
    }

    function fill(id, entries, max) {
        window.document.getElementById(id).innerHTML = markup(entries, max);
    }

    function markup(entries, max) {
        return reduce(entries, function (accumulator, entry) {
            return accumulator + header(entry) + body(entry, max);
        }, "");
    }

    function header(entry) {
        return '<h4><a href="' + entry.link + '">' + entry.title + "</a></h4>";
    }

    function body(entry, max) {
        var array = entry.description.
            replace(" [&#8230;]", "&hellip;").split(" ");

        return "<p>" + array.slice(0, max).join(" ") +
            (array.length > max ? "&hellip;" : "") + "</p>";
    }

    function reduce(array, callback, accumulator) {
        var i = 0;

        for (; i < array.length; i += 1) {
            accumulator = callback(accumulator, array[i]);
        }
        
        return accumulator;
    }

    return my;

}(this.CoSS || {}, this.YUI, this));