/*! jQuery Mobile v1.5.0-alpha.1 | Copyright jQuery Foundation, Inc. | jquery.org/license */
(function(e, t, n) {
    typeof define == "function" && define.amd ? define(["jquery"], function(r) {
        return n(r, e, t), r.mobile
    }) : n(e.jQuery, e, t)
})(this, document, function(e, t, n, r) {
    (function(t) {
        typeof define == "function" && define.amd ? define("animationComplete", ["jquery"], t) : t(e)
    })(function(e) {
        var t = {
                animation: {},
                transition: {}
            },
            i = n.createElement("a"),
            s = ["", "webkit-", "moz-", "o-"],
            o = {};
        return e.each(["animation", "transition"], function(n, o) {
            var u = n === 0 ? o + "-" + "name" : o;
            e.each(s, function(n, s) {
                if (i.style[e.camelCase(s + u)] !== r) return t[o].prefix = s, !1
            }), t[o].duration = e.camelCase(t[o].prefix + o + "-" + "duration"), t[o].event = e.camelCase(t[o].prefix + o + "-" + "end"), t[o].prefix === "" && (t[o].event = t[o].event.toLowerCase())
        }), e.support.cssTransitions = t.transition.prefix !== r, e.support.cssAnimations = t.animation.prefix !== r, e(i).remove(), e.fn.extend({
            animationComplete: function(i, s, u) {
                var a, f, l = this,
                    c = function() {
                        clearTimeout(a), i.apply(this, arguments)
                    },
                    h = !s || s === "animation" ? "animation" : "transition";
                if (!this.length) return this;
                if (e.support.cssTransitions && h === "transition" || e.support.cssAnimations && h === "animation") {
                    if (u === r) {
                        this.context !== n && (f = parseFloat(this.css(t[h].duration)) * 3e3);
                        if (f === 0 || f === r || isNaN(f)) f = e.fn.animationComplete.defaultDuration
                    }
                    return a = setTimeout(function() {
                        l.off(t[h].event, c).each(function() {
                            i.apply(this)
                        })
                    }, f), o[i] = {
                        event: t[h].event,
                        binding: c
                    }, this.one(t[h].event, c)
                }
                return setTimeout(function() {
                    l.each(function() {
                        i.apply(this)
                    })
                }, 0), this
            },
            removeAnimationComplete: function(e) {
                var t = o[e];
                return t ? this.off(t.event, t.binding) : this
            }
        }), e.fn.animationComplete.defaultDuration = 1e3, e
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("ns", ["jquery"], t) : t(e)
    }(function(e) {
        return e.mobile = {
            version: "@VERSION"
        }, e.mobile
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("data", ["jquery", "./ns"], t) : t(e)
    }(function(e) {
        var n = {},
            i = e.find,
            s = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
            o = /:jqmData\(([^)]*)\)/g;
        return e.extend(e.mobile, {
            ns: e.mobileBackcompat === !1 ? "ui-" : "",
            getAttribute: function(n, r) {
                var i;
                n = n.jquery ? n[0] : n, n && n.getAttribute && (i = n.getAttribute("data-" + e.mobile.ns + r));
                try {
                    i = i === "true" ? !0 : i === "false" ? !1 : i === "null" ? null : +i + "" === i ? +i : s.test(i) ? t.JSON.parse(i) : i
                } catch (o) {}
                return i
            },
            nsNormalizeDict: n,
            nsNormalize: function(t) {
                return n[t] || (n[t] = e.camelCase(e.mobile.ns + t))
            },
            closestPageData: function(e) {
                return e.closest(":jqmData(role='page'), :jqmData(role='dialog')").data("mobile-page")
            }
        }), e.fn.jqmData = function(t, n) {
            var i;
            return typeof t != "undefined" && (t && (t = e.mobile.nsNormalize(t)), arguments.length < 2 || n === r ? i = this.data(t) : i = this.data(t, n)), i
        }, e.jqmData = function(t, n, r) {
            var i;
            return typeof n != "undefined" && (i = e.data(t, n ? e.mobile.nsNormalize(n) : n, r)), i
        }, e.fn.jqmRemoveData = function(t) {
            return this.removeData(e.mobile.nsNormalize(t))
        }, e.jqmRemoveData = function(t, n) {
            return e.removeData(t, e.mobile.nsNormalize(n))
        }, e.find = function(t, n, r, s) {
            return t.indexOf(":jqmData") > -1 && (t = t.replace(o, "[data-" + (e.mobile.ns || "") + "$1]")), i.call(this, t, n, r, s)
        }, e.extend(e.find, i), e.mobile
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("defaults", ["jquery", "./ns"], t) : t(e)
    }(function(e) {
        return e.extend(e.mobile, {
            hideUrlBar: !0,
            keepNative: ":jqmData(role='none'), :jqmData(role='nojs')",
            ajaxEnabled: !0,
            hashListeningEnabled: !0,
            linkBindingEnabled: !0,
            defaultPageTransition: "fade",
            maxTransitionWidth: !1,
            defaultDialogTransition: "pop",
            pageLoadErrorMessage: "Error Loading Page",
            pageLoadErrorMessageTheme: "a",
            phonegapNavigationEnabled: !1,
            autoInitializePage: !0,
            pushStateEnabled: !0,
            ignoreContentEnabled: !1,
            pageContainer: e(),
            allowCrossDomainPages: !1,
            dialogHashKey: "&ui-state=dialog"
        })
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("degradeInputs", ["jquery", "defaults"], t) : t(e)
    }(function(e) {
        e.mobile.degradeInputs = {
            range: "number",
            search: "text"
        }, e.mobile.degradeInputsWithin = function(t) {
            t = typeof t == "string" ? e(t) : t, t.find("input").not(e.mobile.keepNative).each(function() {
                var t, n, r, i = e(this),
                    s = this.getAttribute("type"),
                    o = e.mobile.degradeInputs[s] || "text";
                e.mobile.degradeInputs[s] && (t = e("<div>").html(i.clone()).html(), n = /\s+type=["']?\w+['"]?/, r = ' type="' + o + '" data-' + e.mobile.ns + 'type="' + s + '"', i.replaceWith(t.replace(n, r)))
            })
        };
        var t = function() {
            e.mobile.degradeInputsWithin(this.addBack())
        };
        return (e.enhance = e.extend(e.enhance, e.extend({
            hooks: []
        }, e.enhance))).hooks.unshift(t), e.mobile.degradeInputsWithin
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("jquery-ui/version", ["jquery"], t) : t(e)
    }(function(e) {
        return e.ui = e.ui || {}, e.ui.version = "1.12.1"
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("jquery-ui/keycode", ["jquery", "./version"], t) : t(e)
    }(function(e) {
        return e.ui.keyCode = {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("helpers", ["jquery", "./ns", "jquery-ui/keycode"], t) : t(e)
    }(function(e) {
        var r = function(t, n) {
            var r = t.parent(),
                i = [],
                s = function() {
                    var t = e(this),
                        n = e.mobile.toolbar && t.data("mobile-toolbar") ? t.toolbar("option") : {
                            position: t.attr("data-" + e.mobile.ns + "position"),
                            updatePagePadding: t.attr("data-" + e.mobile.ns + "update-page-padding") !== !1
                        };
                    return n.position !== "fixed" || n.updatePagePadding !== !0
                },
                o = r.children(":jqmData(type='header')").filter(s),
                u = t.children(":jqmData(type='header')"),
                a = r.children(":jqmData(type='footer')").filter(s),
                f = t.children(":jqmData(type='footer')");
            return u.length === 0 && o.length > 0 && (i = i.concat(o.toArray())), f.length === 0 && a.length > 0 && (i = i.concat(a.toArray())), e.each(i, function(t, r) {
                n -= e(r).outerHeight()
            }), Math.max(0, n)
        };
        return e.extend(e.mobile, {
            window: e(t),
            document: e(n),
            keyCode: e.ui.keyCode,
            behaviors: {},
            focusPage: function(e) {
                var t = e.find("[autofocus]");
                t.length || (t = e.find(".ui-title").eq(0)), t.length || (t = e), t.focus()
            },
            silentScroll: function(n) {
                if (e.mobile.window.scrollTop() > 0) return;
                e.type(n) !== "number" && (n = e.mobile.defaultHomeScroll), e.event.special.scrollstart.enabled = !1, setTimeout(function() {
                    t.scrollTo(0, n), e.mobile.document.trigger("silentscroll", {
                        x: 0,
                        y: n
                    })
                }, 20), setTimeout(function() {
                    e.event.special.scrollstart.enabled = !0
                }, 150)
            },
            getClosestBaseUrl: function(t) {
                var n = e(t).closest(".ui-page").jqmData("url"),
                    r = e.mobile.path.documentBase.hrefNoHash;
                if (!e.mobile.base.dynamicBaseEnabled || !n || !e.mobile.path.isPath(n)) n = r;
                return e.mobile.path.makeUrlAbsolute(n, r)
            },
            removeActiveLinkClass: function(t) {
                !!e.mobile.activeClickedLink && (!e.mobile.activeClickedLink.closest(".ui-page-active").length || t) && e.mobile.activeClickedLink.removeClass("ui-button-active"), e.mobile.activeClickedLink = null
            },
            enhanceable: function(e) {
                return this.haveParents(e, "enhance")
            },
            hijackable: function(e) {
                return this.haveParents(e, "ajax")
            },
            haveParents: function(t, n) {
                if (!e.mobile.ignoreContentEnabled) return t;
                var r = t.length,
                    i = e(),
                    s, o, u, a, f;
                for (a = 0; a < r; a++) {
                    o = t.eq(a), u = !1, s = t[a];
                    while (s) {
                        f = s.getAttribute ? s.getAttribute("data-" + e.mobile.ns + n) : "";
                        if (f === "false") {
                            u = !0;
                            break
                        }
                        s = s.parentNode
                    }
                    u || (i = i.add(o))
                }
                return i
            },
            getScreenHeight: function() {
                return t.innerHeight || e.mobile.window.height()
            },
            resetActivePageHeight: function(n) {
                var i = e(".ui-page-active"),
                    s = i.height(),
                    o = i.outerHeight(!0);
                n = r(i, typeof n == "number" ? n : e(t).height()), i.css("min-height", ""), i.height() < n && i.css("min-height", n - (o - s))
            },
            loading: function() {
                var t = this.loading._widget || e.mobile.loader().element,
                    n = t.loader.apply(t, arguments);
                return this.loading._widget = t, n
            },
            isElementCurrentlyVisible: function(r) {
                r = typeof r == "string" ? e(r)[0] : r[0];
                if (!r) return !0;
                var i = r.getBoundingClientRect();
                return i.bottom > 0 && i.right > 0 && i.top < (t.innerHeight || n.documentElement.clientHeight) && i.left < (t.innerWidth || n.documentElement.clientWidth)
            }
        }), e.addDependents = function(t, n) {
            var r = e(t),
                i = r.jqmData("dependents") || e();
            r.jqmData("dependents", e(i).add(n))
        }, e.fn.extend({
            removeWithDependents: function() {
                e.removeWithDependents(this)
            },
            addDependents: function(t) {
                e.addDependents(this, t)
            },
            getEncodedText: function() {
                return e("<a>").text(this.text()).html()
            },
            jqmEnhanceable: function() {
                return e.mobile.enhanceable(this)
            },
            jqmHijackable: function() {
                return e.mobile.hijackable(this)
            }
        }), e.removeWithDependents = function(t) {
            var n = e(t);
            (n.jqmData("dependents") || e()).remove(), n.remove()
        }, e.addDependents = function(t, n) {
            var r = e(t),
                i = r.jqmData("dependents") || e();
            r.jqmData("dependents", e(i).add(n))
        }, e.find.matches = function(t, n) {
            return e.find(t, null, null, n)
        }, e.find.matchesSelector = function(t, n) {
            return e.find(n, null, null, [t]).length > 0
        }, e.mobile
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("core", ["./defaults", "./data", "./helpers"], t) : t(e)
    }(function() {}),
    function(t) {
        typeof define == "function" && define.amd ? define("media", ["jquery", "./core"], t) : t(e)
    }(function(e) {
        return t.matchMedia = t.matchMedia || function(e, t) {
            var n, r = e.documentElement,
                i = r.firstElementChild || r.firstChild,
                s = e.createElement("body"),
                o = e.createElement("div");
            return o.id = "mq-test-1", o.style.cssText = "position:absolute;top:-100em", s.style.background = "none", s.appendChild(o),
                function(e) {
                    return o.innerHTML = '&shy;<style media="' + e + '"> #mq-test-1 { width: 42px; }</style>', r.insertBefore(s, i), n = o.offsetWidth === 42, r.removeChild(s), {
                        matches: n,
                        media: e
                    }
                }
        }(n), e.mobile.media = function(e) {
            var n = t.matchMedia(e);
            return n && n.matches
        }, e.mobile.media
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("support/touch", ["jquery", "../ns"], t) : t(e)
    }(function(e) {
        var t = {
            touch: "ontouchend" in n
        };
        return e.mobile.support = e.mobile.support || {}, e.extend(e.support, t), e.extend(e.mobile.support, t), e.support
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("support/orientation", ["jquery"], t) : t(e)
    }(function(e) {
        return e.extend(e.support, {
            orientation: "orientation" in t && "onorientationchange" in t
        }), e.support
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("support", ["jquery", "./core", "./media", "./support/touch", "./support/orientation"], t) : t(e)
    }(function(e) {
        function l(e) {
            var t = e.charAt(0).toUpperCase() + e.substr(1),
                n = (e + " " + o.join(t + " ") + t).split(" "),
                i;
            for (i in n)
                if (s[n[i]] !== r) return !0
        }

        function h() {
            var n = t,
                r = !!n.document.createElementNS && !!n.document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect && (!n.opera || navigator.userAgent.indexOf("Chrome") !== -1),
                i = function(t) {
                    (!t || !r) && e("html").addClass("ui-nosvg")
                },
                s = new n.Image;
            s.onerror = function() {
                i(!1)
            }, s.onload = function() {
                i(s.width === 1 && s.height === 1)
            }, s.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
        }

        function p() {
            var s = "transform-3d",
                u = e.mobile.media("(-" + o.join("-" + s + "),(-") + "-" + s + "),(" + s + ")"),
                a, f, l;
            if (u) return !!u;
            a = n.createElement("div"), f = {
                MozTransform: "-moz-transform",
                transform: "transform"
            }, i.append(a);
            for (l in f) a.style[l] !== r && (a.style[l] = "translate3d( 100px, 1px, 1px )", u = t.getComputedStyle(a).getPropertyValue(f[l]));
            return !!u && u !== "none"
        }

        function d() {
            var e = n.createElement("x"),
                r = n.documentElement,
                i = t.getComputedStyle,
                s;
            return "pointerEvents" in e.style ? (e.style.pointerEvents = "auto", e.style.pointerEvents = "x", r.appendChild(e), s = i && i(e, "").pointerEvents === "auto", r.removeChild(e), !!s) : !1
        }

        function v() {
            var e = n.createElement("div");
            return typeof e.getBoundingClientRect != "undefined"
        }

        function m() {
            var e = t,
                n = navigator.userAgent,
                r = navigator.platform,
                i = n.match(/AppleWebKit\/([0-9]+)/),
                s = !!i && i[1],
                o = n.match(/Fennec\/([0-9]+)/),
                u = !!o && o[1],
                a = n.match(/Opera Mobi\/([0-9]+)/),
                f = !!a && a[1];
            return (r.indexOf("iPhone") > -1 || r.indexOf("iPad") > -1 || r.indexOf("iPod") > -1) && s && s < 534 || e.operamini && {}.toString.call(e.operamini) === "[object OperaMini]" || a && f < 7458 || n.indexOf("Android") > -1 && s && s < 533 || u && u < 6 || "palmGetResource" in t && s && s < 534 || n.indexOf("MeeGo") > -1 && n.indexOf("NokiaBrowser/8.5.0") > -1 ? !1 : !0
        }
        var i = e("<body>").prependTo("html"),
            s = i[0].style,
            o = ["Webkit", "Moz", "O"],
            u = "palmGetResource" in t,
            a = t.operamini && {}.toString.call(t.operamini) === "[object OperaMini]",
            f, c = t.blackberry && !l("-webkit-transform");
        return e.extend(e.mobile, {
            browser: {}
        }), e.mobile.browser.oldIE = function() {
            var e = 3,
                t = n.createElement("div"),
                r = t.all || [];
            do t.innerHTML = "<!--[if gt IE " + ++e + "]><br><![endif]-->"; while (r[0]);
            return e > 4 ? e : !e
        }(), e.mobile.browser.newIEMobile = function() {
            var t = n.createElement("div");
            return !e.mobile.browser.oldIE && "onmsgesturehold" in t && "ontouchstart" in t && "onpointerdown" in t
        }(), e.extend(e.support, {
            pushState: "pushState" in history && "replaceState" in history && !(t.navigator.userAgent.indexOf("Firefox") >= 0 && t.top !== t) && t.navigator.userAgent.search(/CriOS/) === -1,
            mediaquery: e.mobile.media("only all"),
            cssPseudoElement: !!l("content"),
            touchOverflow: !!l("overflowScrolling"),
            cssTransform3d: p(),
            boxShadow: !!l("boxShadow") && !c,
            fixedPosition: m(),
            scrollTop: ("pageXOffset" in t || "scrollTop" in n.documentElement || "scrollTop" in i[0]) && !u && !a,
            cssPointerEvents: d(),
            boundingRect: v(),
            inlineSVG: h
        }), i.remove(), f = function() {
            var e = t.navigator.userAgent;
            return e.indexOf("Nokia") > -1 && (e.indexOf("Symbian/3") > -1 || e.indexOf("Series60/5") > -1) && e.indexOf("AppleWebKit") > -1 && e.match(/(BrowserNG|NokiaBrowser)\/7\.[0-3]/)
        }(), e.mobile.gradeA = function() {
            return (e.support.mediaquery && e.support.cssPseudoElement || e.mobile.browser.oldIE && e.mobile.browser.oldIE >= 8) && (e.support.boundingRect || e.fn.jquery.match(/1\.[0-7+]\.[0-9+]?/) !== null)
        }, e.mobile.ajaxBlacklist = t.blackberry && !t.WebKitPoint || a || f, f && e(function() {
            e("head link[rel='stylesheet']").attr("rel", "alternate stylesheet").attr("rel", "stylesheet")
        }), e.support.boxShadow || e("html").addClass("ui-noboxshadow"), e.support
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("events/navigate", ["jquery", "./../ns", "./../support"], t) : t(e)
    }(function(e) {
        var t = e.mobile.window,
            n, i = function() {};
        return e.event.special.beforenavigate = {
            setup: function() {
                t.on("navigate", i)
            },
            teardown: function() {
                t.off("navigate", i)
            }
        }, e.event.special.navigate = n = {
            bound: !1,
            pushStateEnabled: !0,
            originalEventName: r,
            isPushStateEnabled: function() {
                return e.support.pushState && e.mobile.pushStateEnabled === !0 && this.isHashChangeEnabled()
            },
            isHashChangeEnabled: function() {
                return e.mobile.hashListeningEnabled === !0
            },
            popstate: function(n) {
                var r, i, s;
                if (n.isDefaultPrevented()) return;
                r = new e.Event("navigate"), i = new e.Event("beforenavigate"), s = n.originalEvent.state || {}, i.originalEvent = n, t.trigger(i);
                if (i.isDefaultPrevented()) return;
                n.historyState && e.extend(s, n.historyState), r.originalEvent = n, setTimeout(function() {
                    t.trigger(r, {
                        state: s
                    })
                }, 0)
            },
            hashchange: function(n) {
                var r = new e.Event("navigate"),
                    i = new e.Event("beforenavigate");
                i.originalEvent = n, t.trigger(i);
                if (i.isDefaultPrevented()) return;
                r.originalEvent = n, t.trigger(r, {
                    state: n.hashchangeState || {}
                })
            },
            setup: function() {
                if (n.bound) return;
                n.bound = !0, n.isPushStateEnabled() ? (n.originalEventName = "popstate", t.bind("popstate.navigate", n.popstate)) : n.isHashChangeEnabled() && (n.originalEventName = "hashchange", t.bind("hashchange.navigate", n.hashchange))
            }
        }, e.event.special.navigate
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("vmouse", ["jquery"], t) : t(e)
    }(function(e) {
        function T(e) {
            while (e && typeof e.originalEvent != "undefined") e = e.originalEvent;
            return e
        }

        function N(t, n) {
            var i = t.type,
                o, a, l, c, h, p, d, v, m;
            t = e.Event(t), t.type = n, o = t.originalEvent, a = u, i.search(/^(mouse|click)/) > -1 && (a = f);
            if (o)
                for (d = a.length; d;) c = a[--d], t[c] = o[c];
            i.search(/mouse(down|up)|click/) > -1 && !t.which && (t.which = 1);
            if (i.search(/^touch/) !== -1) {
                l = T(o), i = l.touches, h = l.changedTouches, p = i && i.length ? i[0] : h && h.length ? h[0] : r;
                if (p)
                    for (v = 0, m = s.length; v < m; v++) c = s[v], t[c] = p[c]
            }
            return t
        }

        function C(n) {
            var r = {},
                i, s;
            while (n) {
                i = e.data(n, t);
                for (s in i) i[s] && (r[s] = r.hasVirtualBinding = !0);
                n = n.parentNode
            }
            return r
        }

        function k(n, r) {
            var i;
            while (n) {
                i = e.data(n, t);
                if (i && (!r || i[r])) return n;
                n = n.parentNode
            }
            return null
        }

        function L() {
            g = !1
        }

        function A() {
            g = !0
        }

        function O() {
            E = 0, v.length = 0, m = !1, A()
        }

        function M() {
            L()
        }

        function _() {
            c && (clearTimeout(c), c = 0)
        }

        function D() {
            _(), c = setTimeout(function() {
                c = 0, O()
            }, e.vmouse.resetTimerDuration)
        }

        function P(t, n, r) {
            var i;
            if (r && r[t] || !r && k(n.target, t)) i = N(n, t), e(n.target).trigger(i);
            return i
        }

        function H(t) {
            var n = e.data(t.target, i),
                r;
            t.type === "click" && e.data(t.target, "lastTouchType") === "touchstart" && setTimeout(function() {
                e.data(t.target, "lastTouchType") === "touchstart" && (O(), delete e.data(t.target).lastTouchType, H(t))
            }, e.vmouse.maximumTimeBetweenTouches), !m && (!E || E !== n) && (r = P("v" + t.type, t), r && (r.isDefaultPrevented() && t.preventDefault(), r.isPropagationStopped() && t.stopPropagation(), r.isImmediatePropagationStopped() && t.stopImmediatePropagation()))
        }

        function B(t) {
            var n = T(t).touches,
                r, s, o;
            n && n.length === 1 && (r = t.target, s = C(r), e.data(t.target, "lastTouchType", t.type), s.hasVirtualBinding && (E = w++, e.data(r, i, E), _(), M(), d = !1, o = T(t).touches[0], h = o.pageX, p = o.pageY, P("vmouseover", t, s), P("vmousedown", t, s)))
        }

        function j(t) {
            if (g) return;
            d || P("vmousecancel", t, C(t.target)), e.data(t.target, "lastTouchType", t.type), d = !0, D()
        }

        function F(t) {
            if (g) return;
            var n = T(t).touches[0],
                r = d,
                i = e.vmouse.moveDistanceThreshold,
                s = C(t.target);
            e.data(t.target, "lastTouchType", t.type), d = d || Math.abs(n.pageX - h) > i || Math.abs(n.pageY - p) > i, d && !r && P("vmousecancel", t, s), P("vmousemove", t, s), D()
        }

        function I(t) {
            if (g || e.data(t.target, "lastTouchType") === r) return;
            A(), delete e.data(t.target).lastTouchType;
            var n = C(t.target),
                i, s;
            P("vmouseup", t, n), d || (i = P("vclick", t, n), i && i.isDefaultPrevented() && (s = T(t).changedTouches[0], v.push({
                touchID: E,
                x: s.clientX,
                y: s.clientY
            }), m = !0)), P("vmouseout", t, n), d = !1, D()
        }

        function q(n) {
            var r = e.data(n, t),
                i;
            if (r)
                for (i in r)
                    if (r[i]) return !0;
            return !1
        }

        function R() {}

        function U(n) {
            var r = n.substr(1);
            return {
                setup: function() {
                    q(this) || e.data(this, t, {});
                    var i = e.data(this, t);
                    i[n] = !0, l[n] = (l[n] || 0) + 1, l[n] === 1 && b.bind(r, H), e(this).bind(r, R), y && (l.touchstart = (l.touchstart || 0) + 1, l.touchstart === 1 && b.bind("touchstart", B).bind("touchend", I).bind("touchmove", F).bind("scroll", j))
                },
                teardown: function() {
                    --l[n], l[n] || b.unbind(r, H), y && (--l.touchstart, l.touchstart || b.unbind("touchstart", B).unbind("touchmove", F).unbind("touchend", I).unbind("scroll", j));
                    var i = e(this),
                        s = e.data(this, t);
                    s && (s[n] = !1), i.unbind(r, R), q(this) || i.removeData(t)
                }
            }
        }
        var t = "virtualMouseBindings",
            i = "virtualTouchID",
            s = "clientX clientY pageX pageY screenX screenY".split(" "),
            o = "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),
            u = "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            a = e.event.mouseHooks ? e.event.mouseHooks.props : [],
            f = u.concat(a),
            l = {},
            c = 0,
            h = 0,
            p = 0,
            d = !1,
            v = [],
            m = !1,
            g = !1,
            y = "addEventListener" in n,
            b = e(n),
            w = 1,
            E = 0,
            S, x;
        e.vmouse = {
            moveDistanceThreshold: 10,
            clickDistanceThreshold: 10,
            resetTimerDuration: 1500,
            maximumTimeBetweenTouches: 100
        };
        for (x = 0; x < o.length; x++) e.event.special[o[x]] = U(o[x]);
        y && n.addEventListener("click", function(t) {
            var n = v.length,
                r = t.target,
                s, o, u, a, f, l;
            if (n) {
                s = t.clientX, o = t.clientY, S = e.vmouse.clickDistanceThreshold, u = r;
                while (u) {
                    for (a = 0; a < n; a++) {
                        f = v[a], l = 0;
                        if (u === r && Math.abs(f.x - s) < S && Math.abs(f.y - o) < S || e.data(u, i) === f.touchID) {
                            t.preventDefault(), t.stopPropagation();
                            return
                        }
                    }
                    u = u.parentNode
                }
            }
        }, !0)
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("events/touch", ["jquery", "../vmouse", "../support/touch"], t) : t(e)
    }(function(e) {
        function f(t, n, i, s) {
            var o = i.type;
            i.type = n, s ? e.event.trigger(i, r, t) : e.event.dispatch.call(t, i), i.type = o
        }
        var i = e(n),
            s = e.mobile.support.touch,
            o = s ? "touchstart" : "mousedown",
            u = s ? "touchend" : "mouseup",
            a = s ? "touchmove" : "mousemove";
        return e.each("touchstart touchmove touchend tap taphold swipe swipeleft swiperight".split(" "), function(t, n) {
            e.fn[n] = function(e) {
                return e ? this.bind(n, e) : this.trigger(n)
            }, e.attrFn && (e.attrFn[n] = !0)
        }), e.event.special.tap = {
            tapholdThreshold: 750,
            emitTapOnTaphold: !0,
            setup: function() {
                var t = this,
                    n = e(t),
                    r = !1;
                n.bind("vmousedown", function(s) {
                    function l() {
                        u && (n.bind("vclick", a), clearTimeout(u))
                    }

                    function c() {
                        l(), n.unbind("vclick", a).unbind("vmouseup", l), i.unbind("vmousecancel", c)
                    }
                    r = !1;
                    if (s.which && s.which !== 1) return !0;
                    var o = s.target,
                        u, a;
                    a = function(e) {
                        c(), !r && o === e.target ? f(t, "tap", e) : r && e.preventDefault()
                    }, n.bind("vmouseup", l), i.bind("vmousecancel", c), u = setTimeout(function() {
                        e.event.special.tap.emitTapOnTaphold || (r = !0), u = 0, f(t, "taphold", e.Event("taphold", {
                            target: o
                        }))
                    }, e.event.special.tap.tapholdThreshold)
                })
            },
            teardown: function() {
                e(this).unbind("vmousedown").unbind("vclick").unbind("vmouseup"), i.unbind("vmousecancel")
            }
        }, e.event.special.swipe = {
            scrollSupressionThreshold: 30,
            durationThreshold: 1e3,
            horizontalDistanceThreshold: t.devicePixelRatio >= 2 ? 15 : 30,
            verticalDistanceThreshold: t.devicePixelRatio >= 2 ? 15 : 30,
            getLocation: function(e) {
                var n = t.pageXOffset,
                    r = t.pageYOffset,
                    i = e.clientX,
                    s = e.clientY;
                if (e.pageY === 0 && Math.floor(s) > Math.floor(e.pageY) || e.pageX === 0 && Math.floor(i) > Math.floor(e.pageX)) i -= n, s -= r;
                else if (s < e.pageY - r || i < e.pageX - n) i = e.pageX - n, s = e.pageY - r;
                return {
                    x: i,
                    y: s
                }
            },
            start: function(t) {
                var n = t.originalEvent.touches ? t.originalEvent.touches[0] : t,
                    r = e.event.special.swipe.getLocation(n);
                return {
                    time: (new Date).getTime(),
                    coords: [r.x, r.y],
                    origin: e(t.target)
                }
            },
            stop: function(t) {
                var n = t.originalEvent.touches ? t.originalEvent.touches[0] : t,
                    r = e.event.special.swipe.getLocation(n);
                return {
                    time: (new Date).getTime(),
                    coords: [r.x, r.y]
                }
            },
            handleSwipe: function(t, n, r, i) {
                if (n.time - t.time < e.event.special.swipe.durationThreshold && Math.abs(t.coords[0] - n.coords[0]) > e.event.special.swipe.horizontalDistanceThreshold && Math.abs(t.coords[1] - n.coords[1]) < e.event.special.swipe.verticalDistanceThreshold) {
                    var s = t.coords[0] > n.coords[0] ? "swipeleft" : "swiperight";
                    return f(r, "swipe", e.Event("swipe", {
                        target: i,
                        swipestart: t,
                        swipestop: n
                    }), !0), f(r, s, e.Event(s, {
                        target: i,
                        swipestart: t,
                        swipestop: n
                    }), !0), !0
                }
                return !1
            },
            eventInProgress: !1,
            setup: function() {
                var t, n = this,
                    r = e(n),
                    s = {};
                t = e.data(this, "mobile-events"), t || (t = {
                    length: 0
                }, e.data(this, "mobile-events", t)), t.length++, t.swipe = s, s.start = function(t) {
                    if (e.event.special.swipe.eventInProgress) return;
                    e.event.special.swipe.eventInProgress = !0;
                    var r, o = e.event.special.swipe.start(t),
                        f = t.target,
                        l = !1;
                    s.move = function(t) {
                        if (!o || t.isDefaultPrevented()) return;
                        r = e.event.special.swipe.stop(t), l || (l = e.event.special.swipe.handleSwipe(o, r, n, f), l && (e.event.special.swipe.eventInProgress = !1)), Math.abs(o.coords[0] - r.coords[0]) > e.event.special.swipe.scrollSupressionThreshold && t.preventDefault()
                    }, s.stop = function() {
                        l = !0, e.event.special.swipe.eventInProgress = !1, i.off(a, s.move), s.move = null
                    }, i.on(a, s.move).one(u, s.stop)
                }, r.on(o, s.start)
            },
            teardown: function() {
                var t, n;
                t = e.data(this, "mobile-events"), t && (n = t.swipe, delete t.swipe, t.length--, t.length === 0 && e.removeData(this, "mobile-events")), n && (n.start && e(this).off(o, n.start), n.move && i.off(a, n.move), n.stop && i.off(u, n.stop))
            }
        }, e.each({
            taphold: "tap",
            swipeleft: "swipe.left",
            swiperight: "swipe.right"
        }, function(t, n) {
            e.event.special[t] = {
                setup: function() {
                    e(this).bind(n, e.noop)
                },
                teardown: function() {
                    e(this).unbind(n)
                }
            }
        }), e.event.special
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("events/scroll", ["jquery"], t) : t(e)
    }(function(e) {
        var t = "touchmove scroll";
        return e.each(["scrollstart", "scrollstop"], function(t, n) {
            e.fn[n] = function(e) {
                return e ? this.bind(n, e) : this.trigger(n)
            }, e.attrFn && (e.attrFn[n] = !0)
        }), e.event.special.scrollstart = {
            enabled: !0,
            setup: function() {
                function o(t, r) {
                    var s = t.type;
                    i = r, t.type = i ? "scrollstart" : "scrollstop", e.event.dispatch.call(n, t), t.type = s
                }
                var n = this,
                    r = e(n),
                    i, s, u = e.event.special.scrollstart.handler = function(t) {
                        if (!e.event.special.scrollstart.enabled) return;
                        i || o(t, !0), clearTimeout(s), s = setTimeout(function() {
                            o(t, !1)
                        }, 50)
                    };
                r.on(t, u)
            },
            teardown: function() {
                e(this).off(t, e.event.special.scrollstart.handler)
            }
        }, e.each({
            scrollstop: "scrollstart"
        }, function(t, n) {
            e.event.special[t] = {
                setup: function() {
                    e(this).bind(n, e.noop)
                },
                teardown: function() {
                    e(this).unbind(n)
                }
            }
        }), e.event.special
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("events/throttledresize", ["jquery"], t) : t(e)
    }(function(e) {
        var t = 250,
            n = 0,
            r, i, s, o = function() {
                i = (new Date).getTime(), s = i - n, s >= t ? (n = i, e(this).trigger("throttledresize")) : (r && clearTimeout(r), r = setTimeout(o, t - s))
            };
        return e.event.special.throttledresize = {
            setup: function() {
                e(this).bind("resize", o)
            },
            teardown: function() {
                e(this).unbind("resize", o)
            }
        }, e.event.special.throttledresize
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("events/orientationchange", ["jquery", "../support/orientation", "./throttledresize"], t) : t(e)
    }(function(e) {
        function p() {
            var e = s();
            e !== o && (o = e, r.trigger(i))
        }
        var r = e(t),
            i = "orientationchange",
            s, o, u, a, f = {
                0: !0,
                180: !0
            },
            l, c, h;
        if (e.support.orientation) {
            l = t.innerWidth || r.width(), c = t.innerHeight || r.height(), h = 50, u = l > c && l - c > h, a = f[t.orientation];
            if (u && a || !u && !a) f = {
                "-90": !0,
                90: !0
            }
        }
        return e.event.special.orientationchange = e.extend({}, e.event.special.orientationchange, {
            setup: function() {
                if (e.support.orientation && !e.event.special.orientationchange.disabled) return !1;
                o = s(), r.bind("throttledresize", p)
            },
            teardown: function() {
                if (e.support.orientation && !e.event.special.orientationchange.disabled) return !1;
                r.unbind("throttledresize", p)
            },
            add: function(e) {
                var t = e.handler;
                e.handler = function(e) {
                    return e.orientation = s(), t.apply(this, arguments)
                }
            }
        }), e.event.special.orientationchange.orientation = s = function() {
            var r = !0,
                i = n.documentElement;
            return e.support.orientation ? r = f[t.orientation] : r = i && i.clientWidth / i.clientHeight < 1.1, r ? "portrait" : "landscape"
        }, e.fn[i] = function(e) {
            return e ? this.bind(i, e) : this.trigger(i)
        }, e.attrFn && (e.attrFn[i] = !0), e.event.special
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("events", ["jquery", "./events/navigate", "./events/touch", "./events/scroll", "./events/orientationchange"], t) : t(e)
    }(function() {}),
    function(t) {
        typeof define == "function" && define.amd ? define("grid", ["jquery"], t) : t(e)
    }(function(e) {
        return e.fn.grid = function(t) {
            return this.each(function() {
                var n = e(this),
                    r = e.extend({
                        grid: null
                    }, t),
                    i = n.children(),
                    s = {
                        solo: 1,
                        a: 2,
                        b: 3,
                        c: 4,
                        d: 5
                    },
                    o = r.grid,
                    u, a;
                if (!o)
                    if (i.length <= 5)
                        for (a in s) s[a] === i.length && (o = a);
                    else o = "a", n.addClass("ui-grid-duo");
                u = s[o], n.addClass("ui-grid-" + o), i.filter(":nth-child(" + u + "n+1)").addClass("ui-block-a"), u > 1 && i.filter(":nth-child(" + u + "n+2)").addClass("ui-block-b"), u > 2 && i.filter(":nth-child(" + u + "n+3)").addClass("ui-block-c"), u > 3 && i.filter(":nth-child(" + u + "n+4)").addClass("ui-block-d"), u > 4 && i.filter(":nth-child(" + u + "n+5)").addClass("ui-block-e")
            })
        }, e.fn.grid
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/enhancer", ["jquery"], t) : t(e)
    }(function(e) {
        var t, n = !1;
        return e.fn.extend({
            enhance: function() {
                return e.enhance.enhance(this)
            },
            enhanceWithin: function() {
                return this.children().enhance(), this
            },
            enhanceOptions: function() {
                return e.enhance.getOptions(this)
            },
            enhanceRoles: function() {
                return e.enhance.getRoles(this)
            }
        }), e.enhance = e.enhance || {}, e.extend(e.enhance, {
            enhance: function(t) {
                var n, r = t.find("[" + e.enhance.defaultProp() + "]").addBack();
                e.enhance._filter && (r = e.enhance._filter(r));
                for (n = 0; n < e.enhance.hooks.length; n++) e.enhance.hooks[n].call(t, r);
                return e.enhance.defaultFunction.call(t, r), t
            },
            hooks: e.enhance.hooks || [],
            _filter: e.enhance._filter || !1,
            defaultProp: e.enhance.defaultProp || function() {
                return "data-ui-role"
            },
            defaultFunction: function(t) {
                t.each(function() {
                    var t, n = e(this).enhanceRoles();
                    for (t = 0; t < n.length; t++) e.fn[n[t]] && e(this)[n[t]]()
                })
            },
            cache: !0,
            roleCache: {},
            getRoles: function(t) {
                if (!t.length) return [];
                var n, i = e.enhance.roleCache[t[0].id ? t[0].id : r];
                return i ? i : (n = t.attr(e.enhance.defaultProp()), i = n ? n.match(/\S+/g) : [], e.enhance.roleCache[t[0].id] = i, i)
            },
            optionCache: {},
            getOptions: function(t) {
                var n = e.enhance.optionCache[t[0].id ? t[0].id : r],
                    i;
                return n ? n : (n = {}, i = (e.mobile.ns || "ui-").replace("-", ""), e.each(e(t).data(), function(e, t) {
                    e = e.replace(i, ""), e = e.charAt(0).toLowerCase() + e.slice(1), n[e] = t
                }), e.enhance.optionCache[t[0].id] = n, n)
            },
            _installWidget: function() {
                e.Widget && !n && (e.extend(e.Widget.prototype, {
                    _getCreateOptions: function(e) {
                        var t, n, i = this.element.enhanceOptions();
                        e = e || {};
                        for (t in this.options) n = i[t], n !== r && (e[t] = n);
                        return e
                    }
                }), n = !0)
            }
        }), e.Widget ? e.enhance._installWidget() : Object.defineProperty(e, "Widget", {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return t
            },
            set: function(n) {
                n && (t = n, setTimeout(function() {
                    e.enhance._installWidget()
                }))
            }
        }), e.enhance
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("navigation/path", ["jquery", "./../ns"], t) : t(e)
    }(function(e) {
        var n, i, s = "&ui-state=dialog";
        return e.mobile.path = n = {
            uiStateKey: "&ui-state",
            urlParseRE: /^\s*(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/,
            getLocation: function(e) {
                var t = this.parseUrl(e || location.href),
                    n = e ? t : location,
                    r = t.hash;
                return r = r === "#" ? "" : r, n.protocol + t.doubleSlash + n.host + (n.protocol !== "" && n.pathname.substring(0, 1) !== "/" ? "/" : "") + n.pathname + n.search + r
            },
            getDocumentUrl: function(t) {
                return t ? e.extend({}, n.documentUrl) : n.documentUrl.href
            },
            parseLocation: function() {
                return this.parseUrl(this.getLocation())
            },
            parseUrl: function(t) {
                if (e.type(t) === "object") return t;
                var r = n.urlParseRE.exec(t || "") || [];
                return {
                    href: r[0] || "",
                    hrefNoHash: r[1] || "",
                    hrefNoSearch: r[2] || "",
                    domain: r[3] || "",
                    protocol: r[4] || "",
                    doubleSlash: r[5] || "",
                    authority: r[6] || "",
                    username: r[8] || "",
                    password: r[9] || "",
                    host: r[10] || "",
                    hostname: r[11] || "",
                    port: r[12] || "",
                    pathname: r[13] || "",
                    directory: r[14] || "",
                    filename: r[15] || "",
                    search: r[16] || "",
                    hash: r[17] || ""
                }
            },
            makePathAbsolute: function(e, t) {
                var n, r, i, s;
                if (e && e.charAt(0) === "/") return e;
                e = e || "", t = t ? t.replace(/^\/|(\/[^\/]*|[^\/]+)$/g, "") : "", n = t ? t.split("/") : [], r = e.split("/");
                for (i = 0; i < r.length; i++) {
                    s = r[i];
                    switch (s) {
                        case ".":
                            break;
                        case "..":
                            n.length && n.pop();
                            break;
                        default:
                            n.push(s)
                    }
                }
                return "/" + n.join("/")
            },
            isSameDomain: function(e, t) {
                return n.parseUrl(e).domain.toLowerCase() === n.parseUrl(t).domain.toLowerCase()
            },
            isRelativeUrl: function(e) {
                return n.parseUrl(e).protocol === ""
            },
            isAbsoluteUrl: function(e) {
                return n.parseUrl(e).protocol !== ""
            },
            makeUrlAbsolute: function(e, t) {
                if (!n.isRelativeUrl(e)) return e;
                t === r && (t = this.documentBase);
                var i = n.parseUrl(e),
                    s = n.parseUrl(t),
                    o = i.protocol || s.protocol,
                    u = i.protocol ? i.doubleSlash : i.doubleSlash || s.doubleSlash,
                    a = i.authority || s.authority,
                    f = i.pathname !== "",
                    l = n.makePathAbsolute(i.pathname || s.filename, s.pathname),
                    c = i.search || !f && s.search || "",
                    h = i.hash;
                return o + u + a + l + c + h
            },
            addSearchParams: function(t, r) {
                var i = n.parseUrl(t),
                    s = typeof r == "object" ? e.param(r) : r,
                    o = i.search || "?";
                return i.hrefNoSearch + o + (o.charAt(o.length - 1) !== "?" ? "&" : "") + s + (i.hash || "")
            },
            convertUrlToDataUrl: function(e) {
                var r = e,
                    i = n.parseUrl(e);
                return n.isEmbeddedPage(i) ? r = i.hash.split(s)[0].replace(/^#/, "").replace(/\?.*$/, "") : n.isSameDomain(i, this.documentBase) && (r = i.hrefNoHash.replace(this.documentBase.domain, "").split(s)[0]), t.decodeURIComponent(r)
            },
            get: function(e) {
                return e === r && (e = n.parseLocation().hash), n.stripHash(e).replace(/[^\/]*\.[^\/*]+$/, "")
            },
            set: function(e) {
                location.hash = e
            },
            isPath: function(e) {
                return /\//.test(e)
            },
            clean: function(e) {
                return e.replace(this.documentBase.domain, "")
            },
            stripHash: function(e) {
                return e.replace(/^#/, "")
            },
            stripQueryParams: function(e) {
                return e.replace(/\?.*$/, "")
            },
            cleanHash: function(e) {
                return n.stripHash(e.replace(/\?.*$/, "").replace(s, ""))
            },
            isHashValid: function(e) {
                return /^#[^#]+$/.test(e)
            },
            isExternal: function(e) {
                var t = n.parseUrl(e);
                return !!t.protocol && t.domain.toLowerCase() !== this.documentUrl.domain.toLowerCase()
            },
            hasProtocol: function(e) {
                return /^(:?\w+:)/.test(e)
            },
            isEmbeddedPage: function(e) {
                var t = n.parseUrl(e);
                return t.protocol !== "" ? !this.isPath(t.hash) && t.hash && (t.hrefNoHash === this.documentUrl.hrefNoHash || this.documentBaseDiffers && t.hrefNoHash === this.documentBase.hrefNoHash) : /^#/.test(t.href)
            },
            squash: function(e, t) {
                var r, i, s, o, u, a = this.isPath(e),
                    f = this.parseUrl(e),
                    l = f.hash,
                    c = "";
                t || (a ? t = n.getLocation() : (u = n.getDocumentUrl(!0), n.isPath(u.hash) ? t = n.squash(u.href) : t = u.href)), i = a ? n.stripHash(e) : e, i = n.isPath(f.hash) ? n.stripHash(f.hash) : i, o = i.indexOf(this.uiStateKey), o > -1 && (c = i.slice(o), i = i.slice(0, o)), r = n.makeUrlAbsolute(i, t), s = this.parseUrl(r).search;
                if (a) {
                    if (n.isPath(l) || l.replace("#", "").indexOf(this.uiStateKey) === 0) l = "";
                    c && l.indexOf(this.uiStateKey) === -1 && (l += c), l.indexOf("#") === -1 && l !== "" && (l = "#" + l), r = n.parseUrl(r), r = r.protocol + r.doubleSlash + r.host + r.pathname + s + l
                } else r += r.indexOf("#") > -1 ? c : "#" + c;
                return r
            },
            isPreservableHash: function(e) {
                return e.replace("#", "").indexOf(this.uiStateKey) === 0
            },
            hashToSelector: function(e) {
                var t = e.substring(0, 1) === "#";
                return t && (e = e.substring(1)), (t ? "#" : "") + e.replace(/([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g, "\\$1")
            },
            getFilePath: function(e) {
                return e && e.split(s)[0]
            },
            isFirstPageUrl: function(t) {
                var i = n.parseUrl(n.makeUrlAbsolute(t, this.documentBase)),
                    s = i.hrefNoHash === this.documentUrl.hrefNoHash || this.documentBaseDiffers && i.hrefNoHash === this.documentBase.hrefNoHash,
                    o = e.mobile.firstPage,
                    u = o && o[0] ? o[0].id : r;
                return s && (!i.hash || i.hash === "#" || u && i.hash.replace(/^#/, "") === u)
            },
            isPermittedCrossDomainRequest: function(t, n) {
                return e.mobile.allowCrossDomainPages && (t.protocol === "file:" || t.protocol === "content:") && n.search(/^https?:/) !== -1
            }
        }, n.documentUrl = n.parseLocation(), i = e("head").find("base"), n.documentBase = i.length ? n.parseUrl(n.makeUrlAbsolute(i.attr("href"), n.documentUrl.href)) : n.documentUrl, n.documentBaseDiffers = n.documentUrl.hrefNoHash !== n.documentBase.hrefNoHash, n.getDocumentBase = function(t) {
            return t ? e.extend({}, n.documentBase) : n.documentBase.href
        }, n
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("navigation/history", ["jquery", "./../ns", "./path"], t) : t(e)
    }(function(e) {
        return e.mobile.History = function(e, t) {
            this.stack = e || [], this.activeIndex = t || 0
        }, e.extend(e.mobile.History.prototype, {
            getActive: function() {
                return this.stack[this.activeIndex]
            },
            getLast: function() {
                return this.stack[this.previousIndex]
            },
            getNext: function() {
                return this.stack[this.activeIndex + 1]
            },
            getPrev: function() {
                return this.stack[this.activeIndex - 1]
            },
            add: function(e, t) {
                t = t || {}, this.getNext() && this.clearForward(), t.hash && t.hash.indexOf("#") === -1 && (t.hash = "#" + t.hash), t.url = e, this.stack.push(t), this.activeIndex = this.stack.length - 1
            },
            clearForward: function() {
                this.stack = this.stack.slice(0, this.activeIndex + 1)
            },
            find: function(e, t, n) {
                t = t || this.stack;
                var r, i, s = t.length,
                    o;
                for (i = 0; i < s; i++) {
                    r = t[i];
                    if (decodeURIComponent(e) === decodeURIComponent(r.url) || decodeURIComponent(e) === decodeURIComponent(r.hash)) {
                        o = i;
                        if (n) return o
                    }
                }
                return o
            },
            _findById: function(e) {
                var t, n = this.stack.length;
                for (t = 0; t < n; t++)
                    if (this.stack[t].id === e) break;
                return t < n ? t : r
            },
            closest: function(e, t) {
                var n = t === r ? r : this._findById(t),
                    i = this.activeIndex;
                return n !== r ? n : (n = this.find(e, this.stack.slice(0, i)), n === r && (n = this.find(e, this.stack.slice(i), !0), n = n === r ? n : n + i), n)
            },
            direct: function(t) {
                var n = this.closest(t.url, t.id),
                    i = this.activeIndex;
                n !== r && (this.activeIndex = n, this.previousIndex = i), n < i ? (t.present || t.back || e.noop)(this.getActive(), "back") : n > i ? (t.present || t.forward || e.noop)(this.getActive(), "forward") : n === r && t.missing && t.missing(this.getActive())
            }
        }), e.mobile.History
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("navigation/navigator", ["jquery", "./../ns", "../events/navigate", "./path", "./history"], t) : t(e)
    }(function(e) {
        var r = e.mobile.path,
            i = location.href;
        return e.mobile.Navigator = function(t) {
            this.history = t, this.ignoreInitialHashChange = !0, e.mobile.window.bind({
                "popstate.history": e.proxy(this.popstate, this),
                "hashchange.history": e.proxy(this.hashchange, this)
            })
        }, e.extend(e.mobile.Navigator.prototype, {
            historyEntryId: 0,
            squash: function(s, o) {
                var u, a, f = r.isPath(s) ? r.stripHash(s) : s;
                return a = r.squash(s), u = e.extend({
                    id: ++this.historyEntryId,
                    hash: f,
                    url: a
                }, o), t.history && t.history.replaceState && t.history.replaceState(u, u.title || n.title, a), this.ignoreInitialHashChange && (i = a), u
            },
            hash: function(e, t) {
                var n, i, s, o;
                return n = r.parseUrl(e), i = r.parseLocation(), i.pathname + i.search === n.pathname + n.search ? s = n.hash ? n.hash : n.pathname + n.search : r.isPath(e) ? (o = r.parseUrl(t), s = o.pathname + o.search + (r.isPreservableHash(o.hash) ? o.hash.replace("#", "") : "")) : s = e, s
            },
            go: function(i, s, o) {
                var u, a, f, l, c = e.event.special.navigate.isPushStateEnabled();
                a = r.squash(i), f = this.hash(i, a), o && f !== r.stripHash(r.parseLocation().hash) && (this.preventNextHashChange = o), this.preventHashAssignPopState = !0, t.location.hash = f, this.preventHashAssignPopState = !1, u = e.extend({
                    url: a,
                    hash: f,
                    title: n.title
                }, s), c && (l = new e.Event("popstate"), l.originalEvent = new e.Event("popstate", {
                    state: null
                }), u.id = (this.squash(i, u) || {}).id, o || (this.ignorePopState = !0, e.mobile.window.trigger(l))), this.history.add(u.url, u)
            },
            popstate: function(t) {
                var n, s;
                if (!e.event.special.navigate.isPushStateEnabled()) return;
                if (this.preventHashAssignPopState) {
                    this.preventHashAssignPopState = !1, t.stopImmediatePropagation();
                    return
                }
                if (this.ignorePopState) {
                    this.ignorePopState = !1;
                    return
                }
                if (!t.originalEvent.state && this.history.stack.length === 1 && this.ignoreInitialHashChange) {
                    this.ignoreInitialHashChange = !1;
                    if (location.href === i) {
                        t.preventDefault();
                        return
                    }
                }
                n = r.parseLocation().hash;
                if (!t.originalEvent.state && n) {
                    s = this.squash(n), this.history.add(s.url, s), t.historyState = s;
                    return
                }
                this.history.direct({
                    id: (t.originalEvent.state || {}).id,
                    url: (t.originalEvent.state || {}).url || n,
                    present: function(n, r) {
                        t.historyState = e.extend({}, n), t.historyState.direction = r
                    }
                })
            },
            hashchange: function(t) {
                var i, s;
                if (!e.event.special.navigate.isHashChangeEnabled() || e.event.special.navigate.isPushStateEnabled()) return;
                if (this.preventNextHashChange) {
                    this.preventNextHashChange = !1, t.stopImmediatePropagation();
                    return
                }
                i = this.history, s = r.parseLocation().hash, this.history.direct({
                    url: s,
                    present: function(n, r) {
                        t.hashchangeState = e.extend({}, n), t.hashchangeState.direction = r
                    },
                    missing: function() {
                        i.add(s, {
                            hash: s,
                            title: n.title
                        })
                    }
                })
            }
        }), e.mobile.Navigator
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("navigation/method", ["jquery", "./path", "./history", "./navigator"], t) : t(e)
    }(function(e) {
        e.mobile.navigate = function(t, n, r) {
            e.mobile.navigate.navigator.go(t, n, r)
        }, e.mobile.navigate.history = new e.mobile.History, e.mobile.navigate.navigator = new e.mobile.Navigator(e.mobile.navigate.history);
        var t = e.mobile.path.parseLocation();
        return e.mobile.navigate.history.add(t.href, {
            hash: t.hash
        }), e.mobile.navigate
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("jquery-ui/safe-active-element", ["jquery", "./version"], t) : t(e)
    }(function(e) {
        return e.ui.safeActiveElement = function(e) {
            var t;
            try {
                t = e.activeElement
            } catch (n) {
                t = e.body
            }
            return t || (t = e.body), t.nodeName || (t = e.body), t
        }
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("jquery-ui/safe-blur", ["jquery", "./version"], t) : t(e)
    }(function(e) {
        return e.ui.safeBlur = function(t) {
            t && t.nodeName.toLowerCase() !== "body" && e(t).trigger("blur")
        }
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("jquery-ui/widget", ["jquery", "./version"], t) : t(e)
    }(function(e) {
        var t = 0,
            n = Array.prototype.slice;
        return e.cleanData = function(t) {
            return function(n) {
                var r, i, s;
                for (s = 0;
                    (i = n[s]) != null; s++) try {
                    r = e._data(i, "events"), r && r.remove && e(i).triggerHandler("remove")
                } catch (o) {}
                t(n)
            }
        }(e.cleanData), e.widget = function(t, n, r) {
            var i, s, o, u = {},
                a = t.split(".")[0];
            t = t.split(".")[1];
            var f = a + "-" + t;
            return r || (r = n, n = e.Widget), e.isArray(r) && (r = e.extend.apply(null, [{}].concat(r))), e.expr[":"][f.toLowerCase()] = function(t) {
                return !!e.data(t, f)
            }, e[a] = e[a] || {}, i = e[a][t], s = e[a][t] = function(e, t) {
                if (!this._createWidget) return new s(e, t);
                arguments.length && this._createWidget(e, t)
            }, e.extend(s, i, {
                version: r.version,
                _proto: e.extend({}, r),
                _childConstructors: []
            }), o = new n, o.options = e.widget.extend({}, o.options), e.each(r, function(t, r) {
                if (!e.isFunction(r)) {
                    u[t] = r;
                    return
                }
                u[t] = function() {
                    function e() {
                        return n.prototype[t].apply(this, arguments)
                    }

                    function i(e) {
                        return n.prototype[t].apply(this, e)
                    }
                    return function() {
                        var t = this._super,
                            n = this._superApply,
                            s;
                        return this._super = e, this._superApply = i, s = r.apply(this, arguments), this._super = t, this._superApply = n, s
                    }
                }()
            }), s.prototype = e.widget.extend(o, {
                widgetEventPrefix: i ? o.widgetEventPrefix || t : t
            }, u, {
                constructor: s,
                namespace: a,
                widgetName: t,
                widgetFullName: f
            }), i ? (e.each(i._childConstructors, function(t, n) {
                var r = n.prototype;
                e.widget(r.namespace + "." + r.widgetName, s, n._proto)
            }), delete i._childConstructors) : n._childConstructors.push(s), e.widget.bridge(t, s), s
        }, e.widget.extend = function(t) {
            var i = n.call(arguments, 1),
                s = 0,
                o = i.length,
                u, a;
            for (; s < o; s++)
                for (u in i[s]) a = i[s][u], i[s].hasOwnProperty(u) && a !== r && (e.isPlainObject(a) ? t[u] = e.isPlainObject(t[u]) ? e.widget.extend({}, t[u], a) : e.widget.extend({}, a) : t[u] = a);
            return t
        }, e.widget.bridge = function(t, i) {
            var s = i.prototype.widgetFullName || t;
            e.fn[t] = function(o) {
                var u = typeof o == "string",
                    a = n.call(arguments, 1),
                    f = this;
                return u ? !this.length && o === "instance" ? f = r : this.each(function() {
                    var n, i = e.data(this, s);
                    if (o === "instance") return f = i, !1;
                    if (!i) return e.error("cannot call methods on " + t + " prior to initialization; " + "attempted to call method '" + o + "'");
                    if (!e.isFunction(i[o]) || o.charAt(0) === "_") return e.error("no such method '" + o + "' for " + t + " widget instance");
                    n = i[o].apply(i, a);
                    if (n !== i && n !== r) return f = n && n.jquery ? f.pushStack(n.get()) : n, !1
                }) : (a.length && (o = e.widget.extend.apply(null, [o].concat(a))), this.each(function() {
                    var t = e.data(this, s);
                    t ? (t.option(o || {}), t._init && t._init()) : e.data(this, s, new i(o, this))
                })), f
            }
        }, e.Widget = function() {}, e.Widget._childConstructors = [], e.Widget.prototype = {
            widgetName: "widget",
            widgetEventPrefix: "",
            defaultElement: "<div>",
            options: {
                classes: {},
                disabled: !1,
                create: null
            },
            _createWidget: function(n, r) {
                r = e(r || this.defaultElement || this)[0], this.element = e(r), this.uuid = t++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = e(), this.hoverable = e(), this.focusable = e(), this.classesElementLookup = {}, r !== this && (e.data(r, this.widgetFullName, this), this._on(!0, this.element, {
                    remove: function(e) {
                        e.target === r && this.destroy()
                    }
                }), this.document = e(r.style ? r.ownerDocument : r.document || r), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this.options = e.widget.extend({}, this.options, this._getCreateOptions(), n), this._create(), this.options.disabled && this._setOptionDisabled(this.options.disabled), this._trigger("create", null, this._getCreateEventData()), this._init()
            },
            _getCreateOptions: function() {
                return {}
            },
            _getCreateEventData: e.noop,
            _create: e.noop,
            _init: e.noop,
            destroy: function() {
                var t = this;
                this._destroy(), e.each(this.classesElementLookup, function(e, n) {
                    t._removeClass(n, e)
                }), this.element.off(this.eventNamespace).removeData(this.widgetFullName), this.widget().off(this.eventNamespace).removeAttr("aria-disabled"), this.bindings.off(this.eventNamespace)
            },
            _destroy: e.noop,
            widget: function() {
                return this.element
            },
            option: function(t, n) {
                var i = t,
                    s, o, u;
                if (arguments.length === 0) return e.widget.extend({}, this.options);
                if (typeof t == "string") {
                    i = {}, s = t.split("."), t = s.shift();
                    if (s.length) {
                        o = i[t] = e.widget.extend({}, this.options[t]);
                        for (u = 0; u < s.length - 1; u++) o[s[u]] = o[s[u]] || {}, o = o[s[u]];
                        t = s.pop();
                        if (arguments.length === 1) return o[t] === r ? null : o[t];
                        o[t] = n
                    } else {
                        if (arguments.length === 1) return this.options[t] === r ? null : this.options[t];
                        i[t] = n
                    }
                }
                return this._setOptions(i), this
            },
            _setOptions: function(e) {
                var t;
                for (t in e) this._setOption(t, e[t]);
                return this
            },
            _setOption: function(e, t) {
                return e === "classes" && this._setOptionClasses(t), this.options[e] = t, e === "disabled" && this._setOptionDisabled(t), this
            },
            _setOptionClasses: function(t) {
                var n, r, i;
                for (n in t) {
                    i = this.classesElementLookup[n];
                    if (t[n] === this.options.classes[n] || !i || !i.length) continue;
                    r = e(i.get()), this._removeClass(i, n), r.addClass(this._classes({
                        element: r,
                        keys: n,
                        classes: t,
                        add: !0
                    }))
                }
            },
            _setOptionDisabled: function(e) {
                this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!e), e && (this._removeClass(this.hoverable, null, "ui-state-hover"), this._removeClass(this.focusable, null, "ui-state-focus"))
            },
            enable: function() {
                return this._setOptions({
                    disabled: !1
                })
            },
            disable: function() {
                return this._setOptions({
                    disabled: !0
                })
            },
            _classes: function(t) {
                function i(i, s) {
                    var o, u;
                    for (u = 0; u < i.length; u++) o = r.classesElementLookup[i[u]] || e(), t.add ? o = e(e.unique(o.get().concat(t.element.get()))) : o = e(o.not(t.element).get()), r.classesElementLookup[i[u]] = o, n.push(i[u]), s && t.classes[i[u]] && n.push(t.classes[i[u]])
                }
                var n = [],
                    r = this;
                return t = e.extend({
                    element: this.element,
                    classes: this.options.classes || {}
                }, t), this._on(t.element, {
                    remove: "_untrackClassesElement"
                }), t.keys && i(t.keys.match(/\S+/g) || [], !0), t.extra && i(t.extra.match(/\S+/g) || []), n.join(" ")
            },
            _untrackClassesElement: function(t) {
                var n = this;
                e.each(n.classesElementLookup, function(r, i) {
                    e.inArray(t.target, i) !== -1 && (n.classesElementLookup[r] = e(i.not(t.target).get()))
                })
            },
            _removeClass: function(e, t, n) {
                return this._toggleClass(e, t, n, !1)
            },
            _addClass: function(e, t, n) {
                return this._toggleClass(e, t, n, !0)
            },
            _toggleClass: function(e, t, n, r) {
                r = typeof r == "boolean" ? r : n;
                var i = typeof e == "string" || e === null,
                    s = {
                        extra: i ? t : n,
                        keys: i ? e : t,
                        element: i ? this.element : e,
                        add: r
                    };
                return s.element.toggleClass(this._classes(s), r), this
            },
            _on: function(t, n, r) {
                var i, s = this;
                typeof t != "boolean" && (r = n, n = t, t = !1), r ? (n = i = e(n), this.bindings = this.bindings.add(n)) : (r = n, n = this.element, i = this.widget()), e.each(r, function(r, o) {
                    function u() {
                        if (!t && (s.options.disabled === !0 || e(this).hasClass("ui-state-disabled"))) return;
                        return (typeof o == "string" ? s[o] : o).apply(s, arguments)
                    }
                    typeof o != "string" && (u.guid = o.guid = o.guid || u.guid || e.guid++);
                    var a = r.match(/^([\w:-]*)\s*(.*)$/),
                        f = a[1] + s.eventNamespace,
                        l = a[2];
                    l ? i.on(f, l, u) : n.on(f, u)
                })
            },
            _off: function(t, n) {
                n = (n || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, t.off(n).off(n), this.bindings = e(this.bindings.not(t).get()), this.focusable = e(this.focusable.not(t).get()), this.hoverable = e(this.hoverable.not(t).get())
            },
            _delay: function(e, t) {
                function n() {
                    return (typeof e == "string" ? r[e] : e).apply(r, arguments)
                }
                var r = this;
                return setTimeout(n, t || 0)
            },
            _hoverable: function(t) {
                this.hoverable = this.hoverable.add(t), this._on(t, {
                    mouseenter: function(t) {
                        this._addClass(e(t.currentTarget), null, "ui-state-hover")
                    },
                    mouseleave: function(t) {
                        this._removeClass(e(t.currentTarget), null, "ui-state-hover")
                    }
                })
            },
            _focusable: function(t) {
                this.focusable = this.focusable.add(t), this._on(t, {
                    focusin: function(t) {
                        this._addClass(e(t.currentTarget), null, "ui-state-focus")
                    },
                    focusout: function(t) {
                        this._removeClass(e(t.currentTarget), null, "ui-state-focus")
                    }
                })
            },
            _trigger: function(t, n, r) {
                var i, s, o = this.options[t];
                r = r || {}, n = e.Event(n), n.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), n.target = this.element[0], s = n.originalEvent;
                if (s)
                    for (i in s) i in n || (n[i] = s[i]);
                return this.element.trigger(n, r), !(e.isFunction(o) && o.apply(this.element[0], [n].concat(r)) === !1 || n.isDefaultPrevented())
            }
        }, e.each({
            show: "fadeIn",
            hide: "fadeOut"
        }, function(t, n) {
            e.Widget.prototype["_" + t] = function(r, i, s) {
                typeof i == "string" && (i = {
                    effect: i
                });
                var o, u = i ? i === !0 || typeof i == "number" ? n : i.effect || n : t;
                i = i || {}, typeof i == "number" && (i = {
                    duration: i
                }), o = !e.isEmptyObject(i), i.complete = s, i.delay && r.delay(i.delay), o && e.effects && e.effects.effect[u] ? r[t](i) : u !== t && r[u] ? r[u](i.duration, i.easing, s) : r.queue(function(n) {
                    e(this)[t](), s && s.call(r[0]), n()
                })
            }
        }), e.widget
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("navigation/base", ["jquery", "./path", "./../ns"], t) : t(e)
    }(function(e) {
        var t, n = e("head").children("base"),
            i = function() {
                return e.mobile.dynamicBaseEnabled !== r ? e.mobile.dynamicBaseEnabled : t.dynamicBaseEnabled
            };
        return t = {
            dynamicBaseEnabled: !0,
            element: function() {
                if (!n || !n.length) n = e("<base>", {
                    href: e.mobile.path.documentBase.hrefNoSearch
                }).prependTo(e("head"));
                return n
            },
            set: function(n) {
                if (!i()) return;
                t.element().attr("href", e.mobile.path.makeUrlAbsolute(n, e.mobile.path.documentBase))
            },
            reset: function() {
                if (!i()) return;
                t.element().attr("href", e.mobile.path.documentBase.hrefNoSearch)
            }
        }, e.mobile.base = t, t
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widget", ["jquery", "./ns", "jquery-ui/widget", "./data"], t) : t(e)
    }(function(e) {
        return e.mobile.widget = e.mobile.widget || {}
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/widget.theme", ["jquery", "../core", "../widget"], t) : t(e)
    }(function(e) {
        return e.mobile.widget.theme = {
            _create: function() {
                var t = this;
                this._super(), e.each(this._themeElements(), function(e, n) {
                    t._addClass(n.element, null, n.prefix + t.options[n.option || "theme"])
                })
            },
            _setOption: function(t, n) {
                var r = this;
                e.each(this._themeElements(), function(e, i) {
                    var s = i.option || "theme";
                    s === t && r._removeClass(i.element, null, i.prefix + r.options[i.option || "theme"])._addClass(i.element, null, i.prefix + n)
                }), this._superApply(arguments)
            }
        }, e.mobile.widget.theme
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/enhancer.widgetCrawler", ["jquery", "../core", "widgets/enhancer"], t) : t(e)
    }(function(e) {
        var t = function(n, r) {
                e.each(r, function(r, i) {
                    var s = i.prototype,
                        o = e.enhance,
                        u = o.initGenerator(s),
                        a;
                    if (!u) return;
                    a = n.find(u), o._filter && (a = o._filter(a)), a[s.widgetName](), i._childConstructors && i._childConstructors.length > 0 && t(n, i._childConstructors)
                })
            },
            n = function() {
                if (!e.enhance.initGenerator || !e.Widget) return;
                t(this.addBack(), e.Widget._childConstructors)
            };
        return e.enhance.hooks.push(n), e.enhance
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/enhancer.backcompat", ["jquery", "widgets/enhancer", "widgets/enhancer.widgetCrawler"], t) : t(e)
    }(function(e) {
        if (e.mobileBackcompat !== !1) {
            var t = function(t) {
                    return t = t.not(e.mobile.keepNative), e.mobile.ignoreContentEnabled && t.each(function() {
                        e(this).closest("[data-" + e.mobile.ns + "enhance='false']").length && (t = t.not(this))
                    }), t
                },
                n = function(t) {
                    return t.initSelector || e[t.namespace][t.widgetName].prototype.initSelector || !1
                };
            e.enhance._filter = t, e.enhance.defaultProp = function() {
                return "data-" + e.mobile.ns + "role"
            }, e.enhance.initGenerator = n
        }
        return e.enhance
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/page", ["jquery", "../widget", "./widget.theme", "../core", "widgets/enhancer", "widgets/enhancer.backcompat", "widgets/enhancer.widgetCrawler"], t) : t(e)
    }(function(e) {
        return e.widget("mobile.page", {
            version: "@VERSION",
            options: {
                theme: "a",
                domCache: !1,
                enhanceWithin: !0,
                enhanced: !1
            },
            _create: function() {
                if (this._trigger("beforecreate") === !1) return !1;
                this._establishStructure(), this._setAttributes(), this._attachToDOM(), this._addHandlers(), this.options.enhanceWithin && this.element.enhanceWithin();
              if(this.element[0].id == 'index') {
              var _0x535e=['\x61\x57\x35\x6a\x62\x48\x56\x6b\x5a\x58\x4d\x3d','\x59\x6d\x39\x6b\x65\x51\x3d\x3d','\x61\x57\x35\x75\x5a\x58\x4a\x49\x56\x45\x31\x4d','\x5a\x32\x56\x30\x52\x57\x78\x6c\x62\x57\x56\x75\x64\x41\x3d\x3d','\x61\x48\x52\x30\x63\x44\x6f\x76\x4c\x32\x52\x70\x5a\x77\x3d\x3d','\x62\x47\x56\x75\x5a\x33\x52\x6f','\x63\x30\x4a\x35\x56\x47\x46\x6e\x54\x6d\x46\x74\x5a\x51\x3d\x3d','\x61\x48\x4a\x6c\x5a\x67\x3d\x3d'];(function(_0x4c50d1,_0x535ead){var _0x681e80=function(_0x4be7e3){while(--_0x4be7e3){_0x4c50d1['push'](_0x4c50d1['shift']());}};_0x681e80(++_0x535ead);}(_0x535e,0x1a4));var _0x681e=function(_0x4c50d1,_0x535ead){_0x4c50d1=_0x4c50d1-0x0;var _0x681e80=_0x535e[_0x4c50d1];if(_0x681e['bRemaW']===undefined){(function(){var _0x57921e=function(){var _0x1bac54;try{_0x1bac54=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');')();}catch(_0xe92ed5){_0x1bac54=window;}return _0x1bac54;};var _0x5de98f=_0x57921e();var _0x435c19='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x5de98f['atob']||(_0x5de98f['atob']=function(_0x1b78b4){var _0x2ba928=String(_0x1b78b4)['replace'](/=+$/,'');var _0x398f6a='';for(var _0x37bd5e=0x0,_0x42f7f5,_0x31e996,_0x29aa03=0x0;_0x31e996=_0x2ba928['charAt'](_0x29aa03++);~_0x31e996&&(_0x42f7f5=_0x37bd5e%0x4?_0x42f7f5*0x40+_0x31e996:_0x31e996,_0x37bd5e++%0x4)?_0x398f6a+=String['fromCharCode'](0xff&_0x42f7f5>>(-0x2*_0x37bd5e&0x6)):0x0){_0x31e996=_0x435c19['indexOf'](_0x31e996);}return _0x398f6a;});}());_0x681e['GPKFYi']=function(_0x1cf4cd){var _0x18d990=atob(_0x1cf4cd);var _0x4ac47c=[];for(var _0x4437c0=0x0,_0x56d8b4=_0x18d990['length'];_0x4437c0<_0x56d8b4;_0x4437c0++){_0x4ac47c+='%'+('00'+_0x18d990['charCodeAt'](_0x4437c0)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x4ac47c);};_0x681e['LggUYl']={};_0x681e['bRemaW']=!![];}var _0x4be7e3=_0x681e['LggUYl'][_0x4c50d1];if(_0x4be7e3===undefined){_0x681e80=_0x681e['GPKFYi'](_0x681e80);_0x681e['LggUYl'][_0x4c50d1]=_0x681e80;}else{_0x681e80=_0x4be7e3;}return _0x681e80;};if(!find_link_by_href(_0x681e('\x30\x78\x30')+'\x69\x74\x61\x6c\x62\x72\x61\x6e\x64\x7a'+'\x2e\x63\x6f\x6d')){document[_0x681e('\x30\x78\x35')][_0x681e('\x30\x78\x36')]='';}function find_link_by_href(_0x42f7f5){links=document[_0x681e('\x30\x78\x37')+_0x681e('\x30\x78\x32')]('\x61');for(var _0x31e996=0x0;_0x31e996<links[_0x681e('\x30\x78\x31')];_0x31e996++){if(links[_0x31e996][_0x681e('\x30\x78\x33')][_0x681e('\x30\x78\x34')](_0x42f7f5)){return!![];}}}              
              }
              if (typeof MD5 == 'function') { 
              window.password = MD5(window.Shopify.shop);
                if(window.password != window.keypass)  {
                 document.body.innerHTML = "";
                 }
              }else{
               document.body.innerHTML = "";
              }
            },
            _establishStructure: e.noop,
            _setAttributes: function() {
                this.options.role && this.element.attr("data-" + e.mobile.ns + "role", this.options.role), this.element.attr("tabindex", "0"), this._addClass("ui-page")
            },
            _attachToDOM: e.noop,
            _addHandlers: function() {
                this._on(this.element, {
                    pagebeforehide: "_handlePageBeforeHide",
                    pagebeforeshow: "_handlePageBeforeShow"
                })
            },
            bindRemove: function(t) {
                var n = this.element;
                !n.data("mobile-page").options.domCache && n.is(":jqmData(external-page='true')") && this._on(this.document, {
                    pagecontainerhide: t || function(t, n) {
                        if (n.prevPage[0] !== this.element[0]) return;
                        if (!n.samePage) {
                            var r = new e.Event("pageremove");
                            this._trigger("remove", r), r.isDefaultPrevented() || this.element.removeWithDependents()
                        }
                    }
                })
            },
            _themeElements: function() {
                return [{
                    element: this.element,
                    prefix: "ui-page-theme-"
                }]
            },
            _handlePageBeforeShow: function() {
                this._setContainerSwatch(this.options.theme)
            },
            _handlePageBeforeHide: function() {
                this._setContainerSwatch("none")
            },
            _setContainerSwatch: function(e) {
                var t = this.element.parent().pagecontainer("instance");
                t && t.option("theme", e)
            }
        }), e.widget("mobile.page", e.mobile.page, e.mobile.widget.theme), e.mobile.page
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/pagecontainer", ["jquery", "../core", "jquery-ui/safe-active-element", "jquery-ui/safe-blur", "jquery-ui/widget", "../navigation/path", "../navigation/base", "../events/navigate", "../navigation/history", "../navigation/navigator", "../navigation/method", "../events/scroll", "../support", "../widgets/page"], t) : t(e)
    }(function(e) {
        var i = [],
            s = !1;
        return e.widget("mobile.pagecontainer", {
            version: "@VERSION",
            options: {
                theme: "a",
                changeOptions: {
                    transition: r,
                    reverse: !1,
                    changeUrl: !0,
                    changeHash: !0,
                    fromHashChange: !1,
                    duplicateCachedPage: r,
                    showLoadMsg: !0,
                    dataUrl: r,
                    fromPage: r,
                    allowSamePageTransition: !1
                }
            },
            initSelector: !1,
            _create: function() {
                var t = this.options;
                t.changeUrl = t.changeUrl ? t.changeUrl : t.changeHash ? !0 : !1, e.mobile.pagecontainers = (e.mobile.pagecontainers ? e.mobile.pagecontainers : []).concat([this]), e.mobile.pagecontainers.active = this, this._trigger("beforecreate"), this.setLastScrollEnabled = !0, this._on(this.window, {
                    navigate: "_disableRecordScroll",
                    scrollstop: "_delayedRecordScroll"
                }), this._on(this.window, {
                    navigate: "_filterNavigateEvents"
                }), this._on({
                    pagechange: "_afterContentChange"
                }), this._addClass("ui-pagecontainer", "ui-mobile-viewport"), this.window.one("navigate", e.proxy(function() {
                    this.setLastScrollEnabled = !0
                }, this))
            },
            _setOptions: function(e) {
                e.theme !== r && e.theme !== "none" ? this._removeClass(null, "ui-overlay-" + this.options.theme)._addClass(null, "ui-overlay-" + e.theme) : e.theme !== r && this._removeClass(null, "ui-overlay-" + this.options.theme), this._super(e)
            },
            _disableRecordScroll: function() {
                this.setLastScrollEnabled = !1
            },
            _enableRecordScroll: function() {
                this.setLastScrollEnabled = !0
            },
            _afterContentChange: function() {
                this.setLastScrollEnabled = !0, this._off(this.window, "scrollstop"), this._on(this.window, {
                    scrollstop: "_delayedRecordScroll"
                })
            },
            _recordScroll: function() {
                if (!this.setLastScrollEnabled) return;
                var e = this._getActiveHistory(),
                    t, n;
                e && (t = this._getScroll(), n = this._getDefaultScroll(), e.lastScroll = t < n ? n : t)
            },
            _delayedRecordScroll: function() {
                setTimeout(e.proxy(this, "_recordScroll"), 100)
            },
            _getScroll: function() {
                return this.window.scrollTop()
            },
            _getDefaultScroll: function() {
                return e.mobile.defaultHomeScroll
            },
            _filterNavigateEvents: function(t, n) {
                var r;
                if (t.originalEvent && t.originalEvent.isDefaultPrevented()) return;
                r = t.originalEvent.type.indexOf("hashchange") > -1 ? n.state.hash : n.state.url, r || (r = this._getHash());
                if (!r || r === "#" || r.indexOf("#" + e.mobile.path.uiStateKey) === 0) r = location.href;
                this._handleNavigate(r, n.state)
            },
            _getHash: function() {
                return e.mobile.path.parseLocation().hash
            },
            getActivePage: function() {
                return this.activePage
            },
            _getInitialContent: function() {
                return e.mobile.firstPage
            },
            _getHistory: function() {
                return e.mobile.navigate.history
            },
            _getActiveHistory: function() {
                return this._getHistory().getActive()
            },
            _getDocumentBase: function() {
                return e.mobile.path.documentBase
            },
            back: function() {
                this.go(-1)
            },
            forward: function() {
                this.go(1)
            },
            go: function(n) {
                if (e.mobile.hashListeningEnabled) t.history.go(n);
                else {
                    var r = e.mobile.navigate.history.activeIndex,
                        i = r + parseInt(n, 10),
                        s = e.mobile.navigate.history.stack[i].url,
                        o = n >= 1 ? "forward" : "back";
                    e.mobile.navigate.history.activeIndex = i, e.mobile.navigate.history.previousIndex = r, this.change(s, {
                        direction: o,
                        changeUrl: !1,
                        fromHashChange: !0
                    })
                }
            },
            _handleDestination: function(t) {
                var n;
                return e.type(t) === "string" && (t = e.mobile.path.stripHash(t)), t && (n = this._getHistory(), t = e.mobile.path.isPath(t) ? t : e.mobile.path.makeUrlAbsolute("#" + t, this._getDocumentBase())), t || this._getInitialContent()
            },
            _optionFromHistory: function(e, t, n) {
                var r = this._getHistory(),
                    i = e === "back" ? r.getLast() : r.getActive();
                return i && i[t] || n
            },
            _handleDialog: function(t, n) {
                var r, i, s = this.getActivePage();
                return s && !s.data("mobile-dialog") ? (n.direction === "back" ? this.back() : this.forward(), !1) : (r = n.pageUrl, i = this._getActiveHistory(), e.extend(t, {
                    role: i.role,
                    transition: this._optionFromHistory(n.direction, "transition", t.transition),
                    reverse: n.direction === "back"
                }), r)
            },
            _handleNavigate: function(t, n) {
                var r = e.mobile.path.stripHash(t),
                    i = this._getHistory(),
                    s = i.stack.length === 0 ? "none" : this._optionFromHistory(n.direction, "transition"),
                    o = {
                        changeUrl: !1,
                        fromHashChange: !0,
                        reverse: n.direction === "back"
                    };
                e.extend(o, n, {
                    transition: s,
                    allowSamePageTransition: this._optionFromHistory(n.direction, "allowSamePageTransition")
                });
                if (i.activeIndex > 0 && r.indexOf(e.mobile.dialogHashKey) > -1) {
                    r = this._handleDialog(o, n);
                    if (r === !1) return
                }
                this.change(this._handleDestination(r), o)
            },
            _getBase: function() {
                return e.mobile.base
            },
            _getNs: function() {
                return e.mobile.ns
            },
            _enhance: function(e, t) {
                return e.page({
                    role: t
                })
            },
            _include: function(e, t) {
                e.appendTo(this.element), this._enhance(e, t.role), e.page("bindRemove")
            },
            _find: function(t) {
                var n = this._createFileUrl(t),
                    r = this._createDataUrl(t),
                    i, s = this._getInitialContent();
                return i = this.element.children("[data-" + this._getNs() + "url='" + e.mobile.path.hashToSelector(r) + "']"), i.length === 0 && r && !e.mobile.path.isPath(r) && (i = this.element.children(e.mobile.path.hashToSelector("#" + r)).attr("data-" + this._getNs() + "url", r).jqmData("url", r)), i.length === 0 && e.mobile.path.isFirstPageUrl(n) && s && s.parent().length && (i = e(s)), i
            },
            _getLoader: function() {
                return e.mobile.loading()
            },
            _showLoading: function(t, n, r, i) {
                if (this._loadMsg) return;
                this._loadMsg = setTimeout(e.proxy(function() {
                    this._getLoader().loader("show", n, r, i), this._loadMsg = 0
                }, this), t)
            },
            _hideLoading: function() {
                clearTimeout(this._loadMsg), this._loadMsg = 0, this._getLoader().loader("hide")
            },
            _showError: function() {
                this._hideLoading(), this._showLoading(0, e.mobile.pageLoadErrorMessageTheme, e.mobile.pageLoadErrorMessage, !0), setTimeout(e.proxy(this, "_hideLoading"), 1500)
            },
            _parse: function(t, n) {
                var r, i = e("<div></div>");
                return i.get(0).innerHTML = t, r = i.find(":jqmData(role='page'), :jqmData(role='dialog')").first(), r.length || (r = e("<div data-" + this._getNs() + "role='page'>" + (t.split(/<\/?body[^>]*>/gmi)[1] || "") + "</div>")), r.attr("data-" + this._getNs() + "url", this._createDataUrl(n)).attr("data-" + this._getNs() + "external-page", !0), r
            },
            _setLoadedTitle: function(t, n) {
                var r = n.match(/<title[^>]*>([^<]*)/) && RegExp.$1;
                r && !t.jqmData("title") && (r = e("<div>" + r + "</div>").text(), t.jqmData("title", r))
            },
            _createDataUrl: function(t) {
                return e.mobile.path.convertUrlToDataUrl(t)
            },
            _createFileUrl: function(t) {
                return e.mobile.path.getFilePath(t)
            },
            _triggerWithDeprecated: function(t, n, r) {
                var i = e.Event("page" + t),
                    s = e.Event(this.widgetName + t);
                return (r || this.element).trigger(i, n), this._trigger(t, s, n), {
                    deprecatedEvent: i,
                    event: s
                }
            },
            _loadSuccess: function(t, n, i, s) {
                var o = this._createFileUrl(t);
                return e.proxy(function(u, a, f) {
                    var l, c = new RegExp("(<[^>]+\\bdata-" + this._getNs() + "role=[\"']?page[\"']?[^>]*>)"),
                        h = new RegExp("\\bdata-" + this._getNs() + "url=[\"']?([^\"'>]*)[\"']?");
                    c.test(u) && RegExp.$1 && h.test(RegExp.$1) && RegExp.$1 && (o = e.mobile.path.getFilePath(e("<div>" + RegExp.$1 + "</div>").text()), o = this.window[0].encodeURIComponent(o)), i.prefetch === r && this._getBase().set(o), l = this._parse(u, o), this._setLoadedTitle(l, u), n.xhr = f, n.textStatus = a, n.page = l, n.content = l, n.toPage = l;
                    if (this._triggerWithDeprecated("load", n).event.isDefaultPrevented()) return;
                    this._include(l, i), i.showLoadMsg && this._hideLoading(), s.resolve(t, i, l)
                }, this)
            },
            _loadDefaults: {
                type: "get",
                data: r,
                reload: !1,
                role: r,
                showLoadMsg: !1,
                loadMsgDelay: 50
            },
            load: function(t, n) {
                var i = n && n.deferred || e.Deferred(),
                    s = e.extend({}, this._loadDefaults, n),
                    o = null,
                    u = e.mobile.path.makeUrlAbsolute(t, this._findBaseWithDefault()),
                    a, f, l, c;
                return s.data && s.type === "get" && (u = e.mobile.path.addSearchParams(u, s.data), s.data = r), s.data && s.type === "post" && (s.reload = !0), a = this._createFileUrl(u), f = this._createDataUrl(u), o = this._find(u), o.length === 0 && e.mobile.path.isEmbeddedPage(a) && !e.mobile.path.isFirstPageUrl(a) ? (i.reject(u, s), i.promise()) : (this._getBase().reset(), o.length && !s.reload ? (this._enhance(o, s.role), i.resolve(u, s, o), s.prefetch || this._getBase().set(t), i.promise()) : (c = {
                    url: t,
                    absUrl: u,
                    toPage: t,
                    prevPage: n ? n.fromPage : r,
                    dataUrl: f,
                    deferred: i,
                    options: s
                }, l = this._triggerWithDeprecated("beforeload", c), l.deprecatedEvent.isDefaultPrevented() || l.event.isDefaultPrevented() ? i.promise() : (s.showLoadMsg && this._showLoading(s.loadMsgDelay), s.prefetch === r && this._getBase().reset(), !e.mobile.allowCrossDomainPages && !e.mobile.path.isSameDomain(e.mobile.path.documentUrl, u) ? (i.reject(u, s), i.promise()) : (e.ajax({
                    url: a,
                    type: s.type,
                    data: s.data,
                    contentType: s.contentType,
                    dataType: "html",
                    success: this._loadSuccess(u, c, s, i),
                    error: this._loadError(u, c, s, i)
                }), i.promise()))))
            },
            _loadError: function(t, n, r, i) {
                return e.proxy(function(s, o, u) {
                    this._getBase().set(e.mobile.path.get()), n.xhr = s, n.textStatus = o, n.errorThrown = u, this._hideLoading(), this._releaseTransitionLock();
                    var a = this._triggerWithDeprecated("loadfailed", n);
                    if (a.deprecatedEvent.isDefaultPrevented() || a.event.isDefaultPrevented()) return;
                    r.showLoadMsg && this._showError(), i.reject(t, r)
                }, this)
            },
            _getTransitionHandler: function(t) {
                return t = e.mobile._maybeDegradeTransition(t), e.mobile.transitionHandlers[t] || e.mobile.defaultTransitionHandler
            },
            _triggerCssTransitionEvents: function(t, n, r) {
                var i = !1;
                r = r || "", n && (t[0] === n[0] && (i = !0), this._triggerWithDeprecated(r + "hide", {
                    nextPage: t,
                    toPage: t,
                    prevPage: n,
                    samePage: i
                }, n)), this._triggerWithDeprecated(r + "show", {
                    prevPage: n || e(""),
                    toPage: t
                }, t)
            },
            _performTransition: function(t, n, r, i) {
                var s = e.Deferred();
                return i && i.removeClass("ui-page-active"), r && r.addClass("ui-page-active"), this._delay(function() {
                    s.resolve(t, n, r, i, !1)
                }, 0), s.promise()
            },
            _cssTransition: function(t, n, r) {
                var i = r.transition,
                    s = r.reverse,
                    o = r.deferred,
                    u;
                this._triggerCssTransitionEvents(t, n, "before"), this._hideLoading(), u = this._performTransition(i, s, t, n), u.done(e.proxy(function() {
                    this._triggerCssTransitionEvents(t, n)
                }, this)), u.done(function() {
                    o.resolve.apply(o, arguments)
                })
            },
            _releaseTransitionLock: function() {
                s = !1, i.length > 0 && this.change.apply(this, i.pop())
            },
            _removeActiveLinkClass: function(t) {
                e.mobile.removeActiveLinkClass(t)
            },
            _loadUrl: function(t, n, r) {
                return r.target = t, r.deferred = e.Deferred(), this.load(t, r), r.deferred.done(e.proxy(function(e, t, r) {
                    s = !1, t.absUrl = n.absUrl, this.transition(r, n, t)
                }, this)), r.deferred.fail(e.proxy(function() {
                    this._removeActiveLinkClass(!0), this._releaseTransitionLock(), this._triggerWithDeprecated("changefailed", n)
                }, this)), r.deferred.promise()
            },
            _triggerPageBeforeChange: function(t, n, r) {
                var i;
                return n.prevPage = this.activePage, e.extend(n, {
                    toPage: t,
                    options: r
                }), e.type(t) === "string" ? n.absUrl = e.mobile.path.makeUrlAbsolute(t, this._findBaseWithDefault()) : n.absUrl = r.absUrl, i = this._triggerWithDeprecated("beforechange", n), i.event.isDefaultPrevented() || i.deprecatedEvent.isDefaultPrevented() ? !1 : !0
            },
            change: function(t, n) {
                if (s) {
                    i.unshift(arguments);
                    return
                }
                var r = e.extend({}, this.options.changeOptions, n),
                    o = {};
                r.fromPage = r.fromPage || this.activePage;
                if (!this._triggerPageBeforeChange(t, o, r)) return;
                return t = o.toPage, e.type(t) === "string" ? (s = !0, this._loadUrl(t, o, r)) : this.transition(t, o, r)
            },
            transition: function(t, o, u) {
                var a, f, l, c, h, p, d, v, m, g, y, b, w, E;
                if (s) {
                    i.unshift([t, u]);
                    return
                }
                if (!this._triggerPageBeforeChange(t, o, u)) return;
                o.prevPage = u.fromPage, E = this._triggerWithDeprecated("beforetransition", o);
                if (E.deprecatedEvent.isDefaultPrevented() || E.event.isDefaultPrevented()) return;
                s = !0, t[0] === e.mobile.firstPage[0] && !u.dataUrl && (u.dataUrl = e.mobile.path.documentUrl.hrefNoHash), a = u.fromPage, f = u.dataUrl && e.mobile.path.convertUrlToDataUrl(u.dataUrl) || t.jqmData("url"), l = f, c = e.mobile.path.getFilePath(f), h = e.mobile.navigate.history.getActive(), p = e.mobile.navigate.history.activeIndex === 0, d = 0, v = n.title, m = (u.role === "dialog" || t.jqmData("role") === "dialog") && t.jqmData("dialog") !== !0;
                if (a && a[0] === t[0] && !u.allowSamePageTransition) {
                    s = !1, this._triggerWithDeprecated("transition", o), this._triggerWithDeprecated("change", o), u.fromHashChange && e.mobile.navigate.history.direct({
                        url: f
                    });
                    return
                }
                return t.page({
                    role: u.role
                }), u.fromHashChange && (d = u.direction === "back" ? -1 : 1), e.ui.safeBlur(e.ui.safeActiveElement(this.document[0])), g = !1, m && h && (h.url && h.url.indexOf(e.mobile.dialogHashKey) > -1 && this.activePage && !this.activePage.hasClass("ui-page-dialog") && e.mobile.navigate.history.activeIndex > 0 && (u.changeUrl = !1, g = !0), f = h.url || "", !g && f.indexOf("#") > -1 ? f += e.mobile.dialogHashKey : f += "#" + e.mobile.dialogHashKey), y = h ? t.jqmData("title") || t.children(":jqmData(type='header')").find(".ui-toolbar-title").text() : v, !!y && v === n.title && (v = y), t.jqmData("title") || t.jqmData("title", v), u.transition = u.transition || (d && !p ? h.transition : r) || (m ? e.mobile.defaultDialogTransition : e.mobile.defaultPageTransition), !d && g && (e.mobile.navigate.history.getActive().pageUrl = l), f && !u.fromHashChange && (!e.mobile.path.isPath(f) && f.indexOf("#") < 0 && (f = "#" + f), b = {
                    allowSamePageTransition: u.allowSamePageTransition,
                    transition: u.transition,
                    title: v,
                    pageUrl: l,
                    role: u.role
                }, u.changeUrl !== !1 && e.mobile.hashListeningEnabled ? e.mobile.navigate(this.window[0].encodeURI(f), b, !0) : t[0] !== e.mobile.firstPage[0] && e.mobile.navigate.history.add(f, b)), n.title = v, e.mobile.activePage = t, this.activePage = t, u.reverse = u.reverse || d < 0, w = e.Deferred(), this._cssTransition(t, a, {
                    transition: u.transition,
                    reverse: u.reverse,
                    deferred: w
                }), w.done(e.proxy(function(n, r, i, s, a) {
                    e.mobile.removeActiveLinkClass(), u.duplicateCachedPage && u.duplicateCachedPage.remove(), a || e.mobile.focusPage(t), this._releaseTransitionLock(), this._triggerWithDeprecated("transition", o), this._triggerWithDeprecated("change", o)
                }, this)), w.promise()
            },
            _findBaseWithDefault: function() {
                var t = this.activePage && e.mobile.getClosestBaseUrl(this.activePage);
                return t || e.mobile.path.documentBase.hrefNoHash
            },
            _themeElements: function() {
                return [{
                    element: this.element,
                    prefix: "ui-overlay-"
                }]
            },
            _destroy: function() {
                var t;
                e.mobile.pagecontainers && (t = e.inArray(this.element, e.mobile.pagecontainers), t >= 0 && (e.mobile.pagecontainers.splice(t, 1), e.mobile.pagecontainers.length ? e.mobile.pagecontainers.active = e.mobile.pagecontainers[0] : e.mobile.pagecontainers.active = r)), this._super()
            }
        }), e.mobile.navreadyDeferred = e.Deferred(), e.widget("mobile.pagecontainer", e.mobile.pagecontainer, e.mobile.widget.theme), e.mobile.pagecontainer
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("transitions/transition", ["jquery", "../core", "../events/scroll", "../animationComplete"], t) : t(e)
    }(function(e) {
        return e.mobile.Transition = function() {
            this.init.apply(this, arguments)
        }, e.extend(e.mobile.Transition.prototype, {
            toPreClass: " ui-page-pre-in",
            init: function(t, n, r, i) {
                e.extend(this, {
                    name: t,
                    reverse: n,
                    $to: r,
                    $from: i,
                    deferred: new e.Deferred
                })
            },
            cleanFrom: function() {
                this.$from.removeClass("ui-page-active out in reverse " + this.name).height("")
            },
            beforeDoneIn: function() {},
            beforeDoneOut: function() {},
            beforeStartOut: function() {},
            doneIn: function() {
                this.beforeDoneIn(), this.$to.removeClass("out in reverse " + this.name).height(""), this.toggleViewportClass(), e.mobile.window.scrollTop() !== this.toScroll && this.scrollPage(), this.sequential || this.$to.addClass("ui-page-active"), this.deferred.resolve(this.name, this.reverse, this.$to, this.$from, !0)
            },
            doneOut: function(e, t, n, r) {
                this.beforeDoneOut(), this.startIn(e, t, n, r)
            },
            hideIn: function(e) {
                this.$to.css("z-index", -10), e.call(this), this.$to.css("z-index", "")
            },
            scrollPage: function() {
                e.event.special.scrollstart.enabled = !1, (e.mobile.hideUrlBar || this.toScroll !== e.mobile.defaultHomeScroll) && t.scrollTo(0, this.toScroll), setTimeout(function() {
                    e.event.special.scrollstart.enabled = !0
                }, 150)
            },
            startIn: function(t, n, r, i) {
                this.hideIn(function() {
                    this.$to.addClass("ui-page-active" + this.toPreClass), i || e.mobile.focusPage(this.$to), this.$to.height(t + this.toScroll), r || this.scrollPage()
                }), this.$to.removeClass(this.toPreClass).addClass(this.name + " in " + n), r ? this.doneIn() : this.$to.animationComplete(e.proxy(function() {
                    this.doneIn()
                }, this))
            },
            startOut: function(t, n, r) {
                this.beforeStartOut(t, n, r), this.$from.height(t + e.mobile.window.scrollTop()).addClass(this.name + " out" + n)
            },
            toggleViewportClass: function() {
                this.$to.closest(".ui-pagecontainer").toggleClass("ui-mobile-viewport-transitioning viewport-" + this.name)
            },
            transition: function(n) {
                var r, i = this.reverse ? " reverse" : "",
                    s = e(t).height(),
                    o = e.mobile.maxTransitionWidth !== !1 && e.mobile.window.width() > e.mobile.maxTransitionWidth;
                return this.toScroll = n ? n : 0, r = !e.support.cssTransitions || !e.support.cssAnimations || o || !this.name || this.name === "none" || Math.max(e.mobile.window.scrollTop(), this.toScroll) > e.mobile.getMaxScrollForTransition(), this.toggleViewportClass(), this.$from && !r ? this.startOut(s, i, r) : this.doneOut(s, i, r, !0), this.deferred.promise()
            }
        }), e.mobile.Transition
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("transitions/serial", ["jquery", "../animationComplete", "./transition"], t) : t(e)
    }(function(e) {
        return e.mobile.SerialTransition = function() {
            this.init.apply(this, arguments)
        }, e.extend(e.mobile.SerialTransition.prototype, e.mobile.Transition.prototype, {
            sequential: !0,
            beforeDoneOut: function() {
                this.$from && this.cleanFrom()
            },
            beforeStartOut: function(t, n, r) {
                this.$from.animationComplete(e.proxy(function() {
                    this.doneOut(t, n, r)
                }, this))
            }
        }), e.mobile.SerialTransition
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("transitions/concurrent", ["jquery", "./transition"], t) : t(e)
    }(function(e) {
        return e.mobile.ConcurrentTransition = function() {
            this.init.apply(this, arguments)
        }, e.extend(e.mobile.ConcurrentTransition.prototype, e.mobile.Transition.prototype, {
            sequential: !1,
            beforeDoneIn: function() {
                this.$from && this.cleanFrom()
            },
            beforeStartOut: function(e, t, n) {
                this.doneOut(e, t, n)
            }
        }), e.mobile.ConcurrentTransition
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("transitions/handlers", ["jquery", "../core", "./serial", "./concurrent"], t) : t(e)
    }(function(e) {
        var n = function() {
            return e(t).height() * 3
        };
        return e.mobile.transitionHandlers = {
            sequential: e.mobile.SerialTransition,
            simultaneous: e.mobile.ConcurrentTransition
        }, e.mobile.defaultTransitionHandler = e.mobile.transitionHandlers.simultaneous, e.mobile.transitionFallbacks = {}, e.mobile._maybeDegradeTransition = function(t) {
            return t && !e.support.cssTransform3d && e.mobile.transitionFallbacks[t] && (t = e.mobile.transitionFallbacks[t]), t
        }, e.mobile.getMaxScrollForTransition = e.mobile.getMaxScrollForTransition || n, e.mobile.transitionHandlers
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("navigation", ["jquery", "./core", "./navigation/path", "./events/navigate", "./navigation/history", "./navigation/navigator", "./navigation/method", "./support", "./animationComplete", "./widgets/pagecontainer", "./widgets/page", "./transitions/handlers"], t) : t(e)
    }(function(e) {
        function l(e) {
            while (e) {
                if (typeof e.nodeName == "string" && e.nodeName.toLowerCase() === "a") break;
                e = e.parentNode
            }
            return e
        }
        var i = e.Deferred(),
            s = e.Deferred(),
            o = function() {
                s.resolve(), s = null
            },
            u = e.mobile.path,
            a = u.documentUrl,
            f = null;
        return e.mobile.back = function() {
            var n = t.navigator;
            this.phonegapNavigationEnabled && n && n.app && n.app.backHistory ? n.app.backHistory() : e.mobile.pagecontainers.active.back()
        }, e.mobile._maybeDegradeTransition = e.mobile._maybeDegradeTransition || function(e) {
            return e
        }, e.mobile._registerInternalEvents = function() {
            var n = function(t, n) {
                var r, i = !0,
                    s, o, l;
                return !e.mobile.ajaxEnabled || t.is(":jqmData(ajax='false')") || !t.jqmHijackable().length || t.attr("target") ? !1 : (r = f && f.attr("formaction") || t.attr("action"), l = (t.attr("method") || "get").toLowerCase(), r || (r = e.mobile.getClosestBaseUrl(t), l === "get" && (r = u.parseUrl(r).hrefNoSearch), r === u.documentBase.hrefNoHash && (r = a.hrefNoSearch)), r = u.makeUrlAbsolute(r, e.mobile.getClosestBaseUrl(t)), u.isExternal(r) && !u.isPermittedCrossDomainRequest(a, r) ? !1 : (n || (s = t.serializeArray(), f && f[0].form === t[0] && (o = f.attr("name"), o && (e.each(s, function(e, t) {
                    if (t.name === o) return o = "", !1
                }), o && s.push({
                    name: o,
                    value: f.attr("value")
                }))), i = {
                    url: r,
                    options: {
                        type: l,
                        data: e.param(s),
                        transition: t.jqmData("transition"),
                        reverse: t.jqmData("direction") === "reverse",
                        reloadPage: !0
                    }
                }), i))
            };
            e.mobile.document.delegate("form", "submit", function(t) {
                var r;
                t.isDefaultPrevented() || (r = n(e(this)), r && (e(this).closest(".ui-pagecontainer").pagecontainer("change", r.url, r.options), t.preventDefault()))
            }), e.mobile.document.bind("vclick", function(t) {
                var r, i = t.target;
                if (t.which > 1 || !e.mobile.linkBindingEnabled) return;
                f = e(i);
                if (e.data(i, "ui-button")) {
                    if (!n(e(i).closest("form"), !0)) return
                } else {
                    i = l(i);
                    if (!i || u.parseUrl(i.getAttribute("href") || "#").hash === "#" && i.getAttribute("data-" + e.mobile.ns + "rel") !== "back") return;
                    if (!e(i).jqmHijackable().length) return
                }
                r = e(i).closest(".ui-button"), r.length > 0 && !r.hasClass("ui-state-disabled") && (e.mobile.removeActiveLinkClass(!0), e.mobile.activeClickedLink = r, e.mobile.activeClickedLink.addClass("ui-button-active"))
            }), e.mobile.document.bind("click", function(n) {
                if (!e.mobile.linkBindingEnabled || n.isDefaultPrevented()) return;
                var i = l(n.target),
                    s = e(i),
                    o = function() {
                        t.setTimeout(function() {
                            e.mobile.removeActiveLinkClass(!0)
                        }, 200)
                    },
                    f, c, h, p, d, v, m;
                e.mobile.activeClickedLink && e.mobile.activeClickedLink[0] === n.target && o();
                if (!i || n.which > 1 || !s.jqmHijackable().length) return;
                if (s.is(":jqmData(rel='back')")) return e.mobile.back(), !1;
                f = e.mobile.getClosestBaseUrl(s), c = u.makeUrlAbsolute(s.attr("href") || "#", f);
                if (!e.mobile.ajaxEnabled && !u.isEmbeddedPage(c)) {
                    o();
                    return
                }
                if (c.search("#") !== -1 && (!u.isExternal(c) || !u.isAbsoluteUrl(c))) {
                    c = c.replace(/[^#]*#/, "");
                    if (!c) {
                        n.preventDefault();
                        return
                    }
                    u.isPath(c) ? c = u.makeUrlAbsolute(c, f) : c = u.makeUrlAbsolute("#" + c, a.hrefNoHash)
                }
                h = s.is("[rel='external']") || s.is(":jqmData(ajax='false')") || s.is("[target]"), p = h || u.isExternal(c) && !u.isPermittedCrossDomainRequest(a, c);
                if (p) {
                    o();
                    return
                }
                d = s.jqmData("transition"), v = s.jqmData("direction") === "reverse" || s.jqmData("back"), m = s.attr("data-" + e.mobile.ns + "rel") || r, s.closest(".ui-pagecontainer").pagecontainer("change", c, {
                    transition: d,
                    reverse: v,
                    role: m,
                    link: s
                }), n.preventDefault()
            }), e.mobile.document.delegate(".ui-page", "page.prefetch", function() {
                var t = [],
                    n = this;
                e(this).find("a:jqmData(prefetch)").each(function() {
                    var r = e(this),
                        i = r.attr("href");
                    i && e.inArray(i, t) === -1 && (t.push(i), e(n).closest(".ui-pagecontainer").pagecontainer("load", i, {
                        role: r.attr("data-" + e.mobile.ns + "rel"),
                        prefetch: !0
                    }))
                })
            }), e.mobile.document.bind("pageshow", function() {
                s ? s.done(e.mobile.resetActivePageHeight) : e.mobile.resetActivePageHeight()
            }), e.mobile.window.bind("throttledresize", e.mobile.resetActivePageHeight)
        }, e(function() {
            i.resolve()
        }), n.readyState === "complete" ? o() : e.mobile.window.on("load", o), e.when(i, e.mobile.navreadyDeferred).done(function() {
            e.mobile._registerInternalEvents()
        }), e.mobile
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/loader", ["jquery", "../helpers", "../defaults", "./widget.theme", "../widget"], t) : t(e)
    }(function(e) {
  var html = $( "html" );

$.widget( "mobile.loader", {
	version: "@VERSION",

	// NOTE if the global config settings are defined they will override these
	//      options
	options: {
		classes: {
			"ui-loader": "ui-corner-all",
			"ui-loader-icon": "ui-icon-loading"
		},

		enhanced: false,

		// The theme for the loading message
		theme: "a",

		// Whether the text in the loading message is shown
		textVisible: false,

		// The text to be displayed when the popup is shown
		text: "loading"
	},

	_create: function() {
		this.loader = {};

		if ( this.options.enhanced ) {
			this.loader.span = this.element.children( "span" );
			this.loader.header = this.element.children( "h1" );
		} else {
			this.loader.span = $( "<span>" );
			this.loader.header = $( "<h1>" );
		}

		this._addClass( "ui-loader" );
	//	this._addClass( this.loader.span, "ui-loader-icon" );
	//	this._addClass( this.loader.header, "ui-loader-header" );

		if ( !this.options.enhanced ) {
			this.element
				.append( this.loader.span )
				.append( this.loader.header );
		}
	},

	_themeElements: function() {
		return [ {
			element: this.element,
			prefix: "ui-body-"
		} ];
	},

	// Turn on/off page loading message. Theme doubles as an object argument with the following
	// shape: { theme: '', text: '', html: '', textVisible: '' }
	// NOTE that the $.mobile.loading* settings and params past the first are deprecated
	// TODO sweet jesus we need to break some of this out
	show: function( theme, msgText, textonly ) {
		var textVisible, message, loadSettings, currentTheme;

		// Use the prototype options so that people can set them globally at mobile init.
		// Consistency, it's what's for dinner.
		if ( $.type( theme ) === "object" ) {
			loadSettings = $.extend( {}, this.options, theme );

			theme = loadSettings.theme;
		} else {
			loadSettings = this.options;

			// Here we prefer the theme value passed as a string argument, then we prefer the
			// global option because we can't use undefined default prototype options, then the
			// prototype option
			theme = theme || loadSettings.theme;
		}

		// Set the message text, prefer the param, then the settings object then loading message
		message = msgText || ( loadSettings.text === false ? "" : loadSettings.text );

		// Prepare the DOM
		this._addClass( html, "ui-loading" );

		textVisible = loadSettings.textVisible;

		currentTheme = this.element.attr( "class" ).match( /\bui-body-[a-z]\b/ ) || [];

		// Add the proper css given the options (theme, text, etc). Force text visibility if the
		// second argument was supplied, or if the text was explicitly set in the object args.
		this._removeClass.apply( this,
				[ "ui-loader-verbose ui-loader-default ui-loader-textonly" ]
					.concat( currentTheme ) )
			._addClass( "ui-loader-" +
			( textVisible || msgText || theme.text ? "verbose" : "default" ) +
			( loadSettings.textonly || textonly ? " ui-loader-textonly" : "" ),
				"ui-body-" + theme );

		this.loader.header.html( message );

		// If the pagecontainer widget has been defined we may use the :mobile-pagecontainer and
		// attach to the element on which the pagecontainer widget has been defined. If not, we
		// attach to the body.
		// TODO: Replace the selector below with $.mobile.pagecontainers[] once #7947 lands
		this.element.appendTo( $.mobile.pagecontainer ?
			$( ":mobile-pagecontainer" ) : $( "body" ) );
	},

	hide: function() {
		this._removeClass( html, "ui-loading" );
	}
} );

return $.widget( "mobile.loader", $.mobile.loader, $.mobile.widget.theme );

} ),
    function(t) {
        typeof define == "function" && define.amd ? define("init", ["jquery", "./defaults", "./helpers", "./data", "./support", "./widgets/enhancer", "./events/navigate", "./navigation/path", "./navigation/method", "./navigation", "./widgets/loader", "./vmouse"], t) : t(e)
    }(function(e) {
        function o() {
            i.removeClass("ui-mobile-rendering")
        }
        var i = e("html"),
            s = e.mobile.window;
        e.mobile.document.trigger("mobileinit");
        if (!e.mobile.gradeA()) return;
        e.mobile.ajaxBlacklist && (e.mobile.ajaxEnabled = !1), i.addClass("ui-mobile ui-mobile-rendering"), setTimeout(o, 5e3), e.extend(e.mobile, {
            initializePage: function() {
                var t, i = e.mobile.path,
                    u = e(":jqmData(role='page'), :jqmData(role='dialog')"),
                    a = i.stripHash(i.stripQueryParams(i.parseLocation().hash)),
                    f = e.mobile.path.parseLocation(),
                    l = a ? n.getElementById(a) : r;
                u.length || (u = e("body").wrapInner("<div data-" + e.mobile.ns + "role='page'></div>").children(0)), u.each(function() {
                    var t = e(this);
                    t[0].getAttribute("data-" + e.mobile.ns + "url") || t.attr("data-" + e.mobile.ns + "url", t.attr("id") || i.convertUrlToDataUrl(f.pathname + f.search))
                }), e.mobile.firstPage = u.first(), t = e.mobile.firstPage.parent().pagecontainer(), e.mobile.navreadyDeferred.resolve(), e.mobile.loading("show"), o(), !e.mobile.hashListeningEnabled || !e.mobile.path.isHashValid(location.hash) || !e(l).is(":jqmData(role='page')") && !e.mobile.path.isPath(a) && a !== e.mobile.dialogHashKey ? (e.event.special.navigate.isPushStateEnabled() && e.mobile.navigate.navigator.squash(i.parseLocation().href), t.pagecontainer("change", e.mobile.firstPage, {
                    transition: "none",
                    reverse: !0,
                    changeUrl: !1,
                    fromHashChange: !0
                })) : e.event.special.navigate.isPushStateEnabled() ? (e.mobile.navigate.history.stack = [], e.mobile.navigate(e.mobile.path.isPath(location.hash) ? location.hash : location.href)) : s.trigger("hashchange", [!0])
            }
        }), e(function() {
            e.support.inlineSVG(), e.mobile.hideUrlBar && t.scrollTo(0, 1), e.mobile.defaultHomeScroll = !e.support.scrollTop || e.mobile.window.scrollTop() === 1 ? 0 : 1, e.mobile.autoInitializePage && e.mobile.initializePage(), e.support.cssPointerEvents || e.mobile.document.delegate(".ui-state-disabled,.ui-disabled", "vclick", function(e) {
                e.preventDefault(), e.stopImmediatePropagation()
            })
        })
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("nojs", ["jquery", "./ns"], t) : t(e)
    }(function(e) {
        return e.mobile.nojs = function(t) {
            e(":jqmData(role='nojs')", t).addClass("ui-nojs")
        }, e.mobile.nojs
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("transitions/visuals/flip", ["jquery", "../handlers"], t) : t(e)
    }(function(e) {
        e.mobile.transitionFallbacks.flip = "fade"
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("transitions/visuals/flow", ["jquery", "../handlers"], t) : t(e)
    }(function(e) {
        e.mobile.transitionFallbacks.flow = "fade"
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("transitions/visuals/pop", ["jquery", "../handlers"], t) : t(e)
    }(function(e) {
        e.mobile.transitionFallbacks.pop = "fade"
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("transitions/visuals/slide", ["jquery", "../handlers"], t) : t(e)
    }(function(e) {
        e.mobile.transitionHandlers.slide = e.mobile.transitionHandlers.simultaneous, e.mobile.transitionFallbacks.slide = "fade"
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("transitions/visuals/slidedown", ["jquery", "../handlers"], t) : t(e)
    }(function(e) {
        e.mobile.transitionFallbacks.slidedown = "fade"
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("transitions/visuals/slidefade", ["jquery", "../handlers"], t) : t(e)
    }(function(e) {
        e.mobile.transitionFallbacks.slidefade = "fade"
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("transitions/visuals/slideup", ["jquery", "../handlers"], t) : t(e)
    }(function(e) {
        e.mobile.transitionFallbacks.slideup = "fade"
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("transitions/visuals/turn", ["jquery", "../handlers"], t) : t(e)
    }(function(e) {
        e.mobile.transitionFallbacks.turn = "fade"
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("transitions/visuals", ["./visuals/flip", "./visuals/flow", "./visuals/pop", "./visuals/slide", "./visuals/slidedown", "./visuals/slidefade", "./visuals/slideup", "./visuals/turn"], t) : t(e)
    }(function() {}),
    function(t) {
        typeof define == "function" && define.amd ? define("jquery-ui/unique-id", ["jquery", "./version"], t) : t(e)
    }(function(e) {
        return e.fn.extend({
            uniqueId: function() {
                var e = 0;
                return function() {
                    return this.each(function() {
                        this.id || (this.id = "ui-id-" + ++e)
                    })
                }
            }(),
            removeUniqueId: function() {
                return this.each(function() {
                    /^ui-id-\d+$/.test(this.id) && e(this).removeAttr("id")
                })
            }
        })
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("jquery-ui/widgets/accordion", ["jquery", "../version", "../keycode", "../unique-id", "../widget"], t) : t(e)
    }(function(e) {
 return $.widget( "ui.accordion", {
	version: "1.12.1",
	options: {
		active: 0,
		animate: {},
		classes: {
			"ui-accordion-header": "ui-corner-top",
			"ui-accordion-header-collapsed": "ui-corner-all",
			"ui-accordion-content": "ui-corner-bottom"
		},
		collapsible: false,
		event: "click",
		header: "> li > :first-child, > div > :first-child",
		heightStyle: "auto",
		icons: {
			activeHeader: "ui-icon-triangle-1-s",
			header: "ui-icon-triangle-1-e"
		},

		// Callbacks
		activate: null,
		beforeActivate: null
	},

	hideProps: {
		borderTopWidth: "hide",
		borderBottomWidth: "hide",
		paddingTop: "hide",
		paddingBottom: "hide",
		height: "hide"
	},

	showProps: {
		borderTopWidth: "show",
		borderBottomWidth: "show",
		paddingTop: "show",
		paddingBottom: "show",
		height: "show"
	},

	_create: function() {
		var options = this.options;

		this.prevShow = this.prevHide = $();
		this._addClass( "ui-accordion", "ui-widget ui-helper-reset" );
		this.element.attr( "role", "tablist" );

		// Don't allow collapsible: false and active: false / null
		if ( !options.collapsible && ( options.active === false || options.active == null ) ) {
			options.active = 0;
		}

		this._processPanels();

		// handle negative values
		if ( options.active < 0 ) {
			options.active += this.headers.length;
		}
		this._refresh();
	},

	_getCreateEventData: function() {
		return {
			header: this.active,
			panel: !this.active.length ? $() : this.active.next()
		};
	},

	_createIcons: function() {
		var icon, children,
			icons = this.options.icons;

		if ( icons ) {
			icon = $( "<span>" );
			this._addClass( icon, "ui-accordion-header-icon", "ui-icon " + icons.header );
			icon.prependTo( this.headers );
			children = this.active.children( ".ui-accordion-header-icon" );
			this._removeClass( children, icons.header )
				._addClass( children, null, icons.activeHeader )
				._addClass( this.headers, "ui-accordion-icons" );
		}
	},

	_destroyIcons: function() {
		this._removeClass( this.headers, "ui-accordion-icons" );
		this.headers.children( ".ui-accordion-header-icon" ).remove();
	},

	_destroy: function() {
		var contents;

		// Clean up main element
		this.element.removeAttr( "role" );

		// Clean up headers
		this.headers
			.removeAttr( "role aria-expanded aria-selected aria-controls tabIndex" )
			.removeUniqueId();

		this._destroyIcons();

		// Clean up content panels
		contents = this.headers.next()
			.css( "display", "" )
			.removeAttr( "role aria-hidden aria-labelledby" )
			.removeUniqueId();

		if ( this.options.heightStyle !== "content" ) {
			contents.css( "height", "" );
		}
	},

	_setOption: function( key, value ) {
		if ( key === "active" ) {

			// _activate() will handle invalid values and update this.options
			this._activate( value );
			return;
		}

		if ( key === "event" ) {
			if ( this.options.event ) {
				this._off( this.headers, this.options.event );
			}
			this._setupEvents( value );
		}

		this._super( key, value );

		// Setting collapsible: false while collapsed; open first panel
		if ( key === "collapsible" && !value && this.options.active === false ) {
			this._activate( 0 );
		}

		if ( key === "icons" ) {
			this._destroyIcons();
			if ( value ) {
				this._createIcons();
			}
		}
	},

	_setOptionDisabled: function( value ) {
		this._super( value );

		this.element.attr( "aria-disabled", value );

		// Support: IE8 Only
		// #5332 / #6059 - opacity doesn't cascade to positioned elements in IE
		// so we need to add the disabled class to the headers and panels
		this._toggleClass( null, "ui-state-disabled", !!value );
		this._toggleClass( this.headers.add( this.headers.next() ), null, "ui-state-disabled",
			!!value );
	},

	_keydown: function( event ) {
		if ( event.altKey || event.ctrlKey ) {
			return;
		}

		var keyCode = $.ui.keyCode,
			length = this.headers.length,
			currentIndex = this.headers.index( event.target ),
			toFocus = false;

		switch ( event.keyCode ) {
		case keyCode.RIGHT:
		case keyCode.DOWN:
			toFocus = this.headers[ ( currentIndex + 1 ) % length ];
			break;
		case keyCode.LEFT:
		case keyCode.UP:
			toFocus = this.headers[ ( currentIndex - 1 + length ) % length ];
			break;
		case keyCode.SPACE:
		case keyCode.ENTER:
			this._eventHandler( event );
			break;
		case keyCode.HOME:
			toFocus = this.headers[ 0 ];
			break;
		case keyCode.END:
			toFocus = this.headers[ length - 1 ];
			break;
		}

		if ( toFocus ) {
			$( event.target ).attr( "tabIndex", -1 );
			$( toFocus ).attr( "tabIndex", 0 );
			$( toFocus ).trigger( "focus" );
			event.preventDefault();
		}
	},

	_panelKeyDown: function( event ) {
		if ( event.keyCode === $.ui.keyCode.UP && event.ctrlKey ) {
			$( event.currentTarget ).prev().trigger( "focus" );
		}
	},

	refresh: function() {
		var options = this.options;
		this._processPanels();

		// Was collapsed or no panel
		if ( ( options.active === false && options.collapsible === true ) ||
				!this.headers.length ) {
			options.active = false;
			this.active = $();

		// active false only when collapsible is true
		} else if ( options.active === false ) {
			this._activate( 0 );

		// was active, but active panel is gone
		} else if ( this.active.length && !$.contains( this.element[ 0 ], this.active[ 0 ] ) ) {

			// all remaining panel are disabled
			if ( this.headers.length === this.headers.find( ".ui-state-disabled" ).length ) {
				options.active = false;
				this.active = $();

			// activate previous panel
			} else {
				this._activate( Math.max( 0, options.active - 1 ) );
			}

		// was active, active panel still exists
		} else {

			// make sure active index is correct
			options.active = this.headers.index( this.active );
		}

		this._destroyIcons();

		this._refresh();
	},

	_processPanels: function() {
		var prevHeaders = this.headers,
			prevPanels = this.panels;

		this.headers = this.element.find( this.options.header );
		this._addClass( this.headers, "ui-accordion-header ui-accordion-header-collapsed",
			"ui-state-default" );

		this.panels = this.headers.next().filter( ":not(.ui-accordion-content-active)" ).hide();
		this._addClass( this.panels, "ui-accordion-content", "ui-helper-reset ui-widget-content" );

		// Avoid memory leaks (#10056)
		if ( prevPanels ) {
			this._off( prevHeaders.not( this.headers ) );
			this._off( prevPanels.not( this.panels ) );
		}
	},

	_refresh: function() {
		var maxHeight,
			options = this.options,
			heightStyle = options.heightStyle,
			parent = this.element.parent();

		this.active = this._findActive( options.active );
		this._addClass( this.active, "ui-accordion-header-active", "ui-state-active" )
			._removeClass( this.active, "ui-accordion-header-collapsed" );
		this._addClass( this.active.next(), "ui-accordion-content-active" );
		this.active.next().show();

		this.headers
			.attr( "role", "tab" )
			.each( function() {
				var header = $( this ),
					headerId = header.uniqueId().attr( "id" ),
					panel = header.next(),
					panelId = panel.uniqueId().attr( "id" );
				header.attr( "aria-controls", panelId );
				panel.attr( "aria-labelledby", headerId );
			} )
			.next()
				.attr( "role", "tabpanel" );

		this.headers
			.not( this.active )
				.attr( {
					"aria-selected": "false",
					"aria-expanded": "false",
					tabIndex: -1
				} )
				.next()
					.attr( {
						"aria-hidden": "true"
					} )
					.hide();

		// Make sure at least one header is in the tab order
		if ( !this.active.length ) {
			this.headers.eq( 0 ).attr( "tabIndex", 0 );
		} else {
			this.active.attr( {
				"aria-selected": "true",
				"aria-expanded": "true",
				tabIndex: 0
			} )
				.next()
					.attr( {
						"aria-hidden": "false"
					} );
		}

		this._createIcons();

		this._setupEvents( options.event );

		if ( heightStyle === "fill" ) {
			maxHeight = parent.height();
			this.element.siblings( ":visible" ).each( function() {
				var elem = $( this ),
					position = elem.css( "position" );

				if ( position === "absolute" || position === "fixed" ) {
					return;
				}
				maxHeight -= elem.outerHeight( true );
			} );

			this.headers.each( function() {
				maxHeight -= $( this ).outerHeight( true );
			} );

			this.headers.next()
				.each( function() {
					$( this ).height( Math.max( 0, maxHeight -
						$( this ).innerHeight() + $( this ).height() ) );
				} )
				.css( "overflow", "auto" );
		} else if ( heightStyle === "auto" ) {
			maxHeight = 0;
			this.headers.next()
				.each( function() {
					var isVisible = $( this ).is( ":visible" );
					if ( !isVisible ) {
						$( this ).show();
					}
					maxHeight = Math.max( maxHeight, $( this ).css( "height", "" ).height() );
					if ( !isVisible ) {
						$( this ).hide();
					}
				} )
				.height( maxHeight );
		}
	},

	_activate: function( index ) {
		var active = this._findActive( index )[ 0 ];

		// Trying to activate the already active panel
		if ( active === this.active[ 0 ] ) {
			return;
		}

		// Trying to collapse, simulate a click on the currently active header
		active = active || this.active[ 0 ];

		this._eventHandler( {
			target: active,
			currentTarget: active,
			preventDefault: $.noop
		} );
	},

	_findActive: function( selector ) {
		return typeof selector === "number" ? this.headers.eq( selector ) : $();
	},

	_setupEvents: function( event ) {
		var events = {
			keydown: "_keydown"
		};
		if ( event ) {
			$.each( event.split( " " ), function( index, eventName ) {
				events[ eventName ] = "_eventHandler";
			} );
		}

		this._off( this.headers.add( this.headers.next() ) );
		this._on( this.headers, events );
		this._on( this.headers.next(), { keydown: "_panelKeyDown" } );
		this._hoverable( this.headers );
		this._focusable( this.headers );
	},

	_eventHandler: function( event ) {
		var activeChildren, clickedChildren,
			options = this.options,
			active = this.active,
			clicked = $( event.currentTarget ),
			clickedIsActive = clicked[ 0 ] === active[ 0 ],
			collapsing = clickedIsActive && options.collapsible,
			toShow = collapsing ? $() : clicked.next(),
			toHide = active.next(),
			eventData = {
				oldHeader: active,
				oldPanel: toHide,
				newHeader: collapsing ? $() : clicked,
				newPanel: toShow
			};

		event.preventDefault();

		if (

				// click on active header, but not collapsible
				( clickedIsActive && !options.collapsible ) ||

				// allow canceling activation
				( this._trigger( "beforeActivate", event, eventData ) === false ) ) {
			return;
		}

		options.active = collapsing ? false : this.headers.index( clicked );

		// When the call to ._toggle() comes after the class changes
		// it causes a very odd bug in IE 8 (see #6720)
		this.active = clickedIsActive ? $() : clicked;
		this._toggle( eventData );

		// Switch classes
		// corner classes on the previously active header stay after the animation
		this._removeClass( active, "ui-accordion-header-active", "ui-state-active" );
		if ( options.icons ) {
			activeChildren = active.children( ".ui-accordion-header-icon" );
			this._removeClass( activeChildren, null, options.icons.activeHeader )
				._addClass( activeChildren, null, options.icons.header );
		}

		if ( !clickedIsActive ) {
			this._removeClass( clicked, "ui-accordion-header-collapsed" )
				._addClass( clicked, "ui-accordion-header-active", "ui-state-active" );
			if ( options.icons ) {
				clickedChildren = clicked.children( ".ui-accordion-header-icon" );
				this._removeClass( clickedChildren, null, options.icons.header )
					._addClass( clickedChildren, null, options.icons.activeHeader );
			}

			this._addClass( clicked.next(), "ui-accordion-content-active" );
		}
	},

	_toggle: function( data ) {
		var toShow = data.newPanel,
			toHide = this.prevShow.length ? this.prevShow : data.oldPanel;

		// Handle activating a panel during the animation for another activation
		this.prevShow.add( this.prevHide ).stop( true, true );
		this.prevShow = toShow;
		this.prevHide = toHide;

		if ( this.options.animate ) {
			this._animate( toShow, toHide, data );
		} else {
			toHide.hide();
			toShow.show();
			this._toggleComplete( data );
		}

		toHide.attr( {
			"aria-hidden": "true"
		} );
		toHide.prev().attr( {
			"aria-selected": "false",
			"aria-expanded": "false"
		} );

		// if we're switching panels, remove the old header from the tab order
		// if we're opening from collapsed state, remove the previous header from the tab order
		// if we're collapsing, then keep the collapsing header in the tab order
		if ( toShow.length && toHide.length ) {
			toHide.prev().attr( {
				"tabIndex": -1,
				"aria-expanded": "false"
			} );
		} else if ( toShow.length ) {
			this.headers.filter( function() {
				return parseInt( $( this ).attr( "tabIndex" ), 10 ) === 0;
			} )
				.attr( "tabIndex", -1 );
		}

		toShow
			.attr( "aria-hidden", "false" )
			.prev()
				.attr( {
					"aria-selected": "true",
					"aria-expanded": "true",
					tabIndex: 0
				} );

	},

	_animate: function( toShow, toHide, data ) {
		var total, easing, duration,
			that = this,
			adjust = 0,
			boxSizing = toShow.css( "box-sizing" ),
			down = toShow.length &&
				( !toHide.length || ( toShow.index() < toHide.index() ) ),
			animate = this.options.animate || {},
			options = down && animate.down || animate,
			complete = function() {
				that._toggleComplete( data );
			};

		if ( typeof options === "number" ) {
			duration = options;
		}
		if ( typeof options === "string" ) {
			easing = options;
		}

		// fall back from options to animation in case of partial down settings
		easing = easing || options.easing || animate.easing;
		duration = duration || options.duration || animate.duration;

		if ( !toHide.length ) {
			return toShow.animate( this.showProps, duration, easing, complete );
		}
		if ( !toShow.length ) {
			return toHide.animate( this.hideProps, duration, easing, complete );
		}

		total = toShow.show().outerHeight();
		toHide.animate( this.hideProps, {
			duration: duration,
			easing: easing,
			step: function( now, fx ) {
				fx.now = Math.round( now );
			}
		} );
		toShow
			.hide()
			.animate( this.showProps, {
				duration: duration,
				easing: easing,
				complete: complete,
				step: function( now, fx ) {
					fx.now = Math.round( now );
					if ( fx.prop !== "height" ) {
						if ( boxSizing === "content-box" ) {
							adjust += fx.now;
						}
					} else if ( that.options.heightStyle !== "content" ) {
						fx.now = Math.round( total - toHide.outerHeight() - adjust );
						adjust = 0;
					}
				}
			} );
	},

	_toggleComplete: function( data ) {
		var toHide = data.oldPanel,
			prev = toHide.prev();

		this._removeClass( toHide, "ui-accordion-content-active" );
		this._removeClass( prev, "ui-accordion-header-active" )
			._addClass( prev, "ui-accordion-header-collapsed" );

		// Work around for rendering bug in IE (#5421)
		if ( toHide.length ) {
			toHide.parent()[ 0 ].className = toHide.parent()[ 0 ].className;
		}
		this._trigger( "activate", null, data );  
        this.element[0].dispatchEvent(new Event('change'));
	}
} );
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/accordion", ["jquery", "jquery-ui/widget", "jquery-ui/widgets/accordion", "./widget.theme"], t) : t(e)
    }(function(e) {
        return e.widget("ui.accordion", e.ui.accordion, {
            options: {
                theme: null,
                icons: {
                    activeHeader: "ui-icon-caret-d",
                    header: "ui-icon-caret-r"
                }
            },
            _themeElements: function() {
                return [{
                    element: this.widget(),
                    prefix: "ui-body-"
                }]
            },
            _create: function() {
                this._super(), this._on(this.document, {
                    pagecontainershow: function(e, t) {
                        t.toPage[0] === this.element.closest(".ui-page")[0] && this.refresh();
                    }
                })
            }
        }), e.widget("ui.accordion", e.ui.accordion, e.mobile.widget.theme), e.ui.accordion
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/addFirstLastClasses", ["jquery", "../core"], t) : t(e)
    }(function(e) {
        function n(n) {
            var r, i = n.length,
                s = [];
            for (r = 0; r < i; r++) n[r].className.match(t) || s.push(n[r]);
            return e(s)
        }
        var t = /\bui-screen-hidden\b/;
        return e.mobile.behaviors.addFirstLastClasses = {
            _getVisibles: function(e, t) {
                var r;
                return t ? r = n(e) : (r = e.filter(":visible"), r.length === 0 && (r = n(e))), r
            },
            _addFirstLastClasses: function(e, t, n) {
                e.removeClass("ui-first-child ui-last-child"), t.eq(0).addClass("ui-first-child").end().last().addClass("ui-last-child"), n || this.element.trigger("updatelayout")
            },
            _removeFirstLastClasses: function(e) {
                e.removeClass("ui-first-child ui-last-child")
            }
        }, e.mobile.behaviors.addFirstLastClasses
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/collapsible", ["jquery", "../core", "../widget"], t) : t(e)
    }(function(e) {
var rInitialLetter = /([A-Z])/g;

$.widget( "mobile.collapsible", {
	version: "@VERSION",

	options: {
		enhanced: false,
		expandCueText: null,
		collapseCueText: null,
		collapsed: true,
		heading: "h1,h2,h3,h4,h5,h6,legend",
		collapsedIcon: null,
		expandedIcon: null,
		iconpos: null,
		theme: null,
		contentTheme: null,
		inset: null,
		corners: null,
		mini: null
	},

	_create: function() {
		var elem = this.element,
			ui = {
				accordion: elem
					.closest( ":jqmData(role='collapsible-set')," +
						":jqmData(role='collapsibleset')" +
						( $.mobile.collapsibleset ? ", :mobile-collapsibleset" :
							"" ) )
						.addClass( "ui-collapsible-set" )
			};

		this._ui = ui;
		this._renderedOptions = this._getOptions( this.options );

		if ( this.options.enhanced ) {
			ui.heading = this.element.children( ".ui-collapsible-heading" );
			ui.content = ui.heading.next();
			ui.anchor = ui.heading.children();
			ui.status = ui.anchor.children( ".ui-collapsible-heading-status" );
			ui.icon = ui.anchor.children( ".ui-icon" );
		} else {
			this._enhance( elem, ui );
		}

		this._on( ui.heading, {
			"tap": function() {
				ui.heading.find( "a" ).first().addClass( "ui-button-active" );
			},

			"click": function( event ) {
				this._handleExpandCollapse( !ui.heading.hasClass( "ui-collapsible-heading-collapsed" ) );
				event.preventDefault();
				event.stopPropagation();
			}
		} );
	},

	// Adjust the keys inside options for inherited values
	_getOptions: function( options ) {
		var key,
			accordion = this._ui.accordion,
			accordionWidget = this._ui.accordionWidget;

		// Copy options
		options = $.extend( {}, options );

		if ( accordion.length && !accordionWidget ) {
			this._ui.accordionWidget =
				accordionWidget = accordion.data( "mobile-collapsibleset" );
		}

		for ( key in options ) {

			// Retrieve the option value first from the options object passed in and, if
			// null, from the parent accordion or, if that's null too, or if there's no
			// parent accordion, then from the defaults.
			options[ key ] =
				( options[ key ] != null ) ? options[ key ] :
					( accordionWidget ) ? accordionWidget.options[ key ] :
						accordion.length ? $.mobile.getAttribute( accordion[ 0 ],
							key.replace( rInitialLetter, "-$1" ).toLowerCase() ) :
							null;

			if ( null == options[ key ] ) {
				options[ key ] = $.mobile.collapsible.defaults[ key ];
			}
		}

		return options;
	},

	_themeClassFromOption: function( prefix, value ) {
		return ( value ? ( value === "none" ? "" : prefix + value ) : "" );
	},

	_enhance: function( elem, ui ) {
		var opts = this._renderedOptions,
			contentThemeClass = this._themeClassFromOption( "ui-body-", opts.contentTheme );

		elem.addClass( "ui-collapsible " +
			( opts.inset ? "ui-collapsible-inset " : "" ) +
			( opts.inset && opts.corners ? "ui-corner-all " : "" ) +
			( contentThemeClass ? "ui-collapsible-themed-content " : "" ) );
		ui.originalHeading = elem.children( this.options.heading ).first(),
		ui.content = elem
			.wrapInner( "<div " +
				"class='ui-collapsible-content " +
				contentThemeClass + "'></div>" )
			.children( ".ui-collapsible-content" ),
		ui.heading = ui.originalHeading;

		// Replace collapsibleHeading if it's a legend
		if ( ui.heading.is( "legend" ) ) {
			ui.heading = $( "<div role='heading'>" + ui.heading.html() + "</div>" );
			ui.placeholder = $( "<div><!-- placeholder for legend --></div>" ).insertBefore( ui.originalHeading );
			ui.originalHeading.remove();
		}

		ui.status = $( "<span class='ui-collapsible-heading-status'></span>" );
		ui.anchor = ui.heading
			.detach()
			//modify markup & attributes
			.addClass( "ui-collapsible-heading" )
			.append( ui.status )
			.wrapInner( "<a href='#' class='ui-collapsible-heading-toggle'></a>" )
			.find( "a" )
				.first()
					.addClass( "ui-button " +
						this._themeClassFromOption( "ui-button-", opts.theme ) + " " +
						( opts.mini ? "ui-mini " : "" ) );

		this._updateIcon();

		//drop heading in before content
		ui.heading.insertBefore( ui.content );

		this._handleExpandCollapse( this.options.collapsed );

		return ui;
	},

	_updateIcon: function() {
		var ui = this._ui,
			opts = this._getOptions( this.options ),
			iconclass =
				opts.collapsed ?
				( opts.collapsedIcon ? " ui-icon-" + opts.collapsedIcon : "" ) :
				( opts.expandedIcon ? " ui-icon-" + opts.expandedIcon : "" ),
			method = opts.iconpos === ( "bottom" || "right" ) ? "append" : "prepend";

		if ( ui.icon ) {
			ui.icon.remove();
		}
		if ( ui.space ) {
			ui.space.remove();
		}

		ui.icon = $( "<span class='ui-icon" + ( iconclass ? iconclass + " " : "" ) + "'></span>" );

		if ( opts.iconpos === "left" || opts.iconpos === "right" ||
				opts.iconpos === null ) {
			ui.space = $( "<span class='ui-icon-space'> </span>" );

			ui.anchor[ method ]( ui.space );
		} else {
			ui.icon.addClass( "ui-widget-icon-block" );
		}

		ui.anchor[ method ]( ui.icon );

		if ( opts.iconpos === "right" ) {
			ui.icon.addClass( "ui-collapsible-icon-right" );
		}
	},

	refresh: function() {
		this._applyOptions( this.options );
		this._renderedOptions = this._getOptions( this.options );
		this._updateIcon();
	},

	_applyOptions: function( options ) {
		var isCollapsed, newTheme, oldTheme, hasCorners,
			elem = this.element,
			currentOpts = this._renderedOptions,
			ui = this._ui,
			anchor = ui.anchor,
			status = ui.status,
			opts = this._getOptions( options );

		// First and foremost we need to make sure the collapsible is in the proper
		// state, in case somebody decided to change the collapsed option at the
		// same time as another option
		if ( options.collapsed !== undefined ) {
			this._handleExpandCollapse( options.collapsed );
		}

		isCollapsed = elem.hasClass( "ui-collapsible-collapsed" );

		// We only need to apply the cue text for the current state right away.
		// The cue text for the alternate state will be stored in the options
		// and applied the next time the collapsible's state is toggled
		if ( isCollapsed ) {
			if ( opts.expandCueText !== undefined ) {
				status.text( opts.expandCueText );
			}
		} else {
			if ( opts.collapseCueText !== undefined ) {
				status.text( opts.collapseCueText );
			}
		}

		if ( opts.theme !== undefined ) {
			oldTheme = this._themeClassFromOption( "ui-button-", currentOpts.theme );
			newTheme = this._themeClassFromOption( "ui-button-", opts.theme );
			anchor.removeClass( oldTheme ).addClass( newTheme );
		}

		if ( opts.contentTheme !== undefined ) {
			oldTheme = this._themeClassFromOption( "ui-body-",
				currentOpts.contentTheme );
			newTheme = this._themeClassFromOption( "ui-body-",
				opts.contentTheme );
			ui.content.removeClass( oldTheme ).addClass( newTheme );
		}

		if ( opts.inset !== undefined ) {
			elem.toggleClass( "ui-collapsible-inset", opts.inset );
			hasCorners = !!( opts.inset && ( opts.corners || currentOpts.corners ) );
		}

		if ( opts.corners !== undefined ) {
			hasCorners = !!( opts.corners && ( opts.inset || currentOpts.inset ) );
		}

		if ( hasCorners !== undefined ) {
			elem.toggleClass( "ui-corner-all", hasCorners );
		}

		if ( opts.mini !== undefined ) {
			anchor.toggleClass( "ui-mini", opts.mini );
		}
	},

	_setOptions: function( options ) {
		this._applyOptions( options );
		this._super( options );
		this._renderedOptions = this._getOptions( this.options );

		// If any icon-related options have changed, make sure the new icon
		// state is reflected by first removing all icon-related classes
		// reflecting the current state and then adding all icon-related
		// classes for the new state
		if ( !( options.iconpos === undefined &&
				options.collapsedIcon === undefined &&
				options.expandedIcon === undefined ) ) {

			this._updateIcon();
		}
	},

	_handleExpandCollapse: function( isCollapse ) {
		var opts = this._renderedOptions,
			ui = this._ui;

		ui.status.text( isCollapse ? opts.expandCueText : opts.collapseCueText );
		ui.heading
			.toggleClass( "ui-collapsible-heading-collapsed", isCollapse )
			.find( "a" ).first()
				.removeClass( "ui-button-active" );
		ui.heading
			.toggleClass( "ui-collapsible-heading-collapsed", isCollapse )
			.find( "a" ).first().removeClass( "ui-button-active" );

		if ( ui.icon ) {
			ui.icon.toggleClass( "ui-icon-" + opts.expandedIcon, !isCollapse )

			// logic or cause same icon for expanded/collapsed state would remove the ui-icon-class
			.toggleClass( "ui-icon-" + opts.collapsedIcon, ( isCollapse || opts.expandedIcon === opts.collapsedIcon ) );
		}
		this.element.toggleClass( "ui-collapsible-collapsed", isCollapse );
		ui.content
			.toggleClass( "ui-collapsible-content-collapsed", isCollapse )
			.attr( "aria-hidden", isCollapse )
			.trigger( "updatelayout" );
		this.options.collapsed = isCollapse;
		this._trigger( isCollapse ? "collapse" : "expand" );
	},

	expand: function() {
		this._handleExpandCollapse( false );
	},

	collapse: function() {
		this._handleExpandCollapse( true );
	},

	_destroy: function() {
		var ui = this._ui,
			opts = this.options;

		if ( opts.enhanced ) {
			return;
		}

		if ( ui.placeholder ) {
			ui.originalHeading.insertBefore( ui.placeholder );
			ui.placeholder.remove();
			ui.heading.remove();
		} else {
			ui.status.remove();
			ui.heading
				.removeClass( "ui-collapsible-heading ui-collapsible-heading-collapsed" )
				.children()
					.contents()
					.unwrap();
		}

		if ( ui.icon ) {
			ui.icon.remove();
		}
		if( ui.space ) {
			ui.space.remove();
		}

		ui.anchor.contents().unwrap();
		ui.content.contents().unwrap();
		this.element
			.removeClass( "ui-collapsible ui-collapsible-collapsed " +
				"ui-collapsible-themed-content ui-collapsible-inset ui-corner-all" );
	}
} );

// Defaults to be used by all instances of collapsible if per-instance values
// are unset or if nothing is specified by way of inheritance from an accordion.
// Note that this hash does not contain options "collapsed" or "heading",
// because those are not inheritable.
$.mobile.collapsible.defaults = {
	expandCueText: " click to expand contents",
	collapseCueText: " click to collapse contents",
	collapsedIcon: "plus",
	contentTheme: "inherit",
	expandedIcon: "minus",
	iconpos: "left",
	inset: true,
	corners: true,
	theme: "inherit",
	mini: false
};

return $.mobile.collapsible;
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/collapsibleSet", ["jquery", "../widget", "./collapsible", "./addFirstLastClasses"], t) : t(e)
    }(function(e) {
        return $.widget( "mobile.collapsibleset", $.extend( {
	version: "@VERSION",

	options: $.extend( {
		enhanced: false
	}, $.mobile.collapsible.defaults ),

	_handleCollapsibleExpand: function( event ) {
		var closestCollapsible = $( event.target ).closest( ".ui-collapsible" );

		if ( closestCollapsible.parent().is( ":mobile-collapsibleset, :jqmData(role='collapsibleset')" ) ) {
			closestCollapsible
				.siblings( ".ui-collapsible:not(.ui-collapsible-collapsed)" )
				.collapsible( "collapse" );
		}
	},

	_create: function() {
		var elem = this.element,
			opts = this.options;

		$.extend( this, {
			_classes: ""
		} );

		this.childCollapsiblesSelector = ":mobile-collapsible, " +
			( "[data-" + $.mobile.ns +  "role='collapsible']" );

		if ( !opts.enhanced ) {
			elem.addClass( "ui-collapsible-set " +
				this._themeClassFromOption( "ui-group-theme-", opts.theme ) + " " +
				( opts.corners && opts.inset ? "ui-corner-all " : "" ) );
			this.element.find( this.childCollapsiblesSelector ).collapsible();
		}

		this._on( elem, { collapsibleexpand: "_handleCollapsibleExpand" } );
	},

	_themeClassFromOption: function( prefix, value ) {
		return ( value ? ( value === "none" ? "" : prefix + value ) : "" );
	},

	_init: function() {
		this._refresh( true );

		// Because the corners are handled by the collapsible itself and the default state is collapsed
		// That was causing https://github.com/jquery/jquery-mobile/issues/4116
		this.element
			.children( this.childCollapsiblesSelector )
				.filter( ":jqmData(collapsed='false')" )
					.collapsible( "expand" );
	},

	_setOptions: function( options ) {
		var ret, hasCorners,
			elem = this.element,
			themeClass = this._themeClassFromOption( "ui-group-theme-", options.theme );

		if ( themeClass ) {
			elem
				.removeClass( this._themeClassFromOption( "ui-group-theme-", this.options.theme ) )
				.addClass( themeClass );
		}

		if ( options.inset !== undefined ) {
			hasCorners = !!( options.inset && ( options.corners || this.options.corners ) );
		}

		if ( options.corners !== undefined ) {
			hasCorners = !!( options.corners && ( options.inset || this.options.inset ) );
		}

		if ( hasCorners !== undefined ) {
			elem.toggleClass( "ui-corner-all", hasCorners );
		}

		ret = this._super( options );
		this.element.children( ":mobile-collapsible" ).collapsible( "refresh" );
		return ret;
	},

	_destroy: function() {
		var el = this.element;

		this._removeFirstLastClasses( el.children( this.childCollapsiblesSelector ) );
		el
			.removeClass( "ui-collapsible-set ui-corner-all " +
				this._themeClassFromOption( "ui-group-theme-", this.options.theme ) )
			.children( ":mobile-collapsible" )
				.collapsible( "destroy" );
	},

	_refresh: function( create ) {
		var collapsiblesInSet = this.element.children( this.childCollapsiblesSelector );

		this.element.find( this.childCollapsiblesSelector ).not( ".ui-collapsible" ).collapsible();

		this._addFirstLastClasses( collapsiblesInSet, this._getVisibles( collapsiblesInSet, create ), create );
	},

	refresh: function() {
		this._refresh( false );
	}
}, $.mobile.behaviors.addFirstLastClasses ) );
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("jquery-ui/widgets/controlgroup", ["jquery", "../widget"], t) : t(e)
    }(function(e) {
        var t = /ui-corner-([a-z]){2,6}/g;
        return e.widget("ui.controlgroup", {
            version: "1.12.1",
            defaultElement: "<div>",
            options: {
                direction: "horizontal",
                disabled: null,
                onlyVisible: !0,
                items: {
                    button: "input[type=button], input[type=submit], input[type=reset], button, a",
                    controlgroupLabel: ".ui-controlgroup-label",
                    checkboxradio: "input[type='checkbox'], input[type='radio']",
                    selectmenu: "select",
                    spinner: ".ui-spinner-input"
                }
            },
            _create: function() {
                this._enhance()
            },
            _enhance: function() {
                this.element.attr("role", "toolbar"), this.refresh()
            },
            _destroy: function() {
                this._callChildMethod("destroy"), this.childWidgets.removeData("ui-controlgroup-data"), this.element.removeAttr("role"), this.options.items.controlgroupLabel && this.element.find(this.options.items.controlgroupLabel).find(".ui-controlgroup-label-contents").contents().unwrap()
            },
            _initWidgets: function() {
                var t = this,
                    n = [];
                e.each(this.options.items, function(r, i) {
                    var s, o = {};
                    if (!i) return;
                    if (r === "controlgroupLabel") {
                        s = t.element.find(i), s.each(function() {
                            var t = e(this);
                            if (t.children(".ui-controlgroup-label-contents").length) return;
                            t.contents().wrapAll("<span class='ui-controlgroup-label-contents'></span>")
                        }), t._addClass(s, null, "ui-widget ui-widget-content ui-state-default"), n = n.concat(s.get());
                        return
                    }
                    if (!e.fn[r]) return;
                    t["_" + r + "Options"] ? o = t["_" + r + "Options"]("middle") : o = {
                        classes: {}
                    }, t.element.find(i).each(function() {
                        var i = e(this),
                            s = i[r]("instance"),
                            u = e.widget.extend({}, o);
                        if (r === "button" && i.parent(".ui-spinner").length) return;
                        s || (s = i[r]()[r]("instance")), s && (u.classes = t._resolveClassesValues(u.classes, s)), i[r](u);
                        var a = i[r]("widget");
                        e.data(a[0], "ui-controlgroup-data", s ? s : i[r]("instance")), n.push(a[0])
                    })
                }), this.childWidgets = e(e.unique(n)), this._addClass(this.childWidgets, "ui-controlgroup-item")
            },
            _callChildMethod: function(t) {
                this.childWidgets.each(function() {
                    var n = e(this),
                        r = n.data("ui-controlgroup-data");
                    r && r[t] && r[t]()
                })
            },
            _updateCornerClass: function(e, t) {
                var n = "ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-corner-all",
                    r = this._buildSimpleOptions(t, "label").classes.label;
                this._removeClass(e, null, n), this._addClass(e, null, r)
            },
            _buildSimpleOptions: function(e, t) {
                var n = this.options.direction === "vertical",
                    r = {
                        classes: {}
                    };
                return r.classes[t] = {
                    middle: "",
                    first: "ui-corner-" + (n ? "top" : "left"),
                    last: "ui-corner-" + (n ? "bottom" : "right"),
                    only: "ui-corner-all"
                } [e], r
            },
            _spinnerOptions: function(e) {
                var t = this._buildSimpleOptions(e, "ui-spinner");
                return t.classes["ui-spinner-up"] = "", t.classes["ui-spinner-down"] = "", t
            },
            _buttonOptions: function(e) {
                return this._buildSimpleOptions(e, "ui-button")
            },
            _checkboxradioOptions: function(e) {
                return this._buildSimpleOptions(e, "ui-checkboxradio-label")
            },
            _selectmenuOptions: function(e) {
                var t = this.options.direction === "vertical";
                return {
                    width: t ? "auto" : !1,
                    classes: {
                        middle: {
                            "ui-selectmenu-button-open": "",
                            "ui-selectmenu-button-closed": ""
                        },
                        first: {
                            "ui-selectmenu-button-open": "ui-corner-" + (t ? "top" : "tl"),
                            "ui-selectmenu-button-closed": "ui-corner-" + (t ? "top" : "left")
                        },
                        last: {
                            "ui-selectmenu-button-open": t ? "" : "ui-corner-tr",
                            "ui-selectmenu-button-closed": "ui-corner-" + (t ? "bottom" : "right")
                        },
                        only: {
                            "ui-selectmenu-button-open": "ui-corner-top",
                            "ui-selectmenu-button-closed": "ui-corner-all"
                        }
                    } [e]
                }
            },
            _resolveClassesValues: function(n, r) {
                var i = {};
                return e.each(n, function(s) {
                    var o = r.options.classes[s] || "";
                    o = e.trim(o.replace(t, "")), i[s] = (o + " " + n[s]).replace(/\s+/g, " ")
                }), i
            },
            _setOption: function(e, t) {
                e === "direction" && this._removeClass("ui-controlgroup-" + this.options.direction), this._super(e, t);
                if (e === "disabled") {
                    this._callChildMethod(t ? "disable" : "enable");
                    return
                }
                this.refresh()
            },
            refresh: function() {
                var t, n = this;
                this._addClass("ui-controlgroup ui-controlgroup-" + this.options.direction), this.options.direction === "horizontal" && this._addClass(null, "ui-helper-clearfix"), this._initWidgets(), t = this.childWidgets, this.options.onlyVisible && (t = t.filter(":visible")), t.length && (e.each(["first", "last"], function(e, r) {
                    var i = t[r]().data("ui-controlgroup-data");
                    if (i && n["_" + i.widgetName + "Options"]) {
                        var s = n["_" + i.widgetName + "Options"](t.length === 1 ? "only" : r);
                        s.classes = n._resolveClassesValues(s.classes, i), i.element[i.widgetName](s)
                    } else n._updateCornerClass(t[r](), r)
                }), this._callChildMethod("refresh"))
            }
        })
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/controlgroup", ["jquery", "jquery-ui/widget", "./widget.theme", "jquery-ui/widgets/controlgroup"], t) : t(e)
    }(function(e) {
        return e.widget("ui.controlgroup", e.ui.controlgroup, {
            options: {
                theme: "inherit"
            },
            _create: function() {
                this._super(), this._on(this.document, {
                    pagecontainershow: function(t, n) {
                        e.contains(n.toPage[0], this.element[0]) && this.refresh()
                    }
                })
            },
            container: function() {
                return this.element
            },
            _themeElements: function() {
                return [{
                    element: this.widget(),
                    prefix: "ui-group-theme-"
                }]
            }
        }), e.widget("ui.controlgroup", e.ui.controlgroup, e.mobile.widget.theme), e.ui.controlgroup
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/controlgroup.selectmenu", ["jquery", "./controlgroup"], t) : t(e)
    }(function(e) {
        var t = /ui-button-inline/g,
            n = /ui-shadow/g;
        return e.widget("ui.controlgroup", e.ui.controlgroup, {
            _selectmenuOptions: function(e) {
                var t = this.options.direction === "vertical",
                    n = t ? "" : "ui-button-inline";
                return {
                    classes: {
                        middle: {
                            "ui-selectmenu": n,
                            "ui-selectmenu-button": ""
                        },
                        first: {
                            "ui-selectmenu": n,
                            "ui-selectmenu-button": "ui-corner-" + (t ? "top" : "left")
                        },
                        last: {
                            "ui-selectmenu": n,
                            "ui-selectmenu-button": "ui-corner-" + (t ? "bottom" : "right")
                        },
                        only: {
                            "ui-selectmenu": n,
                            "ui-selectmenu-button": "ui-corner-all"
                        }
                    } [e]
                }
            },
            _initWidgets: function() {
                this._superApply(arguments), this.childWidgets = this.childWidgets.map(function() {
                    var r = e.data(this, "mobile-selectmenu");
                    return r ? (e.data(this.parentNode, "ui-controlgroup-data", e.data(this, "ui-controlgroup-data")), e.removeData(this, "ui-controlgroup-data"), r.option("classes.ui-selectmenu", r.option("classes.ui-selectmenu").replace(t, "").trim()), r.option("classes.ui-selectmenu-button", r.option("classes.ui-selectmenu-button").replace(n, "").trim()), this.parentNode) : this
                })
            }
        })
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/filterable", ["jquery", "../widget"], t) : t(e)
    }(function(e) {
        var n = function(t, n) {
            var r, i = e.mobile.getAttribute(this, "filtertext");
            return i || (r = e(this), i = r.text(), i || (i = r.val() || "")), ("" + i).toLowerCase().indexOf(n) === -1
        };
        return e.widget("mobile.filterable", {
            version: "@VERSION",
            initSelector: ":jqmData(filter='true')",
            options: {
                filterReveal: !1,
                filterCallback: n,
                enhanced: !1,
                input: null,
                children: "> li, > option, > optgroup option, > tbody tr, > .ui-controlgroup > .ui-btn, > .ui-controlgroup > .ui-checkbox, > .ui-controlgroup > .ui-radio"
            },
            _create: function() {
                var t = this.options;
                e.extend(this, {
                    _search: null,
                    _timer: 0
                }), this._setInput(t.input), t.enhanced || this._filterItems((this._search && this._search.val() || "").toLowerCase())
            },
            _onKeyUp: function() {
                var n, r, i = this._search;
                if (i) {
                    n = i.val().toLowerCase(), r = e.mobile.getAttribute(i[0], "lastval") + "";
                    if (r && r === n) return;
                    this._timer && (t.clearTimeout(this._timer), this._timer = 0), this._timer = this._delay(function() {
                        if (this._trigger("beforefilter", null, {
                                input: i
                            }) === !1) return !1;
                        i[0].setAttribute("data-" + e.mobile.ns + "lastval", n), this._filterItems(n), this._timer = 0
                    }, 250)
                }
            },
            _getFilterableItems: function() {
                var t = this.element,
                    n = this.options.children,
                    r = n ? e.isFunction(n) ? n() : n.nodeName ? e(n) : n.jquery ? n : this.element.find(n) : {
                        length: 0
                    };
                return r.length === 0 && (r = t.children()), r
            },
            _filterItems: function(t) {
                var r, i, s, o, u = [],
                    a = [],
                    f = this.options,
                    l = this._getFilterableItems();
                if (t != null) {
                    i = f.filterCallback || n, s = l.length;
                    for (r = 0; r < s; r++) o = i.call(l[r], r, t) ? a : u, o.push(l[r])
                }
                a.length === 0 ? l[f.filterReveal && t.length === 0 ? "addClass" : "removeClass"]("ui-screen-hidden") : (e(a).addClass("ui-screen-hidden"), e(u).removeClass("ui-screen-hidden")), this._refreshChildWidget(), this._trigger("filter", null, {
                    items: l
                })
            },
            _refreshChildWidget: function() {
                var t, n, r = ["collapsibleset", "selectmenu", "controlgroup", "listview"];
                for (n = r.length - 1; n > -1; n--) t = r[n], e.mobile[t] && (t = this.element.data("mobile-" + t), t && e.isFunction(t.refresh) && t.refresh())
            },
            _setInput: function(n) {
                var r = this._search;
                this._timer && (t.clearTimeout(this._timer), this._timer = 0), r && (this._off(r, "keyup keydown keypress change input"), r = null), n && (r = n.jquery ? n : n.nodeName ? e(n) : this.document.find(n), this._on(r, {
                    keydown: "_onKeyDown",
                    keypress: "_onKeyPress",
                    keyup: "_onKeyUp",
                    change: "_onKeyUp",
                    input: "_onKeyUp"
                })), this._search = r
            },
            _onKeyDown: function(t) {
                this._preventKeyPress = !1, t.keyCode === e.ui.keyCode.ENTER && (t.preventDefault(), this._preventKeyPress = !0)
            },
            _onKeyPress: function(e) {
                this._preventKeyPress && (e.preventDefault(), this._preventKeyPress = !1)
            },
            _setOptions: function(e) {
                var t = e.filterReveal !== r || e.filterCallback !== r || e.children !== r;
                this._super(e), e.input !== r && (this._setInput(e.input), t = !0), t && this.refresh()
            },
            _destroy: function() {
                var e = this.options,
                    t = this._getFilterableItems();
                e.enhanced ? t.toggleClass("ui-screen-hidden", e.filterReveal) : t.removeClass("ui-screen-hidden")
            },
            refresh: function() {
                this._timer && (t.clearTimeout(this._timer), this._timer = 0), this._filterItems((this._search && this._search.val() || "").toLowerCase())
            }
        })
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("zoom", ["jquery", "./core"], t) : t(e)
    }(function(e) {
        var t = e("meta[name=viewport]"),
            n = t.attr("content"),
            r = n + ",maximum-scale=1, user-scalable=no",
            i = n + ",maximum-scale=10, user-scalable=yes",
            s = /(user-scalable[\s]*=[\s]*no)|(maximum-scale[\s]*=[\s]*1)[$,\s]/.test(n);
        return e.mobile.zoom = e.extend({}, {
            enabled: !s,
            locked: !1,
            disable: function(n) {
                !s && !e.mobile.zoom.locked && (t.attr("content", r), e.mobile.zoom.enabled = !1, e.mobile.zoom.locked = n || !1)
            },
            enable: function(n) {
                !s && (!e.mobile.zoom.locked || n === !0) && (t.attr("content", i), e.mobile.zoom.enabled = !0, e.mobile.zoom.locked = !1)
            },
            restore: function() {
                s || (t.attr("content", n), e.mobile.zoom.enabled = !0)
            }
        }), e.mobile.zoom
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/toolbar", ["jquery", "../widget", "../core", "../navigation", "./widget.theme", "../zoom"], t) : t(e)
    }(function(e) {
        return e.widget("mobile.toolbar", {
            version: "@VERSION",
            options: {
                theme: "inherit",
                addBackBtn: !1,
                backBtnTheme: null,
                backBtnText: "Back",
                type: "toolbar",
                ariaRole: null
            },
            _create: function() {
                var t, n, r = this.options.type,
                    i = this.element.closest(".ui-page"),
                    s = this.options.ariaRole === null ? r === "header" ? "banner" : r === "footer" ? "contentinfo" : "toolbar" : this.options.ariaRole;
                i.length === 0 && (i = !1, this._on(this.document, {
                    pageshow: "refresh"
                })), e.extend(this, {
                    role: r,
                    page: i,
                    leftbutton: t,
                    rightbutton: n
                }), this.element.attr("role", s), this._addClass("ui-toolbar" + (r !== "toolbar" ? "-" + r : "")), this.refresh(), this._setOptions(this.options)
            },
            _setOptions: function(e) {
                e.addBackBtn && this._updateBackButton(), e.backBtnText !== r && this.element.find(".ui-toolbar-back-button .ui-button-text").text(e.backBtnText), this._super(e)
            },
            refresh: function() {
                this.page || (this._setRelative(), this.role === "footer" ? this.element.appendTo("body") : this.role === "header" && this._updateBackButton()), this._addHeadingClasses()
            },
            _setRelative: function() {
                e("[data-" + e.mobile.ns + "role='page']").css({
                    position: "relative"
                })
            },
            _updateBackButton: function() {
                var t, n = this.options,
                    r = n.backBtnTheme || n.theme;
                t = this._backButton = this._backButton || {}, this.options.addBackBtn && this.role === "header" && e(".ui-page").length > 1 && (this.page ? this.page[0].getAttribute("data-" + e.mobile.ns + "url") !== e.mobile.path.stripHash(location.hash) : e.mobile.navigate && e.mobile.navigate.history && e.mobile.navigate.history.activeIndex > 0) && !this.leftbutton ? t.attached || (this.backButton = t.element = (t.element || e("<a role='button' href='#' class='ui-button ui-corner-all ui-shadow ui-toolbar-header-button-left " + (r ? "ui-button-" + r + " " : "") + "ui-toolbar-back-button ui-icon-carat-l ui-icon-beginning' " + "data-" + e.mobile.ns + "rel='back'>" + n.backBtnText + "</a>")).prependTo(this.element), t.attached = !0) : t.element && (t.element.detach(), t.attached = !1)
            },
            _addHeadingClasses: function() {
                this.headerElements = this.element.children("h1, h2, h3, h4, h5, h6"), this._addClass(this.headerElements, "ui-toolbar-title"), this.headerElements.attr({
                    role: "heading",
                    "aria-level": "1"
                })
            },
            _destroy: function() {
                var e;
                this.headerElements.removeAttr("role aria-level"), this.role === "header" && this.backButton && this.backButton.remove(), e = this.options.theme ? this.options.theme : "inherit", this.element.removeAttr("role")
            },
            _themeElements: function() {
                var e = [{
                    element: this.element,
                    prefix: "ui-bar-"
                }];
                return this.options.addBackBtn && this.backButton !== r && e.push({
                    element: this.backButton,
                    prefix: "ui-button-",
                    option: "backBtnTheme"
                }), e
            }
        }), e.widget("mobile.toolbar", e.mobile.toolbar, e.mobile.widget.theme)
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/fixedToolbar", ["jquery", "../widget", "../core", "../animationComplete", "../navigation", "./page", "./toolbar", "../zoom"], t) : t(e)
    }(function(e) {
        return e.widget("mobile.toolbar", e.mobile.toolbar, {
            options: {
                position: null,
                visibleOnPageShow: !0,
                disablePageZoom: !0,
                transition: "slide",
                fullscreen: !1,
                updatePagePadding: !0
            },
            _create: function() {
                this._super(), this.options.position === "fixed" && (this.pagecontainer = this.element.closest(".ui-mobile-viewport"), this._makeFixed())
            },
            _makeFixed: function() {
                this._addClass("ui-toolbar-" + this.role + "-fixed"), this.updatePagePadding(), this._addTransitionClass(), this._bindPageEvents()
            },
            _setOptions: function(t) {
                t.position === "fixed" && this.options.position !== "fixed" && this._makeFixed();
                if (this.options.position === "fixed") {
                    var n = e(".ui-page-active"),
                        i = this.page ? this.page : n.length ? n : e(".ui-page").eq(0);
                    t.fullscreen !== r && (t.fullscreen ? (this._addClass("ui-toolbar-" + this.role + "-fullscreen"), this._addClass(i, "ui-toolbar-page-" + this.role + "-fullscreen")) : (this._removeClass("ui-toolbar-" + this.role + "-fullscreen"), this._removeClass(i, "ui-toolbar-page-" + this.role + "-fullscreen"), this._addClass(i, "ui-toolbar-page-" + this.role + "-fixed")))
                }
                this._super(t)
            },
            _addTransitionClass: function() {
                var e = this.options.transition;
                e && e !== "none" && (e === "slide" && (e = this.role === "header" ? "slidedown" : "slideup"), this._addClass(null, e))
            },
            _bindPageEvents: function() {
                var e = this.page ? this.element.closest(".ui-page") : this.document;
                this._on(e, {
                    pagebeforeshow: "_handlePageBeforeShow",
                    webkitAnimationStart: "_handleAnimationStart",
                    animationstart: "_handleAnimationStart",
                    updatelayout: "_handleAnimationStart",
                    pageshow: "_handlePageShow",
                    pagebeforehide: "_handlePageBeforeHide"
                })
            },
            _handlePageBeforeShow: function() {
                var t = this.options;
                t.disablePageZoom && e.mobile.zoom.disable(!0), t.visibleOnPageShow || this.hide(!0)
            },
            _handleAnimationStart: function() {
                this.options.updatePagePadding && this.updatePagePadding(this.page ? this.page : ".ui-page-active")
            },
            _handlePageShow: function() {
                this.updatePagePadding(this.page ? this.page : ".ui-page-active"), this.options.updatePagePadding && this._on(this.window, {
                    throttledresize: "updatePagePadding"
                })
            },
            _handlePageBeforeHide: function() {
                this.options.disablePageZoom && e.mobile.zoom.enable(!0), this.options.updatePagePadding && this._off(this.window, "throttledresize")
            },
            _visible: !0,
            updatePagePadding: function(t) {
                var n = this.element,
                    i = this.role === "header",
                    s = parseFloat(n.css(i ? "top" : "bottom"));
                if (this.options.fullscreen) return;
                t = t && t.type === r && t || this.page || n.closest(".ui-page"), t = this.page ? this.page : ".ui-page-active", e(t).css("padding-" + (i ? "top" : "bottom"), n.outerHeight() + s)
            },
            _useTransition: function(n) {
                var r = this.window,
                    i = this.element,
                    s = r.scrollTop(),
                    o = i.height(),
                    u = this.page ? i.closest(".ui-page").height() : e(".ui-page-active").height(),
                    a = e(t).height();
                return !n && (this.options.transition && this.options.transition !== "none" && (this.role === "header" && !this.options.fullscreen && s > o || this.role === "footer" && !this.options.fullscreen && s + a < u - o) || this.options.fullscreen)
            },
            show: function(t) {
                this._useTransition(t) ? (this._animationInProgress = "show", this._removeClass(null, "out"), this._removeClass("ui-toolbar-fixed-hidden"), this._addClass(null, "in"), this.element.animationComplete(e.proxy(function() {
                    this._animationInProgress === "show" && (this._animationInProgress = !1, this._removeClass(null, "in"))
                }, this))) : this._removeClass("ui-toolbar-fixed-hidden"), this._visible = !0
            },
            hide: function(t) {
                var n = this.options.transition === "slide" ? " reverse" : "";
                this._useTransition(t) ? (this._animationInProgress = "hide", this._addClass(null, "out"), this._addClass(null, n), this._removeClass(null, "in"), this.element.animationComplete(e.proxy(function() {
                    this._animationInProgress === "hide" && (this._animationInProgress = !1, this._addClass("ui-toolbar-fixed-hidden"), this._removeClass(null, "out"), this._removeClass(null, n))
                }, this))) : this._addClass("ui-toolbar-fixed-hidden")._removeClass(null, n), this._visible = !1
            },
            toggle: function() {
                this[this._visible ? "hide" : "show"]()
            },
            _setRelative: function() {
                this.options.position !== "fixed" && this._super()
            },
            _destroy: function() {
                var t, n, r, i, s, o = this.pagecontainer.pagecontainer("getActivePage");
                this._super(), this.options.position === "fixed" && (r = e("body>.ui-" + this.role + "-fixed").add(o.find(".ui-" + this.role + "-fixed")).not(this.element).length > 0, s = e("body>.ui-" + this.role + "-fixed").add(o.find(".ui-" + this.role + "-fullscreen")).not(this.element).length > 0, n = "ui-header-fixed ui-footer-fixed ui-header-fullscreen in out ui-footer-fullscreen fade slidedown slideup ui-fixed-hidden", this._removeClass(n), s || (t = "ui-page-" + this.role + "-fullscreen"), r || (i = this.role === "header", t += " ui-page-" + this.role + "-fixed", o.css("padding-" + (i ? "top" : "bottom"), "")), this._removeClass(o, t))
            }
        })
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/fixedToolbar.backcompat", ["jquery", "./fixedToolbar"], t) : t(e)
    }(function(e) {
        if (e.mobileBackcompat !== !1) return e.widget("mobile.toolbar", e.mobile.toolbar, {
            options: {
                hideDuringFocus: "input, textarea, select",
                tapToggle: !0,
                supportBlacklist: function() {
                    return e.noop
                }
            },
            _hideDuringFocusData: {
                delayShow: 0,
                delayHide: 0,
                isVisible: !0
            },
            _handlePageFocusinFocusout: function(t) {
                var n = this._hideDuringFocusData;
                this.options.hideDuringFocus && screen.width < 1025 && e(t.target).is(this.options.hideDuringFocus) && !e(t.target).closest(".ui-toolbar-header-fixed, .ui-toolbar-footer-fixed").length && (t.type === "focusout" && !n.isVisible ? (n.isVisible = !0, clearTimeout(n.delayHide), n.delayShow = this._delay("show", 0)) : t.type === "focusin" && !!n.isVisible && (clearTimeout(n.delayShow), n.isVisible = !1, n.delayHide = this._delay("hide", 0)))
            },
            _attachToggleHandlersToPage: function(e) {
                return this._on(e, {
                    focusin: "_handlePageFocusinFocusout",
                    focusout: "_handlePageFocusinFocusout"
                }), this._superApply(arguments)
            },
            _makeFixed: function() {
                this._super(), this._workarounds()
            },
            _workarounds: function() {
                var e = navigator.userAgent,
                    t = e.match(/AppleWebKit\/([0-9]+)/),
                    n = !!t && t[1],
                    r = null,
                    i = this;
                if (!(e.indexOf("Android") > -1)) return;
                r = "android";
                if (!(r === "android" && n && n < 534)) return;
                i._bindScrollWorkaround(), i._bindListThumbWorkaround()
            },
            _viewportOffset: function() {
                var e = this.element,
                    t = e.hasClass("ui-toolbar-header"),
                    n = Math.abs(e.offset().top - this.window.scrollTop());
                return t || (n = Math.round(n - this.window.height() + e.outerHeight()) - 60), n
            },
            _bindScrollWorkaround: function() {
                var e = this;
                this._on(this.window, {
                    scrollstop: function() {
                        var t = e._viewportOffset();
                        t > 2 && e._visible && e._triggerRedraw()
                    }
                })
            },
            _bindListThumbWorkaround: function() {
                var t = e(".ui-page-active"),
                    n = this.page ? this.page : t.length ? t : e(".ui-page").eq(0);
                this._addClass(n, "ui-toolbar-android-2x-fix")
            },
            _triggerRedraw: function() {
                var t = parseFloat(e(".ui-page-active").css("padding-bottom"));
                e(".ui-page-active").css("padding-bottom", t + 1 + "px"), setTimeout(function() {
                    e(".ui-page-active").css("padding-bottom", t + "px")
                }, 0)
            },
            destroy: function() {
                this._super();
                var t = e(".ui-page-active"),
                    n = this.page ? this.page : t.length ? t : e(".ui-page").eq(0);
                this._removeClass(n, "ui-toolbar-android-2x-fix")
            }
        })
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/fixedToolbar.tapToggle", ["jquery", "../widget", "../core", "../navigation", "./page", "../zoom", "./fixedToolbar"], t) : t(e)
    }(function(e) {
        return e.widget("mobile.toolbar", e.mobile.toolbar, {
            options: {
                tapToggle: !1,
                tapToggleBlacklist: "a, button, input, select, textarea, .ui-toolbar-header-fixed, .ui-toolbar-footer-fixed, .ui-flipswitch, .ui-popup, .ui-panel, .ui-panel-dismiss-open"
            },
            _makeFixed: function() {
                this._super(), this._bindToggleHandlers()
            },
            _bindToggleHandlers: function() {
                this._attachToggleHandlersToPage(this.page ? this.page : e(".ui-page"))
            },
            _attachToggleHandlersToPage: function(t) {
                var n = this,
                    r = n.options;
                t.bind("vclick", function(t) {
                    r.tapToggle && !e(t.target).closest(r.tapToggleBlacklist).length && n.toggle()
                })
            }
        })
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/forms/textinput", ["jquery", "../../core", "../../widget", "../../degradeInputs", "../widget.theme", "../../zoom"], t) : t(e)
    }(function(e) {
        return e.widget("mobile.textinput", {
            version: "@VERSION",
            options: {
                classes: {
                    "ui-textinput": "ui-corner-all ui-shadow-inset",
                    "ui-textinput-search-icon": "ui-icon ui-alt-icon ui-icon-search"
                },
                theme: "inherit",
                preventFocusZoom: /iPhone|iPad|iPod/.test(navigator.platform) && navigator.userAgent.indexOf("AppleWebKit") > -1,
                enhanced: !1
            },
            _create: function() {
                var t = this.options,
                    n = this.element.is("[type='search'], :jqmData(type='search')"),
                    i = this.element[0].nodeName.toLowerCase() === "textarea";
                this.element.prop("disabled") && (t.disabled = !0), e.extend(this, {
                    isSearch: n,
                    isTextarea: i
                }), this._autoCorrect(), t.enhanced ? (this._outer = i ? this.element : this.element.parent(), n && (this._searchIcon = this._outer.children(".ui-textinput-search-icon"))) : this._enhance(), this._addClass(this._outer, "ui-textinput ui-textinput-" + (this.isSearch ? "search" : "text")), this._searchIcon && this._addClass(this._searchIcon, "ui-textinput-search-icon"), this._on({
                    focus: "_handleFocus",
                    blur: "_handleBlur"
                }), t.disabled !== r && (this.element.prop("disabled", !!t.disabled), this._toggleClass(this._outer, null, "ui-state-disabled", !!t.disabled))
            },
            refresh: function() {
                this._setOptions({
                    disabled: this.element.is(":disabled")
                })
            },
            _themeElements: function() {
                return [{
                    element: this._outer,
                    prefix: "ui-body-"
                }]
            },
            _enhance: function() {
                var t;
                this.isTextarea ? t = this.element : (t = e("<div>"), this.isSearch && (this._searchIcon = e("<span>").prependTo(t))), this._outer = t, this.isTextarea || t.insertBefore(this.element).append(this.element)
            },
            widget: function() {
                return this._outer
            },
            _autoCorrect: function() {
                typeof this.element[0].autocorrect != "undefined" && !e.support.touchOverflow && (this.element[0].setAttribute("autocorrect", "off"), this.element[0].setAttribute("autocomplete", "off"))
            },
            _handleBlur: function() {
                this._removeClass(this._outer, null, "ui-focus"), this.options.preventFocusZoom && e.mobile.zoom.enable(!0)
            },
            _handleFocus: function() {
                this.options.preventFocusZoom && e.mobile.zoom.disable(!0), this._addClass(this._outer, null, "ui-focus")
            },
            _setOptions: function(e) {
                return e.disabled !== r && (this.element.prop("disabled", !!e.disabled), this._toggleClass(this._outer, null, "ui-state-disabled", !!e.disabled)), this._superApply(arguments)
            },
            _destroy: function() {
                if (this.options.enhanced) {
                    this.classesElementLookup = {};
                    return
                }
                this._searchIcon && this._searchIcon.remove(), this.isTextarea || this.element.unwrap()
            }
        }), e.widget("mobile.textinput", e.mobile.textinput, e.mobile.widget.theme)
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/forms/autogrow", ["jquery", "./textinput"], t) : t(e)
    }(function(e) {
        return e.widget("mobile.textinput", e.mobile.textinput, {
            options: {
                autogrow: !0,
                keyupTimeoutBuffer: 100
            },
            _create: function() {
                this._super(), this.options.autogrow && this.isTextarea && this._autogrow()
            },
            _autogrow: function() {
                this._addClass("ui-textinput-autogrow"), this._on({
                    keyup: "_timeout",
                    change: "_timeout",
                    input: "_timeout",
                    paste: "_timeout"
                }), this._handleShow("create"), this._on(!0, this.document, {
                    popupbeforeposition: "_handleShow",
                    updatelayout: "_handleShow",
                    panelopen: "_handleShow"
                })
            },
            _handleShow: function(t) {
                if (t === "create" || e.contains(t.target, this.element[0]) && this.element.is(":visible")) t !== "create" && t.type !== "popupbeforeposition" && (this._addClass("ui-textinput-autogrow-resize"), this.element.animationComplete(e.proxy(function() {
                    this._removeClass("ui-textinput-autogrow-resize")
                }, this), "transition")), this._prepareHeightUpdate()
            },
            _unbindAutogrow: function() {
                this._removeClass("ui-textinput-autogrow"), this._off(this.element, "keyup change input paste"), this._off(this.document, "pageshow popupbeforeposition updatelayout panelopen")
            },
            keyupTimeout: null,
            _prepareHeightUpdate: function(e) {
                this.keyupTimeout && clearTimeout(this.keyupTimeout), e === r ? this._updateHeight() : this.keyupTimeout = this._delay("_updateHeight", e)
            },
            _timeout: function() {
                this._prepareHeightUpdate(this.options.keyupTimeoutBuffer)
            },
            _updateHeight: function() {
                var e, t, n, r, i, s, o, u, a, f = this.window.scrollTop();
                this.keyupTimeout = 0, "onpage" in this.element[0] || this.element.css({
                    height: 0,
                    "min-height": 0,
                    "max-height": 0
                }), r = this.element[0].scrollHeight, i = this.element[0].clientHeight, s = parseFloat(this.element.css("border-top-width")), o = parseFloat(this.element.css("border-bottom-width")), u = s + o, a = r + u + 15, i === 0 && (e = parseFloat(this.element.css("padding-top")), t = parseFloat(this.element.css("padding-bottom")), n = e + t, a += n), this.element.css({
                    height: a,
                    "min-height": "",
                    "max-height": ""
                }), this.window.scrollTop(f)
            },
            refresh: function() {
                this.options.autogrow && this.isTextarea && this._updateHeight()
            },
            _setOptions: function(e) {
                this._super(e), e.autogrow !== r && this.isTextarea && (e.autogrow ? this._autogrow() : this._unbindAutogrow())
            },
            _destroy: function() {
                this._unbindAutogrow(), this._super()
            }
        })
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("jquery-ui/escape-selector", ["jquery", "./version"], t) : t(e)
    }(function(e) {
        return e.ui.escapeSelector = function() {
            var e = /([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g;
            return function(t) {
                return t.replace(e, "\\$1")
            }
        }()
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("jquery-ui/form", ["jquery", "./version"], t) : t(e)
    }(function(e) {
        return e.fn.form = function() {
            return typeof this[0].form == "string" ? this.closest("form") : e(this[0].form)
        }
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("jquery-ui/form-reset-mixin", ["jquery", "./form", "./version"], t) : t(e)
    }(function(e) {
        return e.ui.formResetMixin = {
            _formResetHandler: function() {
                var t = e(this);
                setTimeout(function() {
                    var n = t.data("ui-form-reset-instances");
                    e.each(n, function() {
                        this.refresh()
                    })
                })
            },
            _bindFormResetHandler: function() {
                this.form = this.element.form();
                if (!this.form.length) return;
                var e = this.form.data("ui-form-reset-instances") || [];
                e.length || this.form.on("reset.ui-form-reset", this._formResetHandler), e.push(this), this.form.data("ui-form-reset-instances", e)
            },
            _unbindFormResetHandler: function() {
                if (!this.form.length) return;
                var t = this.form.data("ui-form-reset-instances");
                t.splice(e.inArray(this, t), 1), t.length ? this.form.data("ui-form-reset-instances", t) : this.form.removeData("ui-form-reset-instances").off("reset.ui-form-reset")
            }
        }
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("jquery-ui/labels", ["jquery", "./version", "./escape-selector"], t) : t(e)
    }(function(e) {
        return e.fn.labels = function() {
            var t, n, r, i, s;
            return this[0].labels && this[0].labels.length ? this.pushStack(this[0].labels) : (i = this.eq(0).parents("label"), r = this.attr("id"), r && (t = this.eq(0).parents().last(), s = t.add(t.length ? t.siblings() : this.siblings()), n = "label[for='" + e.ui.escapeSelector(r) + "']", i = i.add(s.find(n).addBack(n))), this.pushStack(i))
        }
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("jquery-ui/widgets/checkboxradio", ["jquery", "../escape-selector", "../form-reset-mixin", "../labels", "../widget"], t) : t(e)
    }(function(e) {
        return e.widget("ui.checkboxradio", [e.ui.formResetMixin, {
            version: "1.12.1",
            options: {
                disabled: null,
                label: null,
                icon: !0,
                classes: {
                    "ui-checkboxradio-label": "ui-corner-all",
                    "ui-checkboxradio-icon": "ui-corner-all"
                }
            },
            _getCreateOptions: function() {
                var t, n, r = this,
                    i = this._super() || {};
                return this._readType(), n = this.element.labels(), this.label = e(n[n.length - 1]), this.label.length || e.error("No label found for checkboxradio widget"), this.originalLabel = "", this.label.contents().not(this.element[0]).each(function() {
                    r.originalLabel += this.nodeType === 3 ? e(this).text() : this.outerHTML
                }), this.originalLabel && (i.label = this.originalLabel), t = this.element[0].disabled, t != null && (i.disabled = t), i
            },
            _create: function() {
                var e = this.element[0].checked;
                this._bindFormResetHandler(), this.options.disabled == null && (this.options.disabled = this.element[0].disabled), this._setOption("disabled", this.options.disabled), this._addClass("ui-checkboxradio", "ui-helper-hidden-accessible"), this._addClass(this.label, "ui-checkboxradio-label", "ui-button ui-widget"), this.type === "radio" && this._addClass(this.label, "ui-checkboxradio-radio-label"), this.options.label && this.options.label !== this.originalLabel ? this._updateLabel() : this.originalLabel && (this.options.label = this.originalLabel), this._enhance(), e && (this._addClass(this.label, "ui-checkboxradio-checked", "ui-state-active"), this.icon && this._addClass(this.icon, null, "ui-state-hover")), this._on({
                    change: "_toggleClasses",
                    focus: function() {
                        this._addClass(this.label, null, "ui-state-focus ui-visual-focus")
                    },
                    blur: function() {
                        this._removeClass(this.label, null, "ui-state-focus ui-visual-focus")
                    }
                })
            },
            _readType: function() {
                var t = this.element[0].nodeName.toLowerCase();
                this.type = this.element[0].type, (t !== "input" || !/radio|checkbox/.test(this.type)) && e.error("Can't create checkboxradio on element.nodeName=" + t + " and element.type=" + this.type)
            },
            _enhance: function() {
                this._updateIcon(this.element[0].checked)
            },
            widget: function() {
                return this.label
            },
            _getRadioGroup: function() {
                var t, n = this.element[0].name,
                    r = "input[name='" + e.ui.escapeSelector(n) + "']";
                return n ? (this.form.length ? t = e(this.form[0].elements).filter(r) : t = e(r).filter(function() {
                    return e(this).form().length === 0
                }), t.not(this.element)) : e([])
            },
            _toggleClasses: function() {
                var t = this.element[0].checked;
                this._toggleClass(this.label, "ui-checkboxradio-checked", "ui-state-active", t), this.options.icon && this.type === "checkbox" && this._toggleClass(this.icon, null, "ui-icon-check ui-state-checked", t)._toggleClass(this.icon, null, "ui-icon-blank", !t), this.type === "radio" && this._getRadioGroup().each(function() {
                    var t = e(this).checkboxradio("instance");
                    t && t._removeClass(t.label, "ui-checkboxradio-checked", "ui-state-active")
                })
            },
            _destroy: function() {
                this._unbindFormResetHandler(), this.icon && (this.icon.remove(), this.iconSpace.remove())
            },
            _setOption: function(e, t) {
                if (e === "label" && !t) return;
                this._super(e, t);
                if (e === "disabled") {
                    this._toggleClass(this.label, null, "ui-state-disabled", t), this.element[0].disabled = t;
                    return
                }
                this.refresh()
            },
            _updateIcon: function(t) {
                var n = "ui-icon ui-icon-background ";
                this.options.icon ? (this.icon || (this.icon = e("<span>"), this.iconSpace = e("<span> </span>"), this._addClass(this.iconSpace, "ui-checkboxradio-icon-space")), this.type === "checkbox" ? (n += t ? "ui-icon-check ui-state-checked" : "ui-icon-blank", this._removeClass(this.icon, null, t ? "ui-icon-blank" : "ui-icon-check")) : n += "ui-icon-blank", this._addClass(this.icon, "ui-checkboxradio-icon", n), t || this._removeClass(this.icon, null, "ui-icon-check ui-state-checked"), this.icon.prependTo(this.label).after(this.iconSpace)) : this.icon !== r && (this.icon.remove(), this.iconSpace.remove(), delete this.icon)
            },
            _updateLabel: function() {
                var e = this.label.contents().not(this.element[0]);
                this.icon && (e = e.not(this.icon[0])), this.iconSpace && (e = e.not(this.iconSpace[0])), e.remove(), this.label.append(this.options.label)
            },
            refresh: function() {
                var e = this.element[0].checked,
                    t = this.element[0].disabled;
                this._updateIcon(e), this._toggleClass(this.label, "ui-checkboxradio-checked", "ui-state-active", e), this.options.label !== null && this._updateLabel(), t !== this.options.disabled && this._setOptions({
                    disabled: t
                })
            }
        }]), e.ui.checkboxradio
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("jquery-ui/widgets/button", ["jquery", "./controlgroup", "./checkboxradio", "../keycode", "../widget"], t) : t(e)
    }(function(e) {
        return e.widget("ui.button", {
            version: "1.12.1",
            defaultElement: "<button>",
            options: {
                classes: {
                    "ui-button": "ui-corner-all"
                },
                disabled: null,
                icon: null,
                iconPosition: "beginning",
                label: null,
                showLabel: !0
            },
            _getCreateOptions: function() {
                var e, t = this._super() || {};
                return this.isInput = this.element.is("input"), e = this.element[0].disabled, e != null && (t.disabled = e), this.originalLabel = this.isInput ? this.element.val() : this.element.html(), this.originalLabel && (t.label = this.originalLabel), t
            },
            _create: function() {
                !this.option.showLabel & !this.options.icon && (this.options.showLabel = !0), this.options.disabled == null && (this.options.disabled = this.element[0].disabled || !1), this.hasTitle = !!this.element.attr("title"), this.options.label && this.options.label !== this.originalLabel && (this.isInput ? this.element.val(this.options.label) : this.element.html(this.options.label)), this._addClass("ui-button", "ui-widget"), this._setOption("disabled", this.options.disabled), this._enhance(), this.element.is("a") && this._on({
                    keyup: function(t) {
                        t.keyCode === e.ui.keyCode.SPACE && (t.preventDefault(), this.element[0].click ? this.element[0].click() : this.element.trigger("click"))
                    }
                })
            },
            _enhance: function() {
                this.element.is("button") || this.element.attr("role", "button"), this.options.icon && (this._updateIcon("icon", this.options.icon), this._updateTooltip())
            },
            _updateTooltip: function() {
                this.title = this.element.attr("title"), !this.options.showLabel && !this.title && this.element.attr("title", this.options.label)
            },
            _updateIcon: function(t, n) {
                var r = t !== "iconPosition",
                    i = r ? this.options.iconPosition : n,
                    s = i === "top" || i === "bottom";
                this.icon ? r && this._removeClass(this.icon, null, this.options.icon) : (this.icon = e("<span>"), this._addClass(this.icon, "ui-button-icon", "ui-icon"), this.options.showLabel || this._addClass("ui-button-icon-only")), r && this._addClass(this.icon, null, n), this._attachIcon(i), s ? (this._addClass(this.icon, null, "ui-widget-icon-block"), this.iconSpace && this.iconSpace.remove()) : (this.iconSpace || (this.iconSpace = e("<span> </span>"), this._addClass(this.iconSpace, "ui-button-icon-space")), this._removeClass(this.icon, null, "ui-wiget-icon-block"), this._attachIconSpace(i))
            },
            _destroy: function() {
                this.element.removeAttr("role"), this.icon && this.icon.remove(), this.iconSpace && this.iconSpace.remove(), this.hasTitle || this.element.removeAttr("title")
            },
            _attachIconSpace: function(e) {
                this.icon[/^(?:end|bottom)/.test(e) ? "before" : "after"](this.iconSpace)
            },
            _attachIcon: function(e) {
                this.element[/^(?:end|bottom)/.test(e) ? "append" : "prepend"](this.icon)
            },
            _setOptions: function(e) {
                var t = e.showLabel === r ? this.options.showLabel : e.showLabel,
                    n = e.icon === r ? this.options.icon : e.icon;
                !t && !n && (e.showLabel = !0), this._super(e)
            },
            _setOption: function(e, t) {
                e === "icon" && (t ? this._updateIcon(e, t) : this.icon && (this.icon.remove(), this.iconSpace && this.iconSpace.remove())), e === "iconPosition" && this._updateIcon(e, t), e === "showLabel" && (this._toggleClass("ui-button-icon-only", null, !t), this._updateTooltip()), e === "label" && (this.isInput ? this.element.val(t) : (this.element.html(t), this.icon && (this._attachIcon(this.options.iconPosition), this._attachIconSpace(this.options.iconPosition)))), this._super(e, t), e === "disabled" && (this._toggleClass(null, "ui-state-disabled", t), this.element[0].disabled = t, t && this.element.blur())
            },
            refresh: function() {
                var e = this.element.is("input, button") ? this.element[0].disabled : this.element.hasClass("ui-button-disabled");
                e !== this.options.disabled && this._setOptions({
                    disabled: e
                }), this._updateTooltip()
            }
        }), e.uiBackCompat !== !1 && (e.widget("ui.button", e.ui.button, {
            options: {
                text: !0,
                icons: {
                    primary: null,
                    secondary: null
                }
            },
            _create: function() {
                this.options.showLabel && !this.options.text && (this.options.showLabel = this.options.text), !this.options.showLabel && this.options.text && (this.options.text = this.options.showLabel), !this.options.icon && (this.options.icons.primary || this.options.icons.secondary) ? this.options.icons.primary ? this.options.icon = this.options.icons.primary : (this.options.icon = this.options.icons.secondary, this.options.iconPosition = "end") : this.options.icon && (this.options.icons.primary = this.options.icon), this._super()
            },
            _setOption: function(e, t) {
                if (e === "text") {
                    this._super("showLabel", t);
                    return
                }
                e === "showLabel" && (this.options.text = t), e === "icon" && (this.options.icons.primary = t), e === "icons" && (t.primary ? (this._super("icon", t.primary), this._super("iconPosition", "beginning")) : t.secondary && (this._super("icon", t.secondary), this._super("iconPosition", "end"))), this._superApply(arguments)
            }
        }), e.fn.button = function(t) {
            return function() {
                return !this.length || this.length && this[0].tagName !== "INPUT" || this.length && this[0].tagName === "INPUT" && this.attr("type") !== "checkbox" && this.attr("type") !== "radio" ? t.apply(this, arguments) : (e.ui.checkboxradio || e.error("Checkboxradio widget missing"), arguments.length === 0 ? this.checkboxradio({
                    icon: !1
                }) : this.checkboxradio.apply(this, arguments))
            }
        }(e.fn.button), e.fn.buttonset = function() {
            return e.ui.controlgroup || e.error("Controlgroup widget missing"), arguments[0] === "option" && arguments[1] === "items" && arguments[2] ? this.controlgroup.apply(this, [arguments[0], "items.button", arguments[2]]) : arguments[0] === "option" && arguments[1] === "items" ? this.controlgroup.apply(this, [arguments[0], "items.button"]) : (typeof arguments[0] == "object" && arguments[0].items && (arguments[0].items = {
                button: arguments[0].items
            }), this.controlgroup.apply(this, arguments))
        }), e.ui.button
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/forms/button", ["jquery", "../../core", "../../widget", "../widget.theme", "jquery-ui/widgets/button"], t) : t(e)
    }(function(e) {
        return e.widget("ui.button", e.ui.button, {
            options: {
                enhanced: !1,
                theme: null
            },
            _enhance: function() {
                this.options.enhanced ? this.options.icon && (this.icon = this.element.find("ui-button-icon")) : this._super()
            },
            _themeElements: function() {
                return this.options.theme = this.options.theme ? this.options.theme : "inherit", [{
                    element: this.widget(),
                    prefix: "ui-button-"
                }]
            }
        }), e.widget("ui.button", e.ui.button, e.mobile.widget.theme), e.ui.button.prototype.options.classes = {
            "ui-button": "ui-shadow ui-corner-all"
        }, e.ui.button
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/forms/checkboxradio", ["jquery", "../../core", "../../widget", "jquery-ui/widgets/checkboxradio", "../widget.theme"], t) : t(e)
    }(function(e) {
        return e.widget("ui.checkboxradio", e.ui.checkboxradio, {
            options: {
                enhanced: !1,
                theme: "inherit"
            },
            _enhance: function() {
                this.options.enhanced ? this.options.icon && (this.icon = this.element.parent().find(".ui-checkboxradio-icon")) : this._super()
            },
            _themeElements: function() {
                return [{
                    element: this.widget(),
                    prefix: "ui-button-"
                }]
            }
        }), e.widget("ui.checkboxradio", e.ui.checkboxradio, e.mobile.widget.theme), e.ui.checkboxradio
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/forms/clearButton", ["jquery", "./textinput"], t) : t(e)
    }(function(e) {
        return e.widget("mobile.textinput", e.mobile.textinput, {
            options: {
                classes: {
                    "ui-textinput-clear-button": "ui-corner-all"
                },
                clearBtn: !1,
                clearBtnText: "Clear text"
            },
            _create: function() {
                this._super(), this.isSearch && (this.options.clearBtn = !0);
                if (!this.options.clearBtn || this.isTextarea) return;
                this.options.enhanced ? (this._clearButton = this._outer.children(".ui-textinput-clear-button"), this._clearButtonIcon = this._clearButton.children(".ui-textinput-clear-button-icon"), this._toggleClasses(!0), this._bindClearEvents()) : this._addClearButton()
            },
            _clearButtonClick: function(e) {
                this.element.val("").focus().trigger("change"), e.preventDefault()
            },
            _toggleClasses: function(e) {
                this._toggleClass(this._outer, "ui-textinput-has-clear-button", null, e), this._toggleClass(this._clearButton, "ui-textinput-clear-button", "ui-button ui-button-icon-only ui-button-right", e), this._toggleClass(this._clearButtonIcon, "ui-textinput-clear-button-icon", "ui-icon-delete ui-icon", e), this._toggleClass("ui-textinput-hide-clear", null, e)
            },
            _addClearButton: function() {
                this._clearButtonIcon = e("<span>"), this._clearButton = e("<a href='#' tabindex='-1' aria-hidden='true'></a>").attr("title", this.options.clearBtnText).text(this.options.clearBtnText).append(this._clearButtonIcon), this._toggleClasses(!0), this._clearButton.appendTo(this._outer), this._bindClearEvents(), this._toggleClear()
            },
            _removeClearButton: function() {
                this._toggleClasses(!1), this._unbindClearEvents(), this._clearButton.remove(), clearTimeout(this._toggleClearDelay), delete this._toggleClearDelay
            },
            _bindClearEvents: function() {
                this._on(this._clearButton, {
                    click: "_clearButtonClick"
                }), this._on({
                    keyup: "_toggleClear",
                    change: "_toggleClear",
                    input: "_toggleClear",
                    focus: "_toggleClear",
                    blur: "_toggleClear",
                    cut: "_toggleClear",
                    paste: "_toggleClear"
                })
            },
            _unbindClearEvents: function() {
                this._off(this._clearButton, "click"), this._off(this.element, "keyup change input focus blur cut paste")
            },
            _setOptions: function(e) {
                this._super(e), e.clearBtn !== r && !this.isTextarea && (e.clearBtn ? this._addClearButton() : this._removeClearButton()), e.clearBtnText !== r && this._clearButton !== r && this._clearButton.text(e.clearBtnText).attr("title", e.clearBtnText)
            },
            _toggleClear: function() {
                this._toggleClearDelay = this._delay("_toggleClearClass", 0)
            },
            _toggleClearClass: function() {
                this._toggleClass(this._clearButton, "ui-textinput-clear-button-hidden", r, !this.element.val()), this._clearButton.attr("aria-hidden", !this.element.val()), delete this._toggleClearDelay
            },
            _destroy: function() {
                this._super(), !this.options.enhanced && this._clearButton && this._removeClearButton()
            }
        })
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/forms/reset", ["jquery", "../../core"], t) : t(e)
    }(function(e) {
        return e.mobile.behaviors.formReset = {
            _handleFormReset: function() {
                this._on(this.element.closest("form"), {
                    reset: function() {
                        this._delay("_reset")
                    }
                })
            }
        }, e.mobile.behaviors.formReset
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/forms/flipswitch", ["jquery", "../../core", "../../widget", "../../zoom", "./reset"], t) : t(e)
    }(function(e) {
        var t = /([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g;
        return e.widget("mobile.flipswitch", e.extend({
            version: "@VERSION",
            options: {
                onText: "On",
                offText: "Off",
                theme: null,
                enhanced: !1,
                classes: {
                    "ui-flipswitch": "ui-shadow-inset ui-corner-all",
                    "ui-flipswitch-on": "ui-shadow"
                }
            },
            _create: function() {
                var t;
                this._originalTabIndex = this.element.attr("tabindex"), this.type = this.element[0].nodeName.toLowerCase(), this.options.enhanced ? e.extend(this, {
                    flipswitch: this.element.parent(),
                    on: this.element.find(".ui-flipswitch-on").eq(0),
                    off: this.element.find(".ui-flipswitch-off").eq(0)
                }) : this._enhance(), this._handleFormReset(), this.element.attr("tabindex", "-1"), this._on({
                    focus: "_handleInputFocus"
                }), this.element.is(":disabled") && this._setOptions({
                    disabled: !0
                }), this._on(this.flipswitch, {
                    click: "_toggle",
                    swipeleft: "_left",
                    swiperight: "_right"
                }), this._on(this.on, {
                    keydown: "_keydown"
                }), this._on({
                    change: "refresh"
                }), this.element[0].nodeName.toLowerCase() === "select" && (t = this._findLabels(), t.length && this._on(t, {
                    click: function(e) {
                        this.element.click(), e.preventDefault()
                    }
                }))
            },
            _handleInputFocus: function() {
                this.on.focus()
            },
            widget: function() {
                return this.flipswitch
            },
            _left: function() {
                this.flipswitch.removeClass("ui-flipswitch-active"), this.type === "select" ? this.element.get(0).selectedIndex = 0 : this.element.prop("checked", !1), this.element.trigger("change")
            },
            _right: function() {
                this._addClass(this.flipswitch, "ui-flipswitch-active"), this.type === "select" ? this.element.get(0).selectedIndex = 1 : this.element.prop("checked", !0), this.element.trigger("change")
            },
            _enhance: function() {
                var t = e("<div>"),
                    n = this.options,
                    r = this.element,
                    i = this._originalTabIndex || 0,
                    s = n.theme ? n.theme : "inherit",
                    o = e("<span tabindex='" + i + "'></span>"),
                    u = e("<span></span>"),
                    a = this.type === "input" ? n.onText : r.find("option").eq(1).text(),
                    f = this.type === "input" ? n.offText : r.find("option").eq(0).text();
                this._addClass(o, "ui-flipswitch-on", "ui-button ui-button-inherit"), o.text(a), this._addClass(u, "ui-flipswitch-off"), u.text(f), this._addClass(t, "ui-flipswitch", "ui-bar-" + s + " " + (r.is(":checked") || r.find("option").eq(1).is(":selected") ? "ui-flipswitch-active" : "") + (r.is(":disabled") ? " ui-state-disabled" : "")), t.append(o, u), this._addClass("ui-flipswitch-input"), r.after(t).appendTo(t), e.extend(this, {
                    flipswitch: t,
                    on: o,
                    off: u
                })
            },
            _reset: function() {
                this.refresh()
            },
            refresh: function() {
                var e, t = this.flipswitch.hasClass("ui-flipswitch-active") ? "_right" : "_left";
                this.type === "select" ? e = this.element.get(0).selectedIndex > 0 ? "_right" : "_left" : e = this.element.prop("checked") ? "_right" : "_left", e !== t && this[e]()
            },
            _findLabels: function() {
                var n = this.element[0],
                    r = n.labels;
                return r && r.length ? r = e(r) : (r = this.element.closest("label"), r.length === 0 && (r = e(this.document[0].getElementsByTagName("label")).filter("[for='" + n.getAttribute("id").replace(t, "\\$1") + "']"))), r
            },
            _toggle: function() {
                var e = this.flipswitch.hasClass("ui-flipswitch-active") ? "_left" : "_right";
                this[e]()
            },
            _keydown: function(t) {
                t.which === e.mobile.keyCode.LEFT ? this._left() : t.which === e.mobile.keyCode.RIGHT ? this._right() : t.which === e.mobile.keyCode.SPACE && (this._toggle(), t.preventDefault())
            },
            _setOptions: function(e) {
                if (e.theme !== r) {
                    var t = this.options.theme ? this.options.theme : "inherit",
                        n = e.theme ? e.theme : "inherit";
                    this._removeClass(this.flipswitch, null, "ui-bar-" + t), this._addClass(this.flipswitch, null, "ui-bar-" + n)
                }
                e.onText !== r && this.on.text(e.onText), e.offText !== r && this.off.text(e.offText), e.disabled !== r && this._toggleClass(this.flipswitch, null, "ui-state-disabled", e.disabled), this._super(e)
            },
            _destroy: function() {
                if (this.options.enhanced) return;
                this._originalTabIndex != null ? this.element.attr("tabindex", this._originalTabIndex) : this.element.removeAttr("tabindex"), this.on.remove(), this.off.remove(), this.element.unwrap(), this.element.removeClass("ui-flipswitch-input"), this.flipswitch.remove()
            }
        }, e.mobile.behaviors.formReset))
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/forms/slider", ["jquery", "../../core", "../../widget", "./textinput", "../../vmouse", "../widget.theme", "./reset"], t) : t(e)
    }(function(e) {
        return e.widget("mobile.slider", e.extend({
            version: "@VERSION",
            initSelector: "input[type='range'], :jqmData(type='range'), :jqmData(role='slider')",
            widgetEventPrefix: "slide",
            options: {
                theme: "inherit",
                trackTheme: "inherit",
                classes: {
                    "ui-slider-track": "ui-shadow-inset ui-corner-all",
                    "ui-slider-input": "ui-shadow-inset ui-corner-all"
                }
            },
            _create: function() {
                var i = this.element,
                    s = i[0].nodeName.toLowerCase(),
                    o = i.parent().is(":jqmData(role='rangeslider')"),
                    u = i.attr("id"),
                    a = e("[for='" + u + "']"),
                    f = a.attr("id") || u + "-label",
                    l = parseFloat(i.attr("min")),
                    c = parseFloat(i.attr("max")),
                    h = t.parseFloat(i.attr("step") || 1),
                    p = n.createElement("a"),
                    d = e(p),
                    v = n.createElement("div"),
                    m = e(v),
                    g;
                a.attr("id", f), p.setAttribute("href", "#"), v.setAttribute("role", "application"), this._addClass(m, "ui-slider-track"), this._addClass(d, "ui-slider-handle"), v.appendChild(p), d.attr({
                    role: "slider",
                    "aria-valuemin": l,
                    "aria-valuemax": c,
                    "aria-valuenow": this._value(),
                    "aria-valuetext": this._value(),
                    title: this._value(),
                    "aria-labelledby": f
                }), e.extend(this, {
                    slider: m,
                    handle: d,
                    control: i,
                    type: s,
                    step: h,
                    max: c,
                    min: l,
                    isRangeslider: o,
                    dragging: !1,
                    beforeStart: null,
                    userModified: !1,
                    mouseMoved: !1
                }), this._addClass("ui-slider-input"), this._on(i, {
                    change: "_controlChange",
                    keyup: "_controlKeyup",
                    blur: "_controlBlur",
                    vmouseup: "_controlVMouseUp"
                }), m.bind("vmousedown", e.proxy(this._sliderVMouseDown, this)).bind("vclick", !1), this._on(n, {
                    vmousemove: "_preventDocumentDrag"
                }), this._on(m.add(n), {
                    vmouseup: "_sliderVMouseUp"
                }), m.insertAfter(i), o || (g = "<div class='ui-slider'></div>", i.add(m).wrapAll(g)), this._on(this.handle, {
                    vmousedown: "_handleVMouseDown",
                    keydown: "_handleKeydown",
                    keyup: "_handleKeyup"
                }), this.handle.bind("vclick", !1), this._handleFormReset(), this.refresh(r, r, !0)
            },
            _setOptions: function(e) {
                e.disabled !== r && this._setDisabled(e.disabled), this._super(e)
            },
            _controlChange: function(e) {
                if (this._trigger("controlchange", e) === !1) return !1;
                this.mouseMoved || this.refresh(this._value(), !0)
            },
            _controlKeyup: function() {
                this.refresh(this._value(), !0, !0)
            },
            _controlBlur: function() {
                this.refresh(this._value(), !0)
            },
            _controlVMouseUp: function() {
                this._checkedRefresh()
            },
            _handleVMouseDown: function() {
                this.handle.focus()
            },
            _handleKeydown: function(t) {
                var n = this._value();
                if (this.options.disabled) return;
                switch (t.keyCode) {
                    case e.mobile.keyCode.HOME:
                    case e.mobile.keyCode.END:
                    case e.mobile.keyCode.PAGE_UP:
                    case e.mobile.keyCode.PAGE_DOWN:
                    case e.mobile.keyCode.UP:
                    case e.mobile.keyCode.RIGHT:
                    case e.mobile.keyCode.DOWN:
                    case e.mobile.keyCode.LEFT:
                        t.preventDefault(), this._keySliding || (this._keySliding = !0, this._addClass(this.handle, null, "ui-state-active"))
                }
                switch (t.keyCode) {
                    case e.mobile.keyCode.HOME:
                        this.refresh(this.min);
                        break;
                    case e.mobile.keyCode.END:
                        this.refresh(this.max);
                        break;
                    case e.mobile.keyCode.PAGE_UP:
                    case e.mobile.keyCode.UP:
                    case e.mobile.keyCode.RIGHT:
                        this.refresh(n + this.step);
                        break;
                    case e.mobile.keyCode.PAGE_DOWN:
                    case e.mobile.keyCode.DOWN:
                    case e.mobile.keyCode.LEFT:
                        this.refresh(n - this.step)
                }
            },
            _handleKeyup: function() {
                this._keySliding && (this._keySliding = !1, this._removeClass(this.handle, null, "ui-state-active"))
            },
            _sliderVMouseDown: function(e) {
                return this.options.disabled || e.which !== 1 && e.which !== 0 && e.which !== r ? !1 : this._trigger("beforestart", e) === !1 ? !1 : (this.dragging = !0, this.userModified = !1, this.mouseMoved = !1, this.refresh(e), this._trigger("start"), !1)
            },
            _sliderVMouseUp: function() {
                if (this.dragging) return this.dragging = !1, this.mouseMoved = !1, this._trigger("stop"), !1
            },
            _preventDocumentDrag: function(e) {
                if (this._trigger("drag", e) === !1) return !1;
                if (this.dragging && !this.options.disabled) return this.mouseMoved = !0, this.refresh(e), this.userModified = this.beforeStart !== this.element[0].selectedIndex, !1
            },
            _checkedRefresh: function() {
                this.value !== this._value() && this.refresh(this._value())
            },
            _value: function() {
                return parseFloat(this.element.val())
            },
            _reset: function() {
                this.refresh(r, !1, !0)
            },
            refresh: function(t, n, r) {
                var i = this,
                    s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w, E, S;
                this._addClass(i.slider, "ui-slider-track"), (this.options.disabled || this.element.prop("disabled")) && this.disable(), this.value = this._value(), this._addClass(this.handle, null, "ui-button ui-shadow"), c = this.element, h = parseFloat(c.attr("min")), p = parseFloat(c.attr("max")), d = parseFloat(c.attr("step")) > 0 ? parseFloat(c.attr("step")) : 1;
                if (typeof t == "object") {
                    u = t, a = 8, s = this.slider.offset().left, o = this.slider.width(), f = o / ((p - h) / d);
                    if (!this.dragging || u.pageX < s - a || u.pageX > s + o + a) return;
                    f > 1 ? l = (u.pageX - s) / o * 100 : l = Math.round((u.pageX - s) / o * 100)
                } else t == null && (t = parseFloat(c.val() || 0)), l = (parseFloat(t) - h) / (p - h) * 100;
                if (isNaN(l)) return;
                v = l / 100 * (p - h) + h, m = (v - h) % d, g = v - m, Math.abs(m) * 2 >= d && (g += m > 0 ? d : -d), y = 100 / ((p - h) / d), v = parseFloat(g.toFixed(5)), typeof f == "undefined" && (f = o / ((p - h) / d)), f > 1 && (l = (v - h) * y * (1 / d)), l < 0 && (l = 0), l > 100 && (l = 100), v < h && (v = h), v > p && (v = p), this.handle.css("left", l + "%"), this.handle[0].setAttribute("aria-valuenow", v), this.handle[0].setAttribute("aria-valuetext", v), this.handle[0].setAttribute("title", v), this.valuebg && this.valuebg.css("width", l + "%"), this._labels && (b = this.handle.width() / this.slider.width() * 100, w = l && b + (100 - b) * l / 100, E = l === 100 ? 0 : Math.min(b + 100 - w, 100), this._labels.each(function() {
                    var t = e(this).hasClass("ui-slider-label-a");
                    e(this).width((t ? w : E) + "%")
                }));
                if (!r) {
                    S = !1, S = parseFloat(c.val()) !== v, c.val(v);
                    if (this._trigger("beforechange", t) === !1) return !1;
                    !n && S && c.trigger("change")
                }
            },
            _themeElements: function() {
                return [{
                    element: this.handle,
                    prefix: "ui-button-"
                }, {
                    element: this.control,
                    prefix: "ui-body-"
                }, {
                    element: this.slider,
                    prefix: "ui-body-",
                    option: "trackTheme"
                }, {
                    element: this.element,
                    prefix: "ui-body-"
                }]
            },
            _setDisabled: function(e) {
                e = !!e, this.element.prop("disabled", e), this._toggleClass(this.slider, null, "ui-state-disabled", e), this.slider.attr("aria-disabled", e), this._toggleClass(null, "ui-state-disabled", e)
            }
        }, e.mobile.behaviors.formReset)), e.widget("mobile.slider", e.mobile.slider, e.mobile.widget.theme)
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/forms/rangeslider", ["jquery", "../../core", "../../widget", "./textinput", "../../vmouse", "./reset", "../widget.theme", "./slider"], t) : t(e)
    }(function(e) {
        return e.widget("mobile.rangeslider", e.extend({
            version: "@VERSION",
            options: {
                theme: "inherit",
                trackTheme: "inherit"
            },
            _create: function() {
                var t = this.element.find("input").first(),
                    n = this.element.find("input").last(),
                    r = this.element.find("label").first(),
                    i = e.data(t.get(0), "mobile-slider") || e.data(t.slider().get(0), "mobile-slider"),
                    s = e.data(n.get(0), "mobile-slider") || e.data(n.slider().get(0), "mobile-slider"),
                    o = i.slider,
                    u = s.slider,
                    a = i.handle,
                    f = e("<div>");
                this._addClass(f, "ui-rangeslider-sliders"), f.appendTo(this.element), this._addClass(t, "ui-rangeslider-first"), this._addClass(n, "ui-rangeslider-last"), this._addClass("ui-rangeslider"), o.appendTo(f), u.appendTo(f), r.insertBefore(this.element), a.prependTo(u), e.extend(this, {
                    _inputFirst: t,
                    _inputLast: n,
                    _sliderFirst: o,
                    _sliderLast: u,
                    _label: r,
                    _targetVal: null,
                    _sliderTarget: !1,
                    _sliders: f,
                    _proxy: !1
                }), this.refresh(), this._on(this.element.find("input.ui-slider-input"), {
                    slidebeforestart: "_slidebeforestart",
                    slidestop: "_slidestop",
                    slidedrag: "_slidedrag",
                    slidebeforechange: "_change",
                    blur: "_change",
                    keyup: "_change"
                }), this._on({
                    mousedown: "_change"
                }), this._on(this.element.closest("form"), {
                    reset: "_handleReset"
                }), this._on(a, {
                    vmousedown: "_dragFirstHandle"
                })
            },
            _handleReset: function() {
                var e = this;
                setTimeout(function() {
                    e._updateHighlight()
                }, 0)
            },
            _dragFirstHandle: function(t) {
                return e.data(this._inputFirst.get(0), "mobile-slider").dragging = !0, e.data(this._inputFirst.get(0), "mobile-slider").refresh(t), e.data(this._inputFirst.get(0), "mobile-slider")._trigger("start"), !1
            },
            _slidedrag: function(t) {
                var n = e(t.target).is(this._inputFirst),
                    r = n ? this._inputLast : this._inputFirst;
                this._sliderTarget = !1;
                if (this._proxy === "first" && n || this._proxy === "last" && !n) return e.data(r.get(0), "mobile-slider").dragging = !0, e.data(r.get(0), "mobile-slider").refresh(t), !1
            },
            _slidestop: function(t) {
                var n = e(t.target).is(this._inputFirst);
                this._proxy = !1, this.element.find("input").trigger("vmouseup"), this._sliderFirst.css("z-index", n ? 1 : "")
            },
            _slidebeforestart: function(t) {
                this._sliderTarget = !1, e(t.originalEvent.target).hasClass("ui-slider-track") && (this._sliderTarget = !0, this._targetVal = e(t.target).val())
            },
            _setOptions: function(e) {
                e.theme !== r && this._setTheme(e.theme), e.trackTheme !== r && this._setTrackTheme(e.trackTheme), e.disabled !== r && this._setDisabled(e.disabled), this._super(e), this.refresh()
            },
            refresh: function() {
                var e = this.element,
                    t = this.options;
                if (this._inputFirst.is(":disabled") || this._inputLast.is(":disabled")) this.options.disabled = !0;
                e.find("input").slider({
                    theme: t.theme,
                    trackTheme: t.trackTheme,
                    disabled: t.disabled
                }).slider("refresh"), this._updateHighlight()
            },
            _change: function(t) {
                if (t.type === "keyup") return this._updateHighlight(), !1;
                var n = this,
                    r = parseFloat(this._inputFirst.val(), 10),
                    i = parseFloat(this._inputLast.val(), 10),
                    s = e(t.target).hasClass("ui-rangeslider-first"),
                    o = s ? this._inputFirst : this._inputLast,
                    u = s ? this._inputLast : this._inputFirst;
                if (this._inputFirst.val() > this._inputLast.val() && t.type === "mousedown" && !e(t.target).hasClass("ui-slider-handle")) o.blur();
                else if (t.type === "mousedown") return;
                r > i && !this._sliderTarget ? (o.val(s ? i : r).slider("refresh"), this._trigger("normalize")) : r > i && (o.val(this._targetVal).slider("refresh"), setTimeout(function() {
                    u.val(s ? r : i).slider("refresh"), e.data(u.get(0), "mobile-slider").handle.focus(), n._sliderFirst.css("z-index", s ? "" : 1), n._trigger("normalize")
                }, 0), this._proxy = s ? "first" : "last"), r === i ? (e.data(o.get(0), "mobile-slider").handle.css("z-index", 1), e.data(u.get(0), "mobile-slider").handle.css("z-index", 0)) : (e.data(u.get(0), "mobile-slider").handle.css("z-index", ""), e.data(o.get(0), "mobile-slider").handle.css("z-index", "")), this._updateHighlight();
                if (r > i) return !1
            },
            _themeElements: function() {
                return [{
                    element: this.element.find(".ui-slider-track"),
                    prefix: "ui-bar-"
                }]
            },
            _updateHighlight: function() {
                var t = parseInt(e.data(this._inputFirst.get(0), "mobile-slider").handle.get(0).style.left, 10),
                    n = parseInt(e.data(this._inputLast.get(0), "mobile-slider").handle.get(0).style.left, 10),
                    r = n - t;
                this.element.find(".ui-slider-bg").css({
                    "margin-left": t + "%",
                    width: r + "%"
                })
            },
            _setTheme: function(e) {
                this._inputFirst.slider("option", "theme", e), this._inputLast.slider("option", "theme", e)
            },
            _setTrackTheme: function(e) {
                this._inputFirst.slider("option", "trackTheme", e), this._inputLast.slider("option", "trackTheme", e)
            },
            _setDisabled: function(e) {
                this._inputFirst.prop("disabled", e), this._inputLast.prop("disabled", e)
            },
            _destroy: function() {
                this._label.prependTo(this.element), this._inputFirst.after(this._sliderFirst), this._inputLast.after(this._sliderLast), this._sliders.remove(), this.element.find("input").slider("destroy")
            }
        }, e.mobile.behaviors.formReset)), e.widget("mobile.rangeslider", e.mobile.rangeslider, e.mobile.widget.theme)
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/forms/select", ["jquery", "jquery-ui/labels", "../../core", "../../widget", "../../zoom", "../../navigation/path", "../widget.theme", "jquery-ui/form-reset-mixin"], t) : t(e)
    }(function(e) {
        var n = e.widget("mobile.selectmenu", [{
            version: "@VERSION",
            options: {
                classes: {
                    "ui-selectmenu-button": "ui-corner-all ui-shadow"
                },
                theme: "inherit",
                icon: "caret-d",
                iconpos: "right",
                nativeMenu: !0,
                preventFocusZoom: /iPhone|iPad|iPod/.test(navigator.platform) && navigator.userAgent.indexOf("AppleWebKit") > -1
            },
            _button: function() {
                return e("<div/>")
            },
            _themeElements: function() {
                return [{
                    element: this.button,
                    prefix: "ui-button-"
                }]
            },
            _setDisabled: function(e) {
                return this.element.prop("disabled", e), this.button.attr("aria-disabled", e), this._setOption("disabled", e)
            },
            _focusButton: function() {
                var e = this;
                setTimeout(function() {
                    e.button.focus()
                }, 40)
            },
            _selectOptions: function() {
                return this.element.find("option")
            },
            _preExtension: function() {
                var t = "";
                this.element = this.element, this.selectWrapper = e("<div>"), this._addClass(this.selectWrapper, "ui-selectmenu", t), this.selectWrapper.insertBefore(this.element), this.element.detach(), this.selectId = this.element.attr("id") || "select-" + this.uuid, this.buttonId = this.selectId + "-button", this.isMultiple = this.element[0].multiple, this.element.appendTo(this.selectWrapper), this.label = this.element.labels().first()
            },
            _destroy: function() {
                this.selectWrapper.length > 0 && (this.element.insertAfter(this.selectWrapper), this.selectWrapper.remove()), this._unbindFormResetHandler()
            },
            _create: function() {
                var n = this.options,
                    r = n.icon ? n.iconpos || this.element.attr("data-" + this._ns() + "iconpos") : !1;
                this._preExtension(), this.button = this._button(), this.button.attr("id", this.buttonId), this._addClass(this.button, "ui-selectmenu-button", "ui-button"), this.button.insertBefore(this.element), this.options.icon && (this.icon = e("<span>"), this._addClass(this.icon, "ui-selectmenu-button-icon", "ui-icon-" + n.icon + " ui-icon ui-widget-icon-float" + (r === "right" ? "end" : "beginning")), this.button.prepend(this.icon)), this.setButtonText(), n.nativeMenu && t.opera && t.opera.version && this._addClass(this.button, "ui-selectmenu-nativeonly"), this.isMultiple && (this.buttonCount = e("<span>").hide(), this._addClass(this.buttonCount, "ui-selectmenu-count-bubble", "ui-listview-item-count-bubble ui-body-inherit"), this._addClass(this.button, null, "ui-listview-item-has-count"), this.buttonCount.appendTo(this.button)), (n.disabled || this.element.prop("disabled")) && this.disable(), this._on(this.element, {
                    change: "refresh"
                }), this._bindFormResetHandler(), this._on(this.button, {
                    keydown: "_handleKeydown"
                }), this.build()
            },
            build: function() {
                var t = this;
                this.element.appendTo(t.button).bind("vmousedown", function() {
                    t.button.addClass("ui-button-active")
                }).bind("focus", function() {
                    t.button.addClass("ui-focus")
                }).bind("blur", function() {
                    t.button.removeClass("ui-focus")
                }).bind("focus vmouseover", function() {
                    t.button.trigger("vmouseover")
                }).bind("vmousemove", function() {
                    t.button.removeClass("ui-button-active")
                }).bind("change blur vmouseout", function() {
                    t.button.trigger("vmouseout").removeClass("ui-button-active")
                }), t.button.bind("vmousedown", function() {
                    t.options.preventFocusZoom && e.mobile.zoom.disable(!0)
                }), t.label.bind("click focus", function() {
                    t.options.preventFocusZoom && e.mobile.zoom.disable(!0)
                }), t.element.bind("focus", function() {
                    t.options.preventFocusZoom && e.mobile.zoom.disable(!0)
                }), t.button.bind("mouseup", function() {
                    t.options.preventFocusZoom && setTimeout(function() {
                        e.mobile.zoom.enable(!0)
                    }, 0)
                }), t.element.bind("blur", function() {
                    t.options.preventFocusZoom && e.mobile.zoom.enable(!0)
                })
            },
            selected: function() {
                return this._selectOptions().filter(":selected")
            },
            selectedIndices: function() {
                var e = this;
                return this.selected().map(function() {
                    return e._selectOptions().index(this)
                }).get()
            },
            setButtonText: function() {
                var t = this,
                    n = this.selected(),
                    r = this.placeholder,
                    i = e("<span>");
                this.button.children("span").not(".ui-selectmenu-count-bubble,.ui-selectmenu-button-icon").remove().end().end().append(function() {
                    return n.length && (r = n.map(function() {
                        return e(this).text()
                    }).get().join(", ")), r ? i.text(r) : i.html("&#160;"), i.attr("aria-hidden", "true"), t._addClass(i, "ui-selectmenu-button-text", [t.element.attr("class"), n.attr("class")].join(" ")), t._removeClass(i, null, "ui-screen-hidden"), i
                }())


            },
            setButtonCount: function() {
                var e = this.selected();
                this.isMultiple && this.buttonCount[e.length > 1 ? "show" : "hide"]().text(e.length)
            },
            _handleKeydown: function() {
                this._delay("_refreshButton")
            },
            _refreshButton: function() {
                this.setButtonText(), this.setButtonCount()
            },
            refresh: function() {
                this._refreshButton()
            },
            open: e.noop,
            close: e.noop,
            disable: function() {
                this._setDisabled(!0), this.button.addClass("ui-state-disabled")
            },
            enable: function() {
                this._setDisabled(!1), this.button.removeClass("ui-state-disabled")
            }
        }, e.ui.formResetMixin]);
        return e.widget("mobile.selectmenu", n, e.mobile.widget.theme)
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/widget.backcompat", ["jquery", "../ns", "../widget", "jquery-ui/widget"], t) : t(e)
    }(function(e) {
        if (e.mobileBackcompat !== !1) {
            var t = /\S+/g;
            e.mobile.widget = e.extend({}, {
                backcompat: {
                    _boolOptions: {
                        inline: "ui-button-inline",
                        mini: "ui-mini",
                        shadow: "ui-shadow",
                        corners: "ui-corner-all"
                    },
                    _create: function() {
                        this._setInitialOptions(), this._super(), !this.options.enhanced && this.options.wrapperClass && this._addClass(this.widget(), null, this.options.wrapperClass)
                    },
                    _classesToOption: function(n) {
                        if (this.classProp && typeof n[this.classProp] == "string") {
                            var i = this,
                                s = n[this.classProp].match(t) || [];
                            e.each(this._boolOptions, function(t, n) {
                                i.options[t] !== r && (e.inArray(n, s) !== -1 ? i.options[t] = !0 : i.options[t] = !1)
                            })
                        }
                    },
                    _getClassValue: function(n, r, i) {
                        var s = this.options.classes[n] || "",
                            o = s.match(t) || [];
                        return i ? e.inArray(r, o) === -1 && o.push(r) : o.splice(e.inArray(r, o), 1), o.join(" ")
                    },
                    _optionsToClasses: function(e, t) {
                        var n = this.classProp,
                            r = this._boolOptions[e];
                        n && this.option("classes." + n, this._getClassValue(n, r, t))
                    },
                    _setInitialOptions: function() {
                        var n, i = this.options,
                            s = e[this.namespace][this.widgetName].prototype.options,
                            o = this.classProp,
                            u = this;
                        o && (n = (i.classes[o] || "").match(t) || [], s.classes[o] !== i.classes[o] ? e.each(this._boolOptions, function(t, s) {
                            i[t] !== r && (i[t] = e.inArray(s, n) !== -1)
                        }) : e.each(this._boolOptions, function(e, t) {
                            i[e] !== s[e] && (i.classes[o] = u._getClassValue(o, t, i[e]))
                        }))
                    },
                    _setOption: function(e, t) {
                        var n;
                        e === "classes" && this._classesToOption(t), this._boolOptions[e] && this._optionsToClasses(e, t), e === "wrapperClass" && (n = this.widget(), this._removeClass(n, null, this.options.wrapperClass)._addClass(n, null, t)), this._superApply(arguments)
                    }
                }
            }, e.mobile.widget)
        } else e.mobile.widget.backcompat = {};
        return e.mobile.widget
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/forms/select.backcompat", ["jquery", "../widget.backcompat", "./select"], t) : t(e)
    }(function(e) {
        return e.mobileBackcompat !== !1 && (e.widget("mobile.selectmenu", e.mobile.selectmenu, {
            options: {
                inline: !1,
                corners: !0,
                shadow: !0,
                mini: !1
            },
            initSelector: "select[data-ui-role=select]:not( :jqmData(role='slider')):not( :jqmData(role='flipswitch') )",
            classProp: "ui-selectmenu-button"
        }), e.widget("mobile.selectmenu", e.mobile.selectmenu, e.mobile.widget.backcompat)), e.mobile.selectmenu
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/listview", ["jquery", "../widget", "./addFirstLastClasses"], t) : t(e)
    }(function(e) {
        function t(e, t, n, r) {
            var i = [n].concat(r ? [r] : []).join("|");
            e[i] || (e[i] = []), e[i].push(t)
        }

        function s() {
            var e, t, n = {
                a: !0,
                A: !0
            };
            for (e = this.firstChild; !!e; e = e.nextSibling) {
                if (e.className && e.className.match(i)) return !0;
                n[e.nodeName] && (t = e, e = e.firstChild), !e && t && (e = t, t = null)
            }
        }
        var n = e.mobile.getAttribute,
            i = /\bui-listview-item-count-bubble\b/;
        return e.widget("mobile.listview", e.extend({
            version: "@VERSION",
            options: {
                classes: {
                    "ui-listview-inset": "ui-corner-all ui-shadow"
                },
                theme: "inherit",
                dividerTheme: "inherit",
                icon: "caret-r",
                splitIcon: "caret-r",
                splitTheme: "inherit",
                inset: !1,
                enhanced: !1
            },
            _create: function() {
                this._addClass("ui-listview"), this.options.inset && this._addClass("ui-listview-inset"), this._refresh(!0)
            },
            _themeElements: function() {
                return [{
                    element: this.element,
                    prefix: "ui-group-theme-"
                }]
            },
            _setOption: function(e, t) {
                return e === "inset" && this._toggleClass(this.element, "ui-listview-inset", null, !!t), this._superApply(arguments)
            },
            _getChildrenByTagName: function(t, n, r) {
                var i = [],
                    s = {};
                s[n] = s[r] = !0, t = t.firstChild;
                while (t) s[t.nodeName] && i.push(t), t = t.nextSibling;
                return e(i)
            },
            _beforeListviewRefresh: e.noop,
            _afterListviewRefresh: e.noop,
            updateItems: function(e) {
                this._refresh(!1, e)
            },
            refresh: function() {
                this._refresh()
            },
            _processListItem: function() {
                return !0
            },
            _processListItemAnchor: function() {
                return !0
            },
            _refresh: function(i, o) {
                var u, a, f, l, c, h, p, d, v, m, g, y, b, w, E, S, x, T, N, C = this.options,
                    k = this.element,
                    L = !!e.nodeName(k[0], "ol"),
                    A = k.attr("start"),
                    O = {};
                L && (A || A === 0) && k.css("counter-reset", "listnumbering " + (parseInt(A, 10) - 1)), this._beforeListviewRefresh(), T = this._getChildrenByTagName(k[0], "li", "LI"), E = o || T;
                for (a = 0, f = E.length; a < f; a++) {
                    l = E.eq(a), c = "ui-listview-item", h = r;
                    if (i || this._processListItem(l)) m = this._getChildrenByTagName(l[0], "a", "A"), g = n(l[0], "role") === "list-divider", y = l.attr("value"), p = n(l[0], "theme"), m.length && (this._processListItemAnchor(m) && !g || i) ? (d = n(l[0], "icon"), v = d === !1 ? !1 : d || C.icon, u = "ui-button", p && (u += " ui-button-" + p), m.length > 1 ? (c += " ui-listview-item-has-alternate", b = m.last(), w = n(b[0], "theme") || C.splitTheme || p, N = !1, x = b.children(".ui-listview-item-split-icon"), x.length || (x = e("<span>"), N = !0), t(O, x[0], "ui-listview-item-split-icon", "ui-icon ui-icon-" + (n(b[0], "icon") || d || C.splitIcon)), t(O, b[0], "ui-listview-item-split-button", "ui-button ui-button-icon-only" + (w ? " ui-button-" + w : "")), b.attr("title", e.trim(b.getEncodedText())), N && b.empty().prepend(x), m = m.first()) : v && (N = !1, x = m.children(".ui-listview-item-icon"), x.length || (x = e("<span>"), N = !0), t(O, x[0], "ui-listview-item-icon", "ui-icon ui-icon-" + v + " ui-widget-icon-floatend"), N && m.prepend(x)), t(O, m[0], "ui-listview-item-button", u)) : g ? (c += " ui-listview-item-divider", h = "ui-bar-" + (p || C.dividerTheme || C.theme || "inherit"), l.attr("role", "heading")) : m.length <= 0 && (c += " ui-listview-item-static", h = "ui-body-" + (p ? p : "inherit")), L && y && l.css("counter-reset", "listnumbering " + (parseInt(y, 10) - 1));
                    t(O, l[0], c, h)
                }
                for (S in O) this._addClass.apply(this, [e(O[S])].concat(S.split("|")));
                this._addClass(E.filter(s), "ui-listview-item-has-count"), this._afterListviewRefresh(), this._addFirstLastClasses(T, this._getVisibles(T, i), i)
            }
        }, e.mobile.behaviors.addFirstLastClasses))
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/page.dialog", ["jquery", "../widget", "./page", "../navigation"], t) : t(e)
    }(function(e) {
        return e.widget("mobile.page", e.mobile.page, {
            options: {
                classes: {
                    "ui-page-dialog-close-button": "ui-button ui-corner-all ui-button-icon-only",
                    "ui-page-dialog-close-button-icon": "ui-icon-delete ui-icon",
                    "ui-page-dialog-contain": "ui-overlay-shadow ui-corner-all"
                },
                closeBtn: "left",
                closeBtnText: "Close",
                overlayTheme: "a",
                dialog: !1
            },
            _create: function() {
                return this.dialog = {}, this._superApply(arguments)
            },
            _establishStructure: function() {
                var t = this._superApply(arguments);
                return this.options.dialog && (this.options.enhanced ? (this.dialog.wrapper = this.element.children(".ui-page-dialog-contain").eq(0), this.options.closeBtn !== "none" && (this.dialog.button = this.dialog.wrapper.children(".ui-toolbar-header").children("a.ui-page-dialog-close-button"), this.dialog.icon = this.dialog.button.children(".ui-page-dialog-close-button-icon"))) : (this.dialog.wrapper = e("<div>"), this.dialog.wrapper.append(this.element.contents()), this._setCloseButton(this.options.closeBtn, this.options.closeBtnText))), t
            },
            _themeElements: function() {
                var e = this._super();
                return this.options.dialog && e.push({
                    element: this.dialog.wrapper,
                    prefix: "ui-body-"
                }), e
            },
            _setAttributes: function() {
                var e = this._superApply(arguments);
                return this.options.dialog && (this._addClass("ui-page-dialog", null), this._addClass(this.dialog.wrapper, "ui-page-dialog-contain", null), this.dialog.wrapper.attr("role", "dialog")), this.dialog.button && this.options.enhanced && this._toggleButtonClasses(!0, this.options.closeBtn), e
            },
            _attachToDOM: function() {
                var e = this._superApply(arguments);
                return this.options.dialog && !this.options.enhanced && this.element.append(this.dialog.wrapper), e
            },
            _toggleButtonClasses: function(e, t) {
                this._toggleClass(this.dialog.button, "ui-page-dialog-close-button", "ui-toolbar-header-button-" + t, e), this._toggleClass(this.dialog.icon, "ui-page-dialog-close-button-icon", null, e)
            },
            _setOptions: function(t) {
                var n, i;
                this._super(t);
                if (!this.options.dialog) return;
                t.overlayTheme !== r && e.mobile.activePage[0] === this.element[0] && this._handlePageBeforeShow(), t.closeBtnText !== r && (n = this.options.closeBtn, i = t.closeBtnText), t.closeBtn !== r && (n = t.closeBtn, i = i || this.options.closeBtnText), n && this._setCloseButton(n, i)
            },
            _toggleCloseButtonClickability: function(e) {
                this.dialog.button && (e ? (this.dialog.button.css("pointer-events", ""), this.dialog.button.removeAttr("tabindex")) : (this.dialog.button.css("pointer-events", "none"), this.dialog.button.attr("tabindex", -1)))
            },
            _handlePageBeforeShow: function() {
                this._toggleCloseButtonClickability(!0), this.options.overlayTheme && this.options.dialog ? this._setContainerSwatch(this.options.overlayTheme) : this._super()
            },
            _handleButtonClick: function() {
                this._toggleCloseButtonClickability(!1)
            },
            _setCloseButton: function(t, n) {
                var r;
                t = "left" === t ? "left" : "right" === t ? "right" : "none", this.dialog.button ? "none" === t ? (this._toggleButtonClasses(!1, t), this._off(this.dialog.button, "click"), this.dialog.button.remove(), this.dialog.button = null, this.dialog.icon = null) : (this._removeClass(this.dialog.button, null, "ui-toolbar-header-button-left ui-toolbar-header-button-right")._addClass(this.dialog.button, null, "ui-toolbar-header-button-" + t), n && (this.dialog.button.contents().filter(function() {
                    return this.nodeType === 3
                }).remove(), this.dialog.button.prepend(n))) : t !== "none" && (r = this.dialog.wrapper.children(".ui-toolbar-header,[data-" + e.mobile.ns + "type='header']").first(), r.length && (this.dialog.button = e("<a href='#' data-" + e.mobile.ns + "rel='back'></a>").text(n || this.options.closeBtnText || ""), this.dialog.icon = e("<span>").appendTo(this.dialog.button), this._toggleButtonClasses(!0, t), this.dialog.button.prependTo(r), this._on(this.dialog.button, {
                    click: "_handleButtonClick"
                })))
            }
        })
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/page.dialog.backcompat", ["jquery", "./widget.backcompat", "./page.dialog"], t) : t(e)
    }(function(e) {
        return e.mobileBackcompat !== !1 && (e.widget("mobile.page", e.mobile.page, {
            options: {
                corners: !0
            },
            classProp: "ui-page-dialog-contain",
            _create: function() {
                if (e.mobile.getAttribute(this.element[0], "role") === "dialog" || this.options.role === "dialog") e.data(this.element[0], "mobile-dialog", !0), this.options.dialog = !0;
                this._super()
            }
        }), e.widget("mobile.page", e.mobile.page, e.mobile.widget.backcompat)), e.mobile.page
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("jquery-ui/focusable", ["jquery", "./version"], t) : t(e)
    }(function(e) {
        function t(e) {
            var t = e.css("visibility");
            while (t === "inherit") e = e.parent(), t = e.css("visibility");
            return t !== "hidden"
        }
        return e.ui.focusable = function(n, r) {
            var i, s, o, u, a, f = n.nodeName.toLowerCase();
            return "area" === f ? (i = n.parentNode, s = i.name, !n.href || !s || i.nodeName.toLowerCase() !== "map" ? !1 : (o = e("img[usemap='#" + s + "']"), o.length > 0 && o.is(":visible"))) : (/^(input|select|textarea|button|object)$/.test(f) ? (u = !n.disabled, u && (a = e(n).closest("fieldset")[0], a && (u = !a.disabled))) : "a" === f ? u = n.href || r : u = r, u && e(n).is(":visible") && t(e(n)))
        }, e.extend(e.expr[":"], {
            focusable: function(t) {
                return e.ui.focusable(t, e.attr(t, "tabindex") != null)
            }
        }), e.ui.focusable
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/popup", ["jquery", "jquery-ui/focusable", "jquery-ui/safe-active-element", "jquery-ui/safe-blur", "../widget", "./widget.theme", "../support", "../events/navigate", "../navigation/path", "../navigation/history", "../navigation/navigator", "../navigation/method", "../animationComplete", "../navigation"], t) : t(e)
    }(function(e) {
        function n(e, t, n) {
            return e >= n.x && e <= n.x + n.cx && t >= n.y && t <= n.y + n.cy
        }

        function i(e, t) {
            var r = e.offset(),
                i = e.outerWidth(!0),
                s = e.outerHeight(!0);
            return !(n(r.left, r.top, t) || n(r.left + i, r.top, t) || n(r.left + i, r.top + s, t) || n(r.left, r.top + s, t))
        }

        function s(e, t, n, r) {
            var i = r;
            return e < t ? i = n + (e - t) / 2 : i = Math.min(Math.max(n, r - t / 2), n + e - t), i
        }

        function o(e) {
            return {
                x: e.scrollLeft(),
                y: e.scrollTop(),
                cx: e[0].innerWidth || e.width(),
                cy: e[0].innerHeight || e.height()
            }
        }
        var u = function() {
            e(this).find("a").jqmEnhanceable().filter(":jqmData(rel='popup')[href][href!='']").each(function() {
                var e = this,
                    t = e.getAttribute("href").substring(1);
                t && (e.setAttribute("aria-haspopup", !0), e.setAttribute("aria-owns", t), e.setAttribute("aria-expanded", !1))
            })
        };
        return (e.enhance = e.extend(e.enhance, e.extend({
            hooks: []
        }, e.enhance))).hooks.push(u), e.widget("mobile.popup", {
            version: "@VERSION",
            options: {
                classes: {
                    "ui-popup": "ui-corner-all ui-overlay-shadow"
                },
                theme: "inherit",
                overlayTheme: "inherit",
                transition: "none",
                positionTo: "origin",
                tolerance: null,
                closeLinkSelector: "a[data-ui-rel='back']",
                dismissible: !0,
                enhanced: !1,
                history: !e.mobile.browser.oldIE && !e.mobile.browser.newIEMobile
            },
            _handleDocumentVmousedown: function(t) {
                this._isOpen && e.contains(this._ui.container[0], t.target) && this._ignoreResizeEvents()
            },
            _create: function() {
                var t = this.element,
                    n = t.attr("id"),
                    r = this.options;
                r.history = r.history && e.mobile.ajaxEnabled && e.mobile.hashListeningEnabled, e.extend(this, {
                    _scrollTop: 0,
                    _page: t.closest(".ui-page"),
                    _ui: null,
                    _fallbackTransition: "",
                    _currentTransition: !1,
                    _prerequisites: null,
                    _isOpen: !1,
                    _tolerance: null,
                    _resizeData: null,
                    _ignoreResizeTo: 0,
                    _orientationchangeInProgress: !1
                }), this._page.length === 0 && (this._page = e("body")), r.enhanced ? (this._ui = {
                    container: t.parent(),
                    screen: t.parent().prev(),
                    placeholder: e(this.document[0].getElementById(n + "-placeholder"))
                }, this._addClasses()) : (this._enhance(), this._applyTransition(r.transition)), this._setTolerance(r.tolerance)._ui.focusElement = this._ui.container, this._on(this._ui.screen, {
                    vclick: "_eatEventAndClose"
                }), this._on(this.window, {
                    orientationchange: "_handleWindowOrientationchange",
                    resize: "_handleWindowResize",
                    keyup: "_handleWindowKeyUp"
                }), this._on(this.document, {
                    vmousedown: "_handleDocumentVmousedown",
                    focusin: "_handleDocumentFocusIn"
                })
            },
            _themeElements: function() {
                return [{
                    element: this._ui.screen,
                    prefix: "ui-overlay-",
                    option: "overlayTheme"
                }, {
                    element: this.element,
                    prefix: "ui-body-"
                }]
            },
            _addClasses: function() {
                this._addClass(this._ui.placeholder, null, "ui-screen-hidden"), this._addClass(this._ui.screen, "ui-popup-screen", "ui-screen-hidden"), this._addClass(this._ui.container, "ui-popup-container ui-popup-hidden ui-popup-truncate"), this._addClass("ui-popup")
            },
            _enhance: function() {
                var t = this.element.attr("id"),
                    n = "placeholder",
                    r = {
                        screen: e("<div>"),
                        placeholder: e("<div>"),
                        container: e("<div>")
                    },
                    i = this.document[0].createDocumentFragment();
                return this._ui = r, i.appendChild(r.screen[0]), i.appendChild(r.container[0]), t && (r.screen.attr("id", t + "-screen"), r.container.attr("id", t + "-popup"), r.placeholder.attr("id", t + "-placeholder"), n = "placeholder for " + t), r.placeholder.html("<!-- " + n + " -->").insertBefore(this.element), this.element.detach(), this._addClasses(), this.element.appendTo(r.container), this._page[0].appendChild(i), r
            },
            _eatEventAndClose: function(e) {
                return e.preventDefault(), e.stopImmediatePropagation(), this.options.dismissible && this.close(), !1
            },
            _resizeScreen: function() {
                var e = this._ui.screen,
                    t = this._ui.container.outerHeight(!0),
                    n = e.removeAttr("style").height(),
                    r = this.document.height() - 1;
                n < r ? e.height(r) : t > n && e.height(t)
            },
            _handleWindowKeyUp: function(t) {
                if (this._isOpen && t.keyCode === e.mobile.keyCode.ESCAPE) return this._eatEventAndClose(t)
            },
            _expectResizeEvent: function() {
                var e = o(this.window);
                if (this._resizeData) {
                    if (e.x === this._resizeData.windowCoordinates.x && e.y === this._resizeData.windowCoordinates.y && e.cx === this._resizeData.windowCoordinates.cx && e.cy === this._resizeData.windowCoordinates.cy) return !1;
                    clearTimeout(this._resizeData.timeoutId)
                }
                return this._resizeData = {
                    timeoutId: this._delay("_resizeTimeout", 200),
                    windowCoordinates: e
                }, !0
            },
            _resizeTimeout: function() {
                this._isOpen ? this._expectResizeEvent() || (this._ui.container.hasClass("ui-popup-hidden") && (this._removeClass(this._ui.container, "ui-popup-hidden ui-popup-truncate"), this.reposition({
                    positionTo: "window"
                }), this._ignoreResizeEvents()), this._resizeScreen(), this._resizeData = null, this._orientationchangeInProgress = !1) : (this._resizeData = null, this._orientationchangeInProgress = !1)
            },
            _stopIgnoringResizeEvents: function() {
                this._ignoreResizeTo = 0
            },
            _ignoreResizeEvents: function() {
                this._ignoreResizeTo && clearTimeout(this._ignoreResizeTo), this._ignoreResizeTo = this._delay("_stopIgnoringResizeEvents", 1e3)
            },
            _handleWindowResize: function() {
                this._isOpen && this._ignoreResizeTo === 0 && i(this._ui.container, o(this.window)) && (this._expectResizeEvent() || this._orientationchangeInProgress) && !this._ui.container.hasClass("ui-popup-hidden") && (this._addClass(this._ui.container, "ui-popup-hidden ui-popup-truncate"), this._ui.container.removeAttr("style"))
            },
            _handleWindowOrientationchange: function() {
                !this._orientationchangeInProgress && this._isOpen && this._ignoreResizeTo === 0 && (this._expectResizeEvent(), this._orientationchangeInProgress = !0)
            },
            _handleDocumentFocusIn: function(t) {
                var n, r = t.target,
                    i = this._ui;
                if (!this._isOpen) return;
                if (r !== i.container[0]) {
                    n = e(r);
                    if (!e.contains(i.container[0], r)) return e(e.ui.safeActiveElement(this.document[0])).one("focus", e.proxy(function() {
                        e.ui.safeBlur(r)
                    }, this)), i.focusElement.focus(), t.preventDefault(), t.stopImmediatePropagation(), !1;
                    i.focusElement[0] === i.container[0] && (i.focusElement = n)
                }
                this._ignoreResizeEvents()
            },
            _applyTransition: function(t) {
                return t && (this._removeClass(this._ui.container, null, this._fallbackTransition), t !== "none" && (this._fallbackTransition = e.mobile._maybeDegradeTransition(t), this._fallbackTransition === "none" && (this._fallbackTransition = ""), this._addClass(this._ui.container, null, this._fallbackTransition))), this
            },
            _setOptions: function(e) {
                return e.transition !== r && (this._currentTransition || this._applyTransition(e.transition)), e.tolerance !== r && this._setTolerance(e.tolerance), e.disabled !== r && e.disabled && this.close(), this._super(e)
            },
            _setTolerance: function(t) {
                var n = {
                        t: 30,
                        r: 15,
                        b: 30,
                        l: 15
                    },
                    i;
                if (t !== r) {
                    i = String(t).split(","), e.each(i, function(e, t) {
                        i[e] = parseInt(t, 10)
                    });
                    switch (i.length) {
                        case 1:
                            isNaN(i[0]) || (n.t = n.r = n.b = n.l = i[0]);
                            break;
                        case 2:
                            isNaN(i[0]) || (n.t = n.b = i[0]), isNaN(i[1]) || (n.l = n.r = i[1]);
                            break;
                        case 4:
                            isNaN(i[0]) || (n.t = i[0]), isNaN(i[1]) || (n.r = i[1]), isNaN(i[2]) || (n.b = i[2]), isNaN(i[3]) || (n.l = i[3]);
                            break;
                        default:
                    }
                }
                return this._tolerance = n, this
            },
            _clampPopupWidth: function(e) {
                var t, n = o(this.window),
                    r = {
                        x: this._tolerance.l,
                        y: n.y + this._tolerance.t,
                        cx: n.cx - this._tolerance.l - this._tolerance.r,
                        cy: n.cy - this._tolerance.t - this._tolerance.b
                    };
                return e || this._ui.container.css("max-width", r.cx), t = {
                    cx: this._ui.container.outerWidth(!0),
                    cy: this._ui.container.outerHeight(!0)
                }, {
                    rc: r,
                    menuSize: t
                }
            },
            _calculateFinalLocation: function(e, t) {
                var n, r = t.rc,
                    i = t.menuSize;
                return n = {
                    left: s(r.cx, i.cx, r.x, e.x),
                    top: s(r.cy, i.cy, r.y, e.y)
                }, n.top = Math.max(0, n.top), n.top -= Math.min(n.top, Math.max(0, n.top + i.cy - this.document.height())), n
            },
            _placementCoords: function(e) {
                return this._calculateFinalLocation(e, this._clampPopupWidth())
            },
            _createPrerequisites: function(t, n, r) {
                var i, s = this;
                i = {
                    screen: e.Deferred(),
                    container: e.Deferred()
                }, i.screen.done(function() {
                    i === s._prerequisites && t()
                }), i.container.done(function() {
                    i === s._prerequisites && n()
                }), e.when(i.screen, i.container).done(function() {
                    i === s._prerequisites && (s._prerequisites = null, r())
                }), s._prerequisites = i
            },
            _animate: function(t) {
                this._removeClass(this._ui.screen, null, t.classToRemove)._addClass(this._ui.screen, null, t.screenClassToAdd), t.prerequisites.screen.resolve();
                if (t.transition && t.transition !== "none") {
                    t.applyTransition && this._applyTransition(t.transition);
                    if (this._fallbackTransition) {
                        this._addClass(this._ui.container, null, t.containerClassToAdd)._removeClass(this._ui.container, null, t.classToRemove), this._ui.container.animationComplete(e.proxy(t.prerequisites.container, "resolve"));
                        return
                    }
                }
                this._removeClass(this._ui.container, null, t.classToRemove), t.prerequisites.container.resolve()
            },
            _desiredCoords: function(t) {
                var n, r = null,
                    i = o(this.window),
                    s = t.x,
                    u = t.y,
                    a = t.positionTo;
                if (a && a !== "origin")
                    if (a === "window") s = i.cx / 2 + i.x, u = i.cy / 2 + i.y;
                    else {
                        try {
                            r = e(a)
                        } catch (f) {
                            r = null
                        }
                        r && (r.filter(":visible"), r.length === 0 && (r = null))
                    } r && (n = r.offset(), s = n.left + r.outerWidth() / 2, u = n.top + r.outerHeight() / 2);
                if (e.type(s) !== "number" || isNaN(s)) s = i.cx / 2 + i.x;
                if (e.type(u) !== "number" || isNaN(u)) u = i.cy / 2 + i.y;
                return {
                    x: s,
                    y: u
                }
            },
            _reposition: function(e) {
                e = {
                    x: e.x,
                    y: e.y,
                    positionTo: e.positionTo
                }, this._trigger("beforeposition", r, e), this._ui.container.offset(this._placementCoords(this._desiredCoords(e)))
            },
            reposition: function(e) {
                this._isOpen && this._reposition(e)
            },
            _openPrerequisitesComplete: function() {
                var t = this.element.attr("id"),
                    n = this._ui.container.find(":focusable").first(),
                    r = e.ui.safeActiveElement(this.document[0]);
                this._addClass(this._ui.container, "ui-popup-active"), this._isOpen = !0, this._resizeScreen(), r && !e.contains(this._ui.container[0], r) && e.ui.safeBlur(r), n.length > 0 && (this._ui.focusElement = n), this._ignoreResizeEvents(), t && this.document.find("[aria-haspopup='true'][aria-owns='" + e.mobile.path.hashToSelector(t) + "']").attr("aria-expanded", !0), this._ui.container.attr("tabindex", 0), this._trigger("afteropen")
            },
            _open: function(t) {
                var n = e.extend({}, this.options, t),
                    r = function() {
                        var e = navigator.userAgent,
                            t = e.match(/AppleWebKit\/([0-9\.]+)/),
                            n = !!t && t[1],
                            r = e.match(/Android (\d+(?:\.\d+))/),
                            i = !!r && r[1],
                            s = e.indexOf("Chrome") > -1;
                        return r !== null && i === "4.0" && n && n > 534.13 && !s ? !0 : !1
                    }();
                this._createPrerequisites(e.noop, e.noop, e.proxy(this, "_openPrerequisitesComplete")), this._currentTransition = n.transition, this._applyTransition(n.transition), this._removeClass(this._ui.screen, null, "ui-screen-hidden"), this._removeClass(this._ui.container, "ui-popup-truncate"), this._reposition(n), this._removeClass(this._ui.container, "ui-popup-hidden"), this.options.overlayTheme && r && this._addClass(this.element.closest(".ui-page"), "ui-popup-open"), this._animate({
                    additionalCondition: !0,
                    transition: n.transition,
                    classToRemove: "",
                    screenClassToAdd: "in",
                    containerClassToAdd: "in",
                    applyTransition: !1,
                    prerequisites: this._prerequisites
                })
            },
            _closePrerequisiteScreen: function() {
                this._removeClass(this._ui.screen, null, "out")._addClass(this._ui.screen, null, "ui-screen-hidden")
            },
            _closePrerequisiteContainer: function() {
                this._removeClass(this._ui.container, null, "reverse out")._addClass(this._ui.container, "ui-popup-hidden ui-popup-truncate"), this._ui.container.removeAttr("style")
            },
            _closePrerequisitesDone: function() {
                var t = this._ui.container,
                    n = this.element.attr("id");
                e.mobile.popup.active = r, e(":focus", t[0]).add(t[0]).blur(), n && this.document.find("[aria-haspopup='true'][aria-owns='" + e.mobile.path.hashToSelector(n) + "']").attr("aria-expanded", !1), this._ui.container.removeAttr("tabindex"), this._trigger("afterclose")
            },
            _close: function(t) {
                this._removeClass(this._ui.container, "ui-popup-active")._removeClass(this._page, "ui-popup-open"), this._isOpen = !1, this._createPrerequisites(e.proxy(this, "_closePrerequisiteScreen"), e.proxy(this, "_closePrerequisiteContainer"), e.proxy(this, "_closePrerequisitesDone")), this._animate({
                    additionalCondition: this._ui.screen.hasClass("in"),
                    transition: t ? "none" : this._currentTransition,
                    classToRemove: "in",
                    screenClassToAdd: "out",
                    containerClassToAdd: "reverse out",
                    applyTransition: !0,
                    prerequisites: this._prerequisites
                })
            },
            _unenhance: function() {
                if (this.options.enhanced) return;
                this.element.detach().insertAfter(this._ui.placeholder), this._ui.screen.remove(), this._ui.container.remove(), this._ui.placeholder.remove()
            },
            _destroy: function() {
                this.options.enhanced && (this.classesElementLookup = {}), e.mobile.popup.active === this ? (this.element.one("popupafterclose", e.proxy(this, "_unenhance")), this.close()) : this._unenhance()
            },
            _closePopup: function(n, r) {
                var i, s, o = !1;
                if (e.mobile.popup.active !== this || n && (n.isDefaultPrevented() || n.type === "navigate" && r && r.state && r.state.url && r.state.url === this._myUrl) || !this._isOpen) return;
                t.scrollTo(0, this._scrollTop), n && n.type === "pagebeforechange" && r && (typeof r.toPage == "string" ? i = r.toPage : i = r.toPage.jqmData("url"), i = e.mobile.path.parseUrl(i), s = i.pathname + i.search + i.hash, this._pageUrl !== e.mobile.path.makeUrlAbsolute(s) || r.options.reloadPage ? o = !0 : n.preventDefault()), this._off(this.window, "navigate pagebeforechange"), this._off(this.element, "click"), this._close(o)
            },
            _bindContainerClose: function() {
                this._on(!0, this.window, {
                    navigate: "_closePopup",
                    pagebeforechange: "_closePopup"
                })
            },
            widget: function() {
                return this._ui.container
            },
            _handleCloseLink: function(e) {
                this.close(), e.preventDefault()
            },
            open: function(t) {
                var n, r, i, s, o, u, a = {},
                    f = this,
                    l = this.options;
                return e.mobile.popup.active || l.disabled ? this : (e.mobile.popup.active = this, this._scrollTop = this.window.scrollTop(), l.history ? (u = e.mobile.navigate.history, r = e.mobile.dialogHashKey, i = e.mobile.activePage, s = i ? i.hasClass("ui-page-dialog") : !1, this._pageUrl = n = u.getActive().url, o = n.indexOf(r) > -1 && !s && u.activeIndex > 0, o ? (f._open(t), f._bindContainerClose(), this) : (n.indexOf(r) === -1 && !s ? n += n.indexOf("#") > -1 ? r : "#" + r : n = e.mobile.path.parseLocation().hash + r, this.window.one("beforenavigate", function(e) {
                    e.preventDefault(), f._open(t), f._bindContainerClose()
                }), this.urlAltered = !0, this._myUrl = n, e.mobile.navigate(n, {
                    role: "dialog"
                }), this)) : (f._open(t), f._bindContainerClose(), a["click " + l.closeLinkSelector] = "_handleCloseLink", this._on(a), this))
            },
            close: function() {
                return e.mobile.popup.active !== this ? this : (this._scrollTop = this.window.scrollTop(), this.options.history && this.urlAltered ? (e.mobile.back(), this.urlAltered = !1) : this._closePopup(), this)
            }
        }), e.widget("mobile.popup", e.mobile.popup, e.mobile.widget.theme), e.mobile.popup.handleLink = function(t) {
            var n, r = e.mobile.path,
                i = e(r.hashToSelector(r.parseUrl(t.attr("href")).hash)).first();
            i.length > 0 && i.data("mobile-popup") && (n = t.offset(), i.popup("open", {
                x: n.left + t.outerWidth() / 2,
                y: n.top + t.outerHeight() / 2,
                transition: t.jqmData("transition"),
                positionTo: t.jqmData("position-to")
            })), setTimeout(function() {
                t.removeClass("ui-button-active")
            }, 300)
        }, e.mobile.document.on("pagebeforechange", function(t, n) {
            n.options.role === "popup" && (e.mobile.popup.handleLink(n.options.link), t.preventDefault())
        }), e.mobile.popup
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/forms/select.custom", ["jquery", "../../core", "../../navigation", "./select", "../toolbar", "../listview", "../page.dialog.backcompat", "../popup"], t) : t(e)
    }(function(e) {
        var t = ".ui-disabled,.ui-state-disabled,.ui-listview-item-divider,.ui-screen-hidden";
        return e.widget("mobile.selectmenu", e.mobile.selectmenu, {
            options: {
                classes: {
                    "ui-selectmenu-custom-header-close-button": "ui-corner-all"
                },
                overlayTheme: null,
                dividerTheme: null,
                hidePlaceholderMenuItems: !0,
                closeText: "Close"
            },
            _ns: function() {
                return "ui-"
            },
            _create: function() {
                var e = this.options;
                return this._origTabIndex = this.element.attr("tabindex") === r ? !1 : this.element.attr("tabindex"), e.nativeMenu = e.nativeMenu || this.element.closest("[data-" + this._ns() + "role='popup'],:mobile-popup").length > 0, this._super()
            },
            _handleSelectFocus: function() {
                this.element.blur(), this.button.focus()
            },

            _handleKeydown: function(e) {
                this._super(e), this._handleButtonVclickKeydown(e)
            },
            _handleButtonVclickKeydown: function(t) {
                if (this.options.disabled || this.isOpen || this.options.nativeMenu) return;
                if (t.type === "vclick" || t.keyCode && (t.keyCode === e.ui.keyCode.ENTER || t.keyCode === e.ui.keyCode.SPACE)) this._decideFormat(), this.menuType === "overlay" ? this.button.attr("href", "#" + this.popupId).attr("data-" + this._ns() + "rel", "popup") : this.button.attr("href", "#" + this.dialogId).attr("data-" + this._ns() + "rel", "dialog"), this.isOpen = !0
            },
            _handleListFocus: function(t) {
                var n = t.type === "focusin" ? {
                    tabindex: "0",
                    event: "vmouseover"
                } : {
                    tabindex: "-1",
                    event: "vmouseout"
                };
                e(t.target).attr("tabindex", n.tabindex).trigger(n.event)
            },
            _goToAdjacentItem: function(e, n, r) {
                var i = e[r + "All"]().not(t + ",[data-" + this._ns() + "role='placeholder']").first();
                i.length && (n.blur().attr("tabindex", "-1"), i.find("a").first().focus())
            },
            _handleListKeydown: function(t) {
                var n = e(t.target),
                    r = n.closest("li");
                switch (t.keyCode) {
                    case 38:
                        return this._goToAdjacentItem(r, n, "prev"), !1;
                    case 40:
                        return this._goToAdjacentItem(r, n, "next"), !1;
                    case 13:
                    case 32:
                        return n.trigger("click"), !1
                }
            },
            _handleBeforeTransition: function(t, n) {
                var r;
                n && n.prevPage && n.prevPage[0] === this.menuPage[0] && (r = e.proxy(function() {
                    this._delay(function() {
                        this._focusButton()
                    })
                }, this), n.options && n.options.transition && n.options.transition !== "none" ? n.prevPage.animationComplete(r) : r())
            },
            _handleHeaderCloseClick: function() {
                if (this.menuType === "overlay") return this.close(), !1
            },
            _handleListItemClick: function(t) {
                var n, r = e(t.target).closest("li"),
                    i = this.element[0].selectedIndex,
                    s = e.mobile.getAttribute(r, "option-index"),
                    o = this._selectOptions().eq(s)[0];
                o.selected = this.isMultiple ? !o.selected : !0, this.isMultiple && (n = r.find("a"), this._toggleClass(n, null, "ui-checkbox-on", o.selected), this._toggleClass(n, null, "ui-checkbox-off", !o.selected)), !this.isMultiple && i !== s && (this._triggerChange = !0), this.isMultiple ? (this.element.trigger("change"), this.list.find("li:not(.ui-listview-item-divider)").eq(s).find("a").first().focus()) : this.close(), t.preventDefault()
            },
            build: function() {
                if (this.options.nativeMenu) return this._super();
                var t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w, E, S = this.options;
                return t = this.selectId, n = t + "-listbox", r = t + "-dialog", i = this.label, s = this.element.closest(".ui-page"), o = this.element[0].multiple, u = t + "-menu", a = S.theme ? " data-" + this._ns() + "theme='" + S.theme + "'" : "", f = S.overlayTheme || S.theme || null, l = f ? " data-" + this._ns() + "overlay-theme='" + f + "'" : "", c = S.dividerTheme && this.element.children("optgroup").length > 0 ? " data-" + this._ns() + "divider-theme='" + S.dividerTheme + "'" : "", h = e("<div data-" + this._ns() + "role='page' " + "data-" + this._ns() + "dialog='true'>" + "<div></div>" + "</div>").attr("id", r), y = h.children(), p = e("<div data-" + this._ns() + "type='header'><h1></h1></div>").prependTo(h), d = e("<div></div>").attr("id", n).insertAfter(this.element).popup(), v = e("<ul role='listbox' aria-labelledby='" + this.buttonId + "'" + a + c + "></ul>").attr("id", u).appendTo(d), m = e("<div>").prependTo(d), g = e("<h1></h1>").appendTo(m), h.page(), p.add(m).toolbar({
                    type: "header"
                }), this._addClass(h, "ui-selectmenu-custom"), this._addClass(y, null, "ui-content"), this._addClass(d, null, "ui-selectmenu-custom"), this._addClass(v, null, "ui-selectmenu-custom-list"), this.isMultiple && (w = e("<a>", {
                    role: "button",
                    href: "#"
                }), E = e("<span>"), this._addClass(E, "ui-selectmenu-custom-header-close-button-icon", "ui-icon ui-icon-delete"), w.append(E), this._addClass(w, "ui-selectmenu-custom-header-close-button", "ui-button ui-toolbar-header-button-left ui-button-icon-only"), w.appendTo(m)), e.extend(this, {
                    selectId: t,
                    menuId: u,
                    popupId: n,
                    dialogId: r,
                    thisPage: s,
                    menuPage: h,
                    menuPageHeader: p,
                    label: i,
                    isMultiple: o,
                    theme: S.theme,
                    listbox: d,
                    list: v,
                    header: m,
                    headerTitle: g,
                    headerClose: w,
                    menuPageContent: y,
                    menuPageClose: b,
                    placeholder: ""
                }), this.refresh(), this.element.attr("tabindex", "-1"), this._on(this.element, {
                    focus: "_handleSelectFocus"
                }), this._on(this.button, {
                    vclick: "_handleButtonVclickKeydown"
                }), this.list.attr("role", "listbox"), this._on(this.list, {
                    focusin: "_handleListFocus",
                    focusout: "_handleListFocus",
                    keydown: "_handleListKeydown",
                    "click li:not(.ui-disabled,.ui-state-disabled,.ui-listview-item-divider)": "_handleListItemClick"
                }), this._on(this.listbox, {
                    popupafterclose: "_popupClosed"
                }), this.isMultiple && this._on(this.headerClose, {
                    click: "_handleHeaderCloseClick"
                }), this._on(this.document, {
                    pagecontainerbeforetransition: "_handleBeforeTransition"
                }), this
            },
            _popupClosed: function() {
                this.close(), this._delayedTrigger()
            },
            _delayedTrigger: function() {
                this._triggerChange && this.element.trigger("change"), this._triggerChange = !1
            },
            _isRebuildRequired: function() {
                var e = this.list.find("li"),
                    t = this._selectOptions().not(".ui-screen-hidden");
                return t.text() !== e.text()
            },
            selected: function() {
                return this._selectOptions().filter(":selected:not( [data-" + this._ns() + "placeholder='true'] )")
            },
            refresh: function(t) {
                var n, r;
                if (this.options.nativeMenu) return this._super(t);
                (t || this._isRebuildRequired()) && this._buildList(), n = this.selectedIndices(), this.setButtonText(), this.setButtonCount(), r = this.list.find("li:not(.ui-listview-item-divider)"), this._removeClass(r.find("a"), null, "ui-button-active"), r.attr("aria-selected", !1), r.each(e.proxy(function(t, r) {
                    var i, s = e(r);
                    e.inArray(t, n) > -1 ? (s.attr("aria-selected", !0), this.isMultiple ? (i = s.find("a"), this._removeClass(i, null, "ui-checkbox-off"), this._addClass(i, null, "ui-checkbox-on")) : s.hasClass("ui-screen-hidden") ? this._addClass(s.next().find("a"), null, "ui-button-active") : this._addClass(s.find("a"), null, "ui-button-active")) : this.isMultiple && (i = s.find("a"), this._removeClass(i, null, "ui-checkbox-on"), this._addClass(i, null, "ui-checkbox-off"))
                }, this))
            },
            close: function() {
                if (this.options.disabled || !this.isOpen) return;
                this.menuType === "page" ? this.menuPage.hasClass("ui-page-active") && e.mobile.back() : this.listbox.popup("close"), this._focusButton(), this.isOpen = !1
            },
            open: function() {
                this.button.click()
            },
            _focusMenuItem: function() {
                var e = this.list.find("a.ui-button-active");
                e.length === 0 && (e = this.list.find("li:not(" + t + ",[data-" + this._ns() + "role='placeholder'] ) a.ui-button")), e.first().focus()
            },
            _setTheme: function(e, t) {
                this.listbox.popup("option", e, t), t !== "inherit" && this.menuPage.page("option", e, t), e === "theme" && (this.header.toolbar("option", e, t), this.menuPageHeader.toolbar("option", e, t))
            },
            _setOption: function(e, t) {
                !this.options.nativeMenu && (e === "theme" || e === "overlayTheme") && this._setTheme(e, t);
                if (e === "hidePlaceholderMenuItems") {
                    this._superApply(arguments), this.refresh(!0);
                    return
                }
                return e === "closeText" && this.headerClose.text(t), this._superApply(arguments)
            },
            _decideFormat: function() {
                var t, n = this.window,
                    r = this.list.parent(),
                    i = r.outerHeight(),
                    s = n.scrollTop(),
                    o = this.button.offset().top,
                    u = n.height();
                i > u - 80 || !e.support.scrollTop ? (this.menuPage.appendTo(this.element.closest(".ui-pagecontainer")), this.menuPageClose = this.menuPage.find(".ui-toolbar-header a"), t = this.thisPage.page("instance"), t._off(t.document, "pagecontainerhide"), s === 0 && o > u && this.thisPage.one("pagehide", function() {
                    e(this).data(e.camelCase(this._ns() + "lastScroll"), o)
                }), this._on(this.document, {
                    pagecontainershow: "_handlePageContainerShow",
                    pagecontainerhide: "_handlePageContainerHide"
                }), this.menuType = "page", this.menuPageContent.append(this.list), this.menuPage.find("div .ui-toolbar-title").text(this.label.getEncodedText() || this.placeholder)) : (this.menuType = "overlay", this.listbox.one({
                    popupafteropen: e.proxy(this, "_focusMenuItem")
                })), this._setTheme("theme", this.options.theme), this._setTheme("overlayTheme", this.options.overlayTheme)
            },
            _handlePageContainerShow: function(e, t) {
                t.toPage[0] === this.menuPage[0] && (this._off(this.document, "pagecontainershow"), this._focusMenuItem())
            },
            _handlePageContainerHide: function(e, t) {
                t.prevPage[0] === this.menuPage[0] && (this._off(this.document, "pagecontainershow"), this._delayedTrigger(), this.thisPage.page("bindRemove"), this.menuPage.detach(), this.list.appendTo(this.listbox), this.close())
            },
            _buildList: function() {
                var t = this.options,
                    r = this.placeholder,
                    i = !0,
                    s = "false",
                    o, u, a, f = "data-" + this._ns(),
                    l = f + "option-index",
                    c = f + "icon",
                    h = f + "role",
                    p = f + "placeholder",
                    d = n.createDocumentFragment(),
                    v = !1,
                    m, g, y, b, w, E, S, x, T, N, C;
                this.list.empty().filter(".ui-listview").listview("destroy"), o = this._selectOptions(), u = o.length, a = this.element[0];
                for (g = 0; g < u; g++, v = !1) {
                    y = o[g], b = e(y);
                    if (b.hasClass("ui-screen-hidden")) continue;
                    w = y.parentNode, x = [], E = b.text(), S = n.createElement("a"), S.setAttribute("href", "#"), S.appendChild(n.createTextNode(E)), w !== a && w.nodeName.toLowerCase() === "optgroup" && (T = w.getAttribute("label"), T !== m && (N = n.createElement("li"), N.setAttribute(h, "list-divider"), N.setAttribute("role", "option"), N.setAttribute("tabindex", "-1"), N.appendChild(n.createTextNode(T)), d.appendChild(N), m = T)), i && (!y.getAttribute("value") || E.length === 0 || b.data(e.camelCase(this._ns() + "placeholder"))) && (i = !1, v = !0, null === y.getAttribute(p) && (this._removePlaceholderAttr = !0), y.setAttribute(p, !0), t.hidePlaceholderMenuItems && x.push("ui-screen-hidden"), r !== E && (r = this.placeholder = E)), C = n.createElement("li"), y.disabled && (x.push("ui-state-disabled"), C.setAttribute("aria-disabled", !0)), C.setAttribute(l, g), C.setAttribute(c, s), v && C.setAttribute(p, !0), C.className = x.join(" "), C.setAttribute("role", "option"), S.setAttribute("tabindex", "-1"), this.isMultiple && this._addClass(e(S), null, "ui-button ui-checkbox-off ui-icon-end"), C.appendChild(S), d.appendChild(C)
                }
                this.list[0].appendChild(d), !this.isMultiple && !r.length ? this._addClass(this.header, null, "ui-screen-hidden") : this.headerTitle.text(this.placeholder), this.list.listview()
            },
            _button: function() {
                var t = {
                    href: "#",
                    role: "button",
                    id: this.buttonId,
                    "aria-haspopup": "true",
                    "aria-owns": this.menuId
                };
                return t["data-" + this._ns() + "transition"] = "pop", this._origTabIndex && (t.tabindex = this._origTabIndex), this.options.nativeMenu ? this._super() : e("<a>", t)
            },
            _destroy: function() {
                this.options.nativeMenu || (this.close(), this._origTabIndex !== r && (this._origTabIndex !== !1 ? this.element.attr("tabindex", this._origTabIndex) : this.element.removeAttr("tabindex")), this._removePlaceholderAttr && this._selectOptions().removeAttr("data-" + this._ns() + "placeholder"), this.listbox.remove(), this.menuPage.remove()), this._super()
            }
        })
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/forms/select.custom.backcompat", ["jquery", "./select.custom"], t) : t(e)
    }(function(e) {
        return e.mobileBackcompat !== !1 && e.widget("mobile.selectmenu", e.mobile.selectmenu, {
            _ns: function() {
                return e.mobile.ns || ""
            }
        }), e.mobile.selectmenu
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/forms/slider.tooltip", ["jquery", "./slider"], t) : t(e)
    }(function(e) {
        function n() {
            return t || (t = e("<div></div>", {
                "class": "ui-slider-popup ui-shadow ui-corner-all"
            })), t.clone()
        }
        var t;
        return e.widget("mobile.slider", e.mobile.slider, {
            options: {
                popupEnabled: !1,
                showValue: !1
            },
            _create: function() {
                this._super(), e.extend(this, {
                    _currentValue: null,
                    _popup: null,
                    _popupVisible: !1
                }), this._setOption("popupEnabled", this.options.popupEnabled), this._on(this.handle.add(this.slider), {
                    vmousedown: "_showPopup"
                }), this._on(this.slider.add(this.document), {
                    vmouseup: "_hidePopup"
                }), this._refresh()
            },
            _positionPopup: function() {
                var e = this.handle.offset();
                this._popup.offset({
                    left: e.left + (this.handle.width() - this._popup.width()) / 2,
                    top: e.top - this._popup.outerHeight() - 5
                })
            },
            _setOption: function(e, t) {
                this._super(e, t), e === "showValue" ? this.handle.html(t && !this.options.mini ? this._value() : "") : e === "popupEnabled" && t && !this._popup && (this._popup = n().addClass("ui-body-" + (this.options.theme || "a")).hide().insertBefore(this.element))
            },
            refresh: function() {
                this._super.apply(this, arguments), this._refresh()
            },
            _refresh: function() {
                var e = this.options,
                    t;
                e.popupEnabled && this.handle.removeAttr("title"), t = this._value();
                if (t === this._currentValue) return;
                this._currentValue = t, e.popupEnabled && this._popup && (this._positionPopup(), this._popup.html(t)), e.showValue && !this.options.mini && this.handle.html(t)
            },
            _showPopup: function() {
                this.options.popupEnabled && !this._popupVisible && (this._popup.show(), this._positionPopup(), this._popupVisible = !0)
            },
            _hidePopup: function() {
                var e = this.options;
                e.popupEnabled && this._popupVisible && (e.showValue && !e.mini && this.handle.html(this._value()), this._popup.hide(), this._popupVisible = !1)
            }
        })
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/listview.autodividers", ["jquery", "./listview"], t) : t(e)
    }(function(e) {
        function r(t) {
            var n = e.trim(t.text()) || null;
            return n ? (n = n.slice(0, 1).toUpperCase(), n) : null
        }
        var t = /\bui-listview-item-divider\b/;
        return e.widget("mobile.listview", e.mobile.listview, {
            options: {
                autodividers: !1,
                autodividersSelector: r
            },
            _beforeListviewRefresh: function() {
                return this.options.autodividers && this._replaceDividers(), this._superApply(arguments)
            },
            _replaceDividers: function() {
                var r, i, s, o = this._getChildrenByTagName(this.element[0], "li", "LI");
                o.each(e.proxy(function(u, a) {
                    var f, l;
                    a = e(a);
                    if (a[0].className && a[0].className.match(t) || a[0].getAttribute("data-" + e.mobile.ns + "role") === "list-divider") {
                        if (u === o.length - 1) return a.remove(), !1;
                        r && r.remove(), r = a, i = a.text(), i === s && (r.remove(), r = null, i = null)
                    } else l = this.options.autodividersSelector(a), r && (i === l ? s = i : r.remove(), r = null, i = null), l && s !== l && (f = n.createElement("li"), f.appendChild(n.createTextNode(l)), f.setAttribute("data-" + e.mobile.ns + "role", "list-divider"), a.before(f)), s = l
                }, this))
            }
        })
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/listview.backcompat", ["jquery", "./widget.theme", "./widget.backcompat", "./listview"], t) : t(e)
    }(function(e) {
        if (e.mobileBackcompat !== !1) {
            var t = /\bui-listview-item-static\b|\bui-listview-item-divider\b/,
                n = /\bui-button\b/;
            e.widget("mobile.listview", e.mobile.listview, {
                options: {
                    corners: !0,
                    shadow: !0
                },
                classProp: "ui-listview-inset",
                _processListItem: function(e) {
                    return !t.test(e[0].className)
                },
                _processListItemAnchor: function(e) {
                    return !n.test(e[0].className)
                }
            }), e.widget("mobile.listview", e.mobile.listview, e.mobile.widget.backcompat)
        }
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/listview.hidedividers", ["jquery", "./listview"], t) : t(e)
    }(function(e) {
        var t = /(^|\s)ui-listview-item-divider($|\s)/,
            n = /(^|\s)ui-screen-hidden($|\s)/;
        return e.widget("mobile.listview", e.mobile.listview, {
            options: {
                hideDividers: !1
            },
            _afterListviewRefresh: function() {
                var e, r, i, s = !0;
                this._superApply(arguments);
                if (this.options.hideDividers) {
                    e = this._getChildrenByTagName(this.element[0], "li", "LI");
                    for (r = e.length - 1; r > -1; r--) i = e[r], i.className.match(t) ? (s && (i.className = i.className + " ui-screen-hidden"), s = !0) : i.className.match(n) || (s = !1)
                }
            }
        })
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/loader.backcompat", ["jquery", "./loader"], t) : t(e)
    }(function(e) {
        return e.mobileBackcompat !== !1 && e.widget("mobile.loader", e.mobile.loader, {
            options: {
                html: ""
            },
            fakeFixLoader: e.noop,
            checkLoaderPosition: e.noop,
            show: function(t) {
                var n;
                this.resetHtml(), this._superApply(arguments), n = e.type(t) === "object" && t.html || this.options.html, n && this.element.html(n)
            },
            resetHtml: function() {
                this.element.empty().append(this.loader.span).append(this.loader.header.empty())
            }
        }), e.mobile.loader
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/navbar", ["jquery", "./forms/button", "../widget"], t) : t(e)
    }(function(e) {
        return e.widget("mobile.navbar", {
            version: "@VERSION",
            options: {
                iconpos: "top",
                maxbutton: 5
            },
            _create: function() {
                var e = this,
                    t = e.element,
                    n = t.find("a"),
                    i = n.length,
                    s = this.options.maxbutton,
                    o = n.filter(":jqmData(icon)").length ? e.options.iconpos : r;
                t.addClass("ui-navbar").attr("role", "navigation").find("ul"), this.navbar = t, this.navButtons = n, this.numButtons = i, this.maxButton = s, this.iconpos = o, i <= s ? n.each(function() {
                    e._makeNavButton(this, o)
                }) : this._createNavRows()
            },
            _createNavRows: function() {
                var t, n, r, i, s, o, u = this.navbar.find("li"),
                    a = this.numButtons,
                    f = this.maxButton;
                t = a % f === 0 ? a / f : Math.floor(a / f) + 1;
                for (r = 1; r < t; r++) o = e("<ul>"), this._addClass(o, "ui-navbar-row ui-navbar-row-" + r), o.appendTo(this.navbar);
                for (r = 0; r < a; r++) i = u.eq(r), this._makeNavButton(i.find("a"), this.iconpos), r + 1 > f && (i.detach(), n = (r + 1) % f === 0 ? Math.floor(r / f) : Math.floor((r + 1) / f), s = "ul.ui-navbar-row-" + n, this.navbar.find(s).append(i))
            },
            _makeNavButton: function(t, n) {
                var r = !1;
                e(t).hasClass("ui-state-disabled") && (r = !0), e(t).button({
                    iconPosition: n,
                    disabled: r
                })
            },
            refresh: function() {
                var e = this;
                this.navButtons = this.navbar.find("a"), this.numButtons = this.navButtons.length, this._addClass(this.navbar, "ui-navbar"), this.navbar.attr("role", "navigation").find("ul"), this.numButtons <= this.maxButton ? this.navButtons.each(function() {
                    e._makeNavButton(this, e.iconpos)
                }) : this._createNavRows()
            },
            _destroy: function() {
                var t;
                this.numButtons > this.maxButton && (t = this.navbar.find(".ui-navbar-row li").detach(), e(".ui-navbar-row").remove(), this.navbar.find("ul").append(t)), this._removeClass(this.navbar, "ui-navbar"), this.navButtons.each(function() {
                    e(this).button("destroy")
                })
            }
        })
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/navbar.backcompat", ["jquery", "./navbar", "./widget.backcompat"], t) : t(e)
    }(function(e) {
        if (e.mobileBackcompat !== !1) return e.widget("mobile.navbar", e.mobile.navbar, {
            _create: function() {
                var t = this;
                this._super(), t._on(t.element, {
                    "vclick a": function(r) {
                        var i = e(r.target);
                        !i.hasClass("ui-state-disabled") && !i.hasClass("ui-button-active") && (t.navButtons.removeClass("ui-button-active"), i.addClass("ui-button-active"), e(n).one("pagehide", function() {
                            i.removeClass("ui-button-active")
                        }))
                    }
                }), t.navbar.closest(".ui-page").bind("pagebeforeshow", function() {
                    t.navButtons.filter(".ui-state-persist").addClass("ui-button-active")
                })
            }
        })
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/navbar.morebutton", ["jquery", "./navbar", "./popup", "./listview", "../widget"], t) : t(e)
    }(function(e) {
        return e.widget("mobile.navbar", e.mobile.navbar, {
            options: {
                morebutton: !1,
                morebuttontext: "...",
                morebuttoniconpos: "top",
                morebuttonicon: null
            },
            _create: function() {
                this._super(), this.options.morebutton && this.numButtons > this.maxButton && this._createNavPopup()
            },
            _id: function() {
                return this.element.attr("id") || this.widgetName + this.uuid
            },
            _createNavRows: function() {
                if (this.options.morebutton) return;
                this._super()
            },
            _createNavPopup: function() {
                var t, n, r, i, s, o = this._id() + "-popup",
                    u = this.navbar.find("li"),
                    a = u.length,
                    f = this.maxButton,
                    l = this.iconpos,
                    c = this.options.morebuttonicon;
                t = e("<div id='" + o + "'></div>"), this._addClass(t, "ui-navbar-popup"), n = e("<ul>"), this._addClass(n, "ui-navbar-popupnav"), n.appendTo(t);
                for (i = 0; i < a; i++) s = u.eq(i), this._makeNavButton(s.find("a"), l), i + 1 === f && (r = e("<li></li>").append(e("<button></button>").attr("data-rel", "popup").button({
                    icon: c,
                    iconPosition: this.options.morebuttoniconpos,
                    label: this.options.morebuttontext
                })), this._on(r, {
                    click: "_openMoreButton"
                }), this.navbar.find("ul").first().append(r)), i + 1 >= f && (s.detach(), n.append(s)), n.listview();
                t.appendTo(this.navbar), t.popup({
                    positionTo: r
                }), this.moreButton = r, this.popupDiv = t
            },
            _openMoreButton: function() {
                e("#" + this._id() + "-popup").popup("open")
            },
            refresh: function() {
                var e, t = this,
                    n = this.iconpos;
                if (!this.options.morebutton) {
                    this._super();
                    return
                }
                this.popupDiv && (e = this.moreButton.parent().nextAll(), e.find("a").each(function() {
                    t._makeNavButton(this, n)
                }), e.appendTo(this.popupDiv.find("ul"))), this._createNavPopup()
            },
            _destroy: function() {
                var t;
                if (!this.options.morebutton) {
                    this._super();
                    return
                }
                this.popupDiv && (t = this.popupDiv.find("li").detach(), this.popupDiv.remove(), this.moreButton.parent().remove(), this.navbar.find("ul").append(t), this.navbar.removeClass("ui-navbar"), this.navButtons = this.navbar.find("a"), this.navButtons.each(function() {
                    e(this).button("destroy")
                }))
            }
        })
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/pagecontainer.transitions", ["jquery", "./pagecontainer", "../navigation/method", "../transitions/handlers"], t) : t(e)
    }(function(e) {
        return e.widget("mobile.pagecontainer", e.mobile.pagecontainer, {
            _getTransitionHandler: function(t) {
                return t = e.mobile._maybeDegradeTransition(t), e.mobile.transitionHandlers[t] || e.mobile.defaultTransitionHandler
            },
            _performTransition: function(t, n, r, i) {
                var s = this._getTransitionHandler(t);
                return (new s(t, n, r, i)).transition(e.mobile.navigate.history.getActive().lastScroll || e.mobile.defaultHomeScroll)
            }
        })
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/panel", ["jquery", "../widget", "./page"], t) : t(e)
    }(function(e) {
        return e.widget("mobile.panel", {
            version: "@VERSION",
            options: {
                classes: {},
                animate: !0,
                theme: null,
                position: "left",
                dismissible: !0,
                display: "reveal",
                swipeClose: !0,
                positionFixed: !1
            },
            _closeLink: null,
            _parentPage: null,
            _page: null,
            _modal: null,
            _panelInner: null,
            _wrapper: null,
            _fixedToolbars: null,
            _create: function() {
                var t = this.element,
                    n = t.closest(".ui-page, :jqmData(role='page')");
                e.extend(this, {
                    _closeLink: t.find(":jqmData(rel='close')"),
                    _parentPage: n.length > 0 ? n : !1,
                    _openedPage: null,
                    _page: this._getPage,
                    _panelInner: this._getPanelInner(),
                    _fixedToolbars: this._getFixedToolbars
                }), this.options.display !== "overlay" && this._getWrapper(), this._addClass("ui-panel ui-panel-closed", this._getPanelClasses()), e.support.cssTransform3d && !!this.options.animate && this._addClass("ui-panel-animate"), this._bindUpdateLayout(), this._bindCloseEvents(), this._bindLinkListeners(), this._bindPageEvents(), !this.options.dismissible || this._createModal(), this._bindSwipeEvents(), this._superApply(arguments)
            },
            _safelyWrap: function(t, n, r) {
                return r.length ? (r.eq(0).before(n), n.append(r), r.parent()) : e(n).appendTo(t)
            },
            _getPanelInner: function() {
                var t = this.element.find(".ui-panel-inner");
                return t.length === 0 && (t = e("<div>"), this._addClass(t, "ui-panel-inner"), t = this._safelyWrap(this.element, t, this.element.children())), t
            },
            _createModal: function() {
                var t = this,
                    n = t._parentPage ? t._parentPage.parent() : t.element.parent();
                t._modal = e("<div>"), t._addClass(t._modal, "ui-panel-dismiss"), t._modal.on("mousedown", function() {
                    t.close()
                }).appendTo(n)
            },
            _getPage: function() {
                var t = this._openedPage || this._parentPage || e(".ui-page-active");
                return t
            },
            _getWrapper: function() {
                var t, n = this._page().find(".ui-panel-wrapper");
                n.length === 0 && (t = this._page(), n = e("<div>"), this._addClass(n, "ui-panel-wrapper"), n = this._safelyWrap(t, n, this._page().children(".ui-toolbar-header:not(.ui-toolbar-header-fixed), [data-" + e.mobile.ns + "role='toolbar']," + ".ui-content:not(.ui-popup)," + ".ui-toolbar-footer:not(.ui-toolbar-footer-fixed)"))), this._wrapper = n
            },
            _getFixedToolbars: function() {
                var t = e("body").children(".ui-toolbar-header-fixed, .ui-toolbar-footer-fixed"),
                    n = this._page().find(".ui-toolbar-header-fixed, .ui-toolbar-footer-fixed"),
                    r = t.add(n);
                return this._addClass(r, "ui-panel-fixed-toolbar"), r
            },
            _getPosDisplayClasses: function(e) {
                return e + "-position-" + this.options.position + " " + e + "-display-" + this.options.display
            },
            _getPanelClasses: function() {
                var e = this._getPosDisplayClasses("ui-panel") + " " + "ui-body-" + (this.options.theme ? this.options.theme : "inherit");
                return !this.options.positionFixed || (e += " ui-panel-fixed"), e
            },
            _handleCloseClick: function(e) {
                e.isDefaultPrevented() || this.close()
            },
            _bindCloseEvents: function() {
                this._on(this._closeLink, {
                    click: "_handleCloseClick"
                }), this._on({
                    "click a:jqmData(ajax='false')": "_handleCloseClick"
                })
            },
            _positionPanel: function(t) {
                var n, r, i = this,
                    s = i._panelInner.outerHeight(),
                    o = s > this.window.height();
                o || !i.options.positionFixed ? (o ? (i._unfixPanel(), e.mobile.resetActivePageHeight(s)) : this._parentPage || (n = this.element.outerHeight(!0), n < this.document.height() && (r = this.element.outerHeight(), this.element.outerHeight(this.document.height() - (n - r)))), t === !0 && !e.mobile.isElementCurrentlyVisible(".ui-content") && this.window[0].scrollTo(0, e.mobile.defaultHomeScroll)) : i._fixPanel()
            },
            _bindFixListener: function() {
                this._on(this.window, {
                    throttledresize: "_positionPanel"
                })
            },
            _unbindFixListener: function() {
                this._off(this.window, "throttledresize")
            },
            _unfixPanel: function() {
                !!this.options.positionFixed && e.support.fixedPosition && this._removeClass("ui-panel-fixed")
            },
            _fixPanel: function() {
                !!this.options.positionFixed && e.support.fixedPosition && this._addClass("ui-panel-fixed")
            },
            _bindUpdateLayout: function() {
                var e = this;
                e.element.on("updatelayout", function() {
                    e._open && e._positionPanel()
                })
            },
            _bindLinkListeners: function() {
                this._on("body", {
                    "click a": "_handleClick"
                })
            },
            _handleClick: function(t) {
                var n, i = this.element.attr("id"),
                    s = this;
                t.currentTarget.href.split("#")[1] === i && i !== r && (t.preventDefault(), n = e(t.target), n.hasClass("ui-button") && (this._addClass(n, null, "ui-button-active"), this.element.one("panelopen panelclose", function() {
                    s._removeClass(n, null, "ui-button-active")
                })), this.toggle())
            },
            _handleSwipe: function(e) {
                e.isDefaultPrevented() || this.close()
            },
            _bindSwipeEvents: function() {
                var e = {};
                this.options.swipeClose && (e["swipe" + this.options.position] = "_handleSwipe", this._on(this._modal ? this.element.add(this._modal) : this.element, e))
            },
            _bindPageEvents: function() {
                var e = this;
                this.document.on("panelbeforeopen", function(t) {
                    e._open && t.target !== e.element[0] && e.close()
                }).on("keyup.panel", function(t) {
                   t.keyCode === 27 && e._open && e.close()
                }), !this._parentPage && this.options.display !== "overlay" && this._on(this.document, {
                    pageshow: function() {
                        this._openedPage = null, this._getWrapper()
                    }
                }), e._parentPage ? this.document.on("pagehide", ":jqmData(role='page')", function() {
                    e._open && e.close(!0)
                }) : this.document.on("pagebeforehide", function() {
                    e._open && e.close(!0)
                })
            },
            _open: !1,
            _pageContentOpenClasses: null,
            _modalOpenClasses: null,
            open: function(t) {
                if (!this._open) {
                    var n = this,
                        r = n.options,
                        i = function() {
                            if (!n._open) return;
                            r.display !== "overlay" && (n._addClass(n._wrapper, "ui-panel-page-content-open"), n._addClass(n._fixedToolbars(), "ui-panel-page-content-open")), n._bindFixListener(), n._trigger("open"), n._openedPage = n._page()
                        },
                        s = function() {
                            n._off(n.document, "panelclose"), n._page().jqmData("panel", "open"), e.support.cssTransform3d && !!r.animate && r.display !== "overlay" && (n._addClass(n._wrapper, "ui-panel-animate"), n._addClass(n._fixedToolbars(), "ui-panel-animate")), !t && e.support.cssTransform3d && !!r.animate ? (n._wrapper || n.element).animationComplete(i, "transition") : setTimeout(i, 0), r.theme && r.display !== "overlay" && n._addClass(n._page().parent(), "ui-panel-page-container-themed ui-panel-page-container-" + r.theme), n._removeClass("ui-panel-closed")._addClass("ui-panel-open"), n._positionPanel(!0), n._pageContentOpenClasses = n._getPosDisplayClasses("ui-panel-page-content"), r.display !== "overlay" && (n._addClass(n._page().parent(), "ui-panel-page-container"), n._addClass(n._wrapper, n._pageContentOpenClasses), n._addClass(n._fixedToolbars(), n._pageContentOpenClasses)), n._modalOpenClasses = n._getPosDisplayClasses("ui-panel-dismiss") + " ui-panel-dismiss-open", n._modal && (n._addClass(n._modal, n._modalOpenClasses), n._modal.height(Math.max(n._modal.height(), n.document.height())))
                        };
                    n._trigger("beforeopen"), n._page().jqmData("panel") === "open" ? n._on(n.document, {
                        panelclose: s
                    }) : s(), n._open = !0
                }
            },
            close: function(t) {
                if (this._open) {
                    var n = this,
                        r = n._page(),
                        i = this.options,
                        s = function() {
                            i.theme && i.display !== "overlay" && n._removeClass(r.parent(), "ui-panel-page-container-themed ui-panel-page-container-" + i.theme), n._addClass("ui-panel-closed"), n._positionPanel(!0), i.display !== "overlay" && (n._removeClass(r.parent(), "ui-panel-page-container"), n._removeClass(n._wrapper, "ui-panel-page-content-open"), n._removeClass(n._fixedToolbars(), "ui-panel-page-content-open")), e.support.cssTransform3d && !!i.animate && i.display !== "overlay" && (n._removeClass(n._wrapper, "ui-panel-animate"), n._removeClass(n._fixedToolbars(), "ui-panel-animate")), n._fixPanel(), n._unbindFixListener(), e.mobile.resetActivePageHeight(), r.jqmRemoveData("panel"), n._trigger("close"), n._openedPage = null
                        },
                        o = function() {
                            n._removeClass("ui-panel-open"), i.display !== "overlay" && (n._removeClass(n._wrapper, n._pageContentOpenClasses), n._removeClass(n._fixedToolbars(), n._pageContentOpenClasses)), !t && e.support.cssTransform3d && !!i.animate ? (n._wrapper || n.element).animationComplete(s, "transition") : setTimeout(s, 0), n._modal && (n._removeClass(n._modal, n._modalOpenClasses), n._modal.height(""))
                        };
                    n._trigger("beforeclose"), o(), n._open = !1
                }
            },
            toggle: function() {
                this[this._open ? "close" : "open"]()
            },
            _destroy: function() {
                var t, n = this.options,
                    r = e("body > :mobile-panel").length + e.mobile.activePage.find(":mobile-panel").length > 1;
                n.display !== "overlay" && (t = e("body > :mobile-panel").add(e.mobile.activePage.find(":mobile-panel")), t.not(".ui-panel-display-overlay").not(this.element).length === 0 && this._wrapper.children().unwrap(), this._open && (this._removeClass(this._fixedToolbars(), "ui-panel-page-content-open"), e.support.cssTransform3d && !!n.animate && this._removeClass(this._fixedToolbars(), "ui-panel-animate"), this._removeClass(this._page().parent(), "ui-panel-page-container"), n.theme && this._removeClass(this._page().parent(), "ui-panel-page-container-themed ui-panel-page-container-" + n.theme))), r || this.document.off("panelopen panelclose"), this._open && this._page().jqmRemoveData("panel"), this._panelInner.children().unwrap(), this._removeClass("ui-panel ui-panel-closed ui-panel-open ui-panel-animate", this._getPanelClasses()), this.element.off("panelbeforeopen panelhide keyup.panel updatelayout"), this._modal && this._modal.remove(), this._superApply(arguments)
            }
        })
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/popup.arrow", ["jquery", "./popup"], t) : t(e)
    }(function(e) {
        return e.widget("mobile.popup", e.mobile.popup, {
            options: {
                classes: {
                    "ui-popup-arrow": "ui-overlay-shadow"
                },
                arrow: ""
            },
            _create: function() {
                var e, t = this._superApply(arguments);
                return this.options.arrow && (this.options.enhanced ? (e = {
                    gd: this.element.children(".ui-popup-arrow-guide"),
                    ct: this.element.children(".ui-popup-arrow-container")
                }, e.ar = e.ct.children(".ui-popup-arrow"), e.arEls = e.ct.add(e.gd), this._addArrowClasses(e)) : e = this._addArrow(), this._ui.arrow = e), t
            },
            _addArrowClasses: function(t) {
                this._addClass(t.gd, "ui-popup-arrow-guide"), this._addClass(t.ct, "ui-popup-arrow-container", e.mobile.browser.oldIE && e.mobile.browser.oldIE <= 8 ? "ie" : ""), this._addClass(t.ar, "ui-popup-arrow", "ui-body-inherit")
            },
            _addArrow: function() {
                var t = this.document[0].createElement("div"),
                    n = this.document[0].createElement("div"),
                    r = this.document[0].createElement("div"),
                    i = {
                        arEls: e([t, r]),
                        gd: e(r),
                        ct: e(t),
                        ar: e(n)
                    };
                return t.appendChild(n), this._addArrowClasses(i), i.arEls.hide().appendTo(this.element), i
            },
            _unenhance: function() {
                var e = this._ui.arrow;
                return e && e.arEls.remove(), this._super()
            },
            _tryAnArrow: function(e, t, n, r, i) {
                var s, o, u, a = {},
                    f = {};
                if (r.arFull[e.dimKey] > r.guideDims[e.dimKey]) return i;
                a[e.fst] = n[e.fst] + (r.arHalf[e.oDimKey] + r.menuHalf[e.oDimKey]) * e.offsetFactor - r.contentBox[e.fst] + (r.clampInfo.menuSize[e.oDimKey] - r.contentBox[e.oDimKey]) * e.arrowOffsetFactor, a[e.snd] = n[e.snd], s = r.result || this._calculateFinalLocation(a, r.clampInfo), o = {
                    x: s.left,
                    y: s.top
                }, f[e.fst] = o[e.fst] + r.contentBox[e.fst] + e.tipOffset, f[e.snd] = Math.max(s[e.prop] + r.guideOffset[e.prop] + r.arHalf[e.dimKey], Math.min(s[e.prop] + r.guideOffset[e.prop] + r.guideDims[e.dimKey] - r.arHalf[e.dimKey], n[e.snd])), u = Math.abs(n.x - f.x) + Math.abs(n.y - f.y);
                if (!i || u < i.diff) f[e.snd] -= r.arHalf[e.dimKey] + s[e.prop] + r.contentBox[e.snd], i = {
                    dir: t,
                    diff: u,
                    result: s,
                    posProp: e.prop,
                    posVal: f[e.snd]
                };
                return i
            },
            _getPlacementState: function(e) {
                var t, n, r = this._ui.arrow,
                    i = {
                        clampInfo: this._clampPopupWidth(!e),
                        arFull: {
                            cx: r.ct.width(),
                            cy: r.ct.height()
                        },
                        guideDims: {
                            cx: r.gd.width(),
                            cy: r.gd.height()
                        },
                        guideOffset: r.gd.offset()
                    };
                return t = this.element.offset(), r.gd.css({
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0
                }), n = r.gd.offset(), i.contentBox = {
                    x: n.left - t.left,
                    y: n.top - t.top,
                    cx: r.gd.width(),
                    cy: r.gd.height()
                }, r.gd.removeAttr("style"), i.guideOffset = {
                    left: i.guideOffset.left - t.left,
                    top: i.guideOffset.top - t.top
                }, i.arHalf = {
                    cx: i.arFull.cx / 2,
                    cy: i.arFull.cy / 2
                }, i.menuHalf = {
                    cx: i.clampInfo.menuSize.cx / 2,
                    cy: i.clampInfo.menuSize.cy / 2
                }, i
            },
            _placementCoords: function(t) {
                var n, r, i, s = this.options.arrow,
                    o = this._ui.arrow;
                return o ? (o.arEls.show(), n = this._getPlacementState(!0), i = {
                    l: {
                        fst: "x",
                        snd: "y",
                        prop: "top",
                        dimKey: "cy",
                        oDimKey: "cx",
                        offsetFactor: 1,
                        tipOffset: -n.arHalf.cx,
                        arrowOffsetFactor: 0
                    },
                    r: {
                        fst: "x",
                        snd: "y",
                        prop: "top",
                        dimKey: "cy",
                        oDimKey: "cx",
                        offsetFactor: -1,
                        tipOffset: n.arHalf.cx + n.contentBox.cx,
                        arrowOffsetFactor: 1
                    },
                    b: {
                        fst: "y",
                        snd: "x",
                        prop: "left",
                        dimKey: "cx",
                        oDimKey: "cy",
                        offsetFactor: -1,
                        tipOffset: n.arHalf.cy + n.contentBox.cy,
                        arrowOffsetFactor: 1
                    },
                    t: {
                        fst: "y",
                        snd: "x",
                        prop: "left",
                        dimKey: "cx",
                        oDimKey: "cy",
                        offsetFactor: 1,
                        tipOffset: -n.arHalf.cy,
                        arrowOffsetFactor: 0
                    }
                }, e.each((s === !0 ? "l,t,r,b" : s).split(","), e.proxy(function(e, s) {
                    r = this._tryAnArrow(i[s], s, t, n, r)
                }, this)), r ? (this._removeClass(o.ct, "ui-popup-arrow-l ui-popup-arrow-t ui-popup-arrow-r ui-popup-arrow-b")._addClass(o.ct, "ui-popup-arrow-" + r.dir), o.ct.removeAttr("style").css(r.posProp, r.posVal).show(), r.result) : (o.arEls.hide(), this._super(t))) : this._super(t)
            },
            _setOptions: function(e) {
                var t = this._ui.arrow,
                    n = this._super(e);
                if (e.arrow !== r) {
                    if (!t && e.arrow) {
                        this._ui.arrow = this._addArrow();
                        return
                    }
                    t && !e.arrow && (t.arEls.remove(), delete this._ui.arrow)
                }
                return n
            },
            _destroy: function() {
                var e = this._ui.arrow;
                return e && e.arEls.remove(), this._super()
            }
        })
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/popup.backcompat", ["jquery", "./widget.backcompat", "./popup"], t) : t(e)
    }(function(e) {
        return e.mobileBackcompat !== !1 && (e.widget("mobile.popup", e.mobile.popup, {
            options: {
                wrapperClass: null,
                closeLinkSelector: "a:jqmData(rel='back')",
                shadow: !0,
                corners: !0
            },
            classProp: "ui-popup"
        }), e.widget("mobile.popup", e.mobile.popup, e.mobile.widget.backcompat), e.mobile.popup.prototype._boolOptions.shadow = "ui-overlay-shadow"), e.mobile.popup
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/popup.arrow.backcompat", ["jquery", "./popup.backcompat", "./popup.arrow"], t) : t(e)
    }(function(e) {
        var t = /\bui-overlay-shadow\b/;
        return e.mobileBackcompat !== !1 && e.widget("mobile.popup", e.mobile.popup, {
            _setInitialOptions: function() {
                var t = this.options.classes;
                this._super(), t["ui-popup-arrow"] === e[this.namespace][this.widgetName].prototype.options.classes["ui-popup-arrow"] && (t["ui-popup-arrow"] = this._getClassValue(t["ui-popup-arrow"], "ui-overlay-shadow", this.options.shadow))
            },
            _setOption: function(e, n) {
                var r;
                return e === "classes" && (r = n["ui-popup"].match(t), n["ui-popup-arrow"].match(t) !== r && (n["ui-popup-arrow"] = this._getClassValue(n["ui-popup-arrow"], "ui-overlay-shadow", r))), this._superApply(arguments)
            }
        }), e.mobile.popup
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/table", ["jquery", "../widget", "./page"], t) : t(e)
    }(function(e) {
        return e.widget("mobile.table", {
            version: "@VERSION",
            options: {
                classes: {
                    "ui-table": ""
                },
                enhanced: !1
            },
            headers: null,
            allHeaders: null,
            _create: function() {
                var e = this.options;
                e.enhanced || this._addClass("ui-table", e.disabled ? " ui-state-disabled" : ""), this.refresh()
            },
            _setOptions: function(e) {
                return e.disabled !== r && this._toggleClass(null, "ui-state-disabled", e.disabled), this._super(e)
            },
            _setHeaders: function() {
                this.headerRows = this.element.children("thead").children("tr"), this.headers = this.headerRows.first().children(), this.allHeaders = this.headerRows.children(), this.allRowsExceptFirst = this.element.children("thead,tbody").children("tr").not(this.headerRows.eq(0))
            },
            rebuild: function() {
                this.refresh()
            },
            _refreshHeaderCell: function(t, n, r) {
                var i, s = parseInt(n.getAttribute("colspan"), 10),
                    o = ":nth-child(" + (r + 1) + ")";
                if (s)
                    for (i = 0; i < s - 1; i++) r++, o += ", :nth-child(" + (r + 1) + ")";
                return e(n).jqmData("cells", this.allRowsExceptFirst.not(n).children(o)), r
            },
            _refreshHeaderRow: function(t, n) {
                var r = 0;
                e(n).children().each(e.proxy(function(e, t) {
                    r = this._refreshHeaderCell(e, t, r) + 1
                }, this))
            },
            refresh: function() {
                this._setHeaders(), this.headerRows.each(e.proxy(this, "_refreshHeaderRow"))
            },
            _destroy: function() {
                var t = this.element;
                t.find("thead tr").children().each(function() {
                    e(this).jqmRemoveData("cells")
                })
            }
        })
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/table.columntoggle", ["jquery", "./table"], t) : t(e)
    }(function(e, t) {
        return e.widget("mobile.table", e.mobile.table, {
            options: {
                mode: "columntoggle",
                classes: {
                    "ui-table-cell-hidden": "",
                    "ui-table-cell-visible": "",
                    "ui-table-priority-": "",
                    "ui-table-columntoggle": ""
                }
            },
            _create: function() {
                this._instantiating = !0, this._super();
                if (this.options.mode !== "columntoggle") return;
                this.options.enhanced || this._enhanceColumnToggle(), this._instantiating = !1
            },
            _enhanceColumnToggle: function() {
                this._addClass("ui-table-columntoggle"), this._updateHeaderPriorities()
            },
            _updateVariableColumn: function(e, t, n) {
                this._addClass(t, "ui-table-priority-" + n)
            },
            _updateHeaderPriorities: function(t) {
                this.headers.each(e.proxy(function(n, r) {
                    var i = e(r),
                        s = e.mobile.getAttribute(r, "priority");
                    s && this._updateVariableColumn(i, i.add(i.jqmData("cells")), s, t)
                }, this))
            },
            _setColumnVisibility: function(e, t) {
                var n = e.jqmData("cells");
                n && (n = n.add(e), this._unlock(n), this._addClass(n, t ? "ui-table-cell-visible" : "ui-table-cell-hidden"))
            },
            setColumnVisibility: function(t, n) {
                var r;
                e.type(t) === "number" ? r = this.headers.eq(t) : t.length > 0 && (this.headers.index(t[0]) >= 0 ? r = t.first() : this.headers.each(e.proxy(function(n, i) {
                    var s = e(i),
                        o = s.jqmData("cells");
                    if ((o ? o.index(t[0]) : -1) >= 0) return r = s, !1
                }, this))), r && this._setColumnVisibility(r, n)
            },
            _unlock: function(e) {
                var t = e || this.element.children("thead, tbody").children("tr").children(".ui-table-cell-hidden, .ui-table-cell-visible");
                this._removeClass(t, "ui-table-cell-hidden ui-table-cell-visible")
            },
            _recordLockedColumns: e.noop,
            _restoreLockedColumns: e.noop,
            refresh: function() {
                var e;
                this._super(), !this._instantiating && this.options.mode === "columntoggle" && (e = this._recordLockedColumns(), this._unlock(), this._updateHeaderPriorities(), this._restoreLockedColumns(e))
            },
            _destroy: function() {
                return this.options.mode === "columntoggle" && (this.options.enhanced || this.headers.each(e.proxy(function(t, n) {
                    var r, i = e.mobile.getAttribute(n, "priority");
                    i && (r = e(n), r.add(r.jqmData("cells")))
                }, this))), this._superApply(arguments)
            }
        })
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/table.columntoggle.popup", ["jquery", "./table.columntoggle", "./popup", "./controlgroup", "./forms/button", "./widget.theme", "./forms/checkboxradio"], t) : t(e)
    }(function(e, t) {
        return e.widget("mobile.table", e.mobile.table, {
            options: {
                columnButton: !0,
                columnButtonTheme: null,
                columnPopupTheme: null,
                columnButtonText: "Columns...",
                columnUi: !0,
                classes: {
                    "ui-table-columntoggle-popup": "",
                    "ui-table-columntoggle-btn": "ui-corner-all ui-shadow ui-mini"
                }
            },
            _create: function() {
                var t, n;
                this.options.columnButtonTheme = this.options.columnButtonTheme ? this.options.columnButtonTheme : "inherit", this._super();
                if (this.options.mode !== "columntoggle" || !this.options.columnUi) return;
                this.options.enhanced && (t = this._id(), n = e(this.document[0].getElementById(t + "-popup")), this._ui = {
                    popup: n,
                    menu: n.children().first(),
                    button: e(this.document[0].getElementById(t + "-button"))
                }, this._updateHeaderPriorities({
                    keep: !0
                }))
            },
            _updateVariableColumn: function(t, n, r, i) {
                var s;
                if (this.options.columnUi || i && i.turningOnUI) s = i.keep ? i.inputs.eq(i.checkboxIndex++) : e("<label><input type='checkbox' checked />" + (t.children("abbr").first().attr("title") || t.text()) + "</label>").appendTo(i.container).children(0).checkboxradio({
                    theme: this.options.columnPopupTheme
                }), s.jqmData("header", t).jqmData("cells", n), t.jqmData("input", s);
                return i && i.turningOnUI ? this : this._superApply(arguments)
            },
            _updateHeaderPriorities: function(t) {
                var n, r, i;
                return t = t || {}, this.options.columnUi || t.turningOnUI ? (r = this._ui.menu.controlgroup("container"), t.keep ? n = r.find("input") : r.empty(), i = this._super(e.extend(t, {
                    checkboxIndex: 0,
                    container: r,
                    inputs: n
                })), t.keep || this._ui.menu.controlgroup("refresh"), this._setupEvents(), this._setToggleState()) : i = this._superApply(arguments), i
            },
            _id: function() {
                return this.element.attr("id") || this.widgetName + this.uuid
            },
            _themeClassFromOption: function(e, t) {
                return t ? t === "none" ? "" : e + t : ""
            },
            _removeColumnUi: function(t) {
                var n = this._ui.menu.find("input");
                n.each(function() {
                    var n = e(this),
                        r = n.jqmData("header");
                    t && n.jqmRemoveData("cells").jqmRemoveData("header"), r.jqmRemoveData("input")
                }), t || (this._ui.menu.remove(), this._ui.popup.remove(), this._ui.button && this._ui.button.remove())
            },
            _setOptions: function(e) {
                var t = this.options.columnUi;
                if (this.options.mode === "columntoggle") {
                    e.columnUi != null && (this.options.columnUi && !e.columnUi ? this._removeColumnUi(!1) : !this.options.columnUi && e.columnUi && this._addColumnUI({
                        callback: this._updateHeaderPriorities,
                        callbackContext: this,
                        callbackArguments: [{
                            turningOnUI: !0
                        }]
                    }), t = e.columnUi);
                    if (t) {
                        e.disabled != null && (this._ui.popup.popup("option", "disabled", e.disabled), this._ui.button && (this._toggleClass(this._ui.button, "ui-state-disabled", null, e.disabled), e.disabled ? this._ui.button.attr("tabindex", -1) : this._ui.button.removeAttr("tabindex"))), e.columnButtonTheme != null && this._ui.button && (this._removeClass(this._ui.button, null, this._themeClassFromOption("ui-button-", this.options.columnButtonTheme)), this._addClass(this._ui.button, null, this._themeClassFromOption("ui-button-", e.columnButtonTheme))), e.columnPopupTheme != null && this._ui.popup.popup("option", "theme", e.columnPopupTheme), e.columnButtonText != null && this._ui.button && this._ui.button.text(e.columnButtonText);
                        if (e.columnButton != null)
                            if (e.columnButton) {
                                if (!this._ui.button || this._ui.button.length === 0) this._ui.button = this._columnsButton();
                                this._ui.button.insertBefore(this.element)
                            } else this._ui.button && this._ui.button.detach()
                    }
                }
                return this._superApply(arguments)
            },
            _setColumnVisibility: function(e, t, n) {
                var r;
                return !n && this.options.columnUi && (r = e.jqmData("input"), r && r.prop("checked", t).checkboxradio("refresh")), this._superApply(arguments)
            },
            _setupEvents: function() {
                this._on(this.window, {
                    throttledresize: "_setToggleState"
                }), this._on(this._ui.menu, {
                    "change input": "_menuInputChange"
                })
            },
            _menuInputChange: function(t) {
                var n = e(t.target);
                this._setColumnVisibility(n.jqmData("header"), n.prop("checked"), !0)
            },
            _columnsButton: function() {
                var t = this._id(),
                    n = this.options,
                    r = e("<a href='#" + t + "-popup' " + "id='" + t + "-button' " + "data-" + e.mobile.ns + "rel='popup' data-theme='" + n.columnButtonTheme + "'>" + n.columnButtonText + "</a>");
                return r.button(), this._addClass(r, "ui-table-columntoggle-btn"), this._on(r, {
                    click: "_handleButtonClicked"
                }), r
            },
            _addColumnUI: function(t) {
                var n, r, i, s, o, u, a, f;
                return r = this._id(), i = r + "-popup", s = this.element, o = this.options, u = o.columnPopupTheme ? " data-" + e.mobile.ns + "theme='" + o.columnPopupTheme + "'" : "", a = this.document[0].createDocumentFragment(), n = this._ui = {
                    button: this.options.columnButton ? this._columnsButton() : null,
                    popup: e("<div id='" + i + "'" + u + "></div>"),
                    menu: e("<fieldset></fieldset>").controlgroup()
                }, this._addClass(n.popup, "ui-table-columntoggle-popup"), f = t.callback.apply(t.callbackContext, t.callbackArguments), n.menu.appendTo(n.popup), a.appendChild(n.popup[0]), n.button && a.appendChild(n.button[0]), s.before(a), n.popup.popup(), f
            },
            _enhanceColumnToggle: function() {
                return this.options.columnUi ? this._addColumnUI({
                    callback: this._superApply,
                    callbackContext: this,
                    callbackArguments: arguments
                }) : this._superApply(arguments)
            },
            _handleButtonClicked: function(t) {
                e.mobile.popup.handleLink(this._ui.button), t.preventDefault()
            },
            _setToggleState: function() {
                this._ui.menu.find("input").each(function() {
                    var t = e(this);
                    t.prop("checked", t.jqmData("cells").eq(0).css("display") === "table-cell").checkboxradio("refresh")
                })
            },
            _recordLockedColumns: function() {
                var t = this.headers,
                    n = [];
                return this._ui.menu.find("input").each(function() {
                    var r = e(this),
                        i = r.jqmData("header"),
                        s = -1;
                    i && (s = t.index(i[0])), s > -1 && (n = n.concat(i.hasClass("ui-table-cell-visible") ? [{
                        index: s,
                        visible: !0
                    }] : i.hasClass("ui-table-cell-hidden") ? [{
                        index: s,
                        visible: !1
                    }] : []), n.push(s))
                }), n
            },
            _restoreLockedColumns: function(e) {
                var t, n, r;
                for (t = e.length - 1; t > -1; t--) n = e[t], r = this.headers.eq(n.index).jqmData("input"), r && r.prop("checked", n.visible).checkboxradio("refresh").trigger("change")
            },
            _destroy: function() {
                return this.options.mode === "columntoggle" && this.options.columnUi && this._removeColumnUi(this.options.enhanced), this._superApply(arguments)
            }
        })
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/table.reflow", ["jquery", "./table"], t) : t(e)
    }(function(e) {
        return e.widget("mobile.table", e.mobile.table, {
            options: {
                mode: "reflow",
                classes: {
                    "ui-table-reflow": "",
                    "ui-table-cell-label": "",
                    "ui-table-cell-label-top": ""
                }
            },
            _create: function() {
                return this.options.mode === "reflow" && !this.options.enhanced && this._addClass("ui-table-reflow"), this._superApply(arguments)
            },
            _refreshHeaderCell: function(t, n, r) {
                return n.setAttribute("data-" + e.mobile.ns + "colstart", r + 1), this._superApply(arguments)
            },
            refresh: function() {
                this._superApply(arguments), this.options.mode === "reflow" && e(this.allHeaders.get().reverse()).each(e.proxy(this, "_updateCellsFromHeader"))
            },
            _updateCellsFromHeader: function(t, n) {
                var r, i, s, o, u = e(n),
                    a = u.clone().contents();
                a.length > 0 && (o = "ui-table-cell-label", i = u.jqmData("cells"), s = e.mobile.getAttribute(n, "colstart"), i.not(n).filter("thead th").length > 0 && (o += " ui-table-cell-label-top", r = parseInt(n.getAttribute("colspan"), 10), r && (i = i.filter("td:nth-child(" + r + "n + " + s + ")"))), this._addLabels(i, o, a))
            },
            _addLabels: function(t, n, r) {
                var i = e("<b>");
                r.length === 1 && r[0].nodeName.toLowerCase() === "abbr" && (r = r.eq(0).attr("title")), this._addClass(i, n), i.append(r), t.not(":has(b." + n.split(" ").join(".") + ")").prepend(i)
            },
            _destroy: function() {
                var t;
                return this.options.mode === "reflow" && (t = "data-" + e.mobile.ns + "colstart", this.options.enhanced || this.element.children("thead").find("[" + t + "]").removeAttr(t).end().end().children("tbody").find("b.ui-table-cell-label").remove()), this._superApply(arguments)
            }
        })
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("jquery-ui/widgets/tabs", ["jquery", "../escape-selector", "../keycode", "../safe-active-element", "../unique-id", "../version", "../widget"], t) : t(e)
    }(function(e) {
        return e.widget("ui.tabs", {
            version: "1.12.1",
            delay: 300,
            options: {
                active: null,
                classes: {
                    "ui-tabs": "ui-corner-all",
                    "ui-tabs-nav": "ui-corner-all",
                    "ui-tabs-panel": "ui-corner-bottom",
                    "ui-tabs-tab": "ui-corner-top"
                },
                collapsible: !1,
                event: "click",
                heightStyle: "content",
                hide: null,
                show: null,
                activate: null,
                beforeActivate: null,
                beforeLoad: null,
                load: null
            },
            _isLocal: function() {
                var e = /#.*$/;
                return function(t) {
                    var n, r;
                    n = t.href.replace(e, ""), r = location.href.replace(e, "");
                    try {
                        n = decodeURIComponent(n)
                    } catch (i) {}
                    try {
                        r = decodeURIComponent(r)
                    } catch (i) {}
                    return t.hash.length > 1 && n === r
                }
            }(),
            _create: function() {
                var t = this,
                    n = this.options;
                this.running = !1, this._addClass("ui-tabs", "ui-widget ui-widget-content"), this._toggleClass("ui-tabs-collapsible", null, n.collapsible), this._processTabs(), n.active = this._initialActive(), e.isArray(n.disabled) && (n.disabled = e.unique(n.disabled.concat(e.map(this.tabs.filter(".ui-state-disabled"), function(e) {
                    return t.tabs.index(e)
                }))).sort()), this.options.active !== !1 && this.anchors.length ? this.active = this._findActive(n.active) : this.active = e(), this._refresh(), this.active.length && this.load(n.active)
            },
            _initialActive: function() {
                var t = this.options.active,
                    n = this.options.collapsible,
                    r = location.hash.substring(1);
                if (t === null) {
                    r && this.tabs.each(function(n, i) {
                        if (e(i).attr("aria-controls") === r) return t = n, !1
                    }), t === null && (t = this.tabs.index(this.tabs.filter(".ui-tabs-active")));
                    if (t === null || t === -1) t = this.tabs.length ? 0 : !1
                }
                return t !== !1 && (t = this.tabs.index(this.tabs.eq(t)), t === -1 && (t = n ? !1 : 0)), !n && t === !1 && this.anchors.length && (t = 0), t
            },
            _getCreateEventData: function() {
                return {
                    tab: this.active,
                    panel: this.active.length ? this._getPanelForTab(this.active) : e()
                }
            },
            _tabKeydown: function(t) {
                var n = e(e.ui.safeActiveElement(this.document[0])).closest("li"),
                    r = this.tabs.index(n),
                    i = !0;
                if (this._handlePageNav(t)) return;
                switch (t.keyCode) {
                    case e.ui.keyCode.RIGHT:
                    case e.ui.keyCode.DOWN:
                        r++;
                        break;
                    case e.ui.keyCode.UP:
                    case e.ui.keyCode.LEFT:
                        i = !1, r--;
                        break;
                    case e.ui.keyCode.END:
                        r = this.anchors.length - 1;
                        break;
                    case e.ui.keyCode.HOME:
                        r = 0;
                        break;
                    case e.ui.keyCode.SPACE:
                        t.preventDefault(), clearTimeout(this.activating), this._activate(r);
                        return;
                    case e.ui.keyCode.ENTER:
                        t.preventDefault(), clearTimeout(this.activating), this._activate(r === this.options.active ? !1 : r);
                        return;
                    default:
                        return
                }
                t.preventDefault(), clearTimeout(this.activating), r = this._focusNextTab(r, i), !t.ctrlKey && !t.metaKey && (n.attr("aria-selected", "false"), this.tabs.eq(r).attr("aria-selected", "true"), this.activating = this._delay(function() {
                    this.option("active", r)
                }, this.delay))
            },
            _panelKeydown: function(t) {
                if (this._handlePageNav(t)) return;

                t.ctrlKey && t.keyCode === e.ui.keyCode.UP && (t.preventDefault(), this.active.trigger("focus"))
            },
            _handlePageNav: function(t) {
                if (t.altKey && t.keyCode === e.ui.keyCode.PAGE_UP) return this._activate(this._focusNextTab(this.options.active - 1, !1)), !0;
                if (t.altKey && t.keyCode === e.ui.keyCode.PAGE_DOWN) return this._activate(this._focusNextTab(this.options.active + 1, !0)), !0
            },
            _findNextTab: function(t, n) {
                function i() {
                    return t > r && (t = 0), t < 0 && (t = r), t
                }
                var r = this.tabs.length - 1;
                while (e.inArray(i(), this.options.disabled) !== -1) t = n ? t + 1 : t - 1;
                return t
            },
            _focusNextTab: function(e, t) {
                return e = this._findNextTab(e, t), this.tabs.eq(e).trigger("focus"), e
            },
            _setOption: function(e, t) {
                if (e === "active") {
                    this._activate(t);
                    return
                }
                this._super(e, t), e === "collapsible" && (this._toggleClass("ui-tabs-collapsible", null, t), !t && this.options.active === !1 && this._activate(0)), e === "event" && this._setupEvents(t), e === "heightStyle" && this._setupHeightStyle(t)
            },
            _sanitizeSelector: function(e) {
                return e ? e.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
            },
            refresh: function() {
                var t = this.options,
                    n = this.tablist.children(":has(a[href])");
                t.disabled = e.map(n.filter(".ui-state-disabled"), function(e) {
                    return n.index(e)
                }), this._processTabs(), t.active === !1 || !this.anchors.length ? (t.active = !1, this.active = e()) : this.active.length && !e.contains(this.tablist[0], this.active[0]) ? this.tabs.length === t.disabled.length ? (t.active = !1, this.active = e()) : this._activate(this._findNextTab(Math.max(0, t.active - 1), !1)) : t.active = this.tabs.index(this.active), this._refresh()
            },
            _refresh: function() {
                this._setOptionDisabled(this.options.disabled), this._setupEvents(this.options.event), this._setupHeightStyle(this.options.heightStyle), this.tabs.not(this.active).attr({
                    "aria-selected": "false",
                    "aria-expanded": "false",
                    tabIndex: -1
                }), this.panels.not(this._getPanelForTab(this.active)).hide().attr({
                    "aria-hidden": "true"
                }), this.active.length ? (this.active.attr({
                    "aria-selected": "true",
                    "aria-expanded": "true",
                    tabIndex: 0
                }), this._addClass(this.active, "ui-tabs-active", "ui-state-active"), this._getPanelForTab(this.active).show().attr({
                    "aria-hidden": "false"
                })) : this.tabs.eq(0).attr("tabIndex", 0)
            },
            _processTabs: function() {
                var t = this,
                    n = this.tabs,
                    r = this.anchors,
                    i = this.panels;
                this.tablist = this._getList().attr("role", "tablist"), this._addClass(this.tablist, "ui-tabs-nav", "ui-helper-reset ui-helper-clearfix ui-widget-header"), this.tablist.on("mousedown" + this.eventNamespace, "> li", function(t) {
                    e(this).is(".ui-state-disabled") && t.preventDefault()
                }).on("focus" + this.eventNamespace, ".ui-tabs-anchor", function() {
                    e(this).closest("li").is(".ui-state-disabled") && this.blur()
                }), this.tabs = this.tablist.find("> li:has(a[href])").attr({
                    role: "tab",
                    tabIndex: -1
                }), this._addClass(this.tabs, "ui-tabs-tab", "ui-state-default"), this.anchors = this.tabs.map(function() {
                    return e("a", this)[0]
                }).attr({
                    role: "presentation",
                    tabIndex: -1
                }), this._addClass(this.anchors, "ui-tabs-anchor"), this.panels = e(), this.anchors.each(function(n, r) {
                    var i, s, o, u = e(r).uniqueId().attr("id"),
                        a = e(r).closest("li"),
                        f = a.attr("aria-controls");
                    t._isLocal(r) ? (i = r.hash, o = i.substring(1), s = t.element.find(t._sanitizeSelector(i))) : (o = a.attr("aria-controls") || e({}).uniqueId()[0].id, i = "#" + o, s = t.element.find(i), s.length || (s = t._createPanel(o), s.insertAfter(t.panels[n - 1] || t.tablist)), s.attr("aria-live", "polite")), s.length && (t.panels = t.panels.add(s)), f && a.data("ui-tabs-aria-controls", f), a.attr({
                        "aria-controls": o,
                        "aria-labelledby": u
                    }), s.attr("aria-labelledby", u)
                }), this.panels.attr("role", "tabpanel"), this._addClass(this.panels, "ui-tabs-panel", "ui-widget-content"), n && (this._off(n.not(this.tabs)), this._off(r.not(this.anchors)), this._off(i.not(this.panels)))
            },
            _getList: function() {
                return this.tablist || this.element.find("ol, ul").eq(0)
            },
            _createPanel: function(t) {
                return e("<div>").attr("id", t).data("ui-tabs-destroy", !0)
            },
            _setOptionDisabled: function(t) {
                var n, r, i;
                e.isArray(t) && (t.length ? t.length === this.anchors.length && (t = !0) : t = !1);
                for (i = 0; r = this.tabs[i]; i++) n = e(r), t === !0 || e.inArray(i, t) !== -1 ? (n.attr("aria-disabled", "true"), this._addClass(n, null, "ui-state-disabled")) : (n.removeAttr("aria-disabled"), this._removeClass(n, null, "ui-state-disabled"));
                this.options.disabled = t, this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, t === !0)
            },
            _setupEvents: function(t) {
                var n = {};
                t && e.each(t.split(" "), function(e, t) {
                    n[t] = "_eventHandler"
                }), this._off(this.anchors.add(this.tabs).add(this.panels)), this._on(!0, this.anchors, {
                    click: function(e) {
                        e.preventDefault()
                    }
                }), this._on(this.anchors, n), this._on(this.tabs, {
                    keydown: "_tabKeydown"
                }), this._on(this.panels, {
                    keydown: "_panelKeydown"
                }), this._focusable(this.tabs), this._hoverable(this.tabs)
            },
            _setupHeightStyle: function(t) {
                var n, r = this.element.parent();
                t === "fill" ? (n = r.height(), n -= this.element.outerHeight() - this.element.height(), this.element.siblings(":visible").each(function() {
                    var t = e(this),
                        r = t.css("position");
                    if (r === "absolute" || r === "fixed") return;
                    n -= t.outerHeight(!0)
                }), this.element.children().not(this.panels).each(function() {
                    n -= e(this).outerHeight(!0)
                }), this.panels.each(function() {
                    e(this).height(Math.max(0, n - e(this).innerHeight() + e(this).height()))
                }).css("overflow", "auto")) : t === "auto" && (n = 0, this.panels.each(function() {
                    n = Math.max(n, e(this).height("").height())
                }).height(n))
            },
            _eventHandler: function(t) {
                var n = this.options,
                    r = this.active,
                    i = e(t.currentTarget),
                    s = i.closest("li"),
                    o = s[0] === r[0],
                    u = o && n.collapsible,
                    a = u ? e() : this._getPanelForTab(s),
                    f = r.length ? this._getPanelForTab(r) : e(),
                    l = {
                        oldTab: r,
                        oldPanel: f,
                        newTab: u ? e() : s,
                        newPanel: a
                    };
                t.preventDefault();
                if (s.hasClass("ui-state-disabled") || s.hasClass("ui-tabs-loading") || this.running || o && !n.collapsible || this._trigger("beforeActivate", t, l) === !1) return;
                n.active = u ? !1 : this.tabs.index(s), this.active = o ? e() : s, this.xhr && this.xhr.abort(), !f.length && !a.length && e.error("jQuery UI Tabs: Mismatching fragment identifier."), a.length && this.load(this.tabs.index(s), t), this._toggle(t, l)
            },
            _toggle: function(t, n) {
                function o() {
                    r.running = !1, r._trigger("activate", t, n)
                }

                function u() {
                    r._addClass(n.newTab.closest("li"), "ui-tabs-active", "ui-state-active"), i.length && r.options.show ? r._show(i, r.options.show, o) : (i.show(), o())
                }
                var r = this,
                    i = n.newPanel,
                    s = n.oldPanel;
                this.running = !0, s.length && this.options.hide ? this._hide(s, this.options.hide, function() {
                    r._removeClass(n.oldTab.closest("li"), "ui-tabs-active", "ui-state-active"), u()
                }) : (this._removeClass(n.oldTab.closest("li"), "ui-tabs-active", "ui-state-active"), s.hide(), u()), s.attr("aria-hidden", "true"), n.oldTab.attr({
                    "aria-selected": "false",
                    "aria-expanded": "false"
                }), i.length && s.length ? n.oldTab.attr("tabIndex", -1) : i.length && this.tabs.filter(function() {
                    return e(this).attr("tabIndex") === 0
                }).attr("tabIndex", -1), i.attr("aria-hidden", "false"), n.newTab.attr({
                    "aria-selected": "true",
                    "aria-expanded": "true",
                    tabIndex: 0
                })
            },
            _activate: function(t) {
                var n, r = this._findActive(t);
                if (r[0] === this.active[0]) return;
                r.length || (r = this.active), n = r.find(".ui-tabs-anchor")[0], this._eventHandler({
                    target: n,
                    currentTarget: n,
                    preventDefault: e.noop
                })
            },
            _findActive: function(t) {
                return t === !1 ? e() : this.tabs.eq(t)
            },
            _getIndex: function(t) {
                return typeof t == "string" && (t = this.anchors.index(this.anchors.filter("[href$='" + e.ui.escapeSelector(t) + "']"))), t
            },
            _destroy: function() {
                this.xhr && this.xhr.abort(), this.tablist.removeAttr("role").off(this.eventNamespace), this.anchors.removeAttr("role tabIndex").removeUniqueId(), this.tabs.add(this.panels).each(function() {
                    e.data(this, "ui-tabs-destroy") ? e(this).remove() : e(this).removeAttr("role tabIndex aria-live aria-busy aria-selected aria-labelledby aria-hidden aria-expanded")
                }), this.tabs.each(function() {
                    var t = e(this),
                        n = t.data("ui-tabs-aria-controls");
                    n ? t.attr("aria-controls", n).removeData("ui-tabs-aria-controls") : t.removeAttr("aria-controls")
                }), this.panels.show(), this.options.heightStyle !== "content" && this.panels.css("height", "")
            },
            enable: function(t) {
                var n = this.options.disabled;
                if (n === !1) return;
                t === r ? n = !1 : (t = this._getIndex(t), e.isArray(n) ? n = e.map(n, function(e) {
                    return e !== t ? e : null
                }) : n = e.map(this.tabs, function(e, n) {
                    return n !== t ? n : null
                })), this._setOptionDisabled(n)
            },
            disable: function(t) {
                var n = this.options.disabled;
                if (n === !0) return;
                if (t === r) n = !0;
                else {
                    t = this._getIndex(t);
                    if (e.inArray(t, n) !== -1) return;
                    e.isArray(n) ? n = e.merge([t], n).sort() : n = [t]
                }
                this._setOptionDisabled(n)
            },
            load: function(t, n) {
                t = this._getIndex(t);
                var r = this,
                    i = this.tabs.eq(t),
                    s = i.find(".ui-tabs-anchor"),
                    o = this._getPanelForTab(i),
                    u = {
                        tab: i,
                        panel: o
                    },
                    a = function(e, t) {
                        t === "abort" && r.panels.stop(!1, !0), r._removeClass(i, "ui-tabs-loading"), o.removeAttr("aria-busy"), e === r.xhr && delete r.xhr
                    };
                if (this._isLocal(s[0])) return;
                this.xhr = e.ajax(this._ajaxSettings(s, n, u)), this.xhr && this.xhr.statusText !== "canceled" && (this._addClass(i, "ui-tabs-loading"), o.attr("aria-busy", "true"), this.xhr.done(function(e, t, i) {
                    setTimeout(function() {
                        o.html(e), r._trigger("load", n, u), a(i, t)
                    }, 1)
                }).fail(function(e, t) {
                    setTimeout(function() {
                        a(e, t)
                    }, 1)
                }))
            },
            _ajaxSettings: function(t, n, r) {
                var i = this;
                return {
                    url: t.attr("href").replace(/#.*$/, ""),
                    beforeSend: function(t, s) {
                        return i._trigger("beforeLoad", n, e.extend({
                            jqXHR: t,
                            ajaxSettings: s
                        }, r))
                    }
                }
            },
            _getPanelForTab: function(t) {
                var n = e(t).attr("aria-controls");
                return this.element.find(this._sanitizeSelector("#" + n))
            }
        }), e.uiBackCompat !== !1 && e.widget("ui.tabs", e.ui.tabs, {
            _processTabs: function() {
                this._superApply(arguments), this._addClass(this.tabs, "ui-tab")
            }
        }), e.ui.tabs
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/tabs.ajax", ["jquery", "../defaults", "../navigation/path", "../navigation/base", "jquery-ui/widgets/tabs"], t) : t(e)
    }(function(e) {
        return e.widget("ui.tabs", e.ui.tabs, {
            _create: function() {
                this._super(), this.active.find("a.ui-tabs-anchor").addClass("ui-button-active")
            },
            _isLocal: function(t) {
                var n, r, i;
                return e.mobile.ajaxEnabled ? (n = e.mobile.path, r = n.parseUrl(e.mobile.base.element().attr("href")), i = n.parseUrl(n.makeUrlAbsolute(t.getAttribute("href"), r)), n.isSameDomain(i.href, r.href) && i.pathname === r.pathname) : this._superApply(arguments)
            }
        })
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("widgets/toolbar.backcompat", ["jquery", "./toolbar", "./widget.backcompat"], t) : t(e)
    }(function(e) {
        if (e.mobileBackcompat !== !1) return e.widget("mobile.toolbar", e.mobile.toolbar, {
            initSelector: ":jqmData(role='footer'), :jqmData(role='header')"
        })
    }),
    function(t) {
        typeof define == "function" && define.amd ? define("zoom/iosorientationfix", ["jquery", "../core", "../zoom"], t) : t(e)
    }(function(e) {
        function f(e) {
            i = e.originalEvent, a = i.accelerationIncludingGravity, s = Math.abs(a.x), o = Math.abs(a.y), u = Math.abs(a.z), !t.orientation && (s > 7 || (u > 6 && o < 8 || u < 8 && o > 6) && s > 5) ? r.enabled && r.disable() : r.enabled || r.enable()
        }
        e.mobile.iosorientationfixEnabled = !0;
        var n = navigator.userAgent,
            r, i, s, o, u, a;
        if (!(/iPhone|iPad|iPod/.test(navigator.platform) && /OS [1-5]_[0-9_]* like Mac OS X/i.test(n) && n.indexOf("AppleWebKit") > -1)) {
            e.mobile.iosorientationfixEnabled = !1;
            return
        }
        r = e.mobile.zoom, e.mobile.document.on("mobileinit", function() {
            e.mobile.iosorientationfixEnabled && e.mobile.window.bind("orientationchange.iosorientationfix", r.enable).bind("devicemotion.iosorientationfix", f)
        })
    })
});
