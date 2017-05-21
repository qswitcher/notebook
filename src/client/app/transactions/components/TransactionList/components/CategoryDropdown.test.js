import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import CategoryDropdown from './CategoryDropdown';
import Categories from '../../../../../../server/constants/categories';


describe('<CategoryDropdown />', () => {
    it('renders all the category options', () => {
        expect(shallow(<CategoryDropdown />).find('.category-dropdown-choice').length).to.eq(Object.keys(Categories).length);
    });
});
// class Foo extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//
//   render() {
//     return (
//       <div className="foo" />
//     );
//   }
// }
//
//
// describe("A suite", function() {
//   it("contains spec with an expectation", function() {
//     expect(shallow(<Foo />).contains(<div className="foo" />)).to.equal(true);
//   });
//
//   it("contains spec with an expectation", function() {
//     expect(shallow(<Foo />).is('.foo')).to.equal(true);
//   });
//
//   it("contains spec with an expectation", function() {
//     expect(mount(<Foo />).find('.foo').length).to.equal(1);
//   });
// });
