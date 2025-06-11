"use client";

import React from "react";
import AnimatedButton from "../../components/ui/AnimatedButton/AnimatedButton";
import Card from "../../components/ui/Card/Card";
import Input from "../../components/ui/Input/Input";
import Select from "../../components/ui/Select/Select";
import Textarea from "../../components/ui/Textarea/Textarea";
import {
  FaSave,
  FaTrash,
  FaCheck,
  FaExclamationTriangle,
} from "react-icons/fa";
import useNotification from "../../components/ui/Notification/Notification";
import Loader from "../../components/ui/Loader/Loader";
import Modal from "../../components/ui/Modal/Modal";

export default function UIPage() {
  const selectOptions = [
    { value: "", label: "Select an option" },
    { value: "one", label: "Option One" },
    { value: "two", label: "Option Two" },
  ];
  const { notify } = useNotification();
  const [loading, setLoading] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);

  // ✅ State for Selects
  const [selectedOption1, setSelectedOption1] = React.useState("");
  const [selectedOption2, setSelectedOption2] = React.useState("");
  const [selectedOption3, setSelectedOption3] = React.useState("one");
  const [selectedOption4, setSelectedOption4] = React.useState("");

  return (
    <main style={{ padding: 32, maxWidth: 900, margin: "0 auto" }}>
      {loading && <Loader />}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Demo Modal"
      >
        <div style={{ minHeight: 60 }}>
          <p>
            This is a simulated modal. You can close it using the close button
            or outside click.
          </p>
        </div>
      </Modal>

      {/* Buttons */}
      <section>
        <h2>Animated Button</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          <AnimatedButton
            variant="primary"
            onClick={() => notify("Primary button clicked", "info")}
          >
            Primary
          </AnimatedButton>
          <AnimatedButton
            variant="secondary"
            onClick={() => notify("Secondary button clicked", "info")}
          >
            Secondary
          </AnimatedButton>
          <AnimatedButton
            variant="success"
            onClick={() => notify("Success!", "success")}
          >
            Success
          </AnimatedButton>
          <AnimatedButton
            variant="danger"
            onClick={() => notify("Danger!", "error")}
          >
            Danger
          </AnimatedButton>
          <AnimatedButton
            variant="warning"
            onClick={() => notify("Warning!", "warning")}
          >
            Warning
          </AnimatedButton>
          <AnimatedButton variant="primary" disabled>
            Disabled
          </AnimatedButton>
          <AnimatedButton
            variant="primary"
            icon={<FaSave />}
            onClick={() => notify("Saved!", "success")}
          >
            With Icon
          </AnimatedButton>
          <AnimatedButton
            variant="danger"
            icon={<FaTrash />}
            onClick={() => notify("Deleted!", "error")}
          >
            Danger + Icon
          </AnimatedButton>
          <AnimatedButton variant="success" icon={<FaCheck />} disabled>
            Success Disabled + Icon
          </AnimatedButton>
          <AnimatedButton
            variant="warning"
            icon={<FaExclamationTriangle />}
            onClick={() => notify("Warning with icon!", "warning")}
          >
            Warning + Icon
          </AnimatedButton>
        </div>
      </section>

      {/* Cards */}
      <section style={{ marginTop: 40 }}>
        <h2>Card</h2>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          <Card elevation={1} aria-label="Simple card">
            <div>Simple Card Content</div>
          </Card>
          <Card hoverable elevation={2} aria-label="Hoverable card">
            <div>
              <h4>Hoverable Card</h4>
              <p>Hover over this card to see the effect.</p>
            </div>
          </Card>
          <Card
            onClick={() => notify("Card clicked!", "info")}
            elevation={3}
            aria-label="Clickable card"
          >
            <div>
              <h4>Clickable Card</h4>
              <p>Click this card to trigger a notification.</p>
            </div>
          </Card>
          <Card
            hoverable
            onClick={() => notify("Hoverable & Clickable Card!", "success")}
            elevation={4}
            aria-label="Hoverable and clickable card"
            animationDuration={1}
            animationEasing={[0.4, 0, 0.2, 1]}
          >
            <div>
              <h4>Hoverable & Clickable Card</h4>
              <p>Hover and click to see both effects in action.</p>
            </div>
          </Card>
          <Card disabled elevation={5} aria-label="Disabled card">
            <div>
              <h4>Disabled Card</h4>
              <p>This card is disabled and not interactive.</p>
            </div>
          </Card>
          <Card>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ul style={{ textAlign: "center" }}>
                <li>List item 1</li>
                <li>List item 2</li>
                <li>List item 3</li>
              </ul>
            </div>
          </Card>
        </div>
      </section>

      {/* Inputs */}
      <section style={{ marginTop: 40 }}>
        <h2>Input</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            maxWidth: 400,
          }}
        >
          <Input placeholder="No label" helperText="This is a basic input." />
          <Input
            label="With label"
            placeholder="With label"
            helperText="Labelled input."
          />
          <Input
            label="With value"
            value="Value"
            readOnly
            helperText="Read-only input."
          />
          <Input
            label="With icon"
            icon={<FaSave />}
            placeholder="With icon"
            helperText="Input with icon."
          />
          <Input
            label="Error"
            error="This is an error"
            placeholder="Error state"
            helperText="Helper text will not show if error is present."
          />
          <Input
            label="Disabled"
            disabled
            placeholder="Disabled"
            helperText="Disabled input."
          />
          <Input
            label="Password"
            type="password"
            placeholder="Password"
            helperText="Password input with toggle."
          />
        </div>
      </section>

      {/* Selects */}
      <section style={{ marginTop: 40 }}>
        <h2>Select</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            maxWidth: 400,
          }}
        >
          <Select
            options={selectOptions}
            value={selectedOption1}
            onChange={setSelectedOption1}
            helperText="Basic select."
          />
          <Select
            label="With label"
            options={selectOptions}
            value={selectedOption2}
            onChange={setSelectedOption2}
            helperText="Labelled select."
          />
          <Select
            label="With value"
            options={selectOptions}
            value={selectedOption3}
            onChange={setSelectedOption3}
            helperText="Select with default value."
          />
          <Select
            label="Error"
            error="This is an error"
            options={selectOptions}
            value={selectedOption4}
            onChange={setSelectedOption4}
            helperText="Helper text will not show if error is present."
          />
          <Select
            label="Disabled"
            options={selectOptions}
            value={""}
            onChange={() => {}}
            disabled
            helperText="Disabled select."
          />
        </div>
      </section>

      {/* Textarea */}
      <section style={{ marginTop: 40 }}>
        <h2>Textarea</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            maxWidth: 400,
          }}
        >
          <Textarea placeholder="No label" helperText="Basic textarea." />
          <Textarea
            label="With label"
            placeholder="With label"
            helperText="Labelled textarea."
          />
          <Textarea
            label="With value"
            value="Value"
            readOnly
            helperText="Read-only textarea."
          />
          <Textarea
            label="Error"
            error="This is an error"
            placeholder="Error state"
            helperText="Helper text will not show if error is present."
          />
          <Textarea
            label="Disabled"
            disabled
            placeholder="Disabled"
            helperText="Disabled textarea."
          />
        </div>
      </section>

      {/* Loader & Modal */}
      <section style={{ marginTop: 40 }}>
        <h2>Simulate Loader & Modal</h2>
        <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
          <AnimatedButton
            variant="primary"
            onClick={async () => {
              setLoading(true);
              notify("Loading for 3 seconds...", "info");
              await new Promise((res) => setTimeout(res, 3000));
              setLoading(false);
              notify("3s Loader finished!", "success");
            }}
          >
            Simulate 3s Loader
          </AnimatedButton>
          <AnimatedButton
            variant="warning"
            onClick={async () => {
              setLoading(true);
              notify("Loading for 30 seconds...", "warning");
              await new Promise((res) => setTimeout(res, 30000));
              setLoading(false);
              notify("30s Loader finished!", "success");
            }}
          >
            Simulate 30s Loader
          </AnimatedButton>
          <AnimatedButton
            variant="secondary"
            onClick={() => setModalOpen(true)}
          >
            Simulate Modal
          </AnimatedButton>
        </div>
      </section>
    </main>
  );
}
