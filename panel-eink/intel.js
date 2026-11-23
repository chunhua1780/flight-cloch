'use strict';
function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? (c > 1 && (G.n = c < 3 ? -1 : u), d(c, u)) : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var GPS = {
  fix: null,
  web: false
};
function gpsRead() {
  try {
    if (window.AndroidPanel && AndroidPanel.gps) {
      var s = AndroidPanel.gps();
      if (s) GPS.fix = JSON.parse(s);
    }
  } catch (e) {}
  var f = GPS.fix;
  if (!f) return null;
  var key = f.lat.toFixed(4) + ',' + f.lon.toFixed(4);
  if (key !== GPS.lk) {
    GPS.lk = key;
    GPS.lkt = Date.now();
  }
  if (f.gs > 80 && Date.now() - GPS.lkt > 3 * 60e3) return null;
  return Date.now() - f.t < 3 * 60e3 && (f.acc < 0 || f.acc < 500) ? f : null;
}
(function webGps() {
  if (window.AndroidPanel || !navigator.geolocation) return;
  try {
    navigator.geolocation.watchPosition(function (p) {
      var c = p.coords;
      GPS.web = true;
      GPS.fix = {
        lat: c.latitude,
        lon: c.longitude,
        alt: c.altitude != null ? Math.round(c.altitude * 3.28084) : -1,
        gs: c.speed != null ? Math.round(c.speed * 1.94384) : -1,
        trk: c.heading != null && !isNaN(c.heading) ? Math.round(c.heading) : -1,
        acc: Math.round(c.accuracy || -1),
        t: p.timestamp || Date.now()
      };
    }, function () {}, {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 60000
    });
  } catch (e) {}
})();
var gpsPerm = function gpsPerm() {
  try {
    return !window.AndroidPanel || !AndroidPanel.gpsOk || AndroidPanel.gpsOk();
  } catch (e) {
    return true;
  }
};
var NMr = Math.PI / 180;
function gcNm(a, b) {
  var x = Math.pow(Math.sin((b[0] - a[0]) * NMr / 2), 2) + Math.cos(a[0] * NMr) * Math.cos(b[0] * NMr) * Math.pow(Math.sin((b[1] - a[1]) * NMr / 2), 2);
  return 3440 * 2 * Math.asin(Math.min(1, Math.sqrt(x)));
}
function gpsOnRoute(N, f, elPlan) {
  if (!N.length) return null;
  var best = null;
  for (var i = 1; i < N.length; i++) {
    var a = N[i - 1],
      b = N[i];
    var k = Math.cos(f.lat * NMr),
      ax = (a[3] - f.lon) * k,
      ay = a[2] - f.lat,
      bx = (b[3] - f.lon) * k,
      by = b[2] - f.lat,
      dx = bx - ax,
      dy = by - ay,
      L2 = dx * dx + dy * dy;
    var t = L2 ? Math.max(0, Math.min(1, -(ax * dx + ay * dy) / L2)) : 0,
      d = Math.hypot(ax + dx * t, ay + dy * t) * 60,
      el = a[1] + (b[1] - a[1]) * t;
    var sc = d + Math.max(0, Math.abs(el - elPlan) - 45) * 2;
    if (!best || sc < best.sc) best = {
      sc: sc,
      d: d,
      el: el,
      i: i
    };
  }
  return best;
}
function liveState(L, now, off, on) {
  var N = (L.n || []).filter(function (w) {
      return w.length >= 4;
    }),
    elPlan = (now - off) / MIN;
  var ph = now < off ? 0 : now < on ? 1 : 2,
    el = elPlan,
    src = 'PLAN',
    alt = null,
    gs = null,
    P = null,
    dOff = null;
  var f = DEMO ? null : gpsRead();
  if (f) {
    P = [f.lat, f.lon];
    alt = f.alt >= 0 ? f.alt : null;
    gs = f.gs >= 0 ? f.gs : null;
    src = 'GPS';
    var r = gpsOnRoute(N, f, elPlan);
    if (r && r.d < 150) {
      el = r.el;
      dOff = r.d;
      if (gs != null && gs > 80) ph = 1;else if (gs != null && gs < 40 && ph === 1 && (elPlan < 10 || elPlan > L.tr - 10)) ph = el > L.tr / 2 ? 2 : 0;
    }
  }
  return {
    el: el,
    ph: ph,
    src: src,
    alt: alt,
    gs: gs,
    P: P,
    dOff: dOff
  };
}
var FIRB = null;
fetch('fir.json').then(function (r) {
  return r.json();
}).then(function (j) {
  FIRB = j.f.map(function (f) {
    var rings = f.r.map(function (a) {
      var pts = [];
      for (var k = 0; k < a.length; k += 2) pts.push([a[k], a[k + 1]]);
      return pts;
    });
    var bb = [180, 90, -180, -90];
    rings.forEach(function (r) {
      return r.forEach(function (_ref) {
        var x = _ref[0],
          y = _ref[1];
        bb[0] = Math.min(bb[0], x);
        bb[1] = Math.min(bb[1], y);
        bb[2] = Math.max(bb[2], x);
        bb[3] = Math.max(bb[3], y);
      });
    });
    return {
      id: f.id,
      n: f.n,
      a: f.a,
      rings: rings,
      bb: bb
    };
  });
  try {
    draw();
  } catch (e) {}
}).catch(function () {});
function inRing(x, y, r) {
  var c = false;
  for (var i = 0, j = r.length - 1; i < r.length; j = i++) {
    var xi = r[i][0],
      yi = r[i][1],
      xj = r[j][0],
      yj = r[j][1];
    if (yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c;
  }
  return c;
}
function firHere(lat, lon, L) {
  var U = (FIDB && FIDB.items || []).filter(function (x) {
    return x.kind === 'area' && /^(FIR|UIR)$/.test(x.type) && fiUsable(x, Date.now());
  }).find(function (x) {
    var G = fiGeom(x);
    return G && inGeom(G, lat, lon);
  });
  if (U) return {
    id: U.fir || U.name,
    label: (/FIR|UIR/.test(U.name) ? U.name : U.name + ' ' + U.type) + (U.fir && U.name.indexOf(U.fir) < 0 ? ' – ' + U.fir : '')
  };
  if (!FIRB) return null;
  var C = FIRB.filter(function (f) {
    return !(lon < f.bb[0] || lon > f.bb[2] || lat < f.bb[1] || lat > f.bb[3]) && f.rings.some(function (r) {
      return inRing(lon, lat, r);
    });
  });
  if (!C.length) return null;
  var ofp = {};
  (L && L.fi || []).forEach(function (x) {
    ofp[x[1]] = x[0];
    ofp[FIRALIAS[x[1]] || x[1]] = x[0];
  });
  var hit = C.find(function (f) {
    return ofp[f.id];
  });
  var f = hit || C.sort(function (a, b) {
    return b.a - a.a;
  })[0];
  var nm = (hit ? ofp[f.id] : f.n).toUpperCase().replace(/\s+-\s+.*$/, '');
  return {
    id: f.id,
    label: (/FIR|UIR|OCEANIC|CONTROL/.test(nm) ? nm : nm + ' FIR') + ' – ' + f.id
  };
}
var FIRGEO = {
  KZWY: 'KZNY'
};
function firRings(code) {
  if (!FIRB || !code) return null;
  var id = FIRGEO[code] || code;
  var F = FIRB.filter(function (x) {
    return x.id === id;
  });
  if (!F.length) F = FIRB.filter(function (x) {
    return x.id === (FIRALIAS[code] || code);
  });
  return F.length ? [].concat.apply([], F.map(function (f) {
    return f.rings;
  })) : null;
}
var FIDB = null,
  WPTI = {},
  WPTL = [];
try {
  FIDB = JSON.parse(ls('fidb') || 'null');
} catch (e) {}
function fiIndex() {
  WPTI = {};
  WPTL = [];
  FIG = {};
  (FIDB && FIDB.items || []).forEach(function (x) {
    if (x.kind !== 'wpt') return;
    (WPTI[x.name] = WPTI[x.name] || []).push([x.lat, x.lon]);
    WPTL.push(x);
  });
}
function wptFix(id, near) {
  var a = WPTI[id];
  if (!a || !a.length) return null;
  if (!near || a.length === 1) return a[0];
  return a.slice().sort(function (p, q) {
    return gcNm(p, near) - gcNm(q, near);
  })[0];
}
var BOUNDARY = /^(FIR|UIR|CTA|TMA)$/;
function fiSync() {
  return _fiSync.apply(this, arguments);
}
function _fiSync() {
  _fiSync = _asyncToGenerator(_regenerator().m(function _callee() {
    var j, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          if (!(!navigator.onLine || !ls('key') || Date.now() - +(ls('fit') || 0) < 10 * MIN)) {
            _context.n = 1;
            break;
          }
          return _context.a(2);
        case 1:
          _context.p = 1;
          _context.n = 2;
          return postK({
            action: 'figet'
          });
        case 2:
          j = _context.v;
          if (j && j.ok && j.db) {
            FIDB = j.db;
            try {
              localStorage.setItem('pnl.fidb', JSON.stringify(FIDB));
            } catch (e) {
              MSG = '⚠️ ' + X('数据库太大，手机只能临时保存（重开要联网）', 'Database too large to store offline');
            }
            ls('fit', String(Date.now()));
            fiIndex();
          }
          _context.n = 4;
          break;
        case 3:
          _context.p = 3;
          _t = _context.v;
        case 4:
          return _context.a(2);
      }
    }, _callee, null, [[1, 3]]);
  }));
  return _fiSync.apply(this, arguments);
}
var fiUsable = function fiUsable(x, t) {
  return x.kind !== 'wpt' && x.status === 'approved' && !(x.to && Date.parse(x.to) < t) && !(x.from && Date.parse(x.from) > t + 24 * HOUR);
};
var fiActiveAt = function fiActiveAt(x, t) {
  return !(x.to && Date.parse(x.to) < t) && !(x.from && Date.parse(x.from) > t);
};
var FIG = {};
function fiGeom(x) {
  if (FIG[x.id]) return FIG[x.id];
  var R = null;
  if (x.poly && x.poly.length >= 3) R = [x.poly.map(function (p) {
    return [p[1], p[0]];
  })];else if (x.circle && x.circle.nm) {
    var c = x.circle,
      p = [];
    for (var a = 0; a < 360; a += 10) p.push([c.lon + c.nm / 60 * Math.sin(a * NMr) / Math.cos(c.lat * NMr), c.lat + c.nm / 60 * Math.cos(a * NMr)]);
    R = [p];
  } else if (x.firOnly) R = x.firs && x.firs.length ? [].concat.apply([], x.firs.map(function (c) {
    return firRings(c) || [];
  })) : firRings(x.fir);
  if (R && !R.length) R = null;
  if (R) {
    var bb = [180, 90, -180, -90];
    R.forEach(function (r) {
      return r.forEach(function (_ref2) {
        var a = _ref2[0],
          b = _ref2[1];
        bb[0] = Math.min(bb[0], a);
        bb[1] = Math.min(bb[1], b);
        bb[2] = Math.max(bb[2], a);
        bb[3] = Math.max(bb[3], b);
      });
    });
    FIG[x.id] = {
      R: R,
      bb: bb
    };
  }
  return R ? FIG[x.id] : null;
}
var inGeom = function inGeom(G, lat, lon) {
  return !(lon < G.bb[0] || lon > G.bb[2] || lat < G.bb[1] || lat > G.bb[3]) && G.R.some(function (r) {
    return inRing(lon, lat, r);
  });
};
function edgeNm(G, lat, lon) {
  var d = 1e9;
  G.R.forEach(function (r) {
    return r.forEach(function (p) {
      d = Math.min(d, gcNm([lat, lon], [p[1], p[0]]));
    });
  });
  return d;
}
function fiAlerts(L, S, off, now) {
  var out = [];
  if (!FIDB || !FIDB.items) return out;
  var N = (L.n || []).filter(function (w) {
    return w.length >= 4;
  });
  if (!N.length && !S.P) return out;
  var cum = cumNm(N);
  FIDB.items.forEach(function (x) {
    if (!fiUsable(x, now) || BOUNDARY.test(x.type) && !x.msg && !x.msgEn) return;
    var G = fiGeom(x);
    if (!G) return;
    var lo = (+x.lower || 0) - 1000,
      hi = (x.upper ? +x.upper : 99999) + 1000;
    var here = S.P || (wpos(L, S.ph === 0 ? -1 : S.ph === 2 ? 1e9 : S.el) || {}).p,
      altNow = S.alt != null ? S.alt : altAt(L, S.ph, S.el);
    if (here && inGeom(G, here[0], here[1]) && altNow >= lo && altNow <= hi && fiActiveAt(x, now)) {
      out.push({
        x: x,
        state: 'in',
        min: 0,
        nm: 0
      });
      return;
    }
    if (S.ph === 2) return;
    var e0 = Math.max(0, S.el),
      eMax = Math.min(L.tr, e0 + 180);
    for (var m = e0; m <= eMax; m += 1) {
      var p = (wpos(L, m) || {}).p;
      if (!p || !inGeom(G, p[0], p[1])) continue;
      var a = altAt(L, 1, m);
      if (a < lo || a > hi || !fiActiveAt(x, off + m * MIN)) continue;
      var nm = Math.max(0, alongNm(N, cum, m) - alongNm(N, cum, e0)) + (S.ph === 0 ? 0 : 0);
      out.push({
        x: x,
        state: 'ahead',
        min: m - e0 + (S.ph === 0 ? (off - now) / MIN : 0),
        nm: nm
      });
      return;
    }
    if (S.P && !N.length) {
      var d = edgeNm(G, S.P[0], S.P[1]);
      if (d <= (x.alertNm || 30)) out.push({
        x: x,
        state: 'near',
        min: null,
        nm: d
      });
    }
  });
  return out.filter(function (a) {
    return a.state !== 'ahead' || function (x) {
      return a.min <= (x.alertMin || 0) || a.nm <= (x.alertNm || 0);
    }(a.x);
  }).sort(function (a, b) {
    return LVR[b.x.level] - LVR[a.x.level] || (a.min || 0) - (b.min || 0);
  });
}
var LVR = {
  warning: 3,
  caution: 2,
  info: 1
};
function cumNm(N) {
  var c = [0];
  for (var i = 1; i < N.length; i++) c.push(c[i - 1] + gcNm([N[i - 1][2], N[i - 1][3]], [N[i][2], N[i][3]]));
  return c;
}
function alongNm(N, cum, el) {
  if (!N.length) return 0;
  if (el <= N[0][1]) return 0;
  for (var i = 1; i < N.length; i++) if (el <= N[i][1]) {
    var k = (el - N[i - 1][1]) / Math.max(.5, N[i][1] - N[i - 1][1]);
    return cum[i - 1] + (cum[i] - cum[i - 1]) * k;
  }
  return cum[cum.length - 1];
}
var ackKey = function ackKey(L, a) {
  return 'ack.' + L.k + '.' + a.x.id + '.' + (a.x.ver || 0) + (a.state === 'in' && a.x.repeatMin ? '.r' + Math.floor(NOW() / (a.x.repeatMin * MIN)) : '');
};
var acked = function acked(L, a) {
  return !!ls(ackKey(L, a));
};
var ACTX = null,
  BEEPED = {};
function beep(n, hi) {
  if (ls('snd') === 'off') return;
  try {
    ACTX = ACTX || new (window.AudioContext || window.webkitAudioContext)();
    if (ACTX.state === 'suspended') ACTX.resume();
    for (var i = 0; i < n; i++) {
      var o = ACTX.createOscillator(),
        g = ACTX.createGain(),
        t = ACTX.currentTime + i * .32;
      o.frequency.value = hi ? 1250 : 880;
      g.gain.setValueAtTime(.0001, t);
      g.gain.exponentialRampToValueAtTime(.35, t + .02);
      g.gain.exponentialRampToValueAtTime(.0001, t + .22);
      o.connect(g).connect(ACTX.destination);
      o.start(t);
      o.stop(t + .25);
    }
  } catch (e) {}
}
function alertSound(L, list) {
  var now = Date.now();
  list.forEach(function (a) {
    if (acked(L, a) || DEMO) return;
    var k = ackKey(L, a),
      last = BEEPED[k] || 0;
    if (a.x.level === 'warning' && now - last > 115e3) {
      BEEPED[k] = now;
      beep(3, true);
    } else if (a.x.level === 'caution' && !last) {
      BEEPED[k] = now;
      beep(1, false);
    }
  });
}
var fmtMin = function fmtMin(m) {
  return m == null ? '' : m < 1 ? XS('现在', 'now') : m < 60 ? Math.round(m) + ' min' : Math.floor(m / 60) + 'h' + String(Math.round(m % 60)).padStart(2, '0');
};
var flLab = function flLab(v) {
  return v >= 99999 ? 'UNL' : !v ? 'SFC' : v >= 10000 ? 'FL' + Math.round(v / 100) : v + 'ft';
};
function fillPhrase(t) {
  var L = CUR;
  if (!L || !t) return t || '';
  var now = NOW(),
    off = offOf(L),
    el = (now - off) / MIN,
    N = (L.n || []).filter(function (w) {
      return w.length >= 4;
    });
  var nx = N.find(function (w) {
      return w[1] > el;
    }),
    pv = N.filter(function (w) {
      return w[1] <= el;
    }).slice(-1)[0],
    P = (wpos(L, el) || {}).p,
    fh = P ? firHere(P[0], P[1], L) : null;
  var trk = nx && pv ? (Math.atan2(dlon(nx[3], pv[3]) * Math.cos(pv[2] * Math.PI / 180), nx[2] - pv[2]) * 180 / Math.PI + 360) % 360 : 0;
  var fl = GPS.fix && GPS.fix.alt > 5000 && !DEMO ? Math.round(GPS.fix.alt / 1000) * 10 : Math.round((L.fl || 35000) / 100);
  var V = {
    call_sign: csOf(L),
    current_fir: fh ? fh.label.replace(/ – .*/, '') : '',
    current_position: pv ? pv[0] : '',
    current_time_utc: hmZ(now),
    flight_level: fl,
    direction: trk < 180 ? 'EAST' : 'WEST',
    airway: '(AWY)',
    next_wpt_or_crossing_awy: nx ? nx[0] : '',
    next_est_time_utc: nx ? hmZ(off + nx[1] * MIN) : '',
    next_wpt: (N[N.indexOf(nx) + 1] || [''])[0]
  };
  return t.replace(/\{(\w+)\}/g, function (m, k) {
    return V[k] != null && V[k] !== '' ? V[k] : m;
  });
}
function actList(x) {
  var A = (x.actions || []).concat(x.phrase ? [{
    zh: '📻 ' + fillPhrase(x.phrase),
    en: ''
  }] : []);
  if (!A.length) return '';
  return '<ol class="acts">' + A.map(function (t) {
    return '<li>' + esc(LANG === 'en' ? t.en || t.zh : t.zh || t.en) + (LANG === 'both' && t.en && t.zh ? '<small>' + esc(t.en) + '</small>' : '') + '</li>';
  }).join('') + '</ol>';
}
function alertHtml(L, list) {
  return list.map(function (a) {
    var x = a.x,
      ok = acked(L, a),
      txt = LANG === 'en' ? x.msgEn || x.msg : x.msg || x.msgEn;
    var when = a.state === 'proc' ? a.label : x.kind === 'wac' ? fmtMin(a.min) : a.state === 'in' ? XS('已在区内', 'INSIDE') : a.state === 'near' ? Math.round(a.nm) + ' NM' : fmtMin(a.min) + ' · ' + Math.round(a.nm) + ' NM';
    return '<div class="al ' + esc(x.level) + (ok ? ' ack' : '') + '" data-ak="' + esc(ackKey(L, a)) + '" data-id="' + esc(x.id) + '"><b>' + (x.level === 'warning' ? '⛔ ' : x.level === 'caution' ? '⚠︎ ' : 'ⓘ ') + esc(x.name) + '</b> <span class="aw">' + esc(when) + '</span>' + (ok ? '' : '<div class="at">' + esc(txt || '') + (LANG === 'both' && x.msgEn && x.msg ? '<small>' + esc(x.msgEn) + '</small>' : '') + '</div>' + actList(x) + '<div class="am">' + esc(x.kind === 'wac' ? XS('点开看全文', 'tap for details') : /^(crew|tl|rule|proc)$/.test(x.kind) ? '' : (x.fir || '') + ' · ' + flLab(+x.lower || 0) + '–' + flLab(x.upper ? +x.upper : 99999)) + ' <span class="ack-b">✓ ' + XS('确认', 'ACK') + '</span></div>') + '</div>';
  }).join('');
}
function fiDetail(id) {
  if (PSEUDO[id] && PSEUDO[id].wac) return wacDetail(PSEUDO[id]);
  var x = PSEUDO[id] || FIDB && FIDB.items.find(function (y) {
    return y.id === id;
  });
  if (!x) return;
  $('sheet').innerHTML = '<div style="display:flex;align-items:center;gap:8px"><b style="font-size:17px">🛰 ' + esc(x.name) + '</b><span style="flex:1"></span><span class="btn" id="sh-x">✕</span></div>' + '<div class="nt' + (x.level === 'warning' ? ' red' : '') + '"><div class="zh">' + esc(x.msg || '') + '</div><div>' + esc(x.msgEn || '') + '</div><div class="tm">' + esc(x.type) + ' · ' + esc(x.fir || '') + ' ' + esc(x.firName || '') + ' · ' + flLab(+x.lower || 0) + '–' + flLab(x.upper ? +x.upper : 99999) + ' · ' + X('生效 ', 'from ') + esc(x.from ? x.from.slice(0, 16).replace('T', ' ') + 'Z' : '—') + ' ' + X('到 ', 'to ') + esc(x.to ? x.to.slice(0, 16).replace('T', ' ') + 'Z' : 'PERM') + (x.sched ? ' · ' + esc(x.sched) : '') + '</div>' + (x.phases ? x.phases.map(function (p) {
    return '<div style="margin-top:8px;font-weight:900' + (PH_NOW[x.id] === p.key ? ';color:var(--red)' : '') + '">' + (PH_NOW[x.id] === p.key ? '▶ ' : '') + esc(LANG === 'en' ? p.en : p.zh) + '</div><ol style="margin:3px 0 0 18px;padding:0">' + p.steps.map(function (t) {
      return '<li style="margin:3px 0">' + esc(LANG === 'en' ? t.en : t.zh) + (LANG === 'both' ? '<div class="en">' + esc(t.en) + '</div>' : '') + '</li>';
    }).join('') + '</ol>';
  }).join('') : '') + actList(x) + (x.notes ? '<div style="margin-top:6px">' + esc(x.notes) + '</div>' : '') + (x.quote ? '<div class="en">“' + esc(x.quote) + '”</div>' : '') + '<div class="tm" style="margin-top:6px">📄 ' + esc(x.src && x.src.file || X('手动', 'manual')) + ' · ver ' + (x.ver || 1) + ' · ' + X('审核 ', 'reviewed ') + (x.rev ? new Date(x.rev.at).toISOString().slice(0, 10) : '—') + ' · DB v' + (FIDB.v || 0) + '</div></div>' + '<div class="ok" style="font-size:12px">' + X('仅供辅助，不能替代官方航行情报、公司程序及 ATC 指令', 'Awareness aid only — official AIS, company procedures and ATC prevail') + '</div>';
  $('sheet').style.display = 'block';
  $('sh-x').onclick = function () {
    $('sheet').style.display = 'none';
    draw();
  };
}
function fiDrawMap(g, xy, hot, W, H) {
  if (!FIDB || !FIDB.items) return;
  var t = NOW();
  if (W && ZOOM <= 600 && WPTL.length) {
    var vis = [];
    for (var _i = 0, _WPTL = WPTL; _i < _WPTL.length; _i++) {
      var w = _WPTL[_i];
      var q = xy(w.lat, w.lon);
      if (q[0] > -10 && q[0] < W + 10 && q[1] > -10 && q[1] < H + 10) {
        vis.push([q, w.name]);
        if (vis.length > 400) break;
      }
    }
    g.fillStyle = '#888';
    g.font = '700 12px sans-serif';
    vis.forEach(function (_ref3) {
      var q = _ref3[0],
        n = _ref3[1];
      g.beginPath();
      g.moveTo(q[0], q[1] - 4);
      g.lineTo(q[0] + 3.5, q[1] + 2.5);
      g.lineTo(q[0] - 3.5, q[1] + 2.5);
      g.closePath();
      g.fill();
      if (vis.length < 120) g.fillText(n, q[0] + 5, q[1] + 3);
    });
  }
  FIDB.items.forEach(function (x) {
    if (!fiUsable(x, t)) return;
    var G = fiGeom(x);
    if (!G || (x.firOnly || BOUNDARY.test(x.type)) && !hot[x.id] || G.bb[2] - G.bb[0] > 300) return;
    var h = hot[x.id],
      big = x.firOnly || BOUNDARY.test(x.type);
    g.strokeStyle = h ? '#d00000' : '#7a3db8';
    g.fillStyle = big ? 'rgba(0,0,0,0)' : h ? 'rgba(208,0,0,.10)' : 'rgba(122,61,184,.08)';
    g.lineWidth = big ? 1.3 : h ? 2.5 : 1.6;
    g.setLineDash(big ? [8, 5] : h ? [] : [5, 3]);
    G.R.forEach(function (r) {
      g.beginPath();
      r.forEach(function (p, i) {
        var q = xy(p[1], p[0]);
        i ? g.lineTo(q[0], q[1]) : g.moveTo(q[0], q[1]);
      });
      g.closePath();
      g.fill();
      g.stroke();
    });
    g.setLineDash([]);
    var q = xy(G.R[0][0][1], G.R[0][0][0]);
    g.fillStyle = h ? '#d00000' : '#7a3db8';
    g.font = '900 13px sans-serif';
    g.fillText(x.name.slice(0, 22), q[0] + 3, q[1] - 3);
  });
}
fiIndex();
function wptFill(N, FX) {
  var prev = null;
  N.forEach(function (w) {
    if (FX[w.id]) {
      prev = FX[w.id];
      return;
    }
    var p = wptFix(w.id, prev);
    if (p && (!prev || gcNm(p, prev) < 600)) {
      FX[w.id] = p;
      prev = p;
    }
  });
  return FX;
}
function fiNotams(loc, t) {
  return (FIDB && FIDB.items || []).filter(function (x) {
    return x.kind === 'notam' && x.loc === loc && fiUsable(x, t);
  });
}
var PH_NOW = {};
var GNSS_RE = /\b(GNSS|GPS|RAIM)\b/,
  GNSS_BAD = /INTERFERENCE|JAMM|SPOOF|UNRELIAB|U\/S|NOT AVBL|OUTAGE|DEGRAD|UNAVBL|DISRUPT/;
function gnssAt(L, icao, t) {
  return (L.nt && L.nt[icao] || []).some(function (n) {
    return GNSS_RE.test(n[1]) && GNSS_BAD.test(n[1]) && !(n[3] && n[3] < t - 60 * MIN) && !(n[2] && n[2] > t + 60 * MIN);
  });
}
var icaoIn = function icaoIn(c, list) {
  return !!c && (list || []).some(function (p) {
    return c.indexOf(p) === 0;
  });
};
function procMatch(T, L) {
  if (!T || typeof T !== 'object') return false;
  if (T.dep && !icaoIn(L.dep, T.dep)) return false;
  if (T.arr && !icaoIn(L.arr, T.arr)) return false;
  if (T.arrExclude && icaoIn(L.arr, T.arrExclude)) return false;
  if (T.depExclude && icaoIn(L.dep, T.depExclude)) return false;
  if (T.route && !(L.fi || []).some(function (f) {
    return icaoIn(f[1], T.route) || icaoIn(FIRALIAS[f[1]] || '', T.route);
  })) return false;
  return !!(T.dep || T.arr || T.route);
}
function procAlerts(L, S, off, now) {
  var out = [];
  if (!FIDB || !FIDB.items) return out;
  FIDB.items.forEach(function (x) {
    if (x.kind !== 'proc' || x.trigger === 'timeline' || !fiUsable(x, now) || !fiActiveAt(x, now)) return;
    var key = null,
      lab = '';
    if (x.trigger === 'gnss') {
      return;
      var depG = gnssAt(L, L.dep, off),
        arrG = gnssAt(L, L.arr, off + L.tr * MIN);
      if (depG && (S.ph === 0 || S.el < 15)) {
        key = 'dep';
        lab = XS('起飞机场 GPS 干扰', 'DEP GPS SI');
      } else if (depG && S.ph === 1 && S.el < 60) {
        key = 'toc';
        lab = XS('TOC 后恢复 GPS', 'At TOC');
      } else if (arrG && S.ph === 1 && S.el >= L.tr - 100) {
        key = 'dest';
        lab = XS('目的地 GPS 干扰 · TOD 前', 'DEST GPS SI · before TOD');
      }
    } else if (procMatch(x.trigger, L)) {
      var P = x.phases || [],
        toStd = (L.std - now) / MIN;
      var d = P.find(function (q) {
          return q.key === 'dep';
        }),
        t = P.find(function (q) {
          return q.key === 'toc';
        }),
        a = P.find(function (q) {
          return q.key === 'dest' || q.key === 'arr';
        });
      if (d && S.ph === 0 && toStd <= (d.before || 9999)) {
        key = 'dep';
        lab = XS('起飞前', 'Before departure');
      } else if (t && S.ph === 1 && S.el < 60) {
        key = 'toc';
        lab = XS('起飞后', 'After take-off');
      } else if (a && S.ph === 1 && L.tr - S.el <= (a.before || 100)) {
        key = a.key;
        lab = XS('落地前 ', 'Before landing ') + dur(L.tr - S.el);
      }
    }
    if (!key) return;
    PH_NOW[x.id] = key;
    var p = (x.phases || []).find(function (q) {
      return q.key === key;
    });
    out.push({
      x: Object.assign({}, x, {
        id: x.id,
        msg: (p ? p.zh + '：' : '') + x.msg,
        msgEn: (p ? p.en + ': ' : '') + x.msgEn,
        actions: p ? p.steps : x.actions
      }),
      state: 'proc',
      label: lab,
      min: 0,
      nm: 0
    });
  });
  return out;
}
function tlItems(L) {
  var T = FIDB && FIDB.items && FIDB.items.find(function (x) {
    return x.kind === 'proc' && x.trigger === 'timeline' && x.status === 'approved';
  });
  if (!T) return [];
  var base = /^OM(DB|DW)$/.test(L.dep),
    ulr = (L.tr || 0) >= 14 * 60;
  return (T.steps || []).filter(function (s) {
    return !s.base || (s.base === 'base' ? base : s.base === 'ulr' ? !base && ulr : !base && !ulr);
  }).map(function (s) {
    return {
      t: L.std - s.min * MIN,
      min: s.min,
      zh: s.zh,
      en: s.en,
      alert: s.alert !== false,
      id: T.id + '.' + s.min + '.' + (s.en || s.zh).slice(0, 12)
    };
  }).sort(function (a, b) {
    return a.t - b.t;
  });
}
function tlAlerts(L, S, now) {
  if (S.ph !== 0) return [];
  return tlItems(L).filter(function (s) {
    return s.alert && now >= s.t && now < s.t + 6 * MIN;
  }).map(function (s) {
    var x = {
      id: 'tl:' + s.id,
      kind: 'tl',
      name: '⏱ STD−' + s.min + ' · ' + (LANG === 'en' ? s.en : s.zh),
      level: 'caution',
      msg: s.zh,
      msgEn: s.en,
      actions: [{
        zh: s.zh,
        en: s.en
      }],
      ver: 1
    };
    PSEUDO[x.id] = x;
    return {
      x: x,
      state: 'proc',
      label: hmZ(s.t) + 'Z',
      min: 0,
      nm: 0
    };
  });
}
function tlHtml(L, now) {
  var I = tlItems(L);
  if (!I.length) return '';
  var nx = I.find(function (s) {
    return s.t > now;
  });
  return '<h3>⏱ ' + X('起飞前时间轴', 'Pre-departure timeline') + ' · STD ' + hmZ(L.std) + 'Z</h3><div class="tl">' + I.map(function (s) {
    return '<div class="tli' + (s.t <= now ? ' done' : '') + (s === nx ? ' nx' : '') + '"><b>' + hmZ(s.t) + 'Z</b><i>−' + s.min + '</i><span>' + esc(LANG === 'en' ? s.en : s.zh) + (LANG === 'both' && s.en && s.zh ? ' · ' + esc(s.en) : '') + (s.alert ? '' : ' <small>(' + XS('不弹提醒', 'no alert') + ')</small>') + '</span></div>';
  }).join('') + '</div>';
}
function routePrep(L) {
  if (!FIDB || !FIDB.items) return [];
  return FIDB.items.filter(function (x) {
    return (x.preflight || []).length && fiUsable(x, Date.now()) && (L.fi || []).some(function (f) {
      return f[1] === x.fir || (FIRALIAS[f[1]] || '') === x.fir;
    });
  });
}
var PSEUDO = {};
var WACD = null;
try {
  WACD = JSON.parse(ls('wac') || 'null');
} catch (e) {}
function wacSync() {
  return _wacSync.apply(this, arguments);
}
function _wacSync() {
  _wacSync = _asyncToGenerator(_regenerator().m(function _callee2() {
    var j, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          if (!(!navigator.onLine || !ls('key') || WACD && Date.now() - (WACD.got || 0) < 7 * 864e5)) {
            _context2.n = 1;
            break;
          }
          return _context2.a(2);
        case 1:
          _context2.p = 1;
          _context2.n = 2;
          return postK({
            action: 'wac'
          });
        case 2:
          j = _context2.v;
          if (j && j.ok && j.d) {
            WACD = typeof j.d === 'string' ? JSON.parse(j.d) : j.d;
            WACD.got = Date.now();
            WPX = null;
            ls('wac', JSON.stringify(WACD));
          }
          _context2.n = 4;
          break;
        case 3:
          _context2.p = 3;
          _t2 = _context2.v;
        case 4:
          return _context2.a(2);
      }
    }, _callee2, null, [[1, 3]]);
  }));
  return _wacSync.apply(this, arguments);
}
var WACZ = {};
try {
  WACZ = JSON.parse(ls('waczh') || '{}');
} catch (e) {}
function waczhSync() {
  return _waczhSync.apply(this, arguments);
}
function _waczhSync() {
  _waczhSync = _asyncToGenerator(_regenerator().m(function _callee3() {
    var now, n, names, i, j, _t3;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          if (!(!navigator.onLine || !ls('key') || !WACD)) {
            _context3.n = 1;
            break;
          }
          return _context3.a(2);
        case 1:
          now = Date.now(), n = new Set();
          LEGS.filter(function (l) {
            return l.std > now - 12 * HOUR && l.std < now + 48 * HOUR;
          }).forEach(function (l) {
            return (l.fi || []).forEach(function (f) {
              return wacCountry(FIRALIAS[f[1]] || f[1]).forEach(function (c) {
                return n.add(c.n);
              });
            });
          });
          names = [].concat(n).filter(function (x) {
            return (WACD.c.find(function (c) {
              return c.n === x;
            }) || {
              t: []
            }).t.some(function (t) {
              return t.x && !WACZ[x + '|' + t.h];
            });
          });
          if (names.length) {
            _context3.n = 2;
            break;
          }
          return _context3.a(2);
        case 2:
          i = 0;
        case 3:
          if (!(i < 4)) {
            _context3.n = 10;
            break;
          }
          _context3.p = 4;
          _context3.n = 5;
          return postK({
            action: 'waczh',
            names: names
          });
        case 5:
          j = _context3.v;
          if (!(!j || !j.ok)) {
            _context3.n = 6;
            break;
          }
          return _context3.a(2);
        case 6:
          Object.assign(WACZ, j.zh || {});
          ls('waczh', JSON.stringify(WACZ));
          if (j.left) {
            _context3.n = 7;
            break;
          }
          return _context3.a(2);
        case 7:
          _context3.n = 9;
          break;
        case 8:
          _context3.p = 8;
          _t3 = _context3.v;
          return _context3.a(2);
        case 9:
          i++;
          _context3.n = 3;
          break;
        case 10:
          return _context3.a(2);
      }
    }, _callee3, null, [[4, 8]]);
  }));
  return _waczhSync.apply(this, arguments);
}
var wacH = function wacH(c, t) {
  var z = WACZ[c.n + '|' + t.h];
  return LANG === 'en' || !z || !z.h ? t.h : LANG === 'zh' ? z.h : z.h + ' · ' + t.h;
};
var WPX = null;
function wacExpand(list) {
  var out = [];
  var base = '';
  list.forEach(function (p) {
    return String(p).split('/').forEach(function (tok) {
      var m = /\b([A-Z]{1,2})\b/.exec(tok.trim());
      if (!m) return;
      var t = m[1];
      if (t.length === 2) {
        out.push(t);
        base = t[0];
      } else if (base && out.length) out.push(base + t);else {
        out.push(t);
        base = '';
      }
    });
  });
  return out;
}
function wacCountry(code) {
  if (!WACD || !code) return [];
  if (!WPX) {
    WPX = [];
    WACD.c.forEach(function (c) {
      return wacExpand(c.px).forEach(function (p) {
        return WPX.push([p, c]);
      });
    });
    WPX.sort(function (a, b) {
      return b[0].length - a[0].length;
    });
  }
  var hit = WPX.find(function (p) {
    return code.indexOf(p[0]) === 0;
  });
  if (!hit) return [];
  return WPX.filter(function (p) {
    return p[0] === hit[0];
  }).map(function (p) {
    return p[1];
  }).filter(function (c, i, a) {
    return a.indexOf(c) === i;
  });
}
function wacAlerts(L, S, off) {
  var out = [];
  if (!WACD || !L.fi || S.ph === 2) return out;
  var seen = {},
    el = Math.max(0, S.el);
  L.fi.forEach(function (f) {
    var code = FIRALIAS[f[1]] || f[1];
    wacCountry(code).forEach(function (c) {
      if (seen[c.n]) return;
      seen[c.n] = 1;
      var dt = f[3] - el;
      if (dt > 25 || dt < -10 || S.ph === 0 && f[3] > 25) return;
      var tops = (c.t || []).filter(function (t) {
          return t.x;
        }),
        id = 'wac:' + c.n;
      var x = {
        id: id,
        kind: 'wac',
        wac: c,
        name: '🌐 ' + c.n + XS(' 应急程序', ' contingency'),
        level: 'info',
        fir: code,
        msg: tops.length ? tops.map(function (t) {
          return wacH(c, t);
        }).join(' · ') : 'CRAR ' + (c.crar || ''),
        msgEn: tops.length ? tops.map(function (t) {
          return t.h;
        }).join(' · ') : 'CRAR ' + (c.crar || ''),
        ver: 1
      };
      PSEUDO[id] = x;
      out.push({
        x: x,
        state: 'ahead',
        min: Math.max(0, dt),
        nm: 0,
        label: ''
      });
    });
  });
  return out;
}
function wacDetail(x) {
  var c = x.wac;
  $('sheet').innerHTML = '<div style="display:flex;align-items:center;gap:8px"><b style="font-size:17px">' + esc(x.name) + '</b><span style="flex:1"></span><span class="btn" id="sh-x">✕</span></div>' + (c.t || []).map(function (t) {
    var z = WACZ[c.n + '|' + t.h],
      zx = z && LANG !== 'en' ? '<div style="white-space:pre-line;font-size:16px;font-weight:700;line-height:1.5;margin-top:4px">' + esc(z.x) + '</div>' : LANG !== 'en' && t.x ? '<div class="tm">' + XS('（中文还在翻译，有网时点 🔄 更新）', '') + '</div>' : '',
      ex = LANG === 'zh' && z ? '' : '<div class="en" style="white-space:pre-wrap;font-family:inherit;font-size:' + (LANG === 'en' || !z ? '13.5px;color:#000' : '12px;color:#555') + '">' + esc(t.x) + '</div>';
    return '<div class="nt"><b>' + esc(wacH(c, t)) + '</b>' + (t.x ? zx + ex : '<div class="tm">' + XS('（没有内容，查 CRAR ', '(no text, see CRAR ') + esc(c.crar || '') + '）</div>') + '</div>';
  }).join('') + '<div class="ok" style="font-size:12px">Worldwide Airspace Contingency Flashcards · CRAR ' + esc(c.crar || '') + ' · ' + X('仅供辅助，以公司资料为准', 'awareness only') + '</div>';
  $('sheet').style.display = 'block';
  $('sheet').scrollTop = 0;
  $('sh-x').onclick = function () {
    $('sheet').style.display = 'none';
    draw();
  };
}
var RULE_AREA = /^(before_entry|on_entry|after_entry|every|before_exit|on_exit)$/;
var RULE_PH = {
  before_std: '起飞前',
  after_takeoff: '起飞后',
  top_of_climb: '爬升顶点',
  before_tod: '下降前',
  before_landing: '落地前',
  after_landing: '落地后',
  before_entry: '进入前',
  on_entry: '进入时',
  after_entry: '进入后',
  every: '区内每',
  before_exit: '离开前',
  on_exit: '离开时'
};
var RULE_PH_EN = {
  before_std: 'before STD',
  after_takeoff: 'after T/O',
  top_of_climb: 'at TOC',
  before_tod: 'before TOD',
  before_landing: 'before landing',
  after_landing: 'after landing',
  before_entry: 'before entry',
  on_entry: 'on entry',
  after_entry: 'after entry',
  every: 'every',
  before_exit: 'before exit',
  on_exit: 'on exit'
};
var RULEG = {};
function ruleSpan(L, x) {
  var ck = L.k + '|' + x.id + '|' + (x.ver || 0);
  if (RULEG[ck] !== undefined) return RULEG[ck];
  var G = fiGeom(Object.assign({
    firOnly: !!(x.fir || (x.firs || []).length)
  }, x));
  var r = null;
  if (G) {
    var lo = (+x.lower || 0) - 1000,
      hi = (x.upper ? +x.upper : 99999) + 1000,
      N = (L.n || []).filter(function (w) {
        return w.length >= 4;
      }),
      cum = cumNm(N);
    var a = null,
      b = null;
    var spans = [];
    for (var m = 0; m <= L.tr; m++) {
      var p = (wpos(L, m) || {}).p,
        al = altAt(L, 1, m),
        inn = p && inGeom(G, p[0], p[1]) && al >= lo && al <= hi;
      if (inn && a === null) a = m;
      if (!inn && a !== null) {
        spans.push([a, m]);
        a = null;
      }
    }
    if (a !== null) spans.push([a, L.tr]);
    if (spans.length) r = {
      spans: spans,
      cum: cum,
      N: N
    };
  }
  RULEG[ck] = r;
  return r;
}
function ruleAlerts(L, S, off, now) {
  var out = [];
  if (!FIDB || !FIDB.items || L.noOfp) return out;
  var on = off + L.tr * MIN,
    tod = on - 30 * MIN,
    toc = off + 20 * MIN;
  FIDB.items.forEach(function (x) {
    if (x.kind !== 'rule' || !fiUsable(x, now) || !(x.steps || []).length) return;
    var W = x.where || {},
      areaR = W.fir || (W.firs || []).length || (W.poly || []).length >= 3 || W.circle;
    if ((W.dep || W.arr || W.route) && !procMatch({
      dep: W.dep,
      arr: W.arr,
      route: W.route,
      arrExclude: W.arrExclude,
      depExclude: W.depExclude
    }, L)) return;
    var sp0 = areaR ? ruleSpan(L, {
      id: x.id,
      ver: x.ver,
      fir: W.fir,
      firs: W.firs,
      poly: W.poly,
      circle: W.circle,
      lower: x.lower,
      upper: x.upper
    }) : null;
    if (areaR && !sp0) return;
    (sp0 ? sp0.spans : [null]).forEach(function (ab, si) {
      var sp = ab ? {
        a: ab[0],
        b: ab[1],
        cum: sp0.cum,
        N: sp0.N
      } : null;
      x.steps.forEach(function (st, i) {
        if (si > 0 && !RULE_AREA.test(st.when)) return;
        var T = null,
          show = (st.show || 15) * MIN,
          tag = '';
        var m = +st.min || 0;
        if (RULE_AREA.test(st.when)) {
          if (!sp) return;
          var tA = off + sp.a * MIN,
            tB = off + sp.b * MIN;
          if (st.when === 'before_entry') {
            if (st.nm) {
              var dA = alongNm(sp.N, sp.cum, sp.a);
              var mm = sp.a;
              while (mm > 0 && dA - alongNm(sp.N, sp.cum, mm) < st.nm) mm--;
              T = off + mm * MIN;
            } else T = tA - m * MIN;
          } else if (st.when === 'on_entry') T = tA;else if (st.when === 'after_entry') T = tA + m * MIN;else if (st.when === 'every') {
            if (now < tA || now > tB || !m) return;
            var k = Math.floor((now - tA) / (m * MIN));
            T = tA + k * m * MIN;
            show = m * MIN;
            tag = '.' + k;
          } else if (st.when === 'before_exit') T = tB - m * MIN;else if (st.when === 'on_exit') T = tB;
        } else {
          if (st.when === 'before_std') T = L.std - m * MIN;else if (st.when === 'after_takeoff') T = off + m * MIN;else if (st.when === 'top_of_climb') T = toc + m * MIN;else if (st.when === 'before_tod') T = tod - m * MIN;else if (st.when === 'before_landing') T = on - m * MIN;else if (st.when === 'after_landing') T = on + m * MIN;else return;
          if (/^(after_takeoff|top_of_climb|before_tod|before_landing)$/.test(st.when) && S.ph !== 1) return;
        }
        if (T === null || now < T || now >= T + show) return;
        var lab = XS(RULE_PH[st.when] || st.when, RULE_PH_EN[st.when] || st.when) + (st.when === 'every' ? ' ' + m + ' min' : st.nm ? ' ' + st.nm + ' NM' : m ? ' ' + m + ' min' : '');
        var id = 'rule:' + x.id + '.' + i + (si ? '.s' + si : '') + tag,
          y = {
            id: id,
            kind: 'rule',
            name: x.name + ' · ' + lab,
            level: st.level || x.level || 'caution',
            fir: W.fir || '',
            msg: st.zh || st.en,
            msgEn: st.en || st.zh,
            actions: (st.do || []).length ? st.do : [{
              zh: st.zh,
              en: st.en
            }],
            notes: x.notes,
            quote: x.quote,
            src: x.src,
            ver: x.ver || 1,
            rev: x.rev
          };
        PSEUDO[id] = y;
        out.push({
          x: y,
          state: 'proc',
          label: hmZ(T) + 'Z',
          min: 0,
          nm: 0
        });
      });
    });
  });
  return out;
}