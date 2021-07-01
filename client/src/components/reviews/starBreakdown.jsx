import React from 'react'
import Bar from './bar.jsx';
import RemoveAllFilters from './removeAllFilters.jsx'

const StarBreakdown = ({ totalReviews, filterReviews, selectedFilters, removeFilters, removedAllFilters }) => {
  let stars = [5, 4, 3, 2, 1];

  return (
    <div className='reviews-ratings-breakdown-star'>
      <div>
        Filters applied:  {
          selectedFilters.length === 0 ? 0 :
          <div>
            {
              selectedFilters.sort().map((filter, idx, list) => {
                if (idx === list.length - 1) {
                  return `${filter} stars`
                }
                return `${filter} stars, `
              })
            }
            <div>
              <RemoveAllFilters removeFilters={removeFilters}/>
            </div>

          </div>
        }
      </div>

      {
        stars.map((star, idx) => {
          let filteredReviews = totalReviews.filter((review) => review.rating === star)
          let fillPercentage;
          if (filteredReviews.length === 0) {
            fillPercentage = 0;
          } else {
            fillPercentage = Math.round((filteredReviews.length / totalReviews.length) * 100)
          }
          // console.log('filtered', filteredReviews, 'fill', fillPercentage)

          return <Bar key={idx} star={star} noOfStarReviews={filteredReviews.length} fill={fillPercentage} filterReviews={filterReviews} removedAllFilters={removedAllFilters}/>
        })
      }
    </div>
  )
}

export default StarBreakdown;
