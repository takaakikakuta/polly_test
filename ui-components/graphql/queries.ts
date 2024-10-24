/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNavigation = /* GraphQL */ `
  query GetNavigation($id: ID!) {
    getNavigation(id: $id) {
      createdAt
      id
      text
      updatedAt
      __typename
    }
  }
`;
export const getRoomData = /* GraphQL */ `
  query GetRoomData($id: ID!) {
    getRoomData(id: $id) {
      createdAt
      id
      template
      templateName
      thumbnail
      type
      updatedAt
      videos
      __typename
    }
  }
`;
export const listNavigations = /* GraphQL */ `
  query ListNavigations(
    $filter: ModelNavigationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNavigations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        createdAt
        id
        text
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listRoomData = /* GraphQL */ `
  query ListRoomData(
    $filter: ModelRoomDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRoomData(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        createdAt
        id
        template
        templateName
        thumbnail
        type
        updatedAt
        videos
        __typename
      }
      nextToken
      __typename
    }
  }
`;
