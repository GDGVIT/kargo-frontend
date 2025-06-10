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
          <Card>
            <div>Simple Card Content</div>
          </Card>
          <Card>
            <div>
              <h4>Card with Heading</h4>
              <p>This card contains a heading and a paragraph.</p>
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
          <Input placeholder="No label" />
          <Input label="With label" placeholder="With label" />
          <Input label="With value" value="Value" readOnly />
          <Input label="With icon" icon={<FaSave />} placeholder="With icon" />
          <Input
            label="Error"
            error="This is an error"
            placeholder="Error state"
          />
          <Input label="Disabled" disabled placeholder="Disabled" />
          <Input label="Password" type="password" placeholder="Password" />
        </div>
      </section>

      {/* ✅ Selects */}
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
          />
          <Select
            label="With label"
            options={selectOptions}
            value={selectedOption2}
            onChange={setSelectedOption2}
          />
          <Select
            label="With value"
            options={selectOptions}
            value={selectedOption3}
            onChange={setSelectedOption3}
          />
          <Select
            label="Error"
            error="This is an error"
            options={selectOptions}
            value={selectedOption4}
            onChange={setSelectedOption4}
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
          <Textarea placeholder="No label" />
          <Textarea label="With label" placeholder="With label" />
          <Textarea label="With value" value="Value" readOnly />
          <Textarea
            label="Error"
            error="This is an error"
            placeholder="Error state"
          />
          <Textarea label="Disabled" disabled placeholder="Disabled" />
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
