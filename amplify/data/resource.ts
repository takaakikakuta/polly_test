import {
  type ClientSchema,
  a,
  defineData,
  defineFunction,
} from "@aws-amplify/backend";
import {listUsers} from "../data/list-users/resource";
import { addUserToGroup } from "../data/add-user-to-group/resource"

export const convertTextToSpeech = defineFunction({
  entry: "./convertTextToSpeech.ts",
});

const schema = a.schema({
  ViewSetting: a.enum([
    'ThreesixoView',
    'MapView',
    'MapVideoView',
    'MonoView',
    'MultiAngleView',
    'PathView',
    'SyncView'
  ]),

  ProjectData:a
    .model({
      projectName:a.string(),
      templateId:a.string(),
      Navigations: a.hasMany('ProjectDataNavigation', 'ProjectDataId'),
    })
    .authorization(allow => [allow.ownerDefinedIn('tenantId').identityClaim('custom:tenantId')]),

  MapData:a
    .model({
      template:a.ref('ViewSetting'),
      templateName:a.string(),
      selectView:a.ref('ViewSetting'),
      thumbnail:a.string(),
      RoomList:a.string().array(),
      DemoList:a.string().array(),
      ItemList:a.string().array(),
      tenantId: a.string(),
    })
    .authorization(allow => [allow.ownerDefinedIn('tenantId').identityClaim('custom:tenantId')]),

  RoomData:a
    .model({
      template:a.ref('ViewSetting'),
      templateName:a.string(),
      thumbnail:a.string(),
      model:a.string(),
      videos:a.string().array(),
      CameraPointList:a.string().array(),
      Navigations:a.string()
    })
    .authorization(allow => [allow.ownerDefinedIn('tenantId').identityClaim('custom:tenantId')]),

  DemoData:a
    .model({
      template:a.ref('ViewSetting'),
      templateName:a.string(),
      thumbnail:a.string(),
      videos:a.string().array(),
      Navigations:a.string().array()
    })
    .authorization(allow => [allow.ownerDefinedIn('tenantId').identityClaim('custom:tenantId')]),

  ItemData:a
    .model({
      template:a.string(),
      templateName:a.string(),
      thumbnail:a.string(),
      videos:a.string().array(),
      Navigations:a.string().array()
    })
    .authorization(allow => [allow.ownerDefinedIn('tenantId').identityClaim('custom:tenantId')]),

  CameraPointData:a
    .model({
      slug:a.string(),
      radian:a.integer(),
      image:a.string(),
      cameraRadian:a.integer(),
    })
    .authorization(allow => [allow.ownerDefinedIn('tenantId').identityClaim('custom:tenantId')]),

  Navigation: a
    .model({
      templateId:a.id(),
      order:a.integer(),
      text: a.string(),
      src:a.string(),
      projectDatas: a.hasMany('ProjectDataNavigation', 'NavigationId'),
    })
    .authorization(allow => [allow.ownerDefinedIn('tenantId').identityClaim('custom:tenantId')]),

  ProjectDataNavigation: a
    .model({
      ProjectDataId: a.id().required(),
      NavigationId: a.id().required(),
      ProjectData: a.belongsTo('ProjectData', 'ProjectDataId'),
      Navigation: a.belongsTo('Navigation', 'NavigationId'),
    })
    .authorization(allow => [allow.ownerDefinedIn('tenantId').identityClaim('custom:tenantId')]),

  convertTextToSpeech: a
    .mutation()
    .arguments({
      text: a.string().required(),
    })
    .returns(a.string().required())
    .authorization(allow => [allow.publicApiKey()])
    .handler(a.handler.function(convertTextToSpeech)),

  User: a.customType({
    Enabled: a.boolean(),
    UserCreateDate: a.datetime(),
    UserLastModifiedDate: a.datetime(),
    UserStatus: a.string(),
    Username: a.string(),
    Email: a.string(),
    Groups:a.string().array()
  }),

  UsersResponse: a.customType({
    users: a.ref('User').array(),
  }),

  listUsers: a
  .query()
  .returns(a.ref("UsersResponse")) // UsersResponse型の返り値
  .authorization(allow => [allow.publicApiKey()])
  .handler(a.handler.function(listUsers)),


  addUserToGroup: a
    .mutation()
    .arguments({
      userId: a.string().required(),
      groupName: a.string().required(),
    })
    // .authorization((allow) => [allow.group("ADMINS")])
    .authorization(allow => [allow.publicApiKey()])
    .handler(a.handler.function(addUserToGroup))
    .returns(a.json())
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool'
  },
});