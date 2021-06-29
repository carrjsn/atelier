import React from 'react';
import { shallow } from 'enzyme';
import {Reviews} from '../../../client/src/components/reviews/reviews.jsx';
import RatingBreakdown from '../../../client/src/components/reviews/ratingBreakdown.jsx';
import PdtBreakdown from '../../../client/src/components/reviews/pdtBreakdown.jsx';
import Sort from '../../../client/src/components/reviews/sort.jsx';
import Search from '../../../client/src/components/reviews/search.jsx';
import ReviewsList from '../../../client/src/components/reviews/reviewsList.jsx';
import MoreReviews from '../../../client/src/components/reviews/moreReviews.jsx';
import AddReview from '../../../client/src/components/reviews/addReview.jsx';
import ReviewsTile from '../../../client/src/components/reviews/reviewsTile.jsx';


describe ('Reviews Widget', () => {
  const wrapper = shallow(<Reviews currentReviews={[]} searchTerm='a' selectedFilters={[]} filteredTotalReviews={[]} searchedTotalReviews={[]} filteredSearchedTotalReviews={[]} nextReviews={[]} />);

  it ('checks if the widget exists', () => {
    console.log(wrapper.get(0))
    expect(wrapper.exists('.reviews')).toBe(true);
  });

  it('checks that Reviews component is rendering children', () => {
    expect(wrapper.children()).toHaveLength(2);
  });

  it ('shoudl render the following components: RatingsBreakdown, PdtBreakdown, Sort, Search, ReviewsList, MoreReviews and AddReview', () => {
    wrapper.setProps({ currentReviews: [1], nextReviews: [2], filteredCurrentReviews:[1], filteredNextReviews:[1] });

    expect(wrapper.find(RatingBreakdown).exists()).toBe(true);
    expect(wrapper.find(PdtBreakdown).exists()).toBe(true);
    expect(wrapper.find(Sort).exists()).toBe(true);
    expect(wrapper.find(Search).exists()).toBe(true);
    expect(wrapper.find(ReviewsList).exists()).toBe(true);
    expect(wrapper.find(MoreReviews).exists()).toBe(true);
    expect(wrapper.find(AddReview).exists()).toBe(true);

    expect(wrapper.find(ReviewsTile).exists()).toBe(false);
  })
});