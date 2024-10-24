/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateNavigation = /* GraphQL */ `
  subscription OnCreateNavigation(
    $filter: ModelSubscriptionNavigationFilterInput
  ) {
    onCreateNavigation(filter: $filter) {
      createdAt
      id
      text
      updatedAt
      __typename
    }
  }
`;
export const onCreateRoomData = /* GraphQL */ `
  subscription OnCreateRoomData($filter: ModelSubscriptionRoomDataFilterInput) {
    onCreateRoomData(filter: $filter) {
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
export const onDeleteNavigation = /* GraphQL */ `
  subscription OnDeleteNavigation(
    $filter: ModelSubscriptionNavigationFilterInput
  ) {
    onDeleteNavigation(filter: $filter) {
      createdAt
      id
      text
      updatedAt
      __typename
    }
  }
`;
export const onDeleteRoomData = /* GraphQL */ `
  subscription OnDeleteRoomData($filter: ModelSubscriptionRoomDataFilterInput) {
    onDeleteRoomData(filter: $filter) {
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
export const onUpdateNavigation = /* GraphQL */ `
  subscription OnUpdateNavigation(
    $filter: ModelSubscriptionNavigationFilterInput
  ) {
    onUpdateNavigation(filter: $filter) {
      createdAt
      id
      text
      updatedAt
      __typename
    }
  }
`;
export const onUpdateRoomData = /* GraphQL */ `
  subscription OnUpdateRoomData($filter: ModelSubscriptionRoomDataFilterInput) {
    onUpdateRoomData(filter: $filter) {
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
