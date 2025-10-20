'use client';

import React from 'react';
import AnimatedButton from '../ui/AnimatedButton/AnimatedButton';
import Card from '../ui/Card/Card';
import Input from '../ui/Input/Input';
import Select from '../ui/Select/Select';
import Textarea from '../ui/Textarea/Textarea';
import {
  FaSave,
  FaTrash,
  FaCheck,
  FaExclamationTriangle,
  FaCode,
  FaMicrochip,
  FaMemory,
} from 'react-icons/fa';
import { FaFloppyDisk } from 'react-icons/fa6';
import useNotification from '../ui/Notification/Notification';
import Loader from '../ui/Loader/Loader';
import Modal from '../ui/Modal/Modal';
import Tabs, { TabItem } from '../ui/Tabs/Tabs';
import { ResourceItem } from '@/components/ui';

export default function UIPage() {
  const selectOptions = [
    { value: '', label: 'Select an option' },
    { value: 'one', label: 'Option One' },
    { value: 'two', label: 'Option Two' },
  ];
  const { notify } = useNotification();
  const [loading, setLoading] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);

  const [selectedOption1, setSelectedOption1] = React.useState('');
  const [selectedOption2, setSelectedOption2] = React.useState('');
  const [selectedOption3, setSelectedOption3] = React.useState('one');
  const [selectedOption4, setSelectedOption4] = React.useState('');

  const [input1, setInput1] = React.useState('');
  const [input2, setInput2] = React.useState('');
  const [input3] = React.useState('Read only value');
  const [input4, setInput4] = React.useState('');
  const [input5, setInput5] = React.useState('');
  const [input7, setInput7] = React.useState('');

  const [showcaseTab, setShowcaseTab] = React.useState('tab1');
  const showcaseTabs: TabItem[] = [
    {
      key: 'tab1',
      label: 'Tab One',
      heading: 'Tab One Heading',
      subheading: 'This is the first tab.',
      content: <div>Content for Tab One goes here.</div>,
    },
    {
      key: 'tab2',
      label: 'Tab Two',
      heading: 'Tab Two Heading',
      subheading: 'This is the second tab.',
      content: <div>Content for Tab Two goes here.</div>,
    },
    {
      key: 'tab3',
      label: 'Tab Three',
      heading: 'Tab Three Heading',
      subheading: 'This is the third tab.',
      content: <div>Content for Tab Three goes here.</div>,
    },
  ];

  return (
    <>
      {loading && <Loader />}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Demo Modal">
        <div style={{ minHeight: 60 }}>
          <p>
            This is a simulated modal. You can close it using the close button or outside click.
          </p>
        </div>
      </Modal>

      <section id="headings">
        <h2
          style={{ cursor: 'pointer' }}
          onClick={() => {
            document.getElementById('headings')?.scrollIntoView({
              behavior: 'smooth',
            });
            window.location.hash = '#headings';
          }}
        >
          Headings
        </h2>
        <Card elevation={1} aria-label="Heading showcase">
          <div className="responsive-flex-column gap-2">
            <h1>Heading 1</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
            <h4>Heading 4</h4>
            <h5>Heading 5</h5>
            <h6>Heading 6</h6>
          </div>
        </Card>
      </section>

      <section id="animated-button">
        <h2
          style={{ cursor: 'pointer' }}
          onClick={() => {
            document.getElementById('animated-button')?.scrollIntoView({
              behavior: 'smooth',
            });
            window.location.hash = '#animated-button';
          }}
        >
          Animated Button
        </h2>
        <div className="responsive-flex-row">
          <AnimatedButton
            onClick={() => notify('Primary button clicked', 'info')}
            icon={<FaCode />}
          ></AnimatedButton>
          <AnimatedButton
            variant="primary"
            onClick={() => notify('Primary button clicked', 'info')}
          >
            Primary
          </AnimatedButton>
          <AnimatedButton
            variant="secondary"
            onClick={() => notify('Secondary button clicked', 'info')}
          >
            Secondary
          </AnimatedButton>
          <AnimatedButton variant="success" onClick={() => notify('Success!', 'success')}>
            Success
          </AnimatedButton>
          <AnimatedButton variant="danger" onClick={() => notify('Danger!', 'error')}>
            Danger
          </AnimatedButton>
          <AnimatedButton variant="warning" onClick={() => notify('Warning!', 'warning')}>
            Warning
          </AnimatedButton>
          <AnimatedButton variant="primary" disabled>
            Disabled
          </AnimatedButton>
          <AnimatedButton
            variant="primary"
            icon={<FaSave />}
            onClick={() => notify('Saved!', 'success')}
          >
            With Icon
          </AnimatedButton>
          <AnimatedButton
            variant="danger"
            icon={<FaTrash />}
            onClick={() => notify('Deleted!', 'error')}
          >
            Danger + Icon
          </AnimatedButton>
          <AnimatedButton variant="success" icon={<FaCheck />} disabled>
            Success Disabled + Icon
          </AnimatedButton>
          <AnimatedButton
            variant="warning"
            icon={<FaExclamationTriangle />}
            onClick={() => notify('Warning with icon!', 'warning')}
          >
            Warning + Icon
          </AnimatedButton>
        </div>
      </section>

      <section id="card" style={{ marginTop: 40 }}>
        <h2
          style={{ cursor: 'pointer' }}
          onClick={() => {
            document.getElementById('card')?.scrollIntoView({
              behavior: 'smooth',
            });
            window.location.hash = '#card';
          }}
        >
          Card
        </h2>
        <div className="responsive-flex-row">
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
            onClick={() => notify('Card clicked!', 'info')}
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
            onClick={() => notify('Hoverable & Clickable Card!', 'success')}
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
            <div className="responsive-flex-center">
              <ul style={{ textAlign: 'center' }}>
                <li>List item 1</li>
                <li>List item 2</li>
                <li>List item 3</li>
              </ul>
            </div>
          </Card>
        </div>
      </section>

      <section id="inputs" style={{ marginTop: 40 }}>
        <h2
          style={{ cursor: 'pointer' }}
          onClick={() => {
            document.getElementById('inputs')?.scrollIntoView({
              behavior: 'smooth',
            });
            window.location.hash = '#inputs';
          }}
        >
          Inputs
        </h2>
        <div className="responsive-flex-row flex flex-wrap gap-4">
          <Card form elevation={2} className="min-w-[320px] flex-1">
            <h4>Basic Inputs</h4>
            <Input
              placeholder="Basic input"
              helperText="Helper text"
              value={input1}
              onChange={setInput1}
            />
            <Input
              label="With label"
              placeholder="Input with label"
              helperText="Helper text"
              value={input2}
              onChange={setInput2}
            />
            <Input
              label="Read only"
              value={input3}
              readOnly={true}
              helperText="Read only input"
              onChange={() => {}}
            />
          </Card>
          <Card form elevation={2} className="min-w-[320px] flex-1">
            <h4>Inputs with Icon</h4>
            <Input
              label="With icon"
              icon={<FaCode />}
              placeholder="Input with icon"
              helperText="Helper text"
              value={input4}
              onChange={setInput4}
            />
          </Card>
          <Card form elevation={2} className="min-w-[320px] flex-1">
            <h4>Inputs with Error</h4>
            <Input
              label="With error"
              error="This is an error"
              placeholder="Input with error"
              helperText="Helper text"
              value={input5}
              onChange={setInput5}
            />
          </Card>
          <Card form elevation={2} className="min-w-[320px] flex-1">
            <h4>Disabled & Password Inputs</h4>
            <Input
              label="Disabled"
              disabled={true}
              placeholder="Disabled input"
              helperText="Disabled input"
              value={input7}
              onChange={() => {}}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Password input"
              helperText="Password input"
              value={input7}
              onChange={setInput7}
            />
          </Card>
          <Card form elevation={2} className="min-w-[320px] flex-1">
            <h4>Unit Inputs</h4>
            <Input
              label="CPU (m/vCPU)"
              unitType="cpu"
              value={input1}
              onChange={setInput1}
              placeholder="CPU in m or vCPU"
              helperText="Supports m and vCPU units."
              displayHelperText={true}
            />
            <Input
              label="Memory (MB/GB)"
              unitType="memory"
              value={input2}
              onChange={setInput2}
              placeholder="Memory in MB or GB"
              helperText="Supports MB and GB units."
              displayHelperText={true}
            />
            <Input
              label="Storage (GB/TB)"
              unitType="storage"
              value={input4}
              onChange={setInput4}
              placeholder="Storage in GB or TB"
              helperText="Supports GB and TB units."
              displayHelperText={true}
            />
          </Card>
        </div>
      </section>

      <section id="select" style={{ marginTop: 40 }}>
        <h2
          style={{ cursor: 'pointer' }}
          onClick={() => {
            document.getElementById('select')?.scrollIntoView({
              behavior: 'smooth',
            });
            window.location.hash = '#select';
          }}
        >
          Select
        </h2>
        <div className="responsive-flex-row flex flex-wrap gap-4">
          <Card form elevation={2} className="min-w-[320px] flex-1">
            <h4>Basic Select</h4>
            <Select
              options={selectOptions}
              value={selectedOption1}
              onChange={setSelectedOption1}
              helperText="Basic select."
            />
          </Card>
          <Card form elevation={2} className="min-w-[320px] flex-1">
            <h4>With Label</h4>
            <Select
              label="With label"
              options={selectOptions}
              value={selectedOption2}
              onChange={setSelectedOption2}
              helperText="Labelled select."
            />
          </Card>
          <Card form elevation={2} className="min-w-[320px] flex-1">
            <h4>With Value</h4>
            <Select
              label="With value"
              options={selectOptions}
              value={selectedOption3}
              onChange={setSelectedOption3}
              helperText="Select with default value."
            />
          </Card>
          <Card form elevation={2} className="min-w-[320px] flex-1">
            <h4>Error</h4>
            <Select
              label="Error"
              error="This is an error"
              options={selectOptions}
              value={selectedOption4}
              onChange={setSelectedOption4}
              helperText="Helper text will not show if error is present."
            />
          </Card>
          <Card form elevation={2} className="min-w-[320px] flex-1">
            <h4>Disabled</h4>
            <Select
              label="Disabled"
              options={selectOptions}
              value={''}
              onChange={() => {}}
              disabled
              helperText="Disabled select."
            />
          </Card>
        </div>
      </section>

      <section id="textarea" style={{ marginTop: 40 }}>
        <h2
          style={{ cursor: 'pointer' }}
          onClick={() => {
            document.getElementById('textarea')?.scrollIntoView({
              behavior: 'smooth',
            });
            window.location.hash = '#textarea';
          }}
        >
          Textarea
        </h2>
        <div className="responsive-flex-row flex flex-wrap gap-4">
          <Card form elevation={2} className="min-w-[320px] flex-1">
            <h4>Basic Textarea</h4>
            <Textarea placeholder="No label" helperText="Basic textarea." />
          </Card>
          <Card form elevation={2} className="min-w-[320px] flex-1">
            <h4>With Label</h4>
            <Textarea label="With label" placeholder="With label" helperText="Labelled textarea." />
          </Card>
          <Card form elevation={2} className="min-w-[320px] flex-1">
            <h4>With Value</h4>
            <Textarea label="With value" value="Value" readOnly helperText="Read-only textarea." />
          </Card>
          <Card form elevation={2} className="min-w-[320px] flex-1">
            <h4>Error</h4>
            <Textarea
              label="Error"
              error="This is an error"
              placeholder="Error state"
              helperText="Helper text will not show if error is present."
            />
          </Card>
          <Card form elevation={2} className="min-w-[320px] flex-1">
            <h4>Disabled</h4>
            <Textarea
              label="Disabled"
              disabled
              placeholder="Disabled"
              helperText="Disabled textarea."
            />
          </Card>
        </div>
      </section>

      <section id="loader-modal" style={{ marginTop: 40 }}>
        <h2
          style={{ cursor: 'pointer' }}
          onClick={() => {
            document.getElementById('loader-modal')?.scrollIntoView({
              behavior: 'smooth',
            });
            window.location.hash = '#loader-modal';
          }}
        >
          Simulate Loader & Modal
        </h2>
        <div className="responsive-flex-row" style={{ marginBottom: 24 }}>
          <AnimatedButton
            variant="primary"
            onClick={async () => {
              setLoading(true);
              notify('Loading for 3 seconds...', 'info');
              await new Promise((res) => setTimeout(res, 3000));
              setLoading(false);
              notify('3s Loader finished!', 'success');
            }}
          >
            Simulate 3s Loader
          </AnimatedButton>
          <AnimatedButton
            variant="warning"
            onClick={async () => {
              setLoading(true);
              notify('Loading for 30 seconds...', 'warning');
              await new Promise((res) => setTimeout(res, 30000));
              setLoading(false);
              notify('30s Loader finished!', 'success');
            }}
          >
            Simulate 30s Loader
          </AnimatedButton>
          <AnimatedButton variant="secondary" onClick={() => setModalOpen(true)}>
            Simulate Modal
          </AnimatedButton>
        </div>
      </section>

      <section id="tabs" style={{ marginTop: 40 }}>
        <h2
          style={{ cursor: 'pointer' }}
          onClick={() => {
            document.getElementById('tabs')?.scrollIntoView({
              behavior: 'smooth',
            });
            window.location.hash = '#tabs';
          }}
        >
          Tabs
        </h2>
        <div className="responsive-flex-row">
          <Tabs
            tabs={showcaseTabs}
            activeTab={showcaseTab}
            setActiveTab={setShowcaseTab}
            className="max-w-2xl mx-auto"
          />
        </div>
      </section>

      <section id="resource-item" style={{ marginTop: 40, marginBottom: 40 }}>
        <h2
          style={{ cursor: 'pointer' }}
          onClick={() => {
            document.getElementById('resource-item')?.scrollIntoView({
              behavior: 'smooth',
            });
            window.location.hash = '#resource-item';
          }}
        >
          Resource Item
        </h2>
        <Card elevation={1} aria-label="Resource Item showcase">
          <div className="responsive-flex-column gap-4">
            <ResourceItem
              icon={<FaMicrochip className="text-sky-300" />}
              label="CPU"
              usage="500m"
              max="2000m"
              color="text-sky-200"
            />
            <ResourceItem
              icon={<FaMemory className="text-emerald-300" />}
              label="Memory"
              usage="1GB"
              max="8GB"
              color="text-emerald-200"
            />
            <ResourceItem
              icon={<FaFloppyDisk className="text-yellow-300" />}
              label="Storage"
              usage="50GB"
              max="200GB"
              color="text-yellow-200"
            />
          </div>
        </Card>
      </section>
    </>
  );
}
