import getWeatherWidgetImages from "../../views/weatherView/components/weatherWidget/config/getWeatherWidgetImages";

const getWeatherIconByNumber = (number: number): string | null => {
  const iconName = getWeatherWidgetImages[number];
  return iconName || null;
};

export default getWeatherIconByNumber;
