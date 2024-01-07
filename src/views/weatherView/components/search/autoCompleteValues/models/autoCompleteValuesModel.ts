import { ISearchModel } from "../../models/search.model";

export interface autoCompleteValuesModel {
  results: ISearchModel[];
  setInput: (arg: string) => void;
  setResults: (arg: ISearchModel[]) => void;
}
