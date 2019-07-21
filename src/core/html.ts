import { IAllPartParamTypes } from '../interfaces/IPart';
import { TemplateResult } from './TemplateResult';

const templateMap = new Map<TemplateStringsArray, TemplateStringsArray>();

const needMin = false;

function getTinyTemplate(templateArray: TemplateStringsArray): TemplateStringsArray {
     if (!templateMap.has(templateArray)) {
          const tinyTemplate = templateArray.map(item => item.replace(/\n\s+/g, ' '));
          Object.defineProperty(tinyTemplate, 'raw', {
               value: tinyTemplate,
               enumerable: false,
               configurable: false
          });
          if (typeof Object.freeze === 'function') {
               Object.freeze(tinyTemplate);
          }
          templateMap.set(templateArray, tinyTemplate as any);
          return tinyTemplate as any;
     }
     return templateMap.get(templateArray) as TemplateStringsArray;
}

export function html(templateArray: TemplateStringsArray, ...partParams: IAllPartParamTypes[]): TemplateResult {
     return new TemplateResult(needMin ? getTinyTemplate(templateArray) : templateArray, partParams);
}
