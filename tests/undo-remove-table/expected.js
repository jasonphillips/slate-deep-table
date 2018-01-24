/** @jsx h */

import h from '../hyperscript';

const value = (
  <value>
    <document>
      <p>Before</p>
      <table>
        <tr>
          <td>
            <p>Col 0, Row 0</p>
          </td>
          <td>
            <p>Col 1, Row 0</p>
          </td>
          <td>
            <p>Col 2, Row 0</p>
          </td>
        </tr>
        <tr>
          <td>
            <p>Col 0, Row 1</p>
          </td>
          <td>
            <p>Col 1, Row 1</p>
          </td>
          <td>
            <p>Col 2, Row 1</p>
          </td>
        </tr>
        <tr>
          <td>
            <p>Col 0, Row 2</p>
          </td>
          <td>
            <p>Col 1, Row 2</p>
          </td>
          <td>
            <p>Col 2, Row 2</p>
          </td>
        </tr>
      </table>
      <p>After</p>
    </document>
  </value>
);

export default value;