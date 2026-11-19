'use strict';

function _regenerator() { var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? (c > 1 && (G.n = c < 3 ? -1 : u), d(c, u)) : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var LBK = [];
try {
  LBK = JSON.parse(ls('lb') || '[]');
} catch (e) {}
var LBQ = {};
try {
  LBQ = JSON.parse(ls('lbq') || '{}');
} catch (e) {}
var lbSave = function lbSave() {
  ls('lb', JSON.stringify(LBK));
  ls('lbq', JSON.stringify(LBQ));
};
var lbMsg = '';
function lbSync() {
  return _lbSync.apply(this, arguments);
}
function _lbSync() {
  _lbSync = _asyncToGenerator(_regenerator().m(function _callee() {
    var send, j;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          if (!(!navigator.onLine || !ls('key'))) {
            _context.n = 1;
            break;
          }
          lbMsg = '📵 ' + X('离线：显示手机里保存的记录，改动有网时再同步', 'Offline — showing saved records; changes sync when online');
          return _context.a(2);
        case 1:
          send = Object.keys(LBQ).map(function (k) {
            return LBQ[k];
          });
          _context.n = 2;
          return postK({
            action: 'lbsync',
            entries: send,
            set: null,
            setU: 0,
            table: null
          });
        case 2:
          j = _context.v;
          if (!(!j || !j.ok)) {
            _context.n = 3;
            break;
          }
          lbMsg = '⚠️ ' + (j && j.error || '?');
          return _context.a(2);
        case 3:
          LBQ = {};
          LBK = (j.entries || []).filter(function (e) {
            return !e.del;
          }).sort(function (a, b) {
            return (b.offB || b.date) - (a.offB || a.date);
          });
          if (j.set) ls('lbset', JSON.stringify(j.set));
          lbSave();
          lbMsg = '✅ ' + XS('已同步 ' + LBK.length + ' 条', 'Synced ' + LBK.length + ' entries');
        case 4:
          return _context.a(2);
      }
    }, _callee);
  }));
  return _lbSync.apply(this, arguments);
}
function lbPut(e) {
  e.u = Date.now();
  LBQ[e.k] = e;
  var i = LBK.findIndex(function (x) {
    return x.k === e.k;
  });
  if (i >= 0) LBK[i] = e;else LBK.unshift(e);
  lbSave();
}
var lbHm = function lbHm(m) {
  return m > 0 ? Math.floor(m / 60) + ':' + String(Math.round(m % 60)).padStart(2, '0') : '—';
};
var lbT = function lbT(t) {
  return t ? hmZ(t) : '—';
};
function lbFromLeg(L) {
  var k = String(L.k).replace(/[^\w.-]/g, '');
  var e = LBK.find(function (x) {
    return x.k === k;
  });
  if (e) return e;
  var set = {};
  try {
    set = JSON.parse(ls('lbset') || '{}');
  } catch (x) {}
  var N = (L.n || []).filter(function (w) {
      return w.length >= 4;
    }),
    to = offOf(L),
    tx = Math.min(30, L.tx || 15) * MIN;
  e = {
    k: k,
    flt: L.no,
    cs: csOf(L),
    date: L.std,
    dep: L.dep || L.ai,
    arr: L.arr || L.bi,
    depI: L.ai,
    arrI: L.bi,
    type: typeof OFP !== 'undefined' && OFP.normType ? OFP.normType(L.ty || '') : L.ty || '',
    reg: typeof OFP !== 'undefined' && OFP.normReg ? OFP.normReg(L.reg || '') : L.reg || '',
    role: set.role || 'CAPT',
    pf: false,
    pic: '',
    rmk: '',
    src: {
      offB: 'plan',
      to: 'plan',
      ldg: 'plan',
      onB: 'plan'
    },
    std: L.std,
    taxiP: Math.round(tx / MIN),
    dp: N.length ? [N[0][2], N[0][3]] : null,
    ap: N.length ? [N[N.length - 1][2], N[N.length - 1][3]] : null,
    pts: N.filter(function (w, i) {
      return i === 0 || i === N.length - 1 || i % Math.ceil(N.length / 120) === 0;
    }).map(function (w) {
      return [w[2], w[3], w[1]];
    }),
    to: to,
    offB: to - tx,
    ldg: to + L.tr * MIN,
    onB: to + L.tr * MIN + 8 * MIN
  };
  if (atdOf(L)) Object.keys(e.src).forEach(function (f) {
    return e.src[f] = 'fa';
  });
  lbPut(e);
  return e;
}
var lbSet = function lbSet() {
  var S = {};
  try {
    S = JSON.parse(ls('lbset') || '{}');
  } catch (e) {}
  if (ls('lbfmt')) S.fmt = ls('lbfmt');
  return Object.assign({
    fmt: 'caac',
    role: 'CAPT',
    name: '',
    lic: '',
    night: 'auto',
    bf: {}
  }, S);
};
var lbThr = function lbThr(S) {
  return S.night === 'sun' ? -0.833 : S.night === 'civil' ? -6 : S.fmt === 'caac' ? -0.833 : -6;
};
function lbPos(e, t) {
  if (t <= e.to || !e.pts || e.pts.length < 2) return t <= e.to || !e.pts ? e.dp : e.ap;
  if (t >= e.ldg) return e.ap;
  var P = e.pts,
    plan = P[P.length - 1][2] || 1,
    m = (t - e.to) / Math.max(MIN, e.ldg - e.to) * plan;
  for (var i = 1; i < P.length; i++) if (P[i][2] >= m) {
    var a = P[i - 1],
      b = P[i],
      f = (m - a[2]) / Math.max(.01, b[2] - a[2]);
    return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
  }
  return e.ap;
}
var lbPf = function lbPf(e) {
  return [e.pfTo != null ? !!e.pfTo : !!e.pf, e.pfLdg != null ? !!e.pfLdg : !!e.pf];
};
function lbCalc(e, S) {
  var ok = e.offB && e.to && e.ldg && e.onB && e.onB > e.offB,
    th = lbThr(S),
    night = function night(p, t) {
      return p && sunEl(t, p[0], p[1]) < th;
    };
  var r = {
    blk: ok ? Math.round((e.onB - e.offB) / MIN) : 0,
    air: e.to && e.ldg && e.ldg > e.to ? Math.round((e.ldg - e.to) / MIN) : 0,
    night: 0
  };
  r.block = S.ftime === 'air' ? r.air : r.blk;
  if (!ok) return r;
  var t0 = S.ftime === 'air' ? e.to : e.offB,
    t1 = S.ftime === 'air' ? e.ldg : e.onB;
  for (var t = t0 + 30e3; t < t1; t += MIN) if (night(lbPos(e, t), t)) r.night++;
  var toN = night(e.dp, e.to),
    ldN = night(e.ap, e.ldg),
    pf = lbPf(e),
    cap = (e.role || S.role) === 'CAPT';
  return Object.assign(r, {
    pic: cap ? r.block : 0,
    cop: cap ? 0 : r.block,
    ifr: r.block,
    toD: pf[0] && !toN ? 1 : 0,
    toNn: pf[0] && toN ? 1 : 0,
    ldD: pf[1] && !ldN ? 1 : 0,
    ldNn: pf[1] && ldN ? 1 : 0
  });
}
var z2 = function z2(n) {
    return String(n).padStart(2, '0');
  },
  lbHC = function lbHC(t) {
    return t ? z2(new Date(t).getUTCHours()) + ':' + z2(new Date(t).getUTCMinutes()) : '';
  },
  lbH = function lbH(m) {
    return m ? Math.floor(m / 60) + ':' + z2(m % 60) : '';
  };
var lbD = function lbD(t) {
    if (!t) return '';
    var d = new Date(t);
    return d.getUTCFullYear() + '-' + z2(d.getUTCMonth() + 1) + '-' + z2(d.getUTCDate());
  },
  lbDs = function lbDs(t) {
    if (!t) return '';
    var d = new Date(t);
    return z2(d.getUTCDate()) + '/' + z2(d.getUTCMonth() + 1) + '/' + String(d.getUTCFullYear()).slice(2);
  };
var LBF = ['block', 'air', 'pic', 'cop', 'night', 'ifr', 'toD', 'toNn', 'ldD', 'ldNn'];
function lbTable(S) {
  var R = LBK.slice().sort(function (a, b) {
    return (a.offB || a.date) - (b.offB || b.date);
  }).map(function (e) {
    return [e, lbCalc(e, S)];
  });
  if (!R.length) return '<div class="ok">' + XS('还没有记录', 'No records') + '</div>';
  var tot = function tot(k) {
      return R.reduce(function (s, x) {
        return s + (x[1][k] || 0);
      }, 0);
    },
    bf = function bf(k) {
      return k === 'air' ? 0 : (S.bf || {})[k] || 0;
    },
    hasBf = LBF.some(function (k) {
      return (S.bf || {})[k];
    });
  var tc = function tc(e, f) {
    return '<td class="lbt" data-k="' + esc(e.k) + '" data-f="' + f + '">' + lbHC(e[f]) + (e.src && e.src[f] === 'plan' ? '<sup>P</sup>' : '') + '</td>';
  };
  if (S.fmt === 'caac') {
    var _H = '<tr><th rowspan="2">日期</th><th rowspan="2">航班号</th><th rowspan="2">型别</th><th rowspan="2">登记号</th><th colspan="2">航段</th><th colspan="4">时刻（UTC）</th><th colspan="2">飞行时间</th><th colspan="2">资格时间</th><th rowspan="2">夜航</th><th rowspan="2">仪表</th><th colspan="2">起飞</th><th colspan="2">着陆</th><th rowspan="2">备注</th></tr>' + '<tr><th>起飞地点</th><th>着陆地点</th><th>撤轮挡</th><th>起飞</th><th>着陆</th><th>挡轮挡</th><th>总时间</th><th>空中</th><th>机长</th><th>副驾驶</th><th>昼</th><th>夜</th><th>昼</th><th>夜</th></tr>';
    var _B = R.map(function (_ref) {
      var e = _ref[0],
        r = _ref[1];
      return '<tr' + (LBQ[e.k] ? ' class="q"' : '') + '><td>' + lbD(e.offB || e.date) + '</td><td>' + esc(e.flt) + '</td><td>' + esc(e.type || '') + '</td><td>' + esc(e.reg || '') + '</td><td>' + esc(e.dep) + '</td><td>' + esc(e.arr) + '</td>' + tc(e, 'offB') + tc(e, 'to') + tc(e, 'ldg') + tc(e, 'onB') + '<td class="b">' + lbH(r.block) + '</td><td>' + lbH(r.air) + '</td><td>' + lbH(r.pic) + '</td><td>' + lbH(r.cop) + '</td><td>' + lbH(r.night) + '</td><td>' + lbH(r.ifr) + '</td><td>' + (r.toD || '') + '</td><td>' + (r.toNn || '') + '</td><td>' + (r.ldD || '') + '</td><td>' + (r.ldNn || '') + '</td><td>' + esc(e.rmk || '') + '</td></tr>';
    }).join('');
    var _fr = function _fr(lab, g, c) {
      return '<tr class="' + c + '"><td colspan="10">' + lab + '</td><td class="b">' + lbH(g('block')) + '</td><td>' + lbH(g('air')) + '</td><td>' + lbH(g('pic')) + '</td><td>' + lbH(g('cop')) + '</td><td>' + lbH(g('night')) + '</td><td>' + lbH(g('ifr')) + '</td><td>' + g('toD') + '</td><td>' + g('toNn') + '</td><td>' + g('ldD') + '</td><td>' + g('ldNn') + '</td><td></td></tr>';
    };
    return '<div class="lbh">飞行经历记录本</div><div class="tm">驾驶员：' + esc(S.name || '—') + ' · 执照号：' + esc(S.lic || '—') + ' · UTC · 夜间：' + (lbThr(S) < -3 ? '昏影终至晨光始' : '日落至日出') + '</div><div class="lbw"><table class="lbx">' + _H + _B + _fr('本册合计（' + R.length + ' 段）', tot, 'tot') + (hasBf ? _fr('以前累计（承前）', bf, 'bf') + _fr('总计', function (k) {
      return tot(k) + bf(k);
    }, 'tot') : '') + '</table></div>';
  }
  var H = '<tr><th rowspan="2">DATE</th><th colspan="2">DEPARTURE</th><th colspan="2">ARRIVAL</th><th colspan="2">AIRCRAFT</th><th rowspan="2">MULTI-PILOT</th><th rowspan="2">TOTAL TIME</th><th rowspan="2">NAME PIC</th><th colspan="2">LANDINGS</th><th colspan="2">CONDITION</th><th colspan="2">FUNCTION</th><th rowspan="2">REMARKS</th></tr>' + '<tr><th>PLACE</th><th>TIME</th><th>PLACE</th><th>TIME</th><th>MODEL</th><th>REG</th><th>DAY</th><th>NIGHT</th><th>NIGHT</th><th>IFR</th><th>PIC</th><th>CO-PILOT</th></tr>';
  var B = R.map(function (_ref2) {
    var e = _ref2[0],
      r = _ref2[1];
    return '<tr' + (LBQ[e.k] ? ' class="q"' : '') + '><td>' + lbDs(e.offB || e.date) + '</td><td>' + esc(e.dep) + '</td>' + tc(e, 'offB') + '<td>' + esc(e.arr) + '</td>' + tc(e, 'onB') + '<td>' + esc(e.type || '') + '</td><td>' + esc(e.reg || '') + '</td><td>' + lbH(r.block) + '</td><td class="b">' + lbH(r.block) + '</td><td>' + esc((e.role || S.role) === 'CAPT' ? 'SELF' : e.pic || '') + '</td><td>' + (r.ldD || '') + '</td><td>' + (r.ldNn || '') + '</td><td>' + lbH(r.night) + '</td><td>' + lbH(r.ifr) + '</td><td>' + lbH(r.pic) + '</td><td>' + lbH(r.cop) + '</td><td>' + esc([e.flt, e.rmk].filter(Boolean).join(' · ')) + '</td></tr>';
  }).join('');
  var fr = function fr(lab, g, c) {
    return '<tr class="' + c + '"><td colspan="7">' + lab + '</td><td>' + lbH(g('block')) + '</td><td class="b">' + lbH(g('block')) + '</td><td></td><td>' + g('ldD') + '</td><td>' + g('ldNn') + '</td><td>' + lbH(g('night')) + '</td><td>' + lbH(g('ifr')) + '</td><td>' + lbH(g('pic')) + '</td><td>' + lbH(g('cop')) + '</td><td></td></tr>';
  };
  return '<div class="lbh">PILOT LOGBOOK</div><div class="tm">' + esc(S.name || '—') + ' · ' + esc(S.lic || '') + ' · UTC · night: ' + (lbThr(S) < -3 ? 'civil twilight' : 'sunset–sunrise') + '</div><div class="lbw"><table class="lbx">' + H + B + fr('TOTAL THIS BOOK (' + R.length + ')', tot, 'tot') + (hasBf ? fr('TOTAL FROM PREVIOUS PAGES', bf, 'bf') + fr('TOTAL TIME', function (k) {
    return tot(k) + bf(k);
  }, 'tot') : '') + '</table></div>';
}
function openLog() {
  return _openLog.apply(this, arguments);
}
function _openLog() {
  _openLog = _asyncToGenerator(_regenerator().m(function _callee2() {
    var sh, _paint, _t;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          sh = $('sheet');
          sh.style.display = 'block';
          sh.scrollTop = 0;
          _paint = function paint() {
            var L = CUR,
              S = lbSet(),
              have = L && !L.noOfp && LBK.some(function (x) {
                return x.k === String(L.k).replace(/[^\w.-]/g, '');
              });
            sh.innerHTML = '<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap"><b style="font-size:17px">📒 ' + XS('飞行记录本', 'Logbook') + '</b><span style="flex:1"></span>' + '<span class="btn sg' + (S.fmt === 'caac' ? ' on' : '') + '" data-fmt="caac">中国民航</span><span class="btn sg' + (S.fmt !== 'caac' ? ' on' : '') + '" data-fmt="jepp">Jeppesen</span><span class="btn" id="lb-x">✕</span></div>' + '<div class="ok">' + esc(lbMsg) + (Object.keys(LBQ).length ? ' · ' + Object.keys(LBQ).length + XS(' 条改动等有网同步', ' change(s) waiting') : '') + '</div>' + (L && !L.noOfp && !have ? '<span class="btn" id="lb-add">＋ ' + XS('记下这班 ', 'Log this flight ') + esc(L.no) + ' ' + esc(L.ai) + '→' + esc(L.bi) + '</span>' : '') + lbTable(S) + '<div class="ok" style="font-size:12px">' + XS('表格可以左右滑动（手机横过来看更舒服）。点时刻可以改（UTC，4 位）。P = 计划时间。导出、承前数据、个人信息在 iPad 记录本里设置，这里自动同步。', 'Tap a time to edit (UTC). P = planned. Export and settings are on the iPad.') + '</div>';
            $('lb-x').onclick = function () {
              sh.style.display = 'none';
              draw();
            };
            sh.querySelectorAll('[data-fmt]').forEach(function (b) {
              return b.onclick = function () {
                ls('lbfmt', b.dataset.fmt);
                _paint();
              };
            });
            if ($('lb-add')) $('lb-add').onclick = function () {
              lbFromLeg(CUR);
              lbMsg = '✅ ' + XS('已记下（有网时同步到所有设备）', 'Logged (syncs when online)');
              _paint();
              lbSync().then(_paint);
            };
            sh.querySelectorAll('td.lbt').forEach(function (el) {
              return el.onclick = function () {
                var k = el.dataset.k,
                  f = el.dataset.f,
                  e = LBK.find(function (x) {
                    return x.k === k;
                  });
                if (!e) return;
                var v = prompt(e.flt + ' ' + {
                  offB: XS('撤轮挡', 'OFF'),
                  to: XS('起飞', 'T/O'),
                  ldg: XS('落地', 'LDG'),
                  onB: XS('挡轮挡', 'ON')
                }[f] + ' (UTC hhmm)', e[f] ? hmZ(e[f]) : '');
                if (v === null || !/^\d{4}$/.test(v.trim())) return;
                var ref = e[f] || e.std || e.date,
                  d0 = Date.UTC(new Date(ref).getUTCFullYear(), new Date(ref).getUTCMonth(), new Date(ref).getUTCDate()) + (+v.slice(0, 2) * 60 + +v.slice(2)) * MIN;
                var y = JSON.parse(JSON.stringify(e));
                y[f] = [d0 - 864e5, d0, d0 + 864e5].sort(function (a, b) {
                  return Math.abs(a - ref) - Math.abs(b - ref);
                })[0];
                y.src = y.src || {};
                y.src[f] = 'man';
                lbPut(y);
                _paint();
                lbSync().then(_paint);
              };
            });
          };
          lbMsg = '⏳ ' + XS('同步中…', 'Syncing…');
          _paint();
          _context2.p = 1;
          _context2.n = 2;
          return lbSync();
        case 2:
          _context2.n = 4;
          break;
        case 3:
          _context2.p = 3;
          _t = _context2.v;
          lbMsg = '⚠️ ' + _t.message;
        case 4:
          _paint();
        case 5:
          return _context2.a(2);
      }
    }, _callee2, null, [[1, 3]]);
  }));
  return _openLog.apply(this, arguments);
}