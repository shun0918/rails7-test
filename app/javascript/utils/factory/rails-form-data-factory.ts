import { FormDataModel } from "../../types/utils/object/form-data-model";

export class RailsFormData extends FormData {
  model: string;

  constructor(model: string) {
    super();
    this.model = model;
  }

  // @override
  append(key: string, value: any) {
    super.append(`${this.model}[${key}]`, value);
  }

  appendAll(data: Record<string, any>) {
    Object.entries(data).forEach(([key, val]) => {
      if(val === null || val === undefined) return;
      if(Array.isArray(val)) {
        val.forEach((item) => { this.append(key, item)})
        return;
      }
      this.append(key, val);
    });
  }
}

export const railsFormDataFactory = (models: FormDataModel[]) => {
  const railsFormData = new RailsFormData('');
  models.forEach((model) => {
    railsFormData.model = model.model;
    railsFormData.appendAll(model.data);
  });
  return railsFormData
}