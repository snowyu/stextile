var assert = require('assert')
  , textile = require(__dirname + '/../lib/stextile');

// Paragraphs
assert.equal('<p>A paragraph</p>\n', textile('A paragraph\n'));
assert.equal('<p>A paragraph</p>\n', textile('p. A paragraph\n'));
assert.equal('<p style="text-align: center">A paragraph</p>\n', textile('p=. A paragraph\n'));

// Headers
assert.equal('<h3>Hello World</h3>\n', textile('h3. Hello World'));
assert.equal('<h3>Hello World</h3>\n<h4>Deeper</h4>\n', textile('h3. Hello World\nh4. Deeper'));
assert.equal('<h3>Hello World</h3>\n<p>Hello again.</p>\n', textile('h3. Hello World\n\nHello again.\n'));

// Links with fullstops
assert.equal('<p><a href="http://example.com">Example</a>.</p>\n', textile('"Example":http://example.com.'));

// Commas
assert.equal('<p><a href="http://example.com">Example</a>, text</p>\n', textile('"Example":http://example.com, text'));

// Links
assert.equal('<p><a href="http://example.com">Example</a></p>\n', textile('"Example":http://example.com'));
assert.equal('<p><a title="Title" href="http://example.com">Example</a></p>\n', textile('"Example (Title)":http://example.com'));

// Multiple links
assert.equal(
  '<p><a href="http://example.com">Example</a> and <a href="http://example.com/2">Example 2</a></p>\n',
  textile('"Example":http://example.com and "Example 2":http://example.com/2')
);

// Bold
assert.equal('<p>Some <strong>bold text</strong> here</p>\n', textile('Some *bold text* here'));
assert.equal('<p>Some <em>emphasised text</em> here</p>\n', textile('Some _emphasised text_ here'));

// Unordered lists
assert.equal('<ul>\n<li>A list item</li>\n</ul>\n', textile('* A list item\n'));

// Blockquotes
assert.equal('<blockquote>A quote</blockquote>\n', textile('bq. A quote\n'));
assert.equal('<blockquote class="example">A quote</blockquote>\n', textile('bq(example). A quote\n'));
assert.equal('<blockquote lang="en">A quote</blockquote>\n', textile('bq[en]. A quote\n'));

// Tables
assert.equal('<table>\n<tr>\n<td>A</td></tr>\n<tr>\n<td>B</td></tr>\n</table>\n', textile('|A|\n|B|\n'));
assert.equal('<table>\n<tr>\n<td>A</td><td>B</td></tr>\n<tr>\n<td>C</td><td>D</td></tr>\n</table>\n', textile('|A|B|\n|C|D|\n'));
assert.equal('<table style="color: red">\n<tr>\n<td>A</td></tr>\n<tr>\n<td>B</td></tr>\n</table>\n', textile('table{color: red}.\n|A|\n|B|\n'));

// Entity replacement

// Interleaved quotes
assert.equal('<p>&#8216;It&#8217;s clear that the fox said &#8220;hello&#8221;.&#8217;</p>\n', textile('\'It\'s clear that the fox said "hello".\'\n'));
