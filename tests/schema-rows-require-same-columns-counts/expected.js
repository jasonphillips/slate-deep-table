/** @jsx h */

import h from '../hyperscript';

const value = (
  <value>
    <document>
      <table>
        <tr>
          <td>
            <p>Col 1, Row 1</p>
          </td>
          <td>
            <p>Col 2, Row 1</p>
          </td>
          <td>
            <p>Col 3, Row 1</p>
          </td>
        </tr>
        <tr>
          <td>
            <p><text /></p>
          </td>
          <td>
            <p><text /></p>
          </td>
          <td>
            <p>There is only one column here</p>
          </td>
        </tr>
        <tr>
          <td>
            <p><text /></p>
          </td>
          <td>
            <p>Col 1, Row 3</p>
          </td>
          <td>
            <p>Col 3, Row 3</p>
          </td>
        </tr>
      </table>
    </document>
  </value>
);

export default value;