// parse integer
const pi = x => parseInt(x, 10);

// event target
const etg = e => e.target;

// event id
const eid = e => etg(e).id;

// event value
const ev = e => etg(e).value;

// event attribute
const ea = (e, a) => etg(e).getAttribute(a);

// event attribute integer
const eai = (e, a) => pi(ea(e, a));

module.exports = {
  // pi,
  etg,
  eid,
  ev,
  ea,
  eai,
};
