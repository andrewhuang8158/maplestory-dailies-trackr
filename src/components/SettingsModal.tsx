import { useState } from "react";
import { Modal } from "react-bootstrap";
import "./SettingsModal.css";
import { Daily, Boss } from "../initialData";

interface SettingsModalProps {
  dailies: Daily[];
  setDailies: React.Dispatch<React.SetStateAction<Daily[]>>;
  weeklyBosses: Boss[];
  setWeeklyBosses: React.Dispatch<React.SetStateAction<Boss[]>>;
}

const SettingsModal = ({
  dailies,
  setDailies,
  weeklyBosses,
  setWeeklyBosses,
}: SettingsModalProps) => {
  const [show, setShow] = useState<boolean>(false);
  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);

  const handleDailyChange = (name: string) => {
    setDailies(() =>
      dailies.map((daily) =>
        daily.name === name ? { ...daily, selected: !daily.selected } : daily
      )
    );
  };

  const handleWeeklyBossChange = (name: string) => {
    setWeeklyBosses(() =>
      weeklyBosses.map((boss) =>
        boss.name === name ? { ...boss, selected: !boss.selected } : boss
      )
    );
  };

  return (
    <div>
      <button className="btn btn-dark" onClick={handleShow}>
        Settings
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Dailies</h5>
          <ul>
            {dailies.map((daily) => (
              <li key={daily.name}>
                <input
                  type="checkbox"
                  checked={daily.selected}
                  onChange={() => handleDailyChange(daily.name)}
                />
                {daily.text}
              </li>
            ))}
          </ul>
          <h5>Weekly Bosses</h5>
          <ul>
            {weeklyBosses.map((boss) => (
              <li key={boss.name}>
                <input
                  type="checkbox"
                  checked={boss.selected}
                  onChange={() => handleWeeklyBossChange(boss.name)}
                />
                {boss.text}
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Close</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SettingsModal;
