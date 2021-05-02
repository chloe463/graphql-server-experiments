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
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    datetime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Date";
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
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  Date: any
  DateTime: any
}

export interface NexusGenObjects {
  Comment: { // root type
    body: string; // String!
    email: string; // String!
    id: number; // Int!
    name: string; // String!
    postId: number; // Int!
  }
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
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Comment: { // field return type
    body: string; // String!
    email: string; // String!
    id: number; // Int!
    name: string; // String!
    postId: number; // Int!
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
    questionnaireConnection: NexusGenRootTypes['QueryQuestionnaireConnection_Connection']; // QueryQuestionnaireConnection_Connection!
    questionnaires: Array<NexusGenRootTypes['Questionnaire'] | null> | null; // [Questionnaire]
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
}

export interface NexusGenFieldTypeNames {
  Comment: { // field return type name
    body: 'String'
    email: 'String'
    id: 'Int'
    name: 'String'
    postId: 'Int'
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
    questionnaireConnection: 'QueryQuestionnaireConnection_Connection'
    questionnaires: 'Questionnaire'
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
}

export interface NexusGenArgTypes {
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
    questionnaireConnection: { // args
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

export type NexusGenInputNames = never;

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