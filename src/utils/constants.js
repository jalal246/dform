/**
 * shared constants
 */

const frz = obj => Object.freeze(obj)

/**
 *  will create Object by assign each prop from array to key of another array
 *
 */
const asgn = (key, prop) => {
  const res = {}
  prop.forEach((p, i) => {
    res[key[i]] = p
  })
  return frz(res)
}

/**
 * define button
 */
const BTN = ['DEL', 'LFT', 'UP', 'DWM', 'RT', 'RST', 'UN'] // button keys.
const BOPT = ['del', 'lft', 'up', 'dwn', 'rt', 'rst', 'un'] // button options used in data-opt =
const BTXT = ['x', '←', '↑', '↓', '→', 'reset all', 'undo'] // visual text for each button

const DIS_DEL = 'disDel'
const DIS_ADD = 'disAdd'
const DIS_RST = 'disReset'
const DIS_UN = 'disUndo'

const BDIS = [DIS_DEL, DIS_ADD, DIS_ADD, DIS_ADD, DIS_ADD, DIS_RST, DIS_UN] // visual text for each button

const BTN_OPT = asgn(BTN, BOPT) // options will be saved  as special attr in dom
const BTN_TXT = asgn(BTN, BTXT)

/**
 * define checkbox
 */
const CHK = ['DSGN_MD', 'IS_SAVED', 'GRID'] // checkbox keys.
const CHOPT = ['dsgn', 'svd', 'gd'] // checkbox options used in data-opt =
const CHTXT = ['Design Mode', 'Save Design'] // visual text for each checkbox
const DM = 'designMode'
const SV = 'isSaved'
const CHDIS = [DM, SV]

const CHK_OPT = asgn(CHK, CHOPT)
const CHECK_TXT = asgn(CHK, CHTXT)

/**
 * define attr used in elements
 */
const dt = 'data-'
const DATA_ATTR = frz({
  OPT: `${dt}opt`,
  NAME: `${dt}name`,
  IS_RW: `${dt}rw`,
  RW: `${dt}r`,
  CLM: `${dt}c`,
})

/**
 * define EditLable text used
 */
const nw = 'new '
const LBL = frz({ EDIT: 'Edit me!', NW_CELL: `${nw}cell`, NW_RW: `${nw}row` })

/**
 * max state history allowed
 */
const MAX_HISTROY = 10

/**
 * define types of input allowed
 */
const INPUT_TYPES = [
  'text',
  'email',
  'password',
  'date',
  'checkbox',
  'radio',
  'color',
]
const INPUT_SWAP = [INPUT_TYPES[4], INPUT_TYPES[5]]
const INPUT_TYPES_TITLE = 'Edit type'

export {
  BTN,
  BOPT,
  BTXT,
  BDIS,
  BTN_OPT,
  CHOPT,
  CHTXT,
  CHDIS,
  CHK_OPT,
  CHECK_TXT,
  BTN_TXT,
  DATA_ATTR,
  LBL,
  MAX_HISTROY,
  INPUT_TYPES,
  INPUT_SWAP,
  INPUT_TYPES_TITLE,
}
