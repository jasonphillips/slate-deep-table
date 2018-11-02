/** @jsx h */

import h from '../hyperscript';

const value = (
  <value>
    <document>
      <p>A paragraph not in a table</p>
      <table>
        <tr>
          <td>
            <p>A paragraph within a table</p>
          </td>
        </tr>
      </table>
    </document>
  </value>
);

export default value;