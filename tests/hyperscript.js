import { createHyperscript } from 'slate-hyperscript'

const h = createHyperscript({
  blocks: {
    p: 'paragraph',
    table: 'table',
    tr: 'table_row',
    td: 'table_cell', 
    other: 'other', // random invalid block
    h2: 'heading',
    h3: 'subheading',
  },
  inlines: {
    a: 'link',
  },
  marks: {
    b: 'bold',
  },
  key: true,
});

export default h;