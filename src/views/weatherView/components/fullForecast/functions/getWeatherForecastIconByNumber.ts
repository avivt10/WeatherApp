import getWeatherWidgetImages from '../../weatherWidget/functions/getWeatherWidgetImages';

const getWeatherIconByNumber = (number: number): string | null => {
    const iconName = getWeatherWidgetImages[number];
    return iconName || null;
  };

  export default getWeatherIconByNumber