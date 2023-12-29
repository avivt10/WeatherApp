import { IDisplaySearchModel } from "../../../../models/displaySearch.model";
import style from "./displaySearch.module.css"


interface IResultsModel {
    results: Array<IDisplaySearchModel>
}

const DisplaySearch = ({ results} : IResultsModel) => {
    return (
        <div className={style.displayList}>
            {
                results?.map((results:IDisplaySearchModel,id:number) => {
                    return <div key={id}>
                        {results.title}
                    </div>
                })
            }
        </div>
    );
};

export default DisplaySearch;

