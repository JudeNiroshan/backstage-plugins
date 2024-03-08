// GENERATED FILE. DO NOT EDIT.
const OPENAPI = `
{
  "openapi": "3.1.0",
  "info": {
    "title": "Orchestrator plugin",
    "description": "API to interact with orchestrator plugin",
    "license": {
      "name": "Apache 2.0",
      "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
    },
    "version": "0.0.1"
  },
  "servers": [
    {
      "url": "/"
    }
  ],
  "paths": {
    "/v2/workflows/overview": {
      "get": {
        "operationId": "getWorkflowsOverview",
        "description": "Get a list of workflow overviews",
        "parameters": [
          {
            "name": "page",
            "in": "query",
            "description": "page number",
            "schema": {
              "type": "number"
            }
          },
          {
            "name": "pageSize",
            "in": "query",
            "description": "page size",
            "schema": {
              "type": "number"
            }
          },
          {
            "name": "orderBy",
            "in": "query",
            "description": "field name to order the data",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "orderDirection",
            "in": "query",
            "description": "ascending or descending",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/WorkflowOverviewListResultDTO"
                }
              }
            }
          },
          "500": {
            "description": "Error fetching workflow overviews",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/v2/workflows/{workflowId}/overview": {
      "get": {
        "operationId": "getWorkflowOverviewById",
        "description": "Get a workflow overview by ID",
        "parameters": [
          {
            "name": "workflowId",
            "in": "path",
            "required": true,
            "description": "Unique identifier of the workflow",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/WorkflowOverviewDTO"
                }
              }
            }
          },
          "500": {
            "description": "Error fetching workflow overview",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/v2/workflows/{workflowId}": {
      "get": {
        "operationId": "getWorkflowById",
        "description": "Get a workflow by ID",
        "parameters": [
          {
            "name": "workflowId",
            "in": "path",
            "description": "ID of the workflow to fetch",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/WorkflowDTO"
                }
              }
            }
          },
          "500": {
            "description": "Error fetching workflow by id",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/v2/workflows/{workflowId}/source": {
      "get": {
        "operationId": "getWorkflowSourceById",
        "description": "Get a workflow source by ID",
        "parameters": [
          {
            "name": "workflowId",
            "in": "path",
            "description": "ID of the workflow to fetch",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "500": {
            "description": "Error fetching workflow source by id",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/v2/workflows/instances": {
      "get": {
        "operationId": "getInstances",
        "summary": "Get instances",
        "description": "Retrieve an array of instances",
        "parameters": [
          {
            "name": "page",
            "in": "query",
            "description": "page number",
            "schema": {
              "type": "number"
            }
          },
          {
            "name": "pageSize",
            "in": "query",
            "description": "page size",
            "schema": {
              "type": "number"
            }
          },
          {
            "name": "orderBy",
            "in": "query",
            "description": "field name to order the data",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "orderDirection",
            "in": "query",
            "description": "ascending or descending",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProcessInstanceListResultDTO"
                }
              }
            }
          },
          "500": {
            "description": "Error fetching instances",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/v2/workflows/instances/{instanceId}": {
      "get": {
        "summary": "Get Workflow Instance by ID",
        "operationId": "getInstanceById",
        "parameters": [
          {
            "name": "instanceId",
            "in": "path",
            "required": true,
            "description": "ID of the workflow instance",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProcessInstanceDTO"
                }
              }
            }
          },
          "500": {
            "description": "Error fetching instance",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/v2/workflows/instances/{instanceId}/results": {
      "get": {
        "summary": "Get workflow results",
        "operationId": "getWorkflowResults",
        "parameters": [
          {
            "name": "instanceId",
            "in": "path",
            "required": true,
            "description": "ID of the workflow instance",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/WorkflowDataDTO"
                }
              }
            }
          },
          "500": {
            "description": "Error getting workflow results",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/v2/workflows/instances/statuses": {
      "get": {
        "operationId": "getWorkflowStatuses",
        "summary": "Get workflow status list",
        "description": "Retrieve an array of workflow statuses",
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/WorkflowRunStatusDTO"
                  }
                }
              }
            }
          },
          "500": {
            "description": "Error fetching workflow statuses",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/v2/workflows/{workflowId}/execute": {
      "post": {
        "summary": "Execute a workflow",
        "operationId": "executeWorkflow",
        "parameters": [
          {
            "name": "workflowId",
            "in": "path",
            "description": "ID of the workflow to execute",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ExecuteWorkflowRequestDTO"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful execution",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ExecuteWorkflowResponseDTO"
                }
              }
            }
          },
          "500": {
            "description": "Internal Server Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/v2/workflows/{workflowId}/abort": {
      "delete": {
        "summary": "Abort a workflow instance",
        "operationId": "abortWorkflow",
        "description": "Aborts a workflow instance identified by the provided workflowId.",
        "parameters": [
          {
            "name": "workflowId",
            "in": "path",
            "required": true,
            "description": "The identifier of the workflow instance to abort.",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "500": {
            "description": "Error aborting workflow",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "ErrorResponse": {
        "description": "The ErrorResponse object represents a common structure for handling errors in API responses. It includes essential information about the error, such as the error message and additional optional details.",
        "type": "object",
        "properties": {
          "message": {
            "description": "A string providing a concise and human-readable description of the encountered error. This field is required in the ErrorResponse object.",
            "type": "string",
            "default": "internal server error"
          },
          "additionalInfo": {
            "description": "An optional field that can contain additional information or context about the error. It provides flexibility for including extra details based on specific error scenarios.",
            "type": "string"
          }
        },
        "required": [
          "message"
        ]
      },
      "WorkflowOverviewListResultDTO": {
        "type": "object",
        "properties": {
          "overviews": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/WorkflowOverviewDTO"
            }
          },
          "paginationInfo": {
            "$ref": "#/components/schemas/PaginationInfoDTO"
          }
        }
      },
      "WorkflowOverviewDTO": {
        "type": "object",
        "properties": {
          "workflowId": {
            "type": "string",
            "description": "Workflow unique identifier",
            "minLength": 1
          },
          "name": {
            "type": "string",
            "description": "Workflow name",
            "minLength": 1
          },
          "format": {
            "$ref": "#/components/schemas/WorkflowFormatDTO"
          },
          "lastTriggeredMs": {
            "type": "number",
            "minimum": 0
          },
          "lastRunStatus": {
            "type": "string"
          },
          "category": {
            "$ref": "#/components/schemas/WorkflowCategoryDTO"
          },
          "avgDurationMs": {
            "type": "number",
            "minimum": 0
          },
          "description": {
            "type": "string"
          }
        }
      },
      "PaginationInfoDTO": {
        "type": "object",
        "properties": {
          "pageSize": {
            "type": "number",
            "minimum": 0
          },
          "page": {
            "type": "number",
            "minimum": 0
          },
          "totalCount": {
            "type": "number",
            "minimum": 0
          }
        },
        "additionalProperties": false
      },
      "WorkflowFormatDTO": {
        "type": "string",
        "description": "Format of the workflow definition",
        "enum": [
          "yaml",
          "json"
        ]
      },
      "WorkflowCategoryDTO": {
        "type": "string",
        "description": "Category of the workflow",
        "enum": [
          "assessment",
          "infrastructure"
        ]
      },
      "WorkflowListResultDTO": {
        "type": "object",
        "properties": {
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/WorkflowDTO"
            }
          },
          "paginationInfo": {
            "$ref": "#/components/schemas/PaginationInfoDTO"
          }
        },
        "required": [
          "items",
          "paginationInfo"
        ]
      },
      "WorkflowDTO": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "Workflow unique identifier",
            "minLength": 1
          },
          "name": {
            "type": "string",
            "description": "Workflow name",
            "minLength": 1
          },
          "format": {
            "$ref": "#/components/schemas/WorkflowFormatDTO"
          },
          "category": {
            "$ref": "#/components/schemas/WorkflowCategoryDTO"
          },
          "description": {
            "type": "string",
            "description": "Description of the workflow"
          },
          "annotations": {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        },
        "required": [
          "id",
          "category",
          "format"
        ]
      },
      "ProcessInstanceListResultDTO": {
        "type": "object",
        "properties": {
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/ProcessInstanceDTO"
            }
          },
          "paginationInfo": {
            "$ref": "#/components/schemas/PaginationInfoDTO"
          }
        }
      },
      "AssessedProcessInstanceDTO": {
        "type": "object",
        "properties": {
          "instance": {
            "$ref": "#/components/schemas/ProcessInstanceDTO"
          },
          "assessedBy": {
            "$ref": "#/components/schemas/ProcessInstanceDTO"
          }
        },
        "required": [
          "instance"
        ]
      },
      "ProcessInstanceDTO": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "workflow": {
            "type": "string"
          },
          "status": {
            "$ref": "#/components/schemas/ProcessInstanceStatusDTO"
          },
          "start": {
            "type": "string"
          },
          "end": {
            "type": "string"
          },
          "duration": {
            "type": "string"
          },
          "category": {
            "$ref": "#/components/schemas/WorkflowCategoryDTO"
          },
          "description": {
            "type": "string"
          },
          "workflowdata": {
            "$ref": "#/components/schemas/WorkflowDataDTO"
          }
        }
      },
      "WorkflowDataDTO": {
        "type": "object",
        "properties": {
          "workflowoptions": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/WorkflowOptionsDTO"
            }
          }
        },
        "additionalProperties": true
      },
      "WorkflowOptionsDTO": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/WorkflowSuggestionDTO"
        }
      },
      "WorkflowSuggestionDTO": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string"
          },
          "name": {
            "type": "string"
          }
        }
      },
      "ProcessInstanceStatusDTO": {
        "type": "string",
        "description": "Status of the workflow run",
        "enum": [
          "Running",
          "Error",
          "Completed",
          "Aborted",
          "Suspended",
          "Pending"
        ]
      },
      "WorkflowRunStatusDTO": {
        "type": "object",
        "properties": {
          "key": {
            "type": "string"
          },
          "value": {
            "type": "string"
          }
        }
      },
      "ExecuteWorkflowRequestDTO": {
        "type": "object",
        "properties": {
          "inputData": {
            "type": "object",
            "additionalProperties": {
              "type": "string"
            }
          }
        },
        "required": [
          "inputData"
        ]
      },
      "ExecuteWorkflowResponseDTO": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string"
          }
        }
      },
      "WorkflowProgressDTO": {
        "allOf": [
          {
            "$ref": "#/components/schemas/NodeInstanceDTO"
          },
          {
            "type": "object",
            "properties": {
              "status": {
                "$ref": "#/components/schemas/ProcessInstanceStatusDTO"
              },
              "error": {
                "$ref": "#/components/schemas/ProcessInstanceErrorDTO"
              }
            }
          }
        ]
      },
      "NodeInstanceDTO": {
        "type": "object",
        "properties": {
          "__typename": {
            "type": "string",
            "default": "NodeInstance",
            "description": "Type name"
          },
          "id": {
            "type": "string",
            "description": "Node instance ID"
          },
          "name": {
            "type": "string",
            "description": "Node name"
          },
          "type": {
            "type": "string",
            "description": "Node type"
          },
          "enter": {
            "type": "string",
            "description": "Date when the node was entered"
          },
          "exit": {
            "type": "string",
            "description": "Date when the node was exited (optional)"
          },
          "definitionId": {
            "type": "string",
            "description": "Definition ID"
          },
          "nodeId": {
            "type": "string",
            "description": "Node ID"
          }
        }
      },
      "ProcessInstanceErrorDTO": {
        "type": "object",
        "properties": {
          "__typename": {
            "type": "string",
            "default": "ProcessInstanceError",
            "description": "Type name"
          },
          "nodeDefinitionId": {
            "type": "string",
            "description": "Node definition ID"
          },
          "message": {
            "type": "string",
            "description": "Error message (optional)"
          }
        }
      }
    }
  }
}`;
export const openApiDocument = JSON.parse(OPENAPI);
