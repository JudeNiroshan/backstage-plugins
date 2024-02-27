import moment from 'moment';

import {
  ProcessInstance,
  ProcessInstanceState,
  WorkflowOverview,
  WorkflowRunStatusDTO,
  WorkflowSpecFile,
} from '@janus-idp/backstage-plugin-orchestrator-common';

import {
  fakeOpenAPIV3Document,
  generateProcessInstance,
  generateTestExecuteWorkflowResponse,
  generateTestWorkflowOverview,
  generateTestWorkflowSpecs,
  generateWorkflowDefinition,
  generateWorkflowListResult,
} from '../test-utils';
import assessedProcessInstanceData from './__fixtures__/assessedProcessInstance.json';
import {
  firstLetterToUppercase,
  getProcessInstancesDTOFromString,
  getWorkflowCategoryDTO,
  mapToExecuteWorkflowResponseDTO,
  mapToGetWorkflowInstanceResults,
  mapToProcessInstanceDTO,
  mapToWorkflowDTO,
  mapToWorkflowListResultDTO,
  mapToWorkflowOverviewDTO,
  mapToWorkflowRunStatusDTO,
  mapToWorkflowSpecFileDTO,
  mapWorkflowCategoryDTOFromString,
} from './V2Mappings';

describe('scenarios to verify executeWorkflowResponseDTO', () => {
  it('correctly maps positive scenario response', async () => {
    const execWorkflowResp = generateTestExecuteWorkflowResponse();
    const mappedValue = mapToExecuteWorkflowResponseDTO(
      'test_workflowId',
      execWorkflowResp,
    );
    expect(mappedValue).toBeDefined();
    expect(mappedValue.id).toBeDefined();
    expect(Object.keys(mappedValue).length).toBe(1);
  });

  it('throws error when no id attribute present in response', async () => {
    expect(() => {
      mapToExecuteWorkflowResponseDTO('workflowId', { id: '' });
    }).toThrow(
      `Error while mapping ExecuteWorkflowResponse to ExecuteWorkflowResponseDTO for workflow with id`,
    );
  });
});

describe('scenarios to verify mapToWorkflowOverviewDTO', () => {
  it('correctly maps WorkflowOverview', () => {
    // Arrange
    const overview: WorkflowOverview = generateTestWorkflowOverview({
      category: 'assessment',
    });

    // Act
    const result = mapToWorkflowOverviewDTO(overview);

    // Assert
    expect(result.workflowId).toBe(overview.workflowId);
    expect(result.name).toBe(overview.name);
    expect(result.uri).toBe(overview.uri);
    expect(result.lastTriggeredMs).toBe(overview.lastTriggeredMs);
    expect(result.lastRunStatus).toBe(overview.lastRunStatus);
    expect(result.category).toBe('assessment');
    expect(result.avgDurationMs).toBe(overview.avgDurationMs);
    expect(result.description).toBe(overview.description);
    expect(Object.keys(result).length).toBe(8);
  });
});
describe('scenarios to verify mapWorkflowCategoryDTOFromString', () => {
  test.each([
    { input: 'assessment', expected: 'assessment' },
    { input: 'infrastructure', expected: 'infrastructure' },
    { input: 'random category', expected: 'infrastructure' },
  ])('mapWorkflowCategoryDTOFromString($input)', ({ input, expected }) => {
    // Arrange
    const overview: WorkflowOverview = generateTestWorkflowOverview({
      category: input,
    });

    // Act
    const resultCategory = mapWorkflowCategoryDTOFromString(overview.category);

    // Assert
    expect(resultCategory).toBeDefined();
    expect(resultCategory).toBe(expected);
  });
});

describe('scenarios to verify mapToWorkflowSpecFileDTO', () => {
  it('correctly maps WorkflowSpecFile', () => {
    // Arrange
    const specV1: WorkflowSpecFile[] = generateTestWorkflowSpecs(1);

    // Act
    const result = mapToWorkflowSpecFileDTO(specV1[0]);

    // Assert
    expect(result.path).toBeDefined();
    expect(result.path).toEqual('/test/path/openapi_0.json');
    expect(result.content).toBeDefined();
    expect(JSON.parse(result.content)).toEqual(fakeOpenAPIV3Document());
    expect(Object.keys(result).length).toBe(2);
  });
});

describe('scenarios to verify mapToProcessInstanceDTO', () => {
  it('correctly maps WorkflowSpecFile for not completed workflow', () => {
    // Arrange
    const processIntanceV1: ProcessInstance = generateProcessInstance(1);
    processIntanceV1.end = undefined;

    // Act
    const result = mapToProcessInstanceDTO(processIntanceV1);

    // Assert
    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.started).toBeDefined();
    expect(result.started).toEqual(processIntanceV1.start.toUTCString());
    expect(result.ended).toBeUndefined();
    expect(result.duration).toBeUndefined();
    expect(result.status).toEqual(
      getProcessInstancesDTOFromString(processIntanceV1.state),
    );
    expect(result.description).toEqual(processIntanceV1.description);
    expect(result.category).toEqual('infrastructure');
    expect(result.workflowdata).toEqual(
      // @ts-ignore
      processIntanceV1?.variables?.workflowdata,
    );
    expect(result.workflow).toEqual(
      processIntanceV1.processName ?? processIntanceV1.processId,
    );
  });
  it('correctly maps WorkflowSpecFile', () => {
    // Arrange
    const processIntanceV1: ProcessInstance = generateProcessInstance(1);

    const start = moment(processIntanceV1.start);
    const end = moment(processIntanceV1.end);
    const duration = moment.duration(start.diff(end)).humanize();
    // Act
    const result = mapToProcessInstanceDTO(processIntanceV1);

    // Assert
    expect(result.id).toBeDefined();
    expect(result.started).toEqual(processIntanceV1.start.toUTCString());
    expect(result.ended).toBeDefined();
    expect(result.ended).toEqual(processIntanceV1.end!.toUTCString());
    expect(result.duration).toEqual(duration);

    expect(result).toBeDefined();
    expect(result.status).toEqual(
      getProcessInstancesDTOFromString(processIntanceV1.state),
    );
    expect(result.ended).toEqual(processIntanceV1.end?.toUTCString());
    expect(result.duration).toEqual(duration);
    expect(result.duration).toEqual('an hour');
    expect(result.description).toEqual(processIntanceV1.description);
    expect(result.category).toEqual('infrastructure');
    expect(result.workflowdata).toEqual(
      // @ts-ignore
      processIntanceV1?.variables?.workflowdata,
    );
    expect(result.workflow).toEqual(
      processIntanceV1.processName ?? processIntanceV1.processId,
    );
  });
});

describe('scenarios to verify mapToGetWorkflowInstanceResults', () => {
  it('correctly maps positive scenario response', async () => {
    const assessedProcessInstance = assessedProcessInstanceData;

    const mappedValue = mapToGetWorkflowInstanceResults(
      // @ts-ignore
      assessedProcessInstance.instance.variables,
    );

    expect(mappedValue).toBeDefined();
    expect(mappedValue.result).toBeDefined();
    expect(mappedValue.preCheck).toBeDefined();
    expect(mappedValue.workflowOptions).toBeDefined();
    expect(mappedValue.repositoryUrl).toEqual('https://java.com');
    expect(Object.keys(mappedValue).length).toBe(4);
  });

  it('correctly maps string response', async () => {
    const testValue = 'string_value';
    const mappedValue = mapToGetWorkflowInstanceResults(testValue);
    expect(mappedValue).toBeDefined();
    expect(Object.keys(mappedValue).length).toBe(1);
    expect(mappedValue.variables).toBeDefined();
    expect(mappedValue.variables).toEqual(testValue);
  });

  it('correctly returns empty workflowoptions when variables property does not exist', async () => {
    const assessedProcessInstance = assessedProcessInstanceData;

    // @ts-ignore
    delete assessedProcessInstance.instance.variables;

    const mappedValue = mapToGetWorkflowInstanceResults(
      // @ts-ignore
      assessedProcessInstance.instance.variables,
    );

    expect(mappedValue).toBeDefined();
    expect(Object.keys(mappedValue).length).toBe(1);
    expect(mappedValue.workflowoptions).toBeDefined();
    expect(mappedValue.workflowoptions?.length).toBe(0);
  });
});

describe('scenarios to verify mapToWorkflowRunStatusDTO', () => {
  it('correctly maps ProcessInstanceState to WorkflowRunStatusDTO', async () => {
    const mappedValue: WorkflowRunStatusDTO = mapToWorkflowRunStatusDTO(
      ProcessInstanceState.Active,
    );

    expect(mappedValue).toBeDefined();
    expect(mappedValue.key).toBeDefined();
    expect(mappedValue.value).toBeDefined();
    expect(mappedValue.key).toEqual('Active');
    expect(mappedValue.value).toEqual('ACTIVE');
  });
});

describe('scenarios to verify firstLetterToUppercase', () => {
  it('correctly transform the first letter to Uppercase', async () => {
    const transformedValue = firstLetterToUppercase('test');

    expect(transformedValue).toBeDefined();
    expect(transformedValue.length).toBe(4);
    expect(transformedValue).toEqual('Test');
  });

  it('correctly transform the remaining letters to Lowercase', async () => {
    const transformedValue = firstLetterToUppercase('testString');

    expect(transformedValue).toBeDefined();
    expect(transformedValue.length).toBe(10);
    expect(transformedValue).toEqual('Teststring');
  });

  it('correctly ignore empty input text', async () => {
    const transformedValue = firstLetterToUppercase('');

    expect(transformedValue).toBeDefined();
    expect(transformedValue.length).toBe(0);
    expect(transformedValue).toEqual('');
  });

  it('correctly ignore only one letter input text', async () => {
    const transformedValue = firstLetterToUppercase('c');

    expect(transformedValue).toBeDefined();
    expect(transformedValue.length).toBe(1);
    expect(transformedValue).toEqual('C');
  });
});

describe('scenarios to verify mapToWorkflowDTO', () => {
  it('correctly maps positive scenario response', async () => {
    const wfDefinition = generateWorkflowDefinition();
    const mappedValue = mapToWorkflowDTO('testURI', wfDefinition);

    expect(mappedValue).toBeDefined();
    expect(mappedValue.uri).toEqual('testURI');
    expect(mappedValue.id).toEqual(wfDefinition.id);
    expect(mappedValue.name).toBeDefined();
    expect(mappedValue.name).toEqual(wfDefinition.name);
    expect(mappedValue.category).toEqual(getWorkflowCategoryDTO(wfDefinition));
    expect(mappedValue.annotations).toEqual(wfDefinition.annotations);
  });
});

describe('scenarios to verify mapToWorkflowListResultDTO', () => {
  it('correctly maps positive scenario response', async () => {
    const workflowList = generateWorkflowListResult(1);
    const mappedValue = mapToWorkflowListResultDTO(workflowList);

    expect(mappedValue).toBeDefined();
    expect(mappedValue.items).toHaveLength(1);
    expect(mappedValue.items[0].id).toEqual(
      workflowList.items[0].definition.id,
    );
    expect(mappedValue.items[0].uri).toEqual(workflowList.items[0].uri);
    expect(mappedValue.items[0].category).toEqual(
      getWorkflowCategoryDTO(workflowList.items[0].definition),
    );
    expect(mappedValue.items[0].name).toBeDefined();
    expect(mappedValue.items[0].name).toEqual(
      workflowList.items[0].definition.name,
    );

    expect(mappedValue.items[0].description).toBeDefined();
    expect(mappedValue.items[0].description).toEqual(
      workflowList.items[0].definition.description,
    );
    expect(mappedValue.items[0].annotations).toBeDefined();
    expect(mappedValue.items[0].annotations).toEqual(
      workflowList.items[0].definition.annotations,
    );
  });
});
