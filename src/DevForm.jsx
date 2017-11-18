import React, { PureComponent } from 'react'

import newId from './utils/newId'

import {
  BTN_OPT,
  DATA_ATTR,
  LBL,
  MAX_HISTROY,
  INPUT_TYPES,
  INPUT_SWAP,
  BOPT,
  BTXT,
  BDIS,
  CHOPT,
  CHTXT,
  CHDIS,
} from './utils/constants'

import get from './utils/get'

import deepSlice from './utils/deepSlice'

import { Button, Input, EditLable, Checkbox, Dropdown } from './elements/acc'

import { Cell, Row, Table } from './elements/table'

class Form extends PureComponent {
  constructor(props) {
    super(props)
    /**
     * bind handlers
     */
    ;['onBlur', 'OnClick', 'onChange'].forEach(fn => {
      this[fn] = this[fn].bind(this)
    })

    /**
     * init state
     */
    this.state = this.rstState()

    /**
     * define arrays outside state.
     *
     * we dont want to update cpmponent when check happened or removed
     * we wont keep state history in state.
     *
     */
    this.stateHistory = [] // state history
    this.checked = [[false, false], [false]] // check grwd
    /**
     * define uuid as key
     */
    this.key = newId
  }

  // input event handler
  onBlur(e) {
    if (this.gtName(e) === 'grid') {
      const { rw, cl, value } = this.gtVals(e)
      // if designMode then it's comming from EditLable
      this.setState(ps => ({
        tA: deepSlice.cell(
          ps.tA,
          rw,
          cl,
          ps.designMode ? { lable: value } : { value },
          '',
        ),
      }))
    }
  }

  // change event handler for checkbox and dropdown
  onChange(e) {
    if (e.target.type === 'checkbox') {
      this.checkOnChange(e)
    } else {
      this.selectOnChange(e)
    }
  }

  /**
   * checkbox handler
   *
   */
  checkOnChange = e => {
    // get id and check it
    const id = get.eid(e)
    //  grid checkbox has no id
    if (!id) {
      // grid
      this.tgglChecked(this.gtRw(e), this.gtCl(e))
      this.updateNavBtns()
    } else if (id === CHOPT[0] /* dsgn */) {
      // toggle the design mode
      this.setState(ps => ({
        designMode: !ps.designMode,
      }))
    } else {
      // save designMode TODO: WRITE THE FUNCTION
    }
  }

  /**
   * Dropdown handler
   *
   * if it's received new value then update the state
   */
  selectOnChange = e => {
    const { rw, cl, value } = this.gtVals(e)
    if (this.state.tA[rw].cells[cl].type !== value) {
      // new value update the type
      this.setState(ps => ({
        tA: deepSlice.cell(ps.tA, rw, cl, { type: value }, ''),
      }))
    }
  }

  /**
   * returns objects that used in undo in push and setState
   *         this.history.push(this.undo(previousState));
   *         this.setState(this.undo(this.history.pop()));
   */
  undoState = obj => ({
    tA: obj.tA,
    disAdd: true, // default true, until one grwd is checked
    disDel: true,
    disUndo: obj.disUndo,
    disReset: obj.disReset,
  })

  /**
   * iteration function excute cell operation for each true check in the grid.
   * triggers by handleNavBtnOpt which triggers by btn handler
   * three types of function excuation (for each cell) we have
      1- add row: rw (up or down)
      2- add cell: ac (left or right)
      3- delete: del
   * @param {string} fn -  button attribute
   * @param {number} isAddOne
   * @returns {array} new tA state.
  */
  cellOpt = (fn, isAddOne) => {
    // copy the tA state
    const tACOPY = JSON.parse(JSON.stringify(this.state.tA))
    // excuation functions
    const opt = (rw, clm) => ({
      ar: () => {
        tACOPY.splice(rw + isAddOne, 0, this.gtRwObj())
        this.checked.splice(clm, 0, [false])
      },
      ac: () => {
        tACOPY[rw].cells.splice(clm + isAddOne, 0, this.gtClObj())
        this.checked[rw].splice(clm, 0, false)
      },
      del: () => {
        if (this.len(tACOPY[rw].cells) > 1) {
          // row has more than one cell, delete cell
          ;[tACOPY[rw].cells, this.checked[rw]].forEach(i => i.splice(clm, 1))
        } else {
          // delete the row
          ;[tACOPY, this.checked].forEach(i => i.splice(rw, 1))
        }
      },
    })
    this.checked.forEach((rwElm, rw) =>
      rwElm.forEach((clElm, clm) => {
        // is cell checked?
        if (clElm) {
          this.tgglChecked(rw, clm)
          opt(rw, clm)[fn]()
        }
      }),
    )
    return tACOPY
  }

  /**
   * button handler
   *
   * check the button attribute to decide button type.
     btns type: Delte, add row or cell btns (including up and down)
   * triggers btn handler to decide the right cell operation upon the type propvided
   *
   *
   * @param {string} type -  button attribute
   * @param {event} e
   * @returns {array} new tA state.
  */
  handleNavBtnOpt = (type, e) => {
    // create newStateObj hold the new modified tA state and disable delete and reset state.
    let tACOPY
    if (type === BTN_OPT.DEL) {
      tACOPY = this.cellOpt('del')
    } else if (get.ea(e, DATA_ATTR.IS_RW)) {
      // row
      tACOPY = this.cellOpt('ar', type === BTN_OPT.UP ? 0 : 1)
    } else {
      // column
      tACOPY = this.cellOpt('ac', type === BTN_OPT.RT ? 1 : 0)
    }
    return tACOPY
  }

  /**
   * @param {array} tA
   * @returns {boolean}
   */
  shouldDisableDelBtn = tA =>
    this.isLenEq(tA, 1) && this.isLenEq(tA[0].cells, 1)

  /**
   * update add and delete buttons disabled status
   * buttons need at least one check in the grid (Checkbox) to be active
   * buttons add :  (LFT, UP, DWM, RT)  // delete : DEL
   *
   * NOTE:
   * DEL button diability related to the last cell in the table
   * reset and undoState related to this.stateHistory length
   */
  updateNavBtns = () => {
    let disAdd = true
    for (let i = 0; i < this.checked.length; i += 1) {
      if (this.checked[i].find(f => f === true)) {
        disAdd = false
        break
      }
    }
    // Only update if there is defference in values
    if (disAdd !== this.state.disAdd) {
      this.setState(ps =>
        Object.assign(
          {},
          { disAdd },
          {
            disDel: !disAdd ? this.shouldDisableDelBtn(ps.tA) : disAdd,
          },
        ),
      )
    }
  }

  /**
   * button event handler
   *
   * check the button attribute to decide button type. Then update the state
   */
  OnClick(e) {
    // get event attribute data-opt to check the button type
    const type = get.ea(e, DATA_ATTR.OPT)
    if (type === BTN_OPT.RST) {
      this.setState(this.rstState())
    } else if (type === BTN_OPT.UN) {
      this.setState(this.undoState(this.stateHistory.pop()))
    } else {
      const tACOPY = this.handleNavBtnOpt(type, e)
      this.setState(ps => {
        if (this.isLenEq(this.stateHistory, MAX_HISTROY)) {
          this.stateHistory.shift()
        }
        this.stateHistory.push(this.undoState(ps))
        return {
          tA: tACOPY,
          // related to grid check
          disAdd: true,
          disDel: true,
          // since pushing new value to history we can activate undo button
          disUndo: false,
          disReset: false, // TODO: not sure why
        }
      })
    }
  }

  // toggle Checked array by getting row and cloumn
  tgglChecked = (rw, cl) => {
    this.checked[rw][cl] = !this.checked[rw][cl]
  }

  /**
   * general function
   *
   */
  len = a => a.length // getting length
  isLenEq = (a, x) => this.len(a) === x // is length equal to x

  /**
   * returns column and row
   * use:  e.target.getAttrwbute(DATA_ATTR)
   */
  gtRw = e => get.eai(e, DATA_ATTR.RW) // data-rw
  gtCl = e => get.eai(e, DATA_ATTR.CLM) // data-cl
  gtName = e => get.en(e)

  /**
   * get values used to in event handler to update tA
   * used for lable and text field
   * returns row column and value from event
   */
  gtVals = e => ({ rw: this.gtRw(e), cl: this.gtCl(e), value: get.ev(e) })

  /**
   *
   * Shaping cell and row objet
   * TODO:
   * develop value to update the state one time
   * currently we update by default then when the user inserts the valle
   *
   */
  // cell
  gtClObj = (info = {}) => ({
    cellID: info.cellID || '',
    lable: info.lable || LBL.EDIT,
    value: info.value || '',
    type: info.type || '',
  })

  // row
  gtRwObj = (info = {}) => ({
    rowID: info.rowID || '',
    cells: [this.gtClObj({ lable: LBL.EDIT })],
  })
  gtRCObjKey = (r, c) => `rw${r}cl${c}`

  /**
   * initial state.
   * used to reset state as well
   * TODO:
   * in case the user saved the form shape, this must develop to
   * save and then reset the user-form-fixed shape.
   *
   */
  rstState = () => ({
    tA: [
      {
        rowID: '',
        cells: [
          {
            cellID: '',
            lable: LBL.EDIT,
            value: '',
            type: '',
          },
          {
            cellID: '',
            lable: LBL.EDIT,
            value: '',
            type: '',
          },
        ],
      },
      {
        rowID: '',
        cells: [
          {
            cellID: '',
            lable: LBL.EDIT,
            value: '',
            type: 'password',
          },
        ],
      },
    ],
    designMode: true,
    isSavedMode: false,
    /**
     * buttons disability
     */
    disAdd: true, // false, when the user tick at leat one checkbox in the grwd.
    disDel: true, // false, when table contains more than one cell.
    disUndo: true, // false, when the history array length more than zero.
    disReset: true,
  })

  Entry = designMode => {
    const dMode = (rw, cl, cElm) =>
      [
        <Checkbox
          r={rw}
          c={cl}
          onChange={this.onChange}
          checked={this.checked[rw][cl]}
        />,
        <EditLable
          value={cElm.lable}
          onBlur={this.onBlur}
          designMode={this.state.designMode}
          r={rw}
          c={cl}
        />,
        <Dropdown
          selected={cElm.type}
          data={INPUT_TYPES}
          onChange={this.onChange}
          r={rw}
          c={cl}
        />,
      ].map(e => <Cell key={this.key()}>{e}</Cell>)

    const nMode = (rw, cl, cElm) => {
      const a = dMode(rw, cl, cElm)
        .splice(1, 1)
        .concat(
          <Cell key={this.key()}>
            <Input
              value={cElm.value}
              type={cElm.type}
              onBlur={this.onBlur}
              onChange={this.selectOnChange}
              designMode={this.state.designMode}
              r={rw}
              c={cl}
            />
          </Cell>,
        )
      return INPUT_SWAP.find(e => e === cElm.type) ? a.reverse() : a
    }
    return designMode ? dMode : nMode
  }

  btnPanelCells = () => {
    const cells = []
    for (let i = 0; i < BTXT.length; i += 1) {
      cells.push(
        <Cell isHeader key={this.key()}>
          <Button
            txt={BTXT[i]}
            opt={BOPT[i]}
            isRw={i === 2 || i === 3 ? 'rw' : undefined}
            disabled={this.state[BDIS[i]]}
            onClick={this.OnClick}
          />
        </Cell>,
      )
    }
    return cells
  }

  chckPanelCells = () => {
    const cells = []
    for (let i = 0; i < CHTXT.length; i += 1) {
      cells.push(
        <Cell isHeader key={this.key()}>
          <Checkbox
            txt={CHTXT[i]}
            id={CHOPT[i]}
            checked={this.state[CHDIS[0]]}
            onChange={this.checkOnChange}
          />
        </Cell>,
      )
    }
    return cells
  }

  formTable = (tableOrCells, fnCell) => (
    <Table key={this.key()}>
      {fnCell ? (
        tableOrCells.map((row, rwID) => (
          <Row key={this.key()}>
            {row.cells.map((cell, cellID) => fnCell(rwID, cellID, cell))}
          </Row>
        ))
      ) : (
        <Row key={this.key()}>{tableOrCells}</Row>
      )}
    </Table>
  )

  render() {
    const { tA, designMode } = this.state

    const { chckPanelCells, btnPanelCells, formTable } = this

    const fnCell = this.Entry(designMode)

    return (
      <form>
        {[
          chckPanelCells(),
          designMode && btnPanelCells(),
          <EditLable
            value="title"
            onBlur={this.onBlur}
            designMode={this.state.designMode}
          />,
          tA,
        ].map((e, i) => e && formTable(e, i === 3 && fnCell))}
        <Button
          txt="Submit"
          type="submit"
          opt="submit"
          disabled={designMode}
          onClick={this.OnClick}
        />
      </form>
    )
  }
}

export default Form
