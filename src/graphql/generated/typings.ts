/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import { Context } from "./../../context"
import { core, connectionPluginCore } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    datetime<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Date";
    /**
     * Todo id
     */
    todoId<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "TodoId";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    datetime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Date";
    /**
     * Todo id
     */
    todoId<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "TodoId";
    /**
     * Adds a Relay-style connection to the type, with numerous options for configuration
     *
     * @see https://nexusjs.org/docs/plugins/connection
     */
    connectionField<FieldName extends string>(
      fieldName: FieldName,
      config: connectionPluginCore.ConnectionFieldConfig<TypeName, FieldName>
    ): void
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  CreateOptionInput: { // input type
    text: string; // String!
  }
  CreateQuestionInput: { // input type
    options?: Array<NexusGenInputs['CreateOptionInput'] | null> | null; // [CreateOptionInput]
    required: boolean; // Boolean!
    text: string; // String!
    type: number; // Int!
  }
  CreateQuestionnaireInput: { // input type
    description: string; // String!
    endAt: NexusGenScalars['DateTime']; // DateTime!
    questions?: Array<NexusGenInputs['CreateQuestionInput'] | null> | null; // [CreateQuestionInput]
    startAt: NexusGenScalars['DateTime']; // DateTime!
    state?: number | null; // Int
    title: string; // String!
  }
  CreateTodoInput: { // input type
    task: string; // String!
  }
  DeleteQuestionnaireInput: { // input type
    id: number; // Int!
  }
  UpdateOptionInput: { // input type
    id?: number | null; // Int
    text?: string | null; // String
  }
  UpdateQuestionInput: { // input type
    id?: number | null; // Int
    options?: Array<NexusGenInputs['UpdateOptionInput'] | null> | null; // [UpdateOptionInput]
    required?: boolean | null; // Boolean
    text?: string | null; // String
    type?: number | null; // Int
  }
  UpdateQuestionnaireInput: { // input type
    description?: string | null; // String
    endAt?: NexusGenScalars['DateTime'] | null; // DateTime
    id: number; // Int!
    questions?: Array<NexusGenInputs['UpdateQuestionInput'] | null> | null; // [UpdateQuestionInput]
    startAt?: NexusGenScalars['DateTime'] | null; // DateTime
    state?: number | null; // Int
    title?: string | null; // String
  }
  UpdateTodoInput: { // input type
    finishedAt?: NexusGenScalars['DateTime'] | null; // DateTime
    id: NexusGenScalars['TodoId']; // TodoId!
    task: string; // String!
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  Date: Date
  DateTime: Date
  TodoId: number
}

export interface NexusGenObjects {
  CancelToDeleteQuestionnairePayload: { // root type
    questionnaire?: NexusGenRootTypes['Questionnaire'] | null; // Questionnaire
  }
  Comment: { // root type
    body: string; // String!
    email: string; // String!
    id: number; // Int!
    name: string; // String!
    postId: number; // Int!
  }
  CreateQuestionnairePayload: { // root type
    questionnaire?: NexusGenRootTypes['Questionnaire'] | null; // Questionnaire
  }
  CreateTodoPayload: { // root type
    todo?: NexusGenRootTypes['Todo'] | null; // Todo
  }
  DeleteQuestionnairePayload: { // root type
    id?: number | null; // Int
    result?: boolean | null; // Boolean
  }
  DeleteTodoPayload: { // root type
    id?: NexusGenScalars['TodoId'] | null; // TodoId
    result?: boolean | null; // Boolean
  }
  Mutation: {};
  Option: { // root type
    id: number; // Int!
    text: string; // String!
  }
  PageInfo: { // root type
    endCursor?: string | null; // String
    hasNextPage: boolean; // Boolean!
    hasPreviousPage: boolean; // Boolean!
    startCursor?: string | null; // String
  }
  Post: { // root type
    body: string; // String!
    id: number; // Int!
    title: string; // String!
    userId: number; // Int!
  }
  PostEdge: { // root type
    cursor: string; // String!
    node: NexusGenRootTypes['Post']; // Post!
  }
  Query: {};
  QueryPostConnection_Connection: { // root type
    edges: NexusGenRootTypes['PostEdge'][]; // [PostEdge!]!
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  QueryQuestionnaireConnection_Connection: { // root type
    edges: NexusGenRootTypes['QuestionnaireEdge'][]; // [QuestionnaireEdge!]!
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  QueryTodoConnection_Connection: { // root type
    edges: NexusGenRootTypes['TodoEdge'][]; // [TodoEdge!]!
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  Question: { // root type
    id: number; // Int!
    text: string; // String!
    type: number; // Int!
  }
  Questionnaire: { // root type
    description: string; // String!
    endAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    questions: Array<NexusGenRootTypes['Question'] | null>; // [Question]!
    startAt: NexusGenScalars['DateTime']; // DateTime!
    state: number; // Int!
    title: string; // String!
  }
  QuestionnaireEdge: { // root type
    cursor: string; // String!
    node: NexusGenRootTypes['Questionnaire']; // Questionnaire!
  }
  Todo: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    finishedAt?: NexusGenScalars['DateTime'] | null; // DateTime
    id: NexusGenScalars['TodoId']; // TodoId!
    task: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  TodoEdge: { // root type
    cursor: string; // String!
    node: NexusGenRootTypes['Todo']; // Todo!
  }
  UpdateQuestionnairePayload: { // root type
    questionnaire?: NexusGenRootTypes['Questionnaire'] | null; // Questionnaire
  }
  UpdateTodoPayload: { // root type
    todo?: NexusGenRootTypes['Todo'] | null; // Todo
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  CancelToDeleteQuestionnairePayload: { // field return type
    questionnaire: NexusGenRootTypes['Questionnaire'] | null; // Questionnaire
  }
  Comment: { // field return type
    body: string; // String!
    email: string; // String!
    id: number; // Int!
    name: string; // String!
    postId: number; // Int!
  }
  CreateQuestionnairePayload: { // field return type
    questionnaire: NexusGenRootTypes['Questionnaire'] | null; // Questionnaire
  }
  CreateTodoPayload: { // field return type
    todo: NexusGenRootTypes['Todo'] | null; // Todo
  }
  DeleteQuestionnairePayload: { // field return type
    id: number | null; // Int
    result: boolean | null; // Boolean
  }
  DeleteTodoPayload: { // field return type
    id: NexusGenScalars['TodoId'] | null; // TodoId
    result: boolean | null; // Boolean
  }
  Mutation: { // field return type
    cancelToDeleteQuestionnaire: NexusGenRootTypes['CancelToDeleteQuestionnairePayload'] | null; // CancelToDeleteQuestionnairePayload
    createQuestionnaire: NexusGenRootTypes['CreateQuestionnairePayload'] | null; // CreateQuestionnairePayload
    createTodo: NexusGenRootTypes['CreateTodoPayload'] | null; // CreateTodoPayload
    deleteQuestionnaire: NexusGenRootTypes['DeleteQuestionnairePayload'] | null; // DeleteQuestionnairePayload
    deleteTodo: NexusGenRootTypes['DeleteTodoPayload'] | null; // DeleteTodoPayload
    updateQuestionnaire: NexusGenRootTypes['UpdateQuestionnairePayload'] | null; // UpdateQuestionnairePayload
    updateTodo: NexusGenRootTypes['UpdateTodoPayload'] | null; // UpdateTodoPayload
  }
  Option: { // field return type
    id: number; // Int!
    text: string; // String!
  }
  PageInfo: { // field return type
    endCursor: string | null; // String
    hasNextPage: boolean; // Boolean!
    hasPreviousPage: boolean; // Boolean!
    startCursor: string | null; // String
  }
  Post: { // field return type
    body: string; // String!
    id: number; // Int!
    title: string; // String!
    userId: number; // Int!
  }
  PostEdge: { // field return type
    cursor: string; // String!
    node: NexusGenRootTypes['Post']; // Post!
  }
  Query: { // field return type
    comments: Array<NexusGenRootTypes['Comment'] | null>; // [Comment]!
    postConnection: NexusGenRootTypes['QueryPostConnection_Connection']; // QueryPostConnection_Connection!
    posts: Array<NexusGenRootTypes['Post'] | null> | null; // [Post]
    questionnaire: NexusGenRootTypes['Questionnaire'] | null; // Questionnaire
    questionnaireConnection: NexusGenRootTypes['QueryQuestionnaireConnection_Connection']; // QueryQuestionnaireConnection_Connection!
    questionnaires: Array<NexusGenRootTypes['Questionnaire'] | null> | null; // [Questionnaire]
    todoConnection: NexusGenRootTypes['QueryTodoConnection_Connection']; // QueryTodoConnection_Connection!
  }
  QueryPostConnection_Connection: { // field return type
    edges: NexusGenRootTypes['PostEdge'][]; // [PostEdge!]!
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
    totalCount: number; // Int!
  }
  QueryQuestionnaireConnection_Connection: { // field return type
    edges: NexusGenRootTypes['QuestionnaireEdge'][]; // [QuestionnaireEdge!]!
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
    totalCount: number; // Int!
  }
  QueryTodoConnection_Connection: { // field return type
    edges: NexusGenRootTypes['TodoEdge'][]; // [TodoEdge!]!
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
    totalCount: number; // Int!
  }
  Question: { // field return type
    id: number; // Int!
    options: Array<NexusGenRootTypes['Option'] | null>; // [Option]!
    text: string; // String!
    type: number; // Int!
  }
  Questionnaire: { // field return type
    description: string; // String!
    endAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    questions: Array<NexusGenRootTypes['Question'] | null>; // [Question]!
    startAt: NexusGenScalars['DateTime']; // DateTime!
    state: number; // Int!
    title: string; // String!
  }
  QuestionnaireEdge: { // field return type
    cursor: string; // String!
    node: NexusGenRootTypes['Questionnaire']; // Questionnaire!
  }
  Todo: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    finishedAt: NexusGenScalars['DateTime'] | null; // DateTime
    id: NexusGenScalars['TodoId']; // TodoId!
    task: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  TodoEdge: { // field return type
    cursor: string; // String!
    node: NexusGenRootTypes['Todo']; // Todo!
  }
  UpdateQuestionnairePayload: { // field return type
    questionnaire: NexusGenRootTypes['Questionnaire'] | null; // Questionnaire
  }
  UpdateTodoPayload: { // field return type
    todo: NexusGenRootTypes['Todo'] | null; // Todo
  }
}

export interface NexusGenFieldTypeNames {
  CancelToDeleteQuestionnairePayload: { // field return type name
    questionnaire: 'Questionnaire'
  }
  Comment: { // field return type name
    body: 'String'
    email: 'String'
    id: 'Int'
    name: 'String'
    postId: 'Int'
  }
  CreateQuestionnairePayload: { // field return type name
    questionnaire: 'Questionnaire'
  }
  CreateTodoPayload: { // field return type name
    todo: 'Todo'
  }
  DeleteQuestionnairePayload: { // field return type name
    id: 'Int'
    result: 'Boolean'
  }
  DeleteTodoPayload: { // field return type name
    id: 'TodoId'
    result: 'Boolean'
  }
  Mutation: { // field return type name
    cancelToDeleteQuestionnaire: 'CancelToDeleteQuestionnairePayload'
    createQuestionnaire: 'CreateQuestionnairePayload'
    createTodo: 'CreateTodoPayload'
    deleteQuestionnaire: 'DeleteQuestionnairePayload'
    deleteTodo: 'DeleteTodoPayload'
    updateQuestionnaire: 'UpdateQuestionnairePayload'
    updateTodo: 'UpdateTodoPayload'
  }
  Option: { // field return type name
    id: 'Int'
    text: 'String'
  }
  PageInfo: { // field return type name
    endCursor: 'String'
    hasNextPage: 'Boolean'
    hasPreviousPage: 'Boolean'
    startCursor: 'String'
  }
  Post: { // field return type name
    body: 'String'
    id: 'Int'
    title: 'String'
    userId: 'Int'
  }
  PostEdge: { // field return type name
    cursor: 'String'
    node: 'Post'
  }
  Query: { // field return type name
    comments: 'Comment'
    postConnection: 'QueryPostConnection_Connection'
    posts: 'Post'
    questionnaire: 'Questionnaire'
    questionnaireConnection: 'QueryQuestionnaireConnection_Connection'
    questionnaires: 'Questionnaire'
    todoConnection: 'QueryTodoConnection_Connection'
  }
  QueryPostConnection_Connection: { // field return type name
    edges: 'PostEdge'
    pageInfo: 'PageInfo'
    totalCount: 'Int'
  }
  QueryQuestionnaireConnection_Connection: { // field return type name
    edges: 'QuestionnaireEdge'
    pageInfo: 'PageInfo'
    totalCount: 'Int'
  }
  QueryTodoConnection_Connection: { // field return type name
    edges: 'TodoEdge'
    pageInfo: 'PageInfo'
    totalCount: 'Int'
  }
  Question: { // field return type name
    id: 'Int'
    options: 'Option'
    text: 'String'
    type: 'Int'
  }
  Questionnaire: { // field return type name
    description: 'String'
    endAt: 'DateTime'
    id: 'Int'
    questions: 'Question'
    startAt: 'DateTime'
    state: 'Int'
    title: 'String'
  }
  QuestionnaireEdge: { // field return type name
    cursor: 'String'
    node: 'Questionnaire'
  }
  Todo: { // field return type name
    createdAt: 'DateTime'
    finishedAt: 'DateTime'
    id: 'TodoId'
    task: 'String'
    updatedAt: 'DateTime'
  }
  TodoEdge: { // field return type name
    cursor: 'String'
    node: 'Todo'
  }
  UpdateQuestionnairePayload: { // field return type name
    questionnaire: 'Questionnaire'
  }
  UpdateTodoPayload: { // field return type name
    todo: 'Todo'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    cancelToDeleteQuestionnaire: { // args
      id: number; // Int!
    }
    createQuestionnaire: { // args
      questionnaire?: NexusGenInputs['CreateQuestionnaireInput'] | null; // CreateQuestionnaireInput
    }
    createTodo: { // args
      todo?: NexusGenInputs['CreateTodoInput'] | null; // CreateTodoInput
    }
    deleteQuestionnaire: { // args
      id: number; // Int!
    }
    deleteTodo: { // args
      id: NexusGenScalars['TodoId']; // TodoId!
    }
    updateQuestionnaire: { // args
      questionnaire: NexusGenInputs['UpdateQuestionnaireInput']; // UpdateQuestionnaireInput!
    }
    updateTodo: { // args
      todo: NexusGenInputs['UpdateTodoInput']; // UpdateTodoInput!
    }
  }
  Query: {
    comments: { // args
      postId: number; // Int!
    }
    postConnection: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
      query?: string | null; // String
    }
    posts: { // args
      limit: number | null; // Int
      start: string | null; // String
    }
    questionnaire: { // args
      id?: number | null; // Int
    }
    questionnaireConnection: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
    }
    todoConnection: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
    
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}