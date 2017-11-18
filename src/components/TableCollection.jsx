import React from 'react'
import PropTypes from 'prop-types'

/**
 * Define Table functions
 */
const Table = props => (
  <table>
    <tbody>{props.children}</tbody>
  </table>
)
Table.propTypes = {
  children: PropTypes.node.isRequired,
}

const Row = props => <tr>{props.children}</tr>
Row.propTypes = {
  children: PropTypes.node.isRequired,
}

const Cell = props =>
  props.isHeader ? <th>{props.children}</th> : <td>{props.children}</td>
Cell.propTypes = {
  isHeader: PropTypes.bool,
  children: PropTypes.element.isRequired,
}
Cell.defaultProps = {
  isHeader: false,
}

/**
 * Define function that form table component from given data
 * @param {Object} data
 * @param {function} cellRenderFunc
 * @param {function} keyGen
 * @returns {component}
 */
const FormingTableFromData = (data, cellRenderFunc, keyGen) => (
  <Table key={keyGen()}>
    {data.map((rowData, rowIndex) => (
      <Row key={keyGen()}>
        {rowData.map((cellData, cellIndex) => (
          <Cell key={keyGen()}>
            {cellRenderFunc(rowIndex, cellIndex, cellData)}
          </Cell>
        ))}
      </Row>
    ))}
  </Table>
)

export { Table, Row, Cell, FormingTableFromData }
