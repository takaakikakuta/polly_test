/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const convertTextToSpeech = /* GraphQL */ `
  mutation ConvertTextToSpeech($text: String!) {
    convertTextToSpeech(text: $text)
  }
`;
export const createNavigation = /* GraphQL */ `
  mutation CreateNavigation(
    $condition: ModelNavigationConditionInput
    $input: CreateNavigationInput!
  ) {
    createNavigation(condition: $condition, input: $input) {
      createdAt
      id
      text
      updatedAt
      __typename
    }
  }
`;
export const createRoomData = /* GraphQL */ `
  mutation CreateRoomData(
    $condition: ModelRoomDataConditionInput
    $input: CreateRoomDataInput!
  ) {
    createRoomData(condition: $condition, input: $input) {
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
export const deleteNavigation = /* GraphQL */ `
  mutation DeleteNavigation(
    $condition: ModelNavigationConditionInput
    $input: DeleteNavigationInput!
  ) {
    deleteNavigation(condition: $condition, input: $input) {
      createdAt
      id
      text
      updatedAt
      __typename
    }
  }
`;
export const deleteRoomData = /* GraphQL */ `
  mutation DeleteRoomData(
    $condition: ModelRoomDataConditionInput
    $input: DeleteRoomDataInput!
  ) {
    deleteRoomData(condition: $condition, input: $input) {
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
export const updateNavigation = /* GraphQL */ `
  mutation UpdateNavigation(
    $condition: ModelNavigationConditionInput
    $input: UpdateNavigationInput!
  ) {
    updateNavigation(condition: $condition, input: $input) {
      createdAt
      id
      text
      updatedAt
      __typename
    }
  }
`;
export const updateRoomData = /* GraphQL */ `
  mutation UpdateRoomData(
    $condition: ModelRoomDataConditionInput
    $input: UpdateRoomDataInput!
  ) {
    updateRoomData(condition: $condition, input: $input) {
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
