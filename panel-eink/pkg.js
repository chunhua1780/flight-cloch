'use strict';

function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? (c > 1 && (G.n = c < 3 ? -1 : u), d(c, u)) : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var PKG_TOOLS = ['FCI / FCN', 'OM-C Area Brief', 'LIDO mBriefing', 'LIDO RSI', 'LIDO mPilot', 'LIDO CRAR', 'CCI / AOI', 'NOAA Space WX', 'ASR', 'Layover Brief', 'Flight Pulse'];
function pkgNotam(L, loc, n) {
  var sm = trName(L, 's:' + n[0]),
    zh = trName(L, n[0]);
  return '<li><b>' + esc(n[0]) + '</b> ' + (sm ? '💡 ' + esc(sm) : zh ? esc(zh) : '<span class="en">' + esc(n[1].slice(0, 300)) + '</span>') + '<span class="tm"> ' + (n[2] ? dmZ(n[2]) : '') + '–' + (n[3] ? dmZ(n[3]) : 'PERM') + '</span></li>';
}
function pkgNotams(L, loc, max) {
  var A = L.nt[loc] || [];
  if (!A.length) return '<p class="tm">' + XS('没有通告', 'No NOTAMs') + '</p>';
  return '<ol class="nl">' + A.slice(0, max || 60).map(function (n) {
    return pkgNotam(L, loc, n);
  }).join('') + '</ol>' + (A.length > (max || 60) ? '<p class="tm">… ' + (A.length - (max || 60)) + XS(' 条没列出（在 Panel 上看全部）', ' more') + '</p>' : '');
}
var pkgRisk = function pkgRisk(list) {
  return (list || []).map(function (x) {
    return '<li class="' + (x.lv === 'red' ? 'r' : '') + '">' + (x.lv === 'red' ? '⛔ ' : '⚠ ') + esc(LANG === 'en' ? x.en : x.zh) + '</li>';
  }).join('');
};
function pkgWx(L, icao) {
  var w = L.wx && L.wx[icao];
  if (!w || !w.m && !w.t) return '';
  return '<pre>' + esc((w.m ? 'METAR ' + w.m + '\n' : '') + (w.t ? 'TAF ' + w.t : '')) + '</pre>';
}
function pkgFi(x) {
  return '<div class="fi ' + esc(x.level || '') + '"><b>' + esc(x.name) + '</b> — ' + esc(x.msg || x.msgEn || '') + actList(x) + (x.notes ? '<div class="tm">' + esc(x.notes) + '</div>' : '') + '</div>';
}
function pkgHtml(L) {
  var off = offOf(L),
    eta = off + L.tr * MIN,
    now = Date.now(),
    FI = L.fi || [];
  var items = (FIDB && FIDB.items || []).filter(function (x) {
    return x.kind !== 'wpt' && fiUsable(x, now);
  });
  var procs = items.filter(function (x) {
    return x.kind === 'proc' && x.trigger !== 'timeline' && typeof x.trigger === 'object' && procMatch(x.trigger, L);
  });
  var h = '<!doctype html><html><head><meta charset="utf-8"><title>' + esc(L.no + ' ' + L.ai + '-' + L.bi) + ' Brief</title><style>' + 'body{font:12.5px/1.45 "Noto Sans SC","PingFang SC","Microsoft YaHei",Arial,sans-serif;color:#000;margin:18px}h1{font-size:22px;margin:0 0 4px}h2{font-size:16px;border-bottom:2px solid #000;margin:16px 0 6px;padding-bottom:2px}h3{font-size:13.5px;margin:10px 0 4px}' + 'table{border-collapse:collapse;width:100%}td,th{border:1px solid #999;padding:3px 6px;text-align:left;vertical-align:top}th{background:#eee}.tm{color:#555;font-size:11px}.en{color:#333;font-family:Menlo,monospace;font-size:11px}' + 'pre{white-space:pre-wrap;font:11px/1.35 Menlo,monospace;background:#f4f4f4;padding:4px 6px;margin:4px 0}ol.nl{margin:2px 0 6px 18px;padding:0}ol.nl li{margin:2px 0}li.r{color:#c00;font-weight:700}' + '.fi{border-left:4px solid #000;padding:2px 8px;margin:4px 0}.fi.warning{border-color:#c00}.acts{margin:2px 0 2px 18px;padding:0}.chk{display:inline-block;width:12px;height:12px;border:1.5px solid #000;margin-right:6px;vertical-align:-2px}' + '.disc{font-size:10.5px;color:#555;border-top:1px solid #999;margin-top:18px;padding-top:6px}</style></head><body>';
  h += '<h1>📑 ' + esc(L.no) + ' · ' + esc(L.ai) + ' → ' + esc(L.bi) + ' <span class="tm">' + XS('飞行准备简报包', 'Flight preparation package') + ' · ' + XS('生成 ', 'generated ') + dmZ(now) + '</span></h1>' + '<table><tr><th>' + XS('航班号', 'Flight') + '</th><td>' + esc(L.no) + '</td><th>' + XS('呼号', 'Callsign') + '</th><td>' + esc(csOf(L)) + '</td><th>' + XS('注册号', 'Registration') + '</th><td>' + esc(L.reg || '') + '</td><th>' + XS('机型', 'Type') + '</th><td>' + esc(L.ty || '') + '</td></tr>' + '<tr><th>DEP</th><td>' + esc(L.dep) + ' / ' + esc(L.ai) + '</td><th>ARR</th><td>' + esc(L.arr) + ' / ' + esc(L.bi) + '</td><th>ALTN</th><td colspan="3">' + esc((L.alt || []).join(' · ')) + '</td></tr>' + '<tr><th>STD</th><td>' + dmZ(L.std) + '</td><th>ETD (off)</th><td>' + dmZ(off) + '</td><th>ETA</th><td>' + dmZ(eta) + '</td><th>' + XS('飞行时间', 'Trip') + '</th><td>' + dur(L.tr) + '</td></tr>' + '<tr><th>COMP FREQ</th><td colspan="7">&nbsp;</td></tr></table>';
  var TL = typeof tlItems === 'function' ? tlItems(L) : [];
  if (TL.length) h += '<h2>⏱ ' + XS('起飞前时间轴', 'Pre-departure timeline') + '</h2><table><tr><th>UTC</th><th>STD −</th><th>' + XS('事项', 'Item') + '</th></tr>' + TL.map(function (s) {
    return '<tr><td>' + hmZ(s.t) + 'Z</td><td>' + s.min + '</td><td><span class="chk"></span>' + esc(s.zh) + (s.en && s.en !== s.zh ? ' · ' + esc(s.en) : '') + '</td></tr>';
  }).join('') + '</table>';
  if (L.w) h += '<h2>⚖ ' + XS('重量 / 油量', 'Weights / fuel') + '</h2><table><tr><th>TOW</th><td>' + T(L.w.tow) + ' / ' + T(L.w.towL) + ' t (' + XS('余量 ', 'margin ') + T(L.w.towL - L.w.tow) + ')</td><th>LDW</th><td>' + T(L.w.ldw) + ' / ' + T(L.w.lwL) + ' t (' + XS('余量 ', 'margin ') + T(L.w.lwL - L.w.ldw) + ')</td><th>' + XS('落地油', 'LDG fuel') + '</th><td>' + T(L.w.lf) + ' t</td></tr></table>';
  h += '<h2>🛫 ' + XS('起飞', 'Departure') + ' · ' + esc(L.dep) + '</h2><p class="tm">Pre-flight（MEL/CDL, Bulletins, Pax/Cabin）· Taxi（closures, speed limits）· Take-off（performance, NADP）· Departure（SID, climb out）</p>';
  var rp = typeof routePrep === 'function' ? routePrep(L) : [];
  if (rp.length) h += '<h3>🧭 ' + XS('航路经过的特殊空域：起飞前准备（MEL / 设备）', 'Special airspace on route: before departure') + '</h3>' + rp.map(function (x) {
    return '<div class="fi ' + esc(x.level) + '"><b>' + esc(x.fir) + ' · ' + esc(x.name) + '</b>' + actList({
      actions: x.preflight
    }) + '</div>';
  }).join('');
  procs.filter(function (x) {
    return (x.phases || []).some(function (p) {
      return p.key === 'dep';
    });
  }).forEach(function (x) {
    var p = x.phases.find(function (q) {
      return q.key === 'dep';
    });
    h += pkgFi(Object.assign({}, x, {
      actions: p.steps
    }));
  });
  if ((L.R && L.R.dep || []).length) h += '<h3>⚠ ' + XS('起飞提醒（OFP）', 'Departure warnings (OFP)') + '</h3><ul>' + pkgRisk(L.R.dep) + '</ul>';
  h += pkgWx(L, L.dep) + '<h3>NOTAM ' + esc(L.dep) + '</h3>' + pkgNotams(L, L.dep, 40);
  h += '<h2>✈ ' + XS('航路（按 FIR 顺序）', 'En route (by FIR)') + '</h2><p class="tm">CRAR · Reporting · ADIZ · CPDLC · HF · IFBP · Oceanic · SLOP · Contingency · Emergency</p>';
  FI.forEach(function (f) {
    var code = FIRALIAS[f[1]] || f[1];
    h += '<h3>' + hmZ(off + f[3] * MIN) + 'Z · ' + esc(f[1]) + ' ' + esc(f[0]) + ' <span class="tm">' + XS('入口 ', 'entry ') + esc(f[2]) + '</span></h3>';
    items.filter(function (x) {
      return x.kind === 'area' && (x.fir === f[1] || x.fir === code);
    }).forEach(function (x) {
      return h += pkgFi(x);
    });
    (typeof wacCountry === 'function' ? wacCountry(code) : []).forEach(function (c) {
      var tp = (c.t || []).filter(function (t) {
        return t.x;
      });
      if (tp.length) h += '<div class="fi"><b>🌐 ' + esc(c.n) + ' contingency</b>' + tp.map(function (t) {
        return '<div><b>' + esc(t.h) + ':</b> <span class="tm">' + esc(t.x.slice(0, 600)) + '</span></div>';
      }).join('') + '</div>';
    });
    var enr = (L.R && L.R.enr || []).filter(function (r) {
      return r[2].loc === code;
    }).map(function (r) {
      return r[2];
    });
    if (enr.length) h += '<ul>' + pkgRisk(enr) + '</ul>';
    if ((L.nt[code] || []).length) h += '<details open><summary class="tm">NOTAM ' + esc(code) + ' · ' + L.nt[code].length + '</summary>' + pkgNotams(L, code, 25) + '</details>';
  });
  h += '<h2>🛬 ' + XS('到达', 'Arrival') + ' · ' + esc(L.arr) + '</h2><p class="tm">Arrival（STAR）· Approach（FAF ALT, RoD）· Missed approach · Landing（LDA, braking & exit）· Taxi / parking · Post-flight</p>';
  procs.filter(function (x) {
    return (x.phases || []).some(function (p) {
      return p.key === 'dest' || p.key === 'arr';
    });
  }).forEach(function (x) {
    var p = x.phases.find(function (q) {
      return q.key === 'dest' || q.key === 'arr';
    });
    h += pkgFi(Object.assign({}, x, {
      actions: p.steps
    }));
  });
  if ((L.R && L.R.arr || []).length) h += '<ul>' + pkgRisk(L.R.arr) + '</ul>';
  h += pkgWx(L, L.arr) + '<h3>NOTAM ' + esc(L.arr) + '</h3>' + pkgNotams(L, L.arr, 40);
  (L.alt || []).forEach(function (a) {
    h += '<h2>↪ ' + XS('备降 ', 'Alternate ') + esc(a) + '</h2><p class="tm">Diversion（fuel, route, wx）· Approach minima · Landing performance · Ramp</p>' + pkgWx(L, a) + pkgNotams(L, a, 20);
  });
  h += '<h2>🧰 ' + XS('航路机场：能不能用（CAN WE）', 'En-route airports: CAN WE') + '</h2><p>' + ['Can we get there (range)', 'Do the approach and landing (wx vs minima)', 'Stop (most limiting LDA vs LDR)', 'Turn-around (ground ops)', 'Go-around (performance)', 'Plan B'].map(function (t) {
    return '<span class="chk"></span>' + esc(t);
  }).join('<br>') + '</p>';
  h += '<h2>📚 ' + XS('参考工具（逐项打勾）', 'Reference tools') + '</h2><p>' + PKG_TOOLS.map(function (t) {
    return '<span class="chk"></span>' + esc(t);
  }).join('　') + '</p>';
  h += '<div class="disc">' + XS('仅供辅助了解情况，不能替代官方航行情报、公司运行程序（OM / LIDO）及 ATC 指令。通告要点由 AI 翻译整理，以原文为准。', 'Awareness aid only — official AIS, company procedures and ATC prevail. AI summaries — the original NOTAM text prevails.') + '</div></body></html>';
  return h;
}
function openPkg() {
  var L = CUR;
  if (!L || L.noOfp) {
    MSG = XS('先读入 OFP', 'Load an OFP first');
    draw();
    return;
  }
  var sh = $('sheet');
  sh.style.display = 'block';
  sh.scrollTop = 0;
  sh.innerHTML = '<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap"><b style="font-size:16px">📑 ' + XS('简报包', 'Briefing package') + '</b><span style="flex:1"></span><span class="btn" id="pk-pdf">☁️ PDF</span><span class="btn" id="sh-x">✕</span></div><div id="pk-st" class="ok"></div><iframe id="pk-f" style="width:100%;height:calc(100vh - 90px);border:1px solid #999;background:#fff"></iframe>';
  $('pk-f').srcdoc = pkgHtml(L);
  $('sh-x').onclick = function () {
    sh.style.display = 'none';
    draw();
  };
  $('pk-pdf').onclick = _asyncToGenerator(_regenerator().m(function _callee() {
    var r;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          $('pk-st').textContent = '⏳ ' + XS('后台生成 PDF…', 'Making the PDF…');
          _context.n = 1;
          return pkgUpload(L, true);
        case 1:
          r = _context.v;
          $('pk-st').textContent = r ? '✅ ' + XS('PDF 已存到云端（iPad：工具 → 📑 简报包）', 'PDF saved to the cloud') : '⚠️ ' + XS('没成功（要联网）', 'Failed (needs network)');
        case 2:
          return _context.a(2);
      }
    }, _callee);
  }));
}
function pkgUpload(_x, _x2) {
  return _pkgUpload.apply(this, arguments);
}
function _pkgUpload() {
  _pkgUpload = _asyncToGenerator(_regenerator().m(function _callee2(L, force) {
    var k, j, _t;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          if (!(!navigator.onLine || !ls('key'))) {
            _context2.n = 1;
            break;
          }
          return _context2.a(2, false);
        case 1:
          k = String(L.k).replace(/[^\w.-]/g, '');
          if (!(!force && ls('pkg.' + k))) {
            _context2.n = 2;
            break;
          }
          return _context2.a(2, true);
        case 2:
          _context2.p = 2;
          _context2.n = 3;
          return postK({
            action: 'pkgpdf',
            k: k,
            html: pkgHtml(L)
          });
        case 3:
          j = _context2.v;
          if (!(j && j.ok)) {
            _context2.n = 4;
            break;
          }
          ls('pkg.' + k, String(Date.now()));
          return _context2.a(2, true);
        case 4:
          _context2.n = 6;
          break;
        case 5:
          _context2.p = 5;
          _t = _context2.v;
        case 6:
          return _context2.a(2, false);
      }
    }, _callee2, null, [[2, 5]]);
  }));
  return _pkgUpload.apply(this, arguments);
}
function pkgAuto(L, now) {
  if (!L || L.noOfp || DEMO) return;
  var k = String(L.k).replace(/[^\w.-]/g, '');
  if (ls('pkg.' + k)) return;
  if (now < L.std - 150 * MIN || now > L.std) return;
  if (pkgAuto.busy) return;
  pkgAuto.busy = 1;
  pkgUpload(L, false).then(function () {
    pkgAuto.busy = 0;
  });
}