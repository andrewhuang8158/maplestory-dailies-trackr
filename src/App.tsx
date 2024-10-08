import { useEffect, useState } from "react";
import "./App.css";
import SettingsModal from "./components/SettingsModal";
import ScrollToTopButton from "./components/ScrollToTopButton.tsx";
import "./components/ScrollToTopButton.css";
import getUTCTime from "./components/getUTCTime.tsx";
import {
  initialDailies,
  initialWeeklyBosses,
  Daily,
  Boss,
} from "./initialData.ts";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function App() {
  const setDefault = () => {
    setDailies(initialDailies);
    setWeeklyBosses(initialWeeklyBosses);
  };

  const loadDailies = () => {
    try {
      const savedDailies = localStorage.getItem("dailies");
      return savedDailies ? JSON.parse(savedDailies) : initialDailies;
    } catch (error) {
      console.error("Error parsing dailies from localStorage", error);
      return initialDailies;
    }
  };

  const loadWeeklyBosses = () => {
    try {
      const savedWeeklyBosses = localStorage.getItem("weeklyBosses");
      return savedWeeklyBosses
        ? JSON.parse(savedWeeklyBosses)
        : initialWeeklyBosses;
    } catch (error) {
      console.error("Error parsing weekly bosses from localStorage", error);
      return initialWeeklyBosses;
    }
  };

  const [dailies, setDailies] = useState<Daily[]>(loadDailies);
  const [weeklyBosses, setWeeklyBosses] = useState<Boss[]>(loadWeeklyBosses);
  const [formattedTime, setFormattedTime] = useState("");
  const filteredDailies = dailies.filter((daily) => daily.selected);
  const filteredWeeklyBosses = weeklyBosses.filter((boss) => boss.selected);

  const timeUntilNextDayUTC = getUTCTime();
  const resetTime = `Daily Reset : ${timeUntilNextDayUTC.resetHours}:${timeUntilNextDayUTC.resetMinutes}:${timeUntilNextDayUTC.resetSeconds}`;
  const dayofweek = daysOfWeek[timeUntilNextDayUTC.utcDay];
  const thursReset = `Boss Reset : ${timeUntilNextDayUTC.thursHours}:${timeUntilNextDayUTC.thursMinutes}:${timeUntilNextDayUTC.thursSeconds}`;

  const clearDailies = () => {
    setDailies(dailies?.map((daily) => ({ ...daily, completed: true })));
  };
  const clearWeeklyBosses = () => {
    setWeeklyBosses(
      weeklyBosses?.map((boss) => ({ ...boss, completed: true }))
    );
  };
  //reset dailies and weeklies
  const resetDailies = () => {
    setDailies(dailies?.map((daily) => ({ ...daily, completed: false })));
  };
  const resetWeeklyBosses = () => {
    setWeeklyBosses(
      weeklyBosses?.map((boss) => ({ ...boss, completed: false }))
    );
  };

  // handle clicks for toggle complete
  const toggleDaily = (name: String) => {
    setDailies(
      dailies?.map((daily) =>
        daily.name === name ? { ...daily, completed: !daily.completed } : daily
      )
    );
  };

  const toggleWeeklyBoss = (name: string) => {
    setWeeklyBosses(
      weeklyBosses?.map((boss) =>
        boss.name === name ? { ...boss, completed: !boss.completed } : boss
      )
    );
  };

  const saveDailies = () => {
    try {
      localStorage.setItem("dailies", JSON.stringify(dailies));
    } catch (error) {
      console.error("Error saving Dailies to localStorage", error);
    }
  };
  const saveWeeklyBosses = () => {
    try {
      localStorage.setItem("weeklyBosses", JSON.stringify(weeklyBosses));
    } catch (error) {
      console.error("Error saving WeeklyBosses to localStorage", error);
    }
  };

  useEffect(() => {
    saveDailies();
    saveWeeklyBosses();
    const updateClock = () => {
      getUTCTime();
      setFormattedTime(
        `${dayofweek} ${timeUntilNextDayUTC.utcHours}:${timeUntilNextDayUTC.utcMinutes}:${timeUntilNextDayUTC.utcSeconds} UTC`
      );
    };
    const intervalId = setInterval(updateClock, 1000);

    const reset = setTimeout(() => {
      resetDailies();
    }, timeUntilNextDayUTC.timeDifference);
    const thursReset = setTimeout(() => {
      resetWeeklyBosses();
    }, timeUntilNextDayUTC.thursDifference);
    console.log(timeUntilNextDayUTC.timeDifference / 1000 + " seconds");

    return () => {
      clearInterval(intervalId);
      clearTimeout(reset);
      clearTimeout(thursReset);
    };
  }, [resetDailies, resetWeeklyBosses]);

  return (
    <>
      <div className="bg-dark-filter">
        <div className="settings-wrapper">
          <div className="buttons-wrapper">
            <div className="complete-buttons-wrapper">
              <button className="btn btn-success" onClick={clearDailies}>
                Complete Dailies
              </button>
              <button className="btn btn-dark" onClick={resetDailies}>
                Reset Dailies
              </button>
            </div>
            <div className="reset-buttons-wrapper">
              <button className="btn btn-success" onClick={clearWeeklyBosses}>
                Complete Bosses
              </button>
              <button className="btn btn-dark" onClick={resetWeeklyBosses}>
                Reset Bosses
              </button>
            </div>
          </div>
          <div className="timer-container">
            <h1 className="formatted-timer">{formattedTime}</h1>
          </div>
          <div className="settings-buttons">
            <button className="btn btn-dark" onClick={setDefault}>
              Set Default
            </button>
            <SettingsModal
              dailies={dailies}
              setDailies={setDailies}
              weeklyBosses={weeklyBosses}
              setWeeklyBosses={setWeeklyBosses}
            />
          </div>
        </div>
        <h1 className="header section-header" style={{ marginTop: `180px` }}>
          Dailies
        </h1>
        <div className="header-wrapper">
          <h1 className="header daily-reset-timer">{resetTime} </h1>
        </div>
        <div className="dailies-container">
          <div className="daily-list arcane-river-dailies">
            <div className="header-wrapper">
              <h1 className="list-header">Arcane River</h1>
            </div>
            {filteredDailies.filter((daily) => daily.location == "arcane-river")
              .length === 0 && <p>No items selected</p>}
            <ul className="daily-lists">
              {filteredDailies
                ?.filter((daily) => daily.location == "arcane-river")
                .map((daily) => (
                  <li
                    className={
                      daily.completed
                        ? "completed daily-list-item"
                        : "daily-list-item"
                    }
                    style={{ backgroundImage: `url(/${daily.name}.jpg)` }}
                    key={daily.name}
                    onClick={() => {
                      toggleDaily(daily.name);
                    }}
                  >
                    {<div className="dark-filter"></div>}
                    {daily.completed && <div className="darker-filter"></div>}

                    <div className="text-wrapper">
                      <p className={"daily-item-text"}>{daily.text}</p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
          <div className="daily-list grandis-dailies">
            <div className="header-wrapper">
              <h1 className="list-header">Grandis</h1>
            </div>
            {filteredDailies.filter((daily) => daily.location == "grandis")
              .length === 0 && <p>No items selected</p>}
            <ul className="daily-lists">
              {filteredDailies
                ?.filter((daily) => daily.location == "grandis")
                .map((daily) => (
                  <li
                    className={
                      daily.completed
                        ? "completed daily-list-item"
                        : "daily-list-item"
                    }
                    style={{ backgroundImage: `url(/${daily.name}.jpg)` }}
                    key={daily.name}
                    onClick={() => {
                      toggleDaily(daily.name);
                    }}
                  >
                    {<div className="dark-filter"></div>}
                    {daily.completed && <div className="darker-filter"></div>}

                    <div className="text-wrapper">
                      <p className={"daily-item-text"}>{daily.text}</p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
          <div className="daily-list party-quest-dailies">
            <div className="header-wrapper">
              <h1 className="list-header">Party Quests</h1>
            </div>
            {filteredDailies.filter((daily) => daily.location == "pq")
              .length === 0 && <p>No items selected</p>}
            <ul className="daily-lists">
              {filteredDailies
                ?.filter((daily) => daily.location == "pq")
                .map((daily) => (
                  <li
                    className={
                      daily.completed
                        ? "completed daily-list-item"
                        : "daily-list-item"
                    }
                    style={{ backgroundImage: `url(/${daily.name}.jpg)` }}
                    key={daily.name}
                    onClick={() => {
                      toggleDaily(daily.name);
                    }}
                  >
                    {<div className="dark-filter"></div>}
                    {daily.completed && <div className="darker-filter"></div>}

                    <div className="text-wrapper">
                      <p className={"daily-item-text"}>{daily.text}</p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <h1 className="header section-header"> Weekly Bosses</h1>

        <div className="weekly-bosses-container">
          <div className="header-wrapper">
            <h1 className="header thurs-reset-timer">{thursReset}</h1>
          </div>
          <div className="boss-grid-container">
            {filteredWeeklyBosses?.map((boss) => (
              <div
                className={boss.completed ? "completed boss-box" : "boss-box"}
                id={boss.name}
                style={{ backgroundImage: `url(/${boss.name}.jpg)` }}
                onClick={() => {
                  toggleWeeklyBoss(boss.name);
                }}
              >
                {boss.completed && <div className="completed-boss"></div>}
                <div className="text-wrapper">
                  {boss.completed && (
                    <p
                      className={
                        boss.completed
                          ? "completed weekly-boss-text"
                          : "weekly-boss-text"
                      }
                    >
                      {"CLEAR"}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <ScrollToTopButton />
      </div>
    </>
  );
}

export default App;
