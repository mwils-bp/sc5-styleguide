'use strict';

var requireModule = require('requirefrom')('lib/modules'),
  chai = require('chai'),
  expect = chai.expect,
  multiline = require('multiline'),
  ignoreBlock = requireModule('ignore-block');

describe('ignore block removal', function() {
  it('should remove definitions between tags and leave other lines intact', function() {
    var str = multiline(function() {
    /*
First line
styleguide:ignore:start
Ignore 1
Ignore 2
styleguide:ignore:end
Last line
    */
    });
    expect(ignoreBlock.removeIgnoredBlocks(str)).to.eql('First line\nLast line');
  });

  it('should remove everything on the same line as tags', function() {
    var str = multiline(function() {
    /*
First line
// styleguide:ignore:start something
Ignore 1
Ignore 2
// styleguide:ignore:end something
Last line
    */
    });
    expect(ignoreBlock.removeIgnoredBlocks(str)).to.eql('First line\nLast line');
  });

  it('should support multiple blocks', function() {
    var str = multiline(function() {
    /*
First line
styleguide:ignore:start
Ignore 1
styleguide:ignore:end
Middle line
styleguide:ignore:start
Ignore 1
styleguide:ignore:end
Last line
    */
    });
    expect(ignoreBlock.removeIgnoredBlocks(str)).to.eql('First line\nMiddle line\nLast line');
  });

  it('should remove everything after start tag even if it is not closed', function() {
    var str = multiline(function() {
    /*
First line
styleguide:ignore:start
Ignore 1
Ignore 2
Ignore 3
    */
    });
    expect(ignoreBlock.removeIgnoredBlocks(str)).to.eql('First line');
  });
});
