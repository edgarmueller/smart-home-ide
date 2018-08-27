export default {

  definitions: {
    // STATE
    state: {
      $id: "#state",
      type: "object",
      properties: {
        id: { type: "string" },
        description: { type: "string" },
        name: { type: "string" },
        multiple: { type: "boolean" },
        requiresName: { type: "boolean" },
        type: {
          type: "string",
          enum: [
            "Item",
            "Virtual",
            "Framework"
          ]
        },
        tags: {
          type: "array",
          items: {
            type: "string"
          }
        },
        defaultValueString: { type: "string" },
        defaultValue: { type: "object" }
      },
      required: ["id", "description", "name", "multiple", "requiresName", "type", "tags", "defaultValueString", "defaultValue"]
    },

    // CONCRETE STATES
    booleanState: {
      $id: "#booleanState",
      type: "object",
      allOf: [
        { $ref: "#/definitions/state" }
      ]
    },
    dateTimeState: {
      $id: "#dateTimeState",
      type: "object",
      allOf: [
        { $ref: "#/definitions/state" }
      ]
    },
    numberState: {
      $id: "#numberState",
      type: "object",
      allOf: [
        { $ref: "#/definitions/state" }
      ]
    },

    //CONCRETE PLUGINS
    heatingActor: {
      $id: "#heatingActor",
      type: "object",
      allOf: [
        { $ref: "#/definitions/state" }
      ]
    },
    lockUnlockActor: {
      $id: "#lockUnlockActor",
      type: "object",
      allOf: [
        { $ref: "#/definitions/state" }
      ]
    },
    onOffActor: {
      $id: "#onOffActor",
      type: "object",
      allOf: [
        { $ref: "#/definitions/state" }
      ]
    },
    playPauseActor: {
      $id: "#playPauseActor",
      type: "object",
      allOf: [
        { $ref: "#/definitions/state" }
      ]
    }

  },

  $id: "#appdescription",
  type: "object",
  properties: {
    id: {
      type: "string"
    },
    description: {
      type: "string"
    },
    name: {
      type: "string"
    },
    icon: {
      type: "string"
    },
    author: {
      type: "string"
    },
    bundle: {
      type: "string"
    },
    className: {
      type: "string"
    },
    providedState: {
      type: "array",
      items: {
        $id: "#providedStateItem",
        type: "object",
        properties: {
          id: {
            type: "string"
          },
          description: {
            type: "string"
          },
          name: {
            type: "string"
          },
          multiple: {
            type: "boolean"
          },
          requiresName: {
            type: "boolean"
          },
          type: {
            type: "string",
            enum: [
              "Item",
              "Virtual",
              "Framework"
            ]
          },
          tags: {
            type: "array",
            items: {
              type: "string"
            }
          },
          defaultValueString: {
            type: "string"
          }
        },
        additionalProperties: false,
        required: [
          "id",
          "description",
          "name",
          "multiple",
          "requiresName",
          "type",
          "defaultValueString"
        ]
      }
    },

    // required state with 
    requiredStates: {
      type: "array",
      items: { 
        anyOf: [
          { $ref: "#/definitions/booleanState" },
          { $ref: "#/definitions/dateTimeState" },
          { $ref: "#/definitions/numberState" }

        ]
       }
    },
    requiredActors: {
      type: "array",
      items: {
        "$id": "#requiredActor",
        type: "object",
        properties: {
          id: {
            type: "string"
          },
          description: {
            type: "string"
          },
          name: {
            type: "string"
          },
          multiple: {
            type: "boolean"
          },
          requiresName: {
            type: "boolean"
          },
          type: {
            type: "string",
            enum: [
              "Item",
              "Virtual",
              "Framework"
            ]
          },
          tags: {
            type: "array",
            items: {
              type: "string"
            }
          },
          defaultValueString: {
            type: "string"
          }
        },
        additionalProperties: false,
        required: [
          "id",
          "description",
          "name",
          "multiple",
          "requiresName",
          "type",
          "defaultValueString"
        ]
      }
    },
    requiredParameters: {
      type: "array",
      items: {
        "$id": "#requiredParameter",
        type: "object",
        properties: {
          name: {
            type: "string"
          }
        },
        additionalProperties: false,
        required: [
          "name"
        ]
      }
    },
    enabled: {
      type: "boolean"
    }
  },
  additionalProperties: false,
  required: [
    "id",
    "description",
    "name",
    "icon",
    "author",
    "bundle",
    "className",
    "enabled"
  ]
}
