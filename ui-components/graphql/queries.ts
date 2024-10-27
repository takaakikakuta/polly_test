/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCameraPointData = /* GraphQL */ `
  query GetCameraPointData($id: ID!) {
    getCameraPointData(id: $id) {
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
export const getDemoData = /* GraphQL */ `
  query GetDemoData($id: ID!) {
    getDemoData(id: $id) {
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
export const getItemData = /* GraphQL */ `
  query GetItemData($id: ID!) {
    getItemData(id: $id) {
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
export const getMapData = /* GraphQL */ `
  query GetMapData($id: ID!) {
    getMapData(id: $id) {
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
export const getNavigation = /* GraphQL */ `
  query GetNavigation($id: ID!) {
    getNavigation(id: $id) {
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
export const getProjectData = /* GraphQL */ `
  query GetProjectData($id: ID!) {
    getProjectData(id: $id) {
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
export const getProjectDataNavigation = /* GraphQL */ `
  query GetProjectDataNavigation($id: ID!) {
    getProjectDataNavigation(id: $id) {
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
export const getRoomData = /* GraphQL */ `
  query GetRoomData($id: ID!) {
    getRoomData(id: $id) {
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
export const listCameraPointData = /* GraphQL */ `
  query ListCameraPointData(
    $filter: ModelCameraPointDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCameraPointData(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        cameraRadian
        createdAt
        id
        image
        radian
        slug
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listDemoData = /* GraphQL */ `
  query ListDemoData(
    $filter: ModelDemoDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDemoData(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const listItemData = /* GraphQL */ `
  query ListItemData(
    $filter: ModelItemDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItemData(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const listMapData = /* GraphQL */ `
  query ListMapData(
    $filter: ModelMapDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMapData(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
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
        order
        src
        templateId
        text
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listProjectData = /* GraphQL */ `
  query ListProjectData(
    $filter: ModelProjectDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProjectData(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        createdAt
        id
        projectName
        templateId
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listProjectDataNavigations = /* GraphQL */ `
  query ListProjectDataNavigations(
    $filter: ModelProjectDataNavigationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProjectDataNavigations(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        NavigationId
        ProjectDataId
        createdAt
        id
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
      nextToken
      __typename
    }
  }
`;
