function llName(id) {
  var m = /^([NS])(\d{2})(\d{2})?([EW])(\d{2,3})(\d{2})?$/.exec(id);
  if (m) {
    var la = (+m[2] + (m[3] ? +m[3] / 60 : 0)) * (m[1] === 'S' ? -1 : 1),
      lo = (+m[5] + (m[6] ? +m[6] / 60 : 0)) * (m[4] === 'W' ? -1 : 1);
    return la <= 90 && Math.abs(lo) <= 180 ? [la, lo] : null;
  }
  m = /^(\d{2})(\d{2})?([NS])(\d{2,3})(\d{2})?([EW])$/.exec(id);
  if (m) return [(+m[1] + (m[2] ? +m[2] / 60 : 0)) * (m[3] === 'S' ? -1 : 1), (+m[4] + (m[5] ? +m[5] / 60 : 0)) * (m[6] === 'W' ? -1 : 1)];
  return null;
}
(function (root) {
  'use strict';

  var PV = 10;
  var MON = {
    JAN: 0,
    FEB: 1,
    MAR: 2,
    APR: 3,
    MAY: 4,
    JUN: 5,
    JUL: 6,
    AUG: 7,
    SEP: 8,
    OCT: 9,
    NOV: 10,
    DEC: 11
  };
  var hhmm = function hhmm(s) {
    return s ? +s.slice(0, 2) * 60 + +s.slice(2, 4) : null;
  };
  var ll = function ll(s) {
    var m = /^([NSEW])(\d{2,3})(\d{2}(?:\.\d+)?)$/.exec(s);
    if (!m) return null;
    var v = +m[2] + +m[3] / 60;
    return m[1] === 'S' || m[1] === 'W' ? -v : v;
  };
  function clean(text) {
    return String(text || '').replace(/\r/g, '').replace(/[  -​ 　\t]/g, ' ').split('\n').filter(function (l) {
      return !/^\s*(?:UAE|EK)\d{1,5}\/\d{2}[A-Za-z]{3}\d{2}\/[A-Z]{3}-[A-Z]{3}\s+\S+\s+OFP:/.test(l) && !/^\s*Page \d+ of \d+\s*$/.test(l);
    }).map(function (l) {
      return l.replace(/\s+$/, '');
    });
  }
  function splitTR(t) {
    var m = /^(.*?\d.*?)-([A-Z]{3})$/.exec(String(t || '').toUpperCase().trim());
    return m && /7\d\d|77[A-Z]/.test(m[1]) && !/^(ER|LR|SF)$/.test(m[2]) ? [m[1], 'A6-' + m[2]] : [t, ''];
  }
  function normType(t) {
    t = splitTR(t)[0];
    t = String(t || '').toUpperCase().replace(/^B(?=7)/, '');
    if (/^(77W|777W|777-300ER|7773ER|777-3ER)$/.test(t)) return '777-300ER';
    if (/^(77L|777-200LR|7772LR)$/.test(t)) return '777-200LR';
    if (/^(77F|777F|777-F|777FREIGHTER)$/.test(t)) return '777F';
    if (/^(777-300ERSF|77WSF)$/.test(t)) return '777-300ERSF';
    return t;
  }
  function normReg(r) {
    r = String(r || '').toUpperCase().replace(/\s+/g, '');
    var m = /^(?:A6)?-?([A-Z]{3})$/.exec(r);
    return m ? 'A6-' + m[1] : r;
  }
  function parse(text) {
    var L = clean(text);
    var T = L.join('\n');
    var out = {
      pv: PV,
      ok: false,
      flight: null,
      route: '',
      times: {},
      navlog: [],
      fixes: {},
      alternates: [],
      airports: {},
      notams: {},
      warnings: []
    };
    var h = /\b(?:EK|UAE)?\s?(\d{1,5})\s+(\d{2})([A-Z]{3})\s+([A-Z]{4})\/([A-Z]{3})\s*-\s*([A-Z]{4})\/([A-Z]{3})(?:\s+(\S+))?(?:\s+([A-Z0-9]{1,2}-[A-Z0-9]{3,5}))?/.exec(T);
    if (!h) {
      out.warnings.push('没找到 OFP 抬头（例如 EK9873 11NOV ZGGG/CAN-OMDW/DWC）');
      return out;
    }
    var year = new Date().getUTCFullYear();
    var yh = /\/(\d{2})([A-Z][a-z]{2})(\d{2})\//.exec(text) || /(\d{2})([A-Z][a-z]{2})(20\d{2})/.exec(text);
    if (yh) year = yh[3].length === 2 ? 2000 + +yh[3] : +yh[3];
    var dateUTC = Date.UTC(year, MON[h[3]], +h[2]);
    var hl = (T.slice(h.index).split('\n')[0] || '').toUpperCase();
    var reg = h[9] || '';
    if (!reg) {
      var r2 = /\bA6-?([A-Z]{3})\b/.exec(hl) || /\s(?:B?77[\w-]*|B?777[\w-]*)\s+([A-Z]{3})\b/.exec(hl);
      if (r2) reg = 'A6-' + r2[1];
    }
    out.flight = {
      no: 'EK' + h[1],
      digits: h[1],
      date: h[2] + h[3],
      dateUTC: dateUTC,
      dep: h[4],
      depIata: h[5],
      arr: h[6],
      arrIata: h[7],
      type: normType(h[8] || ''),
      reg: normReg(reg || splitTR(h[8] || '')[1])
    };
    {
      var n = /\bOFP:\s*(\d+)\/\d+\/\d+/.exec(T);
      out.flight.ofpn = n ? +n[1] : 0;
    }
    {
      var c1 = /\(FPL-([A-Z]{3}[A-Z0-9]{1,5})-/.exec(T),
        c2 = /^\s*((?:UAE)[A-Z0-9]{1,5})\b/m.exec(T);
      out.flight.cs = c1 && c1[1] || c2 && c2[1] || '';
    }
    var T1 = T.replace(/[ \t]{2,}/g, ' ');
    var g = function g(re, i) {
      if (i === void 0) {
        i = 1;
      }
      var m = re.exec(T1);
      return m ? m[i] : null;
    };
    var dep = g(/\bDEP\s+(\d{4})\b/),
      arr = g(/\bARR\s+(\d{4})\b/);
    var trip = /\bTRIP\s+([A-Z]{4})\s+(\d+)\s+(\d{4})\b/.exec(T);
    var taxi = /\bTAXI\s+(\d+)\s+(\d{4})\b/.exec(T);
    var altn = /\bALTN\s+([A-Z]{4})\s+(\d+)\s+(\d{4})\b/.exec(T);
    var t = out.times;
    if (dep) t.std = dateUTC + hhmm(dep) * 6e4;
    if (arr) {
      t.sta = dateUTC + hhmm(arr) * 6e4;
      if (t.std && t.sta < t.std) t.sta += 864e5;
    }
    if (trip) {
      t.trip = hhmm(trip[3]);
      out.flight.tripFuel = +trip[2];
    }
    if (taxi) t.taxi = hhmm(taxi[2]);
    if (altn) {
      t.altnTime = hhmm(altn[3]);
      out.flight.destAltn = altn[1];
    }
    t.groundDist = +g(/GND DIST\s+(\d+)/) || null;
    t.airDist = +g(/AIR DIST\s+(\d+)/) || null;
    t.crzFl = g(/CRZ FL\/TEMP\s+(FL\d{3})/);
    t.avgWind = g(/AV W\/C\s+([PM]\d{3})/);
    t.rampFuel = g(/RAMP FUEL\s+([\d.]+)/);
    {
      var pb = g(/PARKING BAY:\s*(\S+)/);
      out.flight.bay = pb && !/^\.+$/.test(pb) ? pb : '';
    }
    t.avgTrk = g(/AV TRK\s+(\d{3})/);
    t.avgIsa = g(/AV ISA\s+([PM]\d{2,3})/);
    t.plndFl = g(/PLND FL:\s*([^\n]+)/);
    if (t.plndFl) t.plndFl = t.plndFl.trim();
    var fl = function fl(re) {
      var m = re.exec(T1);
      return m ? {
        fuel: +m[1],
        time: m[2] ? hhmm(m[2]) : null
      } : null;
    };
    var fuel = out.fuel = {};
    fuel.trip = trip ? {
      fuel: +trip[2],
      time: hhmm(trip[3])
    } : null;
    var cm = /\bCONT\s+([^\n]*?)\s+(\d+)\s+(\d{4})\b/.exec(T1);
    fuel.cont = cm ? {
      label: cm[1].trim(),
      fuel: +cm[2],
      time: hhmm(cm[3])
    } : null;
    fuel.altn = altn ? {
      icao: altn[1],
      fuel: +altn[2],
      time: hhmm(altn[3])
    } : null;
    fuel.frsv = fl(/\bFRSV\s+(\d+)\s+(\d{4})\b/);
    var ex = /\bEXTRA\s*([A-Z ]*?)\s+(\d+)\s+(\d{4})\b/.exec(T1);
    fuel.extra = ex ? {
      label: ex[1].trim(),
      fuel: +ex[2],
      time: hhmm(ex[3])
    } : null;
    fuel.tof = fl(/\bT\/O FUEL\s+(\d+)()/);
    fuel.taxi = taxi ? {
      fuel: +taxi[1],
      time: hhmm(taxi[2])
    } : null;
    var rf = /\bRAMP FUEL\s+([\d.]+)\s+(\d{4})/.exec(T1);
    fuel.ramp = rf ? {
      fuel: Math.round(+rf[1] * (+rf[1] < 1000 ? 1000 : 1)),
      time: hhmm(rf[2])
    } : null;
    fuel.reason = g(/DISCR FUEL REASON:\s*([^\n]+)/);
    fuel.tanker = g(/\n\s*((?:NO )?TANKERING[^(\n]*)/);
    out.weights = {};
    [['ezfw', /EZFW\s+(\d+)\s+MZFW\s+(\d+)/], ['etow', /ETOW\s+(\d+)\s+MTOW\s+(\d+)/], ['elwt', /ELWT\s+(\d+)\s+MLWT\s+(\d+)/]].forEach(function (_ref) {
      var k = _ref[0],
        re = _ref[1];
      var m = re.exec(T1);
      if (m) out.weights[k] = [+m[1], +m[2]];
    });
    {
      var r1 = /RTOW\s+(\d{5,6})/.exec(T1),
        _r = /RLWT\s+(\d{5,6})/.exec(T1);
      if (r1) out.weights.rtow = +r1[1];
      if (_r) out.weights.rlwt = +_r[1];
    }
    var di = L.findIndex(function (l) {
      return /DISPATCH\s+BRIEFING\s+INFO/.test(l);
    });
    out.dispatch = [];
    if (di >= 0) for (var i = di + 1; i < L.length && !/CREW\s+NOTES/.test(L[i]); i++) {
      var x = L[i].trim().replace(/\s+/g, ' ');
      if (!x) continue;
      if (/^-\s/.test(x)) out.dispatch.push(x.slice(2));else if (out.dispatch.length) out.dispatch[out.dispatch.length - 1] += ' ' + x;
    }
    out.dp = [];
    L.forEach(function (l, i) {
      if (/\*\*\*\s*DEPRESSURI[SZ]ATION\s+DIVERSION/.test(l)) out.dp.push([L[i + 1], L[i + 2], L[i + 3]].map(function (x) {
        return (x || '').trim().replace(/\s+/g, ' ');
      }).filter(Boolean));
    });
    var rr = new RegExp('\\b' + out.flight.dep + '\\/\\w+\\s+([\\s\\S]+?)\\s' + out.flight.arr + '\\/\\w+').exec(T);
    if (rr) out.route = rr[1].replace(/\s+/g, ' ').trim();
    out.flight.depRwy = g(new RegExp('\\b' + out.flight.dep + '\\/(\\d{2}[LRC]?)\\b'));
    out.flight.arrRwy = g(new RegExp('\\b' + out.flight.arr + '\\/(\\d{2}[LRC]?)\\b'));
    var ai = L.findIndex(function (l) {
      return /DEST\s+ALTN\s+DIST\s+TRK\s+FL/.test(l);
    });
    if (ai >= 0) {
      for (var _i = ai + 1; _i < Math.min(L.length, ai + 30); _i++) {
        var m = /^\s*([A-Z]{4})\/(\w+)\s+(\d{4})\s+(\d{3})\s+(\d{3})\s+([PM]\d{3})\s+(\d{4})\s+(\d+)/.exec(L[_i]);
        if (m) out.alternates.push({
          icao: m[1],
          rwy: m[2],
          dist: +m[3],
          trk: +m[4],
          fl: +m[5],
          time: hhmm(m[7]),
          fuel: +m[8]
        });else if (/DISPATCH|CREW NOTES/.test(L[_i])) break;
      }
    }
    var ns = L.findIndex(function (l) {
      return /^\s*AWY\s+TRM\s+DIST/.test(l);
    });
    if (ns >= 0) {
      var pendDist = 0,
        cumDist = 0,
        eq = false,
        sepSince = null,
        pendAwy = '',
        lastMt = null,
        pendMt = null;
      var pendSep = [];
      out.firs = [];
      for (var _i2 = ns; _i2 < L.length; _i2++) {
        var l = L[_i2];
        if (/ROUTE TO DESTINATION ALTERNATE/.test(l)) break;
        var sp = /^-{5,}\s*([A-Z][A-Z ]+?)\s+(FIR|UIR)\/([A-Z]{4})\s*-{5,}$/.exec(l.trim());
        if (sp && sp[2] === 'FIR') {
          var f = {
            name: sp[1].trim() + ' FIR',
            code: sp[3],
            afterIdx: out.navlog.length
          };
          out.firs.push(f);
          sepSince = f;
          continue;
        }
        if (/^\s*(AWY|WPT)\s/.test(l) || /^-{5,}/.test(l.trim())) continue;
        var w = /^\s*([A-Z0-9_]{2,11})(?:\/\w+)?\b.*?\s(\d{4})\s+\.{4}\s+\.{4}/.exec(l);
        var first = /^\s*([A-Z]{4})\/\w+\s+[\d.]+\s*$/.exec(l);
        if (first && !out.navlog.length) {
          out.navlog.push({
            id: first[1],
            t: 0,
            dist: 0
          });
          continue;
        }
        if (w) {
          cumDist += pendDist;
          pendDist = 0;
          var mora = /\s(\d{2,3})\s+[PM]\d{3}\b/.exec(l);
          out.navlog.push({
            id: w[1],
            t: hhmm(w[2]),
            dist: cumDist,
            mora: mora ? +mora[1] : null,
            eq: eq,
            awy: pendAwy || null,
            mt: pendMt != null ? pendMt : lastMt
          });
          eq = false;
          sepSince = null;
          pendAwy = '';
          pendMt = null;
          continue;
        }
        var a = /^\s*(\S+)\s+(?:=\s*)?(?:(\d{3})\s+)?(\d{3})\s+(?:\d{2}\/\d{3}|\d{2}\/[PM]\d{2})/.exec(l);
        if (a) {
          pendDist += +a[3];
          eq = /^\s*\S+\s+=/.test(l);
          pendAwy = a[1];
          if (a[2]) {
            pendMt = +a[2];
            lastMt = +a[2];
          }
        }
      }
      var last = out.navlog[out.navlog.length - 1];
      if (last && last.id === out.flight.arr.slice(0, last.id.length)) last.id = out.flight.arr;
      out.firs.forEach(function (f) {
        var N = out.navlog;
        var k = -1;
        if (N[f.afterIdx - 1] && N[f.afterIdx - 1].eq && !(f.afterIdx - 2 >= 0 && out.firs.some(function (g) {
          return g !== f && g.afterIdx === f.afterIdx - 1;
        }))) k = f.afterIdx - 1;
        if (N[f.afterIdx] && N[f.afterIdx].eq) k = f.afterIdx;
        if (k < 0) k = Math.min(f.afterIdx, N.length - 1);
        f.wp = N[k] ? N[k].id : null;
        f.t = N[k] ? N[k].t : null;
        f.idx = k;
      });
    }
    var _loop = function _loop() {
        var lats = [],
          lons = [];
        L[_i3].replace(/\b[NS]\d{4}\.\d\b/g, function (m, o) {
          lats.push({
            v: m,
            o: o
          });
          return m;
        });
        if (!lats.length) return 0;
        (L[_i3 + 1] || '').replace(/\b[EW]\d{5}\.\d\b/g, function (m, o) {
          lons.push({
            v: m,
            o: o
          });
          return m;
        });
        if (lons.length !== lats.length) return 0;
        var nm = [];
        L[_i3 - 1].replace(/[A-Z0-9_]{2,11}/g, function (m, o) {
          if (m !== 'CLIMB' && m !== 'DESCENT') nm.push({
            v: m,
            o: o
          });
          return m;
        });
        if (nm.some(function (n) {
          return !lats.some(function (a) {
            return Math.abs(a.o - n.o) <= 3;
          });
        })) {
          if (nm.length !== lats.length) return 0;
          nm.forEach(function (n, k) {
            n.o = lats[k].o;
          });
        }
        lats.forEach(function (a, k) {
          var n = nm.find(function (x) {
            return Math.abs(x.o - a.o) <= 3;
          });
          var c = [ll(a.v), ll(lons[k].v)];
          if (n) out.fixes[n.v === 'T_O_D' ? 'TOD' : n.v] = c;else out.llfix = (out.llfix || []).concat([c]);
        });
      },
      _ret;
    for (var _i3 = 1; _i3 < L.length - 1; _i3++) {
      _ret = _loop();
      if (_ret === 0) continue;
    }
    (out.navlog || []).forEach(function (w) {
      if (out.fixes[w.id]) return;
      var c = llName(w.id);
      if (c) out.fixes[w.id] = c;
    });
    var ws = L.findIndex(function (l) {
      return /^\s*Weather\s*$/.test(l);
    });
    if (ws >= 0) {
      var role = '',
        cur = null,
        buf = null;
      var flush = function flush() {
        if (cur && buf) {
          (buf.k === 'metar' ? cur.metar : cur.taf).push(buf.s.replace(/\s+/g, ' ').replace(/=$/, '').trim());
        }
        buf = null;
      };
      for (var _i4 = ws + 1; _i4 < L.length; _i4++) {
        var _l = L[_i4];
        if (/AIRPORTLIST ENDED/.test(_l)) {
          flush();
          break;
        }
        var rh = /^\s*(DEPARTURE AIRPORT|DESTINATION AIRPORT|DESTINATION ALTERNATE|FUEL ENROUTE AIRPORT|ENROUTE AIRPORT\(S\)|ERA|ETOPS[^:]*)\s*:/.exec(_l.replace(/\s+/g, ' '));
        if (rh) {
          flush();
          role = {
            'DEPARTURE AIRPORT': 'dep',
            'DESTINATION AIRPORT': 'dest',
            'DESTINATION ALTERNATE': 'destAltn',
            'FUEL ENROUTE AIRPORT': 'fuelEnroute',
            'ENROUTE AIRPORT(S)': 'enroute'
          }[rh[1]] || 'enroute';
          continue;
        }
        var ah = /^\s*([A-Z]{4})\s*\/([A-Z0-9]{3})\s+(\S.*)$/.exec(_l);
        if (ah && !/^\s*(SA|SP|FT|FC)\s/.test(_l)) {
          flush();
          cur = out.airports[ah[1]] || (out.airports[ah[1]] = {
            icao: ah[1],
            iata: ah[2],
            name: ah[3].trim(),
            roles: [],
            metar: [],
            taf: []
          });
          if (role && !cur.roles.includes(role)) cur.roles.push(role);
          continue;
        }
        var rp = /^\s*(SA|SP|FT|FC)\s+(.*)$/.exec(_l);
        if (rp && cur) {
          flush();
          buf = {
            k: rp[1] === 'SA' || rp[1] === 'SP' ? 'metar' : 'taf',
            s: rp[2]
          };
          if (/=\s*$/.test(rp[2])) flush();
          continue;
        }
        if (buf && /^\s{4,}\S/.test(_l)) {
          buf.s += ' ' + _l.trim();
          if (/=\s*$/.test(_l)) flush();
          continue;
        }
        if (/WX NOT AVAILABLE|Period not completely covered/.test(_l)) continue;
      }
    }
    var nb = L.findIndex(function (l) {
      return /LIDO-NOTAM-BULLETIN/.test(l);
    });
    if (nb >= 0) {
      var _cur = null,
        cat = '',
        item = null;
      var push = function push() {
        if (_cur && item) {
          item.text = item.text.replace(/\s+/g, ' ').trim();
          (out.notams[_cur] = out.notams[_cur] || []).push(item);
        }
        item = null;
      };
      for (var _i5 = nb + 1; _i5 < L.length; _i5++) {
        var _l2 = L[_i5];
        if (/^\s*Crew Information\s*$/.test(_l2)) break;
        var hd = /^([A-Z]{4})\s*\/([A-Z0-9]{3})\s+\S/.exec(_l2);
        if (hd && /^-{10,}/.test((L[_i5 + 1] || '').trim())) {
          push();
          _cur = hd[1];
          cat = '';
          continue;
        }
        var fir = /^([A-Z]{4})\s+([A-Z][A-Z ]+(?:FIR|UIR|CTA|OCA)\b.*)$/.exec(_l2);
        if (fir && /^-{6,}/.test((L[_i5 + 1] || '').trim())) {
          push();
          _cur = fir[1];
          cat = 'fir';
          (out.firNames = out.firNames || {})[fir[1]] = fir[2].trim().replace(/\s+/g, ' ');
          continue;
        }
        var ch = /^\+{5,}\s*([A-Z /]+?)\s*\+{5,}/.exec(_l2.trim());
        if (ch) {
          push();
          cat = ch[1].trim();
          continue;
        }
        var nt = /^([A-Z0-9]{1,3}\d{1,5}\/\d{2})(?:\s+-\s+[A-Z ]+?)?\s+VALID:\s*(\d{10})\s*-\s*(\d{10}|UFN|PERM)(\s+EST)?/.exec(_l2.trim());
        if (nt) {
          push();
          var tm = function tm(s) {
            return /^\d{10}$/.test(s) ? Date.UTC(2000 + +s.slice(0, 2), +s.slice(2, 4) - 1, +s.slice(4, 6), +s.slice(6, 8), +s.slice(8, 10)) : null;
          };
          item = {
            id: nt[1],
            cat: cat,
            from: tm(nt[2]),
            to: tm(nt[3]),
            est: !!nt[4],
            text: ''
          };
          continue;
        }
        if (item && /^\s{2,}\S/.test(_l2)) item.text += ' ' + _l2.trim();
      }
      push();
    }
    out.alternates.forEach(function (a) {
      var x = out.airports[a.icao] || (out.airports[a.icao] = {
        icao: a.icao,
        iata: '',
        name: '',
        roles: [],
        metar: [],
        taf: []
      });
      if (!x.roles.includes('destAltn')) x.roles.push('destAltn');
    });
    out.ok = !!(out.flight && out.navlog.length > 2);
    if (!out.navlog.length) out.warnings.push('没读到导航日志（航路点和时间）');
    if (Object.keys(out.fixes).length < 3) out.warnings.push('没读到航路点坐标（高空风表那几页）');
    return out;
  }
  root.OFP = {
    parse: parse,
    clean: clean,
    hhmm: hhmm,
    ll: ll,
    PV: PV,
    normType: normType,
    normReg: normReg,
    splitTR: splitTR
  };
  if (typeof module !== 'undefined') module.exports = root.OFP;
})(typeof window !== 'undefined' ? window : globalThis);