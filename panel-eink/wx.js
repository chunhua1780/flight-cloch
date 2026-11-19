function _createForOfIteratorHelperLoose(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (t) return (t = t.call(r)).next.bind(t); if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var o = 0; return function () { return o >= r.length ? { done: !0 } : { done: !1, value: r[o++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
(function (root) {
  'use strict';

  var KT_PER_MPS = 1.94384;
  var WXZH = {
    TS: '雷暴',
    TSRA: '雷雨',
    SHRA: '阵雨',
    RA: '雨',
    DZ: '毛毛雨',
    SN: '雪',
    SHSN: '阵雪',
    FZRA: '冻雨',
    FZDZ: '冻毛毛雨',
    FZFG: '冻雾',
    FG: '雾',
    MIFG: '浅雾',
    BCFG: '碎雾',
    PRFG: '部分雾',
    BR: '轻雾',
    HZ: '霾',
    FU: '烟',
    DU: '浮尘',
    BLDU: '扬尘',
    SA: '沙',
    BLSA: '扬沙',
    SS: '沙暴',
    DS: '尘暴',
    SQ: '飑',
    GR: '冰雹',
    GS: '小冰雹',
    VA: '火山灰',
    FC: '龙卷',
    PL: '冰粒',
    SG: '米雪',
    IC: '冰晶',
    UP: '未知降水'
  };
  var wxzh = function wxzh(c) {
    var m = /^([+-]|VC)?([A-Z]+)$/.exec(c);
    if (!m) return c;
    var base = WXZH[m[2]] || WXZH[m[2].slice(-2)] || m[2];
    if (m[2].startsWith('TS') && m[2] !== 'TS') base = '雷暴伴' + (WXZH[m[2].slice(2)] || m[2].slice(2));
    if (m[2].startsWith('SH') && !WXZH[m[2]]) base = '阵性' + (WXZH[m[2].slice(2)] || m[2].slice(2));
    return (m[1] === '+' ? '强' : m[1] === '-' ? '弱' : m[1] === 'VC' ? '附近有' : '') + base;
  };
  function fields(tokens) {
    var c = {};
    for (var _iterator = _createForOfIteratorHelperLoose(tokens), _step; !(_step = _iterator()).done;) {
      var tk = _step.value;
      var m = void 0;
      if (m = /^(\d{3}|VRB)(\d{2,3})(?:G(\d{2,3}))?(KT|MPS)$/.exec(tk)) {
        var f = m[4] === 'MPS' ? KT_PER_MPS : 1;
        c.wind = {
          dir: m[1] === 'VRB' ? null : +m[1],
          spd: Math.round(+m[2] * f),
          gust: m[3] ? Math.round(+m[3] * f) : null
        };
      } else if (/^\d{3}V\d{3}$/.test(tk)) {
        if (c.wind) c.wind.var = tk;
      } else if (tk === 'CAVOK') {
        c.vis = 10000;
        c.cavok = true;
        c.ceil = null;
        c.clouds = [];
        c.wx = [];
      } else if (/^\d{4}$/.test(tk) && c.vis == null) c.vis = +tk === 9999 ? 10000 : +tk;else if (m = /^(\d+)?(?:\s?(\d)\/(\d))?SM$/.exec(tk)) c.vis = Math.round(((+m[1] || 0) + (m[2] ? m[2] / m[3] : 0)) * 1609);else if (m = /^(FEW|SCT|BKN|OVC|VV)(\d{3})(CB|TCU)?$/.exec(tk)) {
        (c.clouds = c.clouds || []).push({
          amt: m[1],
          h: +m[2] * 100,
          cb: m[3] || ''
        });
        if ((m[1] === 'BKN' || m[1] === 'OVC' || m[1] === 'VV') && (c.ceil == null || +m[2] * 100 < c.ceil)) c.ceil = +m[2] * 100;
        if (m[3]) c.cb = true;
      } else if (/^(NSC|NCD|SKC|CLR)$/.test(tk)) {
        c.clouds = [];
      } else if (tk === 'NSW') c.wx = [];else if (m = /^(M?\d{2})\/(M?\d{2})$/.exec(tk)) {
        c.temp = +m[1].replace('M', '-');
        c.dew = +m[2].replace('M', '-');
      } else if (m = /^Q(\d{4})$/.exec(tk)) c.qnh = +m[1];else if (m = /^A(\d{4})$/.exec(tk)) c.qnh = Math.round(+m[1] / 100 * 33.8639);else if (/^R\d{2}[LRC]?\//.test(tk)) (c.rvr = c.rvr || []).push(tk);else if (/^([+-]|VC)?(MI|BC|PR|DR|BL|SH|TS|FZ)?(DZ|RA|SN|SG|IC|PL|GR|GS|UP|BR|FG|FU|VA|DU|SA|HZ|PO|SQ|FC|SS|DS)*$/.test(tk) && tk.length >= 2 && !/^\d/.test(tk)) {
        if (/^(TS|[+-]?(TS|SH|FZ|MI|BC|BL|DR)?(RA|DZ|SN|FG|BR|HZ|FU|DU|SA|SS|DS|SQ|GR|GS|VA|FC|PL|SG|IC|UP)+)$/.test(tk.replace(/^VC/, ''))) (c.wx = c.wx || []).push(tk);
      }
    }
    return c;
  }
  function dt(s, ref) {
    var r = new Date(ref);
    var y = r.getUTCFullYear(),
      mo = r.getUTCMonth();
    var d = +s.slice(0, 2),
      h = +s.slice(2, 4),
      mi = s.length >= 6 ? +s.slice(4, 6) : 0;
    var t = Date.UTC(y, mo, d, h, mi);
    if (t - ref > 20 * 864e5) t = Date.UTC(y, mo - 1, d, h, mi);
    if (ref - t > 20 * 864e5) t = Date.UTC(y, mo + 1, d, h, mi);
    return t;
  }
  function metar(s, ref) {
    if (!s) return null;
    var tk = s.replace(/=$/, '').trim().split(/\s+/);
    var tm = /^(\d{6})Z?$/.exec(tk[0]);
    var cut = tk.findIndex(function (x) {
      return /^(NOSIG|BECMG|TEMPO|RMK)$/.test(x);
    });
    var c = fields((tm ? tk.slice(1) : tk).slice(0, cut >= 0 ? cut - (tm ? 1 : 0) : undefined));
    c.time = tm ? dt(tm[1], ref) : null;
    c.raw = s;
    return c;
  }
  function taf(s, ref) {
    if (!s) return null;
    var tk = s.replace(/=$/, '').trim().split(/\s+/);
    var i = 0;
    var out = {
      raw: s,
      issued: null,
      from: null,
      to: null,
      groups: []
    };
    if (/^\d{6}Z?$/.test(tk[i])) {
      out.issued = dt(tk[i].slice(0, 6), ref);
      i++;
    }
    if (/^\d{4}\/\d{4}$/.test(tk[i])) {
      out.from = dt(tk[i].slice(0, 4), ref);
      out.to = dt(tk[i].slice(5), ref);
      if (out.to <= out.from) out.to += 864e5 * 0;
      i++;
    }
    var cur = {
      type: 'BASE',
      from: out.from,
      to: out.to,
      prob: null,
      tk: []
    };
    var push = function push() {
      cur.c = fields(cur.tk.filter(function (x) {
        return !/^T[XN]M?\d{2}\/\d{4}Z$/.test(x);
      }));
      out.groups.push(cur);
    };
    for (; i < tk.length; i++) {
      var x = tk[i];
      var m = void 0;
      if (/^(BECMG|TEMPO|INTER)$/.test(x) || /^PROB\d{2}$/.test(x) || /^FM\d{6}$/.test(x)) {
        push();
        cur = {
          type: x,
          from: null,
          to: null,
          prob: null,
          tk: []
        };
        if (m = /^PROB(\d{2})$/.exec(x)) {
          cur.prob = +m[1];
          cur.type = 'PROB';
          if (tk[i + 1] === 'TEMPO') {
            cur.type = 'TEMPO';
            i++;
          }
        }
        if (m = /^FM(\d{6})$/.exec(x)) {
          cur.type = 'FM';
          cur.from = dt(m[1], ref);
          cur.to = out.to;
        }
        if (/^\d{4}\/\d{4}$/.test(tk[i + 1] || '')) {
          i++;
          cur.from = dt(tk[i].slice(0, 4), ref);
          cur.to = dt(tk[i].slice(5), ref);
        }
        continue;
      }
      if (/^\d{4}\/\d{4}$/.test(x) && cur.from == null) {
        cur.from = dt(x.slice(0, 4), ref);
        cur.to = dt(x.slice(5), ref);
        continue;
      }
      cur.tk.push(x);
    }
    push();
    return out;
  }
  var merge = function merge(a, b) {
    var r = Object.assign({}, a);
    for (var k in b) if (b[k] != null) r[k] = b[k];
    if (b.clouds && !('ceil' in b)) r.ceil = null;
    if (b.cavok) {
      r.wx = [];
      r.ceil = null;
    }
    return r;
  };
  function at(T, M, t) {
    var main = {},
      maybe = [],
      src = 'none';
    if (T && T.from != null && t >= T.from - 3600e3 && t <= T.to) {
      src = 'taf';
      for (var _iterator2 = _createForOfIteratorHelperLoose(T.groups), _step2; !(_step2 = _iterator2()).done;) {
        var g = _step2.value;
        if (g.type === 'BASE') main = merge({}, g.c);else if (g.type === 'FM' && t >= g.from) main = merge({}, g.c);else if (g.type === 'BECMG') {
          if (t >= g.to) main = merge(main, g.c);else if (t >= g.from) maybe.push({
            g: g,
            c: merge(main, g.c),
            why: '转变中 BECMG',
            whyEn: 'BECMG in progress'
          });
        } else if ((g.type === 'TEMPO' || g.type === 'PROB' || g.type === 'INTER') && t >= g.from && t < g.to) {
          {
            var why = (g.prob ? 'PROB' + g.prob + ' ' : '') + (g.type === 'PROB' ? '' : g.type);
            maybe.push({
              g: g,
              c: merge(main, g.c),
              why: why,
              whyEn: why
            });
          }
        }
      }
    } else if (M) {
      src = 'metar';
      main = merge({}, M);
    }
    if (M && M.time && Math.abs(t - M.time) < 2 * 3600e3 && src === 'taf') maybe.push({
      c: merge(main, M),
      why: '实况 METAR',
      whyEn: 'actual METAR'
    });
    return {
      main: main,
      maybe: maybe,
      src: src
    };
  }
  function rateOne(c) {
    if (!c) return 'green';
    var vis = c.vis == null ? 10000 : c.vis,
      ceil = c.ceil == null ? 99999 : c.ceil;
    var wx = (c.wx || []).join(' ');
    var g = c.wind ? Math.max(c.wind.spd || 0, c.wind.gust || 0) : 0;
    if (vis < 800 || ceil < 200 || /FG(?!U)|\+TS|SS|DS|FC|VA|GR/.test(wx) && vis < 1500) return 'red';
    if (vis < 3000 || ceil < 1000 || /TS|CB/.test(wx) || c.cb || g >= 35 || /FZ/.test(wx)) return 'amber';
    return 'green';
  }
  var ORDER = {
    green: 0,
    amber: 1,
    red: 2
  };
  function rate(w) {
    var r = rateOne(w.main);
    for (var _iterator3 = _createForOfIteratorHelperLoose(w.maybe), _step3; !(_step3 = _iterator3()).done;) {
      var m = _step3.value;
      var x = rateOne(m.c);
      if (ORDER[x] > ORDER[r]) r = x === 'red' ? 'amber+' : x;
    }
    return r === 'amber+' ? 'amber' : r;
  }
  var visTxt = function visTxt(v) {
    return v == null ? '' : v >= 10000 ? '能见度 10 公里以上' : v >= 5000 ? '能见度 ' + Math.round(v / 1000) + ' 公里' : '能见度 ' + v + ' 米';
  };
  var visEn = function visEn(v) {
    return v == null ? '' : v >= 10000 ? 'vis 10 km+' : v >= 5000 ? 'vis ' + Math.round(v / 1000) + ' km' : 'vis ' + v + ' m';
  };
  function sayEn(c) {
    if (!c) return '';
    var p = [];
    if (c.wind) {
      var w = c.wind;
      p.push(w.spd <= 2 ? 'calm' : (w.dir == null ? 'VRB' : String(w.dir).padStart(3, '0') + '°') + '/' + w.spd + ' kt' + (w.gust ? ' G' + w.gust : ''));
    }
    if (c.cavok) p.push('CAVOK');else {
      if (c.vis != null) p.push(visEn(c.vis));
      if (c.wx && c.wx.length) p.push(c.wx.join(' '));
      if (c.ceil != null) p.push('ceiling ' + c.ceil + ' ft');else if (c.clouds && c.clouds.length) p.push('cloud ' + Math.min.apply(Math, c.clouds.map(function (x) {
        return x.h;
      })) + ' ft+, no ceiling');
      if (c.cb) p.push('CB');
    }
    if (c.temp != null) p.push(c.temp + '°C');
    if (c.qnh) p.push('QNH ' + c.qnh);
    return p.join(', ');
  }
  function sayOne(c, lang) {
    if (lang === 'en') return sayEn(c);
    if (!c) return '';
    var p = [];
    if (c.wind) {
      var w = c.wind;
      p.push(w.spd <= 2 ? '静风' : (w.dir == null ? '风向不定' : '风 ' + String(w.dir).padStart(3, '0') + '°') + ' ' + w.spd + ' 节' + (w.gust ? '，阵风 ' + w.gust : ''));
    }
    if (c.cavok) p.push('天气很好（CAVOK）');else {
      if (c.vis != null) p.push(visTxt(c.vis));
      if (c.wx && c.wx.length) p.push(c.wx.map(wxzh).join('、'));
      if (c.ceil != null) p.push('云底 ' + c.ceil + ' 英尺');else if (c.clouds && c.clouds.length) p.push('云高 ' + Math.min.apply(Math, c.clouds.map(function (x) {
        return x.h;
      })) + ' 英尺以上，不成云底');
      if (c.cb) p.push('有积雨云 CB');
    }
    if (c.temp != null) p.push(c.temp + '°C');
    if (c.qnh) p.push('QNH ' + c.qnh);
    return p.join('，');
  }
  var hhmmZ = function hhmmZ(t) {
    var d = new Date(t);
    return String(d.getUTCHours()).padStart(2, '0') + String(d.getUTCMinutes()).padStart(2, '0') + 'Z';
  };
  function say(w, lang) {
    var en = lang === 'en';
    var lines = [sayOne(w.main, lang)];
    w.maybe.forEach(function (m) {
      var diff = ['vis', 'ceil', 'wx', 'wind', 'cb'].some(function (k) {
        return JSON.stringify(m.c[k]) !== JSON.stringify(w.main[k]);
      });
      if (!diff) return;
      var when = m.g ? ' ' + hhmmZ(m.g.from) + '–' + hhmmZ(m.g.to) : '';
      lines.push(en ? 'Possible (' + (m.whyEn || m.why).trim() + when + '): ' + sayEn(m.c) : '可能（' + m.why.trim() + when + '）：' + sayOne(m.c));
    });
    return lines.filter(Boolean);
  }
  function runway(rwys, wind, closed, preferred) {
    if (!rwys || !rwys.length) return null;
    var ends = [];
    rwys.forEach(function (r) {
      var add = function add(id, hdg) {
        if (!id) return;
        if (hdg == null) hdg = (parseInt(id, 10) || 0) * 10;
        ends.push({
          id: id,
          hdg: hdg,
          len: r[4]
        });
      };
      add(r[0], r[1]);
      add(r[2], r[3]);
    });
    var open = ends.filter(function (e) {
      return !(closed || []).some(function (c) {
        return c === e.id;
      });
    });
    var allLimited = false;
    if (!open.length) {
      open = ends;
      allLimited = true;
    }
    if (!wind || wind.spd == null) return {
      pick: preferred && open.find(function (e) {
        return e.id === preferred;
      }) || open.slice().sort(function (a, b) {
        return b.len - a.len;
      })[0],
      all: open,
      note: '没有风的资料',
      allLimited: allLimited
    };
    var comp = function comp(e) {
      if (wind.dir == null) return {
        head: 0,
        cross: wind.spd,
        tail: 0
      };
      var a = (wind.dir - e.hdg) * Math.PI / 180,
        s = Math.max(wind.spd, wind.gust || 0);
      var head = Math.round(wind.spd * Math.cos(a)),
        cross = Math.round(Math.abs(s * Math.sin(a)));
      return {
        head: Math.max(0, head),
        tail: Math.max(0, -head),
        cross: cross
      };
    };
    open.forEach(function (e) {
      return Object.assign(e, comp(e));
    });
    var pick;
    if (wind.spd < 5 || wind.dir == null) pick = preferred && open.find(function (e) {
      return e.id === preferred;
    }) || open.sort(function (a, b) {
      return b.len - a.len;
    })[0];else pick = open.slice().sort(function (a, b) {
      return b.head - b.tail - (a.head - a.tail) || b.len - a.len;
    })[0];
    return {
      pick: pick,
      all: open,
      calm: wind.spd < 5,
      allLimited: allLimited
    };
  }
  var EN = {
    '机场关闭': 'Aerodrome closed',
    '燃油供应受限': 'Fuel limited',
    '有开放时间/宵禁限制': 'Operating hours / curfew',
    'GPS 可能受干扰': 'GPS interference possible',
    '公司规定：除紧急情况外不能用作备降': 'Not for diversion except emergency',
    '鸟情活动': 'Bird activity',
    '跑道/进近灯光部分不可用': 'Rwy/approach lights partly U/S',
    '下滑道 不可用': 'GP U/S',
    '航向道 不可用': 'LOC U/S',
    '二类运行不可用': 'CAT II not available',
    '三类运行不可用': 'CAT III not available'
  };
  function toEn(zh) {
    if (EN[zh]) return EN[zh];
    var m;
    if (m = /^跑道 (\S+) 关闭$/.exec(zh)) return 'RWY ' + m[1] + ' closed';
    if (m = /^跑道 (\S+) 不可用$/.exec(zh)) return 'RWY ' + m[1] + ' not available';
    if (m = /^快速脱离道 (\S+) 关闭$/.exec(zh)) return 'Rapid exit TWY ' + m[1] + ' closed';
    if (m = /^滑行道 (\S+) 关闭$/.exec(zh)) return 'TWY ' + m[1] + ' closed';
    if (m = /^ILS ?(\S*) 不可用$/.exec(zh)) return ('ILS ' + m[1]).trim() + ' U/S';
    if (m = /^消防等级降为 (\d+) 级$/.exec(zh)) return 'RFF reduced to CAT ' + m[1];
    if (m = /^(\S+) 不可用$/.exec(zh)) return m[1] + ' U/S';
    return zh;
  }
  var RULES = [[/\bAD\s+CLSD\b|AERODROME\s+CLOSED|AIRPORT\s+CLOSED/, 'red', function () {
    return '机场关闭';
  }], [/\bRWY\s*(\d{2}[LRC]?(?:\/\d{2}[LRC]?)?)\s+(?:IS\s+)?CLSD\b/, 'red', function (m) {
    return '跑道 ' + m[1] + ' 关闭';
  }], [/\bRWY\s*(\d{2}[LRC]?(?:\/\d{2}[LRC]?)?)\s+NOT\s+AVBL/, 'red', function (m) {
    return '跑道 ' + m[1] + ' 不可用';
  }], [/\bILS\b[^.]{0,40}?\b(?:RWY\s*)?(\d{2}[LRC]?)?[^.]{0,30}?\b(U\/S|NOT AVBL|UNSERVICEABLE|WITHDRAWN)/, 'amber', function (m) {
    return 'ILS' + (m[1] ? ' ' + m[1] : '') + ' 不可用';
  }], [/\b(LOC|GP|GS|GLIDE\s?PATH|LOCALIZER)\b[^.]{0,40}?\b(U\/S|NOT AVBL|UNSERVICEABLE)/, 'amber', function (m) {
    return (/G/.test(m[1]) ? '下滑道' : '航向道') + ' 不可用';
  }], [/\bCAT\s*(?:\(ROMAN\)\s*)?(II|III|IIIA|IIIB|2|3)\b[^.]{0,50}?\b(NOT AVBL|U\/S|SUSPENDED|NOT AUTH)/, 'amber', function (m) {
    return (/II|2/.test(m[1]) && !/III|3/.test(m[1]) ? '二类' : '三类') + '运行不可用';
  }], [/\b(PAPI|VASI)\b[^.]{0,30}?\b(U\/S|NOT AVBL)/, 'info', function (m) {
    return m[1] + ' 不可用';
  }], [/\b(ALS|APCH\s+LGT|APPROACH\s+LIGHT|RCLL|TDZ|HIRL|RWY\s+EDGE\s+LGT)\b[^.]{0,40}?\b(U\/S|NOT AVBL)/, 'amber', function (m) {
    return '跑道/进近灯光部分不可用';
  }], [/\b(VOR|DME|NDB)\b[^.]{0,30}?\b(U\/S|NOT AVBL)/, 'info', function (m) {
    return m[1] + ' 不可用';
  }], [/\b(RFF|RFFS|FIRE\s+FIGHTING|FIRE\s+CAT)\b[^.]{0,40}?\bCAT\s*(\d{1,2})/, 'amber', function (m) {
    return '消防等级降为 ' + m[2] + ' 级';
  }], [/\bFUEL\b[^.]{0,40}?\b(NOT AVBL|UNAVBL|NIL|SHORTAGE)/, 'amber', function () {
    return '燃油供应受限';
  }], [/\b(CURFEW|AD\s+HR|OPR\s+HR|HOURS\s+OF\s+OPERATION)\b/, 'amber', function () {
    return '有开放时间/宵禁限制';
  }], [/\b(GPS|GNSS)\b[^.]{0,60}?\b(INTERFERENCE|JAMMING|SPOOFING|U\/S|UNRELIABLE)/, 'amber', function () {
    return 'GPS 可能受干扰';
  }], [/\bDIVERSION\b[^.]{0,60}?\b(NOT|SHALL NOT|EXCEPT IN AN EMERGENCY)/, 'red', function () {
    return '公司规定：除紧急情况外不能用作备降';
  }], [/\b(?:RAPID\s+EXIT(?:\s+TWY|\s+TAXIWAY)?|RET)\s+([A-Z]{1,2}\d{0,2})\b[^.]{0,80}?\b(?:CLSD|NOT AVBL|U\/S)/, 'amber', function (m) {
    return '快速脱离道 ' + m[1] + ' 关闭';
  }], [/\b(?:RWY\s*\d{2}[LRC]?(?:\/\d{2}[LRC]?)?\s+)RET\s+([A-Z]{1,2}\d{0,2})\b[^.]{0,60}?\bCLSD/, 'amber', function (m) {
    return '快速脱离道 ' + m[1] + ' 关闭';
  }], [/\b(?:TWY|TAXIWAY)\s+([A-Z]{1,2}\d{0,2})\b[^.]{0,80}?\b(?:CLSD|NOT AVBL)/, 'info', function (m) {
    return '滑行道 ' + m[1] + ' 关闭';
  }], [/\bBIRD/, 'info', function () {
    return '鸟情活动';
  }]];
  var DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  function sched(text, t0, t1) {
    var T = ' ' + String(text || '').toUpperCase().replace(/\s+/g, ' ') + ' ';
    var re = /(?:\bFM\s*|\bFROM\s*|\bBTN\s*)?\b([01]\d|2[0-3])([0-5]\d)\s*(?:-|TO|AND)\s*([01]\d|2[0-4])([0-5]\d)\b/g;
    var m,
      found = false,
      any = false;
    while (m = re.exec(T)) {
      var near = T.slice(Math.max(0, m.index - 70), m.index + m[0].length + 50);
      if (!/\bDAILY\b|\bEVERY DAY\b|\bEV\b|\bEVERY\b|\b(MON|TUE|WED|THU|FRI|SAT|SUN)\b|\bH24\b/.test(near)) continue;
      found = true;
      var days = [0, 1, 2, 3, 4, 5, 6];
      var rg = /\b(MON|TUE|WED|THU|FRI|SAT|SUN)\s*(?:-|TO|THRU)\s*(MON|TUE|WED|THU|FRI|SAT|SUN)\b/.exec(near);
      if (rg) {
        days = [];
        for (var d = DAYS.indexOf(rg[1]);; d = (d + 1) % 7) {
          days.push(d);
          if (d === DAYS.indexOf(rg[2])) break;
        }
      } else if (!/\bDAILY\b|\bEVERY DAY\b/.test(near)) {
        var L = near.match(/\b(MON|TUE|WED|THU|FRI|SAT|SUN)\b/g);
        if (L) days = L.map(function (x) {
          return DAYS.indexOf(x);
        });
      }
      var s = +m[1] * 60 + +m[2],
        e = +m[3] * 60 + +m[4];
      for (var _d = Math.floor(t0 / 864e5) - 1; _d <= Math.floor(t1 / 864e5) + 1; _d++) {
        if (days.indexOf(new Date(_d * 864e5).getUTCDay()) < 0) continue;
        var a = _d * 864e5 + s * 6e4,
          b = _d * 864e5 + (e > s ? e : e + 1440) * 6e4;
        if (a <= t1 && b >= t0) any = true;
      }
    }
    return found ? any : null;
  }
  function notams(list, t) {
    var out = [],
      seen = {};
    (list || []).forEach(function (n) {
      var valid = (n.from == null || n.from <= t + 3 * 3600e3) && (n.to == null || n.to >= t - 3600e3);
      if (!valid) return;
      var tx = n.text;
      if (sched(tx, t - 3600e3, t + 3600e3) === false) return;
      for (var _iterator4 = _createForOfIteratorHelperLoose(RULES), _step4; !(_step4 = _iterator4()).done;) {
        var _step4$value = _step4.value,
          re = _step4$value[0],
          lv = _step4$value[1],
          fn = _step4$value[2];
        var m = null;
        var rg = new RegExp(re.source, re.flags.indexOf('g') < 0 ? re.flags + 'g' : re.flags);
        var mm = void 0;
        while (mm = rg.exec(tx)) {
          var nx = tx.slice(mm.index + 4).search(/\bRWY\s*\d{2}|\bTWY\b/),
            seg = tx.slice(mm.index, nx < 0 ? mm.index + 220 : mm.index + 4 + nx);
          if (sched(seg, t - 3600e3, t + 3600e3) !== false) {
            m = mm;
            break;
          }
          if (mm.index === rg.lastIndex) rg.lastIndex++;
        }
        if (!m) continue;
        if (re.source.indexOf('\\bRWY') === 0 && /\b(ON|TO|FM|FROM|VIA|ONTO|INTO|CROSSING)\s*$/.test(tx.slice(Math.max(0, m.index - 8), m.index))) continue;
        if (re.source.indexOf('\\bRWY') === 0 && /TAKE\s?OFF|TKOF/.test(tx.slice(Math.max(0, m.index - 16), m.index))) continue;
        if (re.source.indexOf('\\bRWY') === 0 && /\b(TWY|TAXIWAY|TAXILANE|RET|RAPID\s+EXIT|APRON|STAND|HOLDING\s+(?:POINT|POSITION)|HLDG\s+PSN)\b/.test(tx.slice(0, m.index))) continue;
        var zh = fn(m);
        var key = zh;
        if (seen[key]) {
          seen[key].ids.push(n.id);
          return;
        }
        var hasSch = /\b(MON|TUE|WED|THU|FRI|SAT|SUN|DAILY|\d{4}-\d{4})\b/.test(tx.slice(0, 60));
        var item = {
          lv: lv,
          zh: zh + (hasSch ? '（有时段）' : ''),
          en: toEn(zh) + (hasSch ? ' (scheduled)' : ''),
          ids: [n.id],
          raw: tx,
          cat: n.cat
        };
        seen[key] = item;
        out.push(item);
        return;
      }
    });
    var ord = {
      red: 0,
      amber: 1,
      info: 2
    };
    return out.sort(function (a, b) {
      return ord[a.lv] - ord[b.lv];
    });
  }
  function closedRwys(list, t) {
    var out = [];
    (list || []).forEach(function (n) {
      if (!((n.from == null || n.from <= t + 3600e3) && (n.to == null || n.to >= t))) return;
      if (sched(n.text, t - 3600e3, t + 3600e3) === false) return;
      var re = /\bRWY\s*(\d{2}[LRC]?)(?:\/(\d{2}[LRC]?))?\s+(?:IS\s+)?(?:CLSD|NOT\s+AVBL)/g;
      var m;
      while (m = re.exec(n.text)) {
        if (/\b(ON|TO|FM|FROM|VIA|ONTO|INTO)\s*$/.test(n.text.slice(Math.max(0, m.index - 8), m.index))) continue;
        if (/TAKE\s?OFF|TKOF|DEP(ARTURE)?S?\s*$/.test(n.text.slice(Math.max(0, m.index - 16), m.index))) continue;
        if (/\b(TWY|TAXIWAY|TAXILANE|RET|RAPID\s+EXIT|APRON|STAND)\b/.test(n.text.slice(0, m.index))) continue;
        {
          var nx = n.text.slice(m.index + 4).search(/\bRWY\s*\d{2}|\bTWY\b/),
            seg = n.text.slice(m.index, nx < 0 ? m.index + 220 : m.index + 4 + nx);
          if (sched(seg, t - 3600e3, t + 3600e3) === false) continue;
        }
        out.push(m[1]);
        if (m[2]) out.push(m[2]);
      }
    });
    return out;
  }
  function area(text) {
    var T = String(text || '').toUpperCase(),
      pts = [];
    var re = /\b(\d{2})(\d{2})(\d{2}(?:\.\d+)?)?\s?([NS])\s?(\d{3})(\d{2})(\d{2}(?:\.\d+)?)?\s?([EW])\b/g;
    var m;
    while (m = re.exec(T)) {
      var la = (+m[1] + +m[2] / 60 + (m[3] ? +m[3] / 3600 : 0)) * (m[4] === 'S' ? -1 : 1),
        lo = (+m[5] + +m[6] / 60 + (m[7] ? +m[7] / 3600 : 0)) * (m[8] === 'W' ? -1 : 1);
      if (Math.abs(la) <= 90 && Math.abs(lo) <= 180) pts.push({
        p: [la, lo],
        i: m.index
      });
    }
    if (!pts.length) return null;
    var rad = /RADIUS\s+(?:OF\s+)?(\d+(?:\.\d+)?)\s*(NM|KM)\b/.exec(T) || /(\d+(?:\.\d+)?)\s*(NM|KM)\s+RADIUS/.exec(T);
    if (rad && pts.length <= 2) return {
      c: pts[0].p,
      r: +rad[1] * (rad[2] === 'KM' ? 0.54 : 1)
    };
    if (pts.length >= 3) {
      var poly = pts.map(function (x) {
        return x.p;
      });
      return {
        poly: poly
      };
    }
    return {
      pt: pts[0].p
    };
  }
  root.WX = {
    metar: metar,
    taf: taf,
    at: at,
    rate: rate,
    say: say,
    sayOne: sayOne,
    runway: runway,
    notams: notams,
    closedRwys: closedRwys,
    hhmmZ: hhmmZ,
    wxzh: wxzh,
    sched: sched,
    area: area
  };
  if (typeof module !== 'undefined') module.exports = root.WX;
})(typeof window !== 'undefined' ? window : globalThis);