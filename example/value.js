
/** @jsx h */

import h from '../tests/hyperscript';

const value = (
  <value>
    <document>
      <h2>Slate with Deep Tables</h2>
      <p>The page demonstrates the slate-deep-table plugin.</p>

      <h3>Basic Tables</h3>
      <p>Simple tables can still contain block-level content. This page is intentionally not using other plugins, but you could easily embed lists, images, or any other block-level content in cells.</p>
      
      <table>
        <tr>
          <td>
            <p>Week</p>
          </td>
          <td>
            <p>Assignments</p>
          </td>
        </tr>
        <tr>
          <td>
            <p>August 21st</p>
          </td>
          <td>
            <p>Introductory reading</p>
            <p>Pre-test One</p>
          </td>
        </tr>
        <tr>
          <td>
            <p>August 28th</p>
          </td>
          <td>
            <p>Discussion Question One</p>
            <p>Find partners for group project</p>
            <p>Begin Chapters 1-3</p>
          </td>
        </tr>
      </table>

      <p>Use Tab and Shift+Tab to move from cell to cells. Press Up/Down to navigate the rows.</p>
      
      <h3>Headerless</h3>
      <p>Headerless tables can be used for aligning columns. One-row tables are always headerless, but you can use the Toggle Headers button to hide or show headers on any table.</p>
      
      <table headless={true}>
        <tr>
          <td>
            <p>Gamma Quadrant</p>
            <p>- dominion, bad things</p>
          </td>
          <td>
            <p>Delta Quadrant</p>
            <p>- flying cubes, space monocles with laser pointers</p>
          </td>
        </tr>
        <tr>
          <td>
            <p>Alpha Quadrant</p>
            <p>- somewhat self-aggrandizing name</p>
          </td>
          <td>
            <p>Beta Quadrant</p>
            <p>- Various empires</p>
          </td>
        </tr>
      </table>

      <h3>Nested Tables</h3>
      <p>If you so desire, you may even embed tables within tables.</p>
      
      <table>
        <tr>
          <td>
            <p>vero</p>
          </td>
          <td>
            <p>odio</p>
          </td>
          <td>
            <p>blanditiis</p>
          </td>
        </tr>
        <tr>
          <td>
            <p>cupiditate</p>
          </td>
          <td>
            <p>maxime placeat facere</p>
          </td>
          <td>
            <table>
              <tr>
                <td>
                  <p>cupiditate</p>
                </td>
                <td>
                  <p>expedita</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>23</p>
                </td>
                <td>
                  <p>2.98</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>888.2</p>
                </td>
                <td>
                  <p>0</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td>
            <p>Itaque</p>
          </td>
          <td>
            <p>rerum hic tenetur</p>
          </td>
          <td>
            <table>
              <tr>
                <td>
                  <p>cupiditate</p>
                </td>
                <td>
                  <p>expedita</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>2003</p>
                </td>
                <td>
                  <p>33</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </document>
  </value>
)

module.exports = value;