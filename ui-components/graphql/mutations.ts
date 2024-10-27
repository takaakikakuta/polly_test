/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const convertTextToSpeech = /* GraphQL */ `
  mutation ConvertTextToSpeech($text: String!) {
    convertTextToSpeech(text: $text)
  }
`;
export const createCameraPointData = /* GraphQL */ `
  mutation CreateCameraPointData(
    $condition: ModelCameraPointDataConditionInput
    $input: CreateCameraPointDataInput!
  ) {
    createCameraPointData(condition: $condition, input: $input) {
      cameraRadian
      createdAt
      id
      image
      radian
      slug
      updatedAt
      __typename
    }
  }
`;
export const createDemoData = /* GraphQL */ `
  mutation CreateDemoData(
    $condition: ModelDemoDataConditionInput
    $input: CreateDemoDataInput!
  ) {
    createDemoData(condition: $condition, input: $input) {
      Navigations
      createdAt
      id
      template
      templateName
      thumbnail
      updatedAt
      videos
      __typename
    }
  }
`;
export const createItemData = /* GraphQL */ `
  mutation CreateItemData(
    $condition: ModelItemDataConditionInput
    $input: CreateItemDataInput!
  ) {
    createItemData(condition: $condition, input: $input) {
      Navigations
      createdAt
      id
      template
      templateName
      thumbnail
      updatedAt
      videos
      __typename
    }
  }
`;
export const createMapData = /* GraphQL */ `
  mutation CreateMapData(
    $condition: ModelMapDataConditionInput
    $input: CreateMapDataInput!
  ) {
    createMapData(condition: $condition, input: $input) {
      DemoList
      ItemList
      RoomList
      createdAt
      id
      selectView
      template
      templateName
      thumbnail
      updatedAt
      __typename
    }
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
      order
      projectDatas {
        nextToken
        __typename
      }
      src
      templateId
      text
      updatedAt
      __typename
    }
  }
`;
export const createProjectData = /* GraphQL */ `
  mutation CreateProjectData(
    $condition: ModelProjectDataConditionInput
    $input: CreateProjectDataInput!
  ) {
    createProjectData(condition: $condition, input: $input) {
      Navigations {
        nextToken
        __typename
      }
      createdAt
      id
      projectName
      templateId
      updatedAt
      __typename
    }
  }
`;
export const createProjectDataNavigation = /* GraphQL */ `
  mutation CreateProjectDataNavigation(
    $condition: ModelProjectDataNavigationConditionInput
    $input: CreateProjectDataNavigationInput!
  ) {
    createProjectDataNavigation(condition: $condition, input: $input) {
      Navigation {
        createdAt
        id
        order
        src
        templateId
        text
        updatedAt
        __typename
      }
      NavigationId
      ProjectData {
        createdAt
        id
        projectName
        templateId
        updatedAt
        __typename
      }
      ProjectDataId
      createdAt
      id
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
      CameraPointList
      Navigations
      createdAt
      id
      model
      template
      templateName
      thumbnail
      updatedAt
      videos
      __typename
    }
  }
`;
export const deleteCameraPointData = /* GraphQL */ `
  mutation DeleteCameraPointData(
    $condition: ModelCameraPointDataConditionInput
    $input: DeleteCameraPointDataInput!
  ) {
    deleteCameraPointData(condition: $condition, input: $input) {
      cameraRadian
      createdAt
      id
      image
      radian
      slug
      updatedAt
      __typename
    }
  }
`;
export const deleteDemoData = /* GraphQL */ `
  mutation DeleteDemoData(
    $condition: ModelDemoDataConditionInput
    $input: DeleteDemoDataInput!
  ) {
    deleteDemoData(condition: $condition, input: $input) {
      Navigations
      createdAt
      id
      template
      templateName
      thumbnail
      updatedAt
      videos
      __typename
    }
  }
`;
export const deleteItemData = /* GraphQL */ `
  mutation DeleteItemData(
    $condition: ModelItemDataConditionInput
    $input: DeleteItemDataInput!
  ) {
    deleteItemData(condition: $condition, input: $input) {
      Navigations
      createdAt
      id
      template
      templateName
      thumbnail
      updatedAt
      videos
      __typename
    }
  }
`;
export const deleteMapData = /* GraphQL */ `
  mutation DeleteMapData(
    $condition: ModelMapDataConditionInput
    $input: DeleteMapDataInput!
  ) {
    deleteMapData(condition: $condition, input: $input) {
      DemoList
      ItemList
      RoomList
      createdAt
      id
      selectView
      template
      templateName
      thumbnail
      updatedAt
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
      order
      projectDatas {
        nextToken
        __typename
      }
      src
      templateId
      text
      updatedAt
      __typename
    }
  }
`;
export const deleteProjectData = /* GraphQL */ `
  mutation DeleteProjectData(
    $condition: ModelProjectDataConditionInput
    $input: DeleteProjectDataInput!
  ) {
    deleteProjectData(condition: $condition, input: $input) {
      Navigations {
        nextToken
        __typename
      }
      createdAt
      id
      projectName
      templateId
      updatedAt
      __typename
    }
  }
`;
export const deleteProjectDataNavigation = /* GraphQL */ `
  mutation DeleteProjectDataNavigation(
    $condition: ModelProjectDataNavigationConditionInput
    $input: DeleteProjectDataNavigationInput!
  ) {
    deleteProjectDataNavigation(condition: $condition, input: $input) {
      Navigation {
        createdAt
        id
        order
        src
        templateId
        text
        updatedAt
        __typename
      }
      NavigationId
      ProjectData {
        createdAt
        id
        projectName
        templateId
        updatedAt
        __typename
      }
      ProjectDataId
      createdAt
      id
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
      CameraPointList
      Navigations
      createdAt
      id
      model
      template
      templateName
      thumbnail
      updatedAt
      videos
      __typename
    }
  }
`;
export const updateCameraPointData = /* GraphQL */ `
  mutation UpdateCameraPointData(
    $condition: ModelCameraPointDataConditionInput
    $input: UpdateCameraPointDataInput!
  ) {
    updateCameraPointData(condition: $condition, input: $input) {
      cameraRadian
      createdAt
      id
      image
      radian
      slug
      updatedAt
      __typename
    }
  }
`;
export const updateDemoData = /* GraphQL */ `
  mutation UpdateDemoData(
    $condition: ModelDemoDataConditionInput
    $input: UpdateDemoDataInput!
  ) {
    updateDemoData(condition: $condition, input: $input) {
      Navigations
      createdAt
      id
      template
      templateName
      thumbnail
      updatedAt
      videos
      __typename
    }
  }
`;
export const updateItemData = /* GraphQL */ `
  mutation UpdateItemData(
    $condition: ModelItemDataConditionInput
    $input: UpdateItemDataInput!
  ) {
    updateItemData(condition: $condition, input: $input) {
      Navigations
      createdAt
      id
      template
      templateName
      thumbnail
      updatedAt
      videos
      __typename
    }
  }
`;
export const updateMapData = /* GraphQL */ `
  mutation UpdateMapData(
    $condition: ModelMapDataConditionInput
    $input: UpdateMapDataInput!
  ) {
    updateMapData(condition: $condition, input: $input) {
      DemoList
      ItemList
      RoomList
      createdAt
      id
      selectView
      template
      templateName
      thumbnail
      updatedAt
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
      order
      projectDatas {
        nextToken
        __typename
      }
      src
      templateId
      text
      updatedAt
      __typename
    }
  }
`;
export const updateProjectData = /* GraphQL */ `
  mutation UpdateProjectData(
    $condition: ModelProjectDataConditionInput
    $input: UpdateProjectDataInput!
  ) {
    updateProjectData(condition: $condition, input: $input) {
      Navigations {
        nextToken
        __typename
      }
      createdAt
      id
      projectName
      templateId
      updatedAt
      __typename
    }
  }
`;
export const updateProjectDataNavigation = /* GraphQL */ `
  mutation UpdateProjectDataNavigation(
    $condition: ModelProjectDataNavigationConditionInput
    $input: UpdateProjectDataNavigationInput!
  ) {
    updateProjectDataNavigation(condition: $condition, input: $input) {
      Navigation {
        createdAt
        id
        order
        src
        templateId
        text
        updatedAt
        __typename
      }
      NavigationId
      ProjectData {
        createdAt
        id
        projectName
        templateId
        updatedAt
        __typename
      }
      ProjectDataId
      createdAt
      id
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
      CameraPointList
      Navigations
      createdAt
      id
      model
      template
      templateName
      thumbnail
      updatedAt
      videos
      __typename
    }
  }
`;
