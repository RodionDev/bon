let chai = require('chai');
var uniquefy = require('../../lib/uniquefy')
chai.should();
describe('uniquefy function', function() {
  it('should deslug a slug or str', function() {
    uniquefy.uniquefy('ant-bee-cat').should.eql('ant bee cat');
    uniquefy.uniquefy('ant bee cat').should.eql('ant bee cat');
  })
  it('should sort the slug', function() {
    uniquefy.uniquefy('dog-cat-bee-ant-wasp-mole-zebra').should.eql('ant bee cat dog mole wasp zebra');
  })
  it('should remove duplicate words', function() {
    uniquefy.uniquefy('cat-bee-cat-bee-ant-ant-ant-cat-cat').should.eql('ant bee cat');
    uniquefy.uniquefy('cat bee cat bee-ant-ant ant-cat-cat').should.eql('ant bee cat');
  })
  it('should remove stop words', function() {
    uniquefy.uniquefy('the-cat-ate-the-zebra-while-the-bee-and-the-ant-looked-on-horrified').should.eql('ant ate bee cat horrified looked zebra');
    uniquefy.uniquefy('all the kings horses and all the kings men couldn\'t put humpty together again').should.eql('couldnt horses humpty kings men put');
  })
});
