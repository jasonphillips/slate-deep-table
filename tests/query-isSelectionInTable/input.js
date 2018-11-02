/** @jsx h */

import h from '../hyperscript';

const value = (
  <value>
    <document>
      <p key="_cursor_outside_table_">A paragraph not in a table</p>
      <table>
        <tr>
          <td>
            <p key="_cursor_inside_table_">A paragraph within a table</p>
          </td>
        </tr>
      </table>
    </document>
  </value>
);

export default value;