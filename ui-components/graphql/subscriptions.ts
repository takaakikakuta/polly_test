/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCameraPointData = /* GraphQL */ `
  subscription OnCreateCameraPointData(
    $filter: ModelSubscriptionCameraPointDataFilterInput
  ) {
    onCreateCameraPointData(filter: $filter) {
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
export const onCreateDemoData = /* GraphQL */ `
  subscription OnCreateDemoData($filter: ModelSubscriptionDemoDataFilterInput) {
    onCreateDemoData(filter: $filter) {
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
export const onCreateItemData = /* GraphQL */ `
  subscription OnCreateItemData($filter: ModelSubscriptionItemDataFilterInput) {
    onCreateItemData(filter: $filter) {
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
export const onCreateMapData = /* GraphQL */ `
  subscription OnCreateMapData($filter: ModelSubscriptionMapDataFilterInput) {
    onCreateMapData(filter: $filter) {
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
export const onCreateNavigation = /* GraphQL */ `
  subscription OnCreateNavigation(
    $filter: ModelSubscriptionNavigationFilterInput
  ) {
    onCreateNavigation(filter: $filter) {
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
export const onCreateProjectData = /* GraphQL */ `
  subscription OnCreateProjectData(
    $filter: ModelSubscriptionProjectDataFilterInput
  ) {
    onCreateProjectData(filter: $filter) {
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
export const onCreateProjectDataNavigation = /* GraphQL */ `
  subscription OnCreateProjectDataNavigation(
    $filter: ModelSubscriptionProjectDataNavigationFilterInput
  ) {
    onCreateProjectDataNavigation(filter: $filter) {
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
export const onCreateRoomData = /* GraphQL */ `
  subscription OnCreateRoomData($filter: ModelSubscriptionRoomDataFilterInput) {
    onCreateRoomData(filter: $filter) {
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
export const onDeleteCameraPointData = /* GraphQL */ `
  subscription OnDeleteCameraPointData(
    $filter: ModelSubscriptionCameraPointDataFilterInput
  ) {
    onDeleteCameraPointData(filter: $filter) {
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
export const onDeleteDemoData = /* GraphQL */ `
  subscription OnDeleteDemoData($filter: ModelSubscriptionDemoDataFilterInput) {
    onDeleteDemoData(filter: $filter) {
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
export const onDeleteItemData = /* GraphQL */ `
  subscription OnDeleteItemData($filter: ModelSubscriptionItemDataFilterInput) {
    onDeleteItemData(filter: $filter) {
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
export const onDeleteMapData = /* GraphQL */ `
  subscription OnDeleteMapData($filter: ModelSubscriptionMapDataFilterInput) {
    onDeleteMapData(filter: $filter) {
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
export const onDeleteNavigation = /* GraphQL */ `
  subscription OnDeleteNavigation(
    $filter: ModelSubscriptionNavigationFilterInput
  ) {
    onDeleteNavigation(filter: $filter) {
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
export const onDeleteProjectData = /* GraphQL */ `
  subscription OnDeleteProjectData(
    $filter: ModelSubscriptionProjectDataFilterInput
  ) {
    onDeleteProjectData(filter: $filter) {
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
export const onDeleteProjectDataNavigation = /* GraphQL */ `
  subscription OnDeleteProjectDataNavigation(
    $filter: ModelSubscriptionProjectDataNavigationFilterInput
  ) {
    onDeleteProjectDataNavigation(filter: $filter) {
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
export const onDeleteRoomData = /* GraphQL */ `
  subscription OnDeleteRoomData($filter: ModelSubscriptionRoomDataFilterInput) {
    onDeleteRoomData(filter: $filter) {
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
export const onUpdateCameraPointData = /* GraphQL */ `
  subscription OnUpdateCameraPointData(
    $filter: ModelSubscriptionCameraPointDataFilterInput
  ) {
    onUpdateCameraPointData(filter: $filter) {
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
export const onUpdateDemoData = /* GraphQL */ `
  subscription OnUpdateDemoData($filter: ModelSubscriptionDemoDataFilterInput) {
    onUpdateDemoData(filter: $filter) {
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
export const onUpdateItemData = /* GraphQL */ `
  subscription OnUpdateItemData($filter: ModelSubscriptionItemDataFilterInput) {
    onUpdateItemData(filter: $filter) {
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
export const onUpdateMapData = /* GraphQL */ `
  subscription OnUpdateMapData($filter: ModelSubscriptionMapDataFilterInput) {
    onUpdateMapData(filter: $filter) {
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
export const onUpdateNavigation = /* GraphQL */ `
  subscription OnUpdateNavigation(
    $filter: ModelSubscriptionNavigationFilterInput
  ) {
    onUpdateNavigation(filter: $filter) {
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
export const onUpdateProjectData = /* GraphQL */ `
  subscription OnUpdateProjectData(
    $filter: ModelSubscriptionProjectDataFilterInput
  ) {
    onUpdateProjectData(filter: $filter) {
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
export const onUpdateProjectDataNavigation = /* GraphQL */ `
  subscription OnUpdateProjectDataNavigation(
    $filter: ModelSubscriptionProjectDataNavigationFilterInput
  ) {
    onUpdateProjectDataNavigation(filter: $filter) {
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
export const onUpdateRoomData = /* GraphQL */ `
  subscription OnUpdateRoomData($filter: ModelSubscriptionRoomDataFilterInput) {
    onUpdateRoomData(filter: $filter) {
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
