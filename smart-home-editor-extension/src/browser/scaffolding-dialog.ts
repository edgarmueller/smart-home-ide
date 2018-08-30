import { AbstractDialog, DialogProps } from '@theia/core/lib/browser';
import { injectable, inject } from 'inversify';
import * as _ from 'lodash';
import { ScaffoldingOptions } from '../common/scaffolding-protocol';

@injectable()
export class MultiTextInputDialogProps extends DialogProps {
  readonly inputProps: {
    [name: string]: InputProp
  }
}

export interface InputProp {
  label?: string,
  default?: string
}
export abstract class MultiTextInputDialog<T extends Object> extends AbstractDialog<T> {

  protected readonly inputFields = {}

  constructor(
    @inject(MultiTextInputDialogProps) protected readonly props: MultiTextInputDialogProps
  ) {
    super(props);

    for (const inputPropKey in props.inputProps) {
      const inputProp = props.inputProps[inputPropKey];

      const div = document.createElement('div');
      div.setAttribute('style', 'flex: 0;');
      div.classList.add('multi-text-dialog-input-property');
      const label = document.createElement('label');
      label.textContent = _.isEmpty(inputProp.label) ? inputPropKey : inputProp.label;
      const input = document.createElement('input');
      this.inputFields[inputPropKey] = input;
      input.type = 'text';
      input.setAttribute('style', 'flex: 0;');
      input.value = _.isEmpty(inputProp.default)? '' : inputProp.default;

      div.appendChild(label);
      div.appendChild(input);
      this.contentNode.appendChild(div);
    }

    this.appendCloseButton();
    this.appendAcceptButton('Finish');
  }

  get value(): T {
    // Get result values from the input fields and map them to their input names
    const result = this.createEmptyValue();
    for (const inputName in this.inputFields) {
      const value = this.inputFields[inputName].value;
      result[inputName] = _.isEmpty(value) ? undefined : value;
    }
    return result;
  }

  abstract createEmptyValue(): T;
}

/** Dialog querying the configuration options for a new Smart Home App Project. */
export class ScaffoldingDialog extends MultiTextInputDialog<ScaffoldingOptions> {

  constructor() {
    // Configure input props to query for a new smart home app project
    const dialogProps: MultiTextInputDialogProps = {
      title: "Configure New Smart Home App Project",
      inputProps: {
        appName: {
          default: 'NewApp',
          label: 'The name of the app'
        },
        appDescription: {
          default: 'App description',
          label: 'The description of the app'
        },
        appNameSpace: {
          default: 'smarthome.apps',
          label: 'The name space of the app in Java package format'
        },
        authorName: {
          default: 'Anonymous',
          label: `The author's name`
        }
      }
    }

    super(dialogProps);
  }

  createEmptyValue(): ScaffoldingOptions {
    return {};
  }
}