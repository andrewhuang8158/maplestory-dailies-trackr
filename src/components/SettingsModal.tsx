import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./SettingsModal.css";

const SettingsModal = ({
  dailies,
  setDailies,
  weeklyBosses,
  setWeeklyBosses,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDailyChange = (name) => {
    setDailies(() =>
      dailies.map((daily) =>
        daily.name === name ? { ...daily, selected: !daily.selected } : daily
      )
    );
  };

  const handleWeeklyBossChange = (name) => {
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
