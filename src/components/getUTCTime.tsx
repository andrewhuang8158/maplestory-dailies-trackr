interface UTCTime {
  utcDay: number;
  utcHours: string;
  utcMinutes: string;
  utcSeconds: string;
  resetHours: string;
  resetMinutes: string;
  resetSeconds: string;
  thursHours: string;
  thursMinutes: string;
  thursSeconds: string;
  timeDifference: number;
  thursDifference: number;
}

const getUTCTime = (): UTCTime => {
  const now = new Date();
  const currentDay = now.getUTCDay();
  const daysUntilThursday = (4 - currentDay + 7) % 7;
  const nextThursday = new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + daysUntilThursday
  );
  nextThursday.setUTCHours(0, 0, 0, 0);

  const currentUTC = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds()
    )
  );

  const nextUTCDate = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + 1,
      0,
      0,
      0
    )
  );

  // Calculate the difference in milliseconds
  const timeDifference = nextUTCDate.getTime() - currentUTC.getTime();
  const thursDifference = nextThursday.getTime() - currentUTC.getTime();
  // Convert the difference for countdown timer to reset to a more readable format (e.g., hours, minutes, seconds)
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  const thurshours = Math.floor(thursDifference / (1000 * 60 * 60));
  const thursminutes = Math.floor(
    (thursDifference % (1000 * 60 * 60)) / (1000 * 60)
  );
  const thursseconds = Math.floor((thursDifference % (1000 * 60)) / 1000);

  const utcDay = Number(now.getUTCDay());
  const utcHours = String(now.getUTCHours()).padStart(2, "0");
  const utcMinutes = String(now.getUTCMinutes()).padStart(2, "0");
  const utcSeconds = String(now.getUTCSeconds()).padStart(2, "0");
  const resetHours = String(hours).padStart(2, "0");
  const resetMinutes = String(minutes).padStart(2, "0");
  const resetSeconds = String(seconds).padStart(2, "0");
  const thursHours = String(thurshours).padStart(2, "0");
  const thursMinutes = String(thursminutes).padStart(2, "0");
  const thursSeconds = String(thursseconds).padStart(2, "0");

  return {
    utcDay: utcDay,
    utcHours: utcHours,
    utcMinutes: utcMinutes,
    utcSeconds: utcSeconds,
    resetHours: resetHours,
    resetMinutes: resetMinutes,
    resetSeconds: resetSeconds,
    thursHours: thursHours,
    thursMinutes: thursMinutes,
    thursSeconds: thursSeconds,
    timeDifference: timeDifference,
    thursDifference: thursDifference,
  };
};

export default getUTCTime;
