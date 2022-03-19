import { FormDataModel } from '../../types/utils/object/form-data-model';

/**
 * maltipart-file形式でRailsにデータを送るためのデータを作成するファクトリ
 */
export class RailsFormData extends FormData {
  model: string;

  /**
   * Constructor
   * @param {string} model モデル名
   */
  constructor(model: string) {
    super();
    this.model = model;
  }

  /**
   * @param {string} key modelのkey名
   * @param {any} value 値
   */
  append(key: string, value: any) {
    super.append(`${this.model}[${key}]`, value);
  }

  /**
   * オブジェクトを一括でフォームデータに格納する
   * @param {Record<string, any>} data formData化したいオブジェクト
   */
  appendAll(data: Record<string, any>) {
    Object.entries(data).forEach(([key, val]) => {
      if (val === null || val === undefined) return;
      if (Array.isArray(val)) {
        val.forEach((item) => {
          this.append(key, item);
        });
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
  return railsFormData;
};
