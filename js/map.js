var CoSS = this.CoSS || {};

CoSS.map = function(a, b) {
    "use strict";

    function c(a, b, c) {
        var d = a[E];
        "number" != typeof d && (d = a[E] = D.length, D.push({})), D[d][b] = c
    }

    function d(a, b) {
        var c, d = a[E];
        return "number" == typeof d && (c = D[d][b]), c
    }

    function e(a, b, c) {
        if (a.addEventListener) a.addEventListener(b, c, !1);
        else {
            if (!a.attachEvent) throw new Error("No modern error handler!");
            a.attachEvent("on" + b, c)
        }
    }

    function f(a, b) {
        return function() {
            return a.apply(b, arguments)
        }
    }

    function g(a, b, c) {
        c = c || null;
        var d, e = a.length;
        for (d = 0; e > d && b.call(c, a[d], d, a) !== !1; d += 1);
        return a
    }

    function h(a) {
        var b, c, d, e = arguments.length;
        for (d = 1; e > d; d += 1) {
            b = arguments[d];
            for (c in b) b.hasOwnProperty(c) && (a[c] = b[c])
        }
        return a
    }

    function i(a) {
        var b, c = [];
        for (b in a) a.hasOwnProperty(b) && c.push(b);
        return c
    }

    function j(a) {
        return a.replace(/\+/g, " ").replace(/%([EF][0-9A-F])%([89AB][0-9A-F])%([89AB][0-9A-F])/g, function(a, b, c, d) {
            var e, f, g = parseInt(b, 16) - 224,
                h = parseInt(c, 16) - 128;
            return 0 === g && 32 > h ? a : (e = parseInt(d, 16) - 128, f = (g << 12) + (h << 6) + e, f > 65535 ? a : String.fromCharCode(f))
        }).replace(/%([CD][0-9A-F])%([89AB][0-9A-F])/g, function(a, b, c) {
            var d, e = parseInt(b, 16) - 192;
            return 2 > e ? a : (d = parseInt(c, 16) - 128, String.fromCharCode((e << 6) + d))
        }).replace(/%([0-7][0-9A-F])/g, function(a, b) {
            return String.fromCharCode(parseInt(b, 16))
        })
    }

    function k(b) {
        b = b || a.location.search;
        var c, d, e, f = /([^=&;]+)(=([^&;]*))?/g;
        for ("?" === b.charAt(0) && (b = b.substring(1)), this.mapping = {}, c = f.exec(b); c; c = f.exec(b)) d = j(c[1]), e = c[3] ? j(c[3]) : "", this.mapping[d] || (this.mapping[d] = []), this.mapping[d].push(e)
    }

    function l(a) {
        this.width = 21, this.height = 34, this.anchorX = 10, this.anchorY = 34, this.noHoverRow = 0, this.hoverRow = 2, this.numericColumnOrigin = 0, this.alphabeticColumnOrigin = 10, this.bulletColumn = 36, this.url = "http://www.sjsu.edu/socialsciences/pics/buttons/pin_sprite_817x136.png", h(this, a || {})
    }

    function m(a) {
        arguments.length && (this.view = a, this.followers = [])
    }

    function n(a) {
        arguments.length && m.call(this, a)
    }

    function o(a, c, d) {
        n.call(this, new b.maps.InfoWindow(d)), this.gMap = a, this.gMarker = c, this.hidden = !0, this.on("closeclick")
    }

    function p(a, c, d) {
        var e = c.character || "";
        n.call(this, new b.maps.Marker(c)), this.view.setIcon(d.getIcon(e, !1)), this.gMap = a, c.hasOwnProperty("infoWindowOptions") && (this.normalIcon = this.view.getIcon(), this.hoverIcon = d.getIcon(e, !0), this.on("click").on("mouseover").on("mouseout"), this.addFollower(new o(a, this.view, c.infoWindowOptions)))
    }

    function q(a, b) {
        arguments.length && (m.call(this, a), c(a, "controller", this), this.opts = h({}, b || {}), g(a.attributes, function(a) {
            var b, c = /(.+)-(\d+)$/.exec(a.name),
                d = c ? c[1] : a.name;
            "function" == typeof this[d] && (b = "opts" + (c ? "-" + parseInt(c[2], 10) : ""), this[b] = this[b] || {}, this[d](a.value, this[b]))
        }, this))
    }

    function r(a) {
        arguments.length && (q.call(this, a), this.gMap = new b.maps.Map(a, this.getOptions()))
    }

    function s(a, b) {
        arguments.length && q.call(this, a, b)
    }

    function t(b, c, e) {
        arguments.length && (s.call(this, b, e), this.callOnOptions(function(b) {
            var e = b.mapId,
                f = e && a.document.getElementById(e),
                g = f && (d(f, "controller") || new r(f));
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
        "on" === e ? this.setProperty("selected", !0) : "off" === e && this.setProperty("selected", !1)
    }

    function w(a, b, c) {
        s.call(this, a);
        var d = this.getOptions();
        g(this.getProperty("options"), function(a) {
            this.addFollower(new v(a, b, c, d))
        }, this), this.change()
    }

    function x(b) {
        b = b || a.event;
        var c = d(b.target || b.srcElement, "controller");
        c && c[b.type] && c[b.type]()
    }

    function y() {
        g(["change", "click", "mouseout", "mouseover"], function(a) {
            e(this, a, x)
        }, a.document.body)
    }

    function z(a) {
        var b = !1;
        return a && (1 === a.nodeType && g(a.attributes, function(a) {
            return b = /^data-map-id/.test(a.name), !b
        }), b || g(a.childNodes, function(a) {
            return b = z(a), !b
        })), b
    }

    function A(b, c) {
        g(a.document.getElementsByTagName("input"), function(a) {
            return z(a) ? new u(a, b, c) : void 0
        })
    }

    function B(b, c) {
        g(a.document.getElementsByTagName("select"), function(a) {
            return z(a) ? new w(a, b, c) : void 0
        })
    }

    function C(a) {
        var b = new l(a),
            c = new k;
        y(), A(b, c), B(b, c)
    }
    var D = [],
        E = "datum-" + (new Date).getTime();
    k.prototype.getValue = function(a) {
        var b, c = this.mapping[a];
        return c && (b = c[c.length - 1]), b
    }, k.prototype.getValues = function(a) {
        var b = this.mapping[a];
        return b ? b.slice(0) : []
    }, k.prototype.getKeys = function() {
        return i(this.mapping)
    }, l.prototype.getAnchor = function() {
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
    }, m.prototype.addFollower = function(a) {
        return this.followers.push(a), this
    }, m.prototype.command = function(a, b) {
        return g(this.followers, a, b), this
    }, n.prototype = new m, n.prototype.on = function(a, c) {
        return c = c || f(this[a], this), b.maps.event.addListener(this.view, a, c), this
    }, o.prototype = new n, o.prototype.show = function() {
        return this.view.open(this.gMap, this.gMarker), this.hidden = !1, this
    }, o.prototype.hide = function() {
        return this.view.close(), this.hidden = !0, this
    }, o.prototype.toggle = function() {
        return this.hidden ? this.show() : this.hide()
    }, o.prototype.closeclick = function() {
        this.hidden = !0
    }, p.prototype = new n, p.prototype.show = function() {
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
    }, q.prototype = new m, q.prototype.getDefaults = function() {
        return {}
    }, q.prototype.getOptions = function(a) {
        return h({}, this.getDefaults(), this.opts, a && this[a] || {})
    }, q.prototype.callOnOptions = function(a, b) {
        b = b || null;
        var c = !1;
        return g(i(this), function(d) {
            /^opts-\d+$/.test(d) && (c = !0, a.call(b, this.getOptions(d)))
        }, this), c || a.call(b, this.getOptions()), this
    }, q.prototype.getProperty = function(a) {
        return this.view[a]
    }, q.prototype.setProperty = function(a, b) {
        this.view[a] = b
    }, q.prototype.hasAttribute = function(a) {
        return this.view.hasAttribute(a)
    }, q.prototype.getAttribute = function(a) {
        return this.view.getAttribute(a) || ""
    }, q.prototype.getClasses = function() {
        return (" " + this.getProperty("className") + " ").replace(/\s+/g, " ")
    }, q.prototype.setClasses = function(a) {
        this.setProperty("className", a.replace(/^\s+|\s+$/g, ""))
    }, q.prototype.hasClass = function(a) {
        return this.getClasses().indexOf(" " + a + " ") >= 0
    }, q.prototype.addClass = function(a) {
        var b = this.getClasses();
        return b.indexOf(" " + a + " ") < 0 && this.setClasses(b + a), this
    }, q.prototype.removeClass = function(a) {
        a = " " + a + " ";
        for (var b = this.getClasses(); b.indexOf(a) >= 0;) b = b.replace(a, " ");
        return this.setClasses(b), this
    };
    var F = {
        ELIZABETH_AND_10TH: new b.maps.LatLng(37.34011, -121.880618),
        SAN_SALVADOR_AND_10TH: new b.maps.LatLng(37.334568, -121.876458),
        SAN_SALVADOR_AND_4TH: new b.maps.LatLng(37.331539, -121.882812),
        SAN_FERNANDO_AND_4TH: new b.maps.LatLng(37.335849, -121.885937)
    };
    return r.prototype = new q, r.prototype.getMarkerController = function(a, b) {
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
    }, h(r.prototype, {
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
            b.maps.ControlPosition.hasOwnProperty(a) && (d = c.zoomControlOptions, d || (d = this.getDefaults().zoomControlOptions, d = d ? h({}, d) : {}, c.zoomControlOptions = d), d.position = b.maps.ControlPosition[a])
        },
        "data-zoom-control-style": function(a, c) {
            a = a.replace("-", "_").toUpperCase();
            var d;
            b.maps.ZoomControlStyle.hasOwnProperty(a) && (d = c.zoomControlOptions, d || (d = this.getDefaults().zoomControlOptions, d = d ? h({}, d) : {}, c.zoomControlOptions = d), d.style = b.maps.ZoomControlStyle[a])
        }
    }), s.prototype = new q, h(s.prototype, {
        "data-map-id": function(a, b) {
            b.mapId = a
        }
    }), t.prototype = new s, t.prototype.getOverride = function(a) {
        return a.getValue(this.getAttribute("id"))
    }, t.prototype.show = function() {
        return this.command(function(a) {
            a.show()
        })
    }, t.prototype.hide = function() {
        return this.command(function(a) {
            a.hide()
        })
    }, h(t.prototype, {
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
    }), u.prototype = new t, u.prototype.getDefaults = function() {
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
    }, v.prototype = new t, v.prototype.getDefaults = function() {
        var a = {
                character: this.getAttribute("data-character")
            },
            b = this.getProperty("text");
        return b && (a.title = b), a
    }, v.prototype.update = function() {
        return this.getProperty("selected") ? this.show() : this.hide()
    }, w.prototype = new s, w.prototype.change = function() {
        return this.command(function(a) {
            a.update()
        })
    }, {
        initialize: C
    }
}(this, google);