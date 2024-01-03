import { ISearchModel } from "../components/search/models/search.model";
import { IImperialModel } from "./imperialModel";
import { IMetricModel } from "./metricModel";

export interface ICurrentCityPropsModel extends ISearchModel {
  weatherIcon?: number;
  Metric?: IMetricModel;
  Imperial?: IImperialModel;
}
