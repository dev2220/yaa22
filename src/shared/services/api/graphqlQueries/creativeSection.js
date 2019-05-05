import gql from 'graphql-tag';

export const VIDEO_THUMBNAILS_QUERY = gql`
  query VideoThumbnails($videoId: ID!) {
    videoThumbnails(videoId: $videoId) {
      id
      name
      url
    }
  }
`;
