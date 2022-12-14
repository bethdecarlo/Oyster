import { gql } from "@apollo/client";

// Query single user
export const QUERY_USER = gql`
query user($userId: ID!) {
  user(userId: $userId) {
    _id
    username
    email

  }
}
`;

// collections {
//   _id
//   name
//   address
// }

// Query Trending collections by Volume
export const QUERY_TRENDING_COLLECTIONS = gql`
query TrendingCollections {
  trendingCollections(orderBy: VOLUME, orderDirection: DESC) {
    edges {
      node {
        address
        ... on ERC721Contract {
          name
          stats {
            totalSales
            average
            ceiling
            floor
            volume
          }
          symbol
          unsafeOpenseaImageUrl
        }
      }
    }
    pageInfo {
      endCursor
    }
  }
}`;

// Query Single Collection STATS LAST 24 HORUS
export const QUERY_SINGLE_COLLECTION = gql`
query CollectionStats($address: String!) {
  contract(address: $address) {
    ... on ERC721Contract {
      stats {
        floor
        volume
        totalSales
        ceiling
        average
      }
      circulatingSupply
      name
      symbol
      tokenStandard
      unsafeOpenseaDescription
      unsafeOpenseaExternalUrl
      unsafeOpenseaImageUrl
    }
    address
  }
}`;

// Query to get custom search by Time period and order
export const QUERY_COLLECTIONS_WITH_VARS = gql`
query TrendingCollections($timePeriod: TrendingCollectionsTimePeriodEnum, $orderBy: TrendingCollectionsOrderByEnum, $first: Int) {
  trendingCollections(timePeriod: $timePeriod, orderBy: $orderBy, first: $first) {
    edges {
      node {
        ... on ERC721Contract {
          name
          address
          symbol
          unsafeOpenseaImageUrl
          stats {
            totalSales
            volume
            floor
            average
          }
        }
      }
    }
  }
}`;

// Query single collection log 
export const QUERY_SINGLE_COLLECTION_LOG = gql`
query Logs($address: String!) {
  contract(address: $address) {
    logs {
      edges {
        node {
          type
          token {
            ... on ERC721Token {
              tokenId
              images {
                url
              }
            }

          }
          ... on OrderLog {
            priceInEth
            estimatedConfirmedAt
          }
        }
      }
    }
  }
}`;

// query logged in user
export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;

// collections {
//   _id
//   name
//   address
// }


// landing page query with logs 
export const QUERY_TRENDING_WITH_LOGS = gql`
query TrendingCollections($first: Int, $orderBy: TrendingCollectionsOrderByEnum, $timePeriod: TrendingCollectionsTimePeriodEnum, $logsFirst2: Int) {
  trendingCollections(first: $first, orderBy: $orderBy, timePeriod: $timePeriod) {
    edges {
      node {
        ... on ERC721Contract {
          address
          name
          symbol
          unsafeOpenseaImageUrl
          stats {
            volume
            totalSales
            floor
            average
          }
          logs(first: $logsFirst2) {
            edges {
              node {
                type
                estimatedConfirmedAt
                ... on OrderLog {
                  priceInEth
                  token {
                    ... on ERC721Token {
                      images {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`;
