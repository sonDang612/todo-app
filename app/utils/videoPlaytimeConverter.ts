// 3601s => 01:00:01
const videoPlaytimeConverter = (playDuration: number) => {
  let str = '';
  if (!playDuration) {
    playDuration = 0;
  }
  const minutes = playDuration / 60;
  const hours = playDuration / 3600;
  if (hours < 1) {
    const _minutes = parseFloat(minutes.toString().split('.')[0]);
    const _seconds = Math.round(
      parseFloat(['0', minutes.toString().split('.')[1]].join('.')) * 60,
    );
    const strMinutes = _minutes < 10 ? `0${_minutes}` : _minutes.toString();
    const strSeconds = _seconds < 10 ? `0${_seconds}` : _seconds.toString();
    str = `${strMinutes}:${strSeconds}`;
  } else {
    const _hours = parseFloat(hours.toString().split('.')[0]);
    const _minutes =
      parseFloat(['0', hours.toString().split('.')[1]].join('.')) * 60;
    const _seconds = Math.round(
      parseFloat(['0', _minutes.toString().split('.')[1]].join('.')) * 60,
    );

    const strHours = _hours < 10 ? `0${_hours}` : hours.toString();
    const strMinutes =
      Math.round(_minutes) < 10
        ? `0${Math.round(_minutes)}`
        : Math.round(_minutes).toString();
    const strSeconds = _seconds < 10 ? `0${_seconds}` : _seconds.toString();
    str = `${strHours}:${strMinutes}:${strSeconds}`;
  }

  return str;
};

export default videoPlaytimeConverter;
