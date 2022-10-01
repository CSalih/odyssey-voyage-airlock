const { AuthenticationError, ForbiddenError } = require('apollo-server');
const authErrMessage = '*** you must be logged in ***';

const resolvers = {
  Mutation: {
    submitGuestReview: async (_, {bookingId, guestReview}, {dataSources, userId}) => {
      if (!userId) throw new AuthenticationError(authErrMessage);

      const {rating, text} = guestReview;
      const guestId = await dataSources.bookingsDb.getGuestIdForBooking(bookingId);

      const createdReview = await dataSources.reviewsDb.createReviewForGuest({
        bookingId,
        guestId,
        authorId: userId,
        text,
        rating,
      });
      return {
        code: 200,
        success: true,
        message: 'Successfully submitted review for guest',
        guestReview: createdReview,
      };
    },
    submitHostAndLocationReviews: async (_, {bookingId, hostReview, locationReview}, {dataSources, userId}) => {
      if (!userId) throw new AuthenticationError(authErrMessage);

      const listingId = await dataSources.bookingsDb.getListingIdForBooking(bookingId);
      const createdLocationReview = await dataSources.reviewsDb.createReviewForListing({
        bookingId,
        listingId,
        authorId: userId,
        text: locationReview.text,
        rating: locationReview.rating,
      });

      const {hostId} = await dataSources.listingsAPI.getListing(listingId);
      const createdHostReview = await dataSources.reviewsDb.createReviewForHost({
        bookingId,
        hostId,
        authorId: userId,
        text: hostReview.text,
        rating: hostReview.rating,
      });

      return {
        code: 200,
        success: true,
        message: 'Successfully submitted review for host and location',
        hostReview: createdHostReview,
        locationReview: createdLocationReview,
      };
    },
  },
  Host: {
    overallRating: ({id}, _, {dataSources}) => {
      return dataSources.reviewsDb.getOverallRatingForHost(id);
    },
  },
  Review: {
    __resolveReference: ({id}, {dataSources}) => {
      return dataSources.reviewsDb.getListing(id);
    },
    author: (review) => {
      const author = {
        __typename: "Host",
        id: review.authorId
      };
      if (review.targetType === 'LISTING' || review.targetType === 'HOST') {
        author.__typename = 'Guest';
      }
      return author;
    },
  },
  Listing: {
    overallRating: ({id}, _, {dataSources}) => {
      return dataSources.reviewsDb.getOverallRatingForListing(id);
    },
    reviews: ({id}, _, {dataSources}) => {
      return dataSources.reviewsDb.getReviewsForListing(id);
    },
  },
  Booking: {
    guestReview: ({id}, _, {dataSources}) => {
      return dataSources.reviewsDb.getReviewForBooking('GUEST', id);
    },
    hostReview: ({id}, _, {dataSources}) => {
      return dataSources.reviewsDb.getReviewForBooking('HOST', id);
    },
    locationReview: ({id}, _, {dataSources}) => {
      return dataSources.reviewsDb.getReviewForBooking('LISTING', id);
    },
  }
};

module.exports = resolvers;
