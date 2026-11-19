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
function pkgSections(L) {
  var off = offOf(L),
    now = Date.now(),
    FI = L.fi || [],
    items = (FIDB && FIDB.items || []).filter(function (x) {
      return x.kind !== 'wpt' && fiUsable(x, now);
    });
  var procs = items.filter(function (x) {
    return x.kind === 'proc' && x.trigger !== 'timeline' && typeof x.trigger === 'object' && procMatch(x.trigger, L);
  });
  var ntTxt = function ntTxt(loc) {
    return (L.nt[loc] || []).map(function (n) {
      return 'NOTAM ' + n[0] + ' (' + (n[2] ? dmZ(n[2]) : '') + '–' + (n[3] ? dmZ(n[3]) : 'PERM') + '): ' + n[1];
    }).join('\n');
  };
  var wxTxt = function wxTxt(icao) {
    var w = L.wx && L.wx[icao];
    return w ? (w.m ? 'METAR ' + w.m + '\n' : '') + (w.t ? 'TAF ' + w.t + '\n' : '') : '';
  };
  var fiTxt = function fiTxt(x) {
    return '公司规定 / Rule ' + x.name + ': ' + (x.msg || x.msgEn || '') + ' ' + (x.actions || []).map(function (a) {
      return a.zh || a.en;
    }).join('; ') + (x.notes ? ' ' + x.notes : '');
  };
  var rk = function rk(list) {
      return (list || []).map(function (x) {
        return 'OFP 提醒: ' + (x.en || x.zh);
      }).join('\n');
    },
    S = [];
  var rp = typeof routePrep === 'function' ? routePrep(L) : [],
    pd = procs.filter(function (x) {
      return (x.phases || []).some(function (p) {
        return p.key === 'dep';
      });
    });
  S.push({
    id: 'dep',
    title: '🛫 ' + XS('起飞', 'Departure') + ' · ' + L.dep,
    when: dmZ(off),
    text: [rk(L.R && L.R.dep), rp.map(function (x) {
      return '起飞前准备 ' + x.fir + ' ' + x.name + ': ' + x.preflight.map(function (a) {
        return a.zh;
      }).join('; ');
    }).join('\n'), pd.map(function (x) {
      return fiTxt(Object.assign({}, x, {
        actions: x.phases.find(function (p) {
          return p.key === 'dep';
        }).steps
      }));
    }).join('\n'), wxTxt(L.dep), ntTxt(L.dep)].filter(Boolean).join('\n'),
    raw: (rp.length ? '<h3>🧭 ' + XS('航路经过的特殊空域：起飞前准备', 'Special airspace: before departure') + '</h3>' + rp.map(function (x) {
      return '<div class="fi ' + esc(x.level) + '"><b>' + esc(x.fir) + ' · ' + esc(x.name) + '</b>' + actList({
        actions: x.preflight
      }) + '</div>';
    }).join('') : '') + pd.map(function (x) {
      return pkgFi(Object.assign({}, x, {
        actions: x.phases.find(function (p) {
          return p.key === 'dep';
        }).steps
      }));
    }).join('') + ((L.R && L.R.dep || []).length ? '<ul>' + pkgRisk(L.R.dep) + '</ul>' : '') + pkgWx(L, L.dep) + '<h3>NOTAM ' + esc(L.dep) + '</h3>' + pkgNotams(L, L.dep, 60)
  });
  FI.forEach(function (f) {
    var code = FIRALIAS[f[1]] || f[1],
      fx = items.filter(function (x) {
        return x.kind === 'area' && (x.fir === f[1] || x.fir === code || (x.firs || []).some(function (c) {
          return c === f[1] || (FIRALIAS[c] || c) === code;
        }));
      });
    var wc = typeof wacCountry === 'function' ? wacCountry(code) : [],
      enr = (L.R && L.R.enr || []).filter(function (r) {
        return r[2].loc === code;
      }).map(function (r) {
        return r[2];
      });
    var rl = items.filter(function (x) {
      return x.kind === 'rule' && x.where && (x.where.fir === f[1] || x.where.fir === code || (x.where.firs || []).some(function (c) {
        return c === f[1] || c === code;
      }));
    });
    var rlTxt = rl.map(function (x) {
      return '提醒规则 ' + x.name + ': ' + x.steps.map(function (s0) {
        return (RULE_PH[s0.when] || s0.when) + (s0.min ? ' ' + s0.min + ' 分钟' : '') + ' → ' + (s0.zh || s0.en) + ((s0.do || []).length ? '（' + s0.do.map(function (d) {
          return d.zh || d.en;
        }).join('；') + '）' : '');
      }).join('；');
    }).join('\n');
    var rlHtml = rl.map(function (x) {
      return '<div class="fi ' + esc(x.level) + '"><b>' + esc(x.name) + '</b><ol class="acts">' + x.steps.map(function (s0) {
        return '<li><b>' + esc(RULE_PH[s0.when] || s0.when) + (s0.min ? ' ' + s0.min + ' min' : s0.nm ? ' ' + s0.nm + ' NM' : '') + '：</b>' + esc(s0.zh || s0.en) + ((s0.do || []).length ? '<br><span class="tm">' + s0.do.map(function (d) {
          return esc(d.zh || d.en);
        }).join(' · ') + '</span>' : '') + '</li>';
      }).join('') + '</ol></div>';
    }).join('');
    S.push({
      id: 'fir:' + f[1] + ':' + f[2],
      title: hmZ(off + f[3] * MIN) + 'Z · ' + f[1] + ' ' + f[0],
      when: hmZ(off + f[3] * MIN) + 'Z（入口 ' + f[2] + '）',
      text: [rlTxt, fx.map(fiTxt).join('\n'), wc.map(function (c) {
        return (c.t || []).filter(function (t) {
          return t.x;
        }).map(function (t) {
          return '应急程序 ' + c.n + ' ' + t.h + ': ' + t.x.slice(0, 1500);
        }).join('\n');
      }).join('\n'), rk(enr), ntTxt(code)].filter(Boolean).join('\n'),
      raw: rlHtml + fx.map(pkgFi).join('') + wc.map(function (c) {
        var tp = (c.t || []).filter(function (t) {
          return t.x;
        });
        return tp.length ? '<div class="fi"><b>🌐 ' + esc(c.n) + ' contingency</b>' + tp.map(function (t) {
          return '<div><b>' + esc(t.h) + ':</b> <span class="tm">' + esc(t.x.slice(0, 600)) + '</span></div>';
        }).join('') + '</div>' : '';
      }).join('') + (enr.length ? '<ul>' + pkgRisk(enr) + '</ul>' : '') + ((L.nt[code] || []).length ? '<h3 class="tm">NOTAM ' + esc(code) + ' · ' + L.nt[code].length + '</h3>' + pkgNotams(L, code, 40) : '')
    });
  });
  var pa = procs.filter(function (x) {
    return (x.phases || []).some(function (p) {
      return p.key === 'dest' || p.key === 'arr';
    });
  });
  S.push({
    id: 'arr',
    title: '🛬 ' + XS('到达', 'Arrival') + ' · ' + L.arr,
    when: dmZ(off + L.tr * MIN),
    text: [rk(L.R && L.R.arr), pa.map(function (x) {
      return fiTxt(Object.assign({}, x, {
        actions: x.phases.find(function (p) {
          return p.key === 'dest' || p.key === 'arr';
        }).steps
      }));
    }).join('\n'), wxTxt(L.arr), ntTxt(L.arr)].filter(Boolean).join('\n'),
    raw: pa.map(function (x) {
      return pkgFi(Object.assign({}, x, {
        actions: x.phases.find(function (p) {
          return p.key === 'dest' || p.key === 'arr';
        }).steps
      }));
    }).join('') + ((L.R && L.R.arr || []).length ? '<ul>' + pkgRisk(L.R.arr) + '</ul>' : '') + pkgWx(L, L.arr) + '<h3>NOTAM ' + esc(L.arr) + '</h3>' + pkgNotams(L, L.arr, 60)
  });
  (L.alt || []).forEach(function (a) {
    return S.push({
      id: 'alt:' + a,
      title: '↪ ' + XS('备降 ', 'Alternate ') + a,
      when: '',
      text: [wxTxt(a), ntTxt(a)].filter(Boolean).join('\n'),
      raw: pkgWx(L, a) + pkgNotams(L, a, 30)
    });
  });
  return S;
}
var pkgAiGet = function pkgAiGet(L) {
  try {
    return JSON.parse(ls('pkgai.' + String(L.k).replace(/[^\w.-]/g, '')) || 'null');
  } catch (e) {
    return null;
  }
};
function pkgAiRun(_x) {
  return _pkgAiRun.apply(this, arguments);
}
function _pkgAiRun() {
  _pkgAiRun = _asyncToGenerator(_regenerator().m(function _callee3(L) {
    var S, off, j, old;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          S = pkgSections(L), off = offOf(L);
          _context3.n = 1;
          return postK({
            action: 'pkgai',
            flight: {
              no: L.no,
              dep: L.dep,
              arr: L.arr,
              off: dmZ(off),
              eta: dmZ(off + L.tr * MIN)
            },
            secs: S.filter(function (x) {
              return x.text.trim();
            }).map(function (x) {
              return {
                id: x.id,
                title: x.title,
                when: x.when,
                text: x.text
              };
            })
          });
        case 1:
          j = _context3.v;
          if (!(!j || !j.ok)) {
            _context3.n = 2;
            break;
          }
          throw new Error(j && j.error || 'AI');
        case 2:
          old = pkgAiGet(L);
          if (old && old.secs) Object.keys(old.secs).forEach(function (id) {
            if ((!j.secs[id] || !j.secs[id].points.length) && old.secs[id].points.length) j.secs[id] = old.secs[id];
          });
          ls('pkgai.' + String(L.k).replace(/[^\w.-]/g, ''), JSON.stringify(j));
          return _context3.a(2, j);
      }
    }, _callee3);
  }));
  return _pkgAiRun.apply(this, arguments);
}
function pkgHtml(L, simple) {
  var off = offOf(L),
    eta = off + L.tr * MIN,
    now = Date.now(),
    AI = pkgAiGet(L),
    S = pkgSections(L);
  var h = '<!doctype html><html><head><meta charset="utf-8"><title>' + esc(L.no + ' ' + L.ai + '-' + L.bi) + ' Brief</title><style>' + 'body{font:12.5px/1.5 "Noto Sans SC","PingFang SC","Microsoft YaHei",Arial,sans-serif;color:#000;margin:18px}h1{font-size:22px;margin:0 0 4px}h2{font-size:16px;border-bottom:2px solid #000;margin:16px 0 6px;padding-bottom:2px}h3{font-size:13.5px;margin:10px 0 4px}' + 'table{border-collapse:collapse;width:100%}td,th{border:1px solid #999;padding:3px 6px;text-align:left;vertical-align:top}th{background:#eee}.tm{color:#555;font-size:11px}.en{color:#333;font-family:Menlo,monospace;font-size:11px}' + 'pre{white-space:pre-wrap;font:11px/1.35 Menlo,monospace;background:#f4f4f4;padding:4px 6px;margin:4px 0}ol.nl{margin:2px 0 6px 18px;padding:0}ol.nl li{margin:2px 0}li.r{color:#c00;font-weight:700}' + '.fi{border-left:4px solid #000;padding:2px 8px;margin:4px 0}.fi.warning{border-color:#c00}.acts{margin:2px 0 2px 18px;padding:0}.chk{display:inline-block;width:12px;height:12px;border:1.5px solid #000;margin-right:6px;vertical-align:-2px}' + 'ul.ai{list-style:none;margin:4px 0 8px;padding:0}ul.ai li{padding:3px 0 3px 22px;position:relative;font-size:14px;line-height:1.45;border-bottom:1px dotted #ccc}ul.ai li:before{position:absolute;left:2px;top:3px}' + 'ul.ai li.red{color:#b00000;font-weight:800}ul.ai li.red:before{content:"⛔"}ul.ai li.amber{font-weight:700}ul.ai li.amber:before{content:"⚠️"}ul.ai li.info:before{content:"•";font-weight:900}' + '.app{font-size:11px}.app h2{font-size:13px}.app ol.nl li{margin:1px 0}.disc{font-size:10.5px;color:#555;border-top:1px solid #999;margin-top:18px;padding-top:6px}</style></head><body>';
  h += '<h1>📑 ' + esc(L.no) + ' · ' + esc(L.ai) + ' → ' + esc(L.bi) + ' <span class="tm">' + XS('飞行准备简报（完整版）', 'Flight preparation brief (full)') + ' · ' + XS('生成 ', 'generated ') + dmZ(now) + (AI ? ' · 🤖 ' + XS('AI 整理 ', 'AI ') + dmZ(AI.t) : '') + '</span></h1>' + '<table><tr><th>' + XS('航班号', 'Flight') + '</th><td>' + esc(L.no) + '</td><th>' + XS('呼号', 'Callsign') + '</th><td>' + esc(csOf(L)) + '</td><th>' + XS('注册号', 'Registration') + '</th><td>' + esc(L.reg || '') + '</td><th>' + XS('机型', 'Type') + '</th><td>' + esc(L.ty || '') + '</td></tr>' + '<tr><th>DEP</th><td>' + esc(L.dep) + ' / ' + esc(L.ai) + '</td><th>ARR</th><td>' + esc(L.arr) + ' / ' + esc(L.bi) + '</td><th>ALTN</th><td colspan="3">' + esc((L.alt || []).join(' · ')) + '</td></tr>' + '<tr><th>STD</th><td>' + dmZ(L.std) + '</td><th>ETD (off)</th><td>' + dmZ(off) + '</td><th>ETA</th><td>' + dmZ(eta) + '</td><th>' + XS('飞行时间', 'Trip') + '</th><td>' + dur(L.tr) + '</td></tr>' + '<tr><th>COMP FREQ</th><td colspan="7">&nbsp;</td></tr></table>';
  var TL = typeof tlItems === 'function' ? tlItems(L) : [];
  if (TL.length) h += '<h2>⏱ ' + XS('起飞前时间轴', 'Pre-departure timeline') + '</h2><table><tr><th>UTC</th><th>STD −</th><th>' + XS('事项', 'Item') + '</th></tr>' + TL.map(function (s) {
    return '<tr><td>' + hmZ(s.t) + 'Z</td><td>' + s.min + '</td><td><span class="chk"></span>' + esc(s.zh) + (s.en && s.en !== s.zh ? ' · ' + esc(s.en) : '') + '</td></tr>';
  }).join('') + '</table>';
  if (L.w) {
    var w = typeof wFix === 'function' && wFix(L) || L.w,
      z = typeof zfwOf === 'function' && zfwOf(L) || w.z;
    h += '<h2>⚖ ' + XS('重量 / 油量', 'Weights / fuel') + '</h2><table><tr><th>ZFW</th><td>' + (z ? T(z) + ' t' : '') + '</td><th>TOW</th><td>' + T(z ? z + w.tof : w.tow) + ' / ' + T(w.towL) + ' t</td><th>LDW</th><td>' + T(z ? z + w.lf : w.ldw) + ' / ' + T(w.lwL) + ' t</td><th>' + XS('落地油', 'LDG fuel') + '</th><td>' + T(w.lf) + ' t</td></tr></table>';
  }
  h += '<p class="tm">TEM：Pre-flight（MEL/CDL, Bulletins, Pax）· Taxi · Take-off（performance, NADP）· Departure · En route（CRAR, Reporting, ADIZ, CPDLC, HF, IFBP, Oceanic, SLOP, Contingency）· Arrival · Approach · Missed approach · Landing · Taxi/Parking · Alternate</p>';
  S.forEach(function (x) {
    var a = AI && AI.secs && AI.secs[x.id];
    h += '<h2>' + esc(x.title) + '</h2>' + (a ? a.points.length ? '<ul class="ai">' + a.points.map(function (p) {
      return '<li class="' + esc(p.lv) + '">' + esc(p.t) + '</li>';
    }).join('') + '</ul>' : '<p class="tm">✓ ' + XS('没有需要特别注意的', 'Nothing significant') + '</p>' : x.raw);
  });
  h += '<h2>🧰 ' + XS('航路机场：CAN WE', 'En-route airports: CAN WE') + '</h2><p>' + ['Can we get there (range)', 'Do the approach and landing (wx vs minima)', 'Stop (most limiting LDA vs LDR)', 'Turn-around (ground ops)', 'Go-around (performance)', 'Plan B'].map(function (t) {
    return '<span class="chk"></span>' + esc(t);
  }).join('<br>') + '</p>';
  h += '<h2>📚 ' + XS('参考工具（逐项打勾）', 'Reference tools') + '</h2><p>' + PKG_TOOLS.map(function (t) {
    return '<span class="chk"></span>' + esc(t);
  }).join('　') + '</p>';
  if (AI) h += '<div class="app"><h2>📎 ' + XS('附录：原文（核对用）', 'Appendix: original text') + '</h2>' + S.map(function (x) {
    return '<h3>' + esc(x.title) + '</h3>' + x.raw;
  }).join('') + '</div>';
  h += '<div class="disc">' + XS('仅供辅助了解情况，不能替代官方航行情报、公司运行程序（OM / LIDO）及 ATC 指令。要点由 AI 整理，代号和数字已和原文核对，仍以原文为准。', 'Awareness aid only. AI summaries — the original text prevails.') + '</div></body></html>';
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
  sh.innerHTML = '<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap"><b style="font-size:16px">📑 ' + XS('简报包', 'Briefing package') + '</b><span style="flex:1"></span><span class="btn" id="pk-ai">🤖 ' + XS('AI 整理', 'AI rewrite') + '</span><span class="btn" id="pk-pdf">☁️ PDF</span><span class="btn" id="sh-x">✕</span></div><div id="pk-st" class="ok"></div><iframe id="pk-f" style="width:100%;height:calc(100vh - 90px);border:1px solid #999;background:#fff"></iframe>';
  $('pk-f').srcdoc = pkgHtml(L);
  $('sh-x').onclick = function () {
    sh.style.display = 'none';
    draw();
  };
  $('pk-ai').onclick = _asyncToGenerator(_regenerator().m(function _callee() {
    var _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          $('pk-st').textContent = '⏳ ' + XS('AI 正在逐段整理（30–90 秒）…', 'AI rewriting (30–90 s)…');
          _context.p = 1;
          _context.n = 2;
          return pkgAiRun(L);
        case 2:
          $('pk-f').srcdoc = pkgHtml(L);
          $('pk-st').textContent = '✅ ' + XS('AI 整理好了', 'Done');
          _context.n = 4;
          break;
        case 3:
          _context.p = 3;
          _t = _context.v;
          $('pk-st').textContent = '⚠️ ' + _t.message;
        case 4:
          return _context.a(2);
      }
    }, _callee, null, [[1, 3]]);
  }));
  $('pk-pdf').onclick = _asyncToGenerator(_regenerator().m(function _callee2() {
    var r;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          $('pk-st').textContent = '⏳ ' + XS('后台生成 PDF…', 'Making the PDF…');
          _context2.n = 1;
          return pkgUpload(L, true);
        case 1:
          r = _context2.v;
          $('pk-st').textContent = r ? '✅ ' + XS('PDF 已存到云端（iPad：工具 → 📑 简报包）', 'PDF saved to the cloud') : '⚠️ ' + XS('没成功（要联网）', 'Failed (needs network)');
        case 2:
          return _context2.a(2);
      }
    }, _callee2);
  }));
}
function pkgUpload(_x2, _x3) {
  return _pkgUpload.apply(this, arguments);
}
function _pkgUpload() {
  _pkgUpload = _asyncToGenerator(_regenerator().m(function _callee4(L, force) {
    var k, j, _t2, _t3;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          if (!(!navigator.onLine || !ls('key'))) {
            _context4.n = 1;
            break;
          }
          return _context4.a(2, false);
        case 1:
          k = String(L.k).replace(/[^\w.-]/g, '');
          if (!(!force && ls('pkg.' + k))) {
            _context4.n = 2;
            break;
          }
          return _context4.a(2, true);
        case 2:
          _context4.p = 2;
          if (pkgAiGet(L)) {
            _context4.n = 3;
            break;
          }
          _context4.n = 3;
          return pkgAiRun(L);
        case 3:
          _context4.n = 5;
          break;
        case 4:
          _context4.p = 4;
          _t2 = _context4.v;
        case 5:
          _context4.p = 5;
          _context4.n = 6;
          return postK({
            action: 'pkgpdf',
            k: k,
            html: pkgHtml(L)
          });
        case 6:
          j = _context4.v;
          if (!(j && j.ok)) {
            _context4.n = 7;
            break;
          }
          ls('pkg.' + k, String(Date.now()));
          return _context4.a(2, true);
        case 7:
          _context4.n = 9;
          break;
        case 8:
          _context4.p = 8;
          _t3 = _context4.v;
        case 9:
          return _context4.a(2, false);
      }
    }, _callee4, null, [[5, 8], [2, 4]]);
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