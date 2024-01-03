import { ISearchModel } from "../../models/search.model";

export interface autoCompleteValuesModel {
  results: ISearchModel[];
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setResults: React.Dispatch<React.SetStateAction<ISearchModel[]>>;
}
