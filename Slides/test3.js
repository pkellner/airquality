/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-key */

import { flushsync } from 'react-dom';

function Clock() {
  const [seconds, setSeconds] = useState(startSeconds);
  const [minutes, setMinutes] = useState(startMinutes);
  const [hours, setHours] = useState(startHours);

  useEffect(() => {
    setTimeout(() => {
      flushsync(() => setSeconds(seconds + 1));
      flushsync(() => setMinutes(calcMinutes(seconds)));
      flushsync(() => setHours(calcHours(seconds)));
    },1000);
  });v

  return (
    <ClockDisplay hours={hours} minutes={minutes}
      seconds={seconds}
    />
  );
}
