const getDayFromDate = (inputDate: string): string => {
    const date = new Date(inputDate);
    const dayName = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(date);
    return dayName;
  };

export default getDayFromDate