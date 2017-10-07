/*
 * banr.js
 *
 * Michael T. Wescoat
 * College of Social Sciences
 * San Jose State Univiersity
 * December 12, 2016
 *
 * This script is for producing the sort of banners found on home pages in the
 * SJSU OU Campus CMS, making it possible to include such banners on any page.
 * Calling the function transform() initiates a search of the body of a webpage
 * for elements with the class "banner-data." These elements should be
 * three-column tables, where the first column holds a 660px X 340px image, the
 * second a caption header, and the last a caption body. If these conditions are
 * met, the table will be replaced with an OU Campus banner. If the table
 * contains just one row, the banner will be a static banner. If the table has
 * more rows, the banner will be a nivoslider slide show.
 *
 * An attempt will be made to transform however many tables with the
 * "banner-data" class are present in the body of the page. However, there can
 * be only one nivoslider on a page. (Note the use of the "slider-wrapper" id.)
 * In contrast, any number of static banners will work. A mixture of one
 * nivoslider with any number of static banners is possible, in any order.
 *
 * The function listener() is provided in order to make it possible to deploy
 * transform() as an onload listener.
 *
 * Both transform() and listener() are defined in the CoSS.banr name space.
 * Hence, a script invoking these functions might look like this:
 *
 *   <script type="text/javascript">
 *   CoSS.banr.listener(this, "load", CoSS.banr.transform);
 *   </script>
 */

var CoSS = this.CoSS || {};

CoSS.banr = (function (my, window) {
    "use strict";

    //--------------------------------------------------------------------------

    var DATA_CLASS = "banner-data",
    	document = window.document,
    	body = document.body;

    //--------------------------------------------------------------------------

    function each(collection, callback) {
        var i = 0, limit = collection.length;

        for (; i < limit; i += 1) {
            if (callback(collection[i], i, collection) === false) {
                break;
            }
        }

        return collection;
    }

    function filter(collection, callback) {
        var value = [];

        each(collection, function(item, i, collection) {
            if (callback(item, i, collection)) {
                value.push(item);
            }
        });
        
        return value;
    }

	function all(collection, callback) {
		var value = true;

		each(collection, function(item, i, collection) {
			value = !!callback(item, i, collection);
			return value;
		});

		return value;
	}

	function some(collection, callback) {
		return !all(collection, function(item, i, collection) {
			return !callback(item, i, collection);
		});
	}

    //--------------------------------------------------------------------------

    function getElementsByClass(element, name) {
        return filter(element.getElementsByTagName("*"), function (subelement) {
            return hasClass(subelement, name);
        });
    }

    function hasClass(element, name) {
        return getClasses(element).indexOf(" " + name + " ") >= 0;
    }

    function getClasses(element) {
        return (" " + (element.className || "") + " ").replace(/\s+/g, " ");
    }

    //--------------------------------------------------------------------------

    function element(tagName, attributes) {
        var value = document.createElement(tagName), attribute;

        if (attributes) {
            setAttributes(value, attributes);
        }

        return value;
    }

    function setAttributes(element, attributes) {
        var attribute;

        for (attribute in attributes) {
            if (attributes.hasOwnProperty(attribute)) {
                element.setAttribute(attribute, attributes[attribute]);
            }
        }
    }

    //--------------------------------------------------------------------------

    my.transform = function () {
        each(transformables(body), function (element) {
			element.parentNode.replaceChild(banner(element), element);
		});
    };

	function transformables(element) {
		return filter(getElementsByClass(element, DATA_CLASS), isDataTable);
	}

    function banner(element) {
        var rows = filter(element.rows, isDataRow);

		return rows.length === 1 ? bannerStatic(rows[0]) : nivoslider(rows);
    }

	function isDataTable(element) {
		return tagName(element) === "TABLE" && some(element.rows, isDataRow);
	}

	function isDataRow(row) {
		return row.cells.length === 3 &&
			all(row.cells, function (cell) {
				return tagName(cell) === "TD";  // not TH
			}) &&
			row.cells[0].getElementsByTagName("IMG").length === 1;
	}

	function tagName(element) {
		return element.nodeName.toUpperCase();
	}

    //--------------------------------------------------------------------------

    function bannerStatic(row) {
        var value = element("DIV", {"class": "banner-static"});

        value.appendChild(bannerCaption(row));
        value.appendChild(bannerImage(row));

        return value;
    }

    function bannerCaption(row) {
        // The underscore here is correct, despite the use of hyphen above.
        var value = element("DIV", {"class": "banner_caption"});

        value.appendChild(heading(row.cells[1]));
        value.appendChild(paragraph(row.cells[2]));

        return value;
    }

    function bannerImage(row) {
        // The underscore here is correct, despite the use of hyphen above.
        var value = element("DIV", {"class": "banner_image"}),
            img = image(row.cells[0]);

        // At the time of writing this script, the image in a static banner
        // winds up with width and height attributes, while the images in a
        // nivoslider do not. I do not know if this difference is significant;
        // however, I choose to replicate exactly what I find in OU Campus. 
        setAttributes(img, {"width": "660", "height": "340"});

        value.appendChild(img);

        return value;
    }

    //--------------------------------------------------------------------------

    function nivoslider(rows) {
        var value = element("DIV", {"id": "slider-wrapper"}),
            images = element("DIV", {"id": "slider", "class": "nivoslider"});

        value.appendChild(element("DIV", {"class": "nivo-caption-arrow"}));
        value.appendChild(images);

        each(rows, function (row, i) {
            images.appendChild(nivosliderImage(row, i + 1));
            value.appendChild(nivosliderCaption(row, i + 1));
        });
        
        return value;
    }

    function nivosliderImage(row, index) {
        var value = image(row.cells[0]);

        // Images in nivoslider have one special attribute, which links the
        // image to its caption via a shared index.
        setAttributes(value, {"title": "#htmlcaption" + index});
        
        return value;
    }

    function nivosliderCaption(row, index) {
        var value = element("DIV", {
                "id": "htmlcaption" + index,  // note index shared with image
                "class": "nivo-html-caption",
                "role": "complementary"
            });

        value.appendChild(heading(row.cells[1]));
        value.appendChild(paragraph(row.cells[2]));

        return value;
    }

    //--------------------------------------------------------------------------

    function image(cell) {
        var img = cell.getElementsByTagName("IMG")[0];

        return element("IMG", {
            "src": img.getAttribute("src"),
            "alt": img.getAttribute("alt")
        });
    }

    function heading(cell) {
        var value = element("H3");

        value.innerHTML = cell.innerHTML;

        return value;
    }

    function paragraph(cell) {
        var value = element("P");

        value.innerHTML = cell.innerHTML;

        return value;
    }

    //--------------------------------------------------------------------------

    my.listener = function (element, type, callback) {
        if (element.addEventListener) {
            element.addEventListener(type, callback, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, callback);
        } // otherwise, just forget about it
    };

    //--------------------------------------------------------------------------

    return my;

}(CoSS.banr || {}, this));
