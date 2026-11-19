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
              have = L && !L.noOfp && LBK.some(function (x) {
                return x.k === String(L.k).replace(/[^\w.-]/g, '');
              });
            var tot = LBK.reduce(function (s, e) {
              return s + (e.onB && e.offB && e.onB > e.offB ? (e.onB - e.offB) / MIN : 0);
            }, 0);
            sh.innerHTML = '<div style="display:flex;align-items:center;gap:8px"><b style="font-size:17px">📒 ' + X('飞行记录本', 'Logbook') + '</b><span style="flex:1"></span><span class="btn" id="lb-x">✕</span></div>' + '<div class="ok">' + esc(lbMsg) + (Object.keys(LBQ).length ? ' · ' + Object.keys(LBQ).length + X(' 条改动等有网同步', ' change(s) waiting for network') : '') + '</div>' + (L && !L.noOfp && !have ? '<span class="btn" id="lb-add">＋ ' + X('记下这班 ', 'Log this flight ') + esc(L.no) + ' ' + esc(L.ai) + '→' + esc(L.bi) + '</span>' : '') + '<div class="ok">' + XS('共 ' + LBK.length + ' 条 · 飞行时间 ' + lbHm(tot) + ' · 点时间可以改（UTC，4 位）', LBK.length + ' entries · block ' + lbHm(tot) + ' · tap a time to edit (UTC, 4 digits)') + '</div>' + LBK.slice(0, 60).map(function (e) {
              var blk = e.onB && e.offB && e.onB > e.offB ? (e.onB - e.offB) / MIN : 0,
                air = e.ldg && e.to && e.ldg > e.to ? (e.ldg - e.to) / MIN : 0;
              return '<div class="nt" data-k="' + esc(e.k) + '"><b>' + esc(e.flt) + '</b> · ' + esc(new Date(e.offB || e.date).toISOString().slice(0, 10)) + ' · ' + esc(e.depI || e.dep) + '→' + esc(e.arrI || e.arr) + ' · ' + esc(e.type || '') + ' ' + esc(e.reg || '') + (LBQ[e.k] ? ' <span class="tm">⏳</span>' : '') + '<div class="lbr">' + ['offB', 'to', 'ldg', 'onB'].map(function (f) {
                return '<span class="lbt" data-f="' + f + '"><i>' + {
                  offB: XS('撤轮挡', 'OFF'),
                  to: XS('起飞', 'T/O'),
                  ldg: XS('落地', 'LDG'),
                  onB: XS('挡轮挡', 'ON')
                }[f] + '</i>' + lbT(e[f]) + (e.src && e.src[f] === 'plan' ? '<sup>P</sup>' : '') + '</span>';
              }).join('') + '</div><div class="tm">' + XS('飞行 ', 'Block ') + lbHm(blk) + ' · ' + XS('空中 ', 'Air ') + lbHm(air) + (e.rmk ? ' · ' + esc(e.rmk) : '') + '</div></div>';
            }).join('') + '<div class="ok" style="font-size:12px">' + X('P = 计划时间（ADS-B / 手改后会替换）。夜航、起落次数、导出在 iPad 的记录本里。', 'P = planned time. Night time, landings and export are in the Flight Assist logbook.') + '</div>';
            $('lb-x').onclick = function () {
              sh.style.display = 'none';
              draw();
            };
            if ($('lb-add')) $('lb-add').onclick = function () {
              lbFromLeg(CUR);
              lbMsg = '✅ ' + X('已记下（有网时同步到所有设备）', 'Logged (syncs when online)');
              _paint();
              lbSync().then(_paint);
            };
            sh.querySelectorAll('.lbt').forEach(function (el) {
              return el.onclick = function () {
                var k = el.closest('[data-k]').dataset.k,
                  f = el.dataset.f,
                  e = LBK.find(function (x) {
                    return x.k === k;
                  });
                if (!e) return;
                var v = prompt(e.flt + ' ' + el.querySelector('i').textContent + ' (UTC hhmm)', e[f] ? hmZ(e[f]) : '');
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
          lbMsg = '⏳ ' + X('同步中…', 'Syncing…');
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