const dateCalc = (date: number) => {
  const cDate = date * 1000;
  const now = new Date().getTime();

  const diff = Math.floor((now - cDate) / 1000);


  const minute = Math.floor(diff / 60);
  const hours = Math.floor(diff / 3600);

  const day = 24 * 60 * 60;

  const days = Math.floor(diff / day);
  const months = Math.floor(diff / (day * 30));
  const years = Math.floor(diff / (day * 30 * 12));

  if(years > 0) {
    return years + "년 전"
  }

  if(months > 0) {
    return months + "월 전";
  }

  if(days > 0) {
    if(days === 1) {
      return "하루 전"
    } else {
      return days + "일 전";
    }
  }

  if(hours > 0) {
    return hours + "시간 전"
  }

  if(minute > 0) {
    return minute + "분 전"
  }
}


export default dateCalc;