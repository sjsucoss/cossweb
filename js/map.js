var CoSS = this.CoSS || {};

CoSS.map = function(window, b) {
    "use strict";

    var document = window.document,
        counter = 0,
        expando = "datum-" + (new Date()).getTime(),
        cache = [],
        xcache = {};

    function setDatum(element, key, datum) {
        var index = element[expando];

        if (typeof index !== "number") {
            index = cache.length;
            element[expando] = index;
            cache.push({});
        }
        cache[index][key] = datum;
    }

    function getDatum(element, key) {
        var index = element[expando],
            datum; // === undefined

        if (typeof index === "number") {
            datum = cache[index][key];
        }
        return datum;
    }

    function addListener(element, event, listener) {
        if (element.addEventListener) {
            element.addEventListener(event, listener, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + event, listener);
        } else {
            throw new Error("No modern event handler!");
        }
    }

    /*
     * Returns a version of the function fn, which takes the same arguments but
     * uses context as the current object (the value of this).
     */
    function bind(fn, context) {
        return function() {
            return fn.apply(context, arguments);
        }
    }

    /*
     * Iterates through items in collection, invoking the function callback with
     * context as the current object (the value of this). At each step in the
     * iteration, callback is invoked on three arguments, the current item, the
     * index that retrieves that item, and collection itself. The iteration will
     * halt if the callback returns false.
     */
    function each(collection, callback, context) {
        context = context || null;

        var i = 0, limit = collection.length;

        for (; i < limit; i += 1) {
            if (callback.call(context, collection[i], i, collection) === false) {
                break;
            }
        }
        return collection;
    }

    /*
     * Takes one or more Objects as arguments. The first argument is designated
     * as target. Iterates through the second and later arguments, in increasing
     * order, inserting each argument's attribute-value pairs into target. Note
     * that attribute-value pairs in later arguments override equivalent
     * attribute-value pairs provided by earlier arguments. Returns target.
     */
    function extend(target) {
        var i = 1, limit = arguments.length, source, key;

        for (; i < limit; i += 1) {
            source = arguments[i];
            for (key in source) {
                if (source.hasOwnProperty(key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    }

    function keys(object) {
        var key, value = [];

        for (key in object) {
            if (object.hasOwnProperty(key)) {
                value.push(key);
            }
        }
        return value;
    }

    //==========================================================================
    // INTERPRETING THE QUERY STRING
    // Adapted from "Javascript Madness: Query String Parsing" by Jan Wolter
    // (July 29, 2011, http://unixpapa.com/js/querystring.html).
    //==========================================================================

    /*
     * Create a query string object based on the given query string. If no
     * string is given, we use the one from the current page by default.
     */
    function QueryString(string) {
        string = string || window.location.search;

        if (string.charAt(0) === "?") {
            string = string.substring(1);
        }

        var re = /([^=&;]+)(=([^&;]*))?/g,
            match = re.exec(string),
            key,
            value;

        this.mapping = {};

        for (; match; match = re.exec(string)) {
            key = QueryString.decode(match[1]);
            value = match[3] ? QueryString.decode(match[3]) : "";
            if (!this.mapping[key]) {
                this.mapping[key] = [];
            }
            this.mapping[key].push(value);
        }
    }

    /*
     * This static method is an error tolerant version of the builtin
     * function decodeURIComponent(), modified to also change pluses into
     * spaces, so that it is suitable for query string decoding. You
     * shouldn't usually need to call this yourself as the value(),
     * values(), and keys() methods already decode everything they return.
     */
    QueryString.decode = function (a) {
        return a.replace(/\+/g, " ").
            replace(/%([EF][0-9A-F])%([89AB][0-9A-F])%([89AB][0-9A-F])/g,
                function(code, hex1, hex2, hex3) {
                    var n1 = parseInt(hex1, 16) - 0xE0,
                        n2 = parseInt(hex2, 16) - 0x80,
                        n3;

                    if (n1 === 0 && n2 < 32) {
                        return code;
                    }
                    n3 = (n1 << 12) + (n2 << 6) + parseInt(hex3, 16) - 0x80;
                    if (n3 > 0xFFFF) {
                        return code;
                    }
                    return String.fromCharCode(n3);
                }).
            replace(/%([CD][0-9A-F])%([89AB][0-9A-F])/g,
                function(code, hex1, hex2) {
                    var n1 = parseInt(hex1, 16) - 0xC0, n2;

                    if (n1 < 2) {
                        return code;
                    }
                    n2 = parseInt(hex2, 16) - 0x80;
                    return String.fromCharCode((n1 << 6) + n2);
                }).
            replace(/%([0-7][0-9A-F])/g,
                function(code, hex) {
                    return String.fromCharCode(parseInt(hex, 16));
                });
    };

    /*
     * Return a value for the named key. If the key was not defined, it will
     * return undefined. If the key was multiply defined it will return the last
     * value set. If it was defined without a value, it will return an empty
     * string.
     */
    QueryString.prototype.value = function(key) {
        var array = this.mapping[key], value;

        if (array) {
            value = array[array.length - 1];
        }
        return value;
    };

    //--------------------------------------------------------------------------
    // These two methods are unnecessary but kept in source for completeness.
    // 
    // /*
    //  * Return an array of values for the named key. If the key was not
    //  * defined, an empty array will be returned. If the key was multiply
    //  * defined, the values will be given in the order they appeared on
    //  * in the query string.
    //  */
    // QueryString.prototype.getValues = function (key) {
    //     var array = this.mapping[key];
    // 
    //     return array ? array.slice(0) : [];
    // };
    // 
    // /*
    //  * Return an array of unique keys in the query string. The order will
    //  * not necessarily be the same as in the original query, and repeated
    //  * keys will only be listed once.
    //  */
    // QueryString.prototype.getKeys = function () {
    //     var array = [], key;
    // 
    //     for (key in this.mapping) {
    //         if (this.mapping.hasOwnProperty(key)) {
    //             array.push(this.mapping[key]);
    //         }
    //     }
    //     return array;
    // };
    //--------------------------------------------------------------------------

    //==========================================================================
    // FACADE FOR A DOM ELEMENT
    //==========================================================================

    function ElementFacade(element) {
        var key;

        if (arguments.length) {
            this.element = element;

            key = "element-" + counter;
            counter += 1;
            this.setProperty(expando, key);
            xcache[key] = this;

            each(this.element.attributes, function (attribute) {
                var match = /(.+)-(\d+)$/.exec(attribute.nodeName),
                    name = match ? match[1] : attribute.nodeName;

                if (typeof this[name] === "function") {
                    key = "opts" + (match ? "-" + parseInt(match[2]) : "");
                    this[key] = this[key] || {};
                    this[name](attribute.nodeValue, this[key]);
                }
            }, this);
        }
    }

    /*
     * Returns the ElementFacade stored in association with element, if one
     * exists; otherwise returns undefined.
     */
    function getFacade(element) {
        var key = element[expando],
            facade; // === undefined

        if (key) {
            facade = xcache[key];
        }
        return facade;
    }

    //--------------------------------------------------------------------------

    /*
     * Returns the value associated with name in the contained element.
     */
    ElementFacade.prototype.getProperty = function (name) {
        return this.element[name];
    };

    /*
     * Associates value with name as a property in the contained element.
     */
    ElementFacade.prototype.setProperty = function (name, value) {
        this.element[name] = value;
    };

    //--------------------------------------------------------------------------

    /*
     * Holds iff the contained element has an attribute called name.
     */
    ElementFacade.prototype.hasAttribute = function (name) {
        return this.element.hasAttribute(name);
    };

    /*
     * Returns the value of the attribute called name in the contained element.
     * Guaranteed to return the empty string if no such attribute is present.
     */
    ElementFacade.prototype.getAttribute = function (name) {
        return this.element.getAttribute(name) || "";
    };

    //--------------------------------------------------------------------------

    /*
     * Returns a normalized version of the className property from the contained
     * element. The returned string will begin and end with a space, and there
     * will be no instances of two consecutive spaces.
     */
    ElementFacade.prototype.getClasses = function () {
        return (" " + this.getProperty("className") + " ").replace(/\s+/g, " ");
    };

    /*
     * Sets the className property of the contained element to be a version of
     * classes from which leading and trailing spaces have been removed.
     */
    ElementFacade.prototype.setClasses = function (classes) {
        this.setProperty("className", classes.replace(/^\s+|\s+$/g, ""));
    };

    /*
     * Holds iff the className property in the contained element has in it a
     * class of the form name.
     */
    ElementFacade.prototype.hasClass = function (name) {
        return this.getClasses().indexOf(" " + name + " ") >= 0;
    };

    ElementFacade.prototype.addClass = function (name) {
        var classes = this.getClasses();

        if (classes.indexOf(" " + name + " ") < 0) {
            this.setClasses(classes + name);
        }
        return this;
    };

    ElementFacade.prototype.removeClass = function (name) {
        name = " " + name + " ";

        var classes = this.getClasses();

        while (classes.indexOf(name) >= 0) {
            classes = classes.replace(name, " ");
        }
        this.setClasses(classes);
        return this;
    };

    //--------------------------------------------------------------------------

    ElementFacade.prototype.getDefaults = function () { return {}; };

    ElementFacade.prototype.getOptions = function (key) {
        return extend(this.getDefaults(), this[key || "opts"] || {});
    };

    ElementFacade.prototype.eachOptionsSet = function (callback, context) {
        context = context || null;

        var key;

        for (key in this) {
            if (this.hasOwnProperty(key) && /^opts(?:-\d+)?$/.test(key) &&
                    callback.call(context, this.getOptions(key)) === false) {
                break;
            }
        }
    };

    //==========================================================================

    /**
     * Creates a facade that abstracts a DOM Element implementing a control.
     */
    function ControlFacade(element) {
        if (arguments.length) {
            ElementFacade.call(this, element);
            this.children = [];
        }
    }

    ControlFacade.prototype = new ElementFacade();

    ControlFacade.prototype.getMapFacade = function () {
        var element = document.getElementById(this.getAttribute("data-map")),
            value; // === undefined

        if (element) {
            value = getFacade(element) || new MapFacade(element);
        }
        return value;
    };

    ControlFacade.prototype.addChild = function (child) {
        this.children.push(child);
        return this;
    };

    ControlFacade.prototype.eachChild = function (callback, context) {
        each(this.children, callback, context);
        return this;
    };

    //--------------------------------------------------------------------------

    function l(a) {
        this.width = 21, this.height = 34, this.anchorX = 10, this.anchorY = 34, this.noHoverRow = 0, this.hoverRow = 2, this.numericColumnOrigin = 0, this.alphabeticColumnOrigin = 10, this.bulletColumn = 36, this.url = "http://www.sjsu.edu/socialsciences/pics/buttons/pin_sprite_817x136.png", extend(this, a || {})
    }

    function m(element) {
        if (arguments.length) {
            this.view = element;
            this.followers = [];
        }
    }

    m.prototype.addFollower = function(a) {
        this.followers.push(a);
        return this;
    };

    m.prototype.command = function(a, b) {
        each(this.followers, a, b);
        return this;
   };

    function n(a) {
        arguments.length && m.call(this, a)
    }

    n.prototype = new m();

    n.prototype.on = function(a, c) {
        return c = c || bind(this[a], this), b.maps.event.addListener(this.view, a, c), this
    };

    function o(a, c, d) {
        n.call(this, new b.maps.InfoWindow(d)), this.gMap = a, this.gMarker = c, this.hidden = true, this.on("closeclick")
    }

    function p(a, c, d) {
        var e = c.character || "";
        n.call(this, new b.maps.Marker(c)), this.view.setIcon(d.getIcon(e, false)), this.gMap = a, c.hasOwnProperty("infoWindowOptions") && (this.normalIcon = this.view.getIcon(), this.hoverIcon = d.getIcon(e, true), this.on("click").on("mouseover").on("mouseout"), this.addFollower(new o(a, this.view, c.infoWindowOptions)))
    }

    function Control(element, options) {
        if (arguments.length) {
            m.call(this, element);
            setDatum(element, "controller", this)
            this.opts = extend({}, options || {});
            each(element.attributes, function(attribute) {
                var match = /(.+)-(\d+)$/.exec(attribute.name),
                    name = match ? match[1] : attribute.name,
                    key;
                if (typeof this[name] === "function") {
                    key = "opts" + (match ? "-" + parseInt(match[2], 10) : "");
                    this[key] = this[key] || {};
                    this[name](attribute.value, this[key]);
                }
            }, this)
        }
    }

    Control.prototype = new m();

    Control.prototype.getDefaults = function() {
        return {}
    };

    Control.prototype.getOptions = function(a) {
        return extend({}, this.getDefaults(), this.opts, a && this[a] || {})
    };

    Control.prototype.callOnOptions = function(a, b) {
        b = b || null;
        var c = false;
        return each(keys(this), function(d) {
            /^opts-\d+$/.test(d) && (c = true, a.call(b, this.getOptions(d)))
        }, this), c || a.call(b, this.getOptions()), this
    };

    Control.prototype.getProperty = function(a) {
        return this.view[a]
    };

    Control.prototype.setProperty = function(a, b) {
        this.view[a] = b
    };

    Control.prototype.hasAttribute = function(a) {
        return this.view.hasAttribute(a)
    };

    Control.prototype.getAttribute = function(a) {
        return this.view.getAttribute(a) || ""
    };

    //--------------------------------------------------------------------------

    Control.prototype.getClasses = function() {
        return (" " + this.getProperty("className") + " ").replace(/\s+/g, " ");
    };

    Control.prototype.setClasses = function(classes) {
        this.setProperty("className", classes.replace(/^\s+|\s+$/g, ""));
    };

    Control.prototype.hasClass = function(name) {
        return this.getClasses().indexOf(" " + name + " ") >= 0;
    };

    Control.prototype.addClass = function(a) {
        var b = this.getClasses();

        return b.indexOf(" " + a + " ") < 0 && this.setClasses(b + a), this
    };

    Control.prototype.removeClass = function(a) {
        a = " " + a + " ";

        for (var b = this.getClasses(); b.indexOf(a) >= 0;) b = b.replace(a, " ");
        return this.setClasses(b), this
    };

    function r(a) {
        arguments.length && (Control.call(this, a), this.gMap = new b.maps.Map(a, this.getOptions()))
    }

    function s(a, b) {
        arguments.length && Control.call(this, a, b)
    }

    function t(b, c, e) {
        arguments.length && (s.call(this, b, e), this.callOnOptions(function(b) {
            var e = b.mapId,
                f = e && window.document.getElementById(e),
                g = f && (getDatum(f, "controller") || new r(f));
            g && g.getMarkerController && this.addFollower(g.getMarkerController(b, c))
        }, this))
    }

    function u(a, b, c) {
        t.call(this, a, b);
        var d = this.getOverride(c);
        "on" === d ? this.turnOn() : "off" === d ? this.turnOff() : this.hasClass("on") && this.show()
    }

    function v(a, b, c, d) {
        t.call(this, a, b, d);
        var e = this.getOverride(c);
        "on" === e ? this.setProperty("selected", true) : "off" === e && this.setProperty("selected", false)
    }

    function w(a, b, c) {
        s.call(this, a);
        var d = this.getOptions();
        each(this.getProperty("options"), function(a) {
            this.addFollower(new v(a, b, c, d))
        }, this), this.change()
    }

    function x(b) {
        b = b || window.event;
        var c = getDatum(b.target || b.srcElement, "controller");
        c && c[b.type] && c[b.type]()
    }

    function y() {
        each(["change", "click", "mouseout", "mouseover"], function(a) {
            addListener(this, a, x)
        }, window.document.body)
    }

    function z(a) {
        var b = false;
        return a && (1 === a.nodeType && each(a.attributes, function(a) {
            return b = /^data-map-id/.test(a.name), !b
        }), b || each(a.childNodes, function(a) {
            return b = z(a), !b
        })), b
    }

    function A(b, c) {
        each(window.document.getElementsByTagName("input"), function(a) {
            return z(a) ? new u(a, b, c) : void 0
        })
    }

    function B(b, c) {
        each(window.document.getElementsByTagName("select"), function(a) {
            return z(a) ? new w(a, b, c) : void 0
        })
    }

    function C(a) {
        var b = new l(a),
            c = new QueryString();
        y(), A(b, c), B(b, c)
    }
    l.prototype.getAnchor = function() {
        return new b.maps.Point(this.anchorX, this.anchorY)
    }, l.prototype.getLeftX = function(a) {
        var b, c = this.bulletColumn;
        if (a) {
            if (/^[0-9]$/.test(a)) c = this.numericColumnOrigin, b = "0";
            else if (c = this.alphabeticColumnOrigin, /^[a-z]$/.test(a)) b = "a";
            else {
                if (!/^[A-Z]$/.test(a)) throw new Error('Bad character: "' + a + '"');
                b = "A"
            }
            c += a.charCodeAt(0) - b.charCodeAt(0)
        }
        return this.width * c
    }, l.prototype.getTopY = function(a) {
        return this.height * (a ? this.hoverRow : this.noHoverRow)
    }, l.prototype.getOrigin = function(a, c) {
        return new b.maps.Point(this.getLeftX(a), this.getTopY(c))
    }, l.prototype.getSize = function() {
        return new b.maps.Size(this.width, this.height)
    }, l.prototype.getIcon = function(a, b) {
        return {
            anchor: this.getAnchor(),
            origin: this.getOrigin(a, b),
            size: this.getSize(),
            url: this.url
        }
    }, o.prototype = new n(), o.prototype.show = function() {
        return this.view.open(this.gMap, this.gMarker), this.hidden = false, this
    }, o.prototype.hide = function() {
        return this.view.close(), this.hidden = true, this
    }, o.prototype.toggle = function() {
        return this.hidden ? this.show() : this.hide()
    }, o.prototype.closeclick = function() {
        this.hidden = true
    }, p.prototype = new n(), p.prototype.show = function() {
        return this.view.setMap(this.gMap), this
    }, p.prototype.hide = function() {
        return this.command(function(a) {
            a.hide()
        }), this.view.setMap(null), this
    }, p.prototype.click = function() {
        this.command(function(a) {
            a.toggle()
        })
    }, p.prototype.mouseover = function() {
        this.view.setIcon(this.hoverIcon)
    }, p.prototype.mouseout = function() {
        this.view.setIcon(this.normalIcon)
    };
    var F = {
        ELIZABETH_AND_10TH: new b.maps.LatLng(37.34011, -121.880618),
        SAN_SALVADOR_AND_10TH: new b.maps.LatLng(37.334568, -121.876458),
        SAN_SALVADOR_AND_4TH: new b.maps.LatLng(37.331539, -121.882812),
        SAN_FERNANDO_AND_4TH: new b.maps.LatLng(37.335849, -121.885937)
    };
    return r.prototype = new Control(), r.prototype.getMarkerController = function(a, b) {
        return new p(this.gMap, a, b)
    }, r.prototype.getDefaults = function() {
        return {
            backgroundColor: "#e1dad0",
            center: (new b.maps.LatLngBounds).extend(F.ELIZABETH_AND_10TH).extend(F.SAN_SALVADOR_AND_10TH).extend(F.SAN_SALVADOR_AND_4TH).extend(F.SAN_FERNANDO_AND_4TH).getCenter(),
            mapTypeId: b.maps.MapTypeId.ROADMAP,
            zoom: 16,
            zoomControlOptions: {
                position: b.maps.ControlPosition.RIGHT_TOP,
                style: b.maps.ZoomControlStyle.SMALL
            }
        }
    }, extend(r.prototype, {
        "data-background-color": function(a, b) {
            /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(a) && (b.backgroundColor = a)
        },
        "data-latitude": function(a, c) {
            var d;
            /^[\-+]?\d*\.?\d+$/.test(a) && (d = c.center || this.getDefaults().center, c.center = new b.maps.LatLng(parseFloat(a), d ? d.lng() : 0))
        },
        "data-longitude": function(a, c) {
            var d;
            /^[\-+]?\d*\.?\d+$/.test(a) && (d = c.center || this.getDefaults().center, c.center = new b.maps.LatLng(d ? d.lat() : 0, parseFloat(a)))
        },
        "data-map-type": function(a, c) {
            a = a.replace("-", "_").toUpperCase(), b.maps.MapTypeId.hasOwnProperty(a) && (c.mapTypeId = b.maps.MapTypeId[a])
        },
        "data-zoom": function(a, b) {
            /^1?\d$/.test(a) && (b.zoom = parseInt(a, 10))
        },
        "data-zoom-control-position": function(a, c) {
            a = a.replace("-", "_").toUpperCase();
            var d;
            b.maps.ControlPosition.hasOwnProperty(a) && (d = c.zoomControlOptions, d || (d = this.getDefaults().zoomControlOptions, d = d ? extend({}, d) : {}, c.zoomControlOptions = d), d.position = b.maps.ControlPosition[a])
        },
        "data-zoom-control-style": function(a, c) {
            a = a.replace("-", "_").toUpperCase();
            var d;
            b.maps.ZoomControlStyle.hasOwnProperty(a) && (d = c.zoomControlOptions, d || (d = this.getDefaults().zoomControlOptions, d = d ? extend({}, d) : {}, c.zoomControlOptions = d), d.style = b.maps.ZoomControlStyle[a])
        }
    }), s.prototype = new Control(), extend(s.prototype, {
        "data-map-id": function(a, b) {
            b.mapId = a
        }
    }), t.prototype = new s(), t.prototype.getOverride = function(a) {
        return a.value(this.getAttribute("id"))
    }, t.prototype.show = function() {
        return this.command(function(a) {
            a.show()
        })
    }, t.prototype.hide = function() {
        return this.command(function(a) {
            a.hide()
        })
    }, extend(t.prototype, {
        "data-content": function(a, b) {
            b.infoWindowOptions = b.infoWindowOptions || {}, b.infoWindowOptions.content = "<p class='infoWindow'>" + a + "</p>"
        },
        "data-latitude": function(a, c) {
            var d, e;
            /^[\-+]?\d*\.?\d+$/.test(a) && (d = parseFloat(a), e = 0, c.hasOwnProperty("position") && (e = c.position.lng()), c.position = new b.maps.LatLng(d, e))
        },
        "data-longitude": function(a, c) {
            var d, e;
            /^[\-+]?\d*\.?\d+$/.test(a) && (d = 0, e = parseFloat(a), c.hasOwnProperty("position") && (d = c.position.lat()), c.position = new b.maps.LatLng(d, e))
        },
        "data-title": function(a, b) {
            b.title = a
        }
    }), u.prototype = new t(), u.prototype.getDefaults = function() {
        var a = / pin(?:-([0-9a-zA-Z]))? /.exec(this.getClasses()),
            b = {
                character: a && a[1] || ""
            },
            c = this.getAttribute("alt");
        return c && (b.title = c), b
    }, u.prototype.mouseover = function() {
        return this.addClass("hover")
    }, u.prototype.mouseout = function() {
        return this.removeClass("hover")
    }, u.prototype.turnOn = function() {
        return this.addClass("on").show()
    }, u.prototype.turnOff = function() {
        return this.removeClass("on").hide()
    }, u.prototype.click = function() {
        this.hasClass("on") ? this.turnOff() : this.turnOn()
    }, v.prototype = new t(), v.prototype.getDefaults = function() {
        var a = {
                character: this.getAttribute("data-character")
            },
            b = this.getProperty("text");
        return b && (a.title = b), a
    }, v.prototype.update = function() {
        return this.getProperty("selected") ? this.show() : this.hide()
    }, w.prototype = new s(), w.prototype.change = function() {
        return this.command(function(a) {
            a.update()
        })
    }, {
        initialize: C
    }
}(this, google);